"use client";

import { loginWithCyberWorld, isAuthenticated, getCurrentUser, logout } from "@/lib/auth";
import { useEffect, useState } from "react";

export function LoginButton() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email?: string } | null>(null);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
    setUser(getCurrentUser());
  }, []);

  if (authenticated && user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-slate-600">
          {user.email}
        </span>
        <button
          onClick={logout}
          className="bg-slate-200 text-slate-700 px-4 py-2 rounded-full hover:bg-slate-300 transition-colors font-semibold text-sm"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={loginWithCyberWorld}
      className="bg-gradient-to-r from-slate-700 to-emerald-600 text-white px-6 py-2 rounded-full hover:from-slate-800 hover:to-emerald-700 transition-all shadow-lg shadow-slate-600/30 font-semibold"
    >
      Sign In
    </button>
  );
}

