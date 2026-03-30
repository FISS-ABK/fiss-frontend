"use client";

import AdminDashboardLayout from '@/app/(admin)/_components/AdminDashboardLayout';
import PageHeader from '@/app/(admin)/_components/PageHeader';
import StatCard from '@/app/(admin)/_components/StatCard';
import TransactionsTable from '@/app/(admin)/_components/TransactionsTable';
import { useAdminInfo } from '@/hooks/useAdminInfo';
import { Users, DollarSign, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const { totalCount, totalAmount, statusCounts, isLoading } = useAdminInfo();

  const totalCountValue = totalCount ?? 0;
  const totalAmountValue = totalAmount ?? 0;
  const confirmedCount = statusCounts?.confirmed ?? 0;

  const recentTransactions = [
    {
      id: 1,
      fullName: 'Zedious Zutonendu',
      studentId: 'STU-2024-001',
      feeType: 'Tuition Fee',
      class: 'JSS 1',
      amountNgn: '₦120,000.00',
      date: 'June 12, 2025',
      status: 'confirmed',
    },
    {
      id: 2,
      fullName: 'Zedious Zutonendu',
      studentId: 'STU-2024-002',
      feeType: 'School Bus',
      class: 'JSS 1',
      amountNgn: '₦120,000.00',
      date: 'June 12, 2025',
      status: 'confirmed',
    },
  ];

  return (
    <AdminDashboardLayout>
      <PageHeader title="Overview" />

      {/* Stats Grid */}
      <div className="mb-6 grid gap-4 sm:gap-6 md:grid-cols-3 lg:gap-6">
        <StatCard
          title="Total payments"
          value={isLoading ? '—' : totalCountValue.toLocaleString()}
          icon={<Users className="h-6 w-6" />}
        />
        <StatCard
          title="Net amount"
          value={isLoading ? '—' : `₦${totalAmountValue.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6" />}
        />
        <StatCard
          title="Confirmed payments"
          value={isLoading ? '—' : confirmedCount.toLocaleString()}
          icon={<UserCheck className="h-6 w-6" />}
          
        />
      </div>

      {/* Recent Transactions */}
      {/* <TransactionsTable 
        transactions={recentTransactions}
        showSeeAll={true}
        onSeeAll={() => router.push('/admin/transactions')}
      /> */}
    </AdminDashboardLayout>
  );
}
