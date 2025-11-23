'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Home,
  FileText,
  Image as ImageIcon,
  Settings,
  LogOut,
  BarChart3,
  FolderOpen,
  PlusCircle,
  Layout,
  Server,
  UsersRound,
} from 'lucide-react';

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

  const handleLogout = () => {
    document.cookie = 'adminAuth=; path=/; max-age=0'; // Clear cookie
    sessionStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  if (!isAuthenticated) {
    return null; // or loading spinner
  }

  const menuItems = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      href: '/admin/dashboard', 
      active: true,
      section: 'main'
    },
    { 
      icon: Layout, 
      label: 'Hero Section', 
      href: '/admin/hero', 
      active: false,
      section: 'content'
    },
    { 
      icon: FileText, 
      label: 'Home Sections', 
      href: '/admin/home-content', 
      active: false,
      section: 'content',
      description: 'CCTV, Low Current, Cabling, Clients'
    },
    { 
      icon: Server, 
      label: 'Data Center', 
      href: '/admin/data-center-home', 
      active: false,
      section: 'content'
    },
    { 
      icon: FolderOpen, 
      label: 'Projects', 
      href: '/admin/projects', 
      active: false,
      section: 'content'
    },
    { 
      icon: UsersRound, 
      label: 'Team Members', 
      href: '/admin/team', 
      active: false,
      section: 'manage'
    },
    { 
      icon: ImageIcon, 
      label: 'Media Library', 
      href: '/admin/media', 
      active: false,
      section: 'manage'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      href: '/admin/settings', 
      active: false,
      section: 'manage'
    },
  ];

  const stats = [
    { label: 'Total Projects', value: '12', change: '+2 this month', color: 'blue' },
    { label: 'Team Members', value: '8', change: 'No change', color: 'green' },
    { label: 'Media Files', value: '156', change: '+12 this week', color: 'purple' },
    { label: 'Page Views', value: '2.4K', change: '+18% this month', color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 z-40">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-slate-200">
            <h1 className="text-xl font-bold text-slate-900">WeCare Tech</h1>
            <p className="text-xs text-slate-500 mt-1">Content Management</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
            {/* Main Section */}
            <div>
              {menuItems
                .filter((item) => item.section === 'main')
                .map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      item.active
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </a>
                ))}
            </div>

            {/* Content Management */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-2">
                Content Management
              </p>
              <div className="space-y-1">
                {menuItems
                  .filter((item) => item.section === 'content')
                  .map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`flex items-start gap-3 px-4 py-3 rounded-lg transition-all ${
                        item.active
                          ? 'bg-blue-50 text-blue-600 font-semibold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <item.icon className="w-5 h-5 mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <span className="block">{item.label}</span>
                        {item.description && (
                          <span className="text-xs text-slate-400 block mt-0.5">
                            {item.description}
                          </span>
                        )}
                      </div>
                    </a>
                  ))}
              </div>
            </div>

            {/* System Management */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-2">
                System
              </p>
              <div className="space-y-1">
                {menuItems
                  .filter((item) => item.section === 'manage')
                  .map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        item.active
                          ? 'bg-blue-50 text-blue-600 font-semibold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </a>
                  ))}
              </div>
            </div>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-slate-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

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
