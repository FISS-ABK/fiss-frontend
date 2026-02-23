"use client";

import { Check } from "lucide-react";
import { PaymentStep } from "@/types/payment";

interface PaymentStepsProps {
  currentStep: PaymentStep;
}

const steps = [
  { id: 'personal' as PaymentStep, name: 'Personal Information', number: 1 },
  { id: 'review' as PaymentStep, name: 'Review', number: 2 },
  { id: 'payment' as PaymentStep, name: 'Payment', number: 3 },
];

export default function PaymentSteps({ currentStep }: PaymentStepsProps) {
  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  return (
    // 1. Added w-full and flex justify-center to the outer wrapper
    <div className="mb-8 flex w-full justify-center px-4">
      {/* 2. Constrain the width with max-w so it doesn't look stretched on desktop */}
      <div className="flex w-full max-w-2xl items-start justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
              <div className="relative flex flex-col items-center">
                {/* Step Circle */}
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                    isCompleted
                      ? 'border-green-600 bg-green-600 text-white'
                      : isCurrent
                      ? 'border-[#09283b] bg-[#09283b] text-white'
                      : 'border-gray-300 bg-white text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.number}</span>
                  )}
                </div>

                {/* Step Label - Absolute positioning helps prevent the circle from moving */}
                <span
                  className={`absolute top-12 whitespace-nowrap text-xs font-medium ${
                    isCurrent ? 'text-[#09283b]' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </span>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div
                  className={`mx-2 h-0.5 mt-5 flex-1 transition-colors ${
                    isCompleted ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}