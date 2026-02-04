"use client";

import { useState } from "react";
import { PaymentData } from "@/types/payment";
import { ArrowLeft, CreditCard, Loader2, CheckCircle2 } from "lucide-react";

interface PaymentGatewayProps {
  data: PaymentData;
  onBack: () => void;
  onComplete: () => void;
}

export default function PaymentGateway({ data, onBack, onComplete }: PaymentGatewayProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { fee, personalInfo } = data;

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Redirect to receipts page after 2 seconds
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-[#09283b]">
            Payment Successful!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your payment has been processed successfully.
          </p>
          <div className="mt-6 rounded-md bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-700">
              Transaction Details
            </p>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <p>Amount: ₦{fee.amount.toLocaleString()}</p>
              <p>Student ID: {personalInfo.studentId}</p>
              <p>Reference: TXN{Date.now()}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Redirecting to receipts page...
          </p>
        </div>
      </div>
    );
  }

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

        {/* Payment Gateway Integration Placeholder */}
        <div className="mt-6 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8">
          <div className="text-center">
            <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Payment Gateway Integration
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              This is where your payment gateway (Paystack, Flutterwave, etc.) will be integrated.
            </p>
            <p className="mt-1 text-xs text-gray-500">
              For demo purposes, click the button below to simulate a payment.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onBack}
            disabled={isProcessing}
            className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <button
            type="button"
            onClick={handlePayment}
            disabled={isProcessing}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4" />
                Pay ₦{fee.amount.toLocaleString()}
              </>
            )}
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
