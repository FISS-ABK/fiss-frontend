'use client';

import { Plus, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Vacancy, VacancyRequirement } from '@/types/vacancies';
import { useState } from 'react';

interface VacancyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vacancy: Vacancy) => void;
  vacancy?: Vacancy | null;
  mode: 'create' | 'edit';
}

const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Contract'] as const;

export default function VacancyModal({ isOpen, onClose, onSave, vacancy, mode }: VacancyModalProps) {
  const [formData, setFormData] = useState<Vacancy>({
    id: vacancy?.id,
    title: vacancy?.title || '',
    jobDescription: vacancy?.jobDescription || '',
    requirements: vacancy?.requirements || [{ text: '' }],
    department: vacancy?.department || '',
    location: vacancy?.location || '',
    employmentType: vacancy?.employmentType || 'Full-time',
    isActive: vacancy?.isActive ?? true,
  });

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = { text: value };
    setFormData({ ...formData, requirements: newRequirements });
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, { text: '' }],
    });
  };

  const removeRequirement = (index: number) => {
    const newRequirements = formData.requirements.filter((_, i) => i !== index);
    setFormData({ ...formData, requirements: newRequirements });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty requirements
    const filteredRequirements = formData.requirements.filter(req => req.text.trim() !== '');
    onSave({ ...formData, requirements: filteredRequirements });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Post New Vacancy' : 'Edit Vacancy'}</DialogTitle>
          <DialogDescription>
            {mode === 'create' 
              ? 'Add a new job vacancy with details and requirements'
              : 'Update the vacancy details and requirements'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Job Title */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Mathematics Teacher"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Department */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="e.g., Academic"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Main Campus"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Employment Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Employment Type <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value as 'Full-time' | 'Part-time' | 'Contract' })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {EMPLOYMENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                Active (visible to applicants)
              </label>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.jobDescription}
              onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
              placeholder="Describe the role, responsibilities, and what the position entails..."
              rows={5}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Requirements */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Requirements <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={addRequirement}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <Plus className="h-4 w-4" />
                Add Requirement
              </button>
            </div>

            <div className="space-y-3">
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={req.text}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    placeholder="e.g., Minimum of 2 years teaching experience"
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#0a1929] px-4 py-2 text-sm font-medium text-white hover:bg-[#0a1929]/90"
            >
              {mode === 'create' ? 'Post Vacancy' : 'Update Vacancy'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
