import DotSeparator from "@/components/dot-separator";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import FloatingNavWrapper from "@/components/floating-nav-wrapper";
import AcademicPhilosophyHeroSection from "@/components/widgets/academic-philosophy-hero-section";
import SchoolMottoSection from "@/components/widgets/school-motto-section";
import CurriculumSection from "@/components/widgets/curriculum-section";
import ClassStructureSection from "@/components/widgets/class-structure-section";
import BeyondClassroomSection from "@/components/widgets/beyond-classroom-section";
import TeachingAdminSection from "@/components/widgets/teaching-admin-section";

export default function AcademicsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <FloatingNavWrapper initialBg="bg-[#edf5f5]">
        <Navbar />
      </FloatingNavWrapper>
      <AcademicPhilosophyHeroSection />
      <SchoolMottoSection />
      <DotSeparator />
      <CurriculumSection />
      <DotSeparator />
      <ClassStructureSection />
      <DotSeparator />
      <BeyondClassroomSection />
      <DotSeparator />
      <TeachingAdminSection />
      <DotSeparator />
      <Footer />
    </div>
  );
}
