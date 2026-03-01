"use client";

import { useRouter } from 'next/navigation';
import { Users, ArrowRight } from 'lucide-react';
import AdminDashboardLayout from '@/app/(admin)/_components/AdminDashboardLayout';
import PageHeader from '@/app/(admin)/_components/PageHeader';

const classes = [
  { name: 'JSS 1', description: 'Junior Secondary School 1', color: 'bg-blue-500' },
  { name: 'JSS 2', description: 'Junior Secondary School 2', color: 'bg-blue-600' },
  { name: 'JSS 3', description: 'Junior Secondary School 3', color: 'bg-blue-700' },
  { name: 'SSS 1', description: 'Senior Secondary School 1', color: 'bg-emerald-500' },
  { name: 'SSS 2', description: 'Senior Secondary School 2', color: 'bg-emerald-600' },
  { name: 'SSS 3', description: 'Senior Secondary School 3', color: 'bg-emerald-700' },
];

export default function TransactionsPage() {
  const router = useRouter();

  const handleClassClick = (className: string) => {
    router.push(`/admin/transactions/${encodeURIComponent(className)}`);
  };

  return (
    <AdminDashboardLayout>
      <PageHeader
        title="Transactions"
        subtitle="Select a class to view payment transactions"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          <button
            key={cls.name}
            onClick={() => handleClassClick(cls.name)}
            className="group relative flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${cls.color} text-white`}>
              <Users className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{cls.name}</h3>
              <p className="text-sm text-gray-500">{cls.description}</p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-gray-600" />
          </button>
        ))}
      </div>
    </AdminDashboardLayout>
  );
}
