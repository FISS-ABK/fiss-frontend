import Image from "next/image";
// import AboutNavbar from "@/components/about-navbar";
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

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <FloatingNavWrapper initialBg="bg-transparent">
                <Navbar />
            </FloatingNavWrapper>
            <section className="relative min-h-150 sm:min-h-175 lg:min-h-screen -mt-40 sm:-mt-42 md:-mt-42">
                <Image
                    src="/FOURSQUARE PICTURES/OTHERS/14.jpg"
                    alt="FISS Campus Building"
                    fill
                    className="object-cover"
                    priority
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Content */}
                <div className="relative z-10 flex h-full min-h-150 sm:min-h-175 lg:min-h-screen flex-col pt-18 sm:pt-20 md:pt-24">
                    {/* Hero Content */}
                    <div className="flex flex-1 flex-col justify-center px-4 pb-20 sm:px-6 md:px-8 lg:px-12">
                        <div className="mx-auto max-w-7xl">
                            <h1 className="font-poppins mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
                                About FISS
                            </h1>
                            <h2 className="font-suisse mb-6 text-lg text-white/90 sm:text-xl md:text-2xl lg:text-3xl">
                                Foursquare International Secondary School
                            </h2>
                            <p className="font-suisse max-w-2xl text-sm text-white/80 sm:text-base md:text-lg">
                                Building strong academic foundations rooted in values, discipline, and excellence.
                            </p>
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
