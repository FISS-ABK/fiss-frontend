"use client";

import AdminDashboardLayout from "@/app/(admin)/_components/AdminDashboardLayout";
import PageHeader from "@/app/(admin)/_components/PageHeader";
import { useClassTransactions, getBaseAmountFromTx } from "@/hooks/useTransaction";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock, XCircle, ExternalLink, Copy } from "lucide-react";
import { useState } from "react";

// ─── helpers ────────────────────────────────────────────────────────────────

function formatDate(iso?: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="ml-1.5 text-gray-400 hover:text-gray-600 transition-colors"
      title="Copy"
      onClick={(e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? (
        <span className="text-xs text-green-600 font-medium">Copied!</span>
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

function DetailRow({
  label,
  value,
  mono = false,
  copyable = false,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
  copyable?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-gray-100 last:border-0">
      <dt className="shrink-0 text-sm text-gray-500">{label}</dt>
      <dd
        className={`text-sm font-medium text-gray-900 text-right flex items-center gap-1 ${
          mono ? "font-mono text-xs break-all" : ""
        }`}
      >
        {value}
        {copyable && typeof value === "string" && value !== "—" && (
          <CopyButton value={value} />
        )}
      </dd>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  type StatusEntry = { icon: React.ReactNode; cls: string; label: string };
  const map: Record<string, StatusEntry> = {
    successful: {
      icon: <CheckCircle2 className="h-4 w-4" />,
      cls: "bg-green-100 text-green-700",
      label: "Successful",
    },
    pending: {
      icon: <Clock className="h-4 w-4" />,
      cls: "bg-yellow-100 text-yellow-700",
      label: "Pending",
    },
    failed: {
      icon: <XCircle className="h-4 w-4" />,
      cls: "bg-red-100 text-red-700",
      label: "Failed",
    },
    expired: {
      icon: <XCircle className="h-4 w-4" />,
      cls: "bg-gray-100 text-gray-600",
      label: "Expired",
    },
  };
  const s: StatusEntry = map[status?.toLowerCase()] ?? {
    icon: null,
    cls: "bg-gray-100 text-gray-700",
    label: status,
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${s.cls}`}
    >
      {s.icon}
      {s.label}
    </span>
  );
}

// ─── page ────────────────────────────────────────────────────────────────────

export default function TransactionDetailsPage() {
  const params = useParams<{ className: string; id: string }>();
  const router = useRouter();
  const decodedClassName = decodeURIComponent(params.className);
  const { transactions, isLoadingTransactions } = useClassTransactions(decodedClassName);

  // Match _id (MongoDB) or legacy id field
  const transaction = (transactions ?? []).find(
    (t) => t._id === params.id || `${t.id}` === params.id
  );

  const meta = transaction?.metadata;

  // Student info — prefer metadata block, fall back to top-level
  const fullName =
    meta?.fullName || transaction?.studentName || transaction?.student_name || "Unknown Student";
  const studentId =
    meta?.studentId || transaction?.studentId || transaction?.student_id || "—";
  const email = meta?.email || "—";
  const className =
    meta?.className || transaction?.className || transaction?.class || decodedClassName;
  const academicSession = meta?.academicSession || transaction?.academicSession || "—";
  const feeType = ((meta as Record<string, unknown> | undefined)?.feeType as string | undefined) || transaction?.feeType || transaction?.fee_type || "—";

  // Amounts
  const status = (transaction?.status ?? "pending").toLowerCase();
  const amountUsdc =
    transaction?.token ? `${transaction.amount} ${transaction.token}` : "—";
  const rawAmountValue = transaction?.amountNgn != null ? transaction.amountNgn : transaction?.amount;
  const baseAmount = getBaseAmountFromTx(transaction);
  const baseAmountFormatted = `₦${baseAmount.toLocaleString()}`;
  const totalPaidNgn = rawAmountValue != null ? `₦${rawAmountValue.toLocaleString()}` : "—";

  // Gateway & Receipt details
  const paymentMethod = (transaction?.paymentMethod || transaction?.channel || "—") as string;
  const gatewayResponse = (transaction?.gatewayResponse || "—") as string;
  const paidAt = formatDate(transaction?.paidAt as string | null | undefined);
  const receiptStatus = (transaction?.receiptStatus || "—") as string;
  const receiptSent = transaction?.receiptSent ? `Yes${transaction.receiptSentAt ? ` (${formatDate(transaction.receiptSentAt as string | null | undefined)})` : ""}` : "No";

  // IDs
  const mongoId = transaction?._id ?? `${transaction?.id ?? "—"}`;
  const paymentId = transaction?.paymentId ?? "—";
  const linkCode = transaction?.linkCode ?? "—";

  // Timestamps
  const createdAt = formatDate(transaction?.created_at ?? transaction?.createdAt ?? transaction?.date);
  const updatedAt = formatDate(transaction?.updated_at);
  const confirmedAt = formatDate(transaction?.confirmedAt);

  // On-chain
  const sig = transaction?.transactionSignature;
  const receiptUrl = transaction?.receiptUrl;
  
  const isConfirmed = status === "successful" || status === "completed";
  const referenceCode = paymentId !== "—" ? paymentId : linkCode !== "—" ? linkCode : mongoId !== "—" ? mongoId : undefined;
  const finalReceiptUrl = receiptUrl || (isConfirmed && referenceCode ? `https://fissbackend.online/api/payment-status/${referenceCode}` : undefined);

  return (
    <AdminDashboardLayout>
      <PageHeader
        title="Transaction Details"
        subtitle={transaction ? `#${mongoId}` : "View full payment information"}
      />

      <div className="mb-6">
        <button
          onClick={() =>
            router.push(`/admin/transactions/${encodeURIComponent(decodedClassName)}`)
          }
          className="flex items-center gap-1.5 text-sm text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {decodedClassName} transactions
        </button>
      </div>

      {/* Loading */}
      {isLoadingTransactions && (
        <div className="flex items-center justify-center rounded-lg bg-white py-16 shadow-sm">
          <div className="text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            <p className="text-sm text-gray-500">Loading transaction details…</p>
          </div>
        </div>
      )}

      {/* Not found */}
      {!isLoadingTransactions && !transaction && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">
            Transaction not found. It may have been removed or is not available.
          </p>
        </div>
      )}

      {/* Main content */}
      {!isLoadingTransactions && transaction && (
        <div className="space-y-6">

          {/* Status banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-white p-5 shadow-sm">
            <div>
              <p className="mb-1 text-xs uppercase tracking-wide text-gray-500">Status</p>
              <StatusBadge status={status} />
            </div>
            <div className="text-right">
              <p className="mb-0.5 text-xs text-gray-500">Base Fee Amount</p>
              <p className="text-2xl font-bold text-gray-900">{baseAmountFormatted}</p>
              <p className="text-xs text-gray-400">Total Paid: {totalPaidNgn}</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">

            {/* Student Information */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Student Information
              </h2>
              <dl>
                <DetailRow label="Full Name" value={fullName} />
                <DetailRow label="Student ID" value={studentId} copyable />
                <DetailRow label="Email" value={email} />
                <DetailRow label="Class" value={className} />
                <DetailRow label="Academic Session" value={academicSession} />
                {feeType !== "—" && <DetailRow label="Fee Type" value={feeType} />}
              </dl>
            </div>

            {/* Payment Details */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Payment Details
              </h2>
              <dl>
                <DetailRow label="Base Fee Amount" value={baseAmountFormatted} />
                <DetailRow label="Total Paid (incl. charges)" value={totalPaidNgn} />
                {amountUsdc !== "—" && <DetailRow label="Amount (Crypto)" value={amountUsdc} />}
                <DetailRow label="Payment ID" value={paymentId} mono copyable />
                <DetailRow label="Link Code" value={linkCode} mono copyable />
                <DetailRow label="Record ID" value={mongoId} mono copyable />
                <DetailRow label="Payment Method" value={paymentMethod} />
                <DetailRow label="Gateway Response" value={gatewayResponse} />
                <DetailRow label="Paid At" value={paidAt} />
                <DetailRow label="Receipt Status" value={receiptStatus} />
                <DetailRow label="Receipt Sent" value={receiptSent} />
              </dl>
              {isConfirmed && finalReceiptUrl && (
                <div className="mt-4 border-t pt-4">
                  <a
                    href={finalReceiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 w-full justify-center"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Download Receipt PDF
                  </a>
                </div>
              )}
            </div>

            {/* Transaction Timeline */}
            <div className="rounded-lg bg-white p-6 shadow-sm lg:col-span-2">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Transaction Timeline
              </h2>
              <ol className="relative ml-3 space-y-6 border-l border-gray-200">

                {/* Initiated */}
                <li className="ml-5">
                  <span className="absolute -left-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 ring-4 ring-white">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                  </span>
                  <p className="text-sm font-medium text-gray-900">Payment initiated</p>
                  <p className="text-xs text-gray-500">{createdAt}</p>
                  {Boolean(transaction?.TransactionID) && (
                    <p className="mt-0.5 flex items-center gap-1 font-mono text-xs text-gray-400">
                      {transaction?.TransactionID as string}
                      <CopyButton value={transaction?.TransactionID as string} />
                    </p>
                  )}
                </li>

                {/* Updated (only if different from created) */}
                {Boolean(transaction?.updated_at && transaction.updated_at !== transaction.created_at) && (
                  <li className="ml-5">
                    <span className="absolute -left-2 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-100 ring-4 ring-white">
                      <span className="h-2 w-2 rounded-full bg-yellow-500" />
                    </span>
                    <p className="text-sm font-medium text-gray-900">Last updated</p>
                    <p className="text-xs text-gray-500">{updatedAt}</p>
                  </li>
                )}

                {/* Confirmed / Paid */}
                {Boolean(transaction?.confirmedAt || transaction?.paidAt) && (
                  <li className="ml-5">
                    <span className="absolute -left-2 flex h-4 w-4 items-center justify-center rounded-full bg-green-100 ring-4 ring-white">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    <p className="text-sm font-medium text-gray-900">Payment confirmed / completed</p>
                    <p className="text-xs text-gray-500">{confirmedAt !== "—" ? confirmedAt : formatDate(transaction?.paidAt as string | null | undefined)}</p>
                  </li>
                )}

                {/* Still pending */}
                {status !== "successful" && status !== "successfull" && status !== "success" && status !== "confirmed" && status !== "completed" && !transaction?.confirmedAt && !transaction?.paidAt && (
                  <li className="ml-5">
                    <span className="absolute -left-2 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-100 ring-4 ring-white">
                      <span className="h-2 w-2 rounded-full bg-yellow-400" />
                    </span>
                    <p className="text-sm font-medium text-yellow-700">Awaiting confirmation</p>
                    <p className="text-xs text-gray-400">No confirmation recorded yet</p>
                  </li>
                )}
              </ol>
            </div>

            {/* On-chain info */}
            {sig && (
              <div className="rounded-lg bg-white p-6 shadow-sm lg:col-span-2">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  On-Chain Information
                </h2>
                <dl>
                  <DetailRow label="Transaction Signature" value={sig} mono copyable />
                </dl>
                {receiptUrl && (
                  <a
                    href={receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Receipt PDF
                  </a>
                )}
              </div>
            )}

          </div>
        </div>
      )}
    </AdminDashboardLayout>
  );
}
