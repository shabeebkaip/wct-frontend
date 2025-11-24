'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StructuredCablingSectionProps {
  data: HomePageData;
  updateData: (updates: Partial<HomePageData>) => void;
  editingField: string | null;
  setEditingField: (field: string | null) => void;
}

export default function StructuredCablingSection({
  data,
  updateData,
}: StructuredCablingSectionProps) {
  // Initialize arrays if they don't exist
  React.useEffect(() => {
    const section = data.structuredCablingSection;
    const needsUpdate = 
      !section.cablingFlow || 
      !section.copperCabling || 
      !section.fiberCabling || 
      !section.features;

    if (needsUpdate) {
      updateData({
        structuredCablingSection: {
          ...section,
          cablingFlow: section.cablingFlow || [],
          copperCabling: section.copperCabling || [],
          fiberCabling: section.fiberCabling || [],
          features: section.features || [],
        },
      });
    }
  }, [data.structuredCablingSection, updateData]);

  const EditableText = ({
    value,
    onChange,
    multiline = false,
    className = '',
  }: {
    value: string;
    onChange: (value: string) => void;
    multiline?: boolean;
    className?: string;
  }) => {
    const [localValue, setLocalValue] = React.useState(value);

    React.useEffect(() => {
      setLocalValue(value);
    }, [value]);

    const handleBlur = () => {
      if (localValue !== value) {
        onChange(localValue);
      }
    };

    if (multiline) {
      return (
        <textarea
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
          className={`${className} w-full px-3 py-2 rounded-lg transition-all bg-white border border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-900 outline-none`}
          rows={3}
        />
      );
    }

    return (
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        className={`${className} w-full px-3 py-2 rounded-lg transition-all bg-white border border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-900 outline-none`}
      />
    );
  };

  const IconSelector = ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (icon: string) => void;
  }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const commonIcons = [
      'Network',
      'Cable',
      'Server',
      'Database',
      'Workflow',
      'Zap',
      'HardDrive',
      'Cpu',
      'Activity',
      'Radio',
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const CurrentIcon = (LucideIcons as any)[value] || LucideIcons.HelpCircle;

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:border-gray-300 bg-white transition-colors"
        >
          <CurrentIcon className="w-5 h-5 text-gray-700" />
          <span className="text-sm font-medium text-gray-900 flex-1 text-left truncate">
            {value}
          </span>
          <LucideIcons.ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl max-h-64 overflow-y-auto">
              {commonIcons.map((iconName) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const Icon = (LucideIcons as any)[iconName];
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => {
                      onChange(iconName);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 transition-colors ${
                      value === iconName ? 'bg-blue-100' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5 text-gray-700" />
                    <span className="text-sm font-medium text-gray-900">{iconName}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-linear-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Badge Text</label>
            <EditableText
              value={data.structuredCablingSection.badge}
              onChange={(value) =>
                updateData({
                  structuredCablingSection: { ...data.structuredCablingSection, badge: value },
                })
              }
              className="text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Section Title</label>
            <EditableText
              value={data.structuredCablingSection.title}
              onChange={(value) =>
                updateData({
                  structuredCablingSection: { ...data.structuredCablingSection, title: value },
                })
              }
              className="text-2xl font-bold"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <EditableText
              value={data.structuredCablingSection.description}
              onChange={(value) =>
                updateData({
                  structuredCablingSection: { ...data.structuredCablingSection, description: value },
                })
              }
              multiline
              className="text-lg text-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Cabling Flow Section */}
      <div className="bg-linear-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">🔄 Infrastructure Components</h3>
            <p className="text-sm text-slate-600 mt-1">Cabling flow diagram elements</p>
          </div>
          <Button
            onClick={() => {
              const newItem = {
                label: 'New Component',
                active: false,
                highlight: false,
              };
              updateData({
                structuredCablingSection: {
                  ...data.structuredCablingSection,
                  cablingFlow: [...data.structuredCablingSection.cablingFlow, newItem],
                },
              });
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Component
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.structuredCablingSection.cablingFlow.map((item, index) => (
            <div key={index} className="group relative">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-all">
                <Button
                  onClick={() => {
                    const newFlow = data.structuredCablingSection.cablingFlow.filter((_, i) => i !== index);
                    updateData({
                      structuredCablingSection: { ...data.structuredCablingSection, cablingFlow: newFlow },
                    });
                  }}
                  variant="destructive"
                  size="icon-sm"
                  className="absolute -top-2 -right-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg z-10"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Label</label>
                    <EditableText
                      value={item.label}
                      onChange={(value) => {
                        const newFlow = [...data.structuredCablingSection.cablingFlow];
                        newFlow[index] = { ...item, label: value };
                        updateData({
                          structuredCablingSection: { ...data.structuredCablingSection, cablingFlow: newFlow },
                        });
                      }}
                      className="text-sm font-semibold"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.active || false}
                        onChange={(e) => {
                          const newFlow = [...data.structuredCablingSection.cablingFlow];
                          newFlow[index] = { ...item, active: e.target.checked };
                          updateData({
                            structuredCablingSection: { ...data.structuredCablingSection, cablingFlow: newFlow },
                          });
                        }}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-xs text-gray-600">Active</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.highlight || false}
                        onChange={(e) => {
                          const newFlow = [...data.structuredCablingSection.cablingFlow];
                          newFlow[index] = { ...item, highlight: e.target.checked };
                          updateData({
                            structuredCablingSection: { ...data.structuredCablingSection, cablingFlow: newFlow },
                          });
                        }}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-xs text-gray-600">Highlight</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Copper Cabling Section */}
      <div className="bg-linear-to-br from-orange-50 to-white p-6 rounded-2xl border border-orange-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">🔌 Copper Cabling</h3>
            <p className="text-sm text-slate-600 mt-1">UTP, STP, FTP, and Coaxial options</p>
          </div>
          <Button
            onClick={() => {
              const newItem = {
                title: 'New Cabling Type',
                icon: 'Cable',
              };
              updateData({
                structuredCablingSection: {
                  ...data.structuredCablingSection,
                  copperCabling: [...data.structuredCablingSection.copperCabling, newItem],
                },
              });
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Type
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.structuredCablingSection.copperCabling.map((item, index) => (
            <div key={index} className="group relative">
              <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-orange-400 transition-all">
                <Button
                  onClick={() => {
                    const newCopper = data.structuredCablingSection.copperCabling.filter((_, i) => i !== index);
                    updateData({
                      structuredCablingSection: { ...data.structuredCablingSection, copperCabling: newCopper },
                    });
                  }}
                  variant="destructive"
                  size="icon-sm"
                  className="absolute -top-2 -right-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg z-10"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-2 block">Icon</label>
                    <IconSelector
                      value={item.icon}
                      onChange={(icon) => {
                        const newCopper = [...data.structuredCablingSection.copperCabling];
                        newCopper[index] = { ...item, icon };
                        updateData({
                          structuredCablingSection: { ...data.structuredCablingSection, copperCabling: newCopper },
                        });
                      }}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-2 block">Title</label>
                    <EditableText
                      value={item.title}
                      onChange={(value) => {
                        const newCopper = [...data.structuredCablingSection.copperCabling];
                        newCopper[index] = { ...item, title: value };
                        updateData({
                          structuredCablingSection: { ...data.structuredCablingSection, copperCabling: newCopper },
                        });
                      }}
                      className="font-semibold"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fiber Cabling Section */}
      <div className="bg-linear-to-br from-green-50 to-white p-6 rounded-2xl border border-green-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">📡 Fiber Cabling</h3>
            <p className="text-sm text-slate-600 mt-1">Single mode and multi mode options</p>
          </div>
          <Button
            onClick={() => {
              const newItem = {
                title: 'New Fiber Type',
                subtitle: 'Indoor & Outdoor',
                icon: 'Server',
              };
              updateData({
                structuredCablingSection: {
                  ...data.structuredCablingSection,
                  fiberCabling: [...data.structuredCablingSection.fiberCabling, newItem],
                },
              });
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Type
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.structuredCablingSection.fiberCabling.map((item, index) => (
            <div key={index} className="group relative">
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-green-400 transition-all">
                <Button
                  onClick={() => {
                    const newFiber = data.structuredCablingSection.fiberCabling.filter((_, i) => i !== index);
                    updateData({
                      structuredCablingSection: { ...data.structuredCablingSection, fiberCabling: newFiber },
                    });
                  }}
                  variant="destructive"
                  size="icon-sm"
                  className="absolute -top-2 -right-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg z-10"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-2 block">Icon</label>
                    <IconSelector
                      value={item.icon}
                      onChange={(icon) => {
                        const newFiber = [...data.structuredCablingSection.fiberCabling];
                        newFiber[index] = { ...item, icon };
                        updateData({
                          structuredCablingSection: { ...data.structuredCablingSection, fiberCabling: newFiber },
                        });
                      }}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-2 block">Title</label>
                    <EditableText
                      value={item.title}
                      onChange={(value) => {
                        const newFiber = [...data.structuredCablingSection.fiberCabling];
                        newFiber[index] = { ...item, title: value };
                        updateData({
                          structuredCablingSection: { ...data.structuredCablingSection, fiberCabling: newFiber },
                        });
                      }}
                      className="font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-2 block">Subtitle</label>
                    <EditableText
                      value={item.subtitle}
                      onChange={(value) => {
                        const newFiber = [...data.structuredCablingSection.fiberCabling];
                        newFiber[index] = { ...item, subtitle: value };
                        updateData({
                          structuredCablingSection: { ...data.structuredCablingSection, fiberCabling: newFiber },
                        });
                      }}
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-linear-to-br from-purple-50 to-white p-6 rounded-2xl border border-purple-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">✨ Key Features</h3>
            <p className="text-sm text-slate-600 mt-1">Highlight main benefits and capabilities</p>
          </div>
          <Button
            onClick={() => {
              const newFeature = {
                icon: 'Network',
                title: 'New Feature',
                description: 'Feature description',
              };
              updateData({
                structuredCablingSection: {
                  ...data.structuredCablingSection,
                  features: [...data.structuredCablingSection.features, newFeature],
                },
              });
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Feature
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.structuredCablingSection.features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-purple-400 transition-all">
                <Button
                  onClick={() => {
                    const newFeatures = data.structuredCablingSection.features.filter((_, i) => i !== index);
                    updateData({
                      structuredCablingSection: { ...data.structuredCablingSection, features: newFeatures },
                    });
                  }}
                  variant="destructive"
                  size="icon-sm"
                  className="absolute -top-2 -right-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg z-10"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-2 block">Icon</label>
                    <IconSelector
                      value={feature.icon}
                      onChange={(icon) => {
                        const newFeatures = [...data.structuredCablingSection.features];
                        newFeatures[index] = { ...feature, icon };
                        updateData({
                          structuredCablingSection: { ...data.structuredCablingSection, features: newFeatures },
                        });
                      }}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-2 block">Title</label>
                    <EditableText
                      value={feature.title}
                      onChange={(value) => {
                        const newFeatures = [...data.structuredCablingSection.features];
                        newFeatures[index] = { ...feature, title: value };
                        updateData({
                          structuredCablingSection: { ...data.structuredCablingSection, features: newFeatures },
                        });
                      }}
                      className="font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-2 block">Description</label>
                    <EditableText
                      value={feature.description}
                      onChange={(value) => {
                        const newFeatures = [...data.structuredCablingSection.features];
                        newFeatures[index] = { ...feature, description: value };
                        updateData({
                          structuredCablingSection: { ...data.structuredCablingSection, features: newFeatures },
                        });
                      }}
                      multiline
                      className="text-sm text-gray-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
