"use client";

import { ChevronDown, Flame, FileText, Shield, Users, Image as ImageIcon, UserCheck, ClipboardCheck, Check, DollarSign } from "lucide-react";
import { useState } from "react";

interface AccordionItem {
  id: string;
  number: string;
  title: string;
  content: React.ReactNode;
}

const requirements = [
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
    title: "Commitment to School Values",
    description: "Parents and students are expected to support the school's Christian values, moral standards, and learning culture.",
  },
];

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

const documents = [
  {
    icon: <FileText className="h-5 w-5 text-blue-500" />,
    title: "Birth Certificate",
    description: "Official birth certificate or age verification document",
  },
  {
    icon: <ImageIcon className="h-5 w-5 text-green-500" />,
    title: "Passport Photos",
    description: "Recent passport-sized photographs (2 copies)",
  },
  {
    icon: <ClipboardCheck className="h-5 w-5 text-purple-500" />,
    title: "Previous School Records",
    description: "Academic transcripts and report cards from previous school",
  },
  {
    icon: <UserCheck className="h-5 w-5 text-orange-500" />,
    title: "Guardian Information",
    description: "Valid identification and contact details of parent/guardian",
  },
  {
    icon: <FileText className="h-5 w-5 text-red-500" />,
    title: "Medical Records",
    description: "Immunization records and health assessment form",
  },
  {
    icon: <ClipboardCheck className="h-5 w-5 text-teal-500" />,
    title: "Transfer Certificate",
    description: "Official transfer certificate from previous school (if applicable)",
  },
];

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

export default function AdmissionsAccordion() {
  const [openItem, setOpenItem] = useState<string>("eligibility");

  const toggleItem = (itemId: string) => {
    setOpenItem(openItem === itemId ? "" : itemId);
  };

  const accordionItems: AccordionItem[] = [
    {
      id: "eligibility",
      number: "01",
      title: "Eligibility Requirements",
      content: (
        <div className="grid gap-6 sm:grid-cols-2">
          {requirements.map((req, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-[#f5f7f7] p-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 shadow-sm">
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
      ),
    },
    {
      id: "process",
      number: "02",
      title: "Admission Process Timeline",
      content: (
        <div className="relative space-y-6">
          {processSteps.map((item, index) => (
            <div key={index} className="relative flex gap-4">
              {index !== processSteps.length - 1 && (
                <div className="absolute left-6 top-12 h-full w-0.5 bg-gray-300" />
              )}
              <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#0b2c4d] font-poppins text-sm font-bold text-white">
                {index + 1}
              </div>
              <div className="flex-1 pb-6">
                <div className="rounded-lg border border-gray-200 bg-[#f5f7f7] p-5 shadow-sm">
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
      ),
    },
    {
      id: "documents",
      number: "03",
      title: "Required Documents",
      content: (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-lg border border-gray-200 bg-[#f5f7f7] p-4 transition-all"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50 shadow-sm">
                  {doc.icon}
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-poppins text-base font-semibold text-[#0b2c4d]">
                    {doc.title}
                  </h3>
                  <p className="font-suisse text-sm text-gray-600">
                    {doc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="font-suisse text-sm text-blue-800">
              <strong>Note:</strong> All documents must be original or certified copies. Additional documents may be requested during the review process.
            </p>
          </div>
        </>
      ),
    },
    {
      id: "tuition",
      number: "04",
      title: "Tuition Overview",
      content: (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            {tuitionPlans.map((plan, index) => (
              <div
                key={index}
                className="rounded-xl border-2 border-gray-200 bg-[#f5f7f7] p-6 shadow-md transition-all hover:shadow-lg"
              >
                <div className="mb-4 border-b border-gray-200 pb-4">
                  <h3 className="mb-1 font-poppins text-xl font-bold text-[#0b2c4d]">
                    {plan.level}
                  </h3>
                  <p className="font-suisse text-sm text-gray-600">
                    {plan.grades}
                  </p>
                </div>
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
                <div className="my-4 border-t border-gray-200" />
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
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5">
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
        </>
      ),
    },
  ];

  return (
    <section className="bg-[#edf5f5] py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {accordionItems.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleItem(item.id)}
                className="flex w-full items-center justify-between gap-4 bg-[#0b2c4d] p-4 text-left transition-all hover:bg-[#0d3558] sm:p-5"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 font-poppins text-lg font-bold text-white sm:h-10 sm:w-10">
                    {item.number}
                  </span>
                  <span className="font-poppins text-base font-semibold text-white sm:text-lg md:text-xl">
                    {item.title}
                  </span>
                </span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-white transition-transform duration-300 ${
                    openItem === item.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Accordion Content */}
              <div
                className={`transition-all duration-300 ${
                  openItem === item.id
                    ? "max-h-[5000px] opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <div className="bg-[#f5f7f7] p-6 sm:p-8">{item.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
