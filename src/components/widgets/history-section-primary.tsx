"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const historyData = [
  {
    period: "2006 – 2015",
    title: "FOUNDATION",
    description:
      "The journey of academic distinction began in September 1997 with the establishment of Foursquare Nursery and Primary School in Asero, Abeokuta. Founded with a clear vision to provide a solid educational bedrock for children in the community, the school has remained committed to nurturing young minds for over two decades. What started as a modest initiative has blossomed into a thriving center for early childhood learning, currently catering to 532 learners. This steady growth is a testament to the school’s dedication to instilling both academic curiosity and moral discipline from the very start of a child's life.",
    images: ["/28.png", "/13.png"],
  },
  {
    period: "2015 - 2020",
    title: "GROWTH",
    description:
      "Building on the success of the primary arm, the vision for comprehensive education was expanded on the 16th of September, 2006, with the commencement of Foursquare International Secondary School. This strategic step was taken to ensure that the values and academic rigor established at the primary level could be sustained through the teenage years. Since its inception, the secondary school has experienced tremendous growth and acceptance within the state, currently boasting a robust student enrollment of 1,184. This impressive number reflects the parents' continued trust in the school’s ability to deliver quality education and character molding.",
    images: ["/29.png", "/14.png"],
  },
  {
    period: "2020 - 2026",
    title: "EXPANSION",
    description:
      "Foursquare Schools, Abeokuta, operates under the steadfast proprietorship of the Foursquare Gospel Church (Abeokuta and Ita-Oshin Districts). Being fully owned by the church ensures that the institution is not just focused on academic grades but is also deeply rooted in Christian values and spiritual guidance. This backing provides the moral compass that guides the school's administration, ensuring that every student is groomed to be not only intellectually sound but also spiritually alive and socially responsible.",
    images: ["/30.png", "/15.png"],
  },
];

export default function HistorySectionPrimary() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? historyData.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === historyData.length - 1 ? 0 : prev + 1));
  };

  const activeHistory = historyData[activeIndex];

  return (
    <section className="bg-white py-6 sm:py-8 md:py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between sm:mb-10 md:mb-12">
          <h2 className="font-poppins text-2xl font-bold text-[#0a1628] sm:text-3xl md:text-4xl">
            Our History
          </h2>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevious}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f5f5f5] transition-colors hover:bg-[#e5e5e5] sm:h-10 sm:w-10"
              aria-label="Previous period"
            >
              <ChevronLeft className="h-4 w-4 text-[#0a1628] sm:h-5 sm:w-5" />
            </button>
            <button
              onClick={goToNext}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B2C4D] transition-colors hover:bg-[#1a2638] sm:h-10 sm:w-10"
              aria-label="Next period"
            >
              <ChevronRight className="h-4 w-4 text-white sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        {/* Timeline Tabs */}
        <div className="mb-8 border-b border-gray-200 sm:mb-10 md:mb-12">
          <div className="flex gap-4 overflow-x-auto sm:gap-6 md:gap-8 lg:gap-12">
            {historyData.map((item, index) => (
              <button
                key={item.period}
                onClick={() => setActiveIndex(index)}
                className={`font-suisse whitespace-nowrap border-b-2 pb-3 text-sm transition-colors sm:pb-4 sm:text-base ${
                  index === activeIndex
                    ? "border-[#0a1628] font-semibold text-[#0a1628]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {item.period}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative overflow-hidden">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Text Content */}
            <div className="relative min-h-75 sm:min-h-87.5">
              {historyData.map((item, index) => (
                <div
                  key={item.period}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    index === activeIndex
                      ? "translate-x-0 opacity-100"
                      : index < activeIndex
                        ? "-translate-x-full opacity-0"
                        : "translate-x-full opacity-0"
                  }`}
                >
                  <h3 className="font-poppins mb-4 text-lg font-bold text-[#0a1628] sm:mb-6 sm:text-xl md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="font-suisse text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Images */}
            <div className="relative min-h-75 sm:min-h-100">
              {historyData.map((item, index) => (
                <div
                  key={item.period}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    index === activeIndex
                      ? "translate-x-0 opacity-100"
                      : index < activeIndex
                        ? "-translate-x-full opacity-0"
                        : "translate-x-full opacity-0"
                  }`}
                >
                  <div className="relative h-full">
                    {/* Main Image */}
                    <div className="relative h-[70%] w-[80%] overflow-hidden rounded-xl shadow-lg">
                      <Image
                        src={item.images[0]}
                        alt={`${item.title} - Main`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Secondary Image - Overlapping */}
                    <div className="absolute bottom-0 right-0 h-[50%] w-[50%] overflow-hidden rounded-xl border-4 border-white shadow-lg">
                      <Image
                        src={item.images[1]}
                        alt={`${item.title} - Secondary`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
