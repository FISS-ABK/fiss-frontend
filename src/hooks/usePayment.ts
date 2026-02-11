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
}

export interface PaymentResponse {
  linkCode: string;
  // Add other fields if needed
}

const createPaymentApi = async (payload: PaymentPayload): Promise<PaymentResponse> => {
  const response = await axiosConfig.post("/api/checkout", payload);
  return response.data.data;
};

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

  return {
    // Mutations
    createPayment: createPaymentMutation.mutate,
    createPaymentAsync: createPaymentMutation.mutateAsync,
    
    // Mutation states
    isCreating: createPaymentMutation.isPending,
    createError: createPaymentMutation.error,
  };
};