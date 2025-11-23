'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import EditableDataCenterHome from '@/components/admin/EditableDataCenterHome';

export default function DataCenterHomeEditor() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const auth = sessionStorage.getItem('adminAuth');
      if (auth !== 'true') {
        router.push('/admin/login');
      } else {
        setMounted(true);
      }
    };
    
    checkAuth();
  }, [router]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-300" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-white">Data Center - Live Edit Mode</h1>
                <p className="text-xs text-slate-400">Click on any text to edit directly</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Inline Editable Content */}
      <main>
        <EditableDataCenterHome isEditMode={true} />
      </main>
    </div>
  );
}
