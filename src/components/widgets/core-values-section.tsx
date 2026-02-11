import Image from "next/image";

const coreValues = [
  {
    title: "Faith",
    description:
      "We teach our children to love God, practice tolerance, integrity, and respect in every aspect of learning and daily life.",
    image: "/FOURSQUARE PICTURES/inter/100.JPG",
  },
  {
    title: "Excellence",
    description:
      "We strive for high academic standards and exemplary character, encouraging every student to reach their potential.",
    image: "/FOURSQUARE PICTURES/inter/200.JPG",
  },
  {
    title: "Discipline",
    description:
      "We promote responsibility, self-control, and respect for others, fostering a positive and structured learning culture.",
    image: "/FOURSQUARE PICTURES/prs.png",
  },
];

export default function CoreValuesSection() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-12 md:mb-16">
          <h2 className="font-poppins mb-3 text-2xl font-bold text-[#0a1628] sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
            Our Core Values
          </h2>
          <p className="font-suisse mx-auto max-w-2xl text-sm text-gray-600 sm:text-base">
            The principles that guide our teaching, leadership, and student
            development.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
          {coreValues.map((value, index) => (
            <div
              key={value.title}
              className="group"
              style={{
                transform: index === 1 ? "translateY(0)" : undefined,
              }}
            >
              {/* Image Container with rotation effect */}
              <div
                className={`relative mb-5 aspect-4/5 overflow-hidden rounded-xl shadow-lg transition-transform duration-300 sm:mb-6 ${
                  index === 0
                    ? "-rotate-3 group-hover:rotate-0"
                    : index === 2
                      ? "rotate-3 group-hover:rotate-0"
                      : "group-hover:scale-[1.02]"
                }`}
              >
                <Image
                  src={value.image}
                  alt={value.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text Content */}
              <div className="px-2">
                <h3 className="font-poppins mb-2 text-lg font-bold italic text-[#0a1628] sm:text-xl md:text-2xl">
                  {value.title}
                </h3>
                <p className="font-suisse text-sm leading-relaxed text-gray-600 sm:text-base">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
