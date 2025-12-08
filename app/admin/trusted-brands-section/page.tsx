'use client';

import { useState, useEffect } from 'react';
import TrustedBrandsSection from '@/components/admin/home-sections/TrustedBrandsSection';
import AdminHeader from '@/components/admin/shared/AdminHeader';

export default function TrustedBrandsSectionPage() {
  const [data, setData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/trusted-brands');
      const brandData = await res.json();
      
      setData({
        cctvSection: {} as never,
        lowCurrentSection: {} as never,
        structuredCablingSection: {} as never,
        clientsSection: {} as never,
        trustedBrandsSection: brandData,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage({ type: 'error', text: 'Failed to load data' });
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (updates: Partial<HomePageData>) => {
    if (!data) return;

    const updatedData = { ...data, ...updates };
    setData(updatedData);

    // Auto-save after a short delay
    setSaving(true);
    try {
      const res = await fetch('/api/trusted-brands', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates.trustedBrandsSection),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: '✓ Saved successfully' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        throw new Error('Save failed');
      }
    } catch (error) {
      console.error('Error saving:', error);
      setMessage({ type: 'error', text: 'Failed to save changes' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl">Failed to load data</p>
          <button
            onClick={fetchData}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        title="Trusted Brands Section"
        description="Manage brand logos and categories"
        backHref="/admin/home"
        backLabel="Back to Home Sections"
        previewHref="/"
        hasChanges={saving}
        saving={saving}
        showSaveButton={false}
      />

      {/* Status Messages */}
      {message && (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div
            className={`px-4 py-3 rounded-lg text-sm font-medium ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <TrustedBrandsSection
          data={data}
          updateData={updateData}
          editingField={editingField}
          setEditingField={setEditingField}
        />
      </div>
    </div>
  );
}
