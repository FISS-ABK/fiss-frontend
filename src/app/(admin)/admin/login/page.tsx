"use client";
import { useAdminAuth } from "@/hooks/use-admin-auth";

export default function AdminLoginPage() {
  const { signIn } = useAdminAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#edf5f5]">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h2 className="mb-6 text-center text-2xl font-semibold text-[#09283b]">Admin Login</h2>
        <p className="mb-6 text-center text-sm text-gray-600">Secret admin access. Authorized personnel only.</p>
        <button
          onClick={signIn}
          className="flex w-full items-center justify-center gap-3 rounded-md border px-4 py-3 text-sm shadow-sm"
        >
          <img src="/logos/google.svg" alt="Google" className="h-5 w-5" />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
}
