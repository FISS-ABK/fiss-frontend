import { Award, BookCheck, Trophy } from "lucide-react";
import Image from "next/image";

export default function ProvenRecordSection() {
    return (
        <section className="relative bg-white py-4 sm:py-6 md:py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
                {/* Title */}
                <div className="mb-6 text-center sm:mb-8 md:mb-10">
                    <h2 className="font-suisse text-2xl font-semibold leading-tight text-[#0b2c4d] sm:text-3xl md:text-4xl lg:text-5xl">
                        A Proven Record of
                        <br />
                        Excellence
                    </h2>
                </div>

                {/* Cards Container */}
                <div className="relative">
                    {/* Decorative triangle - hidden on mobile */}
                    <div className="absolute -top-4 right-8 hidden h-12 w-12 md:block md:right-12 md:h-14 md:w-14 lg:right-16 lg:h-16 lg:w-16">
                        <Image 
                            src="/object.png" 
                            alt="Decorative" 
                            fill 
                            className="z-10 object-contain"
                            sizes="64px"
                            loading="lazy" 
                        />
                    </div>
                    
                    {/* Dark background section */}
                    <div className="relative rounded-2xl bg-[#04101C] px-5 py-8 sm:rounded-3xl sm:px-6 sm:py-10 md:rounded-tr-[120px] md:px-10 md:py-14 lg:rounded-tr-[180px] lg:px-16 lg:py-20">
                        <div className="flex flex-col gap-8 sm:gap-10 md:flex-row md:gap-0 md:divide-x md:divide-[#1a3a52]">
                            {/* Card 1: Years of Excellence */}
                            <div className="flex flex-col gap-4 sm:gap-5 md:w-1/3 md:gap-6 md:px-6 lg:px-8">
                                <div className="flex h-12 w-12 items-center justify-center rounded-bl-2xl rounded-tr-2xl bg-[#D4A574] sm:h-14 sm:w-14 sm:rounded-bl-3xl sm:rounded-tr-3xl">
                                    <Trophy className="h-6 w-6 text-white sm:h-7 sm:w-7" />
                                </div>
                                <h3 className="font-poppins text-base font-bold leading-tight text-white sm:text-lg md:text-xl">
                                    20+ Years of Academic Excellence
                                </h3>
                                <p className="font-suisse text-sm leading-relaxed text-gray-300">
                                    A strong track record of academic success and disciplined learning.
                                </p>
                            </div>

                            {/* Card 2: Certified Teachers */}
                            <div className="flex flex-col gap-4 border-t border-[#1a3a52] pt-8 sm:gap-5 sm:pt-10 md:w-1/3 md:gap-6 md:border-t-0 md:px-6 md:pt-0 lg:px-8">
                                <div className="flex h-12 w-12 items-center justify-center rounded-bl-2xl rounded-tr-2xl bg-[#E74C3C] sm:h-14 sm:w-14 sm:rounded-bl-3xl sm:rounded-tr-3xl">
                                    <BookCheck className="h-6 w-6 text-white sm:h-7 sm:w-7" />
                                </div>
                                <h3 className="font-poppins text-base font-bold leading-tight text-white sm:text-lg md:text-xl">
                                    100% Certified & Experienced Teachers
                                </h3>
                                <p className="font-suisse text-sm leading-relaxed text-gray-300">
                                    Our educators are fully certified, experienced, and committed to delivering quality learning.
                                </p>
                            </div>

                            {/* Card 3: Awards & Achievements */}
                            <div className="flex flex-col gap-4 border-t border-[#1a3a52] pt-8 sm:gap-5 sm:pt-10 md:w-1/3 md:gap-6 md:border-t-0 md:px-6 md:pt-0 lg:px-8">
                                <div className="flex h-12 w-12 items-center justify-center rounded-bl-2xl rounded-tr-2xl bg-[#4A90E2] sm:h-14 sm:w-14 sm:rounded-bl-3xl sm:rounded-tr-3xl">
                                    <Award className="h-6 w-6 text-white sm:h-7 sm:w-7" />
                                </div>
                                <h3 className="font-poppins text-base font-bold leading-tight text-white sm:text-lg md:text-xl">
                                    25+ Awards and Achievements
                                </h3>
                                <p className="font-suisse text-sm leading-relaxed text-gray-300">
                                    Recognized for outstanding performance, excellence, and commitment to quality education
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
