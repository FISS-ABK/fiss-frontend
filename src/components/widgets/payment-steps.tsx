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
    <div className="mb-8 w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
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
                <span
                  className={`mt-2 text-xs font-medium ${
                    isCurrent ? 'text-[#09283b]' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`mx-4 h-0.5 flex-1 ${
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
