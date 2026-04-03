"use client";

import AdminDashboardLayout from '@/app/(admin)/_components/AdminDashboardLayout';
import DashboardCharts from '@/app/(admin)/_components/DashboardCharts';
import PageHeader from '@/app/(admin)/_components/PageHeader';
import StatCard from '@/app/(admin)/_components/StatCard';
import TransactionsTable from '@/app/(admin)/_components/TransactionsTable';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const {
    stats,
    recentTransactions,
    statusBreakdown,
    paymentsTrend,
    feeTotalsByClass,
    isLoading,
  } = useDashboardData();

  return (
    <AdminDashboardLayout>
      <PageHeader title="Overview" />

      {/* Stats Grid */}
      <div className="mb-6 grid gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={isLoading ? '—' : stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
            className={stat.className}
          />
        ))}
      </div>

      <div className="mb-6">
        <DashboardCharts
          statusBreakdown={statusBreakdown}
          paymentsTrend={paymentsTrend}
          feeTotalsByClass={feeTotalsByClass}
          isLoading={isLoading}
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
