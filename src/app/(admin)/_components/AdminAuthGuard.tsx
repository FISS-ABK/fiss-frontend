'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getSession } from '@/lib/auth';

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const session  = getSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Allow access to login page
    if (pathname === '/admin/login') {
      return;
    }

    // If user is null (not authenticated) and not on login page, redirect to login
    if (session === null && pathname !== '/admin/login') {
      router.push('/admin/login');
    }

    // If session is authenticated and on login page, redirect to overview
    if (session && pathname === '/admin/login') {
      router.push('/admin/overview');
    }
  }, [session, pathname, router]);

  // Allow login page to render immediately
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // For protected pages, only render if authenticated
  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
