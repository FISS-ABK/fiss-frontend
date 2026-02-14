"use client";

import { useState, useEffect } from "react";
import { FileCheck, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const heroContent = [
  {
    image: "/FOURSQUARE PICTURES/val/cipal.JPG",
    title: "Leadership & Excellence",
    text: "Guided by experienced visionaries committed to student success."
  },
  {
    image: "/FOURSQUARE PICTURES/val/rrr.JPG",
    title: "Vibrant Community",
    text: "A supportive environment where every student finds their voice."
  },
  {
    image: "/41.png",
    title: "Modern Classrooms",
    text: "Equipped with the tools needed for 21st-century learning."
  },
  {
    image: "/35.png",
    title: "Holistic Growth",
    text: "Nurturing talents in sports, arts, and academics alike."
  }
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000); 
    return () => clearInterval(timer);
  }, [currentImageIndex]);

  const nextSlide = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroContent.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroContent.length) % heroContent.length);
  };

  return (
    <section className="bg-[#edf5f5] relative overflow-hidden">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-12 pt-6 sm:gap-10 sm:px-6 sm:pb-16 sm:pt-8 md:px-8 md:pt-12 lg:pb-20">
        
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1fr_480px] lg:gap-12 xl:grid-cols-[1fr_520px]">
          
          {/* 1. TEXT CONTENT */}
          <div className="flex flex-col gap-5 sm:gap-6 md:gap-8 order-1 lg:order-1">
            <h1 className="font-poppins text-4xl font-semibold leading-tight text-[#0c1d2f] sm:text-5xl md:text-6xl lg:text-[44px] lg:leading-13 xl:text-[48px] xl:leading-14">
              <span className="block">
                Raising <span className="text-[#0b2c4d]">GODLY</span> and
              </span>
              <span className="block text-[#0b2c4d]">ACADEMICALLY</span>
              <span className="block">Excellent Leaders</span>
            </h1>

            <p className="font-suisse max-w-xl text-sm leading-relaxed text-[#1b2b3a] sm:text-[15px] sm:leading-6">
              Foursquare International Secondary School offers a safe, supportive, and values-driven environment where
              students receive quality education, moral guidance, and the skills needed to succeed academically.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link href="/admissions"> 
                <button className="font-poppins flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0b2c4d] px-4 text-sm font-semibold text-white sm:h-11.5 sm:justify-start sm:px-5 hover:bg-[#082038] transition-colors shadow-md hover:shadow-lg">
                  <span>Apply for Admission</span>
                  <FileCheck className="h-4 w-4" />
                </button>
              </Link>

              <Link href="/academics">
                <button className="font-poppins flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-[#0b2c4d] shadow-sm sm:h-11.5 sm:justify-start sm:px-5 border border-gray-100 hover:bg-gray-50 transition-colors">
                  <span>Explore Academics</span>
                  <BookOpen className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>

          {/* 2. CREATIVE CAROUSEL */}
          <div className="order-2 lg:order-2 w-full">
            
            {/* MOBILE VIEW (Unchanged) */}
            <div className="block lg:hidden relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={heroContent[currentImageIndex].image}
                    alt={heroContent[currentImageIndex].title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b2c4d]/90 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                 <motion.h3 
                   key={heroContent[currentImageIndex].title}
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   className="font-bold text-xl mb-1"
                 >
                   {heroContent[currentImageIndex].title}
                 </motion.h3>
                 <motion.p 
                   key={heroContent[currentImageIndex].text}
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.1 }}
                   className="text-xs text-gray-200 line-clamp-2"
                 >
                   {heroContent[currentImageIndex].text}
                 </motion.p>
              </div>

              <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-all">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-all">
                <ChevronRight size={24} />
              </button>

              <div className="absolute top-4 right-4 flex gap-1.5">
                {heroContent.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"}`} 
                  />
                ))}
              </div>
            </div>

            {/* DESKTOP VIEW - UPDATED Z-INDEXES */}
            <div className="hidden lg:block relative h-120 w-full">
               
               {/* MAIN CHANGING IMAGE: Changed z-20 to z-10 (Now sits behind) */}
               <div className="absolute left-[10%] top-0 h-110 w-90 overflow-hidden rounded-2xl shadow-2xl border-[6px] border-white rotate-2 z-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="relative h-full w-full"
                    >
                      <Image
                        src={heroContent[currentImageIndex].image}
                        alt="Main Hero Feature"
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-12">
                        <p className="text-white font-medium text-lg">{heroContent[currentImageIndex].title}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
               </div>

               {/* LEFT IMAGE: Changed z-10 to z-30 (Now sits in front) */}
               <div className="absolute -left-4 bottom-12 h-48 w-40 -rotate-6 rounded-xl border-4 border-white shadow-lg overflow-hidden z-30">
                 <Image src="/FOURSQUARE PICTURES/mmm.jpeg" fill className="object-cover" alt="Student" />
               </div>

               {/* RIGHT IMAGE: Changed z-10 to z-30 (Now sits in front) */}
               <div className="absolute right-0 top-12 h-40 w-36 rotate-3 rounded-xl border-4 border-white shadow-lg overflow-hidden z-30">
                 <Image src="/FOURSQUARE PICTURES/OTHERS/1.jpg" fill className="object-cover" alt="Activity" />
               </div>

               {/* BADGE: Changed z-20 to z-30 (Ensures it stays visible) */}
               {/* <div className="absolute bottom-5 left-[16%] flex flex-col items-center z-30 sm:bottom-7.5 sm:left-[20%] md:bottom-10 md:left-[24%] lg:bottom-12 lg:left-[26%] xl:bottom-13.5 xl:left-[28%] bg-white/90 p-2 rounded-lg backdrop-blur-sm shadow-sm">
                 <div className="relative h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11">
                   <Image alt="Accredited badge" src="/FOURSQUARE PICTURES/others/1.jpg" fill className="object-contain" sizes="44px" />
                 </div>
                 <p className="mt-0.5 text-[7px] font-bold leading-3 text-[#0b2c4d] sm:text-[8px] md:mt-1 md:text-[9px] lg:text-[10px] lg:leading-4">
                   Accredited JAMB Center
                 </p> 
               </div> */}

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}