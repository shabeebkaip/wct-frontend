'use client';

import React from 'react';
import Image from 'next/image';
import { Plus, Trash2, Upload, Award, Loader2 } from 'lucide-react';

interface TrustedBrandsSectionProps {
  data: HomePageData;
  updateData: (updates: Partial<HomePageData>) => void;
  editingField: string | null;
  setEditingField: (field: string | null) => void;
}

export default function TrustedBrandsSection({
  data,
  updateData,
  editingField,
  setEditingField,
}: TrustedBrandsSectionProps) {
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
      if (!isEditing) {
        setLocalValue(value);
      }
    }, [value, isEditing]);

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
            isEditing ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-200'
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
          isEditing ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-200'
        } w-full px-3 py-2 rounded-lg transition-all bg-white/50 hover:bg-white focus:bg-white text-gray-900`}
      />
    );
  };

  const [uploadingIndex, setUploadingIndex] = React.useState<number | null>(null);

  const handleBrandUpload = async (index: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    setUploadingIndex(index);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const { secure_url, publicId, format } = await res.json();
        const newBrands = [...data.trustedBrandsSection.brands];
        newBrands[index] = { ...newBrands[index], src: secure_url, publicId, format };
        updateData({
          trustedBrandsSection: { ...data.trustedBrandsSection, brands: newBrands },
        });
      }
    } catch (error) {
      console.error('Error uploading brand logo:', error);
    } finally {
      setUploadingIndex(null);
    }
  };

  const addCategory = () => {
    const newCategory = 'New Category';
    updateData({
      trustedBrandsSection: {
        ...data.trustedBrandsSection,
        categories: [...(data.trustedBrandsSection.categories || []), newCategory],
      },
    });
  };

  const removeCategory = (index: number) => {
    const newCategories = (data.trustedBrandsSection.categories || []).filter((_, i) => i !== index);
    updateData({
      trustedBrandsSection: { ...data.trustedBrandsSection, categories: newCategories },
    });
  };

  const updateCategory = (index: number, value: string) => {
    const newCategories = [...(data.trustedBrandsSection.categories || [])];
    newCategories[index] = value;
    updateData({
      trustedBrandsSection: { ...data.trustedBrandsSection, categories: newCategories },
    });
  };

  return (
    <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          <Award className="inline w-6 h-6 mr-2 text-blue-600" />
          Trusted Brands Section
        </h2>
        <p className="text-gray-600">Manage trusted brand logos and categories</p>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Section Title</label>
          <EditableText
            value={data.trustedBrandsSection.title || 'Trusted Brands We Use'}
            onChange={(value) =>
              updateData({
                trustedBrandsSection: { ...data.trustedBrandsSection, title: value },
              })
            }
            fieldKey="brands-title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <EditableText
            value={data.trustedBrandsSection.description || ''}
            onChange={(value) =>
              updateData({
                trustedBrandsSection: { ...data.trustedBrandsSection, description: value },
              })
            }
            fieldKey="brands-description"
            multiline
          />
        </div>

        {/* Categories */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold text-gray-700">Product Categories</label>
            <button
              onClick={addCategory}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </button>
          </div>

          <div className="space-y-2">
            {(data.trustedBrandsSection.categories || []).map((category, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <EditableText
                  value={category}
                  onChange={(value) => updateCategory(index, value)}
                  fieldKey={`brand-category-${index}`}
                  className="flex-1"
                />
                <button
                  onClick={() => removeCategory(index)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Logos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold text-gray-700">Brand Logos</label>
            <button
              onClick={() => {
                const newBrand = {
                  src: '/placeholder-logo.png',
                  alt: 'Brand Logo',
                  width: 120,
                  height: 60,
                };
                updateData({
                  trustedBrandsSection: {
                    ...data.trustedBrandsSection,
                    brands: [...(data.trustedBrandsSection.brands || []), newBrand],
                  },
                });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Brand
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(data.trustedBrandsSection.brands || []).map((brand, index: number) => (
              <div
                key={index}
                className="group relative bg-blue-50 border border-blue-200 rounded-xl p-4 hover:shadow-lg transition-all"
              >
                <button
                  onClick={() => {
                    const newBrands = (data.trustedBrandsSection.brands || []).filter((_, i) => i !== index);
                    updateData({
                      trustedBrandsSection: { ...data.trustedBrandsSection, brands: newBrands },
                    });
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200 z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="space-y-3">
                  <div className="relative aspect-square bg-white rounded-lg border-2 border-dashed border-gray-300 overflow-hidden group/upload">
                    {brand.src && (
                      <Image
                        src={brand.src}
                        alt={brand.alt}
                        fill
                        className="object-contain"
                      />
                    )}
                    {uploadingIndex === index ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                        <div className="text-center text-white">
                          <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin" />
                          <span className="text-xs font-medium">Uploading...</span>
                        </div>
                      </div>
                    ) : (
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
                            if (file) handleBrandUpload(index, file);
                          }}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Brand Name</label>
                    <EditableText
                      value={brand.alt}
                      onChange={(value) => {
                        const newBrands = [...data.trustedBrandsSection.brands];
                        newBrands[index] = { ...brand, alt: value };
                        updateData({
                          trustedBrandsSection: { ...data.trustedBrandsSection, brands: newBrands },
                        });
                      }}
                      fieldKey={`brand-alt-${index}`}
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Add Brand Button Card */}
            <button
              onClick={() => {
                const newBrand = {
                  src: '/placeholder-logo.png',
                  alt: 'Brand Logo',
                  width: 120,
                  height: 60,
                };
                updateData({
                  trustedBrandsSection: {
                    ...data.trustedBrandsSection,
                    brands: [...(data.trustedBrandsSection.brands || []), newBrand],
                  },
                });
              }}
              className="group relative bg-blue-50 border-2 border-dashed border-blue-300 rounded-xl p-4 hover:bg-blue-100 hover:border-blue-400 transition-all flex items-center justify-center min-h-[200px]"
            >
              <div className="text-center text-blue-600">
                <Plus className="w-12 h-12 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Add New Brand</span>
              </div>
            </button>
          </div>
        </div>

        {/* Trust Badge */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Trust Badge Text</label>
          <EditableText
            value={data.trustedBrandsSection.trustBadge || ''}
            onChange={(value) =>
              updateData({
                trustedBrandsSection: { ...data.trustedBrandsSection, trustBadge: value },
              })
            }
            fieldKey="brands-trust-badge"
          />
          <p className="text-xs text-gray-500 mt-1">Displayed at the bottom of the section</p>
        </div>
      </div>
    </section>
  );
}
