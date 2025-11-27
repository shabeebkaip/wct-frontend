'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import AdminHeader from '@/components/admin/shared/AdminHeader';

interface ContactInfo {
  icon: string;
  title: string;
  details: string[];
  link?: string;
  description?: string;
}

interface Reason {
  icon: string;
  title: string;
  description: string;
}

interface ContactPageData {
  _id?: string;
  badge: string;
  title: string;
  description: string;
  contactInfo: ContactInfo[];
  reasons?: Reason[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

export default function ContactPageAdmin() {
  const [data, setData] = useState<ContactPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Available icons for selection
  const availableIcons = [
    'Phone',
    'Mail',
    'MapPin',
    'Clock',
    'Users',
    'CheckCircle',
    'MessageSquare',
    'Building2',
    'Calendar',
    'Globe',
    'Headphones',
    'Info',
    'Send',
    'Shield',
    'Star',
    'Target',
    'TrendingUp',
    'Zap',
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/contact-page');
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
      const res = await fetch('/api/contact-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
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

  const updateData = (updates: Partial<ContactPageData>) => {
    if (!data) return;
    setData({ ...data, ...updates });
    setHasChanges(true);
  };

  const addContactInfo = () => {
    if (!data) return;
    updateData({
      contactInfo: [
        ...data.contactInfo,
        {
          icon: 'Phone',
          title: 'New Contact',
          details: [''],
        },
      ],
    });
  };

  const updateContactInfo = (index: number, updates: Partial<ContactInfo>) => {
    if (!data) return;
    const newContactInfo = [...data.contactInfo];
    newContactInfo[index] = { ...newContactInfo[index], ...updates };
    updateData({ contactInfo: newContactInfo });
  };

  const deleteContactInfo = (index: number) => {
    if (!data) return;
    updateData({
      contactInfo: data.contactInfo.filter((_, i) => i !== index),
    });
  };

  const addDetail = (contactIndex: number) => {
    if (!data) return;
    const newContactInfo = [...data.contactInfo];
    newContactInfo[contactIndex].details.push('');
    updateData({ contactInfo: newContactInfo });
  };

  const updateDetail = (contactIndex: number, detailIndex: number, value: string) => {
    if (!data) return;
    const newContactInfo = [...data.contactInfo];
    newContactInfo[contactIndex].details[detailIndex] = value;
    updateData({ contactInfo: newContactInfo });
  };

  const deleteDetail = (contactIndex: number, detailIndex: number) => {
    if (!data) return;
    const newContactInfo = [...data.contactInfo];
    newContactInfo[contactIndex].details = newContactInfo[contactIndex].details.filter(
      (_, i) => i !== detailIndex
    );
    updateData({ contactInfo: newContactInfo });
  };

  const addReason = () => {
    if (!data) return;
    const currentReasons = data.reasons || [];
    updateData({
      reasons: [
        ...currentReasons,
        {
          icon: 'Users',
          title: 'New Reason',
          description: 'Description',
        },
      ],
    });
  };

  const updateReason = (index: number, updates: Partial<Reason>) => {
    if (!data || !data.reasons) return;
    const newReasons = [...data.reasons];
    newReasons[index] = { ...newReasons[index], ...updates };
    updateData({ reasons: newReasons });
  };

  const deleteReason = (index: number) => {
    if (!data || !data.reasons) return;
    updateData({
      reasons: data.reasons.filter((_, i) => i !== index),
    });
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
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        title="Contact Page"
        description="Manage contact information and details"
        backHref="/admin/dashboard"
        previewHref="/contact"
        hasChanges={hasChanges}
        saving={saving}
        onSave={handleSave}
      />

      <div className="container mx-auto p-6 space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Page Header</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Badge</label>
              <input
                type="text"
                value={data.badge}
                onChange={(e) => updateData({ badge: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => updateData({ title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                value={data.description}
                onChange={(e) => updateData({ description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
            <button
              onClick={addContactInfo}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Contact Info
            </button>
          </div>

          <div className="space-y-6">
            {data.contactInfo.map((info, contactIndex) => (
              <div key={contactIndex} className="p-6 bg-gray-50 rounded-xl border border-gray-200 relative">
                <button
                  onClick={() => deleteContactInfo(contactIndex)}
                  className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Icon</label>
                    <select
                      value={info.icon}
                      onChange={(e) => updateContactInfo(contactIndex, { icon: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    >
                      {availableIcons.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={info.title}
                      onChange={(e) => updateContactInfo(contactIndex, { title: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Link (optional)</label>
                    <input
                      type="text"
                      value={info.link || ''}
                      onChange={(e) => updateContactInfo(contactIndex, { link: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="tel:, mailto:, or https://"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description (optional)</label>
                    <input
                      type="text"
                      value={info.description || ''}
                      onChange={(e) => updateContactInfo(contactIndex, { description: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">Details</label>
                    <button
                      onClick={() => addDetail(contactIndex)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      + Add Detail
                    </button>
                  </div>
                  <div className="space-y-2">
                    {info.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={detail}
                          onChange={(e) => updateDetail(contactIndex, detailIndex, e.target.value)}
                          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                        {info.details.length > 1 && (
                          <button
                            onClick={() => deleteDetail(contactIndex, detailIndex)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reasons Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Why Contact Us Reasons</h2>
            <button
              onClick={addReason}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Reason
            </button>
          </div>

          <div className="space-y-6">
            {(data.reasons || []).map((reason, reasonIndex) => (
              <div key={reasonIndex} className="p-6 bg-gray-50 rounded-xl border border-gray-200 relative">
                <button
                  onClick={() => deleteReason(reasonIndex)}
                  className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Icon</label>
                    <select
                      value={reason.icon}
                      onChange={(e) => updateReason(reasonIndex, { icon: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    >
                      {availableIcons.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={reason.title}
                      onChange={(e) => updateReason(reasonIndex, { title: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={reason.description}
                    onChange={(e) => updateReason(reasonIndex, { description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Social Media Links</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn</label>
              <input
                type="url"
                value={data.socialLinks?.linkedin || ''}
                onChange={(e) => updateData({ socialLinks: { ...data.socialLinks, linkedin: e.target.value } })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="https://linkedin.com/company/..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Twitter</label>
              <input
                type="url"
                value={data.socialLinks?.twitter || ''}
                onChange={(e) => updateData({ socialLinks: { ...data.socialLinks, twitter: e.target.value } })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="https://twitter.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Facebook</label>
              <input
                type="url"
                value={data.socialLinks?.facebook || ''}
                onChange={(e) => updateData({ socialLinks: { ...data.socialLinks, facebook: e.target.value } })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="https://facebook.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Instagram</label>
              <input
                type="url"
                value={data.socialLinks?.instagram || ''}
                onChange={(e) => updateData({ socialLinks: { ...data.socialLinks, instagram: e.target.value } })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="https://instagram.com/..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
