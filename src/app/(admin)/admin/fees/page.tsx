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
import { toast } from 'sonner';

// Mock data - replace with actual API calls
const mockFees: FeeStructure[] = [
  {
    id: 1,
    feeType: 'School Fee',
    academicSession: '2024/2025',
    class: 'JSS 1',
    description: 'First term school fees for JSS 1 students',
    term: '1st Term',
    breakdown: [
      { description: 'Tuition', amount: 80000 },
      { description: 'Development Levy', amount: 15000 },
      { description: 'Library Fee', amount: 5000 },
    ],
    totalAmount: 100000,
  },
  {
    id: 2,
    feeType: 'Hostel Fee',
    academicSession: '2024/2025',
    class: 'SSS 1',
    description: 'Hostel accommodation for SSS 1 students',
    term: '1st Term',
    breakdown: [
      { description: 'Accommodation', amount: 50000 },
      { description: 'Maintenance', amount: 10000 },
    ],
    totalAmount: 60000,
  },
  {
    id: 3,
    feeType: 'Sport Fee',
    academicSession: '2024/2025',
    class: 'JSS 2',
    description: 'Sports and athletics program',
    term: '2nd Term',
    breakdown: [
      { description: 'Sports Kit', amount: 8000 },
      { description: 'Training Fee', amount: 7000 },
    ],
    totalAmount: 15000,
  },
];

export default function FeesManagementPage() {
  const [fees, setFees] = useState<FeeStructure[]>(mockFees);
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
    if (feeToDelete) {
      setFees(fees.filter(f => f.id !== feeToDelete.id));
      toast.success(`${feeToDelete.feeType} has been deleted successfully`);
      setDeleteDialogOpen(false);
      setFeeToDelete(null);
    }
  };

  const handleSave = (fee: FeeStructure) => {
    if (modalMode === 'create') {
      const newFee = { ...fee, id: Date.now() };
      setFees([...fees, newFee]);
      toast.success('Fee created successfully');
    } else {
      setFees(fees.map(f => f.id === fee.id ? fee : f));
      toast.success('Fee updated successfully');
    }
  };

  return (
    <AdminDashboardLayout>
      <PageHeader 
        title="Fee Management" 
        subtitle={`${fees.length} fee structures configured`}
        action={
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 rounded-lg bg-[#0a1929] px-4 py-2 text-sm font-medium text-white hover:bg-[#0a1929]/90"
          >
            <Plus className="h-4 w-4" />
            Create Fee
          </button>
        }
      />

      {/* Fees Grid */}
      {fees.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {fees.map((fee) => (
            <FeeCard
              key={fee.id}
              fee={fee}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      ) : (
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
      )}

      {/* Create/Edit Modal */}
      <FeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        fee={selectedFee}
        mode={modalMode}
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
