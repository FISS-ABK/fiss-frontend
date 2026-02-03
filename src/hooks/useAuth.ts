"use client";
import { useEffect, useState } from "react";
import { getSession } from "@/lib/auth";

export default function useAuth() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setUser(getSession());
  }, []);

  return { user };
}
