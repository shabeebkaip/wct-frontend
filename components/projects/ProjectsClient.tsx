'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Server,
  Cable,
  Cctv,
  Zap,
  Wifi,
  Monitor,
  ShieldCheck,
  Tv2,
  Flame,
  Network,
  Building2,
  HardDrive,
  type LucideIcon,
} from 'lucide-react';
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

// Subtitle alternation — unified dark palette
const ROW_BG = ['bg-[#080C14]', 'bg-[#0c1322]'];

/** Pick an icon based on project title + category + services keywords */
function getProjectIcon(project: Project): LucideIcon {
  const haystack = [
    project.title,
    project.category,
    ...(project.services ?? []),
  ]
    .join(' ')
    .toLowerCase();

  if (/cctv|surveillance|camera|cams/.test(haystack)) return Cctv;
  if (/data.?center|server|rack|ups|colocation|datacenter/.test(haystack)) return Server;
  if (/structured.?cab|cabling|fiber|passive|patch|cat6|cat5|utp|sfp/.test(haystack)) return Cable;
  if (/control.?room|scada|bms|bacs|building.?management/.test(haystack)) return Monitor;
  if (/wireless|wi.?fi|access.?point|aruba|cisco|ubiquiti/.test(haystack)) return Wifi;
  if (/fire|suppression|alarm|detection|sprinkler/.test(haystack)) return Flame;
  if (/audio.?visual|av\b|display|video.?wall|projector|screen/.test(haystack)) return Tv2;
  if (/access.?control|biometric|intrusion|security.?system/.test(haystack)) return ShieldCheck;
  if (/low.?voltage|low.?current|electrical|power|ups|pdu/.test(haystack)) return Zap;
  if (/switch|router|network|active.?device|it.?infra/.test(haystack)) return Network;
  if (/storage|san|nas|backup|hdd|ssd|disk/.test(haystack)) return HardDrive;
  if (/facility|building|campus|infrastructure/.test(haystack)) return Building2;

  // category fallback
  if (project.category === 'data-center') return Server;
  if (project.category === 'structured-cabling') return Cable;
  if (project.category === 'control-rooms') return Monitor;
  if (project.category === 'low-voltage' || project.category === 'low-current-solutions') return Zap;

  return Building2;
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [active, setActive] = useState('all');

  const filtered =
    active === 'all' ? projects : projects.filter((p) => p.category === active);

  const visibleCats = CATEGORIES.filter(
    (c) => c.id === 'all' || projects.some((p) => p.category === c.id)
  );

  return (
    <div>
      {/* Filter tabs */}
      <div className="bg-[#080C14] px-6 lg:px-12 pt-12 pb-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end gap-8 border-b border-white/[0.08] overflow-x-auto scrollbar-hide">
            {visibleCats.map((c) => {
              const count =
                c.id === 'all'
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
        </div>
      </div>

      {/* Project rows */}
      <div>
        {filtered.map((project, idx) => {
          const globalIdx = projects.findIndex((p) => p._id === project._id);
          const Icon = getProjectIcon(project);

          return (
            <div
              key={project._id || project.title}
              className={`${ROW_BG[idx % 2]} text-white`}
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <Link
                  href={`/projects/${project._id}`}
                  className="group relative flex items-start gap-6 md:gap-10 py-10 md:py-12 border-b border-white/[0.06] hover:border-white/[0.12] transition-colors duration-300 block overflow-hidden"
                >
                  {/* Sweep underline on hover */}
                  <span className="absolute bottom-0 left-0 h-px bg-blue-500 w-0 group-hover:w-full transition-all duration-500 ease-out" />

                  {/* Contextual icon — decorative background */}
                  <Icon
                    aria-hidden
                    strokeWidth={1}
                    className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 text-white opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-300"
                    style={{ width: 'clamp(7rem, 14vw, 12rem)', height: 'clamp(7rem, 14vw, 12rem)' }}
                  />

                  {/* Number + category */}
                  <div className="shrink-0 w-20 md:w-28">
                    <div className="font-mono text-3xl md:text-4xl font-bold text-white/[0.08] group-hover:text-blue-500 transition-colors duration-300 leading-none mb-1.5 tabular-nums">
                      {String(globalIdx + 1).padStart(2, '0')}
                    </div>
                    <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest leading-tight">
                      {CATEGORY_SHORT[project.category] ?? project.category}
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 md:gap-8">
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
                        {project.services && project.services.length > 0 && (
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4">
                            {project.services.slice(0, 4).map((s, i) => (
                              <span
                                key={i}
                                className="font-mono text-[10px] text-slate-600 uppercase tracking-wider"
                              >
                                — {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="shrink-0 md:text-right space-y-2 md:min-w-[160px]">
                        <div className="flex md:justify-end items-center gap-2">
                          {project.status && (
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_COLOR[project.status] ?? 'bg-slate-500'}`}
                            />
                          )}
                          <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider capitalize">
                            {project.status}
                          </span>
                        </div>
                        <div className="font-mono text-xs text-slate-400">
                          {project.location?.split(',')[0]}
                        </div>
                        <div className="font-mono text-xs text-slate-600">{project.year}</div>
                        {project.projectValue && (
                          <div className="font-mono text-xs text-slate-500">
                            {project.projectValue}
                          </div>
                        )}
                        <div className="flex md:justify-end items-center gap-1 pt-1 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="font-mono text-[10px] uppercase tracking-wider">View</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-[#080C14] py-24 text-center font-mono text-xs text-slate-700 uppercase tracking-widest">
            No projects in this category
          </div>
        )}
      </div>

      {/* Count footer */}
      <div className="bg-[#080C14]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex items-center justify-between border-t border-white/[0.06]">
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-700">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''} listed
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-700">
            WCT Portfolio Archive
          </span>
        </div>
      </div>
    </div>
  );
}
