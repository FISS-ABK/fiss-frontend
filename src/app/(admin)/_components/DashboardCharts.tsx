'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type {
  StatusBreakdownItem,
  PaymentsTrendItem,
  FeeTotalsByClassItem,
} from '@/hooks/useDashboardData';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

function ChartCard({ title, subtitle, children }: ChartCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900 sm:text-base">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}

interface DashboardChartsProps {
  statusBreakdown: StatusBreakdownItem[];
  paymentsTrend: PaymentsTrendItem[];
  feeTotalsByClass: FeeTotalsByClassItem[];
  isLoading: boolean;
}

export default function DashboardCharts({
  statusBreakdown,
  paymentsTrend,
  feeTotalsByClass,
  isLoading,
}: DashboardChartsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
      <ChartCard
        title="Payment status mix"
        subtitle="Distribution of payment statuses"
      >
        <div className="space-y-3">
          {statusBreakdown.map((item) => {
            const total = statusBreakdown.reduce((sum, entry) => sum + entry.value, 0);
            const width = total > 0 ? (item.value / total) * 100 : 0;
            return (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{item.label}</span>
                  <span>{isLoading ? '—' : item.value.toLocaleString()}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={cn('h-full transition-all', item.color)}
                    style={{ width: `${isLoading ? 0 : width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </ChartCard>

      <ChartCard
        title="Payment trend"
        subtitle="Total amount collected in the last 7 days"
      >
        <PaymentsTrendChart data={paymentsTrend} isLoading={isLoading} />
      </ChartCard>

      <ChartCard
        title="Fee totals by class"
        subtitle="Sum of fee amounts configured per class"
      >
        <FeeTotalsByClassChart data={feeTotalsByClass} isLoading={isLoading} />
      </ChartCard>
    </div>
  );
}

interface PaymentsTrendChartProps {
  data: PaymentsTrendItem[];
  isLoading: boolean;
}

function PaymentsTrendChart({ data, isLoading }: PaymentsTrendChartProps) {
  const totals = data.map((item) => item.total);
  const maxValue = Math.max(1, ...totals);
  const points = data.map((item, index) => {
    const x = data.length === 1 ? 50 : (index / (data.length - 1)) * 100;
    const y = 40 - (item.total / maxValue) * 30;
    return `${x},${y}`;
  });

  return (
    <div className="space-y-3">
      <svg viewBox="0 0 100 40" className="h-24 w-full">
        <polyline
          fill="none"
          stroke="#0f172a"
          strokeWidth="2"
          points={isLoading ? '0,40 100,40' : points.join(' ')}
        />
        <polyline
          fill="rgba(15, 23, 42, 0.15)"
          stroke="none"
          points={
            isLoading
              ? '0,40 100,40 100,40 0,40'
              : `0,40 ${points.join(' ')} 100,40`
          }
        />
      </svg>
      <div className="flex justify-between text-[10px] text-gray-500 sm:text-xs">
        {data.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-gray-600">
        <span>Last 7 days total</span>
        <span>
          {isLoading
            ? '—'
            : `₦${totals.reduce((sum, value) => sum + value, 0).toLocaleString()}`}
        </span>
      </div>
    </div>
  );
}

interface FeeTotalsByClassChartProps {
  data: FeeTotalsByClassItem[];
  isLoading: boolean;
}

function FeeTotalsByClassChart({ data, isLoading }: FeeTotalsByClassChartProps) {
  const maxValue = Math.max(1, ...data.map((item) => item.total));

  if (!data.length) {
    return (
      <p className="text-xs text-gray-500">
        {isLoading ? 'Loading totals...' : 'No fee data available yet.'}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((item) => {
        const width = (item.total / maxValue) * 100;
        return (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span className="truncate">{item.label}</span>
              <span>{isLoading ? '—' : `₦${item.total.toLocaleString()}`}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full bg-slate-900"
                style={{ width: `${isLoading ? 0 : width}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
