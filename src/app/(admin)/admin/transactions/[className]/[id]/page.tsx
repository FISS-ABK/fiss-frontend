"use client";

import AdminDashboardLayout from "@/app/(admin)/_components/AdminDashboardLayout";
import PageHeader from "@/app/(admin)/_components/PageHeader";
import { useClassTransactions } from "@/hooks/useTransaction";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function TransactionDetailsPage() {
  const params = useParams<{ className: string; id: string }>();
  const router = useRouter();
  const decodedClassName = decodeURIComponent(params.className);
  const { transactions, isLoadingTransactions } = useClassTransactions(decodedClassName);

  const transaction = (transactions ?? []).find((t) => `${t.id}` === params.id);

  const studentName =
    (transaction?.studentName as string) ||
    (transaction?.student_name as string) ||
    "Unknown Student";
  const studentId =
    (transaction?.studentId as string) ||
    (transaction?.student_id as string) ||
    "\u2014";
  const feeType =
    (transaction?.feeType as string) ||
    (transaction?.fee_type as string) ||
    "\u2014";
  const classDisplay =
    (transaction?.className as string) || (transaction?.class as string) || decodedClassName;
  const amount =
    typeof transaction?.amount === "number"
      ? `\u20A6${transaction.amount.toLocaleString()}`
      : (transaction?.amount as string) || "\u2014";
  const status = (transaction?.status as string) || "Pending";

  const dateSource = (transaction as any)?.date || (transaction as any)?.createdAt;
  const formattedDate = dateSource
    ? new Date(dateSource).toLocaleString()
    : "\u2014";

  const statusColor: Record<string, string> = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
  };
  const badgeClass = statusColor[status] ?? "bg-gray-100 text-gray-700";

  return (
    <AdminDashboardLayout>
      <PageHeader
        title="Transaction Details"
        subtitle={
          transaction
            ? `Details for transaction ${transaction.id}`
            : "View full payment information"
        }
      />

      <div className="mb-6">
        <button
          onClick={() => router.push(`/admin/transactions/${encodeURIComponent(decodedClassName)}`)}
          className="flex items-center gap-1.5 text-sm text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {decodedClassName} transactions
        </button>
      </div>

      {isLoadingTransactions && (
        <div className="flex items-center justify-center rounded-lg bg-white py-16 shadow-sm">
          <div className="text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            <p className="text-sm text-gray-500">Loading transaction details...</p>
          </div>
        </div>
      )}

      {!isLoadingTransactions && !transaction && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">
            Transaction not found. It may have been removed or is not available.
          </p>
        </div>
      )}

      {!isLoadingTransactions && transaction && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">
              Student Information
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Student Name</dt>
                <dd className="font-medium text-gray-900">{studentName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Student ID</dt>
                <dd className="font-medium text-gray-900">{studentId}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Class</dt>
                <dd className="font-medium text-gray-900">{classDisplay}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">
              Payment Information
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Transaction ID</dt>
                <dd className="font-medium text-gray-900">{transaction.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Fee Type</dt>
                <dd className="font-medium text-gray-900">{feeType}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Amount</dt>
                <dd className="text-lg font-bold text-gray-900">{amount}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Status</dt>
                <dd>
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${badgeClass}`}>
                    {status}
                  </span>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Date</dt>
                <dd className="font-medium text-gray-900">{formattedDate}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </AdminDashboardLayout>
  );
}
