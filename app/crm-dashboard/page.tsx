"use client";

import { useState } from "react";
import Link from "next/link";

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock Data
  const stats = {
    totalRevenue: "$842,450",
    revenueChange: 15.3,
    activeContracts: 47,
    contractsChange: 8,
    openWorkOrders: 23,
    workOrdersChange: -12.5,
    customerSatisfaction: "94%",
    satisfactionChange: 3.2
  };

  const salesPipeline = [
    { stage: "Lead", count: 12, value: "$45,000", color: "blue" },
    { stage: "Qualified", count: 8, value: "$89,000", color: "indigo" },
    { stage: "Proposal", count: 5, value: "$124,000", color: "purple" },
    { stage: "Negotiation", count: 3, value: "$87,000", color: "pink" },
    { stage: "Closed Won", count: 15, value: "$342,000", color: "green" }
  ];

  const recentContracts = [
    { id: "C-2024-047", customer: "Riverside Memorial Gardens", service: "Full Service", value: "$18,500", status: "Active", date: "2024-10-01" },
    { id: "C-2024-046", customer: "Thompson Family", service: "Pre-Planning", value: "$12,800", status: "Active", date: "2024-09-28" },
    { id: "C-2024-045", customer: "City Memorial Park", service: "Cremation + Memorial", value: "$8,900", status: "Pending", date: "2024-09-25" },
    { id: "C-2024-044", customer: "Johnson Estate", service: "Cemetery Plot + Marker", value: "$15,200", status: "Active", date: "2024-09-20" }
  ];

  const workOrders = [
    { id: "WO-1247", title: "Marker Leveling - Section A", assignee: "Mike Rodriguez", priority: "High", status: "In Progress", dueDate: "2024-10-16" },
    { id: "WO-1246", title: "Tree Removal - North Entrance", assignee: "David Chen", priority: "High", status: "Scheduled", dueDate: "2024-10-15" },
    { id: "WO-1245", title: "Grass Maintenance - Section B-D", assignee: "Mike Rodriguez", priority: "Medium", status: "In Progress", dueDate: "2024-10-17" },
    { id: "WO-1244", title: "Flower Planting - Memorial Garden", assignee: "Sarah Johnson", priority: "Low", status: "Completed", dueDate: "2024-10-14" },
    { id: "WO-1243", title: "Pathway Repair - West Side", assignee: "David Chen", priority: "Medium", status: "Scheduled", dueDate: "2024-10-18" }
  ];

  const recentCustomers = [
    { name: "Robert Martinez", type: "Pre-Planning", lastContact: "2 hours ago", value: "$12,400", status: "Hot" },
    { name: "Emily Watson", type: "Immediate Need", lastContact: "1 day ago", value: "$18,900", status: "Hot" },
    { name: "Thompson Family Trust", type: "Estate Planning", lastContact: "3 days ago", value: "$45,000", status: "Warm" },
    { name: "Green Valley HOA", type: "Corporate", lastContact: "1 week ago", value: "$89,000", status: "Warm" }
  ];

  const tasks = [
    { task: "Follow up with Martinez family", assignee: "Sarah J.", due: "Today", priority: "High" },
    { task: "Review Thompson contract amendments", assignee: "Mike R.", due: "Today", priority: "High" },
    { task: "Schedule site visit with Green Valley", assignee: "David C.", due: "Tomorrow", priority: "Medium" },
    { task: "Send proposal to Watson family", assignee: "Sarah J.", due: "Oct 16", priority: "Medium" },
    { task: "Update CRM records for Q3", assignee: "Admin", due: "Oct 20", priority: "Low" }
  ];

  const StatCard = ({ title, value, change, icon }: { title: string; value: string; change: number; icon: string }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-600 text-sm font-medium">{title}</span>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="text-3xl font-bold text-slate-900 mb-2">{value}</div>
      <div className={`flex items-center text-sm ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
        <span className="mr-1">{change >= 0 ? "↑" : "↓"}</span>
        <span>{Math.abs(change)}%</span>
        <span className="text-slate-500 ml-2">vs last month</span>
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
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  EternaGuard CRM
                </div>
              </Link>
            </div>
            <Link
              href="/"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">CRM Dashboard</h1>
          <p className="text-slate-600">Customer relationships, contracts, and operations management</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Revenue" value={stats.totalRevenue} change={stats.revenueChange} icon="💰" />
          <StatCard title="Active Contracts" value={stats.activeContracts.toString()} change={stats.contractsChange} icon="📄" />
          <StatCard title="Open Work Orders" value={stats.openWorkOrders.toString()} change={stats.workOrdersChange} icon="🔧" />
          <StatCard title="Satisfaction Rate" value={stats.customerSatisfaction} change={stats.satisfactionChange} icon="⭐" />
        </div>

        {/* Sales Pipeline */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Sales Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {salesPipeline.map((stage, index) => (
              <div key={index} className="relative">
                <div className={`bg-${stage.color}-50 border-2 border-${stage.color}-200 rounded-lg p-4 hover:shadow-md transition-shadow`}>
                  <div className={`text-sm font-semibold text-${stage.color}-700 mb-2`}>{stage.stage}</div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">{stage.count}</div>
                  <div className="text-sm text-slate-600">{stage.value}</div>
                </div>
                {index < salesPipeline.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Contracts */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Recent Contracts</h2>
              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">View All →</button>
            </div>
            <div className="space-y-4">
              {recentContracts.map((contract, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-semibold text-slate-900">{contract.customer}</div>
                      <div className="text-sm text-slate-600">{contract.id}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      contract.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {contract.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{contract.service}</span>
                    <span className="font-bold text-slate-900">{contract.value}</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">{contract.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Customers */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Recent Customers</h2>
              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">View All →</button>
            </div>
            <div className="space-y-4">
              {recentCustomers.map((customer, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-semibold text-slate-900">{customer.name}</div>
                      <div className="text-sm text-slate-600">{customer.type}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      customer.status === "Hot" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      {customer.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Last: {customer.lastContact}</span>
                    <span className="font-bold text-emerald-600">{customer.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Work Orders */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Work Orders</h2>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm">
              Create Work Order
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Task</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Assignee</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Priority</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {workOrders.map((order, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4 text-sm text-slate-600">{order.id}</td>
                    <td className="py-4 px-4 font-medium text-slate-900">{order.title}</td>
                    <td className="py-4 px-4 text-sm text-slate-600">{order.assignee}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.priority === "High" ? "bg-red-100 text-red-700" :
                        order.priority === "Medium" ? "bg-yellow-100 text-yellow-700" :
                        "bg-slate-100 text-slate-700"
                      }`}>
                        {order.priority}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Completed" ? "bg-green-100 text-green-700" :
                        order.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                        "bg-slate-100 text-slate-700"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-600">{order.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Today&apos;s Tasks</h2>
            <span className="text-sm text-slate-600">{tasks.length} tasks</span>
          </div>
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors">
                <input type="checkbox" className="w-5 h-5 text-blue-600 rounded mr-4" />
                <div className="flex-1">
                  <div className="font-medium text-slate-900">{task.task}</div>
                  <div className="text-sm text-slate-600">Assigned to {task.assignee} • Due: {task.due}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  task.priority === "High" ? "bg-red-100 text-red-700" :
                  task.priority === "Medium" ? "bg-yellow-100 text-yellow-700" :
                  "bg-slate-100 text-slate-700"
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Notice */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl shadow-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Integrated Property Management</h2>
          <p className="text-xl mb-6 opacity-90">
            Connected with EternaGuard property management system for seamless operations
          </p>
          <div className="flex items-center justify-center space-x-8 flex-wrap">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <div className="text-sm">Real-time Sync</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🔗</div>
              <div className="text-sm">Work Order Integration</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">👥</div>
              <div className="text-sm">Customer 360°</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">⚡</div>
              <div className="text-sm">Automated Workflows</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

