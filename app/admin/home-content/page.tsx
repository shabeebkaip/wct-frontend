'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, Plus, Trash2, Upload, Save, Shield, Lock, Eye, MapPin, Zap, Building2, Users, ShoppingBag, Camera, Server, Network, Cable, Workflow } from 'lucide-react';

const iconOptions = ['Shield', 'Lock', 'Eye', 'MapPin', 'Zap', 'Building2', 'Users', 'ShoppingBag', 'Camera', 'Server', 'Network', 'Cable', 'Workflow'];
const colorOptions = [
  'from-blue-500 to-cyan-500',
  'from-red-500 to-orange-500',
  'from-purple-500 to-pink-500',
  'from-green-500 to-emerald-500',
  'from-indigo-500 to-blue-500',
  'from-yellow-500 to-orange-500',
];

export default function HomePageAdmin() {
  const [data, setData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('cctv');
  const [uploadingLogo, setUploadingLogo] = useState<number | null>(null);

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
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer admin-token',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        await fetch('/api/home-page/revalidate', {
          method: 'POST',
          headers: { Authorization: 'Bearer admin-token' },
        });
        alert('Home page content saved successfully!');
      } else {
        alert('Failed to save content');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file || !data) return;

    setUploadingLogo(index);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: 'Bearer admin-token' },
        body: formData,
      });

      if (res.ok) {
        const { url } = await res.json();
        const newLogos = [...data.clientsSection.logos];
        newLogos[index] = { ...newLogos[index], src: url };
        setData({
          ...data,
          clientsSection: { ...data.clientsSection, logos: newLogos },
        });
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
    } finally {
      setUploadingLogo(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!data) return <div>Error loading data</div>;

  const tabs = [
    { id: 'cctv', label: 'CCTV Surveillance', icon: Camera },
    { id: 'lowcurrent', label: 'Low Current', icon: Shield },
    { id: 'cabling', label: 'Structured Cabling', icon: Cable },
    { id: 'clients', label: 'Clients & Partners', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Home Page Content Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage all sections of the home page from one place
            </p>
          </div>
          <Button onClick={handleSave} disabled={saving} size="lg">
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save All Changes
              </>
            )}
          </Button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* CCTV Section */}
          {activeTab === 'cctv' && (
            <>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  Section Header
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label>Badge Text</Label>
                    <Input
                      value={data.cctvSection.badge}
                      onChange={(e) =>
                        setData({
                          ...data,
                          cctvSection: { ...data.cctvSection, badge: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={data.cctvSection.title}
                      onChange={(e) =>
                        setData({
                          ...data,
                          cctvSection: { ...data.cctvSection, title: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={data.cctvSection.description}
                      onChange={(e) =>
                        setData({
                          ...data,
                          cctvSection: { ...data.cctvSection, description: e.target.value },
                        })
                      }
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Solutions ({data.cctvSection.solutions.length})
                  </h2>
                  <Button
                    onClick={() =>
                      setData({
                        ...data,
                        cctvSection: {
                          ...data.cctvSection,
                          solutions: [
                            ...data.cctvSection.solutions,
                            {
                              icon: 'Shield',
                              title: '',
                              description: '',
                              color: 'from-blue-500 to-cyan-500',
                              features: [],
                            },
                          ],
                        },
                      })
                    }
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Solution
                  </Button>
                </div>
                <div className="space-y-4">
                  {data.cctvSection.solutions.map((solution: any, index: number) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium text-gray-900">
                          Solution {index + 1}
                        </h3>
                        <Button
                          onClick={() => {
                            const newSolutions = data.cctvSection.solutions.filter(
                              (_: any, i: number) => i !== index
                            );
                            setData({
                              ...data,
                              cctvSection: { ...data.cctvSection, solutions: newSolutions },
                            });
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <Label>Icon</Label>
                          <select
                            value={solution.icon}
                            onChange={(e) => {
                              const newSolutions = [...data.cctvSection.solutions];
                              newSolutions[index] = { ...solution, icon: e.target.value };
                              setData({
                                ...data,
                                cctvSection: { ...data.cctvSection, solutions: newSolutions },
                              });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                          >
                            {iconOptions.map((icon) => (
                              <option key={icon} value={icon}>
                                {icon}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label>Color Gradient</Label>
                          <select
                            value={solution.color}
                            onChange={(e) => {
                              const newSolutions = [...data.cctvSection.solutions];
                              newSolutions[index] = { ...solution, color: e.target.value };
                              setData({
                                ...data,
                                cctvSection: { ...data.cctvSection, solutions: newSolutions },
                              });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                          >
                            {colorOptions.map((color) => (
                              <option key={color} value={color}>
                                {color}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label>Title</Label>
                          <Input
                            value={solution.title}
                            onChange={(e) => {
                              const newSolutions = [...data.cctvSection.solutions];
                              newSolutions[index] = { ...solution, title: e.target.value };
                              setData({
                                ...data,
                                cctvSection: { ...data.cctvSection, solutions: newSolutions },
                              });
                            }}
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={solution.description}
                            onChange={(e) => {
                              const newSolutions = [...data.cctvSection.solutions];
                              newSolutions[index] = { ...solution, description: e.target.value };
                              setData({
                                ...data,
                                cctvSection: { ...data.cctvSection, solutions: newSolutions },
                              });
                            }}
                            rows={2}
                          />
                        </div>
                        <div>
                          <Label>Features (comma-separated)</Label>
                          <Input
                            value={solution.features.join(', ')}
                            onChange={(e) => {
                              const newSolutions = [...data.cctvSection.solutions];
                              newSolutions[index] = {
                                ...solution,
                                features: e.target.value.split(',').map((f: string) => f.trim()),
                              };
                              setData({
                                ...data,
                                cctvSection: { ...data.cctvSection, solutions: newSolutions },
                              });
                            }}
                            placeholder="Feature 1, Feature 2, Feature 3"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Low Current Section */}
          {activeTab === 'lowcurrent' && (
            <>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  Section Header
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label>Badge Text</Label>
                    <Input
                      value={data.lowCurrentSection.badge}
                      onChange={(e) =>
                        setData({
                          ...data,
                          lowCurrentSection: { ...data.lowCurrentSection, badge: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={data.lowCurrentSection.title}
                      onChange={(e) =>
                        setData({
                          ...data,
                          lowCurrentSection: { ...data.lowCurrentSection, title: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={data.lowCurrentSection.description}
                      onChange={(e) =>
                        setData({
                          ...data,
                          lowCurrentSection: {
                            ...data.lowCurrentSection,
                            description: e.target.value,
                          },
                        })
                      }
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Main Solutions ({data.lowCurrentSection.solutions.length})
                  </h2>
                  <Button
                    onClick={() =>
                      setData({
                        ...data,
                        lowCurrentSection: {
                          ...data.lowCurrentSection,
                          solutions: [
                            ...data.lowCurrentSection.solutions,
                            { icon: 'Shield', title: '', description: '', features: [] },
                          ],
                        },
                      })
                    }
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Solution
                  </Button>
                </div>
                <div className="space-y-4">
                  {data.lowCurrentSection.solutions.map((solution: any, index: number) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium text-gray-900">
                          Solution {index + 1}
                        </h3>
                        <Button
                          onClick={() => {
                            const newSolutions = data.lowCurrentSection.solutions.filter(
                              (_: any, i: number) => i !== index
                            );
                            setData({
                              ...data,
                              lowCurrentSection: { ...data.lowCurrentSection, solutions: newSolutions },
                            });
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label>Icon</Label>
                          <select
                            value={solution.icon}
                            onChange={(e) => {
                              const newSolutions = [...data.lowCurrentSection.solutions];
                              newSolutions[index] = { ...solution, icon: e.target.value };
                              setData({
                                ...data,
                                lowCurrentSection: { ...data.lowCurrentSection, solutions: newSolutions },
                              });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                          >
                            {iconOptions.map((icon) => (
                              <option key={icon} value={icon}>
                                {icon}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label>Title</Label>
                          <Input
                            value={solution.title}
                            onChange={(e) => {
                              const newSolutions = [...data.lowCurrentSection.solutions];
                              newSolutions[index] = { ...solution, title: e.target.value };
                              setData({
                                ...data,
                                lowCurrentSection: { ...data.lowCurrentSection, solutions: newSolutions },
                              });
                            }}
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={solution.description}
                            onChange={(e) => {
                              const newSolutions = [...data.lowCurrentSection.solutions];
                              newSolutions[index] = { ...solution, description: e.target.value };
                              setData({
                                ...data,
                                lowCurrentSection: { ...data.lowCurrentSection, solutions: newSolutions },
                              });
                            }}
                            rows={2}
                          />
                        </div>
                        <div>
                          <Label>Features (comma-separated)</Label>
                          <Input
                            value={solution.features.join(', ')}
                            onChange={(e) => {
                              const newSolutions = [...data.lowCurrentSection.solutions];
                              newSolutions[index] = {
                                ...solution,
                                features: e.target.value.split(',').map((f: string) => f.trim()),
                              };
                              setData({
                                ...data,
                                lowCurrentSection: { ...data.lowCurrentSection, solutions: newSolutions },
                              });
                            }}
                            placeholder="Feature 1, Feature 2, Feature 3"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Additional Solutions ({data.lowCurrentSection.additionalSolutions.length})
                  </h2>
                  <Button
                    onClick={() =>
                      setData({
                        ...data,
                        lowCurrentSection: {
                          ...data.lowCurrentSection,
                          additionalSolutions: [
                            ...data.lowCurrentSection.additionalSolutions,
                            { icon: 'Zap', title: '', description: '' },
                          ],
                        },
                      })
                    }
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Additional Solution
                  </Button>
                </div>
                <div className="space-y-4">
                  {data.lowCurrentSection.additionalSolutions.map((solution: any, index: number) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium text-gray-900">
                          Additional {index + 1}
                        </h3>
                        <Button
                          onClick={() => {
                            const newSolutions = data.lowCurrentSection.additionalSolutions.filter(
                              (_: any, i: number) => i !== index
                            );
                            setData({
                              ...data,
                              lowCurrentSection: {
                                ...data.lowCurrentSection,
                                additionalSolutions: newSolutions,
                              },
                            });
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label>Icon</Label>
                          <select
                            value={solution.icon}
                            onChange={(e) => {
                              const newSolutions = [...data.lowCurrentSection.additionalSolutions];
                              newSolutions[index] = { ...solution, icon: e.target.value };
                              setData({
                                ...data,
                                lowCurrentSection: {
                                  ...data.lowCurrentSection,
                                  additionalSolutions: newSolutions,
                                },
                              });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                          >
                            {iconOptions.map((icon) => (
                              <option key={icon} value={icon}>
                                {icon}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label>Title</Label>
                          <Input
                            value={solution.title}
                            onChange={(e) => {
                              const newSolutions = [...data.lowCurrentSection.additionalSolutions];
                              newSolutions[index] = { ...solution, title: e.target.value };
                              setData({
                                ...data,
                                lowCurrentSection: {
                                  ...data.lowCurrentSection,
                                  additionalSolutions: newSolutions,
                                },
                              });
                            }}
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={solution.description}
                            onChange={(e) => {
                              const newSolutions = [...data.lowCurrentSection.additionalSolutions];
                              newSolutions[index] = { ...solution, description: e.target.value };
                              setData({
                                ...data,
                                lowCurrentSection: {
                                  ...data.lowCurrentSection,
                                  additionalSolutions: newSolutions,
                                },
                              });
                            }}
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Structured Cabling Section */}
          {activeTab === 'cabling' && (
            <>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  Section Header
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label>Badge Text</Label>
                    <Input
                      value={data.structuredCablingSection.badge}
                      onChange={(e) =>
                        setData({
                          ...data,
                          structuredCablingSection: {
                            ...data.structuredCablingSection,
                            badge: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={data.structuredCablingSection.title}
                      onChange={(e) =>
                        setData({
                          ...data,
                          structuredCablingSection: {
                            ...data.structuredCablingSection,
                            title: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={data.structuredCablingSection.description}
                      onChange={(e) =>
                        setData({
                          ...data,
                          structuredCablingSection: {
                            ...data.structuredCablingSection,
                            description: e.target.value,
                          },
                        })
                      }
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  Cabling Flow Components
                </h2>
                <div className="space-y-3">
                  {data.structuredCablingSection.cablingFlow.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <Input
                        value={item.label}
                        onChange={(e) => {
                          const newFlow = [...data.structuredCablingSection.cablingFlow];
                          newFlow[index] = { ...item, label: e.target.value };
                          setData({
                            ...data,
                            structuredCablingSection: {
                              ...data.structuredCablingSection,
                              cablingFlow: newFlow,
                            },
                          });
                        }}
                        className="flex-1"
                      />
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={item.active || false}
                          onChange={(e) => {
                            const newFlow = [...data.structuredCablingSection.cablingFlow];
                            newFlow[index] = { ...item, active: e.target.checked };
                            setData({
                              ...data,
                              structuredCablingSection: {
                                ...data.structuredCablingSection,
                                cablingFlow: newFlow,
                              },
                            });
                          }}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-600">Active</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={item.highlight || false}
                          onChange={(e) => {
                            const newFlow = [...data.structuredCablingSection.cablingFlow];
                            newFlow[index] = { ...item, highlight: e.target.checked };
                            setData({
                              ...data,
                              structuredCablingSection: {
                                ...data.structuredCablingSection,
                                cablingFlow: newFlow,
                              },
                            });
                          }}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-600">Highlight</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Clients Section */}
          {activeTab === 'clients' && (
            <>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  Section Header
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label>Badge Text</Label>
                    <Input
                      value={data.clientsSection.badge}
                      onChange={(e) =>
                        setData({
                          ...data,
                          clientsSection: { ...data.clientsSection, badge: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={data.clientsSection.title}
                      onChange={(e) =>
                        setData({
                          ...data,
                          clientsSection: { ...data.clientsSection, title: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={data.clientsSection.description}
                      onChange={(e) =>
                        setData({
                          ...data,
                          clientsSection: { ...data.clientsSection, description: e.target.value },
                        })
                      }
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Client Logos ({data.clientsSection.logos.length})
                  </h2>
                  <Button
                    onClick={() =>
                      setData({
                        ...data,
                        clientsSection: {
                          ...data.clientsSection,
                          logos: [...data.clientsSection.logos, { src: '', alt: '' }],
                        },
                      })
                    }
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Logo
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.clientsSection.logos.map((logo: any, index: number) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium text-gray-900">
                          Logo {index + 1}
                        </h3>
                        <Button
                          onClick={() => {
                            const newLogos = data.clientsSection.logos.filter(
                              (_: any, i: number) => i !== index
                            );
                            setData({
                              ...data,
                              clientsSection: { ...data.clientsSection, logos: newLogos },
                            });
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label>Logo Image</Label>
                          <div className="flex items-center gap-3">
                            <Input
                              value={logo.src}
                              onChange={(e) => {
                                const newLogos = [...data.clientsSection.logos];
                                newLogos[index] = { ...logo, src: e.target.value };
                                setData({
                                  ...data,
                                  clientsSection: { ...data.clientsSection, logos: newLogos },
                                });
                              }}
                              placeholder="/clients/logo.png"
                              className="flex-1"
                            />
                            <Button
                              onClick={() =>
                                document.getElementById(`logo-upload-${index}`)?.click()
                              }
                              variant="outline"
                              disabled={uploadingLogo === index}
                            >
                              {uploadingLogo === index ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Upload className="w-4 h-4" />
                              )}
                            </Button>
                            <input
                              id={`logo-upload-${index}`}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleLogoUpload(e, index)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Alt Text</Label>
                          <Input
                            value={logo.alt}
                            onChange={(e) => {
                              const newLogos = [...data.clientsSection.logos];
                              newLogos[index] = { ...logo, alt: e.target.value };
                              setData({
                                ...data,
                                clientsSection: { ...data.clientsSection, logos: newLogos },
                              });
                            }}
                            placeholder="Company Name"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={saving} size="lg">
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save All Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
