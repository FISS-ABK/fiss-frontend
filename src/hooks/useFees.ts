"use client";
import { axiosConfig } from "@/utils/axoisConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface FeePayload {
  feeType: string;
  academicSession: string;
  class: string;
  description: string;
  term: '1st Term' | '2nd Term' | '3rd Term';
  breakdown: Array<{
    description: string;
    amount: number;
  }>;
  totalAmount: number;
}

export interface FeeResponse {
  id: string | number;
  feeType: string;
  academicSession: string;
  class: string;
  description: string;
  term: '1st Term' | '2nd Term' | '3rd Term';
  breakdown: Array<{
    description: string;
    amount: number;
  }>;
  totalAmount: number;
  createdAt?: string;
}

const fetchFees = async (): Promise<FeeResponse[]> => {
  const response = await axiosConfig.get("/fees");
  // Ensure we always return an array
  const data = response.data;
  if (Array.isArray(data)) {
    return data;
  }
  // If the response has a data property that's an array
  if (data && Array.isArray(data.data)) {
    return data.data;
  }
  // If the response has a fees property that's an array
  if (data && Array.isArray(data.fees)) {
    return data.fees;
  }
  // Default to empty array
  return [];
};

const createFeeApi = async (payload: FeePayload) => {
  const response = await axiosConfig.post("/create-fee", payload);
  return response.data.data;
};

const updateFeeApi = async ({ id, payload }: { id: string | number; payload: FeePayload }) => {
  const response = await axiosConfig.put(`/update-fee/${id}`, payload);
  return response.data.data;
};

const deleteFeeApi = async (id: string | number) => {
  const response = await axiosConfig.delete(`/delete-fee/${id}`);
  return response.data.data;
};

export const useFees = () => {
  const queryClient = useQueryClient();

  const {
    data: fees = [],
    isLoading,
    error,
    refetch: getFees
  } = useQuery<FeeResponse[]>({
    queryKey: ["fees"],
    queryFn: fetchFees,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Ensure fees is always an array
  const safeFees = Array.isArray(fees) ? fees : [];

  const createFeeMutation = useMutation({
    mutationFn: createFeeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fees'] });
      toast.success("Fee structure created successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create fee structure");
    }
  });

  const updateFeeMutation = useMutation({
    mutationFn: updateFeeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fees'] });
      toast.success("Fee structure updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update fee structure");
    }
  });

  const deleteFeeMutation = useMutation({
    mutationFn: deleteFeeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fees'] });
      toast.success("Fee structure deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete fee structure");
    }
  });

  return {
    // Data and loading states
    fees: safeFees,
    isLoading,
    error,
    
    // Query functions
    getFees,
    
    // Mutations
    createFee: createFeeMutation.mutate,
    updateFee: updateFeeMutation.mutate,
    deleteFee: deleteFeeMutation.mutate,
    
    // Mutation states
    isCreating: createFeeMutation.isPending,
    isUpdating: updateFeeMutation.isPending,
    isDeleting: deleteFeeMutation.isPending,
    createError: createFeeMutation.error,
    updateError: updateFeeMutation.error,
    deleteError: deleteFeeMutation.error,
  };
};
