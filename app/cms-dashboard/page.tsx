"use client";

import { useState } from "react";
import Link from "next/link";

export default function CMSDashboard() {
  const [timeRange, setTimeRange] = useState("30d");
  const [showCampaignModal, setShowCampaignModal] = useState(false);

  // Mock Analytics Data
  const analyticsData = {
    pageViews: 45632,
    pageViewsChange: 12.5,
    uniqueVisitors: 12847,
    visitorsChange: 8.3,
    avgSessionDuration: "3:24",
    durationChange: -2.1,
    bounceRate: "42.3%",
    bounceRateChange: -5.2,
    conversionRate: "3.8%",
    conversionChange: 15.7,
    leads: 487,
    leadsChange: 22.4
  };

  // Mock Social Media Data
  const socialCampaigns = [
    {
      platform: "Facebook",
      icon: "👥",
      color: "blue",
      impressions: 125430,
      clicks: 3421,
      engagement: "2.7%",
      spend: "$842.00",
      leads: 89,
      cpl: "$9.46"
    },
    {
      platform: "LinkedIn",
      icon: "💼",
      color: "blue",
      impressions: 67890,
      clicks: 2104,
      engagement: "3.1%",
      spend: "$1,240.00",
      leads: 124,
      cpl: "$10.00"
    },
    {
      platform: "Instagram",
      icon: "📸",
      color: "purple",
      impressions: 98765,
      clicks: 4231,
      engagement: "4.3%",
      spend: "$620.00",
      leads: 76,
      cpl: "$8.16"
    },
    {
      platform: "Twitter/X",
      icon: "🐦",
      color: "slate",
      impressions: 54321,
      clicks: 1876,
      engagement: "3.5%",
      spend: "$415.00",
      leads: 43,
      cpl: "$9.65"
    }
  ];

  // Mock SEO Data
  const seoMetrics = {
    organicTraffic: 8234,
    organicChange: 18.2,
    keywords: 142,
    keywordsChange: 12,
    backlinks: 387,
    backlinksChange: 24,
    domainAuthority: 42,
    authorityChange: 3
  };

  // Mock Top Pages
  const topPages = [
    { page: "/cemetery-services", views: 5234, conversion: "4.2%" },
    { page: "/funeral-home", views: 4123, conversion: "3.8%" },
    { page: "/cremation-services", views: 3845, conversion: "3.5%" },
    { page: "/pre-planning", views: 2987, conversion: "5.1%" },
    { page: "/about", views: 2456, conversion: "2.1%" }
  ];

  // Mock Recent Blog Posts
  const recentPosts = [
    { title: "Planning Ahead: The Benefits of Pre-Arrangement", status: "Published", views: 1234, date: "2024-10-10" },
    { title: "Understanding Cemetery Plot Options", status: "Published", views: 987, date: "2024-10-08" },
    { title: "How to Choose a Funeral Home", status: "Draft", views: 0, date: "2024-10-14" },
    { title: "Green Burial Options Explained", status: "Scheduled", views: 0, date: "2024-10-16" }
  ];

  const StatCard = ({ title, value, change, icon }: { title: string; value: string | number; change: number; icon: string }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-600 text-sm font-medium">{title}</span>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="text-3xl font-bold text-slate-900 mb-2">{value}</div>
      <div className={`flex items-center text-sm ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
        <span className="mr-1">{change >= 0 ? "↑" : "↓"}</span>
        <span>{Math.abs(change)}%</span>
        <span className="text-slate-500 ml-2">vs last period</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <img 
                  src="/images/eternaguard-logo-wide.png" 
                  alt="EternaGuard - Secure. Maintain. Innovate." 
                  className="h-12 w-auto"
                />
                <span className="text-xl font-bold text-slate-600">| CMS</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/cms-dashboard/new-post"
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold"
              >
                + New Post
              </Link>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
              <Link
                href="/"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Marketing Dashboard</h1>
          <p className="text-slate-600">Unified view of analytics, social campaigns, and content performance</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard title="Page Views" value={analyticsData.pageViews.toLocaleString()} change={analyticsData.pageViewsChange} icon="📊" />
          <StatCard title="Unique Visitors" value={analyticsData.uniqueVisitors.toLocaleString()} change={analyticsData.visitorsChange} icon="👥" />
          <StatCard title="Avg. Session Duration" value={analyticsData.avgSessionDuration} change={analyticsData.durationChange} icon="⏱️" />
          <StatCard title="Bounce Rate" value={analyticsData.bounceRate} change={analyticsData.bounceRateChange} icon="🎯" />
          <StatCard title="Conversion Rate" value={analyticsData.conversionRate} change={analyticsData.conversionChange} icon="✨" />
          <StatCard title="Total Leads" value={analyticsData.leads} change={analyticsData.leadsChange} icon="📈" />
        </div>

        {/* Social Media Campaigns */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Social Media Campaigns</h2>
            <button 
              onClick={() => setShowCampaignModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
            >
              + Create Campaign
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {socialCampaigns.map((campaign, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{campaign.icon}</span>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{campaign.platform}</h3>
                      <span className="text-sm text-slate-500">Active Campaign</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700`}>
                    Active
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-slate-600">Impressions</div>
                    <div className="text-lg font-bold text-slate-900">{campaign.impressions.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Clicks</div>
                    <div className="text-lg font-bold text-slate-900">{campaign.clicks.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Engagement</div>
                    <div className="text-lg font-bold text-slate-900">{campaign.engagement}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div>
                    <span className="text-sm text-slate-600">Spend: </span>
                    <span className="font-semibold text-slate-900">{campaign.spend}</span>
                  </div>
                  <div>
                    <span className="text-sm text-slate-600">Leads: </span>
                    <span className="font-semibold text-emerald-600">{campaign.leads}</span>
                  </div>
                  <div>
                    <span className="text-sm text-slate-600">CPL: </span>
                    <span className="font-semibold text-slate-900">{campaign.cpl}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* SEO Metrics */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">SEO Performance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🔍</span>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Organic Traffic</div>
                    <div className="text-2xl font-bold text-slate-900">{seoMetrics.organicTraffic.toLocaleString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-600 font-semibold">↑ {seoMetrics.organicChange}%</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🔑</span>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Ranking Keywords</div>
                    <div className="text-2xl font-bold text-slate-900">{seoMetrics.keywords}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-600 font-semibold">+{seoMetrics.keywordsChange}</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🔗</span>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Backlinks</div>
                    <div className="text-2xl font-bold text-slate-900">{seoMetrics.backlinks}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-600 font-semibold">+{seoMetrics.backlinksChange}</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">⭐</span>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Domain Authority</div>
                    <div className="text-2xl font-bold text-slate-900">{seoMetrics.domainAuthority}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-600 font-semibold">+{seoMetrics.authorityChange}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Pages */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Top Performing Pages</h2>
            <div className="space-y-4">
              {topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900">{page.page}</div>
                    <div className="text-sm text-slate-600 mt-1">
                      {page.views.toLocaleString()} views
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-600">Conversion</div>
                    <div className="text-lg font-bold text-emerald-600">{page.conversion}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Management */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Recent Blog Posts</h2>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm">
              New Post
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Title</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Views</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((post, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4 font-medium text-slate-900">{post.title}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        post.status === "Published" ? "bg-green-100 text-green-700" :
                        post.status === "Draft" ? "bg-slate-100 text-slate-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600">{post.views.toLocaleString()}</td>
                    <td className="py-4 px-4 text-slate-600">{post.date}</td>
                    <td className="py-4 px-4">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Google Analytics Integration Notice */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl shadow-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Powered by Advanced Analytics</h2>
          <p className="text-xl mb-6 opacity-90">
            Integrated with Google Analytics, Search Console, PageSpeed Insights, and major social platforms
          </p>
          <div className="flex items-center justify-center space-x-8 flex-wrap">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <div className="text-sm">Google Analytics</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🔍</div>
              <div className="text-sm">Search Console</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">⚡</div>
              <div className="text-sm">PageSpeed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">👥</div>
              <div className="text-sm">Social Media</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🤖</div>
              <div className="text-sm">AI Optimization</div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Creation Modal */}
      {showCampaignModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Create Campaign</h2>
                <p className="text-slate-600 mt-1">Launch a new social media marketing campaign</p>
              </div>
              <button
                onClick={() => setShowCampaignModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-8 py-6 space-y-6">
              {/* Campaign Name */}
              <div>
                <label htmlFor="campaignName" className="block text-sm font-semibold text-slate-700 mb-2">
                  Campaign Name
                </label>
                <input
                  type="text"
                  id="campaignName"
                  placeholder="e.g., Spring 2024 Cemetery Services"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Select Platforms
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Facebook', icon: '📘', color: 'bg-blue-50 border-blue-200 hover:border-blue-400' },
                    { name: 'Instagram', icon: '📷', color: 'bg-pink-50 border-pink-200 hover:border-pink-400' },
                    { name: 'LinkedIn', icon: '💼', color: 'bg-blue-50 border-blue-300 hover:border-blue-500' },
                    { name: 'Twitter/X', icon: '🐦', color: 'bg-sky-50 border-sky-200 hover:border-sky-400' },
                  ].map((platform) => (
                    <div
                      key={platform.name}
                      className={`${platform.color} border-2 rounded-lg p-4 cursor-pointer transition-all hover:scale-105`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id={platform.name}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <label htmlFor={platform.name} className="flex items-center space-x-2 cursor-pointer">
                          <span className="text-2xl">{platform.icon}</span>
                          <span className="font-semibold text-slate-700">{platform.name}</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Campaign Type */}
              <div>
                <label htmlFor="campaignType" className="block text-sm font-semibold text-slate-700 mb-2">
                  Campaign Type
                </label>
                <select
                  id="campaignType"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Brand Awareness</option>
                  <option>Lead Generation</option>
                  <option>Engagement</option>
                  <option>Traffic</option>
                  <option>Conversions</option>
                  <option>Event Promotion</option>
                </select>
              </div>

              {/* Campaign Message */}
              <div>
                <label htmlFor="campaignMessage" className="block text-sm font-semibold text-slate-700 mb-2">
                  Campaign Message
                </label>
                <textarea
                  id="campaignMessage"
                  rows={4}
                  placeholder="Write your campaign message here..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
                <p className="text-xs text-slate-500 mt-1">This will be adapted for each platform&apos;s best practices</p>
              </div>

              {/* Budget & Duration */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold text-slate-700 mb-2">
                    Budget (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <input
                      type="number"
                      id="budget"
                      placeholder="500"
                      className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="duration" className="block text-sm font-semibold text-slate-700 mb-2">
                    Duration (days)
                  </label>
                  <input
                    type="number"
                    id="duration"
                    placeholder="30"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Target Audience
                </label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="age-18-34" className="w-4 h-4 text-blue-600 rounded" />
                    <label htmlFor="age-18-34" className="text-slate-700">Ages 18-34</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="age-35-54" className="w-4 h-4 text-blue-600 rounded" />
                    <label htmlFor="age-35-54" className="text-slate-700">Ages 35-54</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="age-55+" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                    <label htmlFor="age-55+" className="text-slate-700">Ages 55+</label>
                  </div>
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label htmlFor="startDate" className="block text-sm font-semibold text-slate-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* API Integration Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">🔗</div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">API Integration</h4>
                    <p className="text-sm text-slate-600">
                      This campaign will be published via official social media APIs. Make sure your accounts are connected in Settings.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-8 py-6 flex items-center justify-between rounded-b-2xl">
              <button
                onClick={() => setShowCampaignModal(false)}
                className="px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors font-semibold"
              >
                Cancel
              </button>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    alert('Campaign saved as draft! (Demo only)');
                    setShowCampaignModal(false);
                  }}
                  className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-semibold"
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => {
                    alert('Campaign launched! Social APIs would be called here. (Demo only)');
                    setShowCampaignModal(false);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all font-semibold shadow-lg"
                >
                  Launch Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

