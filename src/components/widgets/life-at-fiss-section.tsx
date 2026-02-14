"use client";

import Image from "next/image";

const galleryItems = [
  { label: "Classroom", image: "/FOURSQUARE PICTURES/OTHERS/1.jpg", rotation: "-rotate-3" },
  { label: "Events", image: "/FOURSQUARE PICTURES/mmm.jpeg", rotation: "rotate-2" },
  { label: "Excursion", image: "/FOURSQUARE PICTURES/mg.jpeg", rotation: "-rotate-1" },
  { label: "Environment", image: "/FOURSQUARE PICTURES/OTHERS/15.jpg", rotation: "rotate-3" },
];

const galleryItemsRow2 = [
  { label: "Buildings", image: "/FOURSQUARE PICTURES/OTHERS/13.jpg", rotation: "-rotate-2" },
  { label: "Healthcare", image: "/FOURSQUARE PICTURES/OTHERS/2.jpg", rotation: "rotate-2" },
];

export default function LifeAtFissSection() {
  return (
    <section className="relative bg-[#fafafa] py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      
      {/* --- BACKGROUND WATERMARK IMAGE --- */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]">
        <Image
          src="/FOURSQUARE PICTURES/OTHERS/1.jpg" // Using the logo as a watermark looks very professional
          alt="Background Texture"
          fill
          className="object-contain object-center scale-125" // Scale up to fill space nicely
          priority
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <h2 className="font-poppins mb-3 text-2xl font-semibold text-[#0b2c4d] sm:mb-4 sm:text-3xl md:text-4xl">
            Life at FISS
          </h2>
          <p className="font-suisse mx-auto max-w-md text-sm leading-relaxed text-gray-600 sm:text-base lg:max-w-lg">
            A glimpse into our classrooms, facilities, and everyday school experiences.
          </p>
        </div>

        {/* Gallery Grid - Row 1 */}
        <div className="mb-4 flex flex-wrap justify-center gap-4 sm:mb-6 sm:gap-6 md:mb-8 md:gap-8">
          {galleryItems.map((item) => (
            <div
              key={item.label}
              className={`${item.rotation} transform transition-all duration-300 hover:rotate-0 hover:scale-110 hover:z-20`}
            >
              <div className="flex flex-col overflow-hidden rounded-sm bg-white p-2 shadow-lg border border-gray-100">
                <div className="relative h-32 w-28 overflow-hidden xs:h-36 xs:w-32 sm:h-40 sm:w-36 md:h-48 md:w-44 lg:h-56 lg:w-52">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 176px, 208px"
                  />
                </div>
                <div className="bg-white pt-2 text-center">
                  <span className="font-handwriting font-medium text-xs text-gray-600 xs:text-sm">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Grid - Row 2 */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
          {galleryItemsRow2.map((item) => (
            <div
              key={item.label}
              className={`${item.rotation} transform transition-all duration-300 hover:rotate-0 hover:scale-110 hover:z-20`}
            >
              <div className="flex flex-col overflow-hidden rounded-sm bg-white p-2 shadow-lg border border-gray-100">
                <div className="relative h-32 w-28 overflow-hidden xs:h-36 xs:w-32 sm:h-40 sm:w-36 md:h-48 md:w-44 lg:h-56 lg:w-52">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 176px, 208px"
                  />
                </div>
                <div className="bg-white pt-2 text-center">
                  <span className="font-handwriting font-medium text-xs text-gray-600 xs:text-sm">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}