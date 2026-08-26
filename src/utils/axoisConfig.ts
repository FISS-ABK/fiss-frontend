import axios from "axios";
import { logger } from "@/lib/logger";

export const axiosConfig = axios.create({
  baseURL: "https://api.mhetlabs.com/api/fiss",
  withCredentials: true,
});

// Add a request interceptor to dynamically add the jwt_token or admin-token from sessionStorage
axiosConfig.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("jwt_token") || sessionStorage.getItem("admin-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor to handle token expiration
axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("jwt_token");
      sessionStorage.removeItem("admin-token");
      sessionStorage.removeItem("admin-token-expiry");
      logger.log("Token expired or invalid. Please sign in again.");
    }
    
    return Promise.reject(error);
  }
);