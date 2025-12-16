'use client';

import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Plus, Trash2 } from 'lucide-react';
import { AboutPageData } from '@/types/about';

interface AboutPageEditorProps {
  data: { aboutPage: AboutPageData };
  updateData: (updates: { aboutPage: AboutPageData }) => void;
}

export default function AboutPageEditor({ data, updateData }: AboutPageEditorProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);

  const handleImageUpload = async (file: File, memberIndex: number) => {
    setUploadingImage(`member-${memberIndex}`);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const uploadResult = await response.json();
      const imageUrl = uploadResult.url;

      // Update member image using existing aboutPage data
      const newMembers = [...data.aboutPage.teamMembers];
      newMembers[memberIndex] = { ...newMembers[memberIndex], image: imageUrl };
      updateData({ aboutPage: { ...data.aboutPage, teamMembers: newMembers } });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(null);
    }
  };

  const EditableText = ({
    value,
    onChange,
    fieldKey,
    multiline = false,
    className = '',
    placeholder = '',
  }: {
    value: string;
    onChange: (value: string) => void;
    fieldKey: string;
    multiline?: boolean;
    className?: string;
    placeholder?: string;
  }) => {
    const [localValue, setLocalValue] = useState(value);
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
          placeholder={placeholder}
          className={`${className} ${
            isEditing ? 'ring-2 ring-blue-500 border-blue-500' : 'border-slate-300'
          } w-full px-3 py-2 rounded border transition-all bg-white text-slate-900 focus:outline-none`}
          rows={multiline ? 4 : 1}
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
        placeholder={placeholder}
        className={`${className} ${
          isEditing ? 'ring-2 ring-blue-500 border-blue-500' : 'border-slate-300'
        } w-full px-3 py-2 rounded border transition-all bg-white text-slate-900 focus:outline-none`}
      />
    );
  };

  const IconSelector = ({ value, onChange }: { value: string; onChange: (icon: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const commonIcons = [
      'Target', 'Eye', 'Shield', 'Zap', 'Users', 'Award', 'TrendingUp', 'Globe',
      'Heart', 'Star', 'Lightbulb', 'Rocket', 'CheckCircle', 'Lock', 'Building'
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
          <span className="text-sm font-medium text-gray-900 flex-1 text-left truncate">{value}</span>
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
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section - Top Banner */}
      <section className="bg-gradient-to-b from-slate-50 to-white rounded-xl border border-slate-200 p-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Badge Text</label>
            <EditableText
              value={data.aboutPage.hero.badge}
              onChange={(value) =>
                updateData({
                  aboutPage: { ...data.aboutPage, hero: { ...data.aboutPage.hero, badge: value } },
                })
              }
              fieldKey="hero-badge"
              placeholder="Badge text (e.g., ABOUT US)"
              className="text-sm font-medium text-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Main Title</label>
            <EditableText
              value={data.aboutPage.hero.title}
              onChange={(value) =>
                updateData({
                  aboutPage: { ...data.aboutPage, hero: { ...data.aboutPage.hero, title: value } },
                })
              }
              fieldKey="hero-title"
              placeholder="Main headline"
              className="text-2xl font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <EditableText
              value={data.aboutPage.hero.description}
              onChange={(value) =>
                updateData({
                  aboutPage: { ...data.aboutPage, hero: { ...data.aboutPage.hero, description: value } },
                })
              }
              fieldKey="hero-description"
              multiline
              placeholder="Brief description of your company"
              className="text-base text-slate-900"
            />
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="bg-white rounded-xl border border-slate-200 p-8">
        <div className="max-w-4xl">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Section Badge</label>
            <EditableText
              value={data.aboutPage.companyStory.badge}
              onChange={(value) =>
                updateData({
                  aboutPage: {
                    ...data.aboutPage,
                    companyStory: { ...data.aboutPage.companyStory, badge: value },
                  },
                })
              }
              fieldKey="story-badge"
              placeholder="Section badge (e.g., OUR STORY)"
              className="text-sm font-medium text-slate-900"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Section Title</label>
            <EditableText
              value={data.aboutPage.companyStory.title}
              onChange={(value) =>
                updateData({
                  aboutPage: {
                    ...data.aboutPage,
                    companyStory: { ...data.aboutPage.companyStory, title: value },
                  },
                })
              }
              fieldKey="story-title"
              placeholder="Section title"
              className="text-2xl font-bold text-slate-900"
            />
          </div>
          
          <div className="space-y-4">
            {data.aboutPage.companyStory.paragraphs.map((paragraph, index) => (
              <div key={index} className="relative group">
                <EditableText
                  value={paragraph}
                  onChange={(value) => {
                    const newParagraphs = [...data.aboutPage.companyStory.paragraphs];
                    newParagraphs[index] = value;
                    updateData({
                      aboutPage: {
                        ...data.aboutPage,
                        companyStory: { ...data.aboutPage.companyStory, paragraphs: newParagraphs },
                      },
                    });
                  }}
                  fieldKey={`story-para-${index}`}
                  multiline
                  placeholder={`Paragraph ${index + 1}`}
                  className="text-slate-900 leading-relaxed pr-10"
                />
                <button
                  onClick={() => {
                    if (confirm('Delete this paragraph?')) {
                      const newParagraphs = data.aboutPage.companyStory.paragraphs.filter((_, i) => i !== index);
                      updateData({
                        aboutPage: {
                          ...data.aboutPage,
                          companyStory: { ...data.aboutPage.companyStory, paragraphs: newParagraphs },
                        },
                      });
                    }
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newParagraphs = [...data.aboutPage.companyStory.paragraphs, 'New paragraph'];
                updateData({
                  aboutPage: {
                    ...data.aboutPage,
                    companyStory: { ...data.aboutPage.companyStory, paragraphs: newParagraphs },
                  },
                });
              }}
              className="mt-2 px-4 py-2 bg-slate-100 text-slate-700 text-sm rounded-lg hover:bg-slate-200 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Paragraph
            </button>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Side by Side Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Mission */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              {(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const MissionIcon = (LucideIcons as any)[data.aboutPage.mission.icon] || LucideIcons.Target;
                return <MissionIcon className="w-6 h-6 text-blue-600" />;
              })()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="mb-2">
                <IconSelector
                  value={data.aboutPage.mission.icon}
                  onChange={(icon) =>
                    updateData({
                      aboutPage: { ...data.aboutPage, mission: { ...data.aboutPage.mission, icon } },
                    })
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-xs font-medium text-slate-700 mb-1">Title</label>
                <EditableText
                  value={data.aboutPage.mission.title}
                  onChange={(value) =>
                    updateData({
                      aboutPage: { ...data.aboutPage, mission: { ...data.aboutPage.mission, title: value } },
                    })
                  }
                  fieldKey="mission-title"
                  placeholder="Mission title"
                  className="text-lg font-bold text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
                <EditableText
                  value={data.aboutPage.mission.description}
                  onChange={(value) =>
                    updateData({
                      aboutPage: {
                        ...data.aboutPage,
                        mission: { ...data.aboutPage.mission, description: value },
                      },
                    })
                  }
                  fieldKey="mission-desc"
                  multiline
                  placeholder="Describe your mission"
                  className="text-sm text-slate-900"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              {(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const VisionIcon = (LucideIcons as any)[data.aboutPage.vision.icon] || LucideIcons.Eye;
                return <VisionIcon className="w-6 h-6 text-blue-600" />;
              })()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="mb-2">
                <IconSelector
                  value={data.aboutPage.vision.icon}
                  onChange={(icon) =>
                    updateData({
                      aboutPage: { ...data.aboutPage, vision: { ...data.aboutPage.vision, icon } },
                    })
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-xs font-medium text-slate-700 mb-1">Title</label>
                <EditableText
                  value={data.aboutPage.vision.title}
                  onChange={(value) =>
                    updateData({
                      aboutPage: { ...data.aboutPage, vision: { ...data.aboutPage.vision, title: value } },
                    })
                  }
                  fieldKey="vision-title"
                  placeholder="Vision title"
                  className="text-lg font-bold text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
                <EditableText
                  value={data.aboutPage.vision.description}
                  onChange={(value) =>
                    updateData({
                      aboutPage: { ...data.aboutPage, vision: { ...data.aboutPage.vision, description: value } },
                    })
                  }
                  fieldKey="vision-desc"
                  multiline
                  placeholder="Describe your vision"
                  className="text-sm text-slate-900"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Core Values */}
      <section className="bg-slate-50 rounded-xl border border-slate-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Core Values</h2>
          <p className="text-slate-600">What drives us every day</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.aboutPage.coreValues.map((value, index) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Icon = (LucideIcons as any)[value.icon] || LucideIcons.Star;
            return (
              <div key={index} className="group relative bg-white rounded-lg p-6 border border-slate-200 hover:shadow-md transition-all">
                <button
                  onClick={() => {
                    if (confirm('Delete this value?')) {
                      const newValues = data.aboutPage.coreValues.filter((_, i) => i !== index);
                      updateData({ aboutPage: { ...data.aboutPage, coreValues: newValues } });
                    }
                  }}
                  className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
                
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <IconSelector
                    value={value.icon}
                    onChange={(icon) => {
                      const newValues = [...data.aboutPage.coreValues];
                      newValues[index] = { ...value, icon };
                      updateData({ aboutPage: { ...data.aboutPage, coreValues: newValues } });
                    }}
                  />
                </div>
                
                <div className="mb-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Value Name</label>
                  <EditableText
                    value={value.title}
                    onChange={(title) => {
                      const newValues = [...data.aboutPage.coreValues];
                      newValues[index] = { ...value, title };
                      updateData({ aboutPage: { ...data.aboutPage, coreValues: newValues } });
                    }}
                    fieldKey={`value-title-${index}`}
                    placeholder="Value name"
                    className="text-base font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
                  <EditableText
                    value={value.description}
                    onChange={(description) => {
                      const newValues = [...data.aboutPage.coreValues];
                      newValues[index] = { ...value, description };
                      updateData({ aboutPage: { ...data.aboutPage, coreValues: newValues } });
                    }}
                    fieldKey={`value-desc-${index}`}
                    multiline
                    placeholder="Describe this value"
                    className="text-sm text-slate-900"
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        <button
          onClick={() => {
            const newValue = {
              icon: 'Star',
              title: 'New Value',
              description: 'Value description',
            };
            updateData({
              aboutPage: {
                ...data.aboutPage,
                coreValues: [...data.aboutPage.coreValues, newValue],
              },
            });
          }}
          className="mt-6 mx-auto block px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Core Value
        </button>
      </section>

      {/* Team Members */}
      <section className="bg-white rounded-xl border border-slate-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Our Team</h2>
          <p className="text-slate-600">Meet the people behind our success</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.aboutPage.teamMembers
            .sort((a, b) => a.order - b.order)
            .map((member, index) => (
              <div key={index} className="group relative bg-slate-50 rounded-lg p-6 border border-slate-200 hover:shadow-md transition-all text-center">
                <button
                  onClick={() => {
                    if (confirm('Delete this team member?')) {
                      const newMembers = data.aboutPage.teamMembers.filter((_, i) => i !== index);
                      updateData({ aboutPage: { ...data.aboutPage, teamMembers: newMembers } });
                    }
                  }}
                  className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
                
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <LucideIcons.UserCircle2 className="w-12 h-12 text-blue-600" />
                  )}
                </div>
                
                <div className="mb-3">
                  <label className="block text-xs font-medium text-slate-700 mb-2 text-center">Profile Image</label>
                  <div className="space-y-2">
                    <label className="flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors">
                      <LucideIcons.Upload className="w-4 h-4 mr-2" />
                      <span className="text-xs font-medium">
                        {uploadingImage === `member-${index}` ? 'Uploading...' : 'Upload Image'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, index);
                        }}
                        className="hidden"
                        disabled={uploadingImage === `member-${index}`}
                      />
                    </label>
                    <input
                      type="text"
                      value={member.image || ''}
                      onChange={(e) => {
                        const newMembers = [...data.aboutPage.teamMembers];
                        newMembers[index] = { ...member, image: e.target.value || null };
                        updateData({ aboutPage: { ...data.aboutPage, teamMembers: newMembers } });
                      }}
                      placeholder="Or paste image URL"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded text-center bg-white text-slate-900"
                    />
                  </div>
                </div>
                
                <div className="mb-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1 text-center">Name</label>
                  <EditableText
                    value={member.name}
                    onChange={(name) => {
                      const newMembers = [...data.aboutPage.teamMembers];
                      newMembers[index] = { ...member, name };
                      updateData({ aboutPage: { ...data.aboutPage, teamMembers: newMembers } });
                    }}
                    fieldKey={`member-name-${index}`}
                    placeholder="Full name"
                    className="text-base font-bold text-slate-900 text-center"
                  />
                </div>
                
                <div className="mb-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1 text-center">Role</label>
                  <EditableText
                    value={member.role}
                    onChange={(role) => {
                      const newMembers = [...data.aboutPage.teamMembers];
                      newMembers[index] = { ...member, role };
                      updateData({ aboutPage: { ...data.aboutPage, teamMembers: newMembers } });
                    }}
                    fieldKey={`member-role-${index}`}
                    placeholder="Job title"
                    className="text-sm text-slate-900 font-medium text-center"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-xs font-medium text-slate-700 mb-1 text-center">Bio</label>
                  <EditableText
                    value={member.description}
                    onChange={(description) => {
                      const newMembers = [...data.aboutPage.teamMembers];
                      newMembers[index] = { ...member, description };
                      updateData({ aboutPage: { ...data.aboutPage, teamMembers: newMembers } });
                    }}
                    fieldKey={`member-desc-${index}`}
                    multiline
                    placeholder="Brief bio"
                    className="text-sm text-slate-900 text-center"
                  />
                </div>
                
                <label className="inline-flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={member.isLeadership}
                    onChange={(e) => {
                      const newMembers = [...data.aboutPage.teamMembers];
                      newMembers[index] = { ...member, isLeadership: e.target.checked };
                      updateData({ aboutPage: { ...data.aboutPage, teamMembers: newMembers } });
                    }}
                    className="w-4 h-4 rounded border-slate-300"
                  />
                  Leadership Team
                </label>
              </div>
            ))}
        </div>
        
        <button
          onClick={() => {
            const newMember = {
              name: 'New Member',
              role: 'Role',
              image: null,
              description: 'Member description',
              isLeadership: false,
              order: data.aboutPage.teamMembers.length + 1,
            };
            updateData({
              aboutPage: { ...data.aboutPage, teamMembers: [...data.aboutPage.teamMembers, newMember] },
            });
          }}
          className="mt-8 mx-auto block px-6 py-3 bg-slate-100 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-200 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Team Member
        </button>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 rounded-2xl bg-blue-50/50 dark:bg-blue-500/5 backdrop-blur-sm border border-blue-300 dark:border-blue-500/30 overflow-hidden shadow-xl dark:shadow-none">
            <div className="relative text-center space-y-6">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-gray-400 mb-2">CTA Title</label>
                <EditableText
                  value={data.aboutPage.cta.title}
                  onChange={(value) =>
                    updateData({
                      aboutPage: { ...data.aboutPage, cta: { ...data.aboutPage.cta, title: value } },
                    })
                  }
                  fieldKey="cta-title"
                  placeholder="Call to action title"
                  className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-gray-100 text-center"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-gray-400 mb-2">CTA Description</label>
                <EditableText
                  value={data.aboutPage.cta.description}
                  onChange={(value) =>
                    updateData({
                      aboutPage: { ...data.aboutPage, cta: { ...data.aboutPage.cta, description: value } },
                    })
                  }
                  fieldKey="cta-desc"
                  multiline
                  placeholder="Encouraging message"
                  className="text-lg text-slate-600 dark:text-gray-400 text-center"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-start pt-4">
                <div className="space-y-2 w-full sm:w-auto">
                  <label className="text-xs font-medium text-slate-700 dark:text-gray-400 uppercase tracking-wider block">Primary Button</label>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={data.aboutPage.cta.primaryButton.text}
                      onChange={(e) =>
                        updateData({
                          aboutPage: {
                            ...data.aboutPage,
                            cta: {
                              ...data.aboutPage.cta,
                              primaryButton: { ...data.aboutPage.cta.primaryButton, text: e.target.value },
                            },
                          },
                        })
                      }
                      placeholder="Button text"
                      className="px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg border-2 border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={data.aboutPage.cta.primaryButton.link}
                      onChange={(e) =>
                        updateData({
                          aboutPage: {
                            ...data.aboutPage,
                            cta: {
                              ...data.aboutPage.cta,
                              primaryButton: { ...data.aboutPage.cta.primaryButton, link: e.target.value },
                            },
                          },
                        })
                      }
                      placeholder="/contact"
                      className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-2 w-full sm:w-auto">
                  <label className="text-xs font-medium text-slate-700 dark:text-gray-400 uppercase tracking-wider block">Secondary Button</label>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={data.aboutPage.cta.secondaryButton.text}
                      onChange={(e) =>
                        updateData({
                          aboutPage: {
                            ...data.aboutPage,
                            cta: {
                              ...data.aboutPage.cta,
                              secondaryButton: { ...data.aboutPage.cta.secondaryButton, text: e.target.value },
                            },
                          },
                        })
                      }
                      placeholder="Button text"
                      className="px-4 py-2.5 text-sm font-semibold text-slate-900 bg-slate-200 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={data.aboutPage.cta.secondaryButton.link}
                      onChange={(e) =>
                        updateData({
                          aboutPage: {
                            ...data.aboutPage,
                            cta: {
                              ...data.aboutPage.cta,
                              secondaryButton: { ...data.aboutPage.cta.secondaryButton, link: e.target.value },
                            },
                          },
                        })
                      }
                      placeholder="/projects"
                      className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
