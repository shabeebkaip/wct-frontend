'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Plus, Trash2 } from 'lucide-react';
import { LowCurrentData } from '@/types/lowCurrentSolution';

interface LowCurrentSectionProps {
  data: { lowCurrentSection: LowCurrentData };
  updateData: (updates: { lowCurrentSection: LowCurrentData }) => void;
  editingField: string | null;
  setEditingField: (field: string | null) => void;
}

export default function LowCurrentSection({
  data,
  updateData,
  editingField,
  setEditingField,
}: LowCurrentSectionProps) {
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
      'Lock',
      'Eye',
      'MapPin',
      'Zap',
      'Radio',
      'Wifi',
      'Settings',
      'Activity',
      'Tv',
      'Video',
      'Lightbulb',
      'Building',
      'Camera',
      'AlertTriangle',
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
      <div className="bg-indigo-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              <LucideIcons.Shield className="inline w-5 h-5 mr-2" />
              Low Current Solutions Section
            </h2>
            <p className="text-indigo-100 text-xs">Edit as it appears on your website</p>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* Header Section */}
        <div className="text-center space-y-1.5 pb-2 border-b border-gray-200">
          <div className="inline-block">
            <div className="text-xs font-medium text-gray-600 mb-0.5">📌 BADGE</div>
            <div className="px-3 py-1 bg-indigo-100 border border-indigo-300 rounded-full text-indigo-700 text-xs font-semibold inline-flex items-center gap-1.5 min-w-[200px]">
              <LucideIcons.Shield className="w-3 h-3" />
              <EditableText
                value={data.lowCurrentSection.badge}
                onChange={(value) =>
                  updateData({
                    lowCurrentSection: { ...data.lowCurrentSection, badge: value },
                  })
                }
                fieldKey="low-current-badge"
                className="text-xs bg-transparent flex-1 text-center"
              />
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-gray-600 mb-0.5">📝 TITLE</div>
            <EditableText
              value={data.lowCurrentSection.title}
              onChange={(value) =>
                updateData({
                  lowCurrentSection: { ...data.lowCurrentSection, title: value },
                })
              }
              fieldKey="low-current-title"
              className="text-xl font-bold text-gray-900 text-center"
            />
          </div>

          <div>
            <div className="text-xs font-medium text-gray-600 mb-0.5">📄 DESCRIPTION</div>
            <EditableText
              value={data.lowCurrentSection.description}
              onChange={(value) =>
                updateData({
                  lowCurrentSection: { ...data.lowCurrentSection, description: value },
                })
              }
              fieldKey="low-current-description"
              multiline
              className="text-xs text-gray-600 max-w-3xl mx-auto text-center"
            />
          </div>
        </div>

        {/* Security Flow Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-gray-900">🔒 Security Flow Steps</h3>
              <p className="text-xs text-gray-600">Implementation process steps</p>
            </div>
            <button
              onClick={() => {
                const newStep = {
                  step: (data.lowCurrentSection.securityFlow?.length || 0) + 1,
                  title: 'New Step',
                  description: 'Step description',
                };
                updateData({
                  lowCurrentSection: {
                    ...data.lowCurrentSection,
                    securityFlow: [...(data.lowCurrentSection.securityFlow || []), newStep],
                  },
                });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Step
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {(data.lowCurrentSection.securityFlow || []).map((step, index) => (
              <div
                key={index}
                className="group relative bg-white border-2 border-gray-200 rounded-xl p-3 hover:border-indigo-400 hover:shadow-xl transition-all"
              >
                {/* Delete Button */}
                <button
                  onClick={() => {
                    if (confirm('Delete this step?')) {
                      const newSteps = data.lowCurrentSection.securityFlow.filter((_, i) => i !== index);
                      // Renumber steps
                      const renumberedSteps = newSteps.map((s, i) => ({ ...s, step: i + 1 }));
                      updateData({
                        lowCurrentSection: { ...data.lowCurrentSection, securityFlow: renumberedSteps },
                      });
                    }
                  }}
                  className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg z-10"
                >
                  <Trash2 className="w-3 h-3" />
                </button>

                <div className="space-y-2">
                  {/* Step Number */}
                  <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full font-bold text-sm">
                    {step.step}
                  </div>

                  {/* Title */}
                  <div>
                    <div className="text-xs font-semibold text-gray-600 mb-0.5">Step Title</div>
                    <EditableText
                      value={step.title}
                      onChange={(value) => {
                        const newSteps = [...data.lowCurrentSection.securityFlow];
                        newSteps[index] = { ...step, title: value };
                        updateData({
                          lowCurrentSection: { ...data.lowCurrentSection, securityFlow: newSteps },
                        });
                      }}
                      fieldKey={`security-flow-title-${index}`}
                      className="text-sm font-bold text-gray-900"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <div className="text-xs font-semibold text-gray-600 mb-0.5">Description</div>
                    <EditableText
                      value={step.description}
                      onChange={(value) => {
                        const newSteps = [...data.lowCurrentSection.securityFlow];
                        newSteps[index] = { ...step, description: value };
                        updateData({
                          lowCurrentSection: { ...data.lowCurrentSection, securityFlow: newSteps },
                        });
                      }}
                      fieldKey={`security-flow-desc-${index}`}
                      multiline
                      className="text-xs text-gray-600"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Solutions Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-gray-900">🛡️ Main Solutions</h3>
              <p className="text-xs text-gray-600">Primary security solutions</p>
            </div>
            <button
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
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Solution
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(data.lowCurrentSection.solutions || []).map((solution, index) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Icon = (LucideIcons as any)[solution.icon] || LucideIcons.Shield;
              return (
                <div
                  key={index}
                  className="group relative bg-white border-2 border-gray-200 rounded-xl p-3 hover:border-indigo-400 hover:shadow-xl transition-all"
                >
                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      if (confirm('Delete this solution?')) {
                        const newSolutions = data.lowCurrentSection.solutions.filter((_, i) => i !== index);
                        updateData({
                          lowCurrentSection: { ...data.lowCurrentSection, solutions: newSolutions },
                        });
                      }
                    }}
                    className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg z-10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>

                  <div className="space-y-2">
                    {/* Icon */}
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-gray-600">Icon</div>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <IconSelector
                            value={solution.icon}
                            onChange={(icon) => {
                              const newSolutions = [...data.lowCurrentSection.solutions];
                              newSolutions[index] = { ...solution, icon };
                              updateData({
                                lowCurrentSection: { ...data.lowCurrentSection, solutions: newSolutions },
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-0.5">Title</div>
                      <EditableText
                        value={solution.title}
                        onChange={(value) => {
                          const newSolutions = [...data.lowCurrentSection.solutions];
                          newSolutions[index] = { ...solution, title: value };
                          updateData({
                            lowCurrentSection: { ...data.lowCurrentSection, solutions: newSolutions },
                          });
                        }}
                        fieldKey={`solution-title-${index}`}
                        className="text-sm font-bold text-gray-900"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-0.5">Description</div>
                      <EditableText
                        value={solution.description}
                        onChange={(value) => {
                          const newSolutions = [...data.lowCurrentSection.solutions];
                          newSolutions[index] = { ...solution, description: value };
                          updateData({
                            lowCurrentSection: { ...data.lowCurrentSection, solutions: newSolutions },
                          });
                        }}
                        fieldKey={`solution-desc-${index}`}
                        multiline
                        className="text-xs text-gray-600"
                      />
                    </div>

                    {/* Features */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-xs font-semibold text-gray-600">Features</div>
                        <button
                          onClick={() => {
                            const newSolutions = [...data.lowCurrentSection.solutions];
                            newSolutions[index] = {
                              ...solution,
                              features: [...(solution.features || []), 'New Feature'],
                            };
                            updateData({
                              lowCurrentSection: { ...data.lowCurrentSection, solutions: newSolutions },
                            });
                          }}
                          className="text-indigo-600 hover:text-indigo-700 text-xs font-medium"
                        >
                          + Add
                        </button>
                      </div>
                      <div className="space-y-1">
                        {(solution.features || []).map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-1">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => {
                                const newSolutions = [...(data.lowCurrentSection.solutions || [])];
                                const newFeatures = [...(solution.features || [])];
                                newFeatures[fIdx] = e.target.value;
                                newSolutions[index] = { ...solution, features: newFeatures };
                                updateData({
                                  lowCurrentSection: { ...data.lowCurrentSection, solutions: newSolutions },
                                });
                              }}
                              className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded text-gray-900"
                            />
                            <button
                              onClick={() => {
                                const newSolutions = [...data.lowCurrentSection.solutions];
                                const newFeatures = solution.features.filter((_, i) => i !== fIdx);
                                newSolutions[index] = { ...solution, features: newFeatures };
                                updateData({
                                  lowCurrentSection: { ...data.lowCurrentSection, solutions: newSolutions },
                                });
                              }}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-3 h-3" />
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

        {/* Additional Solutions Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-gray-900">➕ Additional Solutions</h3>
              <p className="text-xs text-gray-600">Supplementary services</p>
            </div>
            <button
              onClick={() => {
                const newSolution = {
                  icon: 'Zap',
                  title: 'New Service',
                  description: 'Service description',
                };
                updateData({
                  lowCurrentSection: {
                    ...data.lowCurrentSection,
                    additionalSolutions: [...(data.lowCurrentSection.additionalSolutions || []), newSolution],
                  },
                });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Service
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(data.lowCurrentSection.additionalSolutions || []).map((solution, index) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Icon = (LucideIcons as any)[solution.icon] || LucideIcons.Zap;
              return (
                <div
                  key={index}
                  className="group relative bg-white border-2 border-gray-200 rounded-xl p-3 hover:border-indigo-400 hover:shadow-xl transition-all"
                >
                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      if (confirm('Delete this service?')) {
                        const newSolutions = data.lowCurrentSection.additionalSolutions.filter(
                          (_, i) => i !== index
                        );
                        updateData({
                          lowCurrentSection: { ...data.lowCurrentSection, additionalSolutions: newSolutions },
                        });
                      }
                    }}
                    className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg z-10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>

                  <div className="space-y-2">
                    {/* Icon */}
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-gray-600">Icon</div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <IconSelector
                            value={solution.icon}
                            onChange={(icon) => {
                              const newSolutions = [...data.lowCurrentSection.additionalSolutions];
                              newSolutions[index] = { ...solution, icon };
                              updateData({
                                lowCurrentSection: { ...data.lowCurrentSection, additionalSolutions: newSolutions },
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-0.5">Title</div>
                      <EditableText
                        value={solution.title}
                        onChange={(value) => {
                          const newSolutions = [...data.lowCurrentSection.additionalSolutions];
                          newSolutions[index] = { ...solution, title: value };
                          updateData({
                            lowCurrentSection: { ...data.lowCurrentSection, additionalSolutions: newSolutions },
                          });
                        }}
                        fieldKey={`additional-title-${index}`}
                        className="text-sm font-bold text-gray-900"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-0.5">Description</div>
                      <EditableText
                        value={solution.description}
                        onChange={(value) => {
                          const newSolutions = [...data.lowCurrentSection.additionalSolutions];
                          newSolutions[index] = { ...solution, description: value };
                          updateData({
                            lowCurrentSection: { ...data.lowCurrentSection, additionalSolutions: newSolutions },
                          });
                        }}
                        fieldKey={`additional-desc-${index}`}
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
