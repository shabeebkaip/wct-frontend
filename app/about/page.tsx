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
  const VisionIcon = getIcon(aboutData.vision.icon, LucideIcons.Eye);

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden bg-slate-950">
        {/* mesh background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.35),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_60%,rgba(99,102,241,0.18),transparent)]" />
          {/* subtle grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          {/* bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-b from-transparent to-slate-950" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-20 w-full">
          {/* eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-blue-500" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400">
              {aboutData.hero.badge}
            </span>
          </div>

          {/* headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight max-w-4xl mb-6">
            {aboutData.hero.title}
          </h1>

          {/* dot-separated descriptor row */}
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-blue-300 mb-8">
            <span>Infrastructure-first</span>
            <span className="text-blue-600">•</span>
            <span>Reliability-driven</span>
            <span className="text-blue-600">•</span>
            <span>Built to last</span>
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
              href="/solutions"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/30 font-semibold text-sm transition-colors duration-200"
            >
              Our Solutions
            </Link>
          </div>
        </div>

        {/* stats strip */}
        <div className="relative z-10 border-t border-white/8">
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10+", label: "Years delivering" },
              { value: "500+", label: "Projects completed" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "24/7", label: "Support coverage" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs font-medium tracking-widest uppercase text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPANY STORY ────────────────────────────────────── */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1px_1fr] gap-0 items-start">
          {/* left */}
          <div className="lg:pr-20 space-y-6 pb-12 lg:pb-0">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-blue-600" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
                {aboutData.companyStory.badge}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              {aboutData.companyStory.title}
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-[1.0625rem]">
              {aboutData.companyStory.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* divider */}
          <div className="hidden lg:block bg-slate-100 mx-0" />

          {/* right */}
          <div className="lg:pl-20 space-y-6 pt-12 lg:pt-0">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400">What sets us apart</p>
            <div className="space-y-0 divide-y divide-slate-100">
              {[
                {
                  icon: LucideIcons.BadgeCheck,
                  title: "Tier-III Aligned Designs",
                  desc: "Every data center and network environment is engineered to meet the highest reliability benchmarks.",
                },
                {
                  icon: LucideIcons.Clock,
                  title: "24/7 Support SLAs",
                  desc: "Round-the-clock monitoring, response, and escalation paths — not just a helpdesk number.",
                },
                {
                  icon: LucideIcons.Shield,
                  title: "Security-First Delivery",
                  desc: "Physical and logical security integrated at the architecture phase, not bolted on after.",
                },
                {
                  icon: LucideIcons.Rocket,
                  title: "Rapid Rollout Playbooks",
                  desc: "Documented, repeatable deployment processes that cut go-live risk and commissioning time.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-5 py-6 group">
                  <div className="mt-0.5 flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">{title}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MISSION & VISION ─────────────────────────────────── */}
      <section className="py-28 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-blue-500" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400">Purpose</span>
              <div className="h-px w-8 bg-blue-500" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
              Why we exist — and where we&apos;re headed
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: "Mission", item: aboutData.mission, Icon: MissionIcon, accent: "from-blue-600 to-blue-700" },
              { label: "Vision", item: aboutData.vision, Icon: VisionIcon, accent: "from-indigo-600 to-violet-700" },
            ].map(({ label, item, Icon, accent }) => (
              <div key={label} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-10 group hover:border-white/20 transition-colors duration-300">
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />
                <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${accent} flex items-center justify-center text-white mb-8 shadow-lg`}>
                  <Icon className="w-7 h-7" />
                </div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400 mb-3">{label}</p>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CORE VALUES ──────────────────────────────────────── */}
      <section className="py-28 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-blue-600" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">Core Values</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              How we operate every day
            </h2>
            <p className="text-slate-500 mt-4 leading-relaxed">
              Principles that shape every engagement, every deployment, and every relationship.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {aboutData.coreValues.map((value, index) => {
              const ValueIcon = getIcon(value.icon, LucideIcons.Star);
              return (
                <div
                  key={value._id || index}
                  className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/8 transition-all duration-300"
                >
                  {/* number */}
                  <div className="absolute top-8 right-8 text-4xl font-black text-slate-100 group-hover:text-blue-50 transition-colors select-none leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="relative space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-110 transition-transform duration-300">
                      <ValueIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{value.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-blue-600" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">Our Team</span>
              <div className="h-px w-8 bg-blue-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight max-w-2xl">
              People who ship reliability
            </h2>
            <p className="text-slate-500 mt-4 max-w-xl leading-relaxed">
              Certified specialists and disciplined operators focused on uptime and accountability.
            </p>
          </div>

          {/* Leadership */}
          {aboutData.teamMembers.filter((m) => m.isLeadership).length > 0 && (
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-10">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400">Leadership</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {aboutData.teamMembers
                  .filter((m) => m.isLeadership)
                  .sort((a, b) => a.order - b.order)
                  .map((member, index) => (
                    <div key={member._id || index} className="group relative bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/8 transition-all duration-300">
                      <div className="absolute top-6 right-6">
                        <span className="text-xs font-bold tracking-widest uppercase px-2 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600">
                          Leadership
                        </span>
                      </div>
                      <div className="flex items-center gap-5 mb-5">
                        <div className="relative flex-shrink-0">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-white shadow-md group-hover:ring-blue-100 transition-all duration-300">
                            {member.image ? (
                              <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            ) : (
                              <div className="w-full h-full bg-blue-600 flex items-center justify-center text-xl font-bold text-white">
                                {member.name.slice(0, 1)}
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                          <p className="text-sm font-semibold text-blue-600">{member.role}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{member.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Delivery Teams */}
          {aboutData.teamMembers.filter((m) => !m.isLeadership).length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-10">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400">Delivery Teams</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {aboutData.teamMembers
                  .filter((m) => !m.isLeadership)
                  .sort((a, b) => a.order - b.order)
                  .map((member, index) => (
                    <div key={member._id || index} className="group flex gap-4 p-6 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden ring-2 ring-white shadow-sm">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-200 flex items-center justify-center text-base font-bold text-slate-600">
                            {member.name.slice(0, 1)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{member.name}</h3>
                        <p className="text-xs font-semibold text-blue-600 mb-2">{member.role}</p>
                        <p className="text-sm text-slate-500 leading-relaxed">{member.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-slate-950">
        <div className="relative max-w-5xl mx-auto overflow-hidden rounded-3xl border border-white/10">
          {/* bg glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.3),transparent)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/60 to-transparent" />

          <div className="relative px-10 md:px-16 py-16 md:py-20 grid md:grid-cols-[1.4fr_1fr] gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-blue-500" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400">Get in touch</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
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

            {/* right panel */}
            <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="space-y-5">
                {[
                  { icon: LucideIcons.Radio, text: "24/7 on-call reliability" },
                  { icon: LucideIcons.FileText, text: "Documented change control" },
                  { icon: LucideIcons.BarChart3, text: "Transparent reporting" },
                  { icon: LucideIcons.MessageCircle, text: "Direct access to delivery leads" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-white/80">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
