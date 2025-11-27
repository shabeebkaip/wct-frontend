'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import * as Icons from 'lucide-react';
import { Loader2, Plus, Trash2, Save, ArrowLeft, Upload, X } from 'lucide-react';
import Link from 'next/link';

interface Solution {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  order: number;
  hero: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
    features: string[];
  };
  overview: {
    title: string;
    description: string;
    image: string;
  };
  services: Array<{
    icon: string;
    title: string;
    description: string;
    features: string[];
  }>;
  brands: Array<{
    name: string;
    logo: string;
    specialization: string;
  }>;
  solutionTypes: Array<{
    icon: string;
    title: string;
    description: string;
    applications: string[];
  }>;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  process: {
    title: string;
    steps: Array<{
      number: number;
      icon: string;
      title: string;
      description: string;
    }>;
  };
  benefits: {
    title: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  stats: Array<{
    value: string;
    label: string;
    icon: string;
  }>;
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

const availableIcons = [
  'Camera', 'Eye', 'Shield', 'Bell', 'Monitor', 'Smartphone', 'Cloud',
  'CheckCircle2', 'Building2', 'Clock', 'Users', 'Award', 'Layers',
  'Settings', 'Zap', 'TrendingUp', 'Video', 'MapPin', 'Wifi', 'HardDrive',
  'SearchCheck', 'Phone', 'Mail', 'Globe', 'Server', 'Database', 'Network',
  'Lock', 'Cpu', 'Activity', 'BarChart', 'Briefcase', 'Target', 'Star',
];

export default function SolutionEditor() {
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === 'new';
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeSection, setActiveSection] = useState('basic');
  
  const [solution, setSolution] = useState<Solution>({
    title: '',
    slug: '',
    category: '',
    published: false,
    order: 0,
    hero: {
      title: '',
      subtitle: '',
      description: '',
      backgroundImage: '',
      features: [''],
    },
    overview: {
      title: '',
      description: '',
      image: '',
    },
    services: [],
    brands: [],
    solutionTypes: [],
    features: [],
    process: {
      title: 'Our Process',
      steps: [],
    },
    benefits: {
      title: 'Key Benefits',
      items: [],
    },
    stats: [],
    cta: {
      title: 'Ready to Get Started?',
      description: 'Contact us today to discuss your requirements',
      buttonText: 'Contact Us',
      buttonLink: '/contact',
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: [],
    },
  });

  useEffect(() => {
    if (!isNew) {
      fetchSolution();
    }
  }, [params.id]);

  const fetchSolution = async () => {
    try {
      const res = await fetch(`/api/solutions/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setSolution(data);
      }
    } catch (error) {
      console.error('Error fetching solution:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = isNew ? '/api/solutions' : `/api/solutions/${params.id}`;
      const method = isNew ? 'POST' : 'PUT';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(solution),
      });

      if (res.ok) {
        alert('✓ Solution saved successfully!');
        if (isNew) {
          const data = await res.json();
          router.push(`/admin/solutions/${data._id}`);
        }
      } else {
        const error = await res.json();
        alert(`✗ Failed to save: ${error.error}`);
      }
    } catch (error) {
      console.error('Error saving solution:', error);
      alert('✗ Error saving solution');
    } finally {
      setSaving(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const updateField = (path: string, value: unknown) => {
    const keys = path.split('.');
    setSolution((prev) => {
      const newSolution = { ...prev };
      let current: any = newSolution;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newSolution;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldPath: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const { url } = await response.json();
      updateField(fieldPath, url);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: 'Settings', category: 'General' },
    { id: 'hero', label: 'Hero Section', icon: 'Image', category: 'Content' },
    { id: 'overview', label: 'Overview', icon: 'FileText', category: 'Content' },
    { id: 'services', label: 'Services', icon: 'Briefcase', category: 'Content' },
    { id: 'brands', label: 'Brands', icon: 'Award', category: 'Content' },
    { id: 'solutions', label: 'Solution Types', icon: 'Layers', category: 'Content' },
    { id: 'features', label: 'Features', icon: 'Zap', category: 'Content' },
    { id: 'process', label: 'Process', icon: 'List', category: 'Content' },
    { id: 'benefits', label: 'Benefits', icon: 'CheckCircle2', category: 'Content' },
    { id: 'stats', label: 'Statistics', icon: 'BarChart', category: 'Content' },
    { id: 'cta', label: 'Call to Action', icon: 'Send', category: 'Content' },
    { id: 'seo', label: 'SEO', icon: 'Search', category: 'Settings' },
  ];

  const categories = ['General', 'Content', 'Settings'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/solutions"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isNew ? 'Create New Solution' : 'Edit Solution'}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {isNew ? 'Create a new solution page' : `Editing: ${solution.title}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={solution.published}
                  onChange={(e) => updateField('published', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                Published
              </label>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl transition-all"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Solution
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Content with Sidebar */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          <div className="w-64 shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {categories.map((category) => (
                <div key={category} className="border-b border-gray-100 last:border-b-0">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      {category}
                    </h3>
                  </div>
                  <div className="py-2">
                    {sections
                      .filter((section) => section.category === category)
                      .map((section) => {
                        const IconComponent = (Icons as any)[section.icon] || Icons.Circle;
                        return (
                          <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all ${
                              activeSection === section.id
                                ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                            <span>{section.label}</span>
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 border border-gray-100 min-h-[600px]">
          {/* Basic Info Tab */}
          {activeSection === 'basic' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={solution.title}
                    onChange={(e) => {
                      updateField('title', e.target.value);
                      if (isNew || !solution.slug) {
                        updateField('slug', generateSlug(e.target.value));
                      }
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="e.g., CCTV Surveillance"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={solution.slug}
                    onChange={(e) => updateField('slug', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="e.g., cctv-surveillance"
                  />
                  <p className="text-xs text-gray-500 mt-1">URL: /solutions/{solution.slug}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    value={solution.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="e.g., Security Systems"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={solution.order}
                    onChange={(e) => updateField('order', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Hero Section Tab */}
          {activeSection === 'hero' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Hero Section</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={solution.hero.title}
                  onChange={(e) => updateField('hero.title', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={solution.hero.subtitle}
                  onChange={(e) => updateField('hero.subtitle', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={solution.hero.description}
                  onChange={(e) => updateField('hero.description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Background Image
                </label>
                {solution.hero.backgroundImage && (
                  <div className="relative inline-block mb-3">
                    <img
                      src={solution.hero.backgroundImage}
                      alt="Hero background"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      onClick={() => updateField('hero.backgroundImage', '')}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
                  <Upload className="w-4 h-4" />
                  {uploading ? 'Uploading...' : solution.hero.backgroundImage ? 'Change Image' : 'Upload Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'hero.backgroundImage')}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Key Features
                  </label>
                  <button
                    onClick={() => updateField('hero.features', [...solution.hero.features, ''])}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Feature
                  </button>
                </div>
                <div className="space-y-2">
                  {solution.hero.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => {
                          const newFeatures = [...solution.hero.features];
                          newFeatures[index] = e.target.value;
                          updateField('hero.features', newFeatures);
                        }}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        placeholder="Feature text"
                      />
                      {solution.hero.features.length > 1 && (
                        <button
                          onClick={() => {
                            const newFeatures = solution.hero.features.filter((_, i) => i !== index);
                            updateField('hero.features', newFeatures);
                          }}
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
          )}

          {/* Overview Tab */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Overview Section</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={solution.overview.title}
                  onChange={(e) => updateField('overview.title', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={solution.overview.description}
                  onChange={(e) => updateField('overview.description', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image
                </label>
                {solution.overview.image && (
                  <div className="relative inline-block mb-3">
                    <img
                      src={solution.overview.image}
                      alt="Overview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      onClick={() => updateField('overview.image', '')}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
                  <Upload className="w-4 h-4" />
                  {uploading ? 'Uploading...' : solution.overview.image ? 'Change Image' : 'Upload Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'overview.image')}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeSection === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Services & Offerings</h2>
                <button
                  onClick={() => {
                    const newServices = [...solution.services, {
                      icon: 'Settings',
                      title: '',
                      description: '',
                      features: [''],
                    }];
                    updateField('services', newServices);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Service
                </button>
              </div>

              {solution.services.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 mb-4">No services added yet</p>
                  <button
                    onClick={() => {
                      const newServices = [{
                        icon: 'Settings',
                        title: '',
                        description: '',
                        features: [''],
                      }];
                      updateField('services', newServices);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    Add First Service
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {solution.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="p-6 bg-gray-50 rounded-xl border border-gray-200 relative">
                      <button
                        onClick={() => {
                          const newServices = solution.services.filter((_, i) => i !== serviceIndex);
                          updateField('services', newServices);
                        }}
                        className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Icon
                          </label>
                          <select
                            value={service.icon}
                            onChange={(e) => {
                              const newServices = [...solution.services];
                              newServices[serviceIndex].icon = e.target.value;
                              updateField('services', newServices);
                            }}
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
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Title
                          </label>
                          <input
                            type="text"
                            value={service.title}
                            onChange={(e) => {
                              const newServices = [...solution.services];
                              newServices[serviceIndex].title = e.target.value;
                              updateField('services', newServices);
                            }}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={service.description}
                          onChange={(e) => {
                            const newServices = [...solution.services];
                            newServices[serviceIndex].description = e.target.value;
                            updateField('services', newServices);
                          }}
                          rows={3}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-semibold text-gray-700">
                            Features
                          </label>
                          <button
                            onClick={() => {
                              const newServices = [...solution.services];
                              newServices[serviceIndex].features.push('');
                              updateField('services', newServices);
                            }}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            + Add Feature
                          </button>
                        </div>
                        <div className="space-y-2">
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex gap-2">
                              <input
                                type="text"
                                value={feature}
                                onChange={(e) => {
                                  const newServices = [...solution.services];
                                  newServices[serviceIndex].features[featureIndex] = e.target.value;
                                  updateField('services', newServices);
                                }}
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                placeholder="Feature"
                              />
                              {service.features.length > 1 && (
                                <button
                                  onClick={() => {
                                    const newServices = [...solution.services];
                                    newServices[serviceIndex].features = service.features.filter((_, i) => i !== featureIndex);
                                    updateField('services', newServices);
                                  }}
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
              )}
            </div>
          )}

          {/* Brands Tab */}
          {activeSection === 'brands' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Brands & Partners</h2>
                <button
                  onClick={() => {
                    const newBrands = [...solution.brands, {
                      name: '',
                      logo: '',
                      specialization: '',
                    }];
                    updateField('brands', newBrands);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Brand
                </button>
              </div>

              {solution.brands.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 mb-4">No brands added yet</p>
                  <button
                    onClick={() => {
                      const newBrands = [{
                        name: '',
                        logo: '',
                        specialization: '',
                      }];
                      updateField('brands', newBrands);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    Add First Brand
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {solution.brands.map((brand, index) => (
                    <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200 relative">
                      <button
                        onClick={() => {
                          const newBrands = solution.brands.filter((_, i) => i !== index);
                          updateField('brands', newBrands);
                        }}
                        className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Brand Name
                          </label>
                          <input
                            type="text"
                            value={brand.name}
                            onChange={(e) => {
                              const newBrands = [...solution.brands];
                              newBrands[index].name = e.target.value;
                              updateField('brands', newBrands);
                            }}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Logo
                          </label>
                          {brand.logo && (
                            <div className="relative inline-block mb-3">
                              <img
                                src={brand.logo}
                                alt={brand.name}
                                className="w-32 h-20 object-contain rounded-lg border border-gray-200 bg-white p-2"
                              />
                              <button
                                onClick={() => {
                                  const newBrands = [...solution.brands];
                                  newBrands[index].logo = '';
                                  updateField('brands', newBrands);
                                }}
                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
                            <Upload className="w-4 h-4" />
                            {uploading ? 'Uploading...' : brand.logo ? 'Change Logo' : 'Upload Logo'}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;

                                setUploading(true);
                                const formData = new FormData();
                                formData.append('file', file);

                                fetch('/api/upload', {
                                  method: 'POST',
                                  body: formData,
                                })
                                  .then(response => response.json())
                                  .then(data => {
                                    const newBrands = [...solution.brands];
                                    newBrands[index].logo = data.url;
                                    updateField('brands', newBrands);
                                  })
                                  .catch(error => {
                                    console.error('Error uploading logo:', error);
                                    alert('Failed to upload logo');
                                  })
                                  .finally(() => setUploading(false));
                              }}
                              disabled={uploading}
                              className="hidden"
                            />
                          </label>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Specialization
                          </label>
                          <input
                            type="text"
                            value={brand.specialization}
                            onChange={(e) => {
                              const newBrands = [...solution.brands];
                              newBrands[index].specialization = e.target.value;
                              updateField('brands', newBrands);
                            }}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Solution Types Tab */}
          {activeSection === 'solutions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Industry Solutions</h2>
                <button
                  onClick={() => {
                    const newTypes = [...solution.solutionTypes, {
                      icon: 'Building2',
                      title: '',
                      description: '',
                      applications: [''],
                    }];
                    updateField('solutionTypes', newTypes);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Solution Type
                </button>
              </div>

              <div className="space-y-6">
                {solution.solutionTypes.map((type, typeIndex) => (
                  <div key={typeIndex} className="p-6 bg-gray-50 rounded-xl border border-gray-200 relative">
                    <button
                      onClick={() => {
                        const newTypes = solution.solutionTypes.filter((_, i) => i !== typeIndex);
                        updateField('solutionTypes', newTypes);
                      }}
                      className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Icon
                        </label>
                        <select
                          value={type.icon}
                          onChange={(e) => {
                            const newTypes = [...solution.solutionTypes];
                            newTypes[typeIndex].icon = e.target.value;
                            updateField('solutionTypes', newTypes);
                          }}
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
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={type.title}
                          onChange={(e) => {
                            const newTypes = [...solution.solutionTypes];
                            newTypes[typeIndex].title = e.target.value;
                            updateField('solutionTypes', newTypes);
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={type.description}
                        onChange={(e) => {
                          const newTypes = [...solution.solutionTypes];
                          newTypes[typeIndex].description = e.target.value;
                          updateField('solutionTypes', newTypes);
                        }}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Applications
                        </label>
                        <button
                          onClick={() => {
                            const newTypes = [...solution.solutionTypes];
                            newTypes[typeIndex].applications.push('');
                            updateField('solutionTypes', newTypes);
                          }}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          + Add Application
                        </button>
                      </div>
                      <div className="space-y-2">
                        {type.applications.map((app, appIndex) => (
                          <div key={appIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={app}
                              onChange={(e) => {
                                const newTypes = [...solution.solutionTypes];
                                newTypes[typeIndex].applications[appIndex] = e.target.value;
                                updateField('solutionTypes', newTypes);
                              }}
                              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                              placeholder="Application"
                            />
                            {type.applications.length > 1 && (
                              <button
                                onClick={() => {
                                  const newTypes = [...solution.solutionTypes];
                                  newTypes[typeIndex].applications = type.applications.filter((_, i) => i !== appIndex);
                                  updateField('solutionTypes', newTypes);
                                }}
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
          )}

          {/* Features Tab */}
          {activeSection === 'features' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Key Features</h2>
                <button
                  onClick={() => {
                    const newFeatures = [...solution.features, {
                      icon: 'Zap',
                      title: '',
                      description: '',
                    }];
                    updateField('features', newFeatures);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Feature
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {solution.features.map((feature, index) => (
                  <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200 relative">
                    <button
                      onClick={() => {
                        const newFeatures = solution.features.filter((_, i) => i !== index);
                        updateField('features', newFeatures);
                      }}
                      className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Icon
                        </label>
                        <select
                          value={feature.icon}
                          onChange={(e) => {
                            const newFeatures = [...solution.features];
                            newFeatures[index].icon = e.target.value;
                            updateField('features', newFeatures);
                          }}
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
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={feature.title}
                          onChange={(e) => {
                            const newFeatures = [...solution.features];
                            newFeatures[index].title = e.target.value;
                            updateField('features', newFeatures);
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={feature.description}
                          onChange={(e) => {
                            const newFeatures = [...solution.features];
                            newFeatures[index].description = e.target.value;
                            updateField('features', newFeatures);
                          }}
                          rows={3}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Process Tab */}
          {activeSection === 'process' && (
            <div className="space-y-6">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Process Section Title
                </label>
                <input
                  type="text"
                  value={solution.process.title}
                  onChange={(e) => updateField('process.title', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Process Steps</h2>
                <button
                  onClick={() => {
                    const newSteps = [...solution.process.steps, {
                      number: solution.process.steps.length + 1,
                      icon: 'Settings',
                      title: '',
                      description: '',
                    }];
                    updateField('process.steps', newSteps);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Step
                </button>
              </div>

              <div className="space-y-6">
                {solution.process.steps.map((step, index) => (
                  <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200 relative">
                    <button
                      onClick={() => {
                        const newSteps = solution.process.steps.filter((_, i) => i !== index);
                        // Renumber remaining steps
                        newSteps.forEach((s, i) => s.number = i + 1);
                        updateField('process.steps', newSteps);
                      }}
                      className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Step Number
                        </label>
                        <input
                          type="number"
                          value={step.number}
                          onChange={(e) => {
                            const newSteps = [...solution.process.steps];
                            newSteps[index].number = parseInt(e.target.value) || 1;
                            updateField('process.steps', newSteps);
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Icon
                        </label>
                        <select
                          value={step.icon}
                          onChange={(e) => {
                            const newSteps = [...solution.process.steps];
                            newSteps[index].icon = e.target.value;
                            updateField('process.steps', newSteps);
                          }}
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
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => {
                            const newSteps = [...solution.process.steps];
                            newSteps[index].title = e.target.value;
                            updateField('process.steps', newSteps);
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={step.description}
                        onChange={(e) => {
                          const newSteps = [...solution.process.steps];
                          newSteps[index].description = e.target.value;
                          updateField('process.steps', newSteps);
                        }}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits Tab */}
          {activeSection === 'benefits' && (
            <div className="space-y-6">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Benefits Section Title
                </label>
                <input
                  type="text"
                  value={solution.benefits.title}
                  onChange={(e) => updateField('benefits.title', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Benefit Items</h2>
                <button
                  onClick={() => {
                    const newItems = [...solution.benefits.items, {
                      icon: 'Award',
                      title: '',
                      description: '',
                    }];
                    updateField('benefits.items', newItems);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Benefit
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {solution.benefits.items.map((benefit, index) => (
                  <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200 relative">
                    <button
                      onClick={() => {
                        const newItems = solution.benefits.items.filter((_, i) => i !== index);
                        updateField('benefits.items', newItems);
                      }}
                      className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Icon
                        </label>
                        <select
                          value={benefit.icon}
                          onChange={(e) => {
                            const newItems = [...solution.benefits.items];
                            newItems[index].icon = e.target.value;
                            updateField('benefits.items', newItems);
                          }}
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
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={benefit.title}
                          onChange={(e) => {
                            const newItems = [...solution.benefits.items];
                            newItems[index].title = e.target.value;
                            updateField('benefits.items', newItems);
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={benefit.description}
                          onChange={(e) => {
                            const newItems = [...solution.benefits.items];
                            newItems[index].description = e.target.value;
                            updateField('benefits.items', newItems);
                          }}
                          rows={3}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats Tab */}
          {activeSection === 'stats' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Statistics</h2>
                <button
                  onClick={() => {
                    const newStats = [...solution.stats, {
                      value: '',
                      label: '',
                      icon: 'TrendingUp',
                    }];
                    updateField('stats', newStats);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Stat
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {solution.stats.map((stat, index) => (
                  <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200 relative">
                    <button
                      onClick={() => {
                        const newStats = solution.stats.filter((_, i) => i !== index);
                        updateField('stats', newStats);
                      }}
                      className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Value
                        </label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...solution.stats];
                            newStats[index].value = e.target.value;
                            updateField('stats', newStats);
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          placeholder="e.g., 500+"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Label
                        </label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...solution.stats];
                            newStats[index].label = e.target.value;
                            updateField('stats', newStats);
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          placeholder="e.g., Projects Completed"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Icon
                        </label>
                        <select
                          value={stat.icon}
                          onChange={(e) => {
                            const newStats = [...solution.stats];
                            newStats[index].icon = e.target.value;
                            updateField('stats', newStats);
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        >
                          {availableIcons.map((icon) => (
                            <option key={icon} value={icon}>
                              {icon}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Tab */}
          {activeSection === 'cta' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Call to Action</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={solution.cta.title}
                  onChange={(e) => updateField('cta.title', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={solution.cta.description}
                  onChange={(e) => updateField('cta.description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={solution.cta.buttonText}
                    onChange={(e) => updateField('cta.buttonText', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Button Link
                  </label>
                  <input
                    type="text"
                    value={solution.cta.buttonLink}
                    onChange={(e) => updateField('cta.buttonLink', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SEO Tab */}
          {activeSection === 'seo' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">SEO Settings</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={solution.seo.metaTitle}
                  onChange={(e) => updateField('seo.metaTitle', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Leave empty to use page title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={solution.seo.metaDescription}
                  onChange={(e) => updateField('seo.metaDescription', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Brief description for search engines"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Keywords (comma separated)
                </label>
                <input
                  type="text"
                  value={solution.seo.keywords?.join(', ') || ''}
                  onChange={(e) => {
                    const keywords = e.target.value.split(',').map(k => k.trim()).filter(Boolean);
                    updateField('seo.keywords', keywords);
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="cctv, surveillance, security"
                />
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
