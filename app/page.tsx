import Link from "next/link";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import WaitlistForm from "./components/WaitlistForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Early Access Opening Soon
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-slate-900">
            Cemetery Contracts,{" "}
            <span className="text-emerald-600">Finally Done Right</span>
          </h1>

          <p className="text-xl sm:text-2xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Funeral home systems treat cemetery contracts as an afterthought.
            EternaGuard is built for the way cemeteries actually sell — pre-need,
            at-need, payment plans, and plot inventory in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="#waitlist"
              className="bg-emerald-600 text-white px-8 py-4 rounded-full hover:bg-emerald-700 transition-colors text-lg font-semibold shadow-lg shadow-emerald-600/20"
            >
              Join the Waitlist
            </Link>
            <Link
              href="/demo"
              className="bg-white text-slate-700 px-8 py-4 rounded-full hover:bg-slate-50 transition-colors text-lg font-semibold border-2 border-slate-300"
            >
              See Product Preview
            </Link>
          </div>

          <p className="text-slate-500 text-sm">
            Serving cemeteries in the US, Australia, UK, and beyond
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
            The Cemetery Contract Problem
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="text-3xl mb-4">🏢</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Funeral Systems Don&apos;t Fit
              </h3>
              <p className="text-slate-600">
                Built for arrangements and services, not interment rights,
                plot sales, or long-term payment plans. You&apos;re always working around
                the software.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Contracts Everywhere
              </h3>
              <p className="text-slate-600">
                Pre-need in one system, at-need in another, payment tracking in
                spreadsheets. No single view of what&apos;s sold, owed, or available.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="text-3xl mb-4">🗺️</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Inventory Guesswork
              </h3>
              <p className="text-slate-600">
                Plot availability lives in someone&apos;s head or an outdated map.
                Overselling happens. Finding graves takes too long.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              One System for Cemetery Sales
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              EternaGuard closes the gap between what you need and what funeral
              software provides.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Pre-Need & At-Need Contracts
                  </h3>
                  <p className="text-slate-600">
                    Create contracts the way your salespeople actually work —
                    interment rights, markers, opening/closing, payment plans.
                    Everything in one flow.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Payment Plan Tracking
                  </h3>
                  <p className="text-slate-600">
                    Track what&apos;s paid, what&apos;s due, and what&apos;s late. Automated
                    reminders. Clear reporting for families and your books.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Plot Inventory & Mapping
                  </h3>
                  <p className="text-slate-600">
                    See what&apos;s available, what&apos;s reserved, and what&apos;s occupied.
                    GPS integration for finding graves. No more overselling.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-100 to-emerald-50 rounded-2xl p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-slate-700 font-medium">
                  Contract management that understands cemetery sales
                </p>
                <Link
                  href="/contracts"
                  className="inline-block mt-4 text-emerald-600 font-semibold hover:underline"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            More Than Contracts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/work-orders" className="group bg-slate-800 p-6 rounded-xl hover:bg-slate-700 transition-colors">
              <div className="text-3xl mb-3">🔧</div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                Work Orders
              </h3>
              <p className="text-slate-400 text-sm">
                Maintenance scheduling, task assignment, and groundskeeping management.
              </p>
            </Link>

            <Link href="/mapping" className="group bg-slate-800 p-6 rounded-xl hover:bg-slate-700 transition-colors">
              <div className="text-3xl mb-3">🗺️</div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                Mapping & GPS
              </h3>
              <p className="text-slate-400 text-sm">
                Digital maps, grave finding, and location services for staff and visitors.
              </p>
            </Link>

            <Link href="/ai-cemetery" className="group bg-slate-800 p-6 rounded-xl hover:bg-slate-700 transition-colors">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                AI Features
              </h3>
              <p className="text-slate-400 text-sm">
                Smart data entry, record search, and automated insights.
              </p>
            </Link>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="text-3xl mb-3">🔮</div>
              <h3 className="text-lg font-bold mb-2">On the Roadmap</h3>
              <p className="text-slate-400 text-sm">
                Drone surveys, AR grave finding, autonomous maintenance detection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
            Built For
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="text-4xl mb-3">🏛️</div>
              <h3 className="font-bold text-slate-900">Cemeteries</h3>
              <p className="text-slate-600 text-sm mt-1">
                Private, municipal, religious, and memorial parks
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-3">⚱️</div>
              <h3 className="font-bold text-slate-900">Funeral Homes</h3>
              <p className="text-slate-600 text-sm mt-1">
                With cemetery operations or partnerships
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-3">🏢</div>
              <h3 className="font-bold text-slate-900">Council & Government</h3>
              <p className="text-slate-600 text-sm mt-1">
                Public cemeteries and memorial facilities
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-3">💼</div>
              <h3 className="font-bold text-slate-900">Pre-Need Sales Teams</h3>
              <p className="text-slate-600 text-sm mt-1">
                Tools that match your sales process
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Waitlist Section */}
      <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-600 to-emerald-700">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Get Early Access
              </h2>
              <p className="text-slate-600">
                Be among the first to try EternaGuard. Join the waitlist and
                help shape the future of cemetery software.
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
