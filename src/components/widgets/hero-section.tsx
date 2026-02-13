import { FileCheck, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";



export default function HeroSection() {
  return (
    <section className="bg-[#edf5f5]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-12 pt-6 sm:gap-10 sm:px-6 sm:pb-16 sm:pt-8 md:px-8 md:pt-12 lg:pb-20">
        {/* Content Grid - Stack on mobile, side by side on lg */}
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1fr_480px] lg:gap-12 xl:grid-cols-[1fr_520px]">
          {/* Text Content */}
          <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
            <h1 className="font-poppins text-4xl font-semibold leading-tight text-[#0c1d2f] sm:text-5xl md:text-6xl lg:text-[44px] lg:leading-13 xl:text-[48px] xl:leading-14">
              <span className="block">
                Raising <span className="text-[#0b2c4d]">GODLY</span> and
              </span>
              <span className="block text-[#0b2c4d]">ACADEMICALLY</span>
              <span className="block">Excellent Leaders</span>
            </h1>

            <p className="font-suisse max-w-xl text-sm leading-relaxed text-[#1b2b3a] sm:text-[15px] sm:leading-6">
              Foursquare International Secondary School offers a safe, supportive, and values-driven environment where
              students receive quality education, moral guidance, and the skills needed to succeed academically and grow
              into responsible global citizens
            </p>

            {/* Buttons - Stack on mobile, row on sm+ */}
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link href="/admissions"> 
              <button className="font-poppins flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0b2c4d] px-4 text-sm font-semibold text-white sm:h-11.5 sm:justify-start sm:px-5">
                <span>Apply for Admission</span>
                <span className="relative inline-flex h-5 w-5 items-center justify-center rounded bg-[rgba(4,16,28,0.3)] sm:h-6 sm:w-6">
                  <FileCheck className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
                </span>
              </button>
              </Link>

              <Link href="/academics">
                <button className="font-poppins flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-[#0b2c4d] shadow-sm sm:h-11.5 sm:justify-start sm:px-5">
                  <span>Explore Academics</span>
                  <span className="relative inline-flex h-5 w-5 items-center justify-center rounded bg-[#f0f0f0] sm:h-6 sm:w-6">
                    <BookOpen className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Image Collage */}
          <div className="relative mx-auto h-70 w-full max-w-125 hidden md:flex sm:h-85 md:h-105 lg:mx-0 lg:h-120 lg:max-w-none xl:h-140">
            {/* Main Image */}
            <div className="absolute left-[12%] top-0 h-60 w-45 sm:left-[15%] sm:h-75 sm:w-57.5 md:left-[18%] md:h-92.5 md:w-75 lg:left-[20%] lg:h-110 lg:w-90 xl:left-[22%] xl:h-135 xl:w-110">
              <Image
                alt="Teacher reading with students"
                src="/FOURSQUARE PICTURES/val/cipal.JPG"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 180px, (max-width: 768px) 230px, (max-width: 1024px) 300px, (max-width: 1280px) 360px, 440px"
                priority
              />
            </div>

            {/* Left Tilted Image */}
            <div className="absolute left-0 top-7.5 h-25 w-22.5 -rotate-10 sm:top-10 sm:h-32.5 sm:w-28.75 md:top-12.5 md:h-40 md:w-36.25 lg:top-15 lg:h-50 lg:w-45 xl:top-17.5 xl:h-57.5 xl:w-52.5">
              <Image
                alt="Smiling student"
                src="/FOURSQUARE PICTURES/mmm.jpeg"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 90px, (max-width: 768px) 115px, (max-width: 1024px) 145px, (max-width: 1280px) 180px, 210px"
                loading="lazy"
              />
            </div>

            {/* Bottom Right Image */}
            <div className="absolute bottom-1 right-0 h-20 w-16 rotate-[-4deg] sm:h-28 sm:w-24 md:h-36 md:w-32 lg:h-44 lg:w-40 xl:h-55 xl:w-50">
              <Image
                alt="Student writing"
                src="/FOURSQUARE PICTURES/OTHERS/1.jpg"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 64px, (max-width: 768px) 96px, (max-width: 1024px) 128px, (max-width: 1280px) 160px, 200px"
                loading="lazy"
              />
            </div>

            {/* Accredited Badge */}
            <div className="absolute bottom-5 left-[16%] flex flex-col items-center sm:bottom-7.5 sm:left-[20%] md:bottom-10 md:left-[24%] lg:bottom-12 lg:left-[26%] xl:bottom-13.5 xl:left-[28%]">
              <div className="relative h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11">
                <Image alt="Accredited badge" src="/FOURSQUARE PICTURES/others/1.jpg" fill className="object-contain" sizes="44px" loading="lazy" />
              </div>
              <p className="mt-0.5 text-[7px] leading-3 text-[#0b2c4d] sm:text-[8px] md:mt-1 md:text-[9px] lg:text-[10px] lg:leading-4">
                Accredited JAMB Center
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
