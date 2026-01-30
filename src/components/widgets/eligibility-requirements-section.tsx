"use client";

import { ChevronDown, Flame, FileText, Shield, Users } from "lucide-react";
import { useState } from "react";

interface RequirementItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const requirements: RequirementItem[] = [
  {
    icon: <Flame className="h-5 w-5 text-red-500" />,
    title: "Age Criteria",
    description: "Students must meet the minimum age requirement for their desired class level. Starting ages typically follow academic placement and learning readiness.",
  },
  {
    icon: <FileText className="h-5 w-5 text-blue-500" />,
    title: "Academic Records",
    description: "Submission of previous school reports or transcripts is required to assess the student's academic background and learning progress.",
  },
  {
    icon: <Shield className="h-5 w-5 text-green-500" />,
    title: "Conduct & Discipline",
    description: "Applicants are expected to demonstrate positive behaviour and a willingness to uphold school rules, values, and standards of conduct.",
  },
  {
    icon: <Users className="h-5 w-5 text-purple-500" />,
    title: "Guardianship & School Status",
    description: "Applicants must provide evidence to support the student's current school or homeschool status, overall attendance, and learning history.",
  },
];

export default function EligibilityRequirementsSection() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
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
                  01
                </span>
                <span className="font-poppins text-lg font-semibold text-white sm:text-xl">
                  Eligibility Requirements
                </span>
              </span>
              <ChevronDown
                className={`h-5 w-5 text-white transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Right Column - Requirements Content */}
          <div
            className={`md:w-3/5 lg:w-2/3 transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 max-h-0 overflow-hidden"
            }`}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {requirements.map((req, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
                      {req.icon}
                    </div>
                    <h3 className="font-poppins text-base font-semibold text-[#0b2c4d] sm:text-lg">
                      {req.title}
                    </h3>
                  </div>
                  <p className="font-suisse text-sm leading-relaxed text-gray-600">
                    {req.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
