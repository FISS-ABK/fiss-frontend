"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { axiosConfig } from "@/utils";
import { removeSession, setSession } from "@/lib/auth";
import { logger } from "@/lib/logger";

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface UseSignInReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  signIn: () => void;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const STORAGE_KEY = "jwt_token";
const AUTH_POPUP_CONFIG = "width=500,height=600,scrollbars=yes,resizable=yes";
const AUTH_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const useAdminAuth = (): UseSignInReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  // Initialize authentication on mount
  useEffect(() => {
    validateSession();
  }, []);

  const validateSession = async () => {
    const token = sessionStorage.getItem(STORAGE_KEY);

    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosConfig.get("/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data.user);
      axiosConfig.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (err) {
      console.error("Session validation failed:", err);
      clearSession();
      setError("Session expired. Please sign in again.");
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = useCallback(() => {
    setError(null);
    setIsLoading(true);

    const popup = window.open(
      `${BACKEND_URL}/auth/google`,
      "authPopup",
      AUTH_POPUP_CONFIG
    );

    if (!popup) {
      setError("Popup blocked. Please allow popups for this site.");
      setIsLoading(false);
      return;
    }

    const cleanup = setupAuthListener(popup);

    // Monitor popup closure
    const checkInterval = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkInterval);
        cleanup();
        if (!user) {
          setIsLoading(false);
          setError("Sign in cancelled");
        }
      }
    }, 1000);

    // Timeout after 5 minutes
    setTimeout(() => {
      cleanup();
      clearInterval(checkInterval);
      if (!popup.closed) {
        popup.close();
        setIsLoading(false);
        setError("Sign in timed out");
      }
    }, AUTH_TIMEOUT);
  }, [user]);

  /**
   * Sets up message listener for OAuth callback
   */
  const setupAuthListener = (popup: Window) => {
    const handleMessage = async (event: MessageEvent) => {
      // Validate origin
      if (!event.origin.includes("fiss-backend") && !event.origin.includes("fiss-abk")) {
        return;
      }

      const { token, error: authError } = event.data;

      if (authError) {
        setError(authError.message || "Authentication failed");
        setIsLoading(false);
        popup.close();
        return;
      }

      if (token) {
        await handleAuthSuccess(token, popup);
      }
    };

    window.addEventListener("message", handleMessage);

    // Return cleanup function
    return () => window.removeEventListener("message", handleMessage);
  };

  /**
   * Handles successful authentication
   */
  const handleAuthSuccess = async (token: string, popup: Window) => {
    try {
      // Store token
      sessionStorage.setItem(STORAGE_KEY, token);
      axiosConfig.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Fetch user data
      const response = await axiosConfig.get("/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data.user);
      setSession(token);
      setError(null);
      popup.close();

      // Redirect to dashboard
      router.push("/admin/overview");
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      clearSession();
      setError("Sign in failed. Please try again.");
      popup.close();
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Signs out the current user
   */
  const signOut = useCallback(async () => {
    setIsLoading(true);

    try {
      await axiosConfig.post("/logout");
    } catch (err) {
      console.warn("Logout request failed:", err);
    }

    clearSession();
    removeSession();
    setUser(null);
    setError(null);
    setIsLoading(false);

    router.push("/");
  }, [router]);

  /**
   * Clears session data
   */
  const clearSession = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    delete axiosConfig.defaults.headers.common["Authorization"];
  };

  /**
   * Clears error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated,
    error,
    signIn,
    signOut,
    clearError,
  };
};