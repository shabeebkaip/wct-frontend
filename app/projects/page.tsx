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

  const categories = [...new Set(projects.map((p) => p.category))].length;

  return (
    <div className="min-h-screen bg-[#080C14] text-white">

      {/* Fixed grid background */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Blue ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-blue-700/[0.07] blur-[160px] -z-10 pointer-events-none" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-screen flex flex-col justify-center">

        {/* Ghost number — decorative backdrop */}
        <div
          aria-hidden
          className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 font-black leading-none tracking-tighter text-white/[0.025]"
          style={{ fontSize: 'clamp(14rem, 30vw, 28rem)', lineHeight: 1 }}
        >
          WCT
        </div>

        {/* Top rule */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20 w-full">

          {/* Label row */}
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-[10px] text-blue-500 uppercase tracking-[0.35em]">
              Portfolio Archive
            </span>
            <span className="flex-1 h-px bg-white/[0.06]" />
            <span className="font-mono text-[10px] text-slate-700 uppercase tracking-widest">
              Est. 2006
            </span>
          </div>

          {/* Main headline + description */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div className="relative">
              {/* Vertical accent line */}
              <div className="absolute -left-6 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/60 via-blue-500/20 to-transparent hidden lg:block" />

              <h1
                className="font-black leading-[0.85] tracking-tighter text-white"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)' }}
              >
                Our<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-500">
                  Projects
                </span>
              </h1>
            </div>

            <div className="lg:max-w-xs lg:pb-3 space-y-6">
              <p className="text-slate-500 text-sm leading-relaxed">
                Infrastructure projects spanning data centers, structured
                cabling, security systems, and low-current solutions across
                Saudi Arabia and the GCC.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 font-mono text-[10px] text-blue-500 hover:text-white uppercase tracking-widest transition-colors duration-200"
              >
                Start a project
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom accent line */}
        <div className="h-px bg-gradient-to-r from-blue-600/40 via-white/[0.06] to-transparent" />
      </section>

      {/* ── Stats bar — light section ─────────────────────────── */}
      <div className="bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-slate-200">
            {[
              { value: `${projects.length}+`, label: 'Projects Delivered' },
              { value: `${categories}`,        label: 'Service Categories' },
              { value: '18+',                  label: 'Years of Expertise' },
              { value: 'KSA',                  label: 'Headquartered'      },
            ].map((stat) => (
              <div key={stat.label} className="px-8 first:pl-0 last:pr-0 py-2">
                <div
                  className="font-black tracking-tighter text-slate-900 leading-none mb-2"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
                >
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Project list ─────────────────────────────────────── */}
      <ProjectsClient projects={projects} />

      {/* ── Footer CTA — light ───────────────────────────────── */}
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="font-mono text-[10px] text-slate-400 uppercase tracking-[0.25em] mb-5">
                Ready to build?
              </p>
              <h2
                className="font-black tracking-tighter text-slate-900 leading-tight"
                style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
              >
                Let&apos;s discuss<br />your project.
              </h2>
            </div>
            <Link
              href="/contact"
              className="group shrink-0 inline-flex items-center gap-3 font-mono text-xs text-slate-900 uppercase tracking-widest border border-slate-300 hover:border-blue-500 hover:text-blue-600 px-8 py-4 transition-colors duration-200"
            >
              Contact Us
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
