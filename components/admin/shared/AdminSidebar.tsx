'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  FileText,
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
  ];

  const contentItems = [
    { 
      icon: FolderOpen, 
      label: 'Projects', 
      href: '/admin/projects',
    },
    { 
      icon: FileText, 
      label: 'Solutions', 
      href: '/admin/solutions',
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
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 z-40">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <Link href="/admin/dashboard" className="p-4 border-b border-slate-200 block">
          <div className="relative h-12 w-full">
            <Image
              src="/logo.png"
              alt="WeCare Tech"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">Content Management</p>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* Main Section */}
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
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
              </Link>
            ))}
          </div>

          {/* Content Management */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-2">
              Content Management
            </p>
            
            <div className="space-y-1">
              {/* Projects & Solutions */}
              {contentItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              {/* Home Sections with Sublists */}
              <Link
                href="/admin/home"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive('/admin/home')
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">Home Sections</span>
              </Link>
              
              {/* Sublists */}
              <div className="ml-8 space-y-0.5">
                {homeSubItems.map((item) => (
                  <Link
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
                  </Link>
                ))}
              </div>
              
              {/* About Page */}
              <Link
                href="/admin/about-page"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive('/admin/about-page')
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <UsersRound className="w-5 h-5" />
                <span className="font-medium">About Us Page</span>
              </Link>

              {/* Contact Page */}
              <Link
                href="/admin/contact-page"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive('/admin/contact-page')
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Mail className="w-5 h-5" />
                <span className="font-medium">Contact Us Page</span>
              </Link>
            </div>
          </div>

          {/* System Management */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-2">
              System
            </p>
            <div className="space-y-1">
              {systemItems.map((item) => (
                <Link
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
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-slate-200">
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
