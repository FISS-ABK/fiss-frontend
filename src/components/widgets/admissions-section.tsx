import { FileCheck, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function AdmissionsSection() {
    return (
        <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-10 sm:gap-12 md:gap-16">
                    {/* First Row */}
                    <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-10 lg:gap-16">
                        {/* Admissions Made Simple - Text */}
                        <div className="flex flex-col gap-4 sm:gap-5 md:max-w-md md:gap-6 lg:max-w-lg">
                            <h2 className="font-poppins text-2xl font-semibold leading-tight text-[#0b2c4d] sm:text-3xl md:text-4xl">
                                Admissions Made Simple
                            </h2>
                            <p className="font-suisse text-sm leading-relaxed text-gray-600 sm:text-base">
                                Our admission process is designed to be simple, transparent, and supportive, ensuring every child is given the opportunity to thrive academically and morally.
                            </p>
                            <button className="font-poppins flex h-11 w-fill items-center justify-center gap-2 rounded-lg bg-[#0b2c4d] px-4 text-sm font-semibold text-white sm:h-12 sm:w-auto sm:px-5">
                                View Admission Requirements
                                <span className="relative inline-flex h-5 w-5 items-center justify-center rounded bg-[rgba(4,16,28,0.3)] sm:h-6 sm:w-6">
                                    <FileCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </span>
                            </button>
                        </div>

                        {/* Admission Requirements - Image Card */}
                        <div className="flex flex-col gap-3 sm:gap-4 md:w-[45%] lg:w-[48%]">
                            <div className="relative h-48 w-full overflow-hidden border-4 border-white shadow-lg sm:h-56 sm:border-6 md:h-64 lg:h-80 lg:border-8">
                                <Image
                                    src="/teacher.png"
                                    alt="Students in classroom"
                                    fill
                                    className="object-cover object-top"
                                    sizes="(max-width: 768px) 100vw, 45vw"
                                />
                            </div>
                            <h3 className="font-poppins text-lg font-semibold text-[#0b2c4d] sm:text-xl">
                                Admission Requirements
                            </h3>
                            <p className="font-suisse text-sm leading-relaxed text-gray-600">
                                Parents are encouraged to carefully review the required documents, age criteria, and previous academic records needed to determine a child&apos;s eligibility for admission into the appropriate class.
                            </p>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center md:justify-between md:gap-10 lg:gap-16">
                        {/* Structure - Image Card */}
                        <div className="flex flex-col gap-3 sm:gap-4 md:w-[45%] lg:w-[48%]">
                            <div className="relative h-48 w-full overflow-hidden border-4 border-white shadow-lg sm:h-56 sm:border-6 md:h-64 lg:h-80 lg:border-8">
                                <Image
                                    src="/pupils_02.png"
                                    alt="Parent helping child with studies"
                                    fill
                                    className="object-cover object-top"
                                    sizes="(max-width: 768px) 100vw, 45vw"
                                />
                            </div>
                            <h3 className="font-poppins text-lg font-semibold text-[#0b2c4d] sm:text-xl">
                                Structure
                            </h3>
                            <p className="font-suisse text-sm leading-relaxed text-gray-600">
                                A well-rounded curriculum thoughtfully designed to support academic excellence, personal growth, and continuous development at every stage of a student&apos;s learning journey.
                            </p>
                        </div>

                        {/* Our Academic Structure - Text */}
                        <div className="flex flex-col gap-4 sm:gap-5 md:max-w-md md:gap-6 md:text-right lg:max-w-lg">
                            <h3 className="font-poppins text-2xl font-semibold text-[#0b2c4d] sm:text-3xl">
                                Our Academic Structure
                            </h3>
                            <p className="font-suisse text-sm leading-relaxed text-gray-600 sm:text-base">
                                Our Junior Secondary program focuses on building strong academic foundations while developing critical thinking, discipline, and confidence in students.
                            </p>
                            <button className="font-poppins flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0b2c4d] px-4 text-sm font-semibold text-white sm:h-12 sm:w-auto sm:px-5 md:ml-auto">
                                Learn More
                                <span className="relative inline-flex h-5 w-5 items-center justify-center rounded bg-[rgba(4,16,28,0.3)] sm:h-6 sm:w-6">
                                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
