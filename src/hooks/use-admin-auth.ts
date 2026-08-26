"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { axiosConfig } from "@/utils";
import { removeSession, setSession } from "@/lib/auth";

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
const BACKEND_URL = "https://api.mhetlabs.com";

const decodeJwtUser = (token: string): User | null => {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = JSON.parse(atob(parts[1]));
    return {
      id: payload.id || payload._id || payload.sub || "admin",
      email: payload.email || "admin@foursquareschoolsabk.org",
      name: payload.name || payload.fullName || payload.username || "Admin User",
      picture: payload.picture || payload.avatar,
    };
  } catch {
    return null;
  }
};

const extractTokenFromMessage = (data: unknown): string | null => {
  if (!data) return null;
  let parsed: Record<string, unknown> = {};

  if (typeof data === "string") {
    try {
      parsed = JSON.parse(data);
    } catch {
      return null;
    }
  } else if (typeof data === "object") {
    parsed = data as Record<string, unknown>;
  }

  const token =
    parsed.token ??
    parsed.jwt_token ??
    parsed.admin_token ??
    parsed.accessToken ??
    parsed.access_token ??
    parsed.jwt ??
    (parsed.data as Record<string, unknown> | undefined)?.token ??
    (parsed.data as Record<string, unknown> | undefined)?.jwt_token;

  return typeof token === "string" && token.trim() !== "" ? token : null;
};

export const useAdminAuth = (): UseSignInReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const userRef = useRef<User | null>(null);
  userRef.current = user;

  const isAuthenticated = !!user;

  // Initialize authentication on mount
  useEffect(() => {
    validateSession();
  }, []);

  const validateSession = async () => {
    const token = sessionStorage.getItem(STORAGE_KEY) || sessionStorage.getItem("admin-token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    // Set token in headers and restore user from JWT so user remains authenticated
    axiosConfig.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const decodedUser = decodeJwtUser(token);
    if (decodedUser) {
      setUser(decodedUser);
    } else {
      setUser({ id: "admin", email: "admin@foursquareschoolsabk.org", name: "Admin" });
    }

    try {
      const response = await axiosConfig.get("/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const fetchedUser = response.data.user || response.data.data?.user || response.data;
      if (fetchedUser && typeof fetchedUser === "object" && fetchedUser.name) {
        setUser((prev) => ({ ...prev, ...fetchedUser }));
      }
      setSession(token);
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 401 || status === 403) {
        console.error(`Session check returned ${status}:`, err);
        clearSession();
        setUser(null);
        setError(
          status === 403
            ? "Access Denied (403): Your account does not have admin permissions."
            : "Session expired. Please sign in again."
        );
      } else {
        console.warn("Session check endpoint warning:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = async (token: string, popup?: Window | null) => {
    try {
      // 1. ALWAYS store token first
      sessionStorage.setItem(STORAGE_KEY, token);
      sessionStorage.setItem("admin-token", token);
      setSession(token);
      axiosConfig.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // 2. Decode user locally
      const decodedUser = decodeJwtUser(token);
      setUser(decodedUser || { id: "admin", email: "admin@foursquareschoolsabk.org", name: "Admin" });

      // 3. Try dashboard fetch
      try {
        const response = await axiosConfig.get("/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchedUser = response.data.user || response.data.data?.user || response.data;
        if (fetchedUser && typeof fetchedUser === "object" && fetchedUser.name) {
          setUser((prev) => ({ ...prev, ...fetchedUser }));
        }
      } catch (e: unknown) {
        const status = (e as { response?: { status?: number } })?.response?.status;
        if (status === 401 || status === 403) {
          clearSession();
          setUser(null);
          setError(
            status === 403
              ? "Access Denied (403): Account does not have admin permissions."
              : "Authentication failed."
          );
          if (popup && !popup.closed) {
            try { popup.close(); } catch {}
          }
          setIsLoading(false);
          return;
        }
        console.warn("Dashboard fetch non-blocking warning:", e);
      }

      setError(null);
      if (popup && !popup.closed) {
        try { popup.close(); } catch {}
      }
      router.push("/admin/overview");
    } catch (err) {
      console.error("Auth success handler error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const setupAuthListener = (popup: Window) => {
    const handleMessage = async (event: MessageEvent) => {
      // Ignore React DevTools & internal messages
      if (typeof event.data === "string" && (event.data.includes("react-devtools") || event.data.includes("webpack"))) {
        return;
      }

      const token = extractTokenFromMessage(event.data);
      if (token) {
        await handleAuthSuccess(token, popup);
        return;
      }

      const authError = event.data?.error || event.data?.authError;
      if (authError) {
        setError(typeof authError === "string" ? authError : authError.message || "Authentication failed");
        setIsLoading(false);
        try { if (!popup.closed) popup.close(); } catch {}
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  };

  const signIn = useCallback(() => {
    setError(null);
    setIsLoading(true);

    const popup = window.open(
      `${BACKEND_URL}/auth/google?state=fiss`,
      "authPopup",
      AUTH_POPUP_CONFIG
    );

    if (!popup) {
      setError("Popup blocked. Please allow popups for this site.");
      setIsLoading(false);
      return;
    }

    const cleanup = setupAuthListener(popup);

    // Monitor popup closure without relying on stale user closure
    const checkInterval = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkInterval);
        cleanup();

        // Check if token was received
        const tokenExists = sessionStorage.getItem(STORAGE_KEY) || sessionStorage.getItem("admin-token");
        if (!tokenExists && !userRef.current) {
          setIsLoading(false);
          setError("Sign in cancelled");
        } else {
          setIsLoading(false);
        }
      }
    }, 1000);

    setTimeout(() => {
      cleanup();
      clearInterval(checkInterval);
      if (!popup.closed) {
        try { popup.close(); } catch {}
        setIsLoading(false);
      }
    }, AUTH_TIMEOUT);
  }, []);

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

  const clearSession = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem("admin-token");
    removeSession();
    delete axiosConfig.defaults.headers.common["Authorization"];
  };

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