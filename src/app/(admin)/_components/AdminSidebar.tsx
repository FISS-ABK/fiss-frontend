'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  CreditCard, 
  DollarSign, 
  Briefcase,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  {
    name: 'Overview',
    href: '/admin/overview',
    icon: LayoutDashboard,
  },
  {
    name: 'Transactions',
    href: '/admin/transactions',
    icon: CreditCard,
  },
  {
    name: 'Fees Management',
    href: '/admin/fees',
    icon: DollarSign,
  },
  {
    name: 'Vacancies',
    href: '/admin/vacancies',
    icon: Briefcase,
  },
];

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({ isCollapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-[#0a1929] text-white transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Logo */}
      <div className="flex h-20 items-center justify-between px-6">
        {!isCollapsed && (
          <Image
            src="/logo.png"
            alt="FISS Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        )}
        <button
          onClick={onToggle}
          className={`rounded-lg p-2 hover:bg-white/10 transition-colors ${
            isCollapsed ? 'mx-auto' : ''
          }`}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-8 px-4">
        {!isCollapsed && (
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Pages
          </p>
        )}
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  } ${
                    isCollapsed ? 'justify-center' : ''
                  }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className="h-5 w-5" />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
