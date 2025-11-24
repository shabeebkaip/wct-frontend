'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Plus, Trash2, Upload } from 'lucide-react';

interface ClientsSectionProps {
  data: HomePageData;
  updateData: (updates: Partial<HomePageData>) => void;
  editingField: string | null;
  setEditingField: (field: string | null) => void;
}

export default function ClientsSection({
  data,
  updateData,
  editingField,
  setEditingField,
}: ClientsSectionProps) {
  const EditableText = ({
    value,
    onChange,
    fieldKey,
    multiline = false,
    className = '',
  }: {
    value: string;
    onChange: (value: string) => void;
    fieldKey: string;
    multiline?: boolean;
    className?: string;
  }) => {
    const [localValue, setLocalValue] = React.useState(value);
    const isEditing = editingField === fieldKey;

    React.useEffect(() => {
      setLocalValue(value);
    }, [value]);

    const handleBlur = () => {
      setEditingField(null);
      if (localValue !== value) {
        onChange(localValue);
      }
    };

    if (multiline) {
      return (
        <textarea
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onFocus={() => setEditingField(fieldKey)}
          onBlur={handleBlur}
          className={`${className} ${
            isEditing ? 'ring-2 ring-green-500' : 'ring-1 ring-gray-200'
          } w-full px-3 py-2 rounded-lg transition-all bg-white/50 hover:bg-white focus:bg-white text-gray-900`}
          rows={3}
        />
      );
    }

    return (
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onFocus={() => setEditingField(fieldKey)}
        onBlur={handleBlur}
        className={`${className} ${
          isEditing ? 'ring-2 ring-green-500' : 'ring-1 ring-gray-200'
        } w-full px-3 py-2 rounded-lg transition-all bg-white/50 hover:bg-white focus:bg-white text-gray-900`}
      />
    );
  };

  const handleLogoUpload = async (index: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const { url } = await res.json();
        const newLogos = [...data.clientsSection.logos];
        newLogos[index] = { ...newLogos[index], src: url };
        updateData({
          clientsSection: { ...data.clientsSection, logos: newLogos },
        });
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          <LucideIcons.Users className="inline w-6 h-6 mr-2 text-green-600" />
          Clients Section
        </h2>
        <p className="text-gray-600">Manage client logos and information</p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold text-gray-700">Client Logos</label>
            <button
              onClick={() => {
                const newLogo = {
                  src: '/placeholder-logo.png',
                  alt: 'Client Logo',
                };
                updateData({
                  clientsSection: {
                    ...data.clientsSection,
                    logos: [...(data.clientsSection.logos || []), newLogo],
                  },
                });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Logo
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(data.clientsSection.logos || []).map((logo, index: number) => (
              <div
                key={index}
                className="group relative bg-green-50 border border-green-200 rounded-xl p-4 hover:shadow-lg transition-all"
              >
                <button
                  onClick={() => {
                    const newLogos = (data.clientsSection.logos || []).filter((_, i) => i !== index);
                    updateData({
                      clientsSection: { ...data.clientsSection, logos: newLogos },
                    });
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200 z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="space-y-3">
                  <div className="relative aspect-square bg-white rounded-lg border-2 border-dashed border-gray-300 overflow-hidden group/upload">
                    {logo.src && (
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="w-full h-full object-contain"
                      />
                    )}
                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover/upload:opacity-100 transition-opacity cursor-pointer">
                      <div className="text-center text-white">
                        <Upload className="w-6 h-6 mx-auto mb-1" />
                        <span className="text-xs">Upload</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleLogoUpload(index, file);
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Alt Text</label>
                    <EditableText
                      value={logo.alt}
                      onChange={(value) => {
                        const newLogos = [...data.clientsSection.logos];
                        newLogos[index] = { ...logo, alt: value };
                        updateData({
                          clientsSection: { ...data.clientsSection, logos: newLogos },
                        });
                      }}
                      fieldKey={`client-logo-alt-${index}`}
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
