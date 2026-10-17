import type { Metadata } from "next";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import WaitlistForm from "../components/WaitlistForm";

const SITE_URL = "https://eternaguard.cyberworldbuilders.com";

export const metadata: Metadata = {
  title: "Cemetery Contract & Pre-Need Management Software",
  description:
    "Manage pre-need and at-need cemetery contracts, payment plans, interment rights, and plot sales in one system. Built for cemetery salespeople, not as a funeral home afterthought.",
  keywords: [
    "cemetery contract software",
    "pre-need software",
    "cemetery sales software",
    "interment rights management",
    "cemetery payment plans",
    "at-need contracts",
    "plot sales software",
    "cemetery CRM",
  ],
  openGraph: {
    title: "Cemetery Contract & Pre-Need Management | EternaGuard",
    description:
      "Pre-need and at-need contracts, payment plans, and plot sales — finally in one system built for cemeteries.",
    url: `${SITE_URL}/contracts`,
    images: [{ url: "/images/eternaguard-hero.png" }],
  },
  alternates: {
    canonical: `${SITE_URL}/contracts`,
  },
};

function SoftwareApplicationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "EternaGuard Cemetery Contract Management",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Cemetery contract management software for pre-need sales, at-need contracts, payment plans, and plot inventory.",
    url: `${SITE_URL}/contracts`,
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

export default function ContractsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SoftwareApplicationJsonLd />
      <Navigation />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-slate-900">
            Cemetery Contract Management{" "}
            <span className="text-emerald-600">That Actually Fits</span>
          </h1>

          <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Stop bolting cemetery contracts onto funeral home software. EternaGuard
            handles pre-need, at-need, interment rights, payment plans, and plot
            sales — the way your salespeople actually work.
          </p>

          <WaitlistForm variant="compact" className="max-w-xl mx-auto" />
        </div>
      </section>

      {/* Pre-Need Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                Pre-Need Sales
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Pre-Need Contracts Done Right
              </h2>
              <p className="text-slate-600 mb-6">
                Pre-need sales are different from at-need. You&apos;re selling peace
                of mind, not arranging an immediate service. Your software should
                understand that.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Flexible payment plans — monthly, quarterly, or custom schedules</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Reserve plots and track what&apos;s paid vs. what&apos;s owed</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Automated payment reminders before accounts go delinquent</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Bundle interment rights, markers, and services in one contract</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-slate-100 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-slate-600">Pre-need contract flow</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* At-Need Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 bg-gradient-to-br from-emerald-50 to-slate-100 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="text-6xl mb-4">⚡</div>
                <p className="text-slate-600">Quick at-need processing</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                At-Need Sales
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                At-Need When Time Matters
              </h2>
              <p className="text-slate-600 mb-6">
                Families need quick answers. Your staff needs to confirm
                availability, create contracts, and coordinate with funeral
                homes — fast.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Instant plot availability from your digital inventory</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">One-step contract creation with all services included</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Coordinate opening/closing with grounds crew automatically</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Print or email contracts and receipts on the spot</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Plans */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Payment Plan Tracking Without Spreadsheets
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            Know exactly what&apos;s paid, what&apos;s due, and what&apos;s overdue — for every
            contract, every family.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 rounded-xl">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Flexible Schedules
              </h3>
              <p className="text-slate-600 text-sm">
                Monthly, quarterly, annual, or custom payment schedules.
                Accommodate how families want to pay.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Automated Reminders
              </h3>
              <p className="text-slate-600 text-sm">
                Email or SMS reminders before payments are due.
                Reduce delinquencies with friendly nudges.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Clear Reporting
              </h3>
              <p className="text-slate-600 text-sm">
                Aging reports, payment history, and projections.
                Know your receivables at a glance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Works With Your Existing Systems
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            EternaGuard doesn&apos;t replace your funeral home software — it fills the
            gap they leave in cemetery operations.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-slate-800 px-4 py-2 rounded-full">Accounting Software</span>
            <span className="bg-slate-800 px-4 py-2 rounded-full">Payment Processors</span>
            <span className="bg-slate-800 px-4 py-2 rounded-full">Funeral Home Systems</span>
            <span className="bg-slate-800 px-4 py-2 rounded-full">Document Storage</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-600 to-emerald-700">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Stop Fighting Your Software
              </h2>
              <p className="text-slate-600">
                Join the waitlist for cemetery contract management that actually
                understands how you sell.
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
