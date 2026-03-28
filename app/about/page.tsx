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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-700">
        Unable to load about page content.
      </div>
    );
  }

  const MissionIcon = getIcon(aboutData.mission.icon, LucideIcons.Flag);
  const VisionIcon = getIcon(aboutData.vision.icon, LucideIcons.Eye);

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-slate-50 to-blue-50 text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.08),transparent_32%),radial-gradient(circle_at_50%_80%,rgba(56,189,248,0.10),transparent_38%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-size-[72px_72px] opacity-60" />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-40 pb-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-sm text-blue-700 shadow-sm">
              <LucideIcons.Building2 className="w-4 h-4" />
              <span>{aboutData.hero.badge}</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-slate-900">
                {aboutData.hero.title}
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                {aboutData.hero.description}
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-linear-to-br from-blue-200/60 via-indigo-200/40 to-cyan-200/40 blur-3xl" />
            <div className="relative rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.08),transparent_40%)]" />

              <div className="relative p-8 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-xs font-semibold text-blue-700 shadow-sm">
                  <LucideIcons.ShieldCheck className="w-4 h-4" />
                  <span>Trusted Delivery</span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold text-slate-900">Proof over promises</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Disciplined execution, certified engineers, and uptime-first design across critical infrastructure. No vanity numbers; just capability and track record.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-slate-700">
                  <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100/80 border border-slate-200">
                    <LucideIcons.BadgeCheck className="w-4 h-4 text-blue-600" />
                    Tier-III aligned designs
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100/80 border border-slate-200">
                    <LucideIcons.Clock4 className="w-4 h-4 text-blue-600" />
                    24/7 support SLAs
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100/80 border border-slate-200">
                    <LucideIcons.Shield className="w-4 h-4 text-blue-600" />
                    Security-first delivery
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    We architect and support environments where downtime is not an option. Our team leads with process, documentation, and accountability to keep you online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="relative pt-10 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-sm text-blue-700 shadow-sm">
              <LucideIcons.Sparkles className="w-4 h-4" />
              <span>{aboutData.companyStory.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
              {aboutData.companyStory.title}
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              {aboutData.companyStory.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-blue-700">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                <LucideIcons.Bolt className="w-4 h-4" />
                Rapid rollout
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                <LucideIcons.Server className="w-4 h-4" />
                Data center expertise
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                <LucideIcons.Headset className="w-4 h-4" />
                24/7 response
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-blue-200/40 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-2xl bg-linear-to-br from-white via-blue-50 to-blue-100 p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.10),transparent_42%)]" />
              <div className="relative space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-blue-100 text-sm text-blue-700 shadow-sm">
                  <LucideIcons.Sparkles className="w-4 h-4" />
                  <span>Delivery you can see</span>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">Built for uptime</h3>
                <p className="text-slate-600 leading-relaxed">
                  Engineered rollouts, documented change control, and SLAs that keep critical environments online without relying on vanity numbers or logos.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-700">
                  <div className="flex items-center gap-2 rounded-2xl bg-white/80 border border-slate-200 px-4 py-3">
                    <LucideIcons.BadgeCheck className="w-4 h-4 text-blue-600" />
                    Tier-III aligned designs
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-white/80 border border-slate-200 px-4 py-3">
                    <LucideIcons.Clock4 className="w-4 h-4 text-blue-600" />
                    24/7 support SLAs
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-white/80 border border-slate-200 px-4 py-3">
                    <LucideIcons.Shield className="w-4 h-4 text-blue-600" />
                    Security-first delivery
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-white/80 border border-slate-200 px-4 py-3">
                    <LucideIcons.Rocket className="w-4 h-4 text-blue-600" />
                    Rapid rollout playbooks
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="relative py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {[{
            label: "Mission",
            item: aboutData.mission,
            Icon: MissionIcon,
          }, {
            label: "Vision",
            item: aboutData.vision,
            Icon: VisionIcon,
          }].map(({ label, item, Icon }) => (
            <div
              key={label}
              className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl p-8 shadow-lg"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_50%)]" />
              <div className="relative space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-sm text-blue-700">
                  <Icon className="w-4 h-4" />
                  <span className="font-semibold">{label}</span>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-sm text-blue-700 shadow-sm mb-4">
              <LucideIcons.HeartHandshake className="w-4 h-4" />
              <span>Core Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">How we operate</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mt-3">
              Principles that shape our partnerships and delivery approach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutData.coreValues.map((value, index) => {
              const ValueIcon = getIcon(value.icon, LucideIcons.Star);
              return (
                <div
                  key={value._id || index}
                  className="group relative p-6 rounded-2xl bg-white border border-slate-200 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  <div className="relative space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700">
                      <ValueIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">{value.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-sm text-blue-700 shadow-sm mb-4">
              <LucideIcons.Users className="w-4 h-4" />
              <span>Our Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">People who ship reliability</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mt-3">
              Certified specialists and disciplined operators focused on uptime and accountability.
            </p>
          </div>

          <div className="space-y-16">
            <div>
              <div className="flex items-center justify-center gap-2 mb-10 text-sm font-semibold text-blue-700 uppercase tracking-wider">
                <div className="h-px w-10 bg-linear-to-r from-transparent to-blue-300" />
                Leadership
                <div className="h-px w-10 bg-linear-to-l from-transparent to-blue-300" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {aboutData.teamMembers
                  .filter((member) => member.isLeadership)
                  .sort((a, b) => a.order - b.order)
                  .map((member, index) => (
                    <div key={member._id || index} className="group flex flex-col items-center text-center">
                      <div className="relative mb-4">
                        <div className="absolute -inset-1 rounded-full bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                        <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-white shadow-xl group-hover:scale-105 transition-transform duration-300">
                          {member.image ? (
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover"
                              sizes="112px"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-xl font-semibold text-slate-600">
                              {member.name.slice(0, 1)}
                            </div>
                          )}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
                      <p className="text-sm text-blue-700 font-semibold">{member.role}</p>
                      <p className="text-sm text-slate-600 mt-3 leading-relaxed max-w-sm">{member.description}</p>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 mb-10 text-sm font-semibold text-slate-700 uppercase tracking-wider">
                <div className="h-px w-10 bg-linear-to-r from-transparent to-slate-300" />
                Delivery Teams
                <div className="h-px w-10 bg-linear-to-l from-transparent to-slate-300" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {aboutData.teamMembers
                  .filter((member) => !member.isLeadership)
                  .sort((a, b) => a.order - b.order)
                  .map((member, index) => (
                    <div key={member._id || index} className="group flex flex-col items-center text-center">
                      <div className="relative mb-4">
                        <div className="absolute -inset-1 rounded-full bg-linear-to-r from-slate-400 via-slate-300 to-slate-200 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                        <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                          {member.image ? (
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover"
                              sizes="96px"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-lg font-semibold text-slate-600">
                              {member.name.slice(0, 1)}
                            </div>
                          )}
                        </div>
                      </div>
                      <h3 className="text-base font-semibold text-slate-900">{member.name}</h3>
                      <p className="text-sm text-blue-700 font-semibold">{member.role}</p>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-xs">{member.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}§
      <section className="relative pb-24 px-6">
        <div className="max-w-5xl mx-auto overflow-hidden rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-xl shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.10),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.10),transparent_30%)]" />
          <div className="relative px-8 md:px-12 py-12 md:py-14 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-900">{aboutData.cta.title}</h3>
              <p className="text-slate-600 max-w-2xl">{aboutData.cta.description}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={aboutData.cta.primaryButton.link}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30 transition-transform duration-200 hover:scale-[1.02]"
                >
                  {aboutData.cta.primaryButton.text}
                </Link>
                <Link
                  href={aboutData.cta.secondaryButton.link}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-blue-200 text-blue-700 bg-white/80 hover:bg-white transition-colors duration-200"
                >
                  {aboutData.cta.secondaryButton.text}
                </Link>
              </div>
            </div>
            <div className="relative p-6 rounded-2xl bg-slate-900 text-white overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.25),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.18),transparent_42%)]" />
              <div className="relative space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs uppercase tracking-wide">
                  <LucideIcons.Radio className="w-4 h-4" />
                  On-call reliability
                </div>
                <p className="text-lg leading-relaxed">
                  We design, implement, and sustain critical environments with 24/7 coverage, documented change control, and transparent reporting.
                </p>gi
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <LucideIcons.MessageCircle className="w-4 h-4" />
                  Talk with our delivery leads today.
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
