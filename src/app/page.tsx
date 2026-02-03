import DotSeparator from "@/components/dot-separator";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/widgets/hero-section";
import ProvenRecordSection from "@/components/widgets/proven-record-section";
import WhyChooseSection from "@/components/widgets/why-choose-section";
import AdmissionsSection from "@/components/widgets/admissions-section";
import LifeAtFissSection from "@/components/widgets/life-at-fiss-section";
import TestimonialsSection from "@/components/widgets/testimonials-section";
import FloatingNavWrapper from "@/components/floating-nav-wrapper";
import JoinTeamSection from "@/components/widgets/join-team-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
          <FloatingNavWrapper initialBg="bg-[#edf5f5]">
          <Navbar />
          </FloatingNavWrapper>
      {/* <div className="sticky top-0 z-50 bg-[#edf5f5] px-2 py-6 sm:px-4 md:px-6 md:py-8">
        <div className="mx-auto max-w-7xl relative">
        </div>
      </div> */}
      <HeroSection />
      <DotSeparator />
      <ProvenRecordSection />
      <DotSeparator />
      <WhyChooseSection />
      <DotSeparator />
      <AdmissionsSection />
      <DotSeparator />
      <LifeAtFissSection />
      <DotSeparator />
      <TestimonialsSection />
      <DotSeparator />
      <JoinTeamSection />
      <DotSeparator />
      <Footer />
    </div>
  );
}
