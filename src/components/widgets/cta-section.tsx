import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Heading */}
          <h2 className="font-poppins mb-4 text-2xl font-bold text-[#0a1628] sm:text-3xl md:text-4xl lg:text-5xl">
            Take the Next Step with Confidence
          </h2>

          {/* Subtitle */}
          <p className="font-suisse mx-auto mb-8 max-w-2xl text-sm text-gray-600 sm:mb-10 sm:text-base md:mb-12">
            Explore our academic programs, learn more about admissions, or reach
            out to our team for guidance.
          </p>

          {/* Buttons */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/admissions"
              className="font-poppins flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0B2C4D] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#233653] sm:h-12 sm:w-auto sm:px-8 sm:text-base"
            >
              <span>Apply for Admission</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>

            <Link
              href="/academics"
              className="font-poppins flex h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-[#0B2C4D] bg-white px-6 text-sm font-semibold text-[#0B2C4D] transition-colors hover:bg-gray-50 sm:h-12 sm:w-auto sm:px-8 sm:text-base"
            >
              <span>Explore Academics</span>
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
