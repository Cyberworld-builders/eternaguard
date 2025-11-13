"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Processing authentication...");

  useEffect(() => {
    const handleCallback = async () => {
      // Get the authorization code from URL
      const code = searchParams.get("code");
      const state = searchParams.get("state");

      if (!code) {
        setError("No authorization code received");
        return;
      }

      try {
        setStatus("Verifying authentication...");

        // Exchange the code for user session
        // For now, we'll store the token and verify it
        // In a full implementation, you'd exchange this for a proper session
        
        // Store the access token
        localStorage.setItem("cyberworld_access_token", code);
        
        // Verify the token with gateway
        const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_API_URL || "http://localhost:3000";
        const response = await fetch(`${gatewayUrl}/api/auth/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${code}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to verify authentication");
        }

        const userData = await response.json();
        
        // Store user data
        localStorage.setItem("cyberworld_user", JSON.stringify(userData));
        
        setStatus("Authentication successful! Redirecting...");
        
        // Redirect to dashboard or home
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);

      } catch (err) {
        console.error("Auth callback error:", err);
        setError(err instanceof Error ? err.message : "Authentication failed");
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center">
        {error ? (
          <>
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Authentication Failed
            </h1>
            <p className="text-slate-600 mb-6">{error}</p>
            <button
              onClick={() => router.push("/")}
              className="bg-gradient-to-r from-slate-700 to-emerald-600 text-white px-6 py-3 rounded-full hover:from-slate-800 hover:to-emerald-700 transition-all shadow-lg font-semibold"
            >
              Return Home
            </button>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4 animate-pulse">🔐</div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              {status}
            </h1>
            <div className="flex justify-center mt-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

