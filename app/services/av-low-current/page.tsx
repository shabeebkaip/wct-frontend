"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Monitor,
  Tv,
  Speaker,
  Mic,
  Video,
  FileText,
  ClipboardList,
  Wrench,
  Map,
  Layers,
  Volume2,
  Radio,
  Phone,
  Bell,
  Wifi,
  Building2,
  Hospital,
  Warehouse,
  Hotel,
  GraduationCap,
  ShoppingBag,
  Cable,
  Zap,
} from "lucide-react";

/* ─── Service categories ─── */
const serviceCategories = [
  {
    category: "Audiovisual Systems",
    icon: Monitor,
    color: "blue",
    description: "From boardroom displays to large-format video walls and presentation systems — we design, install, and commission AV systems that work reliably every time.",
    systems: [
      {
        name: "Digital Signage",
        description: "Commercial-grade displays, video walls, and content management systems. Static, dynamic, and interactive signage for lobbies, retail, hospitality, and campus environments.",
      },
      {
        name: "Boardroom & Meeting Room AV",
        description:
          "Display, sound, and video conferencing systems for meeting rooms. Teams and Zoom Rooms integration. PTZ cameras, ceiling microphone arrays, and control system programming.",
      },
      {
        name: "Presentation & Lecture Systems",
        description:
          "Projectors, large-format displays, and distribution systems for training rooms, lecture theatres, and town hall spaces. HDMI/HDBaseT distribution and source switching.",
      },
      {
        name: "Video Walls",
        description:
          "Multi-display video wall systems for control rooms, reception areas, and feature displays. LED and LCD tile options. Video wall controllers with multi-source display.",
      },
    ],
  },
  {
    category: "Sound & PA Systems",
    icon: Volume2,
    color: "indigo",
    description: "Background music, public address, and voice evacuation — we install audio systems designed for intelligibility, coverage uniformity, and BS EN 54 compliance where required.",
    systems: [
      {
        name: "Background Music (BGM)",
        description:
          "Zoned background music systems for retail, hospitality, and commercial environments. Ceiling speaker installation, zone amplifiers, and source management. Multi-zone independent volume control.",
      },
      {
        name: "Public Address (PA)",
        description:
          "PA systems for tannoy announcements across large sites. Ceiling, wall, and column speakers. Integration with intercom, access control, and fire alarm systems where required.",
      },
      {
        name: "Voice Alarm / PAVA",
        description:
          "BS EN 54-16 compliant voice alarm systems for commercial and public buildings. Integrated with fire detection panels. Zoned evacuation messaging with priority override.",
      },
      {
        name: "Conference & Conferencing Audio",
        description:
          "Room acoustic treatment, ceiling microphone arrays, and AEC (acoustic echo cancellation) DSP for hybrid meeting rooms. Speech intelligibility optimised for video conferencing.",
      },
    ],
  },
  {
    category: "Low Current Systems",
    icon: Zap,
    color: "violet",
    description: "Nurse call, doorbell and intercom, master antenna TV, and IP telephony cabling — the full spectrum of low current building services.",
    systems: [
      {
        name: "Nurse Call Systems",
        description:
          "Wandsworth, ARM, and Intercall nurse call systems for healthcare and care home environments. Pendant, pull-cord, and bed-head unit installation. Staff display and alarm integration.",
      },
      {
        name: "IPTV & MATV",
        description:
          "Master antenna TV (MATV) and IP television distribution for hotels, hospitals, student accommodation, and residential developments. Headend equipment, coax distribution, and IPTV middleware.",
      },
      {
        name: "Door Entry & Intercom",
        description:
          "Audio and video door entry systems for offices, residential blocks, and gated developments. IP-based intercom integration with access control and mobile app unlock.",
      },
      {
        name: "IP Telephony & Data",
        description:
          "SIP handset installation, PoE cabling, and IDF/MDF patching for IP telephony systems. VoIP quality of service (QoS) configuration on the network switch infrastructure.",
      },
    ],
  },
];

/* ─── Full scope ─── */
const scopeItems = [
  {
    icon: ClipboardList,
    title: "Requirements & Brief",
    detail:
      "Room function, occupancy, source types, and control requirements captured before design. User stories documented — what each space needs to do determines what goes in it.",
  },
  {
    icon: Map,
    title: "AV System Design",
    detail:
      "Signal flow diagrams, equipment schedules, and rack layouts produced for every AV system. Speaker coverage modelling for PA and BGM systems. Everything specified before cable is pulled.",
  },
  {
    icon: Cable,
    title: "Cabling Installation",
    detail:
      "HDMI, HDBaseT, Cat 6, speaker cable, microphone cable, and control cable installed by our team. Correctly supported, dressed, and labelled. No cable ties around power runs.",
  },
  {
    icon: Monitor,
    title: "Display & Equipment Installation",
    detail:
      "Screens, projectors, mounts, and rack equipment installed to IPAF and manufacturer standards. Correct wall-type fixings, structural assessment for video walls, and projector geometry correction.",
  },
  {
    icon: Volume2,
    title: "Speaker Installation & Coverage",
    detail:
      "Ceiling, wall, and column speaker installation positioned per the coverage model. Back-box installation to maintain fire rating on ceiling grid. Correct impedance calculation and tapping.",
  },
  {
    icon: Layers,
    title: "System Commissioning",
    detail:
      "Every AV and audio system commissioned to the design specification. DSP programming, amplifier level-setting, and display calibration. No handover until the system works as designed.",
  },
  {
    icon: Mic,
    title: "Control System Programming",
    detail:
      "AMX, Crestron, or manufacturer control system programmed for simple, reliable operation. Touch panel UI designed around actual user workflows — not generic templates.",
  },
  {
    icon: FileText,
    title: "Handover, Training & Documentation",
    detail:
      "As-built drawings, equipment register, maintenance schedules, and user guides delivered at handover. On-site training for end-users and facilities teams included as standard.",
  },
];

/* ─── Environments ─── */
const environments = [
  {
    icon: Building2,
    title: "Corporate Offices",
    description:
      "Boardroom and meeting room AV for video conferencing, presentation, and collaboration. Digital signage for lobbies and breakout areas. BGM and PA for large office environments.",
    items: [
      "Teams / Zoom Room systems",
      "Boardroom display and audio",
      "Lobby and reception digital signage",
      "Office BGM and PA systems",
    ],
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Classroom AV, interactive display, and lecture theatre presentation systems. PA and voice alarm for campus-wide announcements. Student accommodation IPTV and digital signage.",
    items: [
      "Classroom interactive displays",
      "Lecture theatre AV systems",
      "Campus PA and voice alarm",
      "Student accommodation IPTV",
    ],
  },
  {
    icon: Hospital,
    title: "Healthcare",
    description:
      "Nurse call systems for wards and care homes. Patient entertainment and IPTV. Staff communication systems. PA and PAVA for clinical environments with infection-control installation.",
    items: [
      "Nurse call system installation",
      "Patient entertainment and IPTV",
      "Staff PA and communication",
      "PAVA voice alarm systems",
    ],
  },
  {
    icon: Hotel,
    title: "Hospitality",
    description:
      "Hotel IPTV and guest room entertainment. BGM and PA for public areas, restaurants, and event spaces. Digital signage for wayfinding, menus, and event listings. Banqueting AV.",
    items: [
      "Guest room IPTV and entertainment",
      "Restaurant and bar BGM",
      "Banqueting and events AV",
      "Lobby and wayfinding digital signage",
    ],
  },
  {
    icon: ShoppingBag,
    title: "Retail",
    description:
      "Retail background music with zoned volume control. Promotional digital signage with content management. PA for customer announcements. Loss-prevention integration with AV control.",
    items: [
      "Zoned background music systems",
      "Promotional digital signage",
      "Customer PA systems",
      "Display window video content",
    ],
  },
  {
    icon: Warehouse,
    title: "Industrial & Logistics",
    description:
      "Factory PA systems for production floor announcements. Staff welfare area AV and BGM. Control room video wall systems. Safety and alarm audio integration with PA infrastructure.",
    items: [
      "Factory floor PA systems",
      "Control room video walls",
      "Staff welfare area AV",
      "Safety announcement integration",
    ],
  },
];

/* ─── Why WCT ─── */
const whyWCT = [
  {
    icon: Monitor,
    title: "Design Before Installation",
    description:
      "Signal flow diagrams and speaker coverage models produced before a single cable is pulled. What you get matches what was designed — no on-site compromises.",
  },
  {
    icon: Layers,
    title: "Properly Commissioned",
    description:
      "Every system fully commissioned — DSP programmed, levels set, displays calibrated. We don't hand over until the system works exactly as designed.",
  },
  {
    icon: Cable,
    title: "Integrated with Your Infrastructure",
    description:
      "AV over Cat 6, PoE speakers, IP intercom on your network infrastructure. We coordinate with your structured cabling team — or we are your structured cabling team.",
  },
  {
    icon: FileText,
    title: "Full Handover Pack",
    description:
      "As-built drawings, equipment register, control system backup files, and on-site user training — all delivered at handover as standard.",
  },
];

/* ─── Color map ─── */
const colorMap: Record<string, { border: string; bg: string; iconBg: string; iconText: string; tabBg: string }> = {
  blue: { border: "border-blue-100", bg: "bg-blue-50/40", iconBg: "bg-blue-600", iconText: "text-white", tabBg: "bg-blue-600" },
  indigo: { border: "border-indigo-100", bg: "bg-indigo-50/40", iconBg: "bg-indigo-600", iconText: "text-white", tabBg: "bg-indigo-600" },
  violet: { border: "border-violet-100", bg: "bg-violet-50/40", iconBg: "bg-violet-600", iconText: "text-white", tabBg: "bg-violet-600" },
};

export default function AVLowCurrentPage() {
  const [activeEnv, setActiveEnv] = useState(0);

  return (
    <main className="min-h-screen" style={{ fontFamily: "var(--font-montserrat, Montserrat, sans-serif)" }}>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: "#080C14" }}>
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(37,99,235,0.13) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-40 lg:py-48">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-px bg-blue-500" />
              <span className="text-blue-400 uppercase tracking-[0.35em] text-[10px]" style={{ fontFamily: "monospace" }}>
                Services · AV & Low Current
              </span>
            </div>

            <h1
              className="font-black tracking-tighter text-white leading-[0.88] mb-10"
              style={{ fontSize: "clamp(3.2rem, 9vw, 8.5rem)" }}
            >
              AV & Low
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.22)" }}>
                Current
              </span>
              <br />
              <span className="text-blue-400">Systems.</span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mb-6">
              Audiovisual, sound systems, digital signage, nurse call, IPTV, and
              door entry — designed, installed, and commissioned by one team.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xl mb-14">
              AV · PA · BGM · PAVA · Digital Signage · Nurse Call · IPTV · Intercom
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?service=AV+%26+Low+Current+Systems"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact?service=AV+%26+Low+Current+Systems"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 font-semibold transition-all duration-300"
              >
                Free Site Consultation
              </Link>
            </div>

            <div className="mt-20 pt-10 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { value: "AV + PA + BGM", label: "Audio visual" },
                { value: "PAVA compliant", label: "Voice alarm" },
                { value: "Nurse call + IPTV", label: "Low current" },
                { value: "Full handover", label: "Training included" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-black tracking-tighter text-white" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.7rem)" }}>
                    {s.value}
                  </p>
                  <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mt-1" style={{ fontFamily: "monospace" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICE CATEGORIES
      ══════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-6 h-px bg-blue-600" />
            <span className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium" style={{ fontFamily: "monospace" }}>
              What We Install
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 mb-14">
            <h2 className="font-black tracking-tighter text-slate-900" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              Three Disciplines.
              <br />
              One Installation Team.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed self-end">
              Audiovisual, sound systems, and low current — coordinated by the
              same team, using the same cabling infrastructure, delivering a
              cleaner, more integrated result than multiple sub-contractors.
            </p>
          </div>

          <div className="space-y-14">
            {serviceCategories.map((cat) => {
              const CatIcon = cat.icon;
              const col = colorMap[cat.color];
              return (
                <div key={cat.category}>
                  <div className="flex items-start gap-4 mb-7 pb-5 border-b border-slate-100">
                    <div className={`w-10 h-10 rounded-xl ${col.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                      <CatIcon className={`w-5 h-5 ${col.iconText}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{cat.category}</h3>
                      <p className="text-slate-500 text-sm mt-1 leading-relaxed">{cat.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {cat.systems.map((s) => (
                      <div
                        key={s.name}
                        className={`rounded-2xl border ${col.border} ${col.bg} p-5 hover:shadow-md transition-all duration-300`}
                      >
                        <h4 className="font-bold text-slate-900 text-sm mb-2">{s.name}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{s.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FULL SCOPE
      ══════════════════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "#F4F3EF" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-6 h-px bg-blue-600" />
            <span className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium" style={{ fontFamily: "monospace" }}>
              Scope of Work
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 mb-14">
            <h2 className="font-black tracking-tighter text-slate-900" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              From Brief to
              <br />
              Commissioned System.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed self-end">
              Every AV and low current engagement covers the full process — from
              requirements capture and system design through to installation,
              commissioning, and user training.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scopeItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 p-6 group flex gap-5"
                >
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-semibold text-slate-400 tabular-nums" style={{ fontFamily: "monospace" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ENVIRONMENTS
      ══════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: "#080C14" }}>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(37,99,235,0.11) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-6 h-px bg-blue-500" />
            <span className="text-blue-400 uppercase tracking-[0.35em] text-[10px]" style={{ fontFamily: "monospace" }}>
              Environments
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <h2 className="font-black tracking-tighter text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              Every Space.
              <br />
              <span className="text-blue-400">Properly Equipped.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed self-end">
              From healthcare nurse call to hotel IPTV, and from retail BGM to
              corporate video conferencing — we understand the requirements of
              each environment and specify accordingly.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {environments.map((env, i) => {
              const Icon = env.icon;
              return (
                <button
                  key={env.title}
                  onClick={() => setActiveEnv(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    activeEnv === i
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-white/10 text-white/50 hover:text-white/80 hover:border-white/20"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {env.title}
                </button>
              );
            })}
          </div>

          {environments.map((env, i) => {
            const Icon = env.icon;
            if (i !== activeEnv) return null;
            return (
              <div key={env.title} className="grid lg:grid-cols-2 gap-8">
                <div className="rounded-2xl border border-blue-500/20 bg-blue-600/5 p-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-black tracking-tighter text-white mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                    {env.title}
                  </h3>
                  <p className="text-slate-400 text-base leading-relaxed">{env.description}</p>
                </div>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500 mb-5" style={{ fontFamily: "monospace" }}>
                    What we install in this environment
                  </p>
                  <div className="space-y-4">
                    {env.items.map((item) => (
                      <div key={item} className="flex items-center gap-4 pb-4 border-b border-white/[0.05] last:border-0 last:pb-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span className="text-white/80 text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY WCT
      ══════════════════════════════════════ */}
      <section className="py-24 lg:py-28" style={{ backgroundColor: "#F4F3EF" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-6 h-px bg-blue-600" />
                <span className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium" style={{ fontFamily: "monospace" }}>
                  Why WCT
                </span>
              </div>
              <h2 className="font-black tracking-tighter text-slate-900 mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}>
                AV That Works
                <br />
                <span className="text-blue-600">On Day One.</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                AV systems that aren't commissioned properly fail in the first
                meeting. We design, install, and commission every system ourselves
                — and we don't leave until it works.
              </p>
              <Link
                href="/contact?service=AV+%26+Low+Current+Systems"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 group"
              >
                Talk to Our Team
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyWCT.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "#080C14" }}>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-6 h-px bg-blue-500" />
              <span className="text-blue-400 uppercase tracking-[0.35em] text-[10px]" style={{ fontFamily: "monospace" }}>
                Start Your Project
              </span>
              <div className="w-6 h-px bg-blue-500" />
            </div>
            <h2 className="font-black tracking-tighter text-white mb-6" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>
              Spaces That Work.
              <br />
              <span className="text-blue-400">Systems That Last.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-12 max-w-xl mx-auto">
              Tell us what the space needs to do. We'll scope the right systems,
              design the installation, and deliver a fixed-price proposal —
              with commissioning and training included as standard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?service=AV+%26+Low+Current+Systems"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
              >
                Request a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact?service=AV+%26+Low+Current+Systems"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 font-semibold transition-all duration-300"
              >
                Free Site Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
