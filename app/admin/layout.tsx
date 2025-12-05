'use client';

import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/shared/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm shrink-0 overflow-hidden">
        <AdminSidebar />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
