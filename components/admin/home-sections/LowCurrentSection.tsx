'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Plus, Trash2, ArrowRight } from 'lucide-react';

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
  // Migrate old structure to new structure if needed and ensure defaults
  React.useEffect(() => {
    let needsUpdate = false;
    const updatedData = { ...data.lowCurrentSection };

    // Migrate from old structure if needed
    if (data.lowCurrentSection.solutions && !data.lowCurrentSection.mainSolutions) {
      updatedData.securityApproach = {
        title: 'Multi-Layered Security Approach',
        steps: [
          { number: '1', title: 'Perimeter Protection System', subtitle: 'First line of defense' },
          { number: '2', title: 'Access Control System', subtitle: 'Entry point management' },
          { number: '3', title: 'On Premise Security', subtitle: 'Internal monitoring' },
          { number: '4', title: 'Public Area Protection', subtitle: 'Comprehensive coverage' },
        ],
      };
      updatedData.mainSolutions = data.lowCurrentSection.solutions;
      updatedData.additionalServices = {
        title: 'Additional Services',
        services: data.lowCurrentSection.additionalSolutions || [],
      };
      delete updatedData.solutions;
      delete updatedData.additionalSolutions;
      needsUpdate = true;
    }

    // Ensure securityApproach has defaults
    if (!updatedData.securityApproach) {
      updatedData.securityApproach = {
        title: 'Multi-Layered Security Approach',
        steps: [],
      };
      needsUpdate = true;
    } else {
      if (!updatedData.securityApproach.title) {
        updatedData.securityApproach.title = 'Multi-Layered Security Approach';
        needsUpdate = true;
      }
      if (!updatedData.securityApproach.steps) {
        updatedData.securityApproach.steps = [];
        needsUpdate = true;
      }
    }

    // Ensure mainSolutions exists
    if (!updatedData.mainSolutions) {
      updatedData.mainSolutions = [];
      needsUpdate = true;
    }

    // Ensure additionalServices has defaults
    if (!updatedData.additionalServices) {
      updatedData.additionalServices = {
        title: 'Additional Services',
        services: [],
      };
      needsUpdate = true;
    } else {
      if (!updatedData.additionalServices.title) {
        updatedData.additionalServices.title = 'Additional Services';
        needsUpdate = true;
      }
      if (!updatedData.additionalServices.services) {
        updatedData.additionalServices.services = [];
        needsUpdate = true;
      }
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
            isEditing ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-200'
          } w-full px-3 py-2 rounded-lg transition-all bg-white/50 hover:bg-white focus:bg-white text-gray-900`}
          rows={3}
        />
      );
    }

    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setEditingField(fieldKey)}
        onBlur={() => setEditingField(null)}
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
    <section className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* Section Header */}
      <div className="bg-linear-to-r from-blue-600 to-cyan-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">
              <LucideIcons.Zap className="inline w-6 h-6 mr-2" />
              Low Current Systems Section
            </h2>
            <p className="text-blue-100 text-sm">Edit integrated security solutions</p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Header Content */}
        <div className="text-center space-y-4 pb-6 border-b border-gray-200">
          <div className="inline-block">
            <div className="text-xs font-medium text-gray-600 mb-2">📌 BADGE TEXT</div>
            <div className="px-6 py-2.5 bg-blue-100 border border-blue-300 rounded-full text-blue-700 text-sm font-semibold inline-flex items-center gap-2 min-w-[300px]">
              <LucideIcons.Zap className="w-4 h-4" />
              <EditableText
                value={data.lowCurrentSection.badge}
                onChange={(value) =>
                  updateData({
                    lowCurrentSection: { ...data.lowCurrentSection, badge: value },
                  })
                }
                fieldKey="low-current-badge"
                className="text-sm bg-transparent flex-1 text-center"
              />
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-gray-600 mb-2">📝 MAIN TITLE</div>
            <EditableText
              value={data.lowCurrentSection.title}
              onChange={(value) =>
                updateData({
                  lowCurrentSection: { ...data.lowCurrentSection, title: value },
                })
              }
              fieldKey="low-current-title"
              className="text-4xl font-bold text-gray-900 text-center"
            />
          </div>

          <div>
            <div className="text-xs font-medium text-gray-600 mb-2">📄 DESCRIPTION</div>
            <EditableText
              value={data.lowCurrentSection.description}
              onChange={(value) =>
                updateData({
                  lowCurrentSection: { ...data.lowCurrentSection, description: value },
                })
              }
              fieldKey="low-current-description"
              multiline
              className="text-lg text-gray-600 max-w-3xl mx-auto text-center"
            />
          </div>
        </div>

        {/* Security Approach Flow */}
        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-200">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">🔄 Multi-Layered Security Approach</h3>
                <p className="text-sm text-gray-600 mt-1">Flow diagram showing security layers</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Section Title</label>
              <EditableText
                value={data.lowCurrentSection.securityApproach.title}
                onChange={(value) =>
                  updateData({
                    lowCurrentSection: {
                      ...data.lowCurrentSection,
                      securityApproach: {
                        title: value,
                        steps: data.lowCurrentSection.securityApproach.steps,
                      },
                    },
                  })
                }
                fieldKey="security-approach-title"
                className="text-lg font-semibold"
              />
            </div>
          </div>

          {/* Flow Steps */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold text-gray-700">Flow Steps</label>
              <button
                onClick={() => {
                  const newStep = {
                    number: String(((data.lowCurrentSection.securityApproach || {}).steps || []).length + 1),
                    title: 'New Step',
                    subtitle: 'Step description',
                  };
                  updateData({
                    lowCurrentSection: {
                      ...data.lowCurrentSection,
                      securityApproach: {
                        ...(data.lowCurrentSection.securityApproach || {}),
                        steps: [...((data.lowCurrentSection.securityApproach || {}).steps || []), newStep],
                      },
                    },
                  });
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Step
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {((data.lowCurrentSection.securityApproach || {}).steps || []).map((step, index) => (
                <div key={index} className="group relative">
                  <div className="bg-white border-2 border-blue-200 rounded-xl p-4 hover:border-blue-400 transition-all">
                    <button
                      onClick={() => {
                        const newSteps = ((data.lowCurrentSection.securityApproach || {}).steps || []).filter(
                          (_, i) => i !== index
                        );
                        updateData({
                          lowCurrentSection: {
                            ...data.lowCurrentSection,
                            securityApproach: {
                              ...(data.lowCurrentSection.securityApproach || {}),
                              steps: newSteps,
                            },
                          },
                        });
                      }}
                      className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg z-10"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Step Number</label>
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                          <input
                            type="text"
                            value={step.number}
                            onChange={(e) => {
                              const newSteps = [...((data.lowCurrentSection.securityApproach || {}).steps || [])];
                              newSteps[index] = { ...step, number: e.target.value };
                              updateData({
                                lowCurrentSection: {
                                  ...data.lowCurrentSection,
                                  securityApproach: {
                                    ...(data.lowCurrentSection.securityApproach || {}),
                                    steps: newSteps,
                                  },
                                },
                              });
                            }}
                            className="w-6 text-center font-bold text-blue-600 bg-transparent border-none outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Step Title</label>
                        <EditableText
                          value={step.title}
                          onChange={(value) => {
                            const newSteps = [...((data.lowCurrentSection.securityApproach || {}).steps || [])];
                            newSteps[index] = { ...step, title: value };
                            updateData({
                              lowCurrentSection: {
                                ...data.lowCurrentSection,
                                securityApproach: {
                                  ...(data.lowCurrentSection.securityApproach || {}),
                                  steps: newSteps,
                                },
                              },
                            });
                          }}
                          fieldKey={`step-title-${index}`}
                          className="text-sm font-semibold"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Subtitle</label>
                        <EditableText
                          value={step.subtitle}
                          onChange={(value) => {
                            const newSteps = [...((data.lowCurrentSection.securityApproach || {}).steps || [])];
                            newSteps[index] = { ...step, subtitle: value };
                            updateData({
                              lowCurrentSection: {
                                ...data.lowCurrentSection,
                                securityApproach: {
                                  ...(data.lowCurrentSection.securityApproach || {}),
                                  steps: newSteps,
                                },
                              },
                            });
                          }}
                          fieldKey={`step-subtitle-${index}`}
                          className="text-xs text-gray-600"
                        />
                      </div>
                    </div>
                  </div>
                  {index < ((data.lowCurrentSection.securityApproach || {}).steps || []).length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 translate-x-1/2 z-10">
                      <ArrowRight className="w-5 h-5 text-blue-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Solutions (4 Cards) */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">📦 Main Solution Cards</h3>
              <p className="text-sm text-gray-600">Four main security solutions with features</p>
            </div>
            <button
              onClick={() => {
                const newSolution = {
                  icon: 'Shield',
                  title: 'New Solution',
                  description: 'Solution description',
                  features: ['Feature 1', 'Feature 2', 'Feature 3'],
                };
                updateData({
                  lowCurrentSection: {
                    ...data.lowCurrentSection,
                    mainSolutions: [...(data.lowCurrentSection.mainSolutions || []), newSolution],
                  },
                });
              }}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              <Plus className="w-5 h-5" />
              Add Solution Card
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(data.lowCurrentSection.mainSolutions || []).map((solution, index) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Icon = (LucideIcons as any)[solution.icon] || LucideIcons.Shield;
              return (
                <div
                  key={index}
                  className="group relative bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-400 hover:shadow-2xl transition-all"
                >
                  <button
                    onClick={() => {
                      if (confirm('Delete this solution card?')) {
                        const newSolutions = (data.lowCurrentSection.mainSolutions || []).filter(
                          (_, i) => i !== index
                        );
                        updateData({
                          lowCurrentSection: { ...data.lowCurrentSection, mainSolutions: newSolutions },
                        });
                      }
                    }}
                    className="absolute -top-3 -right-3 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg z-10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-gray-600 uppercase">Icon</div>
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <IconSelector
                        value={solution.icon}
                        onChange={(icon) => {
                          const newSolutions = [...(data.lowCurrentSection.mainSolutions || [])];
                          newSolutions[index] = { ...solution, icon };
                          updateData({
                            lowCurrentSection: { ...data.lowCurrentSection, mainSolutions: newSolutions },
                          });
                        }}
                      />
                    </div>

                    {/* Title */}
                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-1 uppercase">Card Title</div>
                      <EditableText
                        value={solution.title}
                        onChange={(value) => {
                          const newSolutions = [...(data.lowCurrentSection.mainSolutions || [])];
                          newSolutions[index] = { ...solution, title: value };
                          updateData({
                            lowCurrentSection: { ...data.lowCurrentSection, mainSolutions: newSolutions },
                          });
                        }}
                        fieldKey={`low-current-solution-title-${index}`}
                        className="text-lg font-bold text-gray-900"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-1 uppercase">Description</div>
                      <EditableText
                        value={solution.description}
                        onChange={(value) => {
                          const newSolutions = [...(data.lowCurrentSection.mainSolutions || [])];
                          newSolutions[index] = { ...solution, description: value };
                          updateData({
                            lowCurrentSection: { ...data.lowCurrentSection, mainSolutions: newSolutions },
                          });
                        }}
                        fieldKey={`low-current-solution-desc-${index}`}
                        multiline
                        className="text-sm text-gray-600"
                      />
                    </div>

                    {/* Features */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs font-semibold text-gray-600 uppercase">Features List</div>
                        <button
                          onClick={() => {
                            const newSolutions = [...(data.lowCurrentSection.mainSolutions || [])];
                            newSolutions[index] = {
                              ...solution,
                              features: [...(solution.features || []), 'New Feature'],
                            };
                            updateData({
                              lowCurrentSection: { ...data.lowCurrentSection, mainSolutions: newSolutions },
                            });
                          }}
                          className="text-xs px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium"
                        >
                          + Feature
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(solution.features || []).map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-center gap-2 text-sm">
                            <span className="text-blue-600">•</span>
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => {
                                const newSolutions = [...(data.lowCurrentSection.mainSolutions || [])];
                                const newFeatures = [...(solution.features || [])];
                                newFeatures[fIndex] = e.target.value;
                                newSolutions[index] = { ...solution, features: newFeatures };
                                updateData({
                                  lowCurrentSection: {
                                    ...data.lowCurrentSection,
                                    mainSolutions: newSolutions,
                                  },
                                });
                              }}
                              className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded bg-white text-gray-900"
                            />
                            <button
                              onClick={() => {
                                const newSolutions = [...(data.lowCurrentSection.mainSolutions || [])];
                                const newFeatures = (solution.features || []).filter((_, i) => i !== fIndex);
                                newSolutions[index] = { ...solution, features: newFeatures };
                                updateData({
                                  lowCurrentSection: {
                                    ...data.lowCurrentSection,
                                    mainSolutions: newSolutions,
                                  },
                                });
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <LucideIcons.X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Services Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">🔧 Additional Services</h3>
            <EditableText
              value={(data.lowCurrentSection.additionalServices || {}).title || ''}
              onChange={(value) =>
                updateData({
                  lowCurrentSection: {
                    ...data.lowCurrentSection,
                    additionalServices: {
                      ...(data.lowCurrentSection.additionalServices || {}),
                      title: value,
                    },
                  },
                })
              }
              fieldKey="additional-services-title"
              className="text-lg font-semibold"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold text-gray-700">Service Cards</label>
            <button
              onClick={() => {
                const newService = {
                  icon: 'Zap',
                  title: 'New Service',
                  description: 'Service description',
                };
                updateData({
                  lowCurrentSection: {
                    ...data.lowCurrentSection,
                    additionalServices: {
                      ...(data.lowCurrentSection.additionalServices || {}),
                      services: [
                        ...((data.lowCurrentSection.additionalServices || {}).services || []),
                        newService,
                      ],
                    },
                  },
                });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Service
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {((data.lowCurrentSection.additionalServices || {}).services || []).map((service, index) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Icon = (LucideIcons as any)[service.icon] || LucideIcons.Zap;
              return (
                <div
                  key={index}
                  className="group relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all"
                >
                  <button
                    onClick={() => {
                      const newServices = ((data.lowCurrentSection.additionalServices || {}).services || []).filter(
                        (_, i) => i !== index
                      );
                      updateData({
                        lowCurrentSection: {
                          ...data.lowCurrentSection,
                          additionalServices: {
                            ...(data.lowCurrentSection.additionalServices || {}),
                            services: newServices,
                          },
                        },
                      });
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Icon</label>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <IconSelector
                          value={service.icon}
                          onChange={(icon) => {
                            const newServices = [
                              ...((data.lowCurrentSection.additionalServices || {}).services || []),
                            ];
                            newServices[index] = { ...service, icon };
                            updateData({
                              lowCurrentSection: {
                                ...data.lowCurrentSection,
                                additionalServices: {
                                  ...(data.lowCurrentSection.additionalServices || {}),
                                  services: newServices,
                                },
                              },
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                      <EditableText
                        value={service.title}
                        onChange={(value) => {
                          const newServices = [
                            ...((data.lowCurrentSection.additionalServices || {}).services || []),
                          ];
                          newServices[index] = { ...service, title: value };
                          updateData({
                            lowCurrentSection: {
                              ...data.lowCurrentSection,
                              additionalServices: {
                                ...(data.lowCurrentSection.additionalServices || {}),
                                services: newServices,
                              },
                            },
                          });
                        }}
                        fieldKey={`additional-service-title-${index}`}
                        className="font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                      <EditableText
                        value={service.description}
                        onChange={(value) => {
                          const newServices = [
                            ...((data.lowCurrentSection.additionalServices || {}).services || []),
                          ];
                          newServices[index] = { ...service, description: value };
                          updateData({
                            lowCurrentSection: {
                              ...data.lowCurrentSection,
                              additionalServices: {
                                ...(data.lowCurrentSection.additionalServices || {}),
                                services: newServices,
                              },
                            },
                          });
                        }}
                        fieldKey={`additional-service-desc-${index}`}
                        multiline
                        className="text-sm"
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
