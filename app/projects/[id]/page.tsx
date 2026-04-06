import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Project } from '@/types/project';
import ProjectDetailClient from '@/components/projects/ProjectDetailClient';
import ProjectsSlider from '@/components/projects/ProjectsSlider';

async function getProject(id: string): Promise<Project | null> {
  try {
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) return null;
    const connectDB = (await import('@/lib/mongodb')).default;
    const ProjectModel = (await import('@/lib/models/Project')).default;
    await connectDB();
    const project = await ProjectModel.findById(id).lean();
    if (project) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const plain: any = { ...project, _id: project._id.toString() };
      if (plain.testimonial?._id) plain.testimonial._id = plain.testimonial._id.toString();
      return plain;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}

async function getAllProjects(): Promise<{ _id: string; title: string; category: string; client: string; location: string; year: string; status?: string }[]> {
  try {
    const connectDB = (await import('@/lib/mongodb')).default;
    const ProjectModel = (await import('@/lib/models/Project')).default;
    await connectDB();
    const projects = await ProjectModel.find({}, { _id: 1, title: 1, category: 1, client: 1, location: 1, year: 1, status: 1 }).sort({ order: 1 }).lean();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return projects.map((p: any) => ({ ...p, _id: p._id.toString() }));
  } catch (e) {
    console.error(e);
  }
  return [];
}

const CATEGORY_LABELS: Record<string, string> = {
  'data-center': 'Data Center',
  'structured-cabling': 'Structured Cabling',
  'low-current-solutions': 'Low Current Solutions',
  'low-voltage': 'Low Voltage',
  'control-rooms': 'Control Rooms',
};

interface Props { params: Promise<{ id: string }> }

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const [project, allProjects] = await Promise.all([getProject(id), getAllProjects()]);


  if (!project) {
    return (
      <div className="min-h-screen bg-[#080C14] flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-xs text-slate-600 uppercase tracking-widest mb-4">404</p>
          <h1 className="text-3xl font-black text-white mb-4">Project Not Found</h1>
          <Link href="/projects" className="font-mono text-xs text-blue-500 hover:text-blue-400 uppercase tracking-widest flex items-center gap-2 justify-center">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const hasImages = project.images && project.images.length > 0;
  const categoryLabel = CATEGORY_LABELS[project.category] ?? project.category;

  const stats = [
    { label: 'Client', value: project.client },
    { label: 'Location', value: project.location },
    { label: 'Year', value: project.year },
    project.duration ? { label: 'Duration', value: project.duration } : null,
    project.projectValue ? { label: 'Value', value: project.projectValue } : null,
    project.teamSize ? { label: 'Team', value: project.teamSize } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="min-h-screen bg-[#080C14] text-white">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="relative pt-28 md:pt-36 pb-0">

        {/* Massive decorative grid bg */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

          {/* Back */}
          <Link href="/projects" className="inline-flex items-center gap-2 font-mono text-[10px] text-slate-600 hover:text-slate-400 uppercase tracking-widest transition-colors mb-12 md:mb-16">
            <ArrowLeft className="w-3 h-3" /> Projects
          </Link>

          {/* Category label */}
          <p className="font-mono text-[11px] text-blue-500 uppercase tracking-[0.25em] mb-5">
            {categoryLabel}
          </p>

          {/* Images (only when available) - before title */}
          {hasImages && (
            <div className="mb-10">
              <ProjectDetailClient project={project} />
            </div>
          )}

          {/* Title — fills the screen */}
          <h1
            className="font-black leading-[0.92] tracking-tighter text-white mb-10"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)' }}
          >
            {project.title}
          </h1>

          {/* Description */}
          <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed mb-12">
            {project.description}
          </p>

          {/* Thin rule */}
          <div className="h-px bg-gradient-to-r from-blue-600/60 via-white/10 to-transparent mb-0" />

          {/* ── Stat strip ────────────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-white/[0.06]">
            {stats.map((s, i) => (
              <div key={i} className="py-6 px-5 first:pl-0">
                <p className="font-mono text-[9px] text-slate-600 uppercase tracking-[0.2em] mb-2">{s.label}</p>
                <p className="font-mono text-sm text-white font-semibold">{s.value}</p>
              </div>
            ))}
            {/* Status */}
            <div className="py-6 px-5">
              <p className="font-mono text-[9px] text-slate-600 uppercase tracking-[0.2em] mb-2">Status</p>
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${
                  project.status === 'completed' ? 'bg-emerald-400' :
                  project.status === 'in-progress' ? 'bg-blue-400' : 'bg-slate-500'
                }`} />
                <span className="font-mono text-sm text-white capitalize">{project.status}</span>
              </div>
            </div>
          </div>
          <div className="h-px bg-white/[0.06]" />
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-[1fr_340px] gap-16 lg:gap-24">

          {/* Left column */}
          <div className="space-y-16">

            {/* Scope */}
            {project.scope && project.scope.length > 0 && (
              <div>
                <p className="font-mono text-[10px] text-slate-600 uppercase tracking-[0.25em] mb-8">Project Scope</p>
                <div className="space-y-0">
                  {project.scope.map((item: string, i: number) => (
                    <div key={i} className="flex gap-6 py-5 border-b border-white/[0.06] group">
                      <span className="font-mono text-xs text-slate-700 tabular-nums mt-0.5 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services */}
            {project.services && project.services.length > 0 && (
              <div>
                <p className="font-mono text-[10px] text-slate-600 uppercase tracking-[0.25em] mb-8">Services Delivered</p>
                <div className="space-y-0">
                  {project.services.map((s: string, i: number) => (
                    <div key={i} className="flex items-center gap-4 py-4 border-b border-white/[0.06] group">
                      <span className="text-slate-700 text-xs font-mono">—</span>
                      <span className="text-slate-300 text-sm group-hover:text-white transition-colors">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Overview prose */}
            {project.overview && (
              <div>
                <p className="font-mono text-[10px] text-slate-600 uppercase tracking-[0.25em] mb-8">Overview</p>
                <div
                  className="prose prose-sm prose-invert max-w-none prose-p:text-slate-400 prose-p:leading-relaxed prose-headings:text-white"
                  dangerouslySetInnerHTML={{ __html: project.overview }}
                />
              </div>
            )}

            {/* Challenge / Solution */}
            {(project.challenge || project.solution) && (
              <div className="grid sm:grid-cols-2 gap-12">
                {project.challenge && (
                  <div>
                    <p className="font-mono text-[10px] text-slate-600 uppercase tracking-[0.25em] mb-6">Challenge</p>
                    <div className="w-8 h-px bg-blue-600 mb-6" />
                    <div
                      className="prose prose-sm prose-invert max-w-none prose-p:text-slate-400"
                      dangerouslySetInnerHTML={{ __html: project.challenge }}
                    />
                  </div>
                )}
                {project.solution && (
                  <div>
                    <p className="font-mono text-[10px] text-slate-600 uppercase tracking-[0.25em] mb-6">Solution</p>
                    <div className="w-8 h-px bg-emerald-500 mb-6" />
                    <div
                      className="prose prose-sm prose-invert max-w-none prose-p:text-slate-400"
                      dangerouslySetInnerHTML={{ __html: project.solution }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <div>
                <p className="font-mono text-[10px] text-slate-600 uppercase tracking-[0.25em] mb-8">Outcomes</p>
                <div className="space-y-0">
                  {project.results.map((r: string, i: number) => (
                    <div key={i} className="flex gap-6 py-5 border-b border-white/6">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <p className="text-slate-300 text-sm leading-relaxed">{r}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial */}
            {project.testimonial?.quote && (
              <div className="border-l-2 border-blue-600 pl-8 py-2">
                <p className="text-xl text-slate-200 italic leading-relaxed mb-6">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </p>
                <p className="font-mono text-xs text-slate-600 uppercase tracking-widest">
                  {project.testimonial.author}
                  {project.testimonial.position && ` · ${project.testimonial.position}`}
                </p>
              </div>
            )}
          </div>

          {/* Right sidebar — floats cleanly */}
          <div className="space-y-12">

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div>
                <p className="font-mono text-[10px] text-slate-600 uppercase tracking-[0.25em] mb-6">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t: string, i: number) => (
                    <span
                      key={i}
                      className="font-mono text-[10px] px-3 py-1.5 border border-white/[0.08] text-slate-400 uppercase tracking-wider hover:border-blue-500/40 hover:text-white transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick info pairs */}
            {(project.industry || project.complexity) && (
              <div>
                <p className="font-mono text-[10px] text-slate-600 uppercase tracking-[0.25em] mb-6">Project Details</p>
                <div className="space-y-4">
                  {project.industry && (
                    <div className="flex justify-between items-baseline border-b border-white/[0.04] pb-4">
                      <span className="font-mono text-[10px] text-slate-600 uppercase tracking-wider">Industry</span>
                      <span className="font-mono text-xs text-slate-300">{project.industry}</span>
                    </div>
                  )}
                  {project.complexity && (
                    <div className="flex justify-between items-baseline border-b border-white/[0.04] pb-4">
                      <span className="font-mono text-[10px] text-slate-600 uppercase tracking-wider">Complexity</span>
                      <span className="font-mono text-xs text-slate-300 capitalize">{project.complexity}</span>
                    </div>
                  )}
                  {project.teamSize && (
                    <div className="flex justify-between items-baseline border-b border-white/[0.04] pb-4">
                      <span className="font-mono text-[10px] text-slate-600 uppercase tracking-wider">Team Size</span>
                      <span className="font-mono text-xs text-slate-300">{project.teamSize}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Key features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div>
                <p className="font-mono text-[10px] text-slate-600 uppercase tracking-[0.25em] mb-6">Key Features</p>
                <div className="space-y-3">
                  {project.keyFeatures.map((f: string, i: number) => (
                    <div key={i} className="flex gap-3 text-sm text-slate-400">
                      <span className="text-blue-600 shrink-0">+</span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA — minimal */}
            <div className="pt-4 border-t border-white/[0.06]">
              <p className="font-mono text-[10px] text-slate-600 uppercase tracking-[0.25em] mb-5">
                Start a similar project
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 font-mono text-xs text-white uppercase tracking-widest hover:text-blue-400 transition-colors"
              >
                Get in Touch
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* ── Other Projects slider (light bg) ────────────────── */}
      <ProjectsSlider projects={allProjects} currentId={id} />
    </div>
  );
}
