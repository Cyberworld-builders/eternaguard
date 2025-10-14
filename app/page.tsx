"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual email capture
    console.log("Email submitted:", email);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                EternaGuard
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">
                Features
              </a>
              <a href="#use-cases" className="text-slate-600 hover:text-blue-600 transition-colors">
                Use Cases
              </a>
              <a href="#vision" className="text-slate-600 hover:text-blue-600 transition-colors">
                Vision
              </a>
              <a href="/mockups" className="text-slate-600 hover:text-blue-600 transition-colors">
                Mockups
              </a>
              <a href="/cms-dashboard" className="text-slate-600 hover:text-blue-600 transition-colors">
                CMS Demo
              </a>
              <a href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors">
                Contact
              </a>
            </div>
            <a
              href="#waitlist"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
            >
              Join Waitlist
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              EternaGuard
              <span className="block text-2xl sm:text-3xl lg:text-4xl mt-2 font-normal text-slate-700">
                Property Management System Tailored for Death Care Businesses
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 mb-8 leading-relaxed">
              Navigate, monitor, and maintain your property with precision GPS tracking, 
              AI-powered image analysis, and autonomous drone surveillance.
            </p>
          </div>

          {/* Hero Visual */}
          <div className="relative max-w-5xl mx-auto mb-8">
            <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-3xl p-8 shadow-2xl border border-slate-200">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🏛️</div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">3D Cemetery Visualization</h3>
                    <p className="text-slate-600">Interactive GPS navigation with AI-powered landmark recognition</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#waitlist"
              className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 text-lg font-semibold hover:scale-105"
            >
              Get Early Access
          </a>
          <a
              href="#features"
              className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-slate-50 transition-all shadow-xl border-2 border-blue-600 text-lg font-semibold"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">5-10m</div>
              <div className="text-blue-100">GPS Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Autonomous Monitoring</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">AI-Powered</div>
              <div className="text-blue-100">Image Recognition</div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 shadow-2xl border border-slate-200">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-50 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-slate-900 mb-4">Core Features</h3>
                      <ul className="space-y-2 text-slate-700">
                        <li>✓ GPS Navigation</li>
                        <li>✓ Condition Assessment</li>
                        <li>✓ Image Analysis</li>
                        <li>✓ Autonomous Drone Data</li>
                      </ul>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-2">📱</div>
                        <div className="text-4xl">🏛️</div>
                        <div className="text-6xl mt-2">🚁</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <h3 className="text-xl font-bold text-slate-900 mb-4">Future Applications</h3>
                      <ul className="space-y-2 text-slate-700">
                        <li>Real Estate Management ✓</li>
                        <li>Farming & Land Management ✓</li>
                        <li>Autonomous Data Collection ✓</li>
                        <li>Aerial Mapping ✓</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Core Features</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to manage and maintain your property with unprecedented precision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Precision Navigation</h3>
              <p className="text-slate-600">
                GPS-based positioning combined with AI image recognition to navigate properties with meter-level accuracy.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Autonomous Drones</h3>
              <p className="text-slate-600">
                Scheduled and event-triggered drone patrols gather comprehensive image and position data automatically.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Real-Time Analysis</h3>
              <p className="text-slate-600">
                AI-powered image analysis detects issues in real-time: fallen limbs, damaged markers, maintenance needs.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Smart Task Management</h3>
              <p className="text-slate-600">
                Automatically generate work orders from detected issues. Track, prioritize, and assign maintenance tasks.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Vector Database</h3>
              <p className="text-slate-600">
                Advanced embeddings and RAG technology for intelligent property data retrieval and analysis.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Geospatial Pinning</h3>
              <p className="text-slate-600">
                Pin rich content to physical locations. Share stories, histories, and information tied to specific sites.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Built for Death Care, Perfect for More</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Starting with cemeteries, expanding to transform property management across industries
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Primary Use Case */}
            <div className="bg-gradient-to-br from-blue-600 to-emerald-600 p-8 rounded-2xl shadow-xl text-white">
              <div className="mb-4">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Primary Market
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-4">Cemeteries & Funeral Homes</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="w-6 h-6 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Help visitors locate graves with precision GPS + image recognition</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Automated detection of fallen branches, damaged markers, and maintenance needs</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Share memorial content and family histories pinned to grave locations</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Streamline grounds maintenance with intelligent task prioritization</span>
                </li>
              </ul>
            </div>

            {/* Expanded Applications */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
              <div className="mb-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Future Applications
                </span>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Beyond Death Care</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg text-slate-900 mb-2">🏡 Real Estate Management</h4>
                  <p className="text-slate-600">
                    Track property conditions, maintenance needs, and automate inspections for large portfolios.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-slate-900 mb-2">🌱 Lawn Care & Landscaping</h4>
                  <p className="text-slate-600">
                    Optimize route planning, monitor property conditions, and manage multiple client properties efficiently.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-slate-900 mb-2">🚜 Agriculture & Farming</h4>
                  <p className="text-slate-600">
                    Precision agriculture with drone monitoring, crop analysis, and automated equipment management.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-slate-900 mb-2">🏞️ Parks & Recreation</h4>
                  <p className="text-slate-600">
                    Maintain public spaces, track visitor patterns, and ensure safety across large recreational areas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section id="vision" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">The Future of Property Management</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We&apos;re building the foundation for autonomous property maintenance and augmented reality experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AR/VR */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                <div className="text-4xl mb-4">🥽</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Augmented Reality</h3>
                <p className="text-slate-600 mb-4">
                  Apple Vision Pro and Meta Quest integration for immersive property management. 
                  Point and tap to create issue reports while working.
                </p>
                <div className="text-sm text-emerald-600 font-semibold">Coming Soon</div>
              </div>
            </div>

            {/* Autonomous Vehicles */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Autonomous Equipment</h3>
                <p className="text-slate-600 mb-4">
                  Self-driving mowers, tractors, and excavators that navigate and maintain properties 
                  with zero human intervention.
                </p>
                <div className="text-sm text-emerald-600 font-semibold">In Development</div>
              </div>
            </div>

            {/* Proprietary AI */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Proprietary AI Models</h3>
                <p className="text-slate-600 mb-4">
                  Training industry-specific models on your data to become the leading intelligence 
                  in death care and property management.
                </p>
                <div className="text-sm text-emerald-600 font-semibold">Roadmap 2026</div>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mt-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 text-center">Built on Cutting-Edge Technology</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">📍</div>
                <div className="font-semibold">GPS + Computer Vision</div>
              </div>
              <div>
                <div className="text-3xl mb-2">🗄️</div>
                <div className="font-semibold">Vector Database</div>
              </div>
              <div>
                <div className="text-3xl mb-2">⚡</div>
                <div className="font-semibold">RAG Technology</div>
              </div>
              <div>
                <div className="text-3xl mb-2">🚁</div>
                <div className="font-semibold">Autonomous Drones</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Complete Business Suite Integration</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Part of a comprehensive ecosystem connecting your entire operation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 hover:border-blue-300 transition-colors">
              <h3 className="text-xl font-bold text-slate-900 mb-2">🌐 CMS & Marketing</h3>
              <p className="text-slate-600 mb-4">
                Blog management, SEO optimization, lead capture, and sales funnels all connected to your property data.
              </p>
              <a href="/cms-dashboard" className="text-blue-600 hover:text-blue-700 font-semibold text-sm inline-flex items-center">
                View Demo Dashboard →
              </a>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-2">👥 CRM & Sales</h3>
              <p className="text-slate-600">
                Contract management, customer relationships, and sales pipelines integrated with property information.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-2">📋 Work Orders</h3>
              <p className="text-slate-600">
                Automated task creation from AI detection, staff management, and project tracking in one platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-emerald-600 rounded-3xl shadow-2xl p-12 text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Join the Future of Property Management</h2>
            <p className="text-xl mb-8 text-emerald-50">
              Be among the first to experience AI-powered property management. 
              Sign up for early access and exclusive updates.
            </p>
            
            {submitted ? (
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
                <svg className="w-16 h-16 mx-auto mb-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xl font-semibold">Thank you for joining our waitlist!</p>
                <p className="mt-2 text-emerald-50">We&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-6 py-4 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-white/50"
                  />
                  <button
                    type="submit"
                    className="bg-slate-900 text-white px-8 py-4 rounded-full hover:bg-slate-800 transition-colors font-semibold shadow-xl hover:scale-105"
                  >
                    Join Waitlist
                  </button>
                </div>
                <p className="mt-4 text-sm text-blue-50">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </form>
            )}

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="flex items-start">
                <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-semibold">Early Access</div>
                  <div className="text-sm text-emerald-50">Be first to use the platform</div>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-semibold">Exclusive Updates</div>
                  <div className="text-sm text-blue-50">Latest features & news</div>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-semibold">Special Pricing</div>
                  <div className="text-sm text-blue-50">Founder pricing for early adopters</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Ready to Transform Your Property Management?</h2>
          <p className="text-xl text-slate-600 mb-8">
            Let&apos;s discuss how EternaGuard can revolutionize your operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@eternaguard.com"
              className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all shadow-lg text-lg font-semibold inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Schedule a Demo
        </a>
        <a
              href="#waitlist"
              className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-slate-50 transition-all shadow-lg border-2 border-blue-600 text-lg font-semibold"
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  EternaGuard
                </div>
              </div>
              <p className="text-slate-400 max-w-md">
                Next-generation property management platform powered by AI, GPS, and autonomous technology. 
                Built for death care, perfect for any property.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#features" className="hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#use-cases" className="hover:text-blue-400 transition-colors">Use Cases</a></li>
                <li><a href="#vision" className="hover:text-blue-400 transition-colors">Vision</a></li>
                <li><a href="#waitlist" className="hover:text-blue-400 transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2025 EternaGuard. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Privacy</a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Terms</a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
