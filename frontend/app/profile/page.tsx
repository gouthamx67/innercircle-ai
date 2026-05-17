"use client";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-radial from-slate-900 to-slate-950 px-4">
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-20 h-20 bg-indigo-600 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-600/30">
            U
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            User Profile
          </h1>
          <p className="text-slate-450 text-sm">
            Manage your InnerCircle account settings
          </p>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider block">
              Authentication Status
            </span>
            <span className="text-sm font-semibold text-emerald-400">
              {token ? "Logged In" : "Not Logged In"}
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href="/chat"
            className="flex-1 text-center bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold py-3 rounded-xl transition-all text-sm"
          >
            Back to Chat
          </Link>
          <button
            onClick={handleLogout}
            className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold py-3 rounded-xl hover:opacity-95 active:scale-[0.98] transition-all text-sm shadow-lg shadow-rose-500/20"
          >
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}
