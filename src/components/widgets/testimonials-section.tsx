"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "FISS has provided my child with not just academic excellence, but strong values and discipline. The teachers are supportive, and the environment feels safe and nurturing.",
    name: "Mrs. Adebayo",
    role: "Parent",
    avatar: "/testimonials/avatar1.png",
  },
  {
    id: 2,
    quote:
      "The quality of education at FISS is outstanding. My children have grown academically and morally. I highly recommend this school to every parent.",
    name: "Mr. Okonkwo",
    role: "Parent",
    avatar: "/testimonials/avatar2.png",
  },
  {
    id: 3,
    quote:
      "As a student, I've had amazing experiences at FISS. The teachers genuinely care about our success and the facilities are top-notch.",
    name: "Chisom Eze",
    role: "Student",
    avatar: "/testimonials/avatar3.png",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="font-poppins mb-8 text-center text-xl font-bold leading-tight text-[#0a1628] sm:mb-10 sm:text-2xl md:mb-12 md:text-3xl lg:mb-16 lg:text-4xl xl:text-5xl">
          Real Experiences From Families Who
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          Are Part Of The FISS Community
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 items-center overflow-hidden rounded-2xl bg-[#04101C] sm:rounded-3xl lg:grid-cols-2">
          {/* Testimonial Card */}
          <div className="relative overflow-hidden p-5 sm:p-8 md:p-10 lg:p-12">
            {/* Label */}
            <p className="font-suisse mb-4 text-xs text-white/80 sm:mb-6 sm:text-sm">
              What Parents And Students Say
            </p>

            {/* Quote Container with fixed height */}
            <div className="relative mb-6 min-h-30 sm:mb-8 sm:min-h-25 md:min-h-27.5 lg:min-h-32.5">
              {testimonials.map((testimonial, index) => (
                <blockquote
                  key={testimonial.id}
                  className={`font-suisse absolute inset-0 text-base leading-relaxed text-white transition-all duration-500 ease-in-out sm:text-lg md:text-xl lg:text-2xl ${
                    index === currentIndex
                      ? "translate-x-0 opacity-100"
                      : index < currentIndex
                        ? "-translate-x-full opacity-0"
                        : "translate-x-full opacity-0"
                  }`}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              ))}
            </div>

            {/* Author Container with fixed height */}
            <div className="relative mb-6 h-10 sm:mb-8 sm:h-11">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 flex items-center gap-3 transition-all duration-500 ease-in-out ${
                    index === currentIndex
                      ? "translate-x-0 opacity-100"
                      : index < currentIndex
                        ? "-translate-x-full opacity-0"
                        : "translate-x-full opacity-0"
                  }`}
                >
                  <div className="h-9 w-9 overflow-hidden rounded-full bg-gray-600 sm:h-10 sm:w-10">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="font-suisse text-sm text-white">
                    {testimonial.name}, {testimonial.role}
                  </p>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrevious}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a2a42] transition-colors hover:bg-[#2a3a52] sm:h-10 sm:w-10"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4 text-white sm:h-5 sm:w-5" />
              </button>
              <button
                onClick={goToNext}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a2a42] transition-colors hover:bg-[#2a3a52] sm:h-10 sm:w-10"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4 text-white sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>

          {/* Family Illustration */}
          <div className="hidden items-end justify-center lg:flex mt-28">
            <Image
              src="/family.png"
              alt="FISS Community Family Illustration"
              width={400}
              height={300}
              className="h-auto w-full max-w-md object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
