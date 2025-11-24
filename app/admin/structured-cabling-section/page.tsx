'use client';

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import StructuredCablingSection from '@/components/admin/home-sections/StructuredCablingSection';
import AdminHeader from '@/components/admin/shared/AdminHeader';
import { StructuredCablingData } from '@/types/structuredCabling';

export default function StructuredCablingSectionPage() {
  const [data, setData] = useState<{ structuredCablingSection: StructuredCablingData } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/structured-cabling-section');
      const result = await res.json();
      setData({ structuredCablingSection: result });
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
      const res = await fetch('/api/structured-cabling-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.structuredCablingSection),
      });

      if (res.ok) {
        await fetch('/api/structured-cabling-section/revalidate', { method: 'POST' });
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

  const updateData = (updates: { structuredCablingSection: StructuredCablingData }) => {
    if (!data) return;
    const newData = { ...data };
    if (updates.structuredCablingSection) {
      newData.structuredCablingSection = {
        ...data.structuredCablingSection,
        ...updates.structuredCablingSection,
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
console.log('Rendered StructuredCablingSectionPage with data:', data);
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <AdminHeader
        title="Structured Cabling Section"
        description="Manage cabling infrastructure and solutions"
        backHref="/admin/dashboard"
        previewHref="/solutions/structured-cabling"
        hasChanges={hasChanges}
        saving={saving}
        onSave={handleSave}
      />

      <div className="container mx-auto p-6">
        <StructuredCablingSection
          data={data}
          updateData={updateData}
          editingField={editingField}
          setEditingField={setEditingField}
        />
      </div>
    </div>
  );
}
