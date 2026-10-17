import type { Metadata } from "next";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import WaitlistForm from "../components/WaitlistForm";

const SITE_URL = "https://eternaguard.cyberworldbuilders.com";

export const metadata: Metadata = {
  title: "Cemetery Mapping & Grave Finding Software",
  description:
    "Digital cemetery maps with GPS grave finding for staff and visitors. Plot inventory, section management, and location services for cemeteries and memorial parks.",
  keywords: [
    "cemetery mapping software",
    "grave finding software",
    "cemetery GPS",
    "cemetery GIS",
    "digital cemetery map",
    "grave location software",
    "cemetery plot map",
    "mobile grave mapping",
  ],
  openGraph: {
    title: "Cemetery Mapping & GPS Grave Finding | EternaGuard",
    description:
      "Digital maps and GPS grave finding for cemetery staff and visitors. Never lose track of a plot again.",
    url: `${SITE_URL}/mapping`,
    images: [{ url: "/images/eternaguard-hero.png" }],
  },
  alternates: {
    canonical: `${SITE_URL}/mapping`,
  },
};

function SoftwareApplicationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "EternaGuard Cemetery Mapping",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Cemetery mapping software with GPS grave finding, plot inventory, and digital cemetery maps.",
    url: `${SITE_URL}/mapping`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      description: "Early access waitlist - pricing to be announced",
    },
    publisher: {
      "@type": "Organization",
      name: "EternaGuard",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function MappingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SoftwareApplicationJsonLd />
      <Navigation />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-slate-900">
            Find Any Grave{" "}
            <span className="text-emerald-600">In Seconds</span>
          </h1>

          <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Digital cemetery maps with GPS. Help visitors find loved ones,
            help staff find plots, and never oversell inventory again.
          </p>

          <WaitlistForm variant="compact" className="max-w-xl mx-auto" />
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Mapping For Everyone
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-8 rounded-2xl">
              <div className="text-4xl mb-4">👔</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                For Sales Staff
              </h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  See available plots instantly
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  Show families options on a map
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  Reserve plots during the sale
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  Check proximity to family members
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-slate-50 p-8 rounded-2xl">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                For Grounds Crew
              </h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  Navigate to work locations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  Find interment sites quickly
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  Mark sections as serviced
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  Report issues by location
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-slate-50 p-8 rounded-2xl">
              <div className="text-4xl mb-4">👪</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                For Visitors
              </h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  Search by name or date
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  GPS directions to the grave
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  Works on any smartphone
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  No app download required
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 flex items-center justify-center min-h-[400px] order-2 lg:order-1">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-slate-600">Interactive cemetery map</p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Digital Maps That Actually Help
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Accurate Plot Data
                  </h3>
                  <p className="text-slate-600">
                    Every section, row, and plot mapped with GPS coordinates.
                    Import from existing records or build from survey data.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Real-Time Inventory
                  </h3>
                  <p className="text-slate-600">
                    See what&apos;s available, reserved, and occupied at a glance.
                    Inventory updates automatically when contracts are created.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Search & Filter
                  </h3>
                  <p className="text-slate-600">
                    Find graves by name, date, section, or relationship.
                    Filter by plot type, price range, or features.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Mobile-First
                  </h3>
                  <p className="text-slate-600">
                    Works on phones and tablets in the field. No spotty
                    cell coverage? Offline mode keeps maps accessible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Public vs Private */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Public & Private Access
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-slate-200 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🔓</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Public Grave Finder</h3>
              </div>
              <p className="text-slate-600 mb-4">
                Let visitors search and find graves on their own. Reduces
                office phone calls and helps families visit more easily.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Name and date search</li>
                <li>• Mobile-friendly directions</li>
                <li>• QR codes for cemetery entrance</li>
                <li>• Optional memorial pages</li>
              </ul>
            </div>

            <div className="border border-slate-200 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🔐</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Staff Dashboard</h3>
              </div>
              <p className="text-slate-600 mb-4">
                Full inventory management, sales tools, and operations
                features for your team only.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Plot availability and pricing</li>
                <li>• Ownership and contract details</li>
                <li>• Maintenance history by location</li>
                <li>• Work order integration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            The Future of Cemetery Navigation
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            We&apos;re building toward AR and drone-powered mapping.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-xl">
              <div className="text-3xl mb-3">📲</div>
              <h3 className="font-bold mb-2">AR Wayfinding</h3>
              <p className="text-slate-400 text-sm">
                Point your phone and see grave markers highlighted
                with names and directions.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl">
              <div className="text-3xl mb-3">🚁</div>
              <h3 className="font-bold mb-2">Drone Mapping</h3>
              <p className="text-slate-400 text-sm">
                Automated aerial surveys to keep maps accurate
                and detect changes.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl">
              <div className="text-3xl mb-3">🌐</div>
              <h3 className="font-bold mb-2">3D Cemetery Twin</h3>
              <p className="text-slate-400 text-sm">
                Virtual walk-throughs for families who can&apos;t
                visit in person.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-600 to-emerald-700">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Never Lose Track of a Plot Again
              </h2>
              <p className="text-slate-600">
                Join the waitlist for cemetery mapping that makes
                finding graves simple.
              </p>
            </div>
            <WaitlistForm variant="full" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
