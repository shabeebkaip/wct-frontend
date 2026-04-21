import type { ComponentType } from "react";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import connectDB from "@/lib/mongodb";
import { AboutPage } from "@/lib/models/AboutPage";
import type { AboutPageData } from "@/types/about";

type IconType = ComponentType<{ className?: string }>;

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getAboutPageData(): Promise<AboutPageData | null> {
  try {
    await connectDB();
    const data = await AboutPage.findOne().lean();
    if (!data) return null;
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching about page data:", error);
    return null;
  }
}

const getIcon = (iconName: string, fallback: IconType): IconType => {
  const IconComponent = (LucideIcons as unknown as Record<string, IconType>)[iconName];
  return IconComponent || fallback;
};

const About = async () => {
  const aboutData = await getAboutPageData();

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        Unable to load about page content.
      </div>
    );
  }

  const MissionIcon = getIcon(aboutData.mission.icon, LucideIcons.Flag);
  const VisionIcon  = getIcon(aboutData.vision.icon,  LucideIcons.Eye);

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950">

        {/* Mesh / glow background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(37,99,235,0.38),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_60%,rgba(99,102,241,0.18),transparent)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-slate-950" />
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-12 w-full">

          {/* Eyebrow row */}
          <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/8 border border-white/10">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-blue-400">
                {aboutData.hero.badge}
              </span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-bold tracking-[0.2em]">ONLINE</span>
              </div>
              <span className="text-white/20">|</span>
              <span className="text-white/35 tracking-widest">EST. 2005 · RIYADH, KSA</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.06] tracking-tight max-w-4xl mb-4">
            {aboutData.hero.title}
          </h1>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.06] tracking-tight max-w-4xl mb-8 bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
            Built to last.
          </h2>

          {/* Descriptor pills */}
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white/50 mb-8">
            <span>Infrastructure-first</span>
            <span className="text-blue-400">•</span>
            <span>Reliability-driven</span>
            <span className="text-blue-400">•</span>
            <span>Data Center Specialists</span>
            <span className="text-blue-400">•</span>
            <span>KSA Region</span>
          </div>

          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-12">
            {aboutData.hero.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-blue-600/30"
            >
              Start a Conversation
              <LucideIcons.ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/30 font-semibold text-sm transition-colors duration-200"
            >
              Our Services
            </Link>
          </div>
        </div>

        {/* Stats strip removed as requested */}
      </section>

      {/* ─── COMPANY STORY ────────────────────────────────────── */}
      <section className="bg-white overflow-hidden">

        {/* Console bar */}
        <div className="border-b border-slate-100 bg-slate-50 px-6 lg:px-12 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="font-mono text-blue-600 text-[11px] font-bold tracking-[0.2em]">PROFILE</span>
              </div>
              <span className="text-slate-200 font-mono">|</span>
              <span className="font-mono text-slate-400 text-[11px] tracking-[0.15em] uppercase">
                WCT · Company Profile · Est. 2005

              </span>
            </div>
            <span className="font-mono text-slate-400 text-[11px] tracking-widest">RIYADH · KSA</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: Story */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-blue-600" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
                  {aboutData.companyStory.badge}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.06] tracking-tight mb-8">
                {aboutData.companyStory.title}
              </h2>
              <div className="space-y-5 text-slate-500 leading-relaxed text-[1.0625rem] mb-10">
                {aboutData.companyStory.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Key metrics strip */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "20+",  label: "Years",    sub: "In business" },
                  { value: "500+", label: "Projects", sub: "Delivered" },
                  { value: "24/7", label: "Support",  sub: "Always on" },
                ].map((m) => (
                  <div key={m.label} className="relative group bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-blue-200 hover:shadow-md transition-all duration-300 overflow-hidden">
                    <div className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-slate-300 group-hover:border-blue-300 transition-colors" />
                    <div className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-slate-300 group-hover:border-blue-300 transition-colors" />
                    <p className="text-2xl font-black text-slate-900 mb-0.5">{m.value}</p>
                    <p className="text-xs font-bold text-blue-600 tracking-wide">{m.label}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{m.sub}</p>
                  </div>
                ))}
              </div>

            </div>

            {/* Right: Company profile card + differentiators */}
            <div className="space-y-4">

              {/* Profile card */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-white">
                  <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">Company Profile</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="font-mono text-[10px] text-green-600 font-bold tracking-widest">ACTIVE</span>
                  </div>
                </div>
                <div className="p-5 grid grid-cols-2 gap-3">
                  {[
                    { label: "Founded",     value: "2005" },
                    { label: "HQ",          value: "Riyadh, KSA" },
                    { label: "Specialty",   value: "Data Center" },
                    { label: "Coverage",    value: "GCC Region" },
                    { label: "Uptime SLA",  value: "99.9%" },
                    { label: "Response",    value: "< 24 Hours" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between gap-4 font-mono text-[11px]">
                      <span className="text-slate-400 tracking-widest uppercase">{label}</span>
                      <span className="font-bold text-slate-700 tracking-wide">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Differentiators */}
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 pt-2 pb-1">What sets us apart</p>
              {[
                { icon: LucideIcons.BadgeCheck, title: "Tier-III Aligned Designs",   desc: "Every DC and network environment engineered to the highest reliability benchmarks.", id: "01" },
                { icon: LucideIcons.Clock,       title: "24/7 Support SLAs",          desc: "Round-the-clock monitoring, response, and escalation paths.", id: "02" },
                { icon: LucideIcons.Shield,      title: "Security-First Delivery",    desc: "Physical and logical security integrated at the architecture phase.", id: "03" },
                { icon: LucideIcons.Rocket,      title: "Rapid Rollout Playbooks",    desc: "Repeatable deployment processes that cut go-live risk and commissioning time.", id: "04" },
              ].map(({ icon: Icon, title, desc, id }) => (
                <div key={title} className="group relative flex gap-4 p-4 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/8 bg-white transition-all duration-300">
                  <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-slate-200 group-hover:border-blue-400 transition-colors duration-300" />
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t-2 border-r-2 border-slate-200 group-hover:border-blue-400 transition-colors duration-300" />
                  <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b-2 border-l-2 border-slate-200 group-hover:border-blue-400 transition-colors duration-300" />
                  <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-slate-200 group-hover:border-blue-400 transition-colors duration-300" />
                  <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:shadow-md group-hover:shadow-blue-600/30 transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-bold text-slate-900 text-sm">{title}</p>
                      <span className="font-mono text-[9px] text-slate-300 font-bold tracking-widest">{id}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MISSION & VISION ─────────────────────────────────── */}
      <section className="relative py-28 px-6 bg-slate-950 overflow-hidden">

        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(37,99,235,0.18),transparent)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">

          <div className="mb-16 flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-blue-500" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400">Purpose</span>
              <div className="h-px w-8 bg-blue-500" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.06] tracking-tight max-w-2xl">
              Why we exist — and where we&apos;re headed
            </h2>
            <p className="text-slate-500 mt-4 max-w-xl">The principles that drive every project, partnership, and decision we make.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: "Mission", module: "MODULE // 01", item: aboutData.mission, Icon: MissionIcon, accent: "from-blue-600 to-blue-700", borderColor: "via-blue-500/70" },
              { label: "Vision",  module: "MODULE // 02", item: aboutData.vision,  Icon: VisionIcon,  accent: "from-indigo-600 to-violet-700", borderColor: "via-indigo-500/70" },
            ].map(({ label, module, item, Icon, accent, borderColor }) => (
              <div key={label} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm group hover:border-white/20 hover:bg-white/8 transition-all duration-300">
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${borderColor} to-transparent`} />

                {/* Card header bar */}
                <div className="flex items-center justify-between px-8 pt-8 pb-0">
                  <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-slate-600">{module}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    <span className="font-mono text-[10px] text-blue-400 font-bold tracking-widest">{label.toUpperCase()}</span>
                  </div>
                </div>

                <div className="p-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-900/40 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 leading-tight">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-[0.9375rem]">{item.description}</p>
                </div>

                {/* Bottom strip */}
                <div className="px-8 py-4 border-t border-white/6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="font-mono text-[10px] text-slate-500 tracking-widest uppercase">Guiding principle · WCT</span>
                </div>

                {/* Watermark */}
                <div className="absolute bottom-12 right-8 text-8xl font-black text-white/[0.03] select-none leading-none pointer-events-none">
                  {label === "Mission" ? "01" : "02"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CORE VALUES ──────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden">

        {/* Console bar */}
        <div className="border-b border-slate-100 bg-slate-50 px-6 lg:px-12 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="font-mono text-blue-600 text-[11px] font-bold tracking-[0.2em]">PRINCIPLES</span>
              </div>
              <span className="text-slate-200 font-mono">|</span>
              <span className="font-mono text-slate-400 text-[11px] tracking-[0.15em] uppercase">
                WCT · Core Values · Operational Standards
              </span>
            </div>
            <span className="font-mono text-slate-400 text-[11px] tracking-widest">
              {aboutData.coreValues.length} VALUES DEFINED
            </span>
          </div>
        </div>

        {/* Subtle background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24">

          <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-blue-600" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">Core Values</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.06] tracking-tight">
                How we operate every day
              </h2>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed lg:text-right text-sm">
              Principles that shape every engagement, every deployment, and every relationship we build.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {aboutData.coreValues.map((value, index) => {
              const ValueIcon = getIcon(value.icon, LucideIcons.Star);
              return (
                <div
                  key={value._id || index}
                  className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/8 transition-all duration-300 overflow-hidden"
                >
                  {/* Hover top accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Corner brackets */}
                  <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-slate-200 group-hover:border-blue-400 transition-colors duration-300" />
                  <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-slate-200 group-hover:border-blue-400 transition-colors duration-300" />
                  <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-slate-200 group-hover:border-blue-400 transition-colors duration-300" />
                  <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-slate-200 group-hover:border-blue-400 transition-colors duration-300" />

                  {/* Faded number watermark */}
                  <div className="absolute bottom-4 right-6 text-7xl font-black text-slate-100 group-hover:text-blue-50 transition-colors select-none leading-none pointer-events-none">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="relative space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-110 transition-transform duration-300">
                        <ValueIcon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-[10px] text-slate-300 font-bold tracking-widest pt-1">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-blue-500 font-bold tracking-widest block mb-1.5">
                        VALUE · {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg font-black text-slate-900 tracking-tight">{value.title}</h3>
                    </div>
                    <p className="text-slate-500 leading-relaxed text-sm">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─────────────────────────────────────────────── */}
      <section className="relative bg-slate-950 overflow-hidden">

        {/* Console bar */}
        <div className="border-b border-white/8 bg-white/3 px-6 lg:px-12 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-green-400 text-[11px] font-bold tracking-[0.2em]">ONLINE</span>
              </div>
              <span className="text-white/20 font-mono">|</span>
              <span className="font-mono text-white/40 text-[11px] tracking-[0.15em] uppercase">
                WCT · Team Directory · All Hands
              </span>
            </div>
          </div>
        </div>

        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-8">

          {/* Header */}
          <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-blue-500" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400">Our Team</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.06] tracking-tight max-w-2xl">
                People who ship reliability
              </h2>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed lg:text-right text-sm">
              Certified specialists and disciplined operators focused on uptime and accountability.
            </p>
          </div>

          {/* Leadership */}
          {aboutData.teamMembers.filter((m) => m.isLeadership).length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-slate-500">Leadership</span>
                <div className="flex-1 h-px bg-white/8" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {aboutData.teamMembers
                  .filter((m) => m.isLeadership)
                  .sort((a, b) => a.order - b.order)
                  .map((member, index) => (
                    <div
                      key={member._id || index}
                      className="group flex flex-col items-center text-center"
                    >
                      {/* Circle photo */}
                      <div className="relative mb-5">
                        {/* Glowing ring */}
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-500/40 to-indigo-500/20 blur-sm group-hover:from-blue-500/60 transition-all duration-500" />
                        <div className="relative w-44 h-44 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-blue-500/40 transition-all duration-300">
                          {member.image ? (
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                              sizes="176px"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-4xl font-black text-white">
                              {member.name.slice(0, 1)}
                            </div>
                          )}
                        </div>
                        {/* Active dot */}
                        <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-green-400 border-2 border-slate-950 shadow-lg shadow-green-400/50" />
                      </div>

                      {/* Info */}
                      <h3 className="text-xl font-black text-white tracking-tight">{member.name}</h3>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Certifications strip */}
          <div className="mb-16 rounded-2xl border border-white/8 bg-white/3 px-8 py-6">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <span className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-slate-500 shrink-0">Certifications</span>
              <div className="h-4 w-px bg-white/10 hidden sm:block" />
              {["Cisco CCNA / CCNP", "CompTIA Network+", "Huawei HCIP", "TIA-942 Data Center", "ISO/IEC 27001", "PMI PMP"].map((cert) => (
                <div key={cert} className="flex items-center gap-2">
                  <LucideIcons.BadgeCheck className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  <span className="font-mono text-[11px] text-slate-400 tracking-wide">{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Teams */}
          {aboutData.teamMembers.filter((m) => !m.isLeadership).length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-slate-500">Delivery Teams</span>
                <div className="flex-1 h-px bg-white/8" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {aboutData.teamMembers
                  .filter((m) => !m.isLeadership)
                  .sort((a, b) => a.order - b.order)
                  .map((member, index) => (
                    <div
                      key={member._id || index}
                      className="group relative flex gap-4 p-5 rounded-2xl border border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/6 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl overflow-hidden ring-2 ring-white/10 group-hover:ring-blue-500/30 transition-all duration-300">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={44}
                            height={44}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-sm font-black text-white">
                            {member.name.slice(0, 1)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-white tracking-tight text-sm truncate">{member.name}</h3>
                        <p className="text-[11px] font-semibold text-blue-400 mb-1.5 truncate">{member.role}</p>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{member.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── TRUSTED BRANDS ───────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <div className="mb-12 flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-blue-600" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">Trusted Brands</span>
              <div className="h-px w-8 bg-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">
              Partnered with the world&apos;s leading manufacturers
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl text-sm leading-relaxed">
              We work exclusively with globally certified brands to deliver uncompromising quality and performance.
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {[
              { name: "R&M",            src: "/trusted-brands/rm.png" },
              { name: "Panduit",        src: "/trusted-brands/panduit.webp" },
              { name: "Corning",        src: "/trusted-brands/corning.webp" },
              { name: "Legrand",        src: "/trusted-brands/legrand.jpg" },
              { name: "CommScope",      src: "/trusted-brands/commscope.png" },
              { name: "3M",             src: "/trusted-brands/3m.jpg" },
              { name: "Leviton",        src: "/trusted-brands/leviton.jpg" },
              { name: "Datwyler",       src: "/trusted-brands/datwyler.jpg" },
              { name: "Bosch",          src: "/trusted-brands/bosch.png" },
              { name: "Axis",           src: "/trusted-brands/axis.jpg" },
              { name: "Nitgen",         src: "/trusted-brands/nitgen.png" },
              { name: "Samsung",        src: "/trusted-brands/samsung.avif" },
              { name: "Milestone",      src: "/trusted-brands/milestone.webp" },
              { name: "Genetec",        src: "/trusted-brands/genetec.png" },
              { name: "Aiphone",        src: "/trusted-brands/aiphone.png" },
              { name: "CAT",            src: "/trusted-brands/cat.webp" },
              { name: "EDPAC",          src: "/trusted-brands/edpac.png" },
              { name: "Yuasa",          src: "/trusted-brands/yuasa.png" },
              { name: "Airedale",       src: "/trusted-brands/airedale.png" },
              { name: "APC",            src: "/trusted-brands/apc.png" },
              { name: "Huawei",         src: "/trusted-brands/huawei.svg" },
              { name: "Vertiv",         src: "/trusted-brands/vertiv.svg" },
            ].map(({ name, src }) => (
              <div
                key={name}
                className="group flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-slate-100 bg-white hover:border-blue-200 hover:shadow-md hover:shadow-blue-500/8 transition-all duration-300"
              >
                <div className="w-full h-10 flex items-center justify-center">
                  <Image
                    src={src}
                    alt={name}
                    width={80}
                    height={40}
                    className="object-contain max-h-10 w-auto  transition-all duration-300"
                  />
                </div>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 group-hover:text-blue-500 uppercase transition-colors duration-300">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-slate-950">

        {/* Top console bar */}
        <div className="max-w-7xl mx-auto mb-10">
          <div className="border border-white/8 bg-white/3 rounded-2xl px-6 py-3 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-green-400 text-[11px] font-bold tracking-[0.2em]">AVAILABLE</span>
              </div>
              <span className="text-white/20 font-mono">|</span>
              <span className="font-mono text-white/40 text-[11px] tracking-[0.15em] uppercase">
                WCT · Project Intake · Ready to engage
              </span>
            </div>
            <span className="font-mono text-white/30 text-[11px] tracking-widest">SLA: &lt; 24H RESPONSE</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            {/* BG glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.28),transparent)]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

            <div className="relative px-10 md:px-16 py-16 md:py-20 grid md:grid-cols-[1.4fr_1fr] gap-12 items-center">

              {/* Left */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-blue-500" />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400">Get in touch</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  {aboutData.cta.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{aboutData.cta.description}</p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href={aboutData.cta.primaryButton.link}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-blue-600/30"
                  >
                    {aboutData.cta.primaryButton.text}
                    <LucideIcons.ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href={aboutData.cta.secondaryButton.link}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/30 font-semibold text-sm transition-colors duration-200"
                  >
                    {aboutData.cta.secondaryButton.text}
                  </Link>
                </div>
              </div>

              {/* Right: commitment panel */}
              <div className="relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/8 bg-white/3">
                  <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">Our Commitments</span>
                  <span className="font-mono text-[10px] text-green-400 font-bold">● Active</span>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { icon: LucideIcons.Radio,         text: "24/7 on-call reliability",         tag: "SLA" },
                    { icon: LucideIcons.FileText,       text: "Documented change control",        tag: "CTRL" },
                    { icon: LucideIcons.BarChart3,      text: "Transparent reporting",            tag: "RPT" },
                    { icon: LucideIcons.MessageCircle,  text: "Direct access to delivery leads",  tag: "LEAD" },
                  ].map(({ icon: Icon, text, tag }) => (
                    <div key={text} className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-white/80 flex-1">{text}</span>
                      <span className="font-mono text-[9px] text-white/30 tracking-widest">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
