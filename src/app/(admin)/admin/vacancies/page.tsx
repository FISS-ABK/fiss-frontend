"use client";

import { useState } from 'react';
import { Plus, Briefcase } from 'lucide-react';
import AdminDashboardLayout from '@/app/(admin)/_components/AdminDashboardLayout';
import PageHeader from '@/app/(admin)/_components/PageHeader';
import VacancyCard from '@/app/(admin)/_components/VacancyCard';
import VacancyModal from '@/app/(admin)/_components/VacancyModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Vacancy } from '@/types/vacancies';
import { toast } from 'sonner';

// Mock data - replace with actual API calls
const mockVacancies: Vacancy[] = [
  {
    id: 1,
    title: 'Mathematics Teacher',
    jobDescription: 'Responsible for delivering engaging lessons, assessing student progress, and supporting academic excellence within the classroom.',
    requirements: [
      { text: 'Relevant teaching qualification' },
      { text: 'Minimum of 2 years teaching experience' },
      { text: 'Strong classroom management skills' },
      { text: 'Commitment to school values' },
    ],
    department: 'Academic',
    location: 'Main Campus',
    employmentType: 'Full-time',
    isActive: true,
  },
  {
    id: 2,
    title: 'English Teacher',
    jobDescription: 'Teach English language and literature to secondary school students, fostering critical thinking and communication skills.',
    requirements: [
      { text: 'Bachelor\'s degree in English or related field' },
      { text: 'Teaching certification' },
      { text: 'Excellent communication skills' },
      { text: 'Experience with curriculum development' },
    ],
    department: 'Academic',
    location: 'Main Campus',
    employmentType: 'Full-time',
    isActive: true,
  },
  {
    id: 3,
    title: 'ICT Instructor',
    jobDescription: 'Deliver comprehensive ICT education, covering computer science fundamentals and digital literacy.',
    requirements: [
      { text: 'Degree in Computer Science or related field' },
      { text: 'Proficiency in programming languages' },
      { text: 'Minimum 1 year teaching experience' },
      { text: 'Up-to-date knowledge of technology trends' },
    ],
    department: 'Technology',
    location: 'Main Campus',
    employmentType: 'Full-time',
    isActive: true,
  },
];

export default function VacanciesPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>(mockVacancies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [vacancyToDelete, setVacancyToDelete] = useState<Vacancy | null>(null);

  const handleCreate = () => {
    setModalMode('create');
    setSelectedVacancy(null);
    setIsModalOpen(true);
  };

  const handleEdit = (vacancy: Vacancy) => {
    setModalMode('edit');
    setSelectedVacancy(vacancy);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (vacancy: Vacancy) => {
    setVacancyToDelete(vacancy);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (vacancyToDelete) {
      setVacancies(vacancies.filter(v => v.id !== vacancyToDelete.id));
      toast.success(`${vacancyToDelete.title} vacancy has been deleted successfully`);
      setDeleteDialogOpen(false);
      setVacancyToDelete(null);
    }
  };

  const handleSave = (vacancy: Vacancy) => {
    if (modalMode === 'create') {
      const newVacancy = { 
        ...vacancy, 
        id: Date.now(),
        postedDate: new Date().toISOString(),
      };
      setVacancies([...vacancies, newVacancy]);
      toast.success('Vacancy posted successfully');
    } else {
      setVacancies(vacancies.map(v => v.id === vacancy.id ? vacancy : v));
      toast.success('Vacancy updated successfully');
    }
  };

  const activeVacancies = vacancies.filter(v => v.isActive !== false);
  const inactiveVacancies = vacancies.filter(v => v.isActive === false);

  return (
    <AdminDashboardLayout>
      <PageHeader 
        title="Vacancies" 
        subtitle={`${activeVacancies.length} active positions`}
        action={
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 rounded-lg bg-[#0a1929] px-4 py-2 text-sm font-medium text-white hover:bg-[#0a1929]/90"
          >
            <Plus className="h-4 w-4" />
            Post Vacancy
          </button>
        }
      />

      {/* Vacancies Grid */}
      {vacancies.length > 0 ? (
        <div className="space-y-8">
          {/* Active Vacancies */}
          {activeVacancies.length > 0 && (
            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Active Positions</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {activeVacancies.map((vacancy) => (
                  <VacancyCard
                    key={vacancy.id}
                    vacancy={vacancy}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Inactive Vacancies */}
          {inactiveVacancies.length > 0 && (
            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-500">Inactive Positions</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {inactiveVacancies.map((vacancy) => (
                  <VacancyCard
                    key={vacancy.id}
                    vacancy={vacancy}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
          <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No vacancies posted</h3>
          <p className="mt-2 text-sm text-gray-600">
            Get started by posting your first job vacancy
          </p>
          <button
            onClick={handleCreate}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0a1929] px-4 py-2 text-sm font-medium text-white hover:bg-[#0a1929]/90"
          >
            <Plus className="h-4 w-4" />
            Post Vacancy
          </button>
        </div>
      )}

      {/* Create/Edit Modal */}
      <VacancyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        vacancy={selectedVacancy}
        mode={modalMode}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the vacancy for{' '}
              <span className="font-semibold">{vacancyToDelete?.title}</span>.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminDashboardLayout>
  );
}
