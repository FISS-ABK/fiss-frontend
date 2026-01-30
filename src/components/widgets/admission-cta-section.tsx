import { Phone } from "lucide-react";

export default function AdmissionCTASection() {
  return (
    <section className="bg-white py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 font-poppins text-3xl font-bold text-[#0b2c4d] sm:text-4xl md:text-5xl">
          Begin Your Child&apos;s Admission Journey
        </h2>
        <p className="mb-8 font-suisse text-base text-gray-600 sm:text-lg md:text-xl">
          Our admissions team is ready to guide you through every step.
        </p>
        <button className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0b2c4d] px-6 font-poppins text-base font-semibold text-white transition-all hover:bg-[#0d3558] sm:h-14 sm:px-8 sm:text-lg">
          Contact Us
          <span className="relative inline-flex h-6 w-6 items-center justify-center rounded bg-[rgba(4,16,28,0.3)]">
            <Phone className="h-4 w-4" />
          </span>
        </button>
      </div>
    </section>
  );
}
