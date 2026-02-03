"use client";
import { axiosConfig } from "@/utils/axoisConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface VacancyPayload {
  title: string;
  icon?: string;
  job_description: string;
  department?: string;
  location?: string;
  employment_type?: 'Full-time' | 'Part-time' | 'Contract';
  requirements?: string[];
  isActive?: boolean;
}

export interface VacancyResponse {
  id: string | number;
  title: string;
  icon?: string;
  job_description: string;
  jobDescription?: string; // Support both snake_case and camelCase
  department?: string;
  location?: string;
  employment_type?: 'Full-time' | 'Part-time' | 'Contract';
  employmentType?: 'Full-time' | 'Part-time' | 'Contract'; // Support both snake_case and camelCase
  requirements?: string[] | Array<{text: string}>; // Support both formats
  isActive?: boolean;
  createdAt?: string;
  postedDate?: string;
}

const fetchVacancies = async (): Promise<VacancyResponse[]> => {
  const response = await axiosConfig.get("/vacancies");
  // Ensure we always return an array
  const data = response.data;
  if (Array.isArray(data)) {
    return data;
  }
  // If the response has a data property that's an array
  if (data && Array.isArray(data.data)) {
    return data.data;
  }
  // If the response has a vacancies property that's an array
  if (data && Array.isArray(data.vacancies)) {
    return data.vacancies;
  }
  // Default to empty array
  return [];
};

const createVacancyApi = async (payload: VacancyPayload) => {
  const response = await axiosConfig.post("/create-vacancy", payload);
  return response.data.data;
};

const updateVacancyApi = async ({ id, payload }: { id: string | number; payload: VacancyPayload }) => {
  const response = await axiosConfig.put(`/update-vacancy/${id}`, payload);
  return response.data.data;
};

const deleteVacancyApi = async (id: string | number) => {
  const response = await axiosConfig.delete(`/delete-vacancy/${id}`);
  return response.data.data;
};

export const useVacancies = () => {
  const queryClient = useQueryClient();

  const {
    data: vacancies = [],
    isLoading,
    error,
    refetch: getVacancies
  } = useQuery<VacancyResponse[]>({
    queryKey: ["vacancies"],
    queryFn: fetchVacancies,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Ensure vacancies is always an array
  const safeVacancies = Array.isArray(vacancies) ? vacancies : [];

  const createVacancyMutation = useMutation({
    mutationFn: createVacancyApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      toast.success("Vacancy created successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create vacancy");
    }
  });

  const updateVacancyMutation = useMutation({
    mutationFn: updateVacancyApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      toast.success("Vacancy updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update vacancy");
    }
  });

  const deleteVacancyMutation = useMutation({
    mutationFn: deleteVacancyApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      toast.success("Vacancy deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete vacancy");
    }
  });

  return {
    // Data and loading states
    vacancies: safeVacancies,
    isLoading,
    error,
    
    // Query functions
    getVacancies,
    
    // Mutations
    createVacancy: createVacancyMutation.mutate,
    updateVacancy: updateVacancyMutation.mutate,
    deleteVacancy: deleteVacancyMutation.mutate,
    
    // Mutation states
    isCreating: createVacancyMutation.isPending,
    isUpdating: updateVacancyMutation.isPending,
    isDeleting: deleteVacancyMutation.isPending,
    createError: createVacancyMutation.error,
    updateError: updateVacancyMutation.error,
    deleteError: deleteVacancyMutation.error,
  };
};
