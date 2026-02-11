"use client";

import { useEffect, useRef, useState } from "react";
import { ZendFiEmbeddedCheckout } from "@zendfi/sdk";
import { PaymentData } from "@/types/payment";
import { ArrowLeft, CreditCard, Loader2, CheckCircle2 } from "lucide-react";
import { usePayment } from "@/hooks/usePayment";

interface PaymentGatewayProps {
  data: PaymentData;
  onBack: () => void;
  onComplete: () => void;
}

export default function PaymentGateway({ data, onBack, onComplete }: PaymentGatewayProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const zendfiRef = useRef<HTMLDivElement | null>(null);

  const { fee, personalInfo } = data;
  const { createPaymentAsync, isCreating } = usePayment();

  useEffect(() => {
    let checkout: ZendFiEmbeddedCheckout | null = null;
    let isMounted = true;
    async function setupCheckout() {
      setError(null);
      try {
        const result = await createPaymentAsync({
          amount: fee.amount,
          studentId: personalInfo.studentId,
          fullName: personalInfo.fullName,
          email: personalInfo.email,
          phone: personalInfo.contact,
        });
        const { linkCode } = result;
        if (!linkCode) throw new Error("No linkCode returned");
        if (zendfiRef.current && isMounted) {
          checkout = new ZendFiEmbeddedCheckout({
            linkCode,
            containerId: zendfiRef.current.id,
            mode: "live",
            onSuccess: (payment) => {
              setIsSuccess(true);
              setTimeout(() => {
                onComplete();
              }, 2000);
            },
            onError: (err) => {
              setError("Payment failed or cancelled. Please try again.");
            },
          });
          await checkout.mount();
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      }
    }
    setupCheckout();
    return () => {
      isMounted = false;
      if (zendfiRef.current) zendfiRef.current.innerHTML = "";
      // Optionally: checkout?.unmount();
    };
  }, [fee.amount, personalInfo, onComplete, createPaymentAsync]);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#09283b]">Payment</h2>
        <p className="mt-2 text-sm text-gray-600">
          Complete your payment using the gateway below
        </p>

        {/* Payment Summary */}
        <div className="mt-6 rounded-md bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                {fee.feeType} - {fee.term}
              </p>
              <p className="text-xs text-gray-600">
                {personalInfo.fullName} ({personalInfo.studentId})
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-[#09283b]">
                ₦{fee.amount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Loading/Error/Checkout UI */}
        <div className="mt-6">
          {isCreating && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
              <span className="ml-2 text-sm text-gray-600">Loading payment gateway...</span>
            </div>
          )}
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-red-700 text-sm mb-4">
              {error}
            </div>
          )}
          <div id="zendfi-checkout-container" ref={el => {
            zendfiRef.current = el;
            if (el) el.id = "zendfi-checkout-container";
          }} />
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        {/* Security Notice */}
        <div className="mt-4 rounded-md bg-blue-50 p-3">
          <p className="text-xs text-blue-900">
            🔒 Your payment information is secure and encrypted. We do not store your card details.
          </p>
        </div>
      </div>
    </div>
  );
}
