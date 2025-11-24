'use client';

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import ClientsSection from '@/components/admin/home-sections/ClientsSection';
import AdminHeader from '@/components/admin/shared/AdminHeader';

export default function ClientsSectionPage() {
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
      const res = await fetch('/api/clients-section');
      const result = await res.json();
      setData({ clientsSection: result } as HomePageData);
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
      const res = await fetch('/api/clients-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.clientsSection),
      });

      if (res.ok) {
        await fetch('/api/clients-section/revalidate', { method: 'POST' });
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
    if (updates.clientsSection) {
      newData.clientsSection = {
        ...data.clientsSection,
        ...updates.clientsSection,
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
      <AdminHeader
        title="Clients Section"
        description="Manage client logos and testimonials"
        backHref="/admin/dashboard"
        previewHref="/"
        hasChanges={hasChanges}
        saving={saving}
        onSave={handleSave}
      />

      <div className="container mx-auto p-6">
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
