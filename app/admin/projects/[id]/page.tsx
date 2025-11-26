'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Trash2, Upload, X, Plus } from 'lucide-react';
import { Project } from '@/types/project';
import Image from 'next/image';
import RichTextEditor from '@/components/admin/RichTextEditor';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Input states for arrays
  const [newTag, setNewTag] = useState('');
  const [newScope, setNewScope] = useState('');
  const [newService, setNewService] = useState('');
  const [newTechnology, setNewTechnology] = useState('');
  const [newResult, setNewResult] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects?id=${projectId}`);
      if (!response.ok) throw new Error('Failed to fetch project');
      const data = await response.json();
      setProject(data.project);
    } catch (error) {
      console.error('Error fetching project:', error);
      alert('Failed to load project');
      router.push('/admin/projects');
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: keyof Project, value: any) => {
    if (!project) return;
    setProject({ ...project, [field]: value });
    setHasChanges(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !project) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const { url } = await response.json();
      setProject({ ...project, images: [...project.images, url] });
      setHasChanges(true);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    if (!project) return;
    const newImages = project.images.filter((_, i) => i !== index);
    setProject({ ...project, images: newImages });
    setHasChanges(true);
  };

  // Array management functions
  const addToArray = (field: keyof Project, value: string, setState: (val: string) => void) => {
    if (!project || !value.trim()) return;
    const currentArray = (project[field] || []) as string[];
    if (currentArray.includes(value.trim())) {
      alert('Item already exists');
      return;
    }
    setProject({ ...project, [field]: [...currentArray, value.trim()] });
    setState('');
    setHasChanges(true);
  };

  const removeFromArray = (field: keyof Project, value: string) => {
    if (!project) return;
    const currentArray = (project[field] || []) as string[];
    setProject({ ...project, [field]: currentArray.filter(item => item !== value) });
    setHasChanges(true);
  };

  const addSpecification = () => {
    if (!project || !newSpecKey.trim() || !newSpecValue.trim()) return;
    const specs = project.specifications || {};
    if (specs[newSpecKey]) {
      alert('Specification key already exists');
      return;
    }
    setProject({ 
      ...project, 
      specifications: { ...specs, [newSpecKey.trim()]: newSpecValue.trim() } 
    });
    setNewSpecKey('');
    setNewSpecValue('');
    setHasChanges(true);
  };

  const removeSpecification = (key: string) => {
    if (!project) return;
    const specs = { ...(project.specifications || {}) };
    delete specs[key];
    setProject({ ...project, specifications: specs });
    setHasChanges(true);
  };

  const saveProject = async () => {
    if (!project) return;

    setSaving(true);
    try {
      console.log('Saving project with fields:', Object.keys(project));
      console.log('Overview length:', project.overview?.length || 0);
      console.log('Description length:', project.description?.length || 0);
      
      const response = await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Save failed:', errorData);
        throw new Error(errorData.error || 'Failed to save project');
      }

      const result = await response.json();
      console.log('Project saved successfully:', result.project._id);
      
      // Update local state with saved project
      setProject(result.project);
      setHasChanges(false);
      
      alert('Project saved successfully!');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async () => {
    if (!project || !confirm(`Are you sure you want to delete "${project.title}"?`)) return;

    try {
      const response = await fetch(`/api/projects?id=${project._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete project');

      alert('Project deleted successfully');
      router.push('/admin/projects');
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!project) {
    return null;
  }

  const inputClass = "w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900";
  const labelClass = "block text-sm font-medium text-slate-700 mb-2";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.push('/admin/projects')}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Projects
            </button>
            <div className="flex gap-3">
              <button
                onClick={deleteProject}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
              <button
                onClick={saveProject}
                disabled={!hasChanges || saving}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Edit Project</h1>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Project Title *</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Category *</label>
                  <select
                    value={project.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className={inputClass}
                  >
                    <option value="data-center">Data Center</option>
                    <option value="ict">ICT Solutions</option>
                    <option value="security">Security & CCTV</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Status</label>
                  <select
                    value={project.status || 'completed'}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className={inputClass}
                  >
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="planned">Planned</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Client *</label>
                  <input
                    type="text"
                    value={project.client}
                    onChange={(e) => handleChange('client', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Industry</label>
                  <input
                    type="text"
                    value={project.industry || ''}
                    onChange={(e) => handleChange('industry', e.target.value)}
                    placeholder="e.g., Banking, Healthcare"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Location *</label>
                  <input
                    type="text"
                    value={project.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className={labelClass}>Year *</label>
                  <input
                    type="text"
                    value={project.year}
                    onChange={(e) => handleChange('year', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Duration</label>
                  <input
                    type="text"
                    value={project.duration || ''}
                    onChange={(e) => handleChange('duration', e.target.value)}
                    placeholder="e.g., 6 months"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Project Value</label>
                  <input
                    type="text"
                    value={project.projectValue || ''}
                    onChange={(e) => handleChange('projectValue', e.target.value)}
                    placeholder="e.g., $500K"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Team Size</label>
                  <input
                    type="text"
                    value={project.teamSize || ''}
                    onChange={(e) => handleChange('teamSize', e.target.value)}
                    placeholder="e.g., 10-15"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Complexity</label>
                <select
                  value={project.complexity || 'medium'}
                  onChange={(e) => handleChange('complexity', e.target.value)}
                  className={inputClass}
                >
                  <option value="basic">Basic</option>
                  <option value="medium">Medium</option>
                  <option value="complex">Complex</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
            </div>
          </div>

          {/* Description & Overview */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Description & Overview</h2>
            <div className="space-y-6">
              <div>
                <label className={labelClass}>Short Description * (for listing pages)</label>
                <textarea
                  value={project.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={3}
                  className={inputClass + " resize-none"}
                  placeholder="Brief description of the project"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Detailed Overview 
                </label>
                <RichTextEditor
                  value={project.overview || ''}
                  onChange={(value) => handleChange('overview', value)}
                  placeholder="Write a comprehensive project overview with formatting..."
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {project.images.map((image, index) => (
                <div key={index} className="relative group aspect-square">
                  <Image
                    src={image}
                    alt={`Project image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
              <Upload className="w-4 h-4" />
              {uploading ? 'Uploading...' : 'Upload Image'}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          {/* Services & Technologies */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Services & Technologies</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Services Provided</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(project.services || []).map((service) => (
                    <span
                      key={service}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1"
                    >
                      {service}
                      <button
                        onClick={() => removeFromArray('services', service)}
                        className="hover:bg-green-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addToArray('services', newService, setNewService)}
                    placeholder="e.g., Data Center Setup"
                    className={"flex-1 " + inputClass}
                  />
                  <button
                    onClick={() => addToArray('services', newService, setNewService)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className={labelClass}>Technologies/Products Used</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(project.technologies || []).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-1"
                    >
                      {tech}
                      <button
                        onClick={() => removeFromArray('technologies', tech)}
                        className="hover:bg-purple-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTechnology}
                    onChange={(e) => setNewTechnology(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addToArray('technologies', newTechnology, setNewTechnology)}
                    placeholder="e.g., Cisco, HP, Dell"
                    className={"flex-1 " + inputClass}
                  />
                  <button
                    onClick={() => addToArray('technologies', newTechnology, setNewTechnology)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Project Scope */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Project Scope</h2>
            <div className="space-y-2 mb-2">
              {project.scope.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between px-4 py-2 bg-slate-50 rounded-lg"
                >
                  <span className="text-slate-700">{item}</span>
                  <button
                    onClick={() => removeFromArray('scope', item)}
                    className="text-red-600 hover:bg-red-50 rounded p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newScope}
                onChange={(e) => setNewScope(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addToArray('scope', newScope, setNewScope)}
                placeholder="Add scope item"
                className={"flex-1 " + inputClass}
              />
              <button
                onClick={() => addToArray('scope', newScope, setNewScope)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Challenge & Solution</h2>
            <div className="space-y-6">
              <div>
                <label className={labelClass}>Challenge (Rich text editor with formatting)</label>
                <RichTextEditor
                  value={project.challenge || ''}
                  onChange={(value) => handleChange('challenge', value)}
                  placeholder="What challenges did the client face?"
                />
              </div>

              <div>
                <label className={labelClass}>Solution (Rich text editor with formatting)</label>
                <RichTextEditor
                  value={project.solution || ''}
                  onChange={(value) => handleChange('solution', value)}
                  placeholder="How did you solve these challenges?"
                />
              </div>
            </div>
          </div>

          {/* Results & Key Features */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Results & Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Results/Outcomes</label>
                <div className="space-y-2 mb-2">
                  {(project.results || []).map((result) => (
                    <div
                      key={result}
                      className="flex items-center justify-between px-4 py-2 bg-green-50 rounded-lg"
                    >
                      <span className="text-green-700">{result}</span>
                      <button
                        onClick={() => removeFromArray('results', result)}
                        className="text-red-600 hover:bg-red-100 rounded p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newResult}
                    onChange={(e) => setNewResult(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addToArray('results', newResult, setNewResult)}
                    placeholder="e.g., 50% energy savings"
                    className={"flex-1 " + inputClass}
                  />
                  <button
                    onClick={() => addToArray('results', newResult, setNewResult)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className={labelClass}>Key Features</label>
                <div className="space-y-2 mb-2">
                  {(project.keyFeatures || []).map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center justify-between px-4 py-2 bg-blue-50 rounded-lg"
                    >
                      <span className="text-blue-700">{feature}</span>
                      <button
                        onClick={() => removeFromArray('keyFeatures', feature)}
                        className="text-red-600 hover:bg-red-100 rounded p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addToArray('keyFeatures', newFeature, setNewFeature)}
                    placeholder="e.g., 24/7 monitoring"
                    className={"flex-1 " + inputClass}
                  />
                  <button
                    onClick={() => addToArray('keyFeatures', newFeature, setNewFeature)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Technical Specifications</h2>
            <div className="space-y-2 mb-4">
              {Object.entries(project.specifications || {}).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-lg"
                >
                  <div className="flex-1">
                    <span className="font-medium text-slate-700">{key}:</span>{' '}
                    <span className="text-slate-600">{value}</span>
                  </div>
                  <button
                    onClick={() => removeSpecification(key)}
                    className="text-red-600 hover:bg-red-50 rounded p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-2">
              <input
                type="text"
                value={newSpecKey}
                onChange={(e) => setNewSpecKey(e.target.value)}
                placeholder="Specification name (e.g., Rack Units)"
                className={inputClass}
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSpecValue}
                  onChange={(e) => setNewSpecValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSpecification()}
                  placeholder="Value (e.g., 42U)"
                  className={"flex-1 " + inputClass}
                />
                <button
                  onClick={addSpecification}
                  className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Certifications & Standards */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Certifications & Standards</h2>
            <div className="flex flex-wrap gap-2 mb-2">
              {(project.certifications || []).map((cert) => (
                <span
                  key={cert}
                  className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm flex items-center gap-1"
                >
                  {cert}
                  <button
                    onClick={() => removeFromArray('certifications', cert)}
                    className="hover:bg-amber-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addToArray('certifications', newCertification, setNewCertification)}
                placeholder="e.g., ISO 27001, TIA-942"
                className={"flex-1 " + inputClass}
              />
              <button
                onClick={() => addToArray('certifications', newCertification, setNewCertification)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Client Testimonial */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Client Testimonial</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Quote</label>
                <textarea
                  value={project.testimonial?.quote || ''}
                  onChange={(e) => handleChange('testimonial', { 
                    ...project.testimonial, 
                    quote: e.target.value 
                  })}
                  rows={3}
                  className={inputClass + " resize-none"}
                  placeholder="Client testimonial quote"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Author Name</label>
                  <input
                    type="text"
                    value={project.testimonial?.author || ''}
                    onChange={(e) => handleChange('testimonial', { 
                      ...project.testimonial, 
                      author: e.target.value 
                    })}
                    placeholder="Client name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Position</label>
                  <input
                    type="text"
                    value={project.testimonial?.position || ''}
                    onChange={(e) => handleChange('testimonial', { 
                      ...project.testimonial, 
                      position: e.target.value 
                    })}
                    placeholder="e.g., CEO, CTO"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tags & Meta */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Tags & Meta</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Tags (for filtering)</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => removeFromArray('tags', tag)}
                        className="hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addToArray('tags', newTag, setNewTag)}
                    placeholder="Add a tag"
                    className={"flex-1 " + inputClass}
                  />
                  <button
                    onClick={() => addToArray('tags', newTag, setNewTag)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={project.featured}
                    onChange={(e) => handleChange('featured', e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-slate-700">
                    Featured Project
                  </label>
                </div>
                <div>
                  <label className={labelClass}>Display Order</label>
                  <input
                    type="number"
                    value={project.order}
                    onChange={(e) => handleChange('order', parseInt(e.target.value) || 0)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Save Button */}
        {hasChanges && (
          <div className="fixed bottom-8 right-8 z-50">
            <button
              onClick={saveProject}
              disabled={saving}
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium shadow-2xl transition-all hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save All Changes
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
