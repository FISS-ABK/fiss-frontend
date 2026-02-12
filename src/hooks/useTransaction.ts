"use client";

import { axiosConfig } from "@/utils/axoisConfig";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export interface ApiTransaction {
  id: string | number;
  studentId?: string;
  student_id?: string;
  studentName?: string;
  student_name?: string;
  feeType?: string;
  fee_type?: string;
  className?: string;
  class?: string;
  amount?: number | string;
  currency?: string;
  status?: string;
  date?: string;
  createdAt?: string;
  [key: string]: any;
}

export interface StudentPaymentPayload {
  studentId: string;
}

const extractTransactionsArray = (data: any): ApiTransaction[] => {
  if (!data) return [];

  // Direct array
  if (Array.isArray(data)) return data;

  // Common wrapped shapes
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.payments)) return data.payments;
  if (Array.isArray(data.transactions)) return data.transactions;

  return [];
};

// ADMIN: authenticated GET /payment
const fetchAllTransactions = async (): Promise<ApiTransaction[]> => {
  const response = await axiosConfig.get("/payments");
  return extractTransactionsArray(response.data);
};

// PUBLIC: unauthenticated POST /payment for receipts lookup
const fetchStudentTransactions = async (
  payload: StudentPaymentPayload
): Promise<ApiTransaction[]> => {
  const response = await axiosConfig.post("/payments", payload,
    {
      withCredentials: false,
    }
  );
  return extractTransactionsArray(response.data);
};

// ADMIN hook – authenticated list of all transactions
export const useAdminTransactions = () => {
  const {
    data: transactions = [],
    isLoading: isLoadingTransactions,
    error: transactionsError,
    refetch: getTransactions,
  } = useQuery<ApiTransaction[]>({
    queryKey: ["transactions"],
    queryFn: fetchAllTransactions,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  return {
    // All transactions (admin dashboard)
    transactions: safeTransactions,
    isLoadingTransactions,
    transactionsError,
    getTransactions,
  };
};

// PUBLIC hook – unauthenticated receipts lookup for students
export const useStudentReceipts = () => {
  const studentTransactionsMutation = useMutation({
    mutationFn: fetchStudentTransactions,
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch transactions for this student"
      );
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

