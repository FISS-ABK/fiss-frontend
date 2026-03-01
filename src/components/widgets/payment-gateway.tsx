"use client";

import { useState } from "react";
import { PaymentData } from "@/types/payment";
import { ArrowLeft, Loader2 } from "lucide-react";
import { usePayment } from "@/hooks/usePayment";
import { useRouter } from "next/navigation";

interface PaymentGatewayProps {
  data: PaymentData;
  onBack: () => void;
  onComplete?: () => void;
}

export default function PaymentGateway({ data, onBack, onComplete }: PaymentGatewayProps) {
  const { fee, personalInfo } = data;
  const { createPaymentAsync, isCreating, createError, verifyPaymentAsync, isVerifying, verifyError } = usePayment();

  const [localError, setLocalError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [verifyStatus, setVerifyStatus] = useState<string | null>(null);
  const [verifyMessage, setVerifyMessage] = useState<string | null>(null);
  const router = useRouter();

  const handlePayment = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLocalError(null);
    try {
      const response = await createPaymentAsync({
        amount: fee.amount,
        studentId: personalInfo.studentId,
        fullName: personalInfo.fullName,
        email: personalInfo.email,
        phone: personalInfo.contact,
        feeType: fee.feeType,
        term: fee.term,
        academic_session: fee.academicSession,
        className: fee.className,
      });

      // backend may return hosted_page_url; be tolerant of types
      const hostedUrl = (response as any)?.paymentUrl as string | undefined;
      const returnedPaymentId = (response as any)?.linkCode;
      if (hostedUrl) {
        window.open(hostedUrl, "_blank");
        setPaymentId(String(returnedPaymentId ?? ""));
      } else {
        setLocalError("No payment URL returned. Please try again later.");
      }
    } catch (err: any) {
      setLocalError(err?.message || "Failed to initiate payment");
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#09283b]">Payment</h2>
        <p className="mt-2 text-sm text-gray-600">Complete your payment using the gateway below</p>

        <div className="mt-6 rounded-md bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">{fee.feeType} - {fee.term}</p>
              <p className="text-xs text-gray-600">{personalInfo.fullName} ({personalInfo.studentId})</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-[#09283b]">₦{fee.amount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {isCreating && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
              <span className="ml-2 text-sm text-gray-600">Processing payment...</span>
            </div>
          )}

          {(localError || createError) && (
            <div className="rounded-md bg-red-50 p-4 text-red-700 text-sm mb-4">
              {localError || (createError as any)?.message || "An error occurred"}
            </div>
          )}

        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <button
            type="button"
            onClick={handlePayment}
            disabled={isCreating || paymentId !== null}
            className="ml-auto rounded-md bg-[#09283b] px-6 py-3 text-sm font-medium text-white hover:opacity-95 disabled:opacity-50"
          >
            {isCreating ? "Processing..." : "Pay Now"}
          </button>
        </div>

        {/* Post-payment actions */}
        {paymentId && (
          <div className="mt-6">
            <p className="text-sm text-gray-700">Payment initiated. Payment Code: <span className="font-mono">{paymentId}</span></p>
            <div className="mt-3 flex gap-3">
              <button
                onClick={async () => {
                  setLocalError(null);
                  setVerifyMessage(null);
                  setVerifyStatus(null);
                  try {
                    const res = await verifyPaymentAsync(paymentId);
                    // Accept multiple possible response shapes. Prefer explicit `status`.
                    const statusRaw = (res as any)?.status ?? (res as any)?.payment_status ?? null;
                    const status = typeof statusRaw === "string" ? statusRaw.toLowerCase() : null;

                    const setStatusInfo = (s: string, msg: string) => {
                      setVerifyStatus(s);
                      setVerifyMessage(msg);
                    };

                    if (status) {
                      // allowed statuses: pending, expired, completed, failed
                      if (status === "confirmed") {
                        setStatusInfo("completed", "payment completed successfully");
                        setIsSuccess(true);
                        if (onComplete) onComplete();
                      } else if (status === "pending") {
                        setStatusInfo("pending", "payment is pending — we are awaiting confirmation. If you completed payment, wait a few moments then click Verify Payment again.");
                      } else if (status === "expired") {
                        setStatusInfo("expired", "payment session expired — please initiate payment again.");
                      } else if (status === "failed") {
                        setStatusInfo("failed", "payment failed — please try again or contact support.");
                      } else {
                        setStatusInfo(String(status), `status: ${String(status)}`);
                      }
                    } else {
                      // fallback to boolean success field
                      const ok = (res as any)?.success;
                      if (ok === true) {
                        setStatusInfo("completed", "payment completed successfully");
                        setIsSuccess(true);
                        if (onComplete) onComplete();
                      } else if (ok === false) {
                        setStatusInfo("failed", "payment failed — please try again or contact support.");
                      } else {
                        setStatusInfo("pending", "payment is pending — we are awaiting confirmation. If you completed payment, wait a few moments then click Verify Payment again.");
                      }
                    }
                  } catch (err: any) {
                    setLocalError(err?.message || "Failed to verify payment");
                  }
                }}
                disabled={isVerifying}
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
              >
                {isVerifying ? "Verifying..." : "Verify Payment"}
              </button>

              <button
                onClick={() => window.open("/portal/receipts", "_blank")}
                className="rounded-md border px-4 py-2 text-sm font-medium"
              >
                Go to Receipts
              </button>
            </div>
            {verifyError && <p className="mt-2 text-sm text-red-600">{(verifyError as any)?.message || "Verification error"}</p>}
            {verifyStatus && verifyMessage && (
              <div className="mt-3 rounded-md p-3" aria-live="polite">
                <p className="text-xs text-gray-600">status: <span className="font-mono">{verifyStatus}</span></p>
                <p className="mt-1 text-sm text-gray-800">{verifyMessage}</p>
              </div>
            )}
          </div>
        )}

        {/* Success screen */}
        {isSuccess && (
          <div className="mt-6 rounded-md border border-green-100 bg-green-50 p-4">
            <h3 className="text-lg font-semibold text-green-800">Payment Successful</h3>
            <p className="mt-2 text-sm text-green-800">Your payment was verified. You can now visit the Receipts page and use your Student ID to print the receipt.</p>
            <p className="mt-2 text-sm text-gray-700">Student ID: <span className="font-mono">{personalInfo.studentId}</span></p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => router.push('/portal/receipts')}
                className="rounded-md bg-[#09283b] px-4 py-2 text-sm font-medium text-white"
              >
                Open Receipts
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 rounded-md bg-blue-50 p-3">
          <p className="text-xs text-blue-900">🔒 Your payment information is secure and encrypted. We do not store your card details.</p>
        </div>
      </div>
    </div>
  );
}
