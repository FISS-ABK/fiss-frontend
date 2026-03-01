"use client";
import { axiosConfig } from "@/utils/axoisConfig";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { PaymentData } from "@/types/payment";

export interface PaymentPayload {
  amount: number;
  studentId: string;
  fullName: string;
  email: string;
  phone: string;
  feeType: string;
  term: string;
  className: string;
  academic_session: string;
}

export interface PaymentResponse {
  linkCode: string;
  // Add other fields if needed
}

const createPaymentApi = async (payload: PaymentPayload): Promise<PaymentResponse> => {
  const response = await axiosConfig.post("/api/create-checkout", payload);
  return response.data;
};

const verifyPaymentApi = async (paymentId: string): Promise<{ success: boolean }> => {
  const response = await axiosConfig.get(`/api/payment-status/${paymentId}`);
  return response.data;
}

export const usePayment = () => {
  const createPaymentMutation = useMutation({
    mutationFn: createPaymentApi,
    onSuccess: () => {
      toast.success("Payment initiated successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to initiate payment");
    }
  });

  const verifyPaymentMutation = useMutation({
    mutationFn: verifyPaymentApi,
    onSuccess: () => {
      toast.success("Payment Status Gotten!");
    }, 
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to verify payment");
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