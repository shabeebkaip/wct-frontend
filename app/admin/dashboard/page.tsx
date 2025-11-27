'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Image as ImageIcon,
  BarChart3,
  PlusCircle,
  FolderOpen,
} from 'lucide-react';
import AdminSidebar from '@/components/admin/shared/AdminSidebar';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated] = useState(() => {
    // Check authentication on initial render
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('adminAuth') === 'true';
    }
    return false;
  });

  useEffect(() => {
    // Redirect if not authenticated
    const auth = sessionStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/admin/login');
    }
  }, [router]);

  if (!isAuthenticated) {
    return null; // or loading spinner
  }

  const stats = [
    { label: 'Total Projects', value: '12', change: '+2 this month', color: 'blue' },
    { label: 'Team Members', value: '8', change: 'No change', color: 'green' },
    { label: 'Media Files', value: '156', change: '+12 this week', color: 'purple' },
    { label: 'Page Views', value: '2.4K', change: '+18% this month', color: 'orange' },
  ];

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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 bg-${stat.color}-100 rounded-lg`}>
                  <BarChart3 className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-slate-600 mb-2">{stat.label}</p>
              <p className="text-xs text-slate-500">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/hero"
              className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-all">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-blue-600">Edit Hero Section</p>
                <p className="text-sm text-slate-500">Update homepage content</p>
              </div>
            </a>

            <a
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
            </a>

            <a
              href="/admin/media"
              className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all group"
            >
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-all">
                <ImageIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-purple-600">Upload Media</p>
                <p className="text-sm text-slate-500">Manage images & files</p>
              </div>
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">Hero section updated</p>
                <p className="text-sm text-slate-500">Background image changed</p>
                <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg">
                <FolderOpen className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">New project added</p>
                <p className="text-sm text-slate-500">Makkah Bus Company project</p>
                <p className="text-xs text-slate-400 mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
