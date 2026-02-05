'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FeeStructure, FeeBreakdownItem } from '@/types/fees';

interface FeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (fee: FeeStructure) => void;
  fee?: FeeStructure | null;
  mode: 'create' | 'edit';
  isLoading?: boolean;
}

const FEE_TYPE_OPTIONS = [
  'School Fee',
  'Hostel Fee',
  'Textbooks & Study Materials',
  'Sport Fee',
  'Other',
];

const TERM_OPTIONS = ['1st Term', '2nd Term', '3rd Term'] as const;

const CLASS_OPTIONS = ['JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3'];

export default function FeeModal({ isOpen, onClose, onSave, fee, mode, isLoading = false }: FeeModalProps) {
  const [formData, setFormData] = useState<FeeStructure>({
    _id: fee?._id,
    feeType: fee?.feeType || 'School Fee',
    academicSession: fee?.academicSession || '',
    className: fee?.className  || '',
    description: fee?.description || '',
    term: fee?.term || '1st Term',
    breakdown: fee?.breakdown || [{ description: '', amount: 0 }],
    amount: fee?.amount || 0,
  });

  const [customFeeType, setCustomFeeType] = useState(
    fee?.feeType && !FEE_TYPE_OPTIONS.includes(fee.feeType) ? fee.feeType : ''
  );

  // Update form data when fee or mode changes
  useEffect(() => {
    if (mode === 'edit' && fee) {
      setFormData({
        _id: fee._id,
        feeType: fee.feeType || 'School Fee',
        academicSession: fee.academicSession || '',
        className: fee.className || '',
        description: fee.description || '',
        term: fee.term || '1st Term',
        breakdown: fee.breakdown && fee.breakdown.length > 0 
          ? fee.breakdown 
          : [{ description: '', amount: 0 }],
        amount: fee.amount || 0,
      });
      setCustomFeeType(
        fee.feeType && !FEE_TYPE_OPTIONS.includes(fee.feeType) ? fee.feeType : ''
      );
    } else if (mode === 'create') {
      setFormData({
        feeType: 'School Fee',
        academicSession: '',
        className: '',
        description: '',
        term: '1st Term',
        breakdown: [{ description: '', amount: 0 }],
        amount: 0,
      });
      setCustomFeeType('');
    }
  }, [fee, mode, isOpen]);

  const calculateTotal = (breakdown: FeeBreakdownItem[]) => {
    return breakdown.reduce((sum, item) => sum + (item.amount || 0), 0);
  };

  const handleBreakdownChange = (index: number, field: keyof FeeBreakdownItem, value: string | number) => {
    const newBreakdown = [...formData.breakdown];
    newBreakdown[index] = {
      ...newBreakdown[index],
      [field]: field === 'amount' ? Number(value) : value,
    };
    const total = calculateTotal(newBreakdown);
    setFormData({ ...formData, breakdown: newBreakdown, amount: total });
  };

  const addBreakdownItem = () => {
    setFormData({
      ...formData,
      breakdown: [...formData.breakdown, { description: '', amount: 0 }],
    });
  };

  const removeBreakdownItem = (index: number) => {
    const newBreakdown = formData.breakdown.filter((_, i) => i !== index);
    const total = calculateTotal(newBreakdown);
    setFormData({ ...formData, breakdown: newBreakdown, amount: total });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const feeTypeValue = formData.feeType === 'Other' ? customFeeType : formData.feeType;
    onSave({ ...formData, feeType: feeTypeValue });
  };

  return (
    <Dialog open={isOpen} onOpenChange={isLoading ? undefined : onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create New Fee' : 'Edit Fee'}</DialogTitle>
          <DialogDescription>
            {mode === 'create' 
              ? 'Add a new fee structure with breakdown details'
              : 'Update the fee structure and breakdown details'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Fee Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Fee Type <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.feeType}
                onChange={(e) => setFormData({ ...formData, feeType: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {FEE_TYPE_OPTIONS.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Fee Type Input */}
            {formData.feeType === 'Other' && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Custom Fee Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customFeeType}
                  onChange={(e) => setCustomFeeType(e.target.value)}
                  placeholder="Enter custom fee type"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Academic Session */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Academic Session <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.academicSession}
                onChange={(e) => setFormData({ ...formData, academicSession: e.target.value })}
                placeholder="e.g., 2024/2025"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Term */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Term <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.term}
                onChange={(e) => setFormData({ ...formData, term: e.target.value as '1st Term' | '2nd Term' | '3rd Term' })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {TERM_OPTIONS.map((term) => (
                  <option key={term} value={term}>
                    {term}
                  </option>
                ))}
              </select>
            </div>

            {/* Class */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Class <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.className}
                onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Class</option>
                {CLASS_OPTIONS.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter fee description..."
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Fee Breakdown */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Fee Breakdown <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={addBreakdownItem}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <Plus className="h-4 w-4" />
                Add Item
              </button>
            </div>

            <div className="space-y-3">
              {formData.breakdown.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={item.description}
                    onChange={(e) => handleBreakdownChange(index, 'description', e.target.value)}
                    placeholder="Item description"
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={item.amount}
                    onChange={(e) => handleBreakdownChange(index, 'amount', e.target.value)}
                    placeholder="Amount"
                    className="w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {formData.breakdown.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBreakdownItem(index)}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Total Amount */}
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Total Amount</span>
              <span className="text-xl font-bold text-gray-900">
                ₦{formData.amount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-[#0a1929] px-4 py-2 text-sm font-medium text-white hover:bg-[#0a1929]/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading && (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              )}
              {isLoading 
                ? (mode === 'create' ? 'Creating...' : 'Updating...') 
                : (mode === 'create' ? 'Create Fee' : 'Update Fee')}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
