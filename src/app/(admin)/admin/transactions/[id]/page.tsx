"use client";

import AdminDashboardLayout from "@/app/(admin)/_components/AdminDashboardLayout";
import PageHeader from "@/app/(admin)/_components/PageHeader";
import { useAdminTransactions } from "@/hooks/useTransaction";
import { useParams, useRouter } from "next/navigation";

export default function TransactionDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { transactions, isLoadingTransactions } = useAdminTransactions();

  const transaction = (transactions ?? []).find((t) => `${t.id}` === params.id);

  const studentName =
    (transaction?.studentName as string) ||
    (transaction?.student_name as string) ||
    "Unknown Student";
  const studentId =
    (transaction?.studentId as string) ||
    (transaction?.student_id as string) ||
    "—";
  const feeType =
    (transaction?.feeType as string) ||
    (transaction?.fee_type as string) ||
    "—";
  const className =
    (transaction?.className as string) || (transaction?.class as string) || "—";
  const amount =
    typeof transaction?.amount === "number"
      ? `₦${transaction.amount.toLocaleString()}`
      : (transaction?.amount as string) || "—";
  const status = (transaction?.status as string) || "Pending";

  const dateSource = (transaction as any)?.date || (transaction as any)?.createdAt;
  const formattedDate = dateSource
    ? new Date(dateSource).toLocaleString()
    : "—";

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
          onClick={() => router.back()}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          ← Back to transactions
        </button>
      </div>

      {isLoadingTransactions && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">Loading transaction details...</p>
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
                <dd className="font-medium text-gray-900">{className}</dd>
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
                <dd className="font-medium text-gray-900">{amount}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Status</dt>
                <dd className="font-medium text-gray-900">{status}</dd>
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

