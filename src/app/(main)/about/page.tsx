"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"; // Make sure you have installed framer-motion

import Navbar from "@/components/navbar";
import FloatingNavWrapper from "@/components/floating-nav-wrapper";
import HistorySection from "@/components/widgets/history-section";
import VisionMissionSection from "@/components/widgets/vision-mission-section";
import CoreValuesSection from "@/components/widgets/core-values-section";
import LeadershipMessageSection from "@/components/widgets/leadership-message-section";
import LeadershipTeamSection from "@/components/widgets/leadership-team-section";
import AccreditationsSection from "@/components/widgets/accreditations-section";
import CTASection from "@/components/widgets/cta-section";
import DotSeparator from "@/components/dot-separator";
import Footer from "@/components/footer";

// 1. DEFINE YOUR CAROUSEL IMAGES HERE
const heroImages = [
  "/FOURSQUARE PICTURES/OTHERS/14.jpg",      // Main Building
  "/38.png",      // Another view
  "/39.png", // Students/Assembly
  "/40.png",       // Classroom/Writing
];

export default function AboutPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 2. AUTOMATIC TIMER (Changes every 6 seconds)
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
        
        {/* A. The Background Carousel */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1 }} // Start slightly zoomed in
              animate={{ opacity: 1, scale: 1 }}    // Slowly zoom out to normal
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: "easeOut" }} // Very smooth, slow transition
              className="relative h-full w-full"
            >
              <Image
                src={heroImages[currentImageIndex]}
                alt="FISS Campus Life"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* B. Dark Overlay (Stays Static) */}
        <div className="absolute inset-0 z-10 bg-black/50" />

        {/* C. The Text Content (Stays Static & On Top) */}
        <div className="relative z-20 flex h-full min-h-150 sm:min-h-175 lg:min-h-screen flex-col pt-18 sm:pt-20 md:pt-24">
          <div className="flex flex-1 flex-col justify-center px-4 pb-20 sm:px-6 md:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <h1 className="font-poppins mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  About FISS
                </h1>
                <h2 className="font-suisse mb-6 text-lg text-white/90 sm:text-xl md:text-2xl lg:text-3xl">
                  Foursquare International Secondary School
                </h2>
                <p className="font-suisse max-w-2xl text-sm text-white/80 sm:text-base md:text-lg">
                  Building strong academic foundations rooted in values, discipline, and excellence.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <DotSeparator />
      {/* History Section */}
      <HistorySection />
      <DotSeparator />
      {/* Vision & Mission Section */}
      <VisionMissionSection />
      <DotSeparator />
      {/* Core Values Section */}
      <CoreValuesSection />
      <DotSeparator />
      {/* Leadership Message Section */}
      <LeadershipMessageSection />
      <DotSeparator />
      {/* Leadership Team Section */}
      <LeadershipTeamSection />
      <DotSeparator />
      {/* Accreditations Section */}
      <AccreditationsSection />
      <DotSeparator />
      {/* CTA Section */}
      <CTASection />
      <DotSeparator />
      <Footer />
    </div>
  );
}