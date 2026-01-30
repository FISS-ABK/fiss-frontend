"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const processSteps = [
  {
    step: "Step 1",
    title: "Submit Application",
    description: "Complete and submit the admission form with required documents.",
    timeline: "Week 1",
  },
  {
    step: "Step 2",
    title: "Document Review",
    description: "Our admissions team reviews all submitted materials and credentials.",
    timeline: "Week 2",
  },
  {
    step: "Step 3",
    title: "Assessment & Interview",
    description: "Student assessment and parent interview to understand family values and expectations.",
    timeline: "Week 3",
  },
  {
    step: "Step 4",
    title: "Admission Decision",
    description: "Receive notification of admission status and next steps.",
    timeline: "Week 4",
  },
];

export default function AdmissionProcessSection() {
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
                  02
                </span>
                <span className="font-poppins text-lg font-semibold text-white sm:text-xl">
                  Admission Process Timeline
                </span>
              </span>
              <ChevronDown
                className={`h-5 w-5 text-white transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Right Column - Process Timeline */}
          <div
            className={`md:w-3/5 lg:w-2/3 transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 max-h-0 overflow-hidden"
            }`}
          >
            <div className="relative space-y-6">
              {processSteps.map((item, index) => (
                <div key={index} className="relative flex gap-4">
                  {/* Timeline Line */}
                  {index !== processSteps.length - 1 && (
                    <div className="absolute left-6 top-12 h-full w-0.5 bg-gray-300" />
                  )}

                  {/* Step Number Circle */}
                  <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#0b2c4d] font-poppins text-sm font-bold text-white">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="font-poppins text-lg font-semibold text-[#0b2c4d]">
                          {item.title}
                        </h3>
                        <span className="rounded-full bg-blue-100 px-3 py-1 font-suisse text-xs font-medium text-blue-700">
                          {item.timeline}
                        </span>
                      </div>
                      <p className="font-suisse text-sm leading-relaxed text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
