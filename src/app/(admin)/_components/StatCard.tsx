'use client';

import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
}

export default function StatCard({ title, value, subtitle, icon, className = '' }: StatCardProps) {
  return (
    <div className={`rounded-lg bg-black p-4 text-white sm:p-5 md:p-6 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-gray-400 sm:text-sm">{title}</p>
          <h3 className="mt-1 truncate text-2xl font-bold sm:mt-2 sm:text-3xl lg:text-3xl">{value}</h3>
          {subtitle && <p className="mt-1 text-xs text-gray-400 sm:text-sm">{subtitle}</p>}
        </div>
        {icon && <div className="flex-shrink-0 text-gray-400">{icon}</div>}
      </div>
    </div>
  );
}
