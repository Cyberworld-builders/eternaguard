import type { Metadata } from "next";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import WaitlistForm from "../components/WaitlistForm";

const SITE_URL = "https://eternaguard.cyberworldbuilders.com";

export const metadata: Metadata = {
  title: "AI-Powered Cemetery Management Software",
  description:
    "AI for cemetery operations: smart data entry, automated record search, intelligent insights, and future drone-powered maintenance detection.",
  keywords: [
    "ai cemetery software",
    "ai-powered cemetery management",
    "cemetery automation",
    "smart cemetery software",
    "digital cemetery solutions",
    "cemetery ai features",
    "automated cemetery records",
  ],
  openGraph: {
    title: "AI-Powered Cemetery Management | EternaGuard",
    description:
      "AI features that make cemetery management smarter — from data entry to maintenance detection.",
    url: `${SITE_URL}/ai-cemetery`,
    images: [{ url: "/images/eternaguard-hero.png" }],
  },
  alternates: {
    canonical: `${SITE_URL}/ai-cemetery`,
  },
};

function SoftwareApplicationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "EternaGuard AI Cemetery Management",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "AI-powered cemetery management software with smart data entry, record search, and automated insights.",
    url: `${SITE_URL}/ai-cemetery`,
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

export default function AICemeteryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SoftwareApplicationJsonLd />
      <Navigation />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-purple-100 text-purple-800 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            AI-Powered Features
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-slate-900">
            Smarter Cemetery{" "}
            <span className="text-emerald-600">Management</span>
          </h1>

          <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            AI that helps with the tedious work — data entry, record search,
            and spotting issues before they become problems.
          </p>

          <WaitlistForm variant="compact" className="max-w-xl mx-auto" />
        </div>
      </section>

      {/* Current AI Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              AI That Actually Helps
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Practical AI features for everyday cemetery operations — not
              science fiction, but real time-savers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-8 rounded-2xl">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Smart Data Entry
              </h3>
              <p className="text-slate-600 mb-4">
                Type naturally and let AI structure the data. Enter
                &quot;John Smith, born March 15 1942, died January 3 2024&quot; and
                watch it fill in the right fields.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  Auto-formats names, dates, and addresses
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  Suggests corrections for typos
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  Learns your cemetery&apos;s patterns
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-slate-50 p-8 rounded-2xl">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Intelligent Search
              </h3>
              <p className="text-slate-600 mb-4">
                Search the way people actually ask. &quot;Find the Johnsons buried
                near the oak tree in the 1990s&quot; returns real results.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  Natural language queries
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  Finds records with partial info
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  Handles spelling variations
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-slate-50 p-8 rounded-2xl">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Automated Insights
              </h3>
              <p className="text-slate-600 mb-4">
                Get reports without asking for them. AI notices patterns
                in your data and surfaces what matters.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  Sales trend analysis
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  Payment delinquency alerts
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  Inventory projections
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-slate-50 p-8 rounded-2xl">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Document Processing
              </h3>
              <p className="text-slate-600 mb-4">
                Upload old paper records and let AI extract the data.
                Index cards, ledgers, and contracts become searchable.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  OCR with handwriting support
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  Automatic field extraction
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  Links to existing records
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              What We&apos;re Building Next
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              The roadmap for AI in cemetery operations — from computer vision
              to autonomous maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📷</span>
                <span className="bg-emerald-900 text-emerald-300 text-xs px-2 py-1 rounded-full">In Progress</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Photo Analysis</h3>
              <p className="text-slate-400 text-sm">
                Staff take photos, AI flags issues: damaged markers,
                overgrown areas, debris. Auto-creates work orders.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🚁</span>
                <span className="bg-blue-900 text-blue-300 text-xs px-2 py-1 rounded-full">Planned</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Drone Surveys</h3>
              <p className="text-slate-400 text-sm">
                Autonomous aerial patrols capture the whole property.
                AI spots maintenance needs across hundreds of acres.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📲</span>
                <span className="bg-blue-900 text-blue-300 text-xs px-2 py-1 rounded-full">Planned</span>
              </div>
              <h3 className="text-lg font-bold mb-2">AR Grave Finding</h3>
              <p className="text-slate-400 text-sm">
                Point your phone at the cemetery and see grave markers
                highlighted with names and directions overlaid.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🪦</span>
                <span className="bg-blue-900 text-blue-300 text-xs px-2 py-1 rounded-full">Planned</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Marker Reading</h3>
              <p className="text-slate-400 text-sm">
                Camera captures marker inscriptions. AI reads and indexes
                them, even weathered or hard-to-read stones.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🤖</span>
                <span className="bg-purple-900 text-purple-300 text-xs px-2 py-1 rounded-full">Future</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Autonomous Robots</h3>
              <p className="text-slate-400 text-sm">
                Ground-based robots patrol and report. Eventually,
                autonomous mowing and debris removal.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🎯</span>
                <span className="bg-purple-900 text-purple-300 text-xs px-2 py-1 rounded-full">Future</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Predictive Maintenance</h3>
              <p className="text-slate-400 text-sm">
                AI predicts when markers will need repair, when
                sections need attention, before problems are visible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why AI */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            AI Built for Cemeteries
          </h2>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-xl">🎯</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Industry-Specific Training
                </h3>
                <p className="text-slate-600">
                  Generic AI doesn&apos;t understand cemetery data. Our models are
                  trained on cemetery records, contracts, and operations — so
                  they understand terms like &quot;interment rights,&quot; &quot;pre-need,&quot;
                  and &quot;columbarium.&quot;
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl">🔒</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Privacy-First Design
                </h3>
                <p className="text-slate-600">
                  Cemetery records are sensitive. Our AI processes data
                  securely and doesn&apos;t share it with third parties. Your
                  data stays yours.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Practical, Not Flashy
                </h3>
                <p className="text-slate-600">
                  We focus on AI that saves real time — not demos that look
                  impressive but don&apos;t help with actual work. Every feature
                  solves a problem cemetery staff actually have.
                </p>
              </div>
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
                Be Part of Cemetery AI
              </h2>
              <p className="text-slate-600">
                Join the waitlist and help shape AI features that actually
                make a difference in cemetery operations.
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
