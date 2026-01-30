"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const historyData = [
  {
    period: "2006 – 2010",
    title: "FOUNDATION",
    description:
      "Foursquare International Secondary School was established in 2006 with a clear purpose: to provide quality education that combines strong academic foundations with Christian values, discipline, and character development. From the very beginning, the school was designed to nurture students academically while being rooted in morality and spirituality. In its early years, the school began with a modest student population and a small team of dedicated educators who shared a common vision for excellence.",
    images: ["/gallery/history-1a.jpg", "/gallery/history-1b.jpg"],
  },
  {
    period: "2011 – 2015",
    title: "GROWTH",
    description:
      "During this period, FISS experienced significant growth in student enrollment and expanded its facilities to accommodate the growing community. The school introduced new academic programs and extracurricular activities, establishing itself as a leading institution in the region. Our commitment to excellence attracted talented educators and motivated students from diverse backgrounds.",
    images: ["/gallery/history-2a.jpg", "/gallery/history-2b.jpg"],
  },
  {
    period: "2015 – 2019",
    title: "EXPANSION",
    description:
      "FISS continued to expand its infrastructure with modern classrooms, science laboratories, and sports facilities. The school achieved remarkable academic results with students excelling in national examinations. New partnerships with educational institutions enhanced our curriculum and provided students with broader opportunities for growth and development.",
    images: ["/gallery/history-3a.jpg", "/gallery/history-3b.jpg"],
  },
  {
    period: "2019 – 2023",
    title: "INNOVATION",
    description:
      "Embracing technology and modern teaching methods, FISS integrated digital learning tools into its curriculum. Despite global challenges, the school adapted quickly, maintaining academic excellence while prioritizing student well-being. This period saw the introduction of new programs focused on leadership development and community service.",
    images: ["/gallery/history-4a.jpg", "/gallery/history-4b.jpg"],
  },
  {
    period: "2023 – 2025",
    title: "EXCELLENCE",
    description:
      "Today, FISS stands as a beacon of educational excellence, continuing to nurture students who are academically proficient, morally upright, and ready to make positive contributions to society. Our alumni network spans across various professions, testament to the solid foundation provided by FISS education.",
    images: ["/gallery/history-5a.jpg", "/gallery/history-5b.jpg"],
  },
];

export default function HistorySection() {
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
