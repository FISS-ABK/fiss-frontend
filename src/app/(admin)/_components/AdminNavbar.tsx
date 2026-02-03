'use client';

import { Shield } from 'lucide-react';
import {useAdminAuth } from '@/hooks/use-admin-auth';

interface AdminNavbarProps {
  isCollapsed: boolean;
}

export default function AdminNavbar({ isCollapsed }: AdminNavbarProps) {
  const { user, signOut } = useAdminAuth();

  return (
    <header className={`fixed right-0 top-0 z-10 h-16 border-b flex items-center border-gray-200 bg-white transition-all duration-300 ${
      isCollapsed ? 'left-20' : 'left-64'
    }`}>
      <div className='flex items-center justify-between w-full px-6'>
        <div className='flex items-ce'>
          <Shield className='text-[#0a1929] font-bold'/>
          <h1 className='font-bold text-[#0a1929] text-xl'>Admin Panel</h1>
        </div>
        <div className="flex h-full items-center justify-end gap-4">
          {/* User Profile */}
          <div className="relative group">
            <button className="flex items-center gap-2 rounded-full p-2 hover:bg-gray-100 transition-colors">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-white text-sm font-medium">
                {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'A'}
              </div>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin'}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <button
                onClick={signOut}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
