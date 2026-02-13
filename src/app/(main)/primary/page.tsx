import Image from "next/image";
// import AboutNavbar from "@/components/about-navbar";
import Navbar from "@/components/navbar";
import FloatingNavWrapper from "@/components/floating-nav-wrapper";
import HistorySectionPrimary from "@/components/widgets/history-section-primary";
//import VisionMissionSection from "@/components/widgets/vision-mission-section";
import CoreValuesSection from "@/components/widgets/core-values-section";
import LeadershipMessageSection from "@/components/widgets/leadership-message-section";
import LeadershipTeamSectionPrimary from "@/components/widgets/leadership-team-section-primary";
//import AccreditationsSection from "@/components/widgets/accreditations-section";
import CTASection from "@/components/widgets/cta-section";
import DotSeparator from "@/components/dot-separator";
import Footer from "@/components/footer";
import SchoolMottoSection from "@/components/widgets/school-motto-section-primary";
import AcademicPhilosophyHeroSection from "@/components/widgets/academic-philosophy-hero-section";
import TeachingAdminSectionPrimary from "@/components/widgets/teaching-admin-section-primary";
import SchoolMottoSectionPrimary from "@/components/widgets/school-motto-section-primary";

const items = [
  { src: "/13.png", caption: "School View", wide: true, tall: false },
  { src: "/14.png", caption: "Students", wide: false, tall: true },
  { src: "/15.png", caption: "Event", wide: false, tall: true },
  { src: "/17.png", caption: "Talent Day", wide: false, tall: false },
  { src: "/16.png", caption: "Event", wide: false, tall: false },
  { src: "/FOURSQUARE PICTURES/OTHERS/14.jpg", caption: "School view", wide: false, tall: false },
  { src: "/18.png", caption: "Prize Giving Day", wide: true, tall: false },
];

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <FloatingNavWrapper initialBg="bg-transparent">
                <Navbar />
            </FloatingNavWrapper>
            <section className="relative min-h-150 sm:min-h-175 lg:min-h-screen -mt-40 sm:-mt-42 md:-mt-42">
                <Image
                    src="/22.png"
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
                                About 
                            </h1>
                            <h2 className="font-suisse mb-6 text-lg text-white/90 sm:text-xl md:text-2xl lg:text-3xl">
                                Foursquare Nursery & Primary School
                            </h2>
                            <p className="font-suisse max-w-2xl text-sm text-white/80 sm:text-base md:text-lg">
                                Building strong academic foundations rooted in values, discipline, and excellence.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
         
            {/* History Section */}
            <DotSeparator />
            <AcademicPhilosophyHeroSection />
            <SchoolMottoSectionPrimary />
            <DotSeparator />
            <HistorySectionPrimary />
            <DotSeparator />
            <TeachingAdminSectionPrimary />
            <DotSeparator />
            {/* Leadership Team Section */}
            <LeadershipTeamSectionPrimary />
            <DotSeparator />
            
            
             <main className="mx-auto w-full max-w-7xl px-6 py-16">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      {items.map((it, idx) => {
                        const span = it.wide ? "md:col-span-2" : "md:col-span-1";
                        const height = it.tall ? "h-80" : "h-48";
                        return (
                          <figure key={idx} className={`${span} overflow-hidden rounded bg-white shadow-sm`}>
                            <div className={`relative ${height} w-full bg-gray-100`}> 
                              <Image
                                src={it.src}
                                alt={it.caption}
                                fill
                                sizes="(min-width: 768px) 50vw, 100vw"
                                className="object-cover"
                              />
                            </div>
                            <figcaption className="border-t px-3 py-2 text-xs text-gray-700">{it.caption}</figcaption>
                          </figure>
                        );
                      })}
                    </div>
                  </main>
            <DotSeparator />
            <Footer />
        </div>
    );
}
