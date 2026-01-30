import Image from "next/image";

export default function VisionMissionSection() {
    return (
        <section className="bg-white py-12 sm:py-81 md:py-10 lg:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <h2 className="font-poppins mb-8 text-2xl font-bold text-[#0a1628] sm:mb-10 sm:text-3xl md:mb-12 md:text-4xl">
                    Our Vision & Mission
                </h2>

                {/* Cards Container */}
                <div className="relative flex justify-between flex-row flex-wrap-reverse gap-4">
                    {/* Mission Card */}
                    <div className="relative flex min-h-92 flex-col overflow-hidden justify-evenly bg-[#AE3434] p-6 sm:min-h-100 sm:p-8 md:p-10 rounded-bl-3xl rounded-tr-3xl">
                        <div className="">
                            <h3 className="font-poppins mb-3 text-xl font-bold text-white sm:mb-4 sm:text-2xl md:text-3xl">
                                Mission
                            </h3>
                            <p className="font-suisse max-w-sm text-sm leading-relaxed text-white/90 sm:text-base">
                                To provide students with knowledge and training that will enable
                                them face the future with confidence through commitment to
                                Spiritual, Academic and Moral upbringing.
                            </p>
                        </div>
                        <div className="mb-6 flex justify-center">
                            <div className="absolute bottom-0 -right-2 sm:h-60 sm:w-60 h-44 w-44">
                                <Image
                                    src="/target.png"
                                    alt="Target icon"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Vision Card */}
                    <div className="relative flex min-h-87.5 flex-col overflow-hidden justify-end bg-[#0a1628] p-6 sm:min-h-100 sm:p-8 md:p-10 rounded-bl-3xl rounded-tr-3xl">
                        <div>
                            <h3 className="font-poppins mb-3 text-xl font-bold text-white sm:mb-4 sm:text-2xl md:text-3xl">
                                Vision
                            </h3>
                            <p className="font-suisse max-w-sm text-sm leading-relaxed text-white/90 sm:text-base">
                                To run a God-centered and qualitative education that will prepare
                                students for useful life, nation-building and eternity.
                            </p>
                        </div>
                        {/* Lightbulb Icon - Right side */}
                        <div className="absolute top-0 -right-2">
                            <div className="relative sm:h-54 sm:w-54 h-34 w-34">
                                <Image
                                    src="/bulb.png"
                                    alt="Lightbulb icon"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
