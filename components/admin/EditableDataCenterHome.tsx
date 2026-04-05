'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Save, Loader2, Plus, X, Upload } from 'lucide-react';

interface EditableDataCenterHomeProps {
  isEditMode?: boolean;
}

export default function EditableDataCenterHome({ isEditMode = false }: EditableDataCenterHomeProps) {
  const [data, setData] = useState<DataCenterHomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/data-center/home');
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
      const res = await fetch('/api/data-center/home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer admin-token',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        await fetch('/api/data-center/home/revalidate', {
          method: 'POST',
          headers: { Authorization: 'Bearer admin-token' },
        });
        alert('Changes saved successfully!');
      } else {
        const err = await res.json().catch(() => ({}));
        alert(`Failed to save: ${err.error || res.statusText}`);
      }
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file || !data) return;

    setUploadingImage(index);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: 'Bearer admin-token' },
        body: formData,
      });

      if (res.ok) {
        const { secure_url, publicId, format } = await res.json();
        const newImages = [...data.images];
        newImages[index] = { ...newImages[index], src: secure_url, publicId, format };
        setData({ ...data, images: newImages });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploadingImage(null);
    }
  };

  const addSolution = () => {
    if (!data) return;
    setData({
      ...data,
      solutions: [...data.solutions, { icon: 'Server', title: '', description: '' }],
    });
  };

  const removeSolution = (index: number) => {
    if (!data) return;
    setData({
      ...data,
      solutions: data.solutions.filter((_, i) => i !== index),
    });
  };

  const addFeature = () => {
    if (!data) return;
    setData({
      ...data,
      features: [...data.features, ''],
    });
  };

  const removeFeature = (index: number) => {
    if (!data) return;
    setData({
      ...data,
      features: data.features.filter((_, i) => i !== index),
    });
  };

  const addImage = () => {
    if (!data) return;
    setData({
      ...data,
      images: [...data.images, { src: '', alt: '', title: '', description: '' }],
    });
  };

  const removeImage = (index: number) => {
    if (!data) return;
    setData({
      ...data,
      images: data.images.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!data) return <div>Error loading data</div>;

  return (
    <div className="relative">
      {/* Floating Save Button */}
      {isEditMode && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      )}

      {/* Section Header */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Badge */}
          <div
            className={`inline-block mb-6 ${
              isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-blue-500 rounded-lg transition-all' : ''
            }`}
            onClick={() => isEditMode && setEditingField('badge')}
          >
            {editingField === 'badge' ? (
              <input
                type="text"
                value={data.sectionHeader.badge}
                onChange={(e) =>
                  setData({
                    ...data,
                    sectionHeader: { ...data.sectionHeader, badge: e.target.value },
                  })
                }
                onBlur={() => setEditingField(null)}
                autoFocus
                className="px-4 py-2 bg-blue-50 text-blue-600 text-sm font-semibold rounded-lg border-2 border-blue-500"
              />
            ) : (
              <span className="px-4 py-2 bg-blue-50 text-blue-600 text-sm font-semibold rounded-lg inline-block">
                {data.sectionHeader.badge}
              </span>
            )}
          </div>

          {/* Title */}
          <div
            className={`mb-6 ${
              isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-blue-500 rounded-lg transition-all' : ''
            }`}
            onClick={() => isEditMode && setEditingField('title')}
          >
            {editingField === 'title' ? (
              <input
                type="text"
                value={data.sectionHeader.title}
                onChange={(e) =>
                  setData({
                    ...data,
                    sectionHeader: { ...data.sectionHeader, title: e.target.value },
                  })
                }
                onBlur={() => setEditingField(null)}
                autoFocus
                className="text-5xl font-bold text-gray-900 w-full border-2 border-blue-500 rounded-lg px-4 py-2"
              />
            ) : (
              <h2 className="text-5xl font-bold text-gray-900">{data.sectionHeader.title}</h2>
            )}
          </div>

          {/* Description */}
          <div
            className={`max-w-3xl ${
              isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-blue-500 rounded-lg transition-all' : ''
            }`}
            onClick={() => isEditMode && setEditingField('description')}
          >
            {editingField === 'description' ? (
              <textarea
                value={data.sectionHeader.description}
                onChange={(e) =>
                  setData({
                    ...data,
                    sectionHeader: { ...data.sectionHeader, description: e.target.value },
                  })
                }
                onBlur={() => setEditingField(null)}
                autoFocus
                rows={3}
                className="text-xl text-gray-600 w-full border-2 border-blue-500 rounded-lg px-4 py-2"
              />
            ) : (
              <p className="text-xl text-gray-600">{data.sectionHeader.description}</p>
            )}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold text-gray-900">Our Solutions</h3>
            {isEditMode && (
              <button
                onClick={addSolution}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Solution
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.solutions.map((solution, index) => (
              <div key={index} className="relative group">
                {isEditMode && (
                  <button
                    onClick={() => removeSolution(index)}
                    className="absolute -top-2 -right-2 z-10 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-all">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">🖥️</span>
                  </div>

                  {/* Title */}
                  <div
                    className={`mb-3 ${
                      isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-blue-500 rounded transition-all' : ''
                    }`}
                    onClick={() => isEditMode && setEditingField(`solution-title-${index}`)}
                  >
                    {editingField === `solution-title-${index}` ? (
                      <input
                        type="text"
                        value={solution.title}
                        onChange={(e) => {
                          const newSolutions = [...data.solutions];
                          newSolutions[index] = { ...newSolutions[index], title: e.target.value };
                          setData({ ...data, solutions: newSolutions });
                        }}
                        onBlur={() => setEditingField(null)}
                        autoFocus
                        className="text-xl font-bold text-gray-900 w-full border-2 border-blue-500 rounded px-2 py-1"
                      />
                    ) : (
                      <h4 className="text-xl font-bold text-gray-900">{solution.title}</h4>
                    )}
                  </div>

                  {/* Description */}
                  <div
                    className={`${
                      isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-blue-500 rounded transition-all' : ''
                    }`}
                    onClick={() => isEditMode && setEditingField(`solution-desc-${index}`)}
                  >
                    {editingField === `solution-desc-${index}` ? (
                      <textarea
                        value={solution.description}
                        onChange={(e) => {
                          const newSolutions = [...data.solutions];
                          newSolutions[index] = { ...newSolutions[index], description: e.target.value };
                          setData({ ...data, solutions: newSolutions });
                        }}
                        onBlur={() => setEditingField(null)}
                        autoFocus
                        rows={3}
                        className="text-gray-600 w-full border-2 border-blue-500 rounded px-2 py-1"
                      />
                    ) : (
                      <p className="text-gray-600">{solution.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold text-gray-900">Key Features</h3>
            {isEditMode && (
              <button
                onClick={addFeature}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Feature
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {data.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 group relative">
                {isEditMode && (
                  <button
                    onClick={() => removeFeature(index)}
                    className="absolute -left-8 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
                <span className="text-blue-600">✓</span>
                <div
                  className={`flex-1 ${
                    isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-blue-500 rounded transition-all' : ''
                  }`}
                  onClick={() => isEditMode && setEditingField(`feature-${index}`)}
                >
                  {editingField === `feature-${index}` ? (
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...data.features];
                        newFeatures[index] = e.target.value;
                        setData({ ...data, features: newFeatures });
                      }}
                      onBlur={() => setEditingField(null)}
                      autoFocus
                      className="text-gray-700 w-full border-2 border-blue-500 rounded px-2 py-1"
                    />
                  ) : (
                    <span className="text-gray-700">{feature}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Images Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold text-gray-900">Gallery</h3>
            {isEditMode && (
              <button
                onClick={addImage}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Image
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.images.map((image, index) => (
              <div key={index} className="relative group">
                {isEditMode && (
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 z-10 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-all">
                  {image.src ? (
                    <Image src={image.src} alt={image.alt} width={400} height={300} className="w-full h-48 object-cover" />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                  {isEditMode && (
                    <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      {uploadingImage === index ? (
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, index)}
                          />
                        </>
                      )}
                    </label>
                  )}
                </div>
                <div className="mt-4">
                  <div
                    className={`mb-2 ${
                      isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-blue-500 rounded transition-all' : ''
                    }`}
                    onClick={() => isEditMode && setEditingField(`image-title-${index}`)}
                  >
                    {editingField === `image-title-${index}` ? (
                      <input
                        type="text"
                        value={image.title}
                        onChange={(e) => {
                          const newImages = [...data.images];
                          newImages[index] = { ...newImages[index], title: e.target.value };
                          setData({ ...data, images: newImages });
                        }}
                        onBlur={() => setEditingField(null)}
                        autoFocus
                        className="font-semibold text-gray-900 w-full border-2 border-blue-500 rounded px-2 py-1"
                      />
                    ) : (
                      <h4 className="font-semibold text-gray-900">{image.title}</h4>
                    )}
                  </div>
                  <div
                    className={`${
                      isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-blue-500 rounded transition-all' : ''
                    }`}
                    onClick={() => isEditMode && setEditingField(`image-desc-${index}`)}
                  >
                    {editingField === `image-desc-${index}` ? (
                      <textarea
                        value={image.description}
                        onChange={(e) => {
                          const newImages = [...data.images];
                          newImages[index] = { ...newImages[index], description: e.target.value };
                          setData({ ...data, images: newImages });
                        }}
                        onBlur={() => setEditingField(null)}
                        autoFocus
                        rows={2}
                        className="text-sm text-gray-600 w-full border-2 border-blue-500 rounded px-2 py-1"
                      />
                    ) : (
                      <p className="text-sm text-gray-600">{image.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div
            className={`mb-6 ${
              isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-white rounded-lg transition-all' : ''
            }`}
            onClick={() => isEditMode && setEditingField('cta-title')}
          >
            {editingField === 'cta-title' ? (
              <input
                type="text"
                value={data.cta.title}
                onChange={(e) =>
                  setData({
                    ...data,
                    cta: { ...data.cta, title: e.target.value },
                  })
                }
                onBlur={() => setEditingField(null)}
                autoFocus
                className="text-4xl font-bold text-white bg-transparent border-2 border-white rounded-lg px-4 py-2 w-full text-center"
              />
            ) : (
              <h3 className="text-4xl font-bold text-white">{data.cta.title}</h3>
            )}
          </div>

          <div
            className={`mb-8 ${
              isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-white rounded-lg transition-all' : ''
            }`}
            onClick={() => isEditMode && setEditingField('cta-description')}
          >
            {editingField === 'cta-description' ? (
              <textarea
                value={data.cta.description}
                onChange={(e) =>
                  setData({
                    ...data,
                    cta: { ...data.cta, description: e.target.value },
                  })
                }
                onBlur={() => setEditingField(null)}
                autoFocus
                rows={3}
                className="text-xl text-white bg-transparent border-2 border-white rounded-lg px-4 py-2 w-full text-center"
              />
            ) : (
              <p className="text-xl text-white opacity-90">{data.cta.description}</p>
            )}
          </div>

          <div className="flex items-center justify-center gap-4">
            <div
              className={`${
                isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-white rounded-lg transition-all' : ''
              }`}
              onClick={() => isEditMode && setEditingField('cta-primary')}
            >
              {editingField === 'cta-primary' ? (
                <input
                  type="text"
                  value={data.cta.primaryButton.text}
                  onChange={(e) =>
                    setData({
                      ...data,
                      cta: {
                        ...data.cta,
                        primaryButton: { ...data.cta.primaryButton, text: e.target.value },
                      },
                    })
                  }
                  onBlur={() => setEditingField(null)}
                  autoFocus
                  className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold border-2 border-white"
                />
              ) : (
                <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  {data.cta.primaryButton.text}
                </button>
              )}
            </div>

            <div
              className={`${
                isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-white rounded-lg transition-all' : ''
              }`}
              onClick={() => isEditMode && setEditingField('cta-secondary')}
            >
              {editingField === 'cta-secondary' ? (
                <input
                  type="text"
                  value={data.cta.secondaryButton.text}
                  onChange={(e) =>
                    setData({
                      ...data,
                      cta: {
                        ...data.cta,
                        secondaryButton: { ...data.cta.secondaryButton, text: e.target.value },
                      },
                    })
                  }
                  onBlur={() => setEditingField(null)}
                  autoFocus
                  className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-lg font-semibold"
                />
              ) : (
                <button className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  {data.cta.secondaryButton.text}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
