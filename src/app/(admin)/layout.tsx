'use client';

import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { AdminAuthProvider } from '@/providers/admin-auth-provider';
import { Toaster } from 'sonner';
import AdminAuthGuard from './_components/AdminAuthGuard';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminAuthGuard>
        {children}
      </AdminAuthGuard>
      <Toaster position="top-right" richColors />
    </AdminAuthProvider>
  );
}