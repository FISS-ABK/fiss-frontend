"use client";

import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Heart, ShieldCheck, MonitorSmartphone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Academic Excellence",
    description: "Consistent top performance in WAEC, NECO, and JAMB examinations.",
    image: "/41.png",
    icon: GraduationCap,
    color: "bg-blue-600",
  },
  {
    title: "Moral & Spiritual Values",
    description: "Rooted in Christian faith, we mold character alongside intellect.",
    image: "/FOURSQUARE PICTURES/val/cipal.JPG",
    icon: Heart,
    color: "bg-yellow-600",
  },
  {
    title: "Safe & Secure Environment",
    description: "A serene, gated campus with 24/7 security and pastoral care.",
    image: "/FOURSQUARE PICTURES/OTHERS/13.jpg",
    icon: ShieldCheck,
    color: "bg-red-600",
  },
  {
    title: "Modern Facilities",
    description: "State-of-the-art ICT labs, science laboratories, and library.",
    image: "/FOURSQUARE PICTURES/OTHERS/1.jpg",
    icon: MonitorSmartphone,
    color: "bg-orange-600",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-poppins text-3xl font-bold leading-tight text-[#0b2c4d] md:text-4xl lg:text-[42px]">
              Why Choose <span className="text-blue-600">FISS?</span>
            </h2>
            <p className="mt-4 font-suisse text-lg text-gray-600 leading-relaxed">
              We go beyond the classroom to raise Godly, well-rounded leaders who excel in every sphere of life.
            </p>
          </div>
          
          {/* Improved "Apply" Button */}
          <Link href="/admissions" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#0b2c4d] px-8 py-4 font-medium text-white shadow-lg transition-all hover:bg-[#1a3b5c] hover:shadow-xl hover:-translate-y-1">
            <span className="relative z-10 font-poppins">Apply for Admission</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
            {/* Shiny effect on hover */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </div>

        {/* CREATIVE PHOTO GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              className="group relative h-[400px] overflow-hidden rounded-3xl bg-gray-900 shadow-md"
              initial="rest"
              whileHover="hover"      // Desktop: Trigger on Hover
              whileInView="hover"     // Mobile: Trigger when scrolled into view
              viewport={{ once: true, margin: "-50px" }} // Trigger slightly before it's fully on screen
            >
              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0 h-full w-full">
                <motion.div
                  className="relative h-full w-full"
                  variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.15 } // Zoom in effect
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover opacity-90"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </motion.div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              {/* Content Overlay */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-6 text-white"
                variants={{
                  rest: { y: 20 },
                  hover: { y: 0 }
                }}
                transition={{ duration: 0.4 }}
              >
                {/* Icon Badge */}
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} text-white shadow-lg`}>
                  <feature.icon className="h-6 w-6" />
                </div>

                <h3 className="font-poppins text-xl font-bold leading-tight mb-2">
                  {feature.title}
                </h3>
                
                {/* Description - Fades in */}
                <motion.p 
                  className="font-suisse text-sm text-gray-200 leading-relaxed"
                  variants={{
                    rest: { opacity: 0, height: 0 },
                    hover: { opacity: 1, height: "auto" }
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}