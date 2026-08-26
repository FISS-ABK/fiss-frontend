"use client";
import { axiosConfig } from "@/utils/axoisConfig";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export interface PaymentPayload {
  amount: number;
  baseAmount: number;
  studentId: string;
  fullName: string;
  email: string;
  phone: string;
  feeType: string;
  term: string;
  org: string;
  className: string;
  academicSession: string;
  purpose?: string;
  subAccountCode?: string;
  subAccount?: string;
  subaccount?: string;
  platformFee?: number;
}

export interface PaymentResponse {
  linkCode?: string;
  paymentUrl?: string;
  reference?: string;
  authorization_url?: string;
  authorizationUrl?: string;
  status?: string;
  payment_status?: string;
  success?: boolean;
  data?: {
    authorization_url?: string;
    authorizationUrl?: string;
    reference?: string;
    status?: string;
    success?: boolean;
  };
}

export interface PaymentTransactionInfo {
  receiptUrl?: string;
  studentId?: string;
  metadata?: {
    studentId?: string;
  };
  [key: string]: unknown;
}

export interface PaymentStatusResponse {
  success?: boolean;
  status?: string;
  payment_status?: string;
  receiptUrl?: string;
  studentId?: string;
  transaction?: PaymentTransactionInfo;
  pdfBlob?: Blob;
  data?: {
    status?: string;
    success?: boolean;
    receiptUrl?: string;
    transaction?: PaymentTransactionInfo;
    studentId?: string;
    metadata?: {
      studentId?: string;
    };
  };
}

const createPaymentApi = async (payload: PaymentPayload): Promise<PaymentResponse> => {
  const response = await axiosConfig.post("/make-payment", payload);
  return response.data;
};

const verifyPaymentApi = async (paymentId: string): Promise<PaymentStatusResponse> => {
  const response = await axiosConfig.get(`/api/paystack/callback/${paymentId}`, {
    responseType: "blob"
  });
  
  const contentType = response.headers["content-type"];
  if (contentType && contentType.includes("application/pdf")) {
    return {
      success: true,
      status: "confirmed",
      pdfBlob: response.data
    };
  }

  // Otherwise, it might be JSON (error/pending status).
  // Read blob as text to parse JSON
  const text = await response.data.text();
  try {
    const data = JSON.parse(text);
    return data;
  } catch {
    return { success: false, status: "pending" };
  }
};

export const downloadReceiptPdf = async (referenceCode: string) => {
  try {
    const response = await axiosConfig.get(`/paystack/callback/${referenceCode}`, {
      responseType: "blob"
    });
    const contentType = response.headers["content-type"];
    if (contentType && contentType.includes("application/json")) {
      const text = await response.data.text();
      try {
        const json = JSON.parse(text);
        toast.error(json.message || "Failed to download receipt PDF");
        return;
      } catch {
        // proceed
      }
    }
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt_${referenceCode}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Failed to download receipt:", err);
    toast.error("Failed to download receipt PDF");
  }
};

export const usePayment = () => {
  const getErrorMessage = (error: unknown, fallback: string) => {
    if (typeof error === "string") return error;
    if (error && typeof error === "object") {
      const message = (error as { message?: string }).message;
      const responseMessage = (error as { response?: { data?: { message?: string } } })
        .response?.data?.message;
      return responseMessage || message || fallback;
    }
    return fallback;
  };

  const createPaymentMutation = useMutation({
    mutationFn: createPaymentApi,
    onSuccess: () => {
      toast.success("Payment initiated successfully!");
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to initiate payment"));
    }
  });

  const verifyPaymentMutation = useMutation({
    mutationFn: verifyPaymentApi,
    onSuccess: () => {
      toast.success("Payment Status Gotten!");
    }, 
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to verify payment"));
    }
});

  return {
    // Mutations
    createPayment: createPaymentMutation.mutate,
    createPaymentAsync: createPaymentMutation.mutateAsync,
    verifyPayment: verifyPaymentMutation.mutate,
    verifyPaymentAsync: verifyPaymentMutation.mutateAsync,
    // Mutation states
    isCreating: createPaymentMutation.isPending,
    isVerifying: verifyPaymentMutation.isPending,
    createError: createPaymentMutation.error,
    verifyError: verifyPaymentMutation.error,
  };
};