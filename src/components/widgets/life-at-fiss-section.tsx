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
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
        <div className="mb-4 grid grid-cols-2 justify-items-center gap-3 sm:mb-6 sm:flex sm:flex-wrap sm:justify-center sm:gap-4 md:mb-8 md:gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.label}
              className={`${item.rotation} transition-transform duration-300 hover:rotate-0 hover:scale-105`}
            >
              <div className="flex flex-col overflow-hidden rounded-sm bg-white p-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] sm:p-2">
                <div className="relative h-28 w-24 overflow-hidden xs:h-32 xs:w-28 sm:h-36 sm:w-32 md:h-44 md:w-40 lg:h-52 lg:w-48">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 176px, 208px"
                  />
                </div>
                <div className="bg-white py-1.5 text-center sm:py-2">
                  <span className="font-suisse text-[10px] text-gray-700 xs:text-xs sm:text-sm">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Grid - Row 2 */}
        <div className="grid grid-cols-2 justify-items-center gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-4 md:gap-6">
          {galleryItemsRow2.map((item) => (
            <div
              key={item.label}
              className={`${item.rotation} transition-transform duration-300 hover:rotate-0 hover:scale-105`}
            >
              <div className="flex flex-col overflow-hidden rounded-sm bg-white p-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] sm:p-2">
                <div className="relative h-28 w-24 overflow-hidden xs:h-32 xs:w-28 sm:h-36 sm:w-32 md:h-44 md:w-40 lg:h-52 lg:w-48">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 176px, 208px"
                  />
                </div>
                <div className="bg-white py-1.5 text-center sm:py-2">
                  <span className="font-suisse text-[10px] text-gray-700 xs:text-xs sm:text-sm">
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
