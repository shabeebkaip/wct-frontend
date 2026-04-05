'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectsClientProps {
  projects: Project[];
}

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'data-center', label: 'Data Center' },
  { id: 'structured-cabling', label: 'Structured Cabling' },
  { id: 'low-current-solutions', label: 'Low Current' },
  { id: 'low-voltage', label: 'Low Voltage' },
  { id: 'control-rooms', label: 'Control Rooms' },
];

const CATEGORY_SHORT: Record<string, string> = {
  'data-center': 'DATA CENTER',
  'structured-cabling': 'STRUCT. CABLING',
  'low-current-solutions': 'LOW CURRENT',
  'low-voltage': 'LOW VOLTAGE',
  'control-rooms': 'CONTROL ROOMS',
};

const STATUS_COLOR: Record<string, string> = {
  completed: 'bg-emerald-400',
  'in-progress': 'bg-blue-400',
  planned: 'bg-slate-500',
};

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [active, setActive] = useState('all');

  const filtered =
    active === 'all' ? projects : projects.filter((p) => p.category === active);

  // Only show categories that have projects
  const visibleCats = CATEGORIES.filter(
    (c) => c.id === 'all' || projects.some((p) => p.category === c.id)
  );

  return (
    <section className="px-6 pb-24">
      <div className="max-w-7xl mx-auto">

        {/* Filter — text tabs with underline active state */}
        <div className="flex items-end gap-8 border-b border-white/[0.08] mb-0 overflow-x-auto pb-0 scrollbar-hide">
          {visibleCats.map((c) => {
            const count = c.id === 'all'
              ? projects.length
              : projects.filter((p) => p.category === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`relative shrink-0 pb-4 text-xs font-mono uppercase tracking-widest transition-colors duration-200 ${
                  active === c.id
                    ? 'text-white'
                    : 'text-slate-600 hover:text-slate-400'
                }`}
              >
                {c.label}
                <span className="ml-2 text-[10px] text-slate-600">{count}</span>
                {active === c.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-blue-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Archive list */}
        <div>
          {filtered.map((project, idx) => (
            <Link
              key={project._id || project.title}
              href={`/projects/${project._id}`}
              className="group relative block border-b border-white/[0.06] hover:border-white/[0.10] transition-colors duration-300"
            >
              {/* Hover blue line — sweeps in from left */}
              <span className="absolute bottom-0 left-0 h-px bg-blue-500 w-0 group-hover:w-full transition-all duration-500 ease-out" />

              <div className="flex items-start gap-6 md:gap-10 py-7 md:py-9">

                {/* Ordinal + Category */}
                <div className="shrink-0 w-20 md:w-28">
                  <div className="font-mono text-3xl md:text-4xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 leading-none mb-1.5 tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest leading-tight">
                    {CATEGORY_SHORT[project.category] ?? project.category}
                  </div>
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 md:gap-8">

                    {/* Title block */}
                    <div className="min-w-0">
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tight text-white group-hover:text-blue-300 transition-colors duration-300 leading-tight mb-1.5">
                        {project.title}
                      </h2>
                      <p className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-3">
                        {project.client}
                      </p>
                      <p className="text-sm text-slate-500 leading-relaxed max-w-xl line-clamp-2">
                        {project.description}
                      </p>

                      {/* Services strip */}
                      {project.services && project.services.length > 0 && (
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4">
                          {project.services.slice(0, 4).map((s, i) => (
                            <span key={i} className="font-mono text-[10px] text-slate-600 uppercase tracking-wider">
                              — {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right meta column */}
                    <div className="shrink-0 md:text-right space-y-2 md:min-w-[160px]">
                      <div className="flex md:justify-end items-center gap-2">
                        {project.status && (
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_COLOR[project.status] ?? 'bg-slate-500'}`} />
                        )}
                        <span className="font-mono text-[10px] text-slate-600 uppercase tracking-wider capitalize">
                          {project.status}
                        </span>
                      </div>
                      <div className="font-mono text-xs text-slate-400">{project.location.split(',')[0]}</div>
                      <div className="font-mono text-xs text-slate-600">{project.year}</div>
                      {project.projectValue && (
                        <div className="font-mono text-xs text-slate-500">{project.projectValue}</div>
                      )}
                      <div className="flex md:justify-end items-center gap-1 pt-1 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-mono text-[10px] uppercase tracking-wider">View</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {filtered.length === 0 && (
            <div className="py-24 text-center font-mono text-xs text-slate-700 uppercase tracking-widest">
              No projects in this category
            </div>
          )}
        </div>

        {/* Count footer */}
        <div className="mt-8 flex items-center justify-between">
          <span className="font-mono text-[10px] text-slate-700 uppercase tracking-widest">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''} listed
          </span>
          <span className="font-mono text-[10px] text-slate-700 uppercase tracking-widest">
            WCT Portfolio Archive
          </span>
        </div>
      </div>
    </section>
  );
}
