"use client";
import { axiosConfig } from "@/utils/axoisConfig";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export interface PaymentPayload {
  amount: number;
  studentId: string;
  fullName: string;
  email: string;
  phone: string;
  feeType: string;
  term: string;
  className: string;
  academicSession: string;
  purpose?: string;
}

export interface PaymentResponse {
  linkCode?: string;
  paymentUrl?: string;
  reference?: string;
  authorization_url?: string;
  status?: string;
  payment_status?: string;
  success?: boolean;
  data?: {
    authorization_url?: string;
    reference?: string;
    status?: string;
    success?: boolean;
  };
}

export interface PaymentStatusResponse {
  success?: boolean;
  status?: string;
  payment_status?: string;
  data?: {
    status?: string;
    success?: boolean;
  };
}

const createPaymentApi = async (payload: PaymentPayload): Promise<PaymentResponse> => {
  const response = await axiosConfig.post("/make-payment", payload);
  return response.data;
};

const verifyPaymentApi = async (paymentId: string): Promise<PaymentStatusResponse> => {
  const response = await axiosConfig.get(`/api/payment-status/${paymentId}`);
  return response.data;
}

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