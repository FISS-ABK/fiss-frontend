import Image from "next/image";

export default function AdmissionsHeroSection() {
  return (
    <section className="bg-[#edf5f5] py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex flex-col gap-6 text-center">
            <h1 className="font-poppins text-3xl font-bold leading-tight text-[#0b2c4d] sm:text-4xl md:text-5xl lg:text-6xl">
              Admissions Made Clear and Simple
            </h1>
            <p className="font-suisse text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl">
              We partner with parents to ensure a smooth and transparent admission process, providing guidance, clarity, and support at every stage of your child&apos;s educational journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
