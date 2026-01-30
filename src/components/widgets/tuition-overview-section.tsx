"use client";

import { ChevronDown, Check, DollarSign } from "lucide-react";
import { useState } from "react";

const tuitionPlans = [
  {
    level: "Primary Level",
    grades: "JSS 1 - JSS 3",
    fees: {
      tuition: "₦450,000",
      registration: "₦25,000",
      development: "₦50,000",
    },
    includes: [
      "Standard curriculum materials",
      "School uniform (2 sets)",
      "Library access",
      "Basic sports facilities",
    ],
  },
  {
    level: "Secondary Level",
    grades: "SSS 1 - SSS 3",
    fees: {
      tuition: "₦550,000",
      registration: "₦25,000",
      development: "₦75,000",
    },
    includes: [
      "Advanced curriculum materials",
      "School uniform (2 sets)",
      "Science laboratory access",
      "Library and digital resources",
      "Sports and extracurricular activities",
      "Exam preparation support",
    ],
  },
];

export default function TuitionOverviewSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12 lg:gap-16">
          {/* Left Column - Accordion Header */}
          <div className="md:w-2/5 lg:w-1/3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex w-full items-center justify-between gap-4 rounded-lg bg-[#0b2c4d] p-4 text-left transition-all hover:bg-[#0d3558]"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 font-poppins text-lg font-bold text-white">
                  04
                </span>
                <span className="font-poppins text-lg font-semibold text-white sm:text-xl">
                  Tuition Overview
                </span>
              </span>
              <ChevronDown
                className={`h-5 w-5 text-white transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Right Column - Tuition Plans */}
          <div
            className={`md:w-3/5 lg:w-2/3 transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 max-h-0 overflow-hidden"
            }`}
          >
            <div className="grid gap-6 lg:grid-cols-2">
              {tuitionPlans.map((plan, index) => (
                <div
                  key={index}
                  className="rounded-xl border-2 border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-lg"
                >
                  {/* Header */}
                  <div className="mb-4 border-b border-gray-200 pb-4">
                    <h3 className="mb-1 font-poppins text-xl font-bold text-[#0b2c4d]">
                      {plan.level}
                    </h3>
                    <p className="font-suisse text-sm text-gray-600">
                      {plan.grades}
                    </p>
                  </div>

                  {/* Fees */}
                  <div className="mb-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-suisse text-sm text-gray-600">
                        Tuition Fee
                      </span>
                      <span className="font-poppins text-lg font-bold text-[#0b2c4d]">
                        {plan.fees.tuition}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-suisse text-sm text-gray-600">
                        Registration Fee
                      </span>
                      <span className="font-poppins text-base font-semibold text-gray-700">
                        {plan.fees.registration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-suisse text-sm text-gray-600">
                        Development Levy
                      </span>
                      <span className="font-poppins text-base font-semibold text-gray-700">
                        {plan.fees.development}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-4 border-t border-gray-200" />

                  {/* Includes */}
                  <div>
                    <h4 className="mb-3 font-poppins text-sm font-semibold text-[#0b2c4d]">
                      Fee Includes:
                    </h4>
                    <ul className="space-y-2">
                      {plan.includes.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 font-suisse text-sm text-gray-600"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Info */}
            <div className="mt-6 rounded-lg bg-amber-50 p-5 border border-amber-200">
              <div className="mb-2 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-amber-600" />
                <h4 className="font-poppins text-base font-semibold text-amber-900">
                  Payment Information
                </h4>
              </div>
              <p className="font-suisse text-sm leading-relaxed text-amber-800">
                Payment plans are available for families. Tuition can be paid in installments: 60% at resumption and 40% mid-term. Additional fees may apply for extracurricular activities, field trips, and special programs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
