"use client";

import { useState, useRef } from "react";

interface WaitlistFormProps {
  variant?: "full" | "compact";
  className?: string;
}

const ROLES = [
  { value: "", label: "Select your role (optional)" },
  { value: "cemetery_owner", label: "Cemetery Owner" },
  { value: "cemetery_manager", label: "Cemetery Manager / Superintendent" },
  { value: "funeral_director", label: "Funeral Director" },
  { value: "sales", label: "Cemetery Sales / Pre-need Counselor" },
  { value: "grounds", label: "Grounds / Maintenance Staff" },
  { value: "admin", label: "Office / Administration" },
  { value: "council", label: "Council / Local Government" },
  { value: "other", label: "Other" },
];

export default function WaitlistForm({ variant = "full", className = "" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [organization, setOrganization] = useState("");
  const [region, setRegion] = useState("");
  const [headache, setHeadache] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          role: role || undefined,
          organization: organization || undefined,
          region: region || undefined,
          headache: headache || undefined,
          website: honeypotRef.current?.value || "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setEmail("");
      setRole("");
      setOrganization("");
      setRegion("");
      setHeadache("");
    } catch {
      setError("Network error. Please check your connection and try again.");
    }

    setLoading(false);
  };

  if (submitted) {
    return (
      <div className={`bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-8 text-center ${className}`}>
        <div className="text-4xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-emerald-800 mb-2">You&apos;re on the list!</h3>
        <p className="text-emerald-700">
          We&apos;ll reach out when early access opens. In the meantime, explore our{" "}
          <a href="/demo" className="underline hover:no-underline">product preview</a>.
        </p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={className}>
        {/* Honeypot - hidden from users */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <input
            type="text"
            name="website"
            ref={honeypotRef}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(null); }}
            placeholder="Enter your work email"
            required
            disabled={loading}
            className={`flex-1 px-5 py-3 rounded-full border-2 focus:outline-none transition-colors text-slate-900 placeholder:text-slate-500 ${
              error ? "border-red-400 focus:border-red-500" : "border-slate-300 focus:border-emerald-500"
            }`}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? "Joining..." : "Get Early Access"}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
        <p className="mt-2 text-sm text-slate-500">
          No spam. Unsubscribe anytime.
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {/* Honeypot - hidden from users */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input
          type="text"
          name="website"
          ref={honeypotRef}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="waitlist-email" className="block text-sm font-medium text-slate-700 mb-1">
          Work email <span className="text-red-500">*</span>
        </label>
        <input
          id="waitlist-email"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(null); }}
          placeholder="you@cemetery.com"
          required
          disabled={loading}
          className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors text-slate-900 placeholder:text-slate-400 ${
            error ? "border-red-400 focus:border-red-500" : "border-slate-300 focus:border-emerald-500"
          }`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="waitlist-role" className="block text-sm font-medium text-slate-700 mb-1">
            Your role
          </label>
          <select
            id="waitlist-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-emerald-500 focus:outline-none transition-colors text-slate-900 bg-white"
          >
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="waitlist-org" className="block text-sm font-medium text-slate-700 mb-1">
            Organization
          </label>
          <input
            id="waitlist-org"
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="Cemetery or funeral home name"
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-emerald-500 focus:outline-none transition-colors text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div>
        <label htmlFor="waitlist-region" className="block text-sm font-medium text-slate-700 mb-1">
          Region / Country
        </label>
        <input
          id="waitlist-region"
          type="text"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          placeholder="e.g. Texas, NSW Australia, UK"
          disabled={loading}
          className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-emerald-500 focus:outline-none transition-colors text-slate-900 placeholder:text-slate-400"
        />
      </div>

      <div>
        <label htmlFor="waitlist-headache" className="block text-sm font-medium text-slate-700 mb-1">
          What&apos;s your biggest contract headache?
        </label>
        <textarea
          id="waitlist-headache"
          value={headache}
          onChange={(e) => setHeadache(e.target.value)}
          placeholder="e.g. Tracking pre-need payments, managing plot inventory, integrating with our funeral home system..."
          rows={3}
          disabled={loading}
          className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-emerald-500 focus:outline-none transition-colors text-slate-900 placeholder:text-slate-400 resize-none"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-600 text-white py-4 rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Joining waitlist..." : "Join the Early Access List"}
      </button>

      <p className="text-center text-sm text-slate-500">
        No credit card required. No spam, ever.
      </p>
    </form>
  );
}
