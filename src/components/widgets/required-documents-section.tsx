"use client";

import { ChevronDown, FileText, Image as ImageIcon, UserCheck, ClipboardCheck } from "lucide-react";
import { useState } from "react";

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

export default function RequiredDocumentsSection() {
  const [isOpen, setIsOpen] = useState(false);

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
                  03
                </span>
                <span className="font-poppins text-lg font-semibold text-white sm:text-xl">
                  Required Documents
                </span>
              </span>
              <ChevronDown
                className={`h-5 w-5 text-white transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Right Column - Documents List */}
          <div
            className={`md:w-3/5 lg:w-2/3 transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 max-h-0 overflow-hidden"
            }`}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 transition-all hover:shadow-md"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
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
            <div className="mt-6 rounded-lg bg-blue-50 p-4 border border-blue-200">
              <p className="font-suisse text-sm text-blue-800">
                <strong>Note:</strong> All documents must be original or certified copies. Additional documents may be requested during the review process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
