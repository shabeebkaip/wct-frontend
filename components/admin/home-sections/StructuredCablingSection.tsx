'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Plus, Trash2 } from 'lucide-react';
import { StructuredCablingData } from '@/types/structuredCabling';

interface StructuredCablingSectionProps {
  data: { structuredCablingSection: StructuredCablingData };
  updateData: (updates: { structuredCablingSection: StructuredCablingData }) => void;
  editingField: string | null;
  setEditingField: (field: string | null) => void;
}

export default function StructuredCablingSection({
  data,
  updateData,
  editingField,
  setEditingField,
}: StructuredCablingSectionProps) {
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

  const IconSelector = ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (icon: string) => void;
  }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const commonIcons = [
      'Shield',
      'Zap',
      'Settings',
      'Network',
      'Cable',
      'Server',
      'Database',
      'Workflow',
      'HardDrive',
      'Cpu',
      'Activity',
      'Radio',
      'Lock',
      'Eye',
      'Building',
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
    <section className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      {/* Section Header */}
      <div className="bg-blue-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              <LucideIcons.Cable className="inline w-5 h-5 mr-2" />
              Structured Cabling Section
            </h2>
            <p className="text-blue-100 text-xs">Edit as it appears on your website</p>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* Header Section */}
        <div className="text-center space-y-1.5 pb-2 border-b border-gray-200">
          <div className="inline-block">
            <div className="text-xs font-medium text-gray-600 mb-0.5">📌 BADGE</div>
            <div className="px-3 py-1 bg-blue-100 border border-blue-300 rounded-full text-blue-700 text-xs font-semibold inline-flex items-center gap-1.5 min-w-[200px]">
              <LucideIcons.Cable className="w-3 h-3" />
              <EditableText
                value={data.structuredCablingSection.badge}
                onChange={(value) =>
                  updateData({
                    structuredCablingSection: { ...data.structuredCablingSection, badge: value },
                  })
                }
                fieldKey="structured-cabling-badge"
                className="text-xs bg-transparent flex-1 text-center"
              />
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-gray-600 mb-0.5">📝 TITLE</div>
            <EditableText
              value={data.structuredCablingSection.title}
              onChange={(value) =>
                updateData({
                  structuredCablingSection: { ...data.structuredCablingSection, title: value },
                })
              }
              fieldKey="structured-cabling-title"
              className="text-xl font-bold text-gray-900 text-center"
            />
          </div>

          <div>
            <div className="text-xs font-medium text-gray-600 mb-0.5">📄 DESCRIPTION</div>
            <EditableText
              value={data.structuredCablingSection.description}
              onChange={(value) =>
                updateData({
                  structuredCablingSection: { ...data.structuredCablingSection, description: value },
                })
              }
              fieldKey="structured-cabling-description"
              multiline
              className="text-xs text-gray-600 max-w-3xl mx-auto text-center"
            />
          </div>
        </div>

        {/* Cabling Flow Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-gray-900">🔄 Infrastructure Components</h3>
              <p className="text-xs text-gray-600">Cabling flow diagram elements</p>
            </div>
            <button
              onClick={() => {
                const newItem = {
                  label: 'New Component',
                  active: false,
                  highlight: false,
                };
                updateData({
                  structuredCablingSection: {
                    ...data.structuredCablingSection,
                    cablingFlow: [...(data.structuredCablingSection.cablingFlow || []), newItem],
                  },
                });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Component
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {(data.structuredCablingSection.cablingFlow || []).map((item, index) => (
              <div
                key={index}
                className="group relative bg-white border-2 border-gray-200 rounded-xl p-3 hover:border-blue-400 hover:shadow-xl transition-all"
              >
                <button
                  onClick={() => {
                    if (confirm('Delete this component?')) {
                      const newFlow = data.structuredCablingSection.cablingFlow.filter((_, i) => i !== index);
                      updateData({
                        structuredCablingSection: { ...data.structuredCablingSection, cablingFlow: newFlow },
                      });
                    }
                  }}
                  className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg z-10"
                >
                  <Trash2 className="w-3 h-3" />
                </button>

                <div className="space-y-2">
                  <div>
                    <div className="text-xs font-semibold text-gray-600 mb-0.5">Label</div>
                    <EditableText
                      value={item.label}
                      onChange={(value) => {
                        const newFlow = [...data.structuredCablingSection.cablingFlow];
                        newFlow[index] = { ...item, label: value };
                        updateData({
                          structuredCablingSection: { ...data.structuredCablingSection, cablingFlow: newFlow },
                        });
                      }}
                      fieldKey={`cabling-flow-label-${index}`}
                      className="text-sm font-bold text-gray-900"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 cursor-pointer">
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
                        className="w-3.5 h-3.5 text-blue-600 rounded"
                      />
                      <span className="text-xs text-gray-600">Active</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer">
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
                        className="w-3.5 h-3.5 text-blue-600 rounded"
                      />
                      <span className="text-xs text-gray-600">Highlight</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copper Cabling Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-gray-900">🔌 Copper Cabling</h3>
              <p className="text-xs text-gray-600">UTP, STP, FTP, and Coaxial options</p>
            </div>
            <button
              onClick={() => {
                const newItem = {
                  title: 'New Cabling Type',
                  icon: 'Cable',
                };
                updateData({
                  structuredCablingSection: {
                    ...data.structuredCablingSection,
                    copperCabling: [...(data.structuredCablingSection.copperCabling || []), newItem],
                  },
                });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Type
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {(data.structuredCablingSection.copperCabling || []).map((item, index) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Icon = (LucideIcons as any)[item.icon] || LucideIcons.Cable;
              return (
                <div
                  key={index}
                  className="group relative bg-white border-2 border-gray-200 rounded-xl p-3 hover:border-orange-400 hover:shadow-xl transition-all"
                >
                  <button
                    onClick={() => {
                      if (confirm('Delete this copper cabling type?')) {
                        const newCopper = data.structuredCablingSection.copperCabling.filter((_, i) => i !== index);
                        updateData({
                          structuredCablingSection: { ...data.structuredCablingSection, copperCabling: newCopper },
                        });
                      }
                    }}
                    className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg z-10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>

                  <div className="space-y-2">
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-gray-600">Icon</div>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center shadow-md">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
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
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-0.5">Title</div>
                      <EditableText
                        value={item.title}
                        onChange={(value) => {
                          const newCopper = [...data.structuredCablingSection.copperCabling];
                          newCopper[index] = { ...item, title: value };
                          updateData({
                            structuredCablingSection: { ...data.structuredCablingSection, copperCabling: newCopper },
                          });
                        }}
                        fieldKey={`copper-title-${index}`}
                        className="text-sm font-bold text-gray-900"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fiber Cabling Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-gray-900">📡 Fiber Cabling</h3>
              <p className="text-xs text-gray-600">Single mode and multi mode options</p>
            </div>
            <button
              onClick={() => {
                const newItem = {
                  title: 'New Fiber Type',
                  subtitle: 'Indoor & Outdoor',
                  icon: 'Server',
                };
                updateData({
                  structuredCablingSection: {
                    ...data.structuredCablingSection,
                    fiberCabling: [...(data.structuredCablingSection.fiberCabling || []), newItem],
                  },
                });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Type
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(data.structuredCablingSection.fiberCabling || []).map((item, index) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Icon = (LucideIcons as any)[item.icon] || LucideIcons.Server;
              return (
                <div
                  key={index}
                  className="group relative bg-white border-2 border-gray-200 rounded-xl p-3 hover:border-green-400 hover:shadow-xl transition-all"
                >
                  <button
                    onClick={() => {
                      if (confirm('Delete this fiber cabling type?')) {
                        const newFiber = data.structuredCablingSection.fiberCabling.filter((_, i) => i !== index);
                        updateData({
                          structuredCablingSection: { ...data.structuredCablingSection, fiberCabling: newFiber },
                        });
                      }
                    }}
                    className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg z-10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>

                  <div className="space-y-2">
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-gray-600">Icon</div>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center shadow-md">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
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
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-0.5">Title</div>
                      <EditableText
                        value={item.title}
                        onChange={(value) => {
                          const newFiber = [...data.structuredCablingSection.fiberCabling];
                          newFiber[index] = { ...item, title: value };
                          updateData({
                            structuredCablingSection: { ...data.structuredCablingSection, fiberCabling: newFiber },
                          });
                        }}
                        fieldKey={`fiber-title-${index}`}
                        className="text-sm font-bold text-gray-900"
                      />
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-0.5">Subtitle</div>
                      <EditableText
                        value={item.subtitle}
                        onChange={(value) => {
                          const newFiber = [...data.structuredCablingSection.fiberCabling];
                          newFiber[index] = { ...item, subtitle: value };
                          updateData({
                            structuredCablingSection: { ...data.structuredCablingSection, fiberCabling: newFiber },
                          });
                        }}
                        fieldKey={`fiber-subtitle-${index}`}
                        className="text-xs text-gray-600"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-gray-900">✨ Key Features</h3>
              <p className="text-xs text-gray-600">Highlight main benefits and capabilities</p>
            </div>
            <button
              onClick={() => {
                const newFeature = {
                  icon: 'Shield',
                  title: 'New Feature',
                  description: 'Feature description',
                };
                updateData({
                  structuredCablingSection: {
                    ...data.structuredCablingSection,
                    features: [...(data.structuredCablingSection.features || []), newFeature],
                  },
                });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Feature
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {(data.structuredCablingSection.features || []).map((feature, index) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Icon = (LucideIcons as any)[feature.icon] || LucideIcons.Shield;
              return (
                <div
                  key={index}
                  className="group relative bg-white border-2 border-gray-200 rounded-xl p-3 hover:border-purple-400 hover:shadow-xl transition-all"
                >
                  <button
                    onClick={() => {
                      if (confirm('Delete this feature?')) {
                        const newFeatures = data.structuredCablingSection.features.filter((_, i) => i !== index);
                        updateData({
                          structuredCablingSection: { ...data.structuredCablingSection, features: newFeatures },
                        });
                      }
                    }}
                    className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg z-10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>

                  <div className="space-y-2">
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-gray-600">Icon</div>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center shadow-md">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
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
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-0.5">Title</div>
                      <EditableText
                        value={feature.title}
                        onChange={(value) => {
                          const newFeatures = [...data.structuredCablingSection.features];
                          newFeatures[index] = { ...feature, title: value };
                          updateData({
                            structuredCablingSection: { ...data.structuredCablingSection, features: newFeatures },
                          });
                        }}
                        fieldKey={`feature-title-${index}`}
                        className="text-sm font-bold text-gray-900"
                      />
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-0.5">Description</div>
                      <EditableText
                        value={feature.description}
                        onChange={(value) => {
                          const newFeatures = [...data.structuredCablingSection.features];
                          newFeatures[index] = { ...feature, description: value };
                          updateData({
                            structuredCablingSection: { ...data.structuredCablingSection, features: newFeatures },
                          });
                        }}
                        fieldKey={`feature-desc-${index}`}
                        multiline
                        className="text-xs text-gray-600"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
