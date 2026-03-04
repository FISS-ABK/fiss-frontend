"use client";

import { axiosConfig } from "@/utils/axoisConfig";
import { useQuery } from "@tanstack/react-query";

export interface PaymentOverviewStatusCounts {
  pending: number;
  confirmed: number;
  failed: number;
}

export interface PaymentOverviewResponse {
  success: boolean;
  totalCount: number;
  totalAmount: number;
  statusCounts: PaymentOverviewStatusCounts;
}

const fetchPaymentOverview = async (): Promise<PaymentOverviewResponse> => {
  const response = await axiosConfig.get("/payment-overview");
  return response.data;
};

export const useAdminInfo = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery<PaymentOverviewResponse>({
    queryKey: ["payment-overview"],
    queryFn: fetchPaymentOverview,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    totalCount: data?.totalCount ?? 0,
    totalAmount: data?.totalAmount ?? 0,
    statusCounts: data?.statusCounts ?? { pending: 0, confirmed: 0, failed: 0 },
    isLoading,
    error,
    refetch,
  };
};
