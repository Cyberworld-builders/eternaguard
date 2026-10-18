"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/contracts", label: "Contracts" },
  { href: "/work-orders", label: "Work Orders" },
  { href: "/mapping", label: "Mapping" },
  { href: "/ai-cemetery", label: "AI Features" },
  { href: "/demo", label: "Preview" },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/eternaguard-logo-wide.png"
              alt="EternaGuard"
              width={200}
              height={56}
              className="h-12 sm:h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-emerald-600 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#waitlist"
              className="bg-emerald-600 text-white px-5 py-2 rounded-full hover:bg-emerald-700 transition-colors font-semibold"
            >
              Get Early Access
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-slate-200 pt-4">
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-600 hover:text-emerald-600 transition-colors font-medium py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#waitlist"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-emerald-600 text-white px-5 py-3 rounded-full hover:bg-emerald-700 transition-colors font-semibold text-center mt-2"
              >
                Get Early Access
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
