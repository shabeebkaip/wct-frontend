import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectsClient from '@/components/projects/ProjectsClient';

async function getProjects() {
  try {
    const connectDB = (await import('@/lib/mongodb')).default;
    const Project = (await import('@/lib/models/Project')).default;
    await connectDB();
    const projects = await Project.find().sort({ order: 1 }).lean();
    if (projects && projects.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return projects.map((p: any) => {
        const plain = { ...p, _id: p._id.toString() };
        if (plain.testimonial?._id) plain.testimonial._id = plain.testimonial._id.toString();
        return plain;
      });
    }
  } catch (e) {
    console.error(e);
  }
  return [];
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-[#080C14] text-white">

      {/* Fixed grid background */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-blue-700/8 blur-[140px] -z-10 pointer-events-none" />

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-0">

        <p className="font-mono text-[11px] text-blue-500 uppercase tracking-[0.3em] mb-8">
          Portfolio Archive
        </p>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-0">
          <h1
            className="font-black leading-[0.88] tracking-tighter text-white"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
          >
            Our<br />Projects
          </h1>

          <div className="lg:text-right max-w-sm pb-4">
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Infrastructure projects spanning data centers, structured cabling, security systems, and low-current solutions.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 font-mono text-[10px] text-slate-500 hover:text-white uppercase tracking-widest transition-colors"
            >
              Start a project
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px bg-gradient-to-r from-blue-600/50 via-white/10 to-transparent" />
      </section>

      {/* ── Project list ─────────────────────────────── */}
      <ProjectsClient projects={projects} />

      {/* ── Footer CTA ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="h-px bg-white/[0.06] mb-16" />
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="font-mono text-[10px] text-slate-600 uppercase tracking-[0.25em] mb-5">
              Ready to build?
            </p>
            <h2
              className="font-black tracking-tighter text-white leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
            >
              Let&apos;s discuss<br />your project.
            </h2>
          </div>
          <Link
            href="/contact"
            className="group shrink-0 inline-flex items-center gap-3 font-mono text-xs text-white uppercase tracking-widest border border-white/10 hover:border-blue-500/50 px-8 py-4 transition-colors"
          >
            Contact Us
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
