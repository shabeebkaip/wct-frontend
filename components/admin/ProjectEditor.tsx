'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Upload, X } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectEditorProps {
  project: Project;
  onUpdate: (updates: Partial<Project>) => void;
  onDelete: () => void;
}

export default function ProjectEditor({ project, onUpdate, onDelete }: ProjectEditorProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      const imageUrl = data.url;

      onUpdate({ images: [...project.images, imageUrl] });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = project.images.filter((_, i) => i !== index);
    onUpdate({ images: newImages });
  };

  const addTag = () => {
    const tag = prompt('Enter tag name:');
    if (tag && tag.trim()) {
      onUpdate({ tags: [...project.tags, tag.trim()] });
    }
  };

  const removeTag = (index: number) => {
    const newTags = project.tags.filter((_, i) => i !== index);
    onUpdate({ tags: newTags });
  };

  const addScope = () => {
    const scope = prompt('Enter scope item:');
    if (scope && scope.trim()) {
      onUpdate({ scope: [...project.scope, scope.trim()] });
    }
  };

  const removeScope = (index: number) => {
    const newScope = project.scope.filter((_, i) => i !== index);
    onUpdate({ scope: newScope });
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
          rows={4}
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

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
      {/* Header with Delete Button */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-2">Project Title</label>
          <EditableText
            value={project.title}
            onChange={(title) => onUpdate({ title })}
            fieldKey="title"
            placeholder="Project title"
            className="text-xl font-bold text-slate-900"
          />
        </div>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to delete this project?')) {
              onDelete();
            }
          }}
          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shrink-0"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Basic Info Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
          <select
            value={project.category}
            onChange={(e) => onUpdate({ category: e.target.value as Project['category'] })}
            className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="data-center">Data Center</option>
            <option value="ict">ICT Solutions</option>
            <option value="security">Security</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Client</label>
          <EditableText
            value={project.client}
            onChange={(client) => onUpdate({ client })}
            fieldKey="client"
            placeholder="Client name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
          <EditableText
            value={project.location}
            onChange={(location) => onUpdate({ location })}
            fieldKey="location"
            placeholder="City, Country"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Year</label>
          <EditableText
            value={project.year}
            onChange={(year) => onUpdate({ year })}
            fieldKey="year"
            placeholder="2024"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
        <EditableText
          value={project.description}
          onChange={(description) => onUpdate({ description })}
          fieldKey="description"
          multiline
          placeholder="Project description"
        />
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">Images</label>
        <div className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {project.images.map((image, index) => (
              <div key={index} className="relative group rounded-lg overflow-hidden border border-slate-200">
                <img src={image} alt={`Project ${index + 1}`} className="w-full h-32 object-cover" />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          <label className="flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">
              {uploadingImage ? 'Uploading...' : 'Upload Image'}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
              className="hidden"
              disabled={uploadingImage}
            />
          </label>
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">Tags</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-100 text-blue-700 text-sm"
            >
              {tag}
              <button
                onClick={() => removeTag(index)}
                className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <button
          onClick={addTag}
          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Tag
        </button>
      </div>

      {/* Project Scope */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">Project Scope</label>
        <div className="space-y-2 mb-3">
          {project.scope.map((item, index) => (
            <div key={index} className="flex items-center gap-2 group">
              <span className="flex-1 px-3 py-2 bg-slate-50 rounded-lg text-slate-900 text-sm">
                {item}
              </span>
              <button
                onClick={() => removeScope(index)}
                className="p-1.5 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addScope}
          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Scope Item
        </button>
      </div>

      {/* Settings */}
      <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
        <div>
          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={project.featured}
              onChange={(e) => onUpdate({ featured: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300"
            />
            Featured Project
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Display Order</label>
          <input
            type="number"
            value={project.order}
            onChange={(e) => onUpdate({ order: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
