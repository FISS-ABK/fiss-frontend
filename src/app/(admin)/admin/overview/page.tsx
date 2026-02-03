"use client";

import AdminDashboardLayout from '@/app/(admin)/_components/AdminDashboardLayout';
import PageHeader from '@/app/(admin)/_components/PageHeader';
import StatCard from '@/app/(admin)/_components/StatCard';
import TransactionsTable from '@/app/(admin)/_components/TransactionsTable';
import { Users, DollarSign, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  
  // Mock data - replace with actual API calls
  const stats = {
    totalStudents: 2430,
    netAmount: 1250000,
    liveCount: 870,
  };

  const recentTransactions = [
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
      studentName: 'Zedious Zutonendu',
      studentId: 'STU-2024-002',
      feeType: 'School Bus',
      class: 'JSS 1',
      amount: '₦120,000.00',
      date: 'June 12, 2025',
      status: 'Approved' as const,
    },
  ];

  return (
    <AdminDashboardLayout>
      <PageHeader title="Overview" />

      {/* Stats Grid */}
      <div className="mb-6 grid gap-4 sm:gap-6 md:grid-cols-3 lg:gap-6">
        <StatCard
          title="Total student enrolled"
          value={stats.totalStudents.toLocaleString()}
          icon={<Users className="h-6 w-6" />}
        />
        <StatCard
          title="Net amount"
          value={`₦${stats.netAmount.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6" />}
        />
        <StatCard
          title="Live counting"
          value={stats.liveCount.toLocaleString()}
          icon={<UserCheck className="h-6 w-6" />}
        />
      </div>

      {/* Recent Transactions */}
      <TransactionsTable 
        transactions={recentTransactions}
        showSeeAll={true}
        onSeeAll={() => router.push('/admin/transactions')}
      />
    </AdminDashboardLayout>
  );
}
