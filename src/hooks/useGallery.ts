import { axiosConfig } from "@/utils/axoisConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface GalleryItem {
  _id: string;
  imageurl: string;
  public_id: string;
  description: string;
  __v?: number;
}

export interface AddGalleryPayload {
  imageurl: string;
  public_id: string;
  description: string;
}

const fetchGalleryApi = async (): Promise<GalleryItem[]> => {
  const response = await axiosConfig.get("/gallery");
  return response.data.gallery || [];
};

const addGalleryApi = async (payload: AddGalleryPayload): Promise<unknown> => {
  const response = await axiosConfig.post("/add-gallery", payload);
  return response.data;
};

const deleteGalleryApi = async (id: string): Promise<unknown> => {
  const response = await axiosConfig.delete(`/gallery/${id}`);
  return response.data;
};

export const useGallery = () => {
  const queryClient = useQueryClient();

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

  const {
    data: galleryImages = [],
    isLoading,
    error,
    refetch: getGallery,
  } = useQuery<GalleryItem[]>({
    queryKey: ["gallery"],
    queryFn: fetchGalleryApi,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const addGalleryMutation = useMutation({
    mutationFn: addGalleryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Image added to gallery successfully!");
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to add image to gallery"));
    },
  });

  const deleteGalleryMutation = useMutation({
    mutationFn: deleteGalleryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Image removed from gallery successfully!");
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to remove image from gallery"));
    },
  });

  return {
    galleryImages,
    isLoading,
    error,
    getGallery,
    addGallery: addGalleryMutation.mutate,
    addGalleryAsync: addGalleryMutation.mutateAsync,
    isAdding: addGalleryMutation.isPending,
    addError: addGalleryMutation.error,
    deleteGallery: deleteGalleryMutation.mutate,
    deleteGalleryAsync: deleteGalleryMutation.mutateAsync,
    isDeleting: deleteGalleryMutation.isPending,
    deleteError: deleteGalleryMutation.error,
  };
};
