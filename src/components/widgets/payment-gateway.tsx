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
  const hasCreateError = Boolean(localError || createError);
  const hasVerifyError = Boolean(verifyError);

  const getErrorMessage = (error: unknown, fallback: string) => {
    if (typeof error === "string") return error;
    if (error && typeof error === "object") {
      const message = (error as { message?: string }).message;
      return message || fallback;
    }
    return fallback;
  };

  const handlePayment = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLocalError(null);
    try {
      const baseAmount = fee.amount;
      const totalExtra = (baseAmount * 0.025) + 99;
      const totalAmount = Math.round(baseAmount + totalExtra);
      const actualExtra = totalAmount - baseAmount;

      let paystackFee = 0;
      if (totalAmount < 2000) {
        paystackFee = Math.round(totalAmount * 0.015 * 100) / 100;
      } else {
        paystackFee = Math.min(2000, Math.round(((totalAmount * 0.015) + 100) * 100) / 100);
      }

      // Exact 2-decimal kobo precision so school payout equals EXACTLY baseAmount
      const platformFee = Math.max(0, Math.round((actualExtra - paystackFee) * 100) / 100);
      const selectedSubAccount = fee.subAccountCode || fee.subAccount || fee.subaccount;

      const response = await createPaymentAsync({
        amount: totalAmount,
        platformFee,
        baseAmount: fee.amount,
        studentId: personalInfo.studentId,
        fullName: personalInfo.fullName,
        email: personalInfo.email,
        phone: personalInfo.contact,
        feeType: fee.feeType,
        term: fee.term,
        academicSession: fee.academicSession,
        className: fee.className,
        subAccountCode: selectedSubAccount,
        subAccount: selectedSubAccount,
        subaccount: selectedSubAccount,
        org: "fiss",
        purpose: fee.term,
      });

      // backend may return hosted_page_url/authorization_url/authorizationUrl; be tolerant of types
      const hostedUrl = response.authorizationUrl || response.authorization_url || response.paymentUrl || response.data?.authorizationUrl || response.data?.authorization_url;
      const returnedPaymentId = response.reference || response.linkCode || response.data?.reference;
      if (hostedUrl) {
        // Redirect in the same window/tab so Paystack can redirect back to our portal/receipts
        window.location.href = hostedUrl;
        setPaymentId(String(returnedPaymentId ?? ""));
      } else {
        setLocalError("No payment URL returned. Please try again later.");
      }
    } catch (err: unknown) {
      setLocalError(getErrorMessage(err, "Failed to initiate payment"));
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

          {hasCreateError && (
            <div className="rounded-md bg-red-50 p-4 text-red-700 text-sm mb-4">
              {localError || getErrorMessage(createError, "An error occurred")}
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
            <p className="text-sm text-gray-700">Payment initiated. Payment Reference: <span className="font-mono">{paymentId}</span></p>
            <div className="mt-3 flex gap-3">
              <button
                onClick={async () => {
                  setLocalError(null);
                  setVerifyMessage(null);
                  setVerifyStatus(null);
                  try {
                    const res = await verifyPaymentAsync(paymentId);
                    
                    const triggerDownload = (blob: Blob) => {
                      const url = window.URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.href = url;
                      link.setAttribute("download", `receipt-${paymentId}.pdf`);
                      document.body.appendChild(link);
                      link.click();
                      link.parentNode?.removeChild(link);
                      window.URL.revokeObjectURL(url);
                    };

                    // Accept multiple possible response shapes. Prefer explicit `status`.
                    const statusRaw = res.status ?? res.payment_status ?? res.data?.status ?? null;
                    const status = typeof statusRaw === "string" ? statusRaw.toLowerCase() : null;

                    const setStatusInfo = (s: string, msg: string) => {
                      setVerifyStatus(s);
                      setVerifyMessage(msg);
                    };

                    if (status) {
                      // allowed statuses: pending, expired, completed, failed
                      if (status === "confirmed" || status === "success" || status === "successful" || status === "completed") {
                        setStatusInfo("completed", "payment completed successfully");
                        setIsSuccess(true);
                        if (res.pdfBlob) {
                          triggerDownload(res.pdfBlob);
                        }
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
                      const ok = res.success ?? res.data?.success;
                      if (ok === true) {
                        setStatusInfo("completed", "payment completed successfully");
                        setIsSuccess(true);
                        if (res.pdfBlob) {
                          triggerDownload(res.pdfBlob);
                        }
                        if (onComplete) onComplete();
                      } else if (ok === false) {
                        setStatusInfo("failed", "payment failed — please try again or contact support.");
                      } else {
                        setStatusInfo("pending", "payment is pending — we are awaiting confirmation. If you completed payment, wait a few moments then click Verify Payment again.");
                      }
                    }
                  } catch (err: unknown) {
                    const isAxiosError = err && typeof err === "object" && "isAxiosError" in err;
                    let httpStatus: number | undefined;
                    if (err && typeof err === "object" && "response" in err) {
                      const response = (err as { response?: { status?: number } }).response;
                      httpStatus = response?.status;
                    }
                    if (isAxiosError && httpStatus === 404) {
                      setVerifyStatus("pending");
                      setVerifyMessage("payment is pending — we are awaiting confirmation. If you completed payment, wait a few moments then click Verify Payment again.");
                    } else {
                      setLocalError(getErrorMessage(err, "Failed to verify payment"));
                    }
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
            {hasVerifyError && (
              <p className="mt-2 text-sm text-red-600">
                {getErrorMessage(verifyError, "Verification error")}
              </p>
            )}
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
            <p className="mt-2 text-sm text-green-800">Your payment was verified. You can download your official receipt PDF below.</p>
            <p className="mt-2 text-sm text-gray-700">Student ID: <span className="font-mono">{personalInfo.studentId}</span></p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => {
                  window.open(`https://api.mhetlabs.com/api/fiss/payment-status/${paymentId}`, "_blank");
                }}
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
              >
                Download Receipt PDF
              </button>
              <button
                onClick={() => router.push('/portal/receipts')}
                className="rounded-md bg-[#09283b] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
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
