'use client';

import { Edit, Trash2, Briefcase, CheckCircle2 } from 'lucide-react';
import { Vacancy } from '@/types/vacancies';

interface VacancyCardProps {
  vacancy: Vacancy;
  onEdit: (vacancy: Vacancy) => void;
  onDelete: (vacancy: Vacancy) => void;
}

export default function VacancyCard({ vacancy, onEdit, onDelete }: VacancyCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {/* Icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0a1929] text-white flex-shrink-0">
            <Briefcase className="h-7 w-7" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-[#0a1929]">{vacancy.title}</h3>
            <div className="mt-1 flex flex-wrap gap-2 text-sm">
              {vacancy.employmentType && (
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">
                  {vacancy.employmentType}
                </span>
              )}
              {vacancy.department && (
                <span className="rounded-full bg-purple-100 px-2 py-0.5 text-purple-700">
                  {vacancy.department}
                </span>
              )}
              {vacancy.location && (
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-700">
                  {vacancy.location}
                </span>
              )}
              {!vacancy.isActive && (
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-red-700">
                  Inactive
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 ml-2">
          <button
            onClick={() => onEdit(vacancy)}
            className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 transition-colors"
            title="Edit"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(vacancy)}
            className="rounded-lg p-2 text-red-600 hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Job Description */}
      <div className="mb-4">
        <h4 className="mb-2 text-base font-bold text-gray-900">Job Description</h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          {vacancy.jobDescription}
        </p>
      </div>

      {/* Requirements */}
      <div>
        <h4 className="mb-3 text-base font-bold text-gray-900">Requirements</h4>
        <ul className="space-y-2">
          {vacancy.requirements.map((req, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
              <span>{req.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
