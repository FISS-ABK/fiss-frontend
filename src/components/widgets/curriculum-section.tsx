import { CheckCircle2, Lightbulb, Globe } from "lucide-react";

const nigerianCurriculumItems = [
  "WAEC and NECO aligned syllabus",
  "Ministry of Education approved curriculum",
  "Comprehensive core subjects across Junior and Senior Secondary levels",
  "Structured lesson plans and continuous assessment",
];

const internationalExposureItems = [
  "Emphasis on critical thinking and analytical skills",
  "ICT-driven learning, including robotics training",
  "Development of global learning and communication skills",
  "Project-based and inquiry-based learning methods",
];

export default function CurriculumSection() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h2 className="mb-3 font-poppins text-3xl font-bold text-[#0b2c4d] sm:text-4xl md:text-5xl">
            Our Curriculum
          </h2>
          <p className="max-w-2xl font-suisse text-base leading-relaxed text-gray-600 sm:text-lg">
            A balanced blend of nationally approved standards and modern global learning approaches.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {/* Nigerian Curriculum Card */}
          <div className="rounded-3xl bg-gradient-to-br from-[#b84545] to-[#8b2e2e] p-8 text-white shadow-xl sm:p-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center bg-white rounded-tr-2xl rounded-bl-2xl backdrop-blur-sm">
                <Lightbulb className="h-6 w-6 text-[#8b2e2e]" />
              </div>
              <h3 className="font-poppins text-2xl font-bold sm:text-3xl">
                Nigerian Curriculum
              </h3>
            </div>

            <ul className="space-y-4">
              {nigerianCurriculumItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-white/90" />
                  <span className="font-suisse text-sm leading-relaxed sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* International Exposure Card */}
          <div className="rounded-3xl bg-gradient-to-br from-[#c9a961] to-[#a68a42] p-8 text-white shadow-xl sm:p-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-tr-2xl rounded-bl-2xl bg-white backdrop-blur-sm">
                <Globe className="h-6 w-6 text-[#a68a42]" />
              </div>
              <h3 className="font-poppins text-2xl font-bold sm:text-3xl">
                International Exposure
              </h3>
            </div>

            <ul className="space-y-4">
              {internationalExposureItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-white/90" />
                  <span className="font-suisse text-sm leading-relaxed sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
