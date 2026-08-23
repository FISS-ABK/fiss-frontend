"use client";

import { axiosConfig } from "@/utils/axoisConfig";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export interface ZendfiMetadata {
  TransactionID?: string;
  academicSession?: string;
  amount_ngn?: number;
  className?: string;
  description?: string;
  email?: string;
  fullName?: string;
  onramp_escrow_deposit?: boolean;
  payer_service_charge?: boolean;
  phone?: string;
  source?: string;
  studentId?: string;
}

export interface TransactionMetadata {
  studentId?: string;
  TransactionID?: string;
  fullName?: string;
  email?: string;
  className?: string;
  academicSession?: string;
  zendfi?: ZendfiMetadata;
  description?: string;
  // Fields present in the student-receipts response metadata block
  receiptNo?: string;
  feeType?: string;
  purpose?: string;
  phone?: string;
}

export interface ApiTransaction {
  // MongoDB / server fields
  _id?: string;
  id?: string | number;           // alias used client-side
  paymentId?: string | null;
  linkCode?: string;
  status?: string;

  // Amounts
  amount?: number;
  amountNgn?: number;
  token?: string;

  // Metadata block (nested student / session info)
  metadata?: TransactionMetadata;

  // Top-level copies (from server)
  studentId?: string;
  TransactionID?: string;
  fullName?: string;

  // Timestamps
  created_at?: string;
  updated_at?: string;
  confirmedAt?: string;

  // On-chain / receipt
  transactionSignature?: string;
  receiptUrl?: string;

  // Fields present in the student-receipts response
  reference?: string;
  receiptNo?: string;
  description?: string;
  paidAt?: string;
  receiptStatus?: string;
  paymentMethod?: string;
  channel?: string;

  // Legacy / compatibility fields kept for older API shapes
  student_id?: string;
  studentName?: string;
  student_name?: string;
  feeType?: string;
  fee_type?: string;
  className?: string;
  class?: string;
  currency?: string;
  date?: string;
  createdAt?: string;
  academic_session?: string;
  academicSession?: string;

  __v?: number;
  [key: string]: unknown;
}

export interface PaymentsResponse {
  payments: ApiTransaction[];
  totalAmount: number;
}

export interface ClassPaymentsResponse {
  payments: ApiTransaction[];
  totalAmount: number;
}

export interface StudentPaymentPayload {
  studentId: string;
}

const extractTransactionsArray = (data: unknown): ApiTransaction[] => {
  if (!data) return [];

  if (typeof data !== "object") return [];
  const payload = data as Record<string, unknown>;

  // Direct array
  if (Array.isArray(data)) return data;

  // Common wrapped shapes
  if (Array.isArray(payload.data)) return payload.data as ApiTransaction[];
  if (Array.isArray(payload.payments)) return payload.payments as ApiTransaction[];
  if (Array.isArray(payload.transactions)) return payload.transactions as ApiTransaction[];

  return [];
};

const extractPaymentsResponse = (data: unknown): PaymentsResponse => {
  const payments = extractTransactionsArray(data);
  const payload = typeof data === "object" && data !== null ? (data as Record<string, unknown>) : {};
  const totalAmount =
    payload.totalAmount ??
    payload.total_amount ??
    payload.grandTotal ??
    payload.grand_total ??
    0;
  return { payments, totalAmount: Number(totalAmount) || 0 };
};

// ADMIN: POST /payments — optional academic_session filter
const fetchAllPayments = async (
  academicSession?: string
): Promise<PaymentsResponse> => {
  const body: Record<string, string> = {};
  if (academicSession) body.academic_session = academicSession;
  const response = await axiosConfig.post("/payments", body);
  return extractPaymentsResponse(response.data);
};

// ADMIN: POST /payment-data — className required, academic_session optional
const fetchClassPayments = async (
  className: string,
  academicSession?: string
): Promise<PaymentsResponse> => {
  const body: Record<string, string> = { className };
  if (academicSession) body.academic_session = academicSession;
  const response = await axiosConfig.post("/payment-data", body);
  return extractPaymentsResponse(response.data);
};

// PUBLIC: unauthenticated POST /student-payment for receipts lookup
const fetchStudentTransactions = async (
  payload: StudentPaymentPayload
): Promise<ApiTransaction[]> => {
  const response = await axiosConfig.post("/student-payment", payload, {
    withCredentials: false,
  });
  return extractTransactionsArray(response.data);
};

// ────────────────────────────────────────────────
// ADMIN: all payments (optionally filtered by session)
// ────────────────────────────────────────────────
export const useAdminTransactions = (academicSession?: string) => {
  const {
    data,
    isLoading: isLoadingTransactions,
    error: transactionsError,
    refetch: getTransactions,
  } = useQuery<PaymentsResponse>({
    queryKey: ["payments", academicSession ?? "all"],
    queryFn: () => fetchAllPayments(academicSession),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const transactions = Array.isArray(data?.payments) ? data.payments : [];
  const totalAmount = data?.totalAmount ?? 0;

  return {
    transactions,
    totalAmount,
    isLoadingTransactions,
    transactionsError,
    getTransactions,
  };
};

// ────────────────────────────────────────────────
// ADMIN: payments for a specific class
// ────────────────────────────────────────────────
export const useClassTransactions = (
  className: string,
  academicSession?: string
) => {
  const {
    data,
    isLoading: isLoadingTransactions,
    error: transactionsError,
    refetch: getTransactions,
  } = useQuery<PaymentsResponse>({
    queryKey: ["class-payments", className, academicSession ?? "all"],
    queryFn: () => fetchClassPayments(className, academicSession),
    enabled: !!className,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const transactions = Array.isArray(data?.payments) ? data.payments : [];
  const totalAmount = data?.totalAmount ?? 0;

  return {
    transactions,
    totalAmount,
    isLoadingTransactions,
    transactionsError,
    getTransactions,
  };
};

// ────────────────────────────────────────────────
// PUBLIC: unauthenticated receipts lookup for students
// ────────────────────────────────────────────────
export const useStudentReceipts = () => {
  const studentTransactionsMutation = useMutation({
    mutationFn: fetchStudentTransactions,
    onError: (error: unknown) => {
      const message = axios.isAxiosError(error)
        ? (error.response?.data as { message?: string } | undefined)?.message
        : undefined;
      toast.error(message || "Failed to fetch transactions for this student");
    },
  });

  const studentTransactions = Array.isArray(studentTransactionsMutation.data)
    ? studentTransactionsMutation.data
    : [];

  return {
    studentTransactions,
    fetchStudentTransactions: studentTransactionsMutation.mutate,
    fetchStudentTransactionsAsync: studentTransactionsMutation.mutateAsync,
    isFetchingStudentTransactions: studentTransactionsMutation.isPending,
    studentTransactionsError: studentTransactionsMutation.error,
  };
};

