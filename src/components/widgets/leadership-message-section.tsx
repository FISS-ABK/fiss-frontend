import Image from "next/image";

export default function LeadershipMessageSection() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="font-poppins mb-10 text-center text-2xl font-bold text-[#0a1628] sm:mb-12 sm:text-3xl md:mb-16 md:text-4xl lg:text-5xl">
          A Message from Our{" "}
          <span className="text-[#324e69] underline decoration-2 underline-offset-4">
            Leadership
          </span>
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Text Content */}
          <div>
            <p className="font-suisse text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg">
              At Foursquare International Secondary School, we are committed to
              nurturing every child&apos;s academic potential while instilling
              strong moral values. Our focus is on creating a disciplined,
              supportive environment where students feel safe, inspired, and
              encouraged to grow. We believe education goes beyond the
              classroom – shaping character, confidence, and purpose. We look
              forward to partnering with parents to guide our students toward a
              successful future.
            </p>
          </div>

          {/* Image with Caption */}
          <div className="relative">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-lg sm:rounded-3xl">
              <Image
                src="/1.png"
                alt="Rev J. Olukunle Dawodu - Chairman"
                fill
                className="object-cover"
              />
            </div>

            {/* Caption Overlay */}
            <div className="absolute bottom-4 right-4 rounded-lg bg-[#c9a227] px-4 py-2 text-right shadow-md sm:bottom-6 sm:right-6 sm:px-5 sm:py-3">
              <p className="font-poppins text-sm font-semibold text-white sm:text-base">
                Rev J. Olukunle Dawodu
              </p>
              <p className="font-suisse text-xs text-white/90 sm:text-sm">
                Chairman
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
