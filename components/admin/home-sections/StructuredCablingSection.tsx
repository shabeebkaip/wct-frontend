'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Plus, Trash2 } from 'lucide-react';

interface StructuredCablingSectionProps {
  data: HomePageData;
  updateData: (updates: Partial<HomePageData>) => void;
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
    const isEditing = editingField === fieldKey;

    if (multiline) {
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setEditingField(fieldKey)}
          onBlur={() => setEditingField(null)}
          className={`${className} ${
            isEditing ? 'ring-2 ring-gray-500' : 'ring-1 ring-gray-200'
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
          isEditing ? 'ring-2 ring-gray-500' : 'ring-1 ring-gray-200'
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
      'Network',
      'Cable',
      'Zap',
      'Server',
      'Database',
      'HardDrive',
      'Cpu',
      'Activity',
      'Radio',
      'Wifi',
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
                    className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors ${
                      value === iconName ? 'bg-gray-100' : ''
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
    <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          <LucideIcons.Network className="inline w-6 h-6 mr-2 text-gray-600" />
          Structured Cabling Section
        </h2>
        <p className="text-gray-600">Edit structured cabling solutions</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Solutions</label>
          <button
            onClick={() => {
              const newSolution = {
                icon: 'Network',
                title: 'New Solution',
                description: 'Solution description',
              };
              updateData({
                structuredCablingSection: {
                  ...data.structuredCablingSection,
                  additionalSolutions: [...(data.structuredCablingSection.additionalSolutions || []), newSolution],
                },
              });
            }}
            className="mb-4 flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Solution
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(data.structuredCablingSection.additionalSolutions || []).map((solution, index: number) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Icon = (LucideIcons as any)[solution.icon] || LucideIcons.Network;
              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all"
                >
                  <button
                    onClick={() => {
                      const newSolutions = (data.structuredCablingSection.additionalSolutions || []).filter(
                        (_, i) => i !== index
                      );
                      updateData({
                        structuredCablingSection: {
                          ...data.structuredCablingSection,
                          additionalSolutions: newSolutions,
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
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Icon className="w-6 h-6 text-gray-600" />
                        </div>
                        <IconSelector
                          value={solution.icon}
                          onChange={(icon) => {
                            const newSolutions = [...(data.structuredCablingSection.additionalSolutions || [])];
                            newSolutions[index] = { ...solution, icon };
                            updateData({
                              structuredCablingSection: {
                                ...data.structuredCablingSection,
                                additionalSolutions: newSolutions,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                      <EditableText
                        value={solution.title}
                        onChange={(value) => {
                          const newSolutions = [...(data.structuredCablingSection.additionalSolutions || [])];
                          newSolutions[index] = { ...solution, title: value };
                          updateData({
                            structuredCablingSection: {
                              ...data.structuredCablingSection,
                              additionalSolutions: newSolutions,
                            },
                          });
                        }}
                        fieldKey={`structured-cabling-solution-title-${index}`}
                        className="font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                      <EditableText
                        value={solution.description}
                        onChange={(value) => {
                          const newSolutions = [...(data.structuredCablingSection.additionalSolutions || [])];
                          newSolutions[index] = { ...solution, description: value };
                          updateData({
                            structuredCablingSection: {
                              ...data.structuredCablingSection,
                              additionalSolutions: newSolutions,
                            },
                          });
                        }}
                        fieldKey={`structured-cabling-solution-desc-${index}`}
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
