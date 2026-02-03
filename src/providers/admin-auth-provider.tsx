'use client';

import React, { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";

type AdminUser = { id: string; email?: string; name?: string } | null;

interface AuthContextType {
  user: AdminUser;
  setUser: Dispatch<SetStateAction<AdminUser>>;
  isAuthenticated: boolean;
}

const initialAuthContext: AuthContextType = {
  user: null,
  setUser: () => {},
  isAuthenticated: false,
};

export const Auth = createContext<AuthContextType>(initialAuthContext);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser>(null);

  const contextValue: AuthContextType = {
    user,
    setUser,
    isAuthenticated: !!user,
  };

  return <Auth.Provider value={contextValue}>{children}</Auth.Provider>;
};
