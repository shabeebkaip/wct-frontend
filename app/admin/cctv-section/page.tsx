'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import CCTVSection from '@/components/admin/home-sections/CCTVSection';

export default function CCTVSectionPage() {
  const [data, setData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/cctv-section');
      const result = await res.json();
      setData({ cctvSection: result } as HomePageData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch('/api/cctv-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.cctvSection),
      });

      if (res.ok) {
        await fetch('/api/cctv-section/revalidate', { method: 'POST' });
        setHasChanges(false);
        alert('✓ Changes saved successfully!');
      } else {
        alert('✗ Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('✗ Error saving changes');
    } finally {
      setSaving(false);
    }
  };

  const updateData = (updates: Partial<HomePageData>) => {
    if (!data) return;
    const newData = { ...data };
    if (updates.cctvSection) {
      newData.cctvSection = {
        ...data.cctvSection,
        ...updates.cctvSection,
      };
    }
    setData(newData);
    setHasChanges(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Error loading data</p>
          <button onClick={fetchData} className="mt-4 text-blue-600 hover:underline">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/home"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors group"
                title="Back to Home Sections"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Back</span>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">CCTV Surveillance Section</h1>
                <p className="text-gray-600 mt-1">Manage CCTV solutions and features</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/solutions/cctv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Visit Website
              </Link>
              {hasChanges && (
                <span className="px-3 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium">
                  Unsaved Changes
                </span>
              )}
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <CCTVSection
          data={data}
          updateData={updateData}
          editingField={editingField}
          setEditingField={setEditingField}
        />
      </div>
    </div>
  );
}
