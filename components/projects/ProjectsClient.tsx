'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Server,
  Network,
  Shield,
  Building2,
  Calendar,
  MapPin,
  CheckCircle,
  ArrowRight,
  Grid3x3,
  List,
} from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'data-center' | 'ict' | 'security'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'all', label: 'All Projects', icon: Building2 },
    { id: 'data-center', label: 'Data Center', icon: Server },
    { id: 'ict', label: 'ICT Solutions', icon: Network },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <>
      {/* Filters Section */}
      <section className="relative py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id as typeof activeFilter)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeFilter === category.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-white dark:bg-gray-900/40 text-slate-600 dark:text-gray-400 border border-slate-200 dark:border-gray-800/50 hover:border-blue-400 dark:hover:border-blue-500/30 shadow-md dark:shadow-none'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 p-1 rounded-xl bg-white dark:bg-gray-900/40 border border-slate-200 dark:border-gray-800/50 shadow-md dark:shadow-none">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-300'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-300'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Projects Count */}
          <div className="mb-8">
            <p className="text-slate-600 dark:text-gray-400">
              Showing{' '}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {filteredProjects.length}
              </span>{' '}
              projects
            </p>
          </div>

          {/* Projects Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Link
                  key={project._id || project.title}
                  href={`/projects/${project._id}`}
                  className="group relative rounded-2xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 overflow-hidden shadow-lg dark:shadow-none block"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    {project.images[0] ? (
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200 dark:bg-gray-800 flex items-center justify-center">
                        <Building2 className="w-16 h-16 text-slate-400 dark:text-gray-600" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-white via-white/50 to-transparent dark:from-gray-900 dark:via-gray-900/50 dark:to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-sm text-xs font-medium text-white">
                        {categories.find((c) => c.id === project.category)?.label}
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="relative p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{project.year}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location.split(',')[0]}</span>
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-gray-800/50 text-xs text-slate-600 dark:text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View Details Indicator */}
                    <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProjects.map((project) => (
                <Link
                  key={project._id}
                  href={`/projects/${project._id}`}
                  className="group relative rounded-2xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 overflow-hidden block shadow-lg dark:shadow-none"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative flex flex-col md:flex-row gap-6 p-6">
                    {/* Project Image */}
                    <div className="relative w-full md:w-80 h-64 rounded-xl overflow-hidden shrink-0">
                      {project.images[0] ? (
                        <Image
                          src={project.images[0]}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200 dark:bg-gray-800 flex items-center justify-center">
                          <Building2 className="w-16 h-16 text-slate-400 dark:text-gray-600" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <div className="px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-sm text-xs font-medium text-white">
                          {categories.find((c) => c.id === project.category)?.label}
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          <span>{project.client}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{project.year}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{project.location}</span>
                        </div>
                      </div>

                      <p className="text-slate-600 dark:text-gray-400 mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Scope */}
                      {project.scope.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-slate-800 dark:text-gray-300 mb-2">
                            Project Scope:
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {project.scope.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400"
                              >
                                <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-gray-800/50 text-xs text-slate-600 dark:text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
