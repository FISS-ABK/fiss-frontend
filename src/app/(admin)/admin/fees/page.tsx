"use client";

import { useState } from 'react';
import { FileText, Plus } from 'lucide-react';
import AdminDashboardLayout from '@/app/(admin)/_components/AdminDashboardLayout';
import PageHeader from '@/app/(admin)/_components/PageHeader';
import FeeCard from '@/app/(admin)/_components/FeeCard';
import FeeModal from '@/app/(admin)/_components/FeeModal';
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
import { FeeStructure } from '@/types/fees';
import { useFees, FeePayload } from '@/hooks/useFees';

export default function FeesManagementPage() {
  const { 
    fees, 
    isLoading, 
    createFee, 
    updateFee, 
    deleteFee,
    isCreating,
    isUpdating,
    isDeleting 
  } = useFees();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedFee, setSelectedFee] = useState<FeeStructure | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [feeToDelete, setFeeToDelete] = useState<FeeStructure | null>(null);

  const handleCreate = () => {
    setModalMode('create');
    setSelectedFee(null);
    setIsModalOpen(true);
  };

  const handleEdit = (fee: FeeStructure) => {
    setModalMode('edit');
    setSelectedFee(fee);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (fee: FeeStructure) => {
    setFeeToDelete(fee);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (feeToDelete && feeToDelete.id) {
      deleteFee(feeToDelete.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setFeeToDelete(null);
        },
      });
    }
  };

  const handleSave = (fee: FeeStructure) => {
    // Convert FeeStructure to FeePayload
    const payload: FeePayload = {
      feeType: fee.feeType,
      academicSession: fee.academicSession,
      class: fee.class,
      description: fee.description,
      term: fee.term,
      breakdown: fee.breakdown,
      totalAmount: fee.totalAmount,
    };

    if (modalMode === 'create') {
      createFee(payload, {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      });
    } else if (fee.id) {
      updateFee(
        { id: fee.id, payload },
        {
          onSuccess: () => {
            setIsModalOpen(false);
          },
        }
      );
    }
  };

  // Ensure fees is always an array
  const safeFees = Array.isArray(fees) ? fees : [];

  return (
    <AdminDashboardLayout>
      <PageHeader 
        title="Fee Management" 
        subtitle={isLoading ? 'Loading...' : `${safeFees.length} fee structures configured`}
        action={
          <button
            onClick={handleCreate}
            disabled={isCreating}
            className="flex items-center gap-2 rounded-lg bg-[#0a1929] px-4 py-2 text-sm font-medium text-white hover:bg-[#0a1929]/90 disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            Create Fee
          </button>
        }
      />

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0a1929] border-t-transparent mx-auto"></div>
            <p className="mt-4 text-sm text-gray-600">Loading fees...</p>
          </div>
        </div>
      )}

      {/* Fees Grid */}
      {!isLoading && safeFees.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {safeFees.map((fee: any) => (
            <FeeCard
              key={fee.id}
              fee={fee}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      ) : !isLoading ? (
        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No fees configured</h3>
          <p className="mt-2 text-sm text-gray-600">
            Get started by creating your first fee structure
          </p>
          <button
            onClick={handleCreate}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0a1929] px-4 py-2 text-sm font-medium text-white hover:bg-[#0a1929]/90"
          >
            <Plus className="h-4 w-4" />
            Create Fee
          </button>
        </div>
      ) : null}

      {/* Create/Edit Modal */}
      <FeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        fee={selectedFee}
        mode={modalMode}
        isLoading={isCreating || isUpdating}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the fee structure for{' '}
              <span className="font-semibold">{feeToDelete?.feeType}</span> 
              {' '}({feeToDelete?.class} - {feeToDelete?.term}).
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
