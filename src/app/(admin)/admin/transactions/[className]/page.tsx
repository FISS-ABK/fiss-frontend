"use client";

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Download, Search, Filter, ArrowLeft, DollarSign } from 'lucide-react';
import AdminDashboardLayout from '@/app/(admin)/_components/AdminDashboardLayout';
import PageHeader from '@/app/(admin)/_components/PageHeader';
import TransactionsTable from '@/app/(admin)/_components/TransactionsTable';
import { useClassTransactions, getBaseAmountFromTx } from '@/hooks/useTransaction';

const ACADEMIC_SESSIONS = [
  '2024/2025',
  '2025/2026',
  '2026/2027',
];

export default function ClassTransactionsPage() {
  const params = useParams<{ className: string }>();
  const router = useRouter();
  const className = decodeURIComponent(params.className);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [feeTypeFilter, setFeeTypeFilter] = useState('All');
  const [academicSession, setAcademicSession] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const {
    transactions,
    totalAmount,
    isLoadingTransactions,
  } = useClassTransactions(className, academicSession || undefined);

  // Normalize transactions for display
  const normalizedTransactions = useMemo(
    () =>
      (transactions ?? []).map((t, index) => {
        const baseAmount = getBaseAmountFromTx(t);
        const amountFormatted = `₦${baseAmount.toLocaleString()}`;

        const createdDate = t.created_at || t.date || t.updated_at;
        const formattedDate = createdDate
          ? new Date(createdDate).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
            })
          : '';

        return {
          // Prefer MongoDB _id so the detail-page route resolves correctly
          id: (t._id ?? t.id ?? index) as string | number,
          fullName: (t.metadata?.fullName ||
            t.fullName ||
            t.student_name ||
            'Unknown Student') as string,
          studentId: (t.metadata?.studentId || t.studentId || t.student_id || '—') as string,
          feeType: (((t.metadata as Record<string, unknown> | undefined)?.feeType as string | undefined) || t.feeType || t.fee_type || '—') as string,
          class: (t.metadata?.className || t.className || t.class || className) as string,
          amountNgn: amountFormatted,
          date: formattedDate,
          status: (t.status || 'Pending') as string,
        };
      }),
    [transactions, className]
  );

  // Client-side filtering (search, status, fee type)
  const filteredTransactions = useMemo(
    () =>
      normalizedTransactions.filter((transaction) => {
        const matchesSearch =
          transaction.fullName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          transaction.studentId
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        const matchesStatus =
          statusFilter === 'All' || transaction.status === statusFilter;
        const matchesFeeType =
          feeTypeFilter === 'All' || transaction.feeType === feeTypeFilter;

        return matchesSearch && matchesStatus && matchesFeeType;
      }),
    [normalizedTransactions, searchQuery, statusFilter, feeTypeFilter]
  );

  const handleDownload = () => {
    const headers = [
      'Student ID',
      'Student Name',
      'Fee Type',
      'Class',
      'Amount',
      'Date',
      'Status',
    ];
    const csvData = filteredTransactions.map((t) => [
      t.studentId,
      t.fullName,
      t.feeType,
      t.class,
      t.amountNgn,
      t.date,
      t.status,
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${className.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const totalClassBaseAmount = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return totalAmount ? getBaseAmountFromTx({ amount: totalAmount }) : 0;
    }
    return transactions.reduce((sum, t) => sum + getBaseAmountFromTx(t), 0);
  }, [transactions, totalAmount]);

  const clearFilters = () => {
    setStatusFilter('All');
    setFeeTypeFilter('All');
    setSearchQuery('');
  };

  return (
    <AdminDashboardLayout>
      {/* Back button */}
      <div className="mb-4">
        <button
          onClick={() => router.push('/admin/transactions')}
          className="flex items-center gap-1.5 text-sm text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to classes
        </button>
      </div>

      <PageHeader
        title={`${className} Transactions`}
        subtitle={
          isLoadingTransactions
            ? 'Loading transactions...'
            : `${filteredTransactions.length} transaction${filteredTransactions.length !== 1 ? 's' : ''} found`
        }
      />

      {/* Total Amount Card */}
      {!isLoadingTransactions && totalClassBaseAmount > 0 && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Total Amount{academicSession ? ` (${academicSession})` : ''}
            </p>
            <p className="text-xl font-bold text-gray-900">
              ₦{totalClassBaseAmount.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Search, Session Filter, and Actions Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or student ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Academic Session Selector */}
          <select
            value={academicSession}
            onChange={(e) => setAcademicSession(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All Sessions</option>
            {ACADEMIC_SESSIONS.map((session) => (
              <option key={session} value={session}>
                {session}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-lg bg-[#0a1929] px-4 py-2 text-sm font-medium text-white hover:bg-[#0a1929]/90"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">
              Filter Transactions
            </h3>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Clear all
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Fee Type Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Fee Type
              </label>
              <select
                value={feeTypeFilter}
                onChange={(e) => setFeeTypeFilter(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="All">All Fee Types</option>
                <option value="Tuition Fee">Tuition Fee</option>
                <option value="School Bus">School Bus</option>
                <option value="Lab Fee">Lab Fee</option>
                <option value="Sports Fee">Sports Fee</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoadingTransactions && (
        <div className="flex items-center justify-center rounded-lg bg-white py-16 shadow-sm">
          <div className="text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            <p className="text-sm text-gray-500">Loading transactions...</p>
          </div>
        </div>
      )}

      {/* Transactions Table */}
      {!isLoadingTransactions && (
        <TransactionsTable
          transactions={filteredTransactions}
          title={`${className} Payments`}
          onRowClick={(transaction) =>
            router.push(
              `/admin/transactions/${encodeURIComponent(className)}/${transaction.id}`
            )
          }
        />
      )}

      {/* No Results */}
      {!isLoadingTransactions && filteredTransactions.length === 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-500">
            No transactions found for {className}
            {academicSession ? ` in ${academicSession} session` : ''}.
          </p>
        </div>
      )}
    </AdminDashboardLayout>
  );
}
