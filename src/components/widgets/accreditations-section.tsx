import Image from "next/image";

const accreditations = [
  {
    name: "Accredited Joint Admissions and Matriculation Board (JAMB) Center",
    shortName: "JAMB",
    logo: "/logos/jamb.png",
  },
  {
    name: "West African Examinations Council (WAEC)",
    shortName: "WAEC",
    logo: "/logos/waec.png",
  },
  {
    name: "Association of Christian Schools International (ACSI)",
    shortName: "ACSI",
    logo: "/logos/acsi.png",
  },
];

export default function AccreditationsSection() {
  return (
    <section className="bg-[#0a1628] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-12 md:mb-16">
          <h2 className="font-poppins mb-3 text-2xl font-bold text-white sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
            Accreditation & Affiliations
          </h2>
          <p className="font-suisse mx-auto max-w-xl text-sm text-white/70 sm:text-base">
            Recognized by trusted educational and professional bodies.
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8 lg:gap-12">
          {accreditations.map((item) => (
            <div
              key={item.shortName}
              className="flex flex-col items-center rounded-2xl bg-[#1a2a42] p-6 text-center transition-transform duration-300 hover:scale-[1.02] sm:p-8"
            >
              {/* Logo */}
              <div className="relative mb-4 h-20 w-20 sm:mb-6 sm:h-24 sm:w-24 md:h-28 md:w-28">
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Name */}
              <p className="font-suisse text-xs leading-relaxed text-white/80 sm:text-sm">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
