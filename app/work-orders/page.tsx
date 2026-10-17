import type { Metadata } from "next";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import WaitlistForm from "../components/WaitlistForm";

const SITE_URL = "https://eternaguard.cyberworldbuilders.com";

export const metadata: Metadata = {
  title: "Cemetery Work Orders & Maintenance Software",
  description:
    "Schedule groundskeeping, track maintenance tasks, and manage cemetery staff with work order software built for memorial parks and cemeteries.",
  keywords: [
    "cemetery work order software",
    "cemetery maintenance software",
    "groundskeeping software",
    "grave maintenance",
    "cemetery task management",
    "cemetery staff management",
    "memorial park maintenance",
  ],
  openGraph: {
    title: "Cemetery Work Orders & Maintenance | EternaGuard",
    description:
      "Schedule maintenance, assign tasks, and keep your grounds looking their best with cemetery work order software.",
    url: `${SITE_URL}/work-orders`,
    images: [{ url: "/images/eternaguard-hero.png" }],
  },
  alternates: {
    canonical: `${SITE_URL}/work-orders`,
  },
};

function SoftwareApplicationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "EternaGuard Cemetery Work Orders",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Cemetery work order and maintenance software for groundskeeping, task management, and staff coordination.",
    url: `${SITE_URL}/work-orders`,
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

export default function WorkOrdersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SoftwareApplicationJsonLd />
      <Navigation />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-slate-900">
            Cemetery Maintenance{" "}
            <span className="text-emerald-600">Without the Chaos</span>
          </h1>

          <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Track work orders, schedule groundskeeping, and keep your cemetery
            looking its best. No more sticky notes, no more forgotten tasks.
          </p>

          <WaitlistForm variant="compact" className="max-w-xl mx-auto" />
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Maintenance Gets Complicated
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">📝</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Tasks Fall Through Cracks
              </h3>
              <p className="text-slate-600">
                Verbal requests get forgotten. Paper lists get lost.
                Things don&apos;t get done until someone complains.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">🗓️</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Scheduling Is Manual
              </h3>
              <p className="text-slate-600">
                Mowing rotations, seasonal work, and recurring maintenance
                live in someone&apos;s head or a paper calendar.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">❓</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                No History
              </h3>
              <p className="text-slate-600">
                When was this section last mowed? Who fixed that headstone?
                Without records, you&apos;re always guessing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Order Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Work Orders That Work
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📋</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      Create & Assign
                    </h3>
                    <p className="text-slate-600">
                      Create work orders for any task — mowing, repairs, installations,
                      cleanup. Assign to staff with due dates and priorities.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🔄</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      Recurring Schedules
                    </h3>
                    <p className="text-slate-600">
                      Set up recurring tasks — weekly mowing rotations, monthly
                      inspections, seasonal maintenance. They create themselves.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">✅</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      Track Completion
                    </h3>
                    <p className="text-slate-600">
                      See what&apos;s done, what&apos;s in progress, and what&apos;s overdue.
                      Add photos and notes to document work.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📱</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      Mobile for Grounds Crew
                    </h3>
                    <p className="text-slate-600">
                      Staff see their tasks on any device. Mark complete in the field.
                      No paperwork, no radio back-and-forth.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-slate-100 rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="text-6xl mb-4">🔧</div>
                <p className="text-slate-600">Work order dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Types */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Every Type of Maintenance
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🌿</div>
              <h3 className="font-semibold text-slate-900">Lawn Care</h3>
              <p className="text-xs text-slate-500 mt-1">Mowing, edging, fertilizing</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🪦</div>
              <h3 className="font-semibold text-slate-900">Marker Care</h3>
              <p className="text-xs text-slate-500 mt-1">Cleaning, leveling, repairs</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🌳</div>
              <h3 className="font-semibold text-slate-900">Tree & Shrub</h3>
              <p className="text-xs text-slate-500 mt-1">Trimming, removal, planting</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🚿</div>
              <h3 className="font-semibold text-slate-900">Irrigation</h3>
              <p className="text-xs text-slate-500 mt-1">Repairs, seasonal startup</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🛤️</div>
              <h3 className="font-semibold text-slate-900">Roads & Paths</h3>
              <p className="text-xs text-slate-500 mt-1">Paving, pothole repair</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="font-semibold text-slate-900">Buildings</h3>
              <p className="text-xs text-slate-500 mt-1">Chapel, office, mausoleum</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🧹</div>
              <h3 className="font-semibold text-slate-900">Cleanup</h3>
              <p className="text-xs text-slate-500 mt-1">Debris, flowers, decorations</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">⚰️</div>
              <h3 className="font-semibold text-slate-900">Interments</h3>
              <p className="text-xs text-slate-500 mt-1">Opening, closing, setup</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            What&apos;s Coming Next
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            We&apos;re building toward fully automated maintenance detection.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-xl">
              <div className="text-3xl mb-3">📷</div>
              <h3 className="font-bold mb-2">Photo AI</h3>
              <p className="text-slate-400 text-sm">
                Staff photos automatically flag issues — damaged markers,
                overgrown areas, debris.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl">
              <div className="text-3xl mb-3">🚁</div>
              <h3 className="font-bold mb-2">Drone Surveys</h3>
              <p className="text-slate-400 text-sm">
                Autonomous aerial surveys to spot problems across
                large properties.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-bold mb-2">Auto Work Orders</h3>
              <p className="text-slate-400 text-sm">
                AI creates work orders from detected issues — before
                anyone complains.
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
                Keep Your Grounds Looking Their Best
              </h2>
              <p className="text-slate-600">
                Join the waitlist for work order management that keeps
                maintenance on track.
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
