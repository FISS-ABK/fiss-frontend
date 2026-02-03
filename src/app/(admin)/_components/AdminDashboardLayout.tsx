'use client';

import { useState } from 'react';
import AdminSidebar from '@/app/(admin)/_components/AdminSidebar';
import AdminNavbar from '@/app/(admin)/_components/AdminNavbar';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <AdminNavbar isCollapsed={isCollapsed} />
      <main className={`mt-16 p-8 transition-all duration-300 ${
        isCollapsed ? 'ml-20' : 'ml-64'
      }`}>
        {children}
      </main>
    </div>
  );
}
