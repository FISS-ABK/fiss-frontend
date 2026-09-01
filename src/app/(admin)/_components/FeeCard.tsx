'use client';

import { Edit, Trash2, FileText } from 'lucide-react';
import { FeeStructure } from '@/types/fees';
import { calculatePlatformFee } from '@/utils/feeUtils';

interface FeeCardProps {
  fee: FeeStructure;
  onEdit: (fee: FeeStructure) => void;
  onDelete: (fee: FeeStructure) => void;
}

export default function FeeCard({ fee, onEdit, onDelete }: FeeCardProps) {
  const platformFee = calculatePlatformFee(fee.amount);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">{fee.feeType}</h3>
          </div>
          <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-600">
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">
              {fee.className}
            </span>
            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-purple-700">
              {fee.term}
            </span>
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-700">
              {fee.academicSession}
            </span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(fee)}
            className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 transition-colors"
            title="Edit"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(fee)}
            className="rounded-lg p-2 text-red-600 hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Description */}
      {fee.description && (
        <p className="mb-4 text-sm text-gray-600">{fee.description}</p>
      )}

      {/* Breakdown */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase text-gray-500">Fee Breakdown</p>
        <div className="space-y-1.5">
          {fee.breakdown.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-700">{item.description}</span>
              <span className="font-medium text-gray-900">₦{item.amount.toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm pt-1 border-t border-dashed border-gray-200">
            <span className="text-gray-600 flex items-center gap-1">
              Platform & Processing Fee
              <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-normal">(2.5% + ₦99)</span>
            </span>
            <span className="font-medium text-gray-700">₦{platformFee.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="mt-4 border-t pt-3 space-y-1">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>School Base Amount</span>
          <span>₦{fee.amount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center pt-1">
          <span className="text-sm font-semibold text-gray-800">Total Payable</span>
          <span className="text-xl font-bold text-[#0a1929]">
            ₦{(fee.amount + platformFee).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
