'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Loader2, Edit, Trash2, Eye, Calendar, MapPin, Building2 } from 'lucide-react';
import { Project } from '@/types/project';
import Image from 'next/image';

export default function AdminProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'data-center' | 'ict' | 'security'>('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      alert('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const createNewProject = async () => {
    const newProject = {
      title: 'New Project',
      category: 'data-center' as const,
      client: 'Client Name',
      location: 'City, Country',
      year: new Date().getFullYear().toString(),
      description: 'Project description',
      images: [],
      tags: [],
      scope: [],
      featured: false,
      order: projects.length,
    };

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });
      
      if (!response.ok) throw new Error('Failed to create project');
      
      const { project } = await response.json();
      router.push(`/admin/projects/${project._id}`);
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    }
  };

  const deleteProject = async (project: Project) => {
    if (!confirm(`Are you sure you want to delete "${project.title}"?`)) return;

    try {
      const response = await fetch(`/api/projects?id=${project._id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete project');
      
      alert('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const getCategoryBadge = (category: string) => {
    const colors = {
      'data-center': 'bg-blue-100 text-blue-700 border-blue-300',
      'ict': 'bg-green-100 text-green-700 border-green-300',
      'security': 'bg-purple-100 text-purple-700 border-purple-300',
    };
    const labels = {
      'data-center': 'Data Center',
      'ict': 'ICT Solutions',
      'security': 'Security',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[category as keyof typeof colors]}`}>
        {labels[category as keyof typeof labels]}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
              <p className="text-slate-600 mt-1">
                Manage your project portfolio
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                Back to Dashboard
              </button>
              <button
                onClick={createNewProject}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                New Project
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'All Projects' },
              { value: 'data-center', label: 'Data Center' },
              { value: 'ict', label: 'ICT' },
              { value: 'security', label: 'Security' },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value as typeof filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === item.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-600 mb-4">
              {filter === 'all' ? 'No projects yet. Create your first project!' : `No ${filter} projects found.`}
            </p>
            {filter === 'all' && (
              <button
                onClick={createNewProject}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Project
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Project Image */}
                <div className="relative h-48 bg-slate-100">
                  {project.images[0] ? (
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 className="w-12 h-12 text-slate-300" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    {getCategoryBadge(project.category)}
                  </div>
                  {project.featured && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded">
                      Featured
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  
                  <div className="space-y-1 mb-3 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      <span className="line-clamp-1">{project.client}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{project.year}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/admin/projects/${project._id}`)}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => window.open(`/projects/${project._id}`, '_blank')}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                      title="View Project"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProject(project)}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
