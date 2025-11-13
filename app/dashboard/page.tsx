"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout, isAuthenticated } from "@/lib/auth";
import Image from "next/image";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string; id?: string; created_at?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push("/");
      return;
    }

    const userData = getCurrentUser();
    setUser(userData);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Image
                src="/images/eternaguard-logo-wide.png"
                alt="EternaGuard"
                width={200}
                height={56}
                className="h-14 w-auto"
                priority
              />
            </div>
            <div className="flex items-center gap-6">
              <a href="/demo" className="text-slate-600 hover:text-emerald-600 transition-colors font-semibold">
                View Demo
              </a>
              <div className="flex items-center gap-4">
                <span className="text-slate-600">{user?.email}</span>
                <button
                  onClick={logout}
                  className="bg-slate-200 text-slate-700 px-4 py-2 rounded-full hover:bg-slate-300 transition-colors font-semibold text-sm"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Welcome to EternaGuard
            </h1>
            <p className="text-xl text-slate-600">
              You&apos;re successfully logged in with your CyberWorld account!
            </p>
          </div>

          {/* User Info Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Account</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  Email
                </label>
                <p className="text-lg text-slate-900">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  User ID
                </label>
                <p className="text-sm text-slate-600 font-mono">{user?.id}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  Account Created
                </label>
                <p className="text-lg text-slate-900">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-6 border border-slate-200">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Property Management</h3>
              <p className="text-slate-600 mb-4">
                Manage your cemetery properties with GPS precision
              </p>
              <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                Coming Soon
              </span>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-6 border border-slate-200">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">AI Analysis</h3>
              <p className="text-slate-600 mb-4">
                Automated maintenance detection and reporting
              </p>
              <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                Coming Soon
              </span>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-6 border border-slate-200">
              <div className="text-4xl mb-4">🚁</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Drone Surveillance</h3>
              <p className="text-slate-600 mb-4">
                Autonomous aerial monitoring and inspection
              </p>
              <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-12 bg-gradient-to-r from-slate-700 to-emerald-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">What&apos;s Next?</h2>
            <p className="text-lg mb-6">
              We&apos;re building EternaGuard&apos;s core features. Stay tuned for updates!
            </p>
            <div className="flex gap-4">
              <a
                href="/demo"
                className="bg-white text-slate-900 px-6 py-3 rounded-full hover:bg-slate-100 transition-colors font-semibold"
              >
                Explore Demo
              </a>
              <button
                onClick={() => router.push("/")}
                className="bg-white/20 text-white px-6 py-3 rounded-full hover:bg-white/30 transition-colors font-semibold"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

