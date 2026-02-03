"use client";

import { useState } from 'react';
import { Download, Search, Filter } from 'lucide-react';
import AdminDashboardLayout from '@/app/(admin)/_components/AdminDashboardLayout';
import PageHeader from '@/app/(admin)/_components/PageHeader';
import TransactionsTable from '@/app/(admin)/_components/TransactionsTable';

// Mock data - replace with actual API call
const mockTransactions = [
  {
    id: 1,
    studentName: 'Zedious Zutonendu',
    studentId: 'STU-2024-001',
    feeType: 'Tuition Fee',
    class: 'JSS 1',
    amount: '₦120,000.00',
    date: 'June 12, 2025',
    status: 'Approved' as const,
  },
  {
    id: 2,
    studentName: 'Amara Johnson',
    studentId: 'STU-2024-002',
    feeType: 'School Bus',
    class: 'JSS 2',
    amount: '₦45,000.00',
    date: 'June 11, 2025',
    status: 'Pending' as const,
  },
  {
    id: 3,
    studentName: 'Chioma Okafor',
    studentId: 'STU-2024-003',
    feeType: 'Lab Fee',
    class: 'SSS 1',
    amount: '₦15,000.00',
    date: 'June 10, 2025',
    status: 'Approved' as const,
  },
  {
    id: 4,
    studentName: 'Emeka Williams',
    studentId: 'STU-2024-004',
    feeType: 'Tuition Fee',
    class: 'JSS 3',
    amount: '₦120,000.00',
    date: 'June 09, 2025',
    status: 'Rejected' as const,
  },
  {
    id: 5,
    studentName: 'Faith Adeyemi',
    studentId: 'STU-2024-005',
    feeType: 'Sports Fee',
    class: 'SSS 2',
    amount: '₦10,000.00',
    date: 'June 08, 2025',
    status: 'Approved' as const,
  },
];

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');
  const [feeTypeFilter, setFeeTypeFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Filter transactions based on search and filters
  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch = 
      transaction.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || transaction.status === statusFilter;
    const matchesClass = classFilter === 'All' || transaction.class === classFilter;
    const matchesFeeType = feeTypeFilter === 'All' || transaction.feeType === feeTypeFilter;

    return matchesSearch && matchesStatus && matchesClass && matchesFeeType;
  });

  const handleDownload = () => {
    // Convert transactions to CSV
    const headers = ['Student ID', 'Student Name', 'Fee Type', 'Class', 'Amount', 'Date', 'Status'];
    const csvData = filteredTransactions.map(t => [
      t.studentId,
      t.studentName,
      t.feeType,
      t.class,
      t.amount,
      t.date,
      t.status
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setStatusFilter('All');
    setClassFilter('All');
    setFeeTypeFilter('All');
    setSearchQuery('');
  };

  return (
    <AdminDashboardLayout>
      <PageHeader 
        title="Transactions" 
        subtitle={`${filteredTransactions.length} total transactions`}
      />

      {/* Search and Actions Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
            <h3 className="text-sm font-semibold text-gray-900">Filter Transactions</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Clear all
            </button>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Status Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Class Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Class</label>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="All">All Classes</option>
                <option value="JSS 1">JSS 1</option>
                <option value="JSS 2">JSS 2</option>
                <option value="JSS 3">JSS 3</option>
                <option value="SSS 1">SSS 1</option>
                <option value="SSS 2">SSS 2</option>
                <option value="SSS 3">SSS 3</option>
              </select>
            </div>

            {/* Fee Type Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Fee Type</label>
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

      {/* Transactions Table */}
      <TransactionsTable transactions={filteredTransactions} />

      {/* No Results */}
      {filteredTransactions.length === 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-500">No transactions found matching your criteria.</p>
        </div>
      )}
    </AdminDashboardLayout>
  );
}
