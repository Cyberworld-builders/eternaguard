"use client";

import { useState } from "react";
import Image from "next/image";
import { validateEmail, submitLead } from "@/lib/email-validation";
import { LoginButton } from "@/components/LoginButton";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate email client-side
    const validation = validateEmail(email);
    if (!validation.valid) {
      setError(validation.error || "Invalid email address");
      setLoading(false);
      return;
    }

    // Submit to API
    const result = await submitLead(email, "eternaguard", {
      source: "landing_page",
      page: "home",
    });

    if (result.success) {
    setSubmitted(true);
      setEmail("");
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      setError(result.error || "Failed to subscribe. Please try again.");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex-1"></div>
            <Image
                src="/images/eternaguard-logo-wide.png" 
                alt="EternaGuard - Secure. Maintain. Innovate." 
              width={300}
              height={84}
              className="h-20 w-auto"
              priority
            />
            <div className="flex-1 flex justify-end items-center gap-4">
              <a
                href="/demo"
                className="text-slate-600 hover:text-emerald-600 transition-colors font-semibold"
              >
                View Demo
              </a>
              <LoginButton />
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-slate-800">Property Management</span>
            <br />
            <span className="text-emerald-600">Reimagined for Death Care</span>
            </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            AI-powered property management tailored for cemeteries, funeral homes, 
            and crematoriums. Navigate, monitor, and maintain with precision.
          </p>

          {/* Key Features - Simple Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-200">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">GPS Navigation</h3>
              <p className="text-slate-600">Precise location tracking for every plot and monument</p>
          </div>

            <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-200">
                <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">AI-Powered</h3>
              <p className="text-slate-600">Automated image analysis and maintenance alerts</p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-200">
              <div className="text-4xl mb-4">🚁</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Drone Monitoring</h3>
              <p className="text-slate-600">Autonomous aerial surveillance and inspection</p>
            </div>
          </div>

          {/* Email Capture Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-slate-100 to-emerald-50 rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Join the Waitlist
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                Be the first to know when EternaGuard launches. Get exclusive early access 
                and special pricing for early adopters.
            </p>
            
            {submitted ? (
                <div className="bg-emerald-100 border-2 border-emerald-600 rounded-2xl p-6">
                  <div className="text-4xl mb-2">✅</div>
                  <p className="text-emerald-800 font-semibold text-lg">
                    Thank you! We&apos;ll be in touch soon.
                  </p>
              </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError(null); // Clear error on input change
                      }}
                      placeholder="Enter your email address"
                    required
                      className={`flex-1 px-6 py-4 rounded-full border-2 focus:outline-none text-lg transition-colors text-slate-900 placeholder:text-slate-500 ${
                        error
                          ? "border-red-500 focus:border-red-600"
                          : "border-slate-300 focus:border-emerald-600"
                      }`}
                      disabled={loading}
                  />
                  <button
                    type="submit"
                      disabled={loading}
                      className="bg-gradient-to-r from-slate-700 to-emerald-600 text-white px-8 py-4 rounded-full hover:from-slate-800 hover:to-emerald-700 transition-all shadow-lg shadow-slate-600/30 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                      {loading ? "Submitting..." : "Get Early Access"}
                  </button>
                </div>
                  {error && (
                    <div className="bg-red-50 border-2 border-red-300 rounded-xl p-3 text-red-800 text-sm font-medium">
                      {error}
                    </div>
                  )}
                  <p className="text-sm text-slate-600">
                    No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </form>
            )}
            </div>
                </div>

          {/* Social Proof / Trust Indicators */}
          <div className="mt-16 pt-16 border-t border-slate-200">
            <p className="text-slate-500 mb-8">Trusted by death care professionals</p>
            <div className="flex flex-wrap justify-center gap-8 text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏛️</span>
                <span className="font-semibold">Cemeteries</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚱️</span>
                <span className="font-semibold">Funeral Homes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🕊️</span>
                <span className="font-semibold">Crematoriums</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Image
                  src="/images/eternaguard-logo-wide.png" 
                alt="EternaGuard"
                width={150}
                height={42}
                className="h-10 w-auto"
                />
              </div>
            
            <div className="text-center md:text-right">
              <p className="text-slate-600 mb-2">
                © 2025 EternaGuard. All rights reserved.
              </p>
              <p className="text-sm text-slate-500">
                Secure. Maintain. Innovate.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
