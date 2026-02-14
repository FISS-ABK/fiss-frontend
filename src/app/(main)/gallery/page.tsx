"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion"; 

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import FloatingNavWrapper from "@/components/floating-nav-wrapper";
import DotSeparator from "@/components/dot-separator";



const row1 = [
  { src: "/32.png", alt: "Jamb Center" },
  { src: "/FOURSQUARE PICTURES/val/tomiwa.JPG", alt: "Prize Giving" },
  { src: "/FOURSQUARE PICTURES/val/cipal.JPG", alt: "Event" },
  { src: "/FOURSQUARE PICTURES/mmm.jpeg", alt: "Excursion" },
  { src: "/FOURSQUARE PICTURES/OTHERS/2.jpg", alt: "Clinic" },
  { src: "/31.png", alt: "CBT" },
];

const row2 = [
  { src: "/FOURSQUARE PICTURES/summer/BARBING.JPG", alt: "Summer Lesson" },
  { src: "/38.png", alt: "School View" },
  { src: "/FOURSQUARE PICTURES/OTHERS/1.jpg", alt: "Classroom" },
  { src: "/FOURSQUARE PICTURES/val/DSC_0224.JPG", alt: "Assembly" }, // Added for variety
  { src: "/39.png", alt: "Summer Lesson " },
  { src: "/40.png", alt: "School View " },
];

const row3 = [
  { src: "/FOURSQUARE PICTURES/val/DSC_0116.JPG", alt: "Students" }, // Added for variety
  { src: "/FOURSQUARE PICTURES/val/DSC_0122.JPG", alt: "Sports" },   // Added for variety
  { src: "/FOURSQUARE PICTURES/OTHERS/15.jpg", alt: "Environment" }, // Added for variety
  { src: "/FOURSQUARE PICTURES/OTHERS/13.jpg", alt: "Building" },    // Added for variety
  { src: "/FOURSQUARE PICTURES/val/DSC_0151.JPG", alt: "Students" },
  { src: "/FOURSQUARE PICTURES/val/DSC_0211.JPG", alt: "Sports " },
];

export default function GalleryPage() {
  const containerRef = useRef(null);
  
  // Optional: Parallax effect on vertical scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="flex min-h-screen flex-col bg-[#faf9f6] overflow-x-hidden">
      <FloatingNavWrapper initialBg="bg-[#edf5f5]">
        <Navbar />
      </FloatingNavWrapper>

      {/* --- HEADER SECTION --- */}
      <section className="bg-[#edf5f5] pt-32 pb-16 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-[#09283b] tracking-tight">
              Our Moments
            </h1>
            <p className="mt-6 text-lg text-[#12303f]/80 leading-relaxed">
              A continuous stream of memories, capturing the joy, growth, and excellence 
              that define life at FISS.
            </p>
          </div>
        </div>
        
        {/* Decorative Background Blur */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-[#0b2c4d]/5 blur-3xl" />
      </section>

      <DotSeparator />

      {/* --- THE MOVING PUZZLE WALL --- */}
      <main ref={containerRef} className="py-12 flex flex-col gap-4 overflow-hidden bg-white">
        
        {/* ROW 1: Moves LEFT */}
        <div className="w-full rotate-[-1deg] scale-105 origin-left"> {/* Slight tilt for creative "messy" look */}
          <motion.div 
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {[...row1, ...row1, ...row1].map((item, idx) => ( // Tripled for safety length
              <div key={idx} className="relative h-[250px] w-[350px] flex-shrink-0 border-r-4 border-white">
                <Image 
                  src={item.src} 
                  alt={item.alt} 
                  fill 
                  className="object-cover grayscale transition-all duration-500 hover:grayscale-0 hover:scale-105"
                  sizes="350px"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ROW 2: Moves RIGHT (Center focus) */}
        <div className="w-full z-10 scale-110 shadow-2xl"> 
          <motion.div 
            className="flex w-max"
            initial={{ x: "-50%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 35, ease: "linear", repeat: Infinity }}
          >
            {[...row2, ...row2, ...row2].map((item, idx) => (
              <div key={idx} className="relative h-[320px] w-[450px] flex-shrink-0 border-r-4 border-white">
                <Image 
                  src={item.src} 
                  alt={item.alt} 
                  fill 
                  className="object-cover" // Kept color for the middle row to make it pop
                  sizes="450px"
                />
                {/* Optional Caption Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium text-xl">
                  {item.alt}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ROW 3: Moves LEFT */}
        <div className="w-full rotate-[1deg] scale-105 origin-right">
          <motion.div 
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 45, ease: "linear", repeat: Infinity }}
          >
            {[...row3, ...row3, ...row3].map((item, idx) => (
              <div key={idx} className="relative h-[250px] w-[350px] flex-shrink-0 border-r-4 border-white">
                <Image 
                  src={item.src} 
                  alt={item.alt} 
                  fill 
                  className="object-cover grayscale transition-all duration-500 hover:grayscale-0 hover:scale-105"
                  sizes="350px"
                />
              </div>
            ))}
          </motion.div>
        </div>

      </main>

      <DotSeparator />
      
      <div className="mt-auto px-6 pb-12">
        <Footer />
      </div>
    </div>
  );
}