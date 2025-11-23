'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Plus, Trash2 } from 'lucide-react';

interface CCTVSectionProps {
  data: HomePageData;
  updateData: (updates: Partial<HomePageData>) => void;
  editingField: string | null;
  setEditingField: (field: string | null) => void;
}

export default function CCTVSection({
  data,
  updateData,
  editingField,
  setEditingField,
}: CCTVSectionProps) {
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
      'Camera',
      'Lock',
      'Eye',
      'Wifi',
      'Server',
      'Database',
      'Cloud',
      'Zap',
      'Bell',
      'Radio',
      'Cpu',
      'HardDrive',
      'Network',
      'Antenna',
      'Building',
      'Users',
      'UserCheck',
      'ShieldCheck',
      'Activity',
      'MapPin',
      'Home',
      'ShoppingBag',
      'Package',
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
      {/* Section Header with Preview */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">
              <LucideIcons.Camera className="inline w-6 h-6 mr-2" />
              CCTV Surveillance Section
            </h2>
            <p className="text-blue-100 text-sm">Edit as it appears on your website</p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Header Section - As it appears on website */}
        <div className="text-center space-y-4 pb-6 border-b border-gray-200">
          <div className="inline-block">
            <div className="text-xs font-medium text-gray-600 mb-2">📌 BADGE TEXT (Small blue label)</div>
            <div className="px-6 py-2.5 bg-blue-100 border border-blue-300 rounded-full text-blue-700 text-sm font-semibold inline-flex items-center gap-2 min-w-[300px]">
              <LucideIcons.Camera className="w-4 h-4" />
              <EditableText
                value={data.cctvSection.badge}
                onChange={(value) =>
                  updateData({
                    cctvSection: { ...data.cctvSection, badge: value },
                  })
                }
                fieldKey="cctv-badge"
                className="text-sm bg-transparent flex-1 text-center"
              />
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-gray-600 mb-2">📝 MAIN TITLE (Large heading)</div>
            <EditableText
              value={data.cctvSection.title}
              onChange={(value) =>
                updateData({
                  cctvSection: { ...data.cctvSection, title: value },
                })
              }
              fieldKey="cctv-title"
              className="text-4xl font-bold text-gray-900 text-center"
            />
          </div>

          <div>
            <div className="text-xs font-medium text-gray-600 mb-2">📄 DESCRIPTION (Subtitle text)</div>
            <EditableText
              value={data.cctvSection.description}
              onChange={(value) =>
                updateData({
                  cctvSection: { ...data.cctvSection, description: value },
                })
              }
              fieldKey="cctv-description"
              multiline
              className="text-lg text-gray-600 max-w-3xl mx-auto text-center"
            />
          </div>
        </div>

        {/* Solutions Cards - Visual Preview */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">📦 Solution Cards</h3>
              <p className="text-sm text-gray-600">These cards appear on the website - Click to edit each one</p>
            </div>
            <button
              onClick={() => {
                const newSolution = {
                  icon: 'Shield',
                  title: 'New Solution',
                  description: 'Solution description',
                  color: 'from-blue-500 to-cyan-500',
                  features: ['Feature 1', 'Feature 2', 'Feature 3'],
                };
                updateData({
                  cctvSection: {
                    ...data.cctvSection,
                    solutions: [...(data.cctvSection.solutions || []), newSolution],
                  },
                });
              }}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              <Plus className="w-5 h-5" />
              Add New Card
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(data.cctvSection.solutions || []).map((solution, index: number) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Icon = (LucideIcons as any)[solution.icon] || LucideIcons.Shield;
              return (
                <div
                  key={index}
                  className="group relative bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-400 hover:shadow-2xl transition-all"
                >
                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      if (confirm('Delete this solution card?')) {
                        const newSolutions = (data.cctvSection.solutions || []).filter((_, i) => i !== index);
                        updateData({
                          cctvSection: { ...data.cctvSection, solutions: newSolutions },
                        });
                      }
                    }}
                    className="absolute -top-3 -right-3 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg z-10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Card Preview */}
                  <div className="space-y-4">
                    {/* Icon Section */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-gray-600 uppercase">Icon & Color</div>
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <IconSelector
                            value={solution.icon}
                            onChange={(icon) => {
                              const newSolutions = [...data.cctvSection.solutions];
                              newSolutions[index] = { ...solution, icon };
                              updateData({
                                cctvSection: { ...data.cctvSection, solutions: newSolutions },
                              });
                            }}
                          />
                        </div>
                        <div>
                          <select
                            value={solution.color}
                            onChange={(e) => {
                              const newSolutions = [...data.cctvSection.solutions];
                              newSolutions[index] = { ...solution, color: e.target.value };
                              updateData({
                                cctvSection: { ...data.cctvSection, solutions: newSolutions },
                              });
                            }}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900"
                          >
                            <option value="from-blue-500 to-cyan-500">🔵 Blue</option>
                            <option value="from-red-500 to-orange-500">🔴 Red</option>
                            <option value="from-purple-500 to-pink-500">🟣 Purple</option>
                            <option value="from-green-500 to-emerald-500">🟢 Green</option>
                            <option value="from-indigo-500 to-blue-500">🔷 Indigo</option>
                            <option value="from-yellow-500 to-orange-500">🟡 Yellow</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-1 uppercase">Card Title</div>
                      <EditableText
                        value={solution.title}
                        onChange={(value) => {
                          const newSolutions = [...data.cctvSection.solutions];
                          newSolutions[index] = { ...solution, title: value };
                          updateData({
                            cctvSection: { ...data.cctvSection, solutions: newSolutions },
                          });
                        }}
                        fieldKey={`cctv-solution-title-${index}`}
                        className="text-lg font-bold text-gray-900"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-1 uppercase">Description</div>
                      <EditableText
                        value={solution.description}
                        onChange={(value) => {
                          const newSolutions = [...data.cctvSection.solutions];
                          newSolutions[index] = { ...solution, description: value };
                          updateData({
                            cctvSection: { ...data.cctvSection, solutions: newSolutions },
                          });
                        }}
                        fieldKey={`cctv-solution-desc-${index}`}
                        multiline
                        className="text-sm text-gray-600"
                      />
                    </div>

                    {/* Features */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs font-semibold text-gray-600 uppercase">Feature Tags</div>
                        <button
                          onClick={() => {
                            const newSolutions = [...(data.cctvSection.solutions || [])];
                            newSolutions[index] = {
                              ...solution,
                              features: [...(solution.features || []), 'New Feature'],
                            };
                            updateData({
                              cctvSection: { ...data.cctvSection, solutions: newSolutions },
                            });
                          }}
                          className="text-xs px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium"
                        >
                          + Tag
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(solution.features || []).map((feature: string, fIndex: number) => (
                          <div key={fIndex} className="group/tag relative flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full border border-gray-300">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => {
                                const newSolutions = [...data.cctvSection.solutions];
                                const newFeatures = [...solution.features];
                                newFeatures[fIndex] = e.target.value;
                                newSolutions[index] = { ...solution, features: newFeatures };
                                updateData({
                                  cctvSection: { ...data.cctvSection, solutions: newSolutions },
                                });
                              }}
                              className="text-xs font-medium text-gray-700 bg-transparent border-none outline-none min-w-20"
                            />
                            <button
                              onClick={() => {
                                const newSolutions = [...(data.cctvSection.solutions || [])];
                                const newFeatures = (solution.features || []).filter((_, i) => i !== fIndex);
                                newSolutions[index] = { ...solution, features: newFeatures };
                                updateData({
                                  cctvSection: { ...data.cctvSection, solutions: newSolutions },
                                });
                              }}
                              className="text-red-500 hover:text-red-700 shrink-0"
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
      </div>
    </section>
  );
}
