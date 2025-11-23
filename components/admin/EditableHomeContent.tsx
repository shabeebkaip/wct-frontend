'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Save } from 'lucide-react';
import CCTVSection from './home-sections/CCTVSection';
import LowCurrentSection from './home-sections/LowCurrentSection';
import StructuredCablingSection from './home-sections/StructuredCablingSection';
import ClientsSection from './home-sections/ClientsSection';

export default function EditableHomeContent() {
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
      const res = await fetch('/api/home-page');
      const result = await res.json();
      setData(result);
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
      const res = await fetch('/api/home-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        await fetch('/api/home-page/revalidate', { method: 'POST' });
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
    setData({ ...data, ...updates });
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Floating Save Button */}
      {hasChanges && (
        <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-3 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save All Changes
              </>
            )}
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Home Page Content</h1>
              <p className="text-gray-600 mt-1">Manage all sections of your homepage</p>
            </div>
            {hasChanges && (
              <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium">
                Unsaved Changes
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* CCTV Section */}
        <CCTVSection
          data={data}
          updateData={updateData}
          editingField={editingField}
          setEditingField={setEditingField}
        />

        {/* Low Current Section */}
        <LowCurrentSection
          data={data}
          updateData={updateData}
          editingField={editingField}
          setEditingField={setEditingField}
        />

        {/* Structured Cabling Section */}
        <StructuredCablingSection
          data={data}
          updateData={updateData}
          editingField={editingField}
          setEditingField={setEditingField}
        />

        {/* Clients Section */}
        <ClientsSection
          data={data}
          updateData={updateData}
          editingField={editingField}
          setEditingField={setEditingField}
        />
      </div>
    </div>
  );
}
