'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FileText,
  PlusCircle,
  FolderOpen,
  Mail,
  TrendingUp,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import AdminSidebar from '@/components/admin/shared/AdminSidebar';

interface RecentProject {
  _id: string;
  title: string;
  category: string;
  client: string;
  createdAt: string;
}

interface RecentEnquiry {
  _id: string;
  name: string;
  email: string;
  service: string;
  status: string;
  createdAt: string;
  source: string;
}

interface Analytics {
  projects: {
    total: number;
    thisMonth: number;
    byCategory: { _id: string; count: number }[];
    recent: RecentProject[];
  };
  enquiries: {
    total: number;
    new: number;
    inProgress: number;
    resolved: number;
    archived: number;
    thisMonth: number;
    thisWeek: number;
    bySource: { _id: string; count: number }[];
    byService: { _id: string; count: number }[];
    recent: RecentEnquiry[];
    responseRate: number;
  };
}

// Cache analytics data in memory
let cachedAnalytics: Analytics | null = null;
let cacheTime: number = 0;
const CACHE_DURATION = 30000; // 30 seconds

export default function AdminDashboard() {
  const router = useRouter();
  const [analytics, setAnalytics] = useState<Analytics | null>(cachedAnalytics);
  const [loading, setLoading] = useState(!cachedAnalytics);

  useEffect(() => {
    const now = Date.now();
    // Use cache if it's fresh (less than 30 seconds old)
    if (cachedAnalytics && now - cacheTime < CACHE_DURATION) {
      setAnalytics(cachedAnalytics);
      setLoading(false);
      return;
    }
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/analytics', {
        cache: 'force-cache',
        next: { revalidate: 30 }
      });
      const data = await res.json();
      cachedAnalytics = data;
      cacheTime = Date.now();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Welcome back! Here&apos;s what&apos;s happening with your website.</p>
        </div>

        {loading ? (
          /* Skeleton Loading */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 animate-pulse">
                  <div className="h-10 bg-slate-200 rounded mb-4 w-10"></div>
                  <div className="h-8 bg-slate-200 rounded mb-2 w-16"></div>
                  <div className="h-4 bg-slate-200 rounded w-24"></div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 animate-pulse">
                  <div className="h-6 bg-slate-200 rounded mb-4 w-32"></div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-16 bg-slate-200 rounded"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : !analytics ? (
          <div className="text-center py-12 text-slate-500">Failed to load analytics data</div>
        ) : (
          <>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Projects */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FolderOpen className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-1">{analytics.projects.total}</p>
            <p className="text-sm font-medium text-slate-600 mb-2">Total Projects</p>
            <p className="text-xs text-green-600">+{analytics.projects.thisMonth} this month</p>
          </div>

          {/* New Enquiries */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Mail className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-1">{analytics.enquiries.new}</p>
            <p className="text-sm font-medium text-slate-600 mb-2">New Enquiries</p>
            <p className="text-xs text-slate-500">Total: {analytics.enquiries.total}</p>
          </div>

          {/* Response Rate */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-1">{analytics.enquiries.responseRate}%</p>
            <p className="text-sm font-medium text-slate-600 mb-2">Response Rate</p>
            <p className="text-xs text-green-600">{analytics.enquiries.resolved} resolved</p>
          </div>

          {/* This Week Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-1">{analytics.enquiries.thisWeek}</p>
            <p className="text-sm font-medium text-slate-600 mb-2">This Week</p>
            <p className="text-xs text-purple-600">{analytics.enquiries.thisMonth} this month</p>
          </div>
        </div>

        {/* Enquiries Status Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Enquiries by Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="font-medium text-slate-700">New</span>
                </div>
                <span className="font-bold text-blue-600">{analytics.enquiries.new}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span className="font-medium text-slate-700">In Progress</span>
                </div>
                <span className="font-bold text-yellow-600">{analytics.enquiries.inProgress}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="font-medium text-slate-700">Resolved</span>
                </div>
                <span className="font-bold text-green-600">{analytics.enquiries.resolved}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span className="font-medium text-slate-700">Archived</span>
                </div>
                <span className="font-bold text-gray-600">{analytics.enquiries.archived}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Top Services Requested</h2>
            <div className="space-y-3">
              {analytics.enquiries.byService.map((service, index) => (
                <div key={service._id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="font-medium text-slate-700">{service._id}</span>
                  </div>
                  <span className="font-bold text-slate-900">{service.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link
              href="/admin/enquiries"
              className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all group"
            >
              <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-all">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-orange-600">View Enquiries</p>
                <p className="text-sm text-slate-500">{analytics.enquiries.new} new</p>
              </div>
            </Link>

            <Link
              href="/admin/projects"
              className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
            >
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-all">
                <PlusCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-green-600">Add New Project</p>
                <p className="text-sm text-slate-500">Showcase your work</p>
              </div>
            </Link>

            <Link
              href="/admin/hero"
              className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-all">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-blue-600">Edit Content</p>
                <p className="text-sm text-slate-500">Update pages</p>
              </div>
            </Link>

            <Link
              href="/admin/contact-page"
              className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all group"
            >
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-all">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-purple-600">Contact Page</p>
                <p className="text-sm text-slate-500">Manage contacts</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Enquiries</h2>
            <div className="space-y-3">
              {analytics.enquiries.recent.length > 0 ? (
                analytics.enquiries.recent.map((enquiry) => (
                  <div key={enquiry._id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{enquiry.name}</p>
                      <p className="text-sm text-slate-500 truncate">{enquiry.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                          enquiry.status === 'new' ? 'bg-blue-100 text-blue-700' :
                          enquiry.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                          enquiry.status === 'resolved' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {enquiry.status}
                        </span>
                        <span className="text-xs text-slate-400">
                          {formatDate(enquiry.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-slate-500 py-8">No enquiries yet</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Projects</h2>
            <div className="space-y-3">
              {analytics.projects.recent.length > 0 ? (
                analytics.projects.recent.map((project) => (
                  <div key={project._id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FolderOpen className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{project.title}</p>
                      <p className="text-sm text-slate-500 truncate">{project.client}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                          {project.category}
                        </span>
                        <span className="text-xs text-slate-400">
                          {formatDate(project.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-slate-500 py-8">No projects yet</p>
              )}
            </div>
          </div>
        </div>
        </> 
        )}
      </main>
    </div>
  );
}
