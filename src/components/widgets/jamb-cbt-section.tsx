"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";

// --- REPLACE THESE WITH YOUR ACTUAL CBT CENTER PHOTOS ---
const cbtImages = [
  "/31.png", // Placeholder: Replace with computer room photo
  "/32.png", // Placeholder: Replace with another angle
  "/33.png", // Placeholder
];

export default function JambCbtSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cbtImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0b2c4d] py-16 sm:py-24">
      {/* Background Decorative Elements (Circuit board vibe) */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 top-10 h-64 w-64 rounded-full bg-blue-400 blur-3xl" />
        <div className="absolute right-0 bottom-10 h-64 w-64 rounded-full bg-purple-400 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          
          {/* LEFT: INFO & CONTACT DETAILS */}
          <div className="flex flex-col gap-6 text-white">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-blue-100 backdrop-blur-sm border border-white/10">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <span>Government Accredited</span>
            </div>

            <h2 className="font-poppins text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Foursquare <span className="text-blue-300">CBT Centre</span>
            </h2>
            
            <p className="font-suisse text-lg text-blue-100/80 leading-relaxed">
              We are a fully accredited Joint Admissions and Matriculation Board (JAMB) center. 
              Our facility is equipped with state-of-the-art computers, high-speed internet, and 
              a fully air-conditioned environment to ensure a seamless examination experience.
            </p>

            {/* Contact Details from Flyer */}
            <div className="mt-4 space-y-4 rounded-2xl bg-white/5 p-6 border border-white/10">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 shrink-0 text-blue-300 mt-1" />
                <div>
                  <h4 className="font-semibold text-white">Location</h4>
                  <p className="text-sm text-blue-100/70">Beside Muda Lawal Stadium, Asero, Abeokuta.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 shrink-0 text-blue-300 mt-1" />
                <div>
                  <h4 className="font-semibold text-white">Contact Lines</h4>
                  <p className="text-sm text-blue-100/70">0807 995 1366, 0703 819 7036</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 shrink-0 text-blue-300 mt-1" />
                <div>
                  <h4 className="font-semibold text-white">Email Support</h4>
                  <p className="text-sm text-blue-100/70">fisscbtcare@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: COMPUTER SCREEN CAROUSEL */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            {/* The "Monitor" Frame */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-[8px] border-gray-800 bg-gray-900 shadow-2xl">
              
              {/* Screen Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={cbtImages[currentIndex]}
                    alt="FISS CBT Center Facility"
                    fill
                    className="object-cover"
                  />
                  {/* Digital Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b2c4d]/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="inline-block rounded bg-blue-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      Live Feed
                    </span>
                    <p className="mt-2 text-sm font-medium text-white/90">
                      High-Performance Systems & Power Backup
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Glare/Reflection Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            </div>

            {/* Decorative Stand/Base */}
            <div className="mx-auto mt-[-2px] h-4 w-1/3 rounded-b-xl bg-gray-700 opacity-50" />
            <div className="mx-auto mt-[-10px] h-1.5 w-1/2 rounded-full bg-black/20 blur-md" />
          </div>

        </div>
      </div>
    </section>
  );
}