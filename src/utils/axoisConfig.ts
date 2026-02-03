import axios from "axios";
import { logger } from "@/lib/logger";

export const axiosConfig = axios.create({
  baseURL: "https://fiss-backend-4sjq.onrender.com",
  withCredentials: true,
});

// Add a request interceptor to dynamically add the jwt_token from sessionStorage
axiosConfig.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("jwt_token");
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
      logger.log("Token expired or invalid. Please sign in again.");
    }
    
    return Promise.reject(error);
  }
);