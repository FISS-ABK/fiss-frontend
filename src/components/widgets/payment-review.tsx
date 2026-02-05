"use client";

import { PaymentData } from "@/types/payment";
import { ArrowLeft, ArrowRight, User, Mail, Phone, CreditCard } from "lucide-react";

interface PaymentReviewProps {
  data: PaymentData;
  onBack: () => void;
  onNext: () => void;
}

export default function PaymentReview({ data, onBack, onNext }: PaymentReviewProps) {
  const { fee, personalInfo } = data;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Fee Information */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#09283b]">
            Fee Information
          </h2>
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700">Fee Type</p>
              <p className="text-base text-gray-900">{fee.feeType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Academic Session</p>
              <p className="text-base text-gray-900">{fee.academicSession}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Class</p>
              <p className="text-base text-gray-900">{fee.className}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Term</p>
              <p className="text-base text-gray-900">{fee.term}</p>
            </div>
            {fee.description && (
              <div>
                <p className="text-sm font-medium text-gray-700">Description</p>
                <p className="text-sm text-gray-600">{fee.description}</p>
              </div>
            )}
          </div>

          {/* Breakdown */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-[#09283b]">
              Fee Breakdown
            </h3>
            <div className="mt-3 space-y-2">
              {fee.breakdown.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0"
                >
                  <span className="text-sm text-gray-700">{item.description}</span>
                  <span className="text-sm font-medium text-gray-900">
                    ₦{item.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t-2 border-gray-200 pt-4">
              <span className="text-base font-semibold text-[#09283b]">
                Total Amount
              </span>
              <span className="text-xl font-bold text-[#09283b]">
                ₦{fee.amount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#09283b]">
            Your Information
          </h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Full Name</p>
                <p className="text-base text-gray-900">{personalInfo.fullName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <CreditCard className="h-4 w-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Student ID</p>
                <p className="text-base text-gray-900">{personalInfo.studentId}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <Mail className="h-4 w-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="text-base text-gray-900">{personalInfo.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <Phone className="h-4 w-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Contact</p>
                <p className="text-base text-gray-900">{personalInfo.contact}</p>
              </div>
            </div>
          </div>

          {/* Confirmation Note */}
          <div className="mt-6 rounded-md bg-blue-50 p-4">
            <p className="text-sm text-blue-900">
              Please review your information carefully. You will be redirected to the payment gateway once you proceed.
            </p>
          </div>
        </div>
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
        <button
          type="button"
          onClick={onNext}
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#09283b] px-6 py-3 text-sm font-medium text-white hover:bg-[#09283b]/90"
        >
          Proceed to Payment
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
