import { axiosConfig } from "@/utils/axoisConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface BlogItem {
  _id: string;
  imageUrl: string;
  public_id: string;
  title: string;
  authorName: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface CreateBlogPayload {
  imageUrl: string;
  public_id: string;
  title: string;
  authorName: string;
  text: string;
}

const fetchBlogsApi = async (): Promise<BlogItem[]> => {
  const response = await axiosConfig.get("/blogs");
  return Array.isArray(response.data) ? response.data : [];
};

const createBlogApi = async (payload: CreateBlogPayload): Promise<unknown> => {
  const response = await axiosConfig.post("/create-blog", payload);
  return response.data;
};

const deleteBlogApi = async (id: string): Promise<unknown> => {
  const response = await axiosConfig.delete(`/blog/${id}`);
  return response.data;
};

export const useBlog = () => {
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
    data: blogs = [],
    isLoading,
    error,
    refetch: getBlogs,
  } = useQuery<BlogItem[]>({
    queryKey: ["blogs"],
    queryFn: fetchBlogsApi,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const createBlogMutation = useMutation({
    mutationFn: createBlogApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Newsletter post published successfully!");
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to publish newsletter post"));
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlogApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Newsletter post deleted successfully!");
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to delete newsletter post"));
    },
  });

  return {
    blogs,
    isLoading,
    error,
    getBlogs,
    createBlog: createBlogMutation.mutate,
    createBlogAsync: createBlogMutation.mutateAsync,
    isCreating: createBlogMutation.isPending,
    createError: createBlogMutation.error,
    deleteBlog: deleteBlogMutation.mutate,
    deleteBlogAsync: deleteBlogMutation.mutateAsync,
    isDeleting: deleteBlogMutation.isPending,
    deleteError: deleteBlogMutation.error,
  };
};
