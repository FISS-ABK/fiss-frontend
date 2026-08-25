"use client";

import { useMemo } from "react";
import type { ReactNode } from "react";
import {
  Users,
  DollarSign,
  UserCheck,
  Clock,
  XCircle,
  FileText,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { useAdminInfo } from "@/hooks/useAdminInfo";
import { useAdminTransactions, ApiTransaction, getBaseAmountFromTx } from "@/hooks/useTransaction";
import { useFees } from "@/hooks/useFees";
import { useVacancies } from "@/hooks/useVacancies";

export interface DashboardStat {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
}

export interface DashboardTransaction {
  id: string | number;
  fullName: string;
  studentId: string;
  feeType: string;
  class: string;
  amountNgn: string;
  date: string;
  created_at?: string;
  updated_at?: string;
  status: string;
}

export interface StatusBreakdownItem {
  label: string;
  value: number;
  color: string;
}

export interface PaymentsTrendItem {
  label: string;
  total: number;
  count: number;
}

export interface FeeTotalsByClassItem {
  label: string;
  total: number;
}

const formatNumber = (value: number) => value.toLocaleString();
const formatCurrency = (value: number) => `₦${formatNumber(value)}`;

const normalizeAmount = (raw: unknown) => {
  if (typeof raw === "number" && Number.isFinite(raw)) {
    return formatCurrency(raw);
  }

  if (typeof raw === "string") {
    const cleaned = raw.replace(/[^0-9.-]/g, "");
    const parsed = Number(cleaned);
    if (Number.isFinite(parsed) && cleaned !== "") {
      return formatCurrency(parsed);
    }
    return raw;
  }

  return formatCurrency(0);
};

const resolveStatus = (status: unknown) => {
  if (!status) return "pending";
  return String(status).toLowerCase();
};

const resolveAmountNumber = (raw: unknown) => {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (typeof raw === "string") {
    const cleaned = raw.replace(/[^0-9.-]/g, "");
    const parsed = Number(cleaned);
    if (Number.isFinite(parsed) && cleaned !== "") return parsed;
  }
  return 0;
};

const resolveDate = (tx: ApiTransaction) => {
  return (
    tx.date ??
    tx.created_at ??
    tx.updated_at ??
    tx.confirmedAt ??
    tx.createdAt ??
    ""
  );
};

const resolveName = (tx: ApiTransaction) => {
  return (
    tx.metadata?.fullName ??
    tx.fullName ??
    tx.studentName ??
    tx.student_name ??
    "Unknown"
  );
};

const resolveStudentId = (tx: ApiTransaction) => {
  return tx.metadata?.studentId ?? tx.studentId ?? tx.student_id ?? "-";
};

const resolveFeeType = (tx: ApiTransaction): string => {
  return (
    ((tx.metadata as Record<string, unknown> | undefined)?.feeType as string | undefined) ??
    tx.feeType ??
    tx.fee_type ??
    tx.metadata?.zendfi?.description ??
    tx.metadata?.description ??
    "Payment"
  );
};

const resolveClassName = (tx: ApiTransaction) => {
  return tx.metadata?.className ?? tx.className ?? tx.class ?? "-";
};

const resolveId = (tx: ApiTransaction, index: number) => {
  return (
    tx._id ??
    tx.id ??
    tx.paymentId ??
    tx.TransactionID ??
    `${index}`
  );
};

const sortByDateDesc = (a: ApiTransaction, b: ApiTransaction) => {
  const timeA = Date.parse(resolveDate(a)) || 0;
  const timeB = Date.parse(resolveDate(b)) || 0;
  return timeB - timeA;
};

export const useDashboardData = () => {
  const { totalCount, totalAmount, statusCounts, isLoading: isOverviewLoading } =
    useAdminInfo();
  const {
    transactions,
    isLoadingTransactions,
  } = useAdminTransactions();
  const { fees, isLoading: isFeesLoading } = useFees();
  const { vacancies, isLoading: isVacanciesLoading } = useVacancies();

  const stats = useMemo<DashboardStat[]>(() => {
    const totalFeesAmount = fees.reduce(
      (sum, fee) => sum + (Number(fee.amount) || 0),
      0
    );
    const activeVacancies = vacancies.filter((vacancy) => vacancy.isActive !== false);
    const uniqueStudents = new Set(
      transactions
        .map(resolveStudentId)
        .filter((studentId) => studentId && studentId !== "-")
    );

    // Calculate net base amount of successful payments
    const successfulTxs = transactions.filter(
      (tx) => resolveStatus(tx.status) === "successful" || resolveStatus(tx.status) === "confirmed" || resolveStatus(tx.status) === "completed"
    );
    const netBaseAmount = successfulTxs.length > 0
      ? successfulTxs.reduce((sum, tx) => sum + getBaseAmountFromTx(tx), 0)
      : (totalAmount ? getBaseAmountFromTx({ amount: totalAmount }) : 0);

    return [
      {
        title: "Total payments",
        value: formatNumber(totalCount ?? 0),
        icon: <Users className="h-6 w-6" />,
      },
      {
        title: "Net amount",
        value: formatCurrency(netBaseAmount),
        icon: <DollarSign className="h-6 w-6" />,
      },
      {
        title: "Successful payments",
        value: formatNumber(statusCounts?.successful ?? 0),
        icon: <UserCheck className="h-6 w-6" />,
      },
      {
        title: "Pending payments",
        value: formatNumber(statusCounts?.pending ?? 0),
        icon: <Clock className="h-6 w-6" />,
      },
      {
        title: "Failed payments",
        value: formatNumber(statusCounts?.failed ?? 0),
        icon: <XCircle className="h-6 w-6" />,
      },
      {
        title: "Fee structures",
        value: formatNumber(fees.length),
        icon: <FileText className="h-6 w-6" />,
      },
      {
        title: "Total fees amount",
        value: formatCurrency(totalFeesAmount),
        icon: <DollarSign className="h-6 w-6" />,
      },
      {
        title: "Vacancies",
        value: formatNumber(vacancies.length),
        icon: <Briefcase className="h-6 w-6" />,
      },
      {
        title: "Active vacancies",
        value: formatNumber(activeVacancies.length),
        icon: <CheckCircle2 className="h-6 w-6" />,
      },
      {
        title: "Unique students",
        value: formatNumber(uniqueStudents.size),
        icon: <Users className="h-6 w-6" />,
      },
    ];
  }, [fees, totalAmount, totalCount, statusCounts, transactions, vacancies]);

  const statusBreakdown = useMemo<StatusBreakdownItem[]>(() => {
    const fallbackCounts = transactions.reduce(
      (acc, tx) => {
        const status = resolveStatus(tx.status);
        acc[status] = (acc[status] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const confirmedValue = statusCounts?.successful ?? fallbackCounts.successful ?? 0;
    const pendingValue = statusCounts?.pending ?? fallbackCounts.pending ?? 0;
    const failedValue = statusCounts?.failed ?? fallbackCounts.failed ?? 0;
    const otherValue =
      Math.max(0, (totalCount ?? 0) - (confirmedValue + pendingValue + failedValue)) ||
      fallbackCounts.other ||
      0;

    return [
      { label: "Successful", value: confirmedValue, color: "bg-emerald-500" },
      { label: "Pending", value: pendingValue, color: "bg-amber-500" },
      { label: "Failed", value: failedValue, color: "bg-rose-500" },
      { label: "Other", value: otherValue, color: "bg-slate-400" },
    ];
  }, [statusCounts, totalCount, transactions]);

  const paymentsTrend = useMemo<PaymentsTrendItem[]>(() => {
    const days = 7;
    const today = new Date();
    const buckets = Array.from({ length: days }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (days - 1 - index));
      const key = date.toISOString().slice(0, 10);
      return {
        key,
        label: date.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
        total: 0,
        count: 0,
      };
    });

    const bucketIndex = new Map(buckets.map((bucket, index) => [bucket.key, index]));

    transactions.forEach((tx) => {
      const rawDate = resolveDate(tx);
      if (!rawDate) return;
      const parsed = new Date(rawDate);
      if (Number.isNaN(parsed.getTime())) return;
      const key = parsed.toISOString().slice(0, 10);
      const index = bucketIndex.get(key);
      if (index === undefined) return;
      buckets[index].total += getBaseAmountFromTx(tx);
      buckets[index].count += 1;
    });

    return buckets.map(({ label, total, count }) => ({ label, total, count }));
  }, [transactions]);

  const feeTotalsByClass = useMemo<FeeTotalsByClassItem[]>(() => {
    const totals = fees.reduce((acc, fee) => {
      const className = fee.className || "Unassigned";
      acc[className] = (acc[className] ?? 0) + (Number(fee.amount) || 0);
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(totals)
      .map(([label, total]) => ({ label, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  }, [fees]);

  const recentTransactions = useMemo<DashboardTransaction[]>(() => {
    return transactions
      .slice()
      .sort(sortByDateDesc)
      .slice(0, 5)
      .map((tx, index) => {
        const baseAmount = getBaseAmountFromTx(tx);

        return {
          id: resolveId(tx, index),
          fullName: resolveName(tx),
          studentId: resolveStudentId(tx),
          feeType: resolveFeeType(tx),
          class: resolveClassName(tx),
          amountNgn: formatCurrency(baseAmount),
          date: resolveDate(tx),
          created_at: tx.created_at,
          updated_at: tx.updated_at,
          status: resolveStatus(tx.status),
        };
      });
  }, [transactions]);

  const isLoading =
    isOverviewLoading || isLoadingTransactions || isFeesLoading || isVacanciesLoading;

  return {
    stats,
    statusBreakdown,
    paymentsTrend,
    feeTotalsByClass,
    recentTransactions,
    isLoading,
  };
};
