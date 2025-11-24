'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Plus, Trash2, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface LowCurrentSectionProps {
  data: HomePageData;
  updateData: (updates: Partial<HomePageData>) => void;
  editingField: string | null;
  setEditingField: (field: string | null) => void;
}

export default function LowCurrentSection({
  data,
  updateData,
  editingField,
  setEditingField,
}: LowCurrentSectionProps) {
  // Ensure all required fields have defaults
  React.useEffect(() => {
    let needsUpdate = false;
    const updatedData = { ...data.lowCurrentSection };

    if (!updatedData.securityFlow) {
      updatedData.securityFlow = [];
      needsUpdate = true;
    }

    if (!updatedData.solutions) {
      updatedData.solutions = [];
      needsUpdate = true;
    }

    if (!updatedData.additionalSolutions) {
      updatedData.additionalSolutions = [];
      needsUpdate = true;
    }

    if (needsUpdate) {
      updateData({ lowCurrentSection: updatedData });
    }
  }, [data.lowCurrentSection, updateData]);

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
    const isEditing = editingField === fieldKey;

    if (multiline) {
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setEditingField(fieldKey)}
          onBlur={() => setEditingField(null)}
          className={`${className} ${
            isEditing ? 'ring-2 ring-blue-500' : ''
          } w-full px-3 py-2 rounded-lg transition-all bg-white border border-gray-300 hover:border-gray-400 focus:border-blue-500 text-gray-900`}
          rows={3}
        />
      );
    }

    return (
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setEditingField(fieldKey)}
        onBlur={() => setEditingField(null)}
        className={`${className} bg-white`}
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
      'Lock',
      'Eye',
      'Radio',
      'Wifi',
      'Zap',
      'Settings',
      'Activity',
      'Tv',
      'Video',
      'Lightbulb',
      'Building',
      'MapPin',
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
      <div className="bg-linear-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-200">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Badge Text</label>
            <EditableText
              value={data.lowCurrentSection.badge}
              onChange={(value) =>
                updateData({
                  lowCurrentSection: { ...data.lowCurrentSection, badge: value },
                })
              }
              fieldKey="low-current-badge"
              className="text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Section Title</label>
            <EditableText
              value={data.lowCurrentSection.title}
              onChange={(value) =>
                updateData({
                  lowCurrentSection: { ...data.lowCurrentSection, title: value },
                })
              }
              fieldKey="low-current-title"
              className="text-2xl font-bold"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <EditableText
              value={data.lowCurrentSection.description}
              onChange={(value) =>
                updateData({
                  lowCurrentSection: { ...data.lowCurrentSection, description: value },
                })
              }
              fieldKey="low-current-description"
              multiline
              className="text-lg text-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Security Flow Section */}
      <div className="bg-linear-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">🔄 Security Flow</h3>
            <p className="text-sm text-slate-600 mt-1">Multi-layered security approach steps</p>
          </div>
          <Button
            onClick={() => {
              const newStep = {
                step: (data.lowCurrentSection.securityFlow || []).length + 1,
                title: 'New Security Step',
                description: 'Step description',
              };
              updateData({
                lowCurrentSection: {
                  ...data.lowCurrentSection,
                  securityFlow: [...(data.lowCurrentSection.securityFlow || []), newStep],
                },
              });
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Step
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {(data.lowCurrentSection.securityFlow || []).map((flowStep, index) => (
            <div key={index} className="group relative">
              <div className="bg-white border-2 border-blue-200 rounded-xl p-4 hover:border-blue-400 transition-all">
                <Button
                  onClick={() => {
                    const newSteps = (data.lowCurrentSection.securityFlow || []).filter(
                      (_, i) => i !== index
                    );
                    updateData({
                      lowCurrentSection: { ...data.lowCurrentSection, securityFlow: newSteps },
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
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Step Number</label>
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <input
                        type="number"
                        value={flowStep.step}
                        onChange={(e) => {
                          const newSteps = [...(data.lowCurrentSection.securityFlow || [])];
                          newSteps[index] = { ...flowStep, step: parseInt(e.target.value) || 1 };
                          updateData({
                            lowCurrentSection: { ...data.lowCurrentSection, securityFlow: newSteps },
                          });
                        }}
                        className="w-6 text-center font-bold text-blue-600 bg-transparent border-none outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Title</label>
                    <EditableText
                      value={flowStep.title}
                      onChange={(value) => {
                        const newSteps = [...(data.lowCurrentSection.securityFlow || [])];
                        newSteps[index] = { ...flowStep, title: value };
                        updateData({
                          lowCurrentSection: { ...data.lowCurrentSection, securityFlow: newSteps },
                        });
                      }}
                      fieldKey={`flow-step-title-${index}`}
                      className="text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Description</label>
                    <EditableText
                      value={flowStep.description}
                      onChange={(value) => {
                        const newSteps = [...(data.lowCurrentSection.securityFlow || [])];
                        newSteps[index] = { ...flowStep, description: value };
                        updateData({
                          lowCurrentSection: { ...data.lowCurrentSection, securityFlow: newSteps },
                        });
                      }}
                      fieldKey={`flow-step-desc-${index}`}
                      className="text-xs text-gray-600"
                    />
                  </div>
                </div>
              </div>
              {index < (data.lowCurrentSection.securityFlow || []).length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 translate-x-1/2 z-10">
                  <ArrowRight className="w-5 h-5 text-blue-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Solutions Section */}
      <div className="bg-linear-to-br from-green-50 to-white p-6 rounded-2xl border border-green-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">📦 Main Solutions</h3>
            <p className="text-sm text-slate-600 mt-1">Four main security solutions with features</p>
          </div>
          <Button
            onClick={() => {
              const newSolution = {
                icon: 'Shield',
                title: 'New Solution',
                description: 'Solution description',
                features: ['Feature 1', 'Feature 2'],
              };
              updateData({
                lowCurrentSection: {
                  ...data.lowCurrentSection,
                  solutions: [...(data.lowCurrentSection.solutions || []), newSolution],
                },
              });
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Solution Card
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {(data.lowCurrentSection.solutions || []).map((solution, index) => (
            <div
              key={index}
              className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all"
            >
              <Button
                onClick={() => {
                  const newSolutions = (data.lowCurrentSection.solutions || []).filter(
                    (_, i) => i !== index
                  );
                  updateData({
                    lowCurrentSection: { ...data.lowCurrentSection, solutions: newSolutions },
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
                    value={solution.icon}
                    onChange={(icon) => {
                      const newSolutions = [...(data.lowCurrentSection.solutions || [])];
                      newSolutions[index] = { ...solution, icon };
                      updateData({
                        lowCurrentSection: { ...data.lowCurrentSection, solutions: newSolutions },
                      });
                    }}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-2 block">Title</label>
                  <EditableText
                    value={solution.title}
                    onChange={(value) => {
                      const newSolutions = [...(data.lowCurrentSection.solutions || [])];
                      newSolutions[index] = { ...solution, title: value };
                      updateData({
                        lowCurrentSection: { ...data.lowCurrentSection, solutions: newSolutions },
                      });
                    }}
                    fieldKey={`solution-title-${index}`}
                    className="font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-2 block">Description</label>
                  <EditableText
                    value={solution.description}
                    onChange={(value) => {
                      const newSolutions = [...(data.lowCurrentSection.solutions || [])];
                      newSolutions[index] = { ...solution, description: value };
                      updateData({
                        lowCurrentSection: { ...data.lowCurrentSection, solutions: newSolutions },
                      });
                    }}
                    fieldKey={`solution-desc-${index}`}
                    multiline
                    className="text-sm text-gray-600"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-gray-600">Features</label>
                    <Button
                      onClick={() => {
                        const newSolutions = [...(data.lowCurrentSection.solutions || [])];
                        newSolutions[index] = {
                          ...solution,
                          features: [...solution.features, 'New Feature'],
                        };
                        updateData({
                          lowCurrentSection: { ...data.lowCurrentSection, solutions: newSolutions },
                        });
                      }}
                      variant="outline"
                      size="sm"
                    >
                      + Add Feature
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {solution.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex gap-2 items-center">
                        <Input
                          type="text"
                          value={feature}
                          onChange={(e) => {
                            const newSolutions = [...(data.lowCurrentSection.solutions || [])];
                            const newFeatures = [...solution.features];
                            newFeatures[fIdx] = e.target.value;
                            newSolutions[index] = { ...solution, features: newFeatures };
                            updateData({
                              lowCurrentSection: {
                                ...data.lowCurrentSection,
                                solutions: newSolutions,
                              },
                            });
                          }}
                          className="flex-1 bg-white"
                        />
                        <Button
                          onClick={() => {
                            const newSolutions = [...(data.lowCurrentSection.solutions || [])];
                            const newFeatures = solution.features.filter((_, i) => i !== fIdx);
                            newSolutions[index] = { ...solution, features: newFeatures };
                            updateData({
                              lowCurrentSection: {
                                ...data.lowCurrentSection,
                                solutions: newSolutions,
                              },
                            });
                          }}
                          variant="ghost"
                          size="icon-sm"
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Solutions Section */}
      <div className="bg-linear-to-br from-purple-50 to-white p-6 rounded-2xl border border-purple-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">🔧 Additional Solutions</h3>
            <p className="text-sm text-slate-600 mt-1">Extra services and solutions</p>
          </div>
          <Button
            onClick={() => {
              const newService = {
                icon: 'Zap',
                title: 'New Service',
                description: 'Service description',
              };
              updateData({
                lowCurrentSection: {
                  ...data.lowCurrentSection,
                  additionalSolutions: [
                    ...(data.lowCurrentSection.additionalSolutions || []),
                    newService,
                  ],
                },
              });
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(data.lowCurrentSection.additionalSolutions || []).map((service, index) => (
            <div
              key={index}
              className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all"
            >
              <Button
                onClick={() => {
                  const newServices = (data.lowCurrentSection.additionalSolutions || []).filter(
                    (_, i) => i !== index
                  );
                  updateData({
                    lowCurrentSection: { ...data.lowCurrentSection, additionalSolutions: newServices },
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
                    value={service.icon}
                    onChange={(icon) => {
                      const newServices = [...(data.lowCurrentSection.additionalSolutions || [])];
                      newServices[index] = { ...service, icon };
                      updateData({
                        lowCurrentSection: {
                          ...data.lowCurrentSection,
                          additionalSolutions: newServices,
                        },
                      });
                    }}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-2 block">Title</label>
                  <EditableText
                    value={service.title}
                    onChange={(value) => {
                      const newServices = [...(data.lowCurrentSection.additionalSolutions || [])];
                      newServices[index] = { ...service, title: value };
                      updateData({
                        lowCurrentSection: {
                          ...data.lowCurrentSection,
                          additionalSolutions: newServices,
                        },
                      });
                    }}
                    fieldKey={`service-title-${index}`}
                    className="font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-2 block">Description</label>
                  <EditableText
                    value={service.description}
                    onChange={(value) => {
                      const newServices = [...(data.lowCurrentSection.additionalSolutions || [])];
                      newServices[index] = { ...service, description: value };
                      updateData({
                        lowCurrentSection: {
                          ...data.lowCurrentSection,
                          additionalSolutions: newServices,
                        },
                      });
                    }}
                    fieldKey={`service-desc-${index}`}
                    multiline
                    className="text-sm text-gray-600"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
