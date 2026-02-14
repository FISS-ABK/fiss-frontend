"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"; // Ensure framer-motion is installed

import Navbar from "@/components/navbar";
import FloatingNavWrapper from "@/components/floating-nav-wrapper";
import HistorySectionPrimary from "@/components/widgets/history-section-primary";
import CoreValuesSection from "@/components/widgets/core-values-section";
import LeadershipTeamSectionPrimary from "@/components/widgets/leadership-team-section-primary";
import DotSeparator from "@/components/dot-separator";
import Footer from "@/components/footer";
import TeachingAdminSectionPrimary from "@/components/widgets/teaching-admin-section-primary";
import SchoolMottoSectionPrimary from "@/components/widgets/school-motto-section-primary";
import AcademicPhilosophyHeroSection from "@/components/widgets/academic-philosophy-hero-section";


// 1. CAROUSEL IMAGES FOR PRIMARY SCHOOL
const heroImages = [
  "/22.png",                           // Campus Building
  "/17.png",                           // Students
  "/16.png", // School View
  "/18.png",                           // Event
];

// Gallery Grid Items
const items = [
  { src: "/13.png", caption: "School View", wide: true, tall: false },
  { src: "/14.png", caption: "Students", wide: false, tall: true },
  { src: "/15.png", caption: "Event", wide: false, tall: true },
  { src: "/17.png", caption: "Talent Day", wide: false, tall: false },
  { src: "/16.png", caption: "Event", wide: false, tall: false },
  { src: "/FOURSQUARE PICTURES/OTHERS/14.jpg", caption: "School view", wide: false, tall: false },
  { src: "/18.png", caption: "Prize Giving Day", wide: true, tall: false },
];

export default function AboutPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 2. AUTO-CYCLE TIMER (Every 6 Seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <FloatingNavWrapper initialBg="bg-transparent">
        <Navbar />
      </FloatingNavWrapper>

      {/* --- HERO SECTION WITH CAROUSEL --- */}
      <section className="relative min-h-150 sm:min-h-175 lg:min-h-screen -mt-40 sm:-mt-42 md:-mt-42 overflow-hidden">
        
        {/* A. Background Carousel */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="relative h-full w-full"
            >
              <Image
                src={heroImages[currentImageIndex]}
                alt="FISS Primary Campus"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* B. Dark Overlay */}
        <div className="absolute inset-0 z-10 bg-black/40" />

        {/* C. Content Overlay */}
        <div className="relative z-20 flex h-full min-h-150 sm:min-h-175 lg:min-h-screen flex-col pt-18 sm:pt-20 md:pt-24">
          <div className="flex flex-1 flex-col justify-center px-4 pb-20 sm:px-6 md:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
              <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 1, delay: 0.5 }}
              >
                <h1 className="font-poppins mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  About
                </h1>
                <h2 className="font-suisse mb-6 text-lg text-white/90 sm:text-xl md:text-2xl lg:text-3xl">
                  Foursquare Nursery & Primary School
                </h2>
                <p className="font-suisse max-w-2xl text-sm text-white/80 sm:text-base md:text-lg">
                  Building strong academic foundations rooted in values, discipline, and excellence.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- REST OF THE PAGE --- */}
      <DotSeparator />
      <AcademicPhilosophyHeroSection />
      <SchoolMottoSectionPrimary />
      <DotSeparator />
      <HistorySectionPrimary />
      <DotSeparator />
      <TeachingAdminSectionPrimary />
      <DotSeparator />
      <LeadershipTeamSectionPrimary />
      <DotSeparator />

      {/* MASONRY GALLERY */}
      <main className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((it, idx) => {
            const span = it.wide ? "md:col-span-2" : "md:col-span-1";
            const height = it.tall ? "h-80" : "h-48";
            return (
              <figure key={idx} className={`${span} overflow-hidden rounded bg-white shadow-sm transition-transform hover:scale-[1.02]`}>
                <div className={`relative ${height} w-full bg-gray-100`}> 
                  <Image
                    src={it.src}
                    alt={it.caption}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="border-t px-3 py-2 text-xs font-medium text-gray-700">{it.caption}</figcaption>
              </figure>
            );
          })}
        </div>
      </main>

      <DotSeparator />
      <Footer />
    </div>
  );
}