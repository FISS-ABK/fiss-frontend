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
import { useVacancies, VacancyPayload } from '@/hooks/useVacancies';

export default function VacanciesPage() {
  const { 
    vacancies, 
    isLoading, 
    createVacancy, 
    updateVacancy, 
    deleteVacancy,
    isCreating,
    isDeleting 
  } = useVacancies();

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
    if (vacancyToDelete && vacancyToDelete.id) {
      deleteVacancy(vacancyToDelete.id);
      setDeleteDialogOpen(false);
      setVacancyToDelete(null);
    }
  };

  const handleSave = (vacancy: Vacancy) => {
    // Convert Vacancy to VacancyPayload
    const payload: VacancyPayload = {
      title: vacancy.title,
      icon: vacancy.icon,
      job_description: vacancy.jobDescription,
      department: vacancy.department,
      location: vacancy.location,
      employment_type: vacancy.employmentType,
      requirements: vacancy.requirements?.map(r => r.text),
      isActive: vacancy.isActive,
    };

    if (modalMode === 'create') {
      createVacancy(payload);
    } else if (vacancy.id) {
      updateVacancy({ id: vacancy.id, payload });
    }
    setIsModalOpen(false);
  };

  // Ensure vacancies is always an array before filtering
  const safeVacancies = Array.isArray(vacancies) ? vacancies : [];
  const activeVacancies = safeVacancies.filter((v: any) => v.isActive !== false);
  const inactiveVacancies = safeVacancies.filter((v: any) => v.isActive === false);

  return (
    <AdminDashboardLayout>
      <PageHeader 
        title="Vacancies" 
        subtitle={isLoading ? 'Loading...' : `${activeVacancies.length} active positions`}
        action={
          <button
            onClick={handleCreate}
            disabled={isCreating}
            className="flex items-center gap-2 rounded-lg bg-[#0a1929] px-4 py-2 text-sm font-medium text-white hover:bg-[#0a1929]/90 disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            Post Vacancy
          </button>
        }
      />

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0a1929] border-t-transparent mx-auto"></div>
            <p className="mt-4 text-sm text-gray-600">Loading vacancies...</p>
          </div>
        </div>
      )}

      {/* Vacancies Grid */}
      {!isLoading && safeVacancies.length > 0 ? (
        <div className="space-y-8">
          {/* Active Vacancies */}
          {activeVacancies.length > 0 && (
            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Active Positions</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {activeVacancies.map((vacancy: Vacancy) => (
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
                {inactiveVacancies.map((vacancy: Vacancy) => (
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
      ) : !isLoading ? (
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
      ) : null}

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
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminDashboardLayout>
  );
}
