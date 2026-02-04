"use client";

import { useState } from "react";
import { PersonalInformation } from "@/types/payment";
import { ArrowRight } from "lucide-react";

interface PersonalInformationFormProps {
  onNext: (info: PersonalInformation) => void;
  initialData?: PersonalInformation;
  onCancel: () => void;
}

export default function PersonalInformationForm({
  onNext,
  initialData,
  onCancel,
}: PersonalInformationFormProps) {
  const [formData, setFormData] = useState<PersonalInformation>(
    initialData || {
      fullName: "",
      studentId: "",
      email: "",
      contact: "",
    }
  );

  const [errors, setErrors] = useState<Partial<PersonalInformation>>({});

  const handleChange = (field: keyof PersonalInformation, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<PersonalInformation> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = "Student ID is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.contact)) {
      newErrors.contact = "Invalid contact number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext(formData);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#09283b]">
          Personal Information
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Please provide your details to proceed with the payment
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-[#09283b] focus:outline-none focus:ring-1 focus:ring-[#09283b] ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="studentId"
              className="block text-sm font-medium text-gray-700"
            >
              Student ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="studentId"
              value={formData.studentId}
              onChange={(e) => handleChange("studentId", e.target.value)}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-[#09283b] focus:outline-none focus:ring-1 focus:ring-[#09283b] ${
                errors.studentId ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your student ID"
            />
            {errors.studentId && (
              <p className="mt-1 text-xs text-red-500">{errors.studentId}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-[#09283b] focus:outline-none focus:ring-1 focus:ring-[#09283b] ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="contact"
              value={formData.contact}
              onChange={(e) => handleChange("contact", e.target.value)}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-[#09283b] focus:outline-none focus:ring-1 focus:ring-[#09283b] ${
                errors.contact ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="+234 800 000 0000"
            />
            {errors.contact && (
              <p className="mt-1 text-xs text-red-500">{errors.contact}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#09283b] px-4 py-2 text-sm font-medium text-white hover:bg-[#09283b]/90"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
