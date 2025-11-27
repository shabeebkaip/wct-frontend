'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
  Home,
  FileText,
  Image as ImageIcon,
  Settings,
  LogOut,
  FolderOpen,
  UsersRound,
  MessageSquare,
  Mail,
} from 'lucide-react';

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    document.cookie = 'adminAuth=; path=/; max-age=0';
    sessionStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  const isActive = (href: string) => pathname === href;

  const menuItems = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      href: '/admin/dashboard',
    },
    { 
      icon: FolderOpen, 
      label: 'Projects', 
      href: '/admin/projects',
    },
  ];

  const homeSubItems = [
    { 
      label: 'Hero Section', 
      href: '/admin/hero',
    },
    { 
      label: 'CCTV', 
      href: '/admin/cctv-section',
    },
    { 
      label: 'Low Current', 
      href: '/admin/low-current-section',
    },
    { 
      label: 'Cabling', 
      href: '/admin/structured-cabling-section',
    },
    { 
      label: 'Data Center', 
      href: '/admin/data-center-home',
    },
    { 
      label: 'Clients', 
      href: '/admin/clients-section',
    },
  ];

  const systemItems = [
    { 
      icon: MessageSquare, 
      label: 'Enquiries', 
      href: '/admin/enquiries',
    },
    { 
      icon: UsersRound, 
      label: 'Team Members', 
      href: '/admin/team',
    },
    { 
      icon: ImageIcon, 
      label: 'Media Library', 
      href: '/admin/media',
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      href: '/admin/settings',
    },
  ];

  return (
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
          <div className="space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(item.href)
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
            
            {/* Home Sections with Sublists */}
            <div className="space-y-1">
              <a
                href="/admin/home"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive('/admin/home')
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">Home Sections</span>
              </a>
              
              {/* Sublists */}
              <div className="ml-8 space-y-0.5">
                {homeSubItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                    }`}
                  >
                    <span className="text-slate-400">↳</span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
              
              {/* About Page */}
              <a
                href="/admin/about-page"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive('/admin/about-page')
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <UsersRound className="w-5 h-5" />
                <span className="font-medium">About Us Page</span>
              </a>

              {/* Contact Page */}
              <a
                href="/admin/contact-page"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive('/admin/contact-page')
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Mail className="w-5 h-5" />
                <span className="font-medium">Contact Us Page</span>
              </a>
            </div>
          </div>

          {/* System Management */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-2">
              System
            </p>
            <div className="space-y-1">
              {systemItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(item.href)
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
  );
}
