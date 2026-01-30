import DotSeparator from "@/components/dot-separator";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import FloatingNavWrapper from "@/components/floating-nav-wrapper";
import AdmissionsHeroSection from "@/components/widgets/admissions-hero-section";
import AdmissionsAccordion from "@/components/widgets/admissions-accordion";
import AdmissionCTASection from "@/components/widgets/admission-cta-section";

export default function AdmissionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <FloatingNavWrapper initialBg="bg-[#edf5f5]">
        <Navbar />
      </FloatingNavWrapper>
      <AdmissionsHeroSection />
      {/* <DotSeparator /> */}
      <AdmissionsAccordion />
      <DotSeparator />
      <AdmissionCTASection />
      <DotSeparator />
      <Footer />
    </div>
  );
}
