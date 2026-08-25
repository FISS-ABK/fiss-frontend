"use client";

import { axiosConfig } from "@/utils/axoisConfig";
import { useQuery } from "@tanstack/react-query";
import { BankAccount } from "@/types/accounts";

const fetchAccounts = async (): Promise<BankAccount[]> => {
  const response = await axiosConfig.get("/accounts");
  const data = response.data;
  if (Array.isArray(data)) {
    return data;
  }
  if (data && Array.isArray(data.data)) {
    return data.data;
  }
  return [];
};

export const useAccounts = () => {
  const {
    data: accounts = [],
    isLoading,
    error,
    refetch: getAccounts
  } = useQuery<BankAccount[]>({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const safeAccounts = Array.isArray(accounts) ? accounts : [];

  return {
    accounts: safeAccounts,
    isLoading,
    error,
    getAccounts,
  };
};
