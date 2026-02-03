'use client';

import { Briefcase } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useVacancies } from '@/hooks/useVacancies';

export default function JoinTeamSection() {
  const { vacancies, isLoading } = useVacancies();
  
  // Filter only active vacancies
  const activeVacancies = vacancies.filter((v: any) => v.isActive !== false);

  if (isLoading) {
    return (
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#09283b] border-r-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#09283b] md:text-4xl lg:text-5xl">
            Join Our Team
          </h2>
          <p className="mx-auto max-w-3xl text-base text-gray-600 md:text-lg">
            We are always looking for passionate, qualified educators and professionals who
            share our commitment to excellence, integrity, and student development
          </p>
        </div>

        {/* Empty State */}
        {activeVacancies.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
              <Briefcase className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-900 md:text-2xl">
              No Open Positions
            </h3>
            <p className="mt-3 text-base text-gray-600 md:text-lg">
              We don&apos;t have any job openings at the moment, but we&apos;re always interested in connecting with talented educators.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Check back soon or send us your resume for future opportunities.
            </p>
          </div>
        ) : (
          <>
            {/* Vacancies Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
              {activeVacancies.map((vacancy: any) => (
            <div
              key={vacancy.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-8"
            >
              {/* Header with Icon */}
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#09283b] text-white md:h-20 md:w-20">
                  <Briefcase className="h-8 w-8 md:h-10 md:w-10" />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-bold text-[#09283b] md:text-3xl">
                    {vacancy.title}
                  </h3>
                </div>
              </div>

              {/* Job Description */}
              <div className="mb-6">
                <h4 className="mb-3 text-lg font-bold text-[#09283b]">Job Description</h4>
                <p className="text-sm leading-relaxed text-gray-700 md:text-base">
                  {vacancy.job_description || vacancy.jobDescription}
                </p>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h4 className="mb-4 text-lg font-bold text-[#09283b]">Requirements</h4>
                <ul className="space-y-3">
                  {vacancy.requirements?.map((req: any, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#09283b]" />
                      <span className="text-sm text-gray-700 md:text-base">
                        {typeof req === 'string' ? req : req.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply Button */}
              <Link
                href={`/careers/apply?position=${encodeURIComponent(vacancy.title)}`}
                className="block w-full rounded-lg bg-[#09283b] py-4 text-center text-base font-semibold text-white transition-colors hover:bg-[#09283b]/90 md:text-lg"
              >
                Apply Now
              </Link>
            </div>
          ))}
        </div>

        {/* View All Careers Link */}
        {activeVacancies.length > 2 && (
          <div className="mt-12 text-center">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-[#09283b] font-semibold hover:underline"
            >
              View All Positions
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </>
        )}
      </div>
    </section>
  );
}
