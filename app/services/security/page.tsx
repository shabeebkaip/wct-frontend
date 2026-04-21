"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Camera,
  Shield,
  Lock,
  Eye,
  Server,
  FileText,
  ClipboardList,
  Wrench,
  Map,
  Layers,
  MonitorPlay,
  KeySquare,
  ScanLine,
  FileCheck,
  Building2,
  Hospital,
  Warehouse,
  Hotel,
  GraduationCap,
  ShoppingBag,
  Wifi,
} from "lucide-react";

/* ─── System types ─── */
const systemTypes = [
  {
    category: "CCTV & Video Surveillance",
    icon: Camera,
    color: "blue",
    systems: [
      {
        name: "IP Camera Systems",
        description:
          "Full HD and 4K IP cameras over structured cabling. Fixed, PTZ, fisheye, and multi-sensor options. PoE-powered, ONVIF-compliant, and fully integrated with your NVR.",
      },
      {
        name: "Network Video Recorders (NVR)",
        description:
          "Rackmounted NVR with local storage and RAID. Remote access, motion-triggered recording, and configurable retention policies. Scalable from 4 to 128+ channels.",
      },
      {
        name: "Video Management Software (VMS)",
        description:
          "Enterprise VMS platforms for multi-site video management, intelligent search, and analytics. Live view, playback, and incident export from any device.",
      },
      {
        name: "Analogue HD Upgrade",
        description:
          "Retain existing coax infrastructure while upgrading cameras to HD resolution using AHD, TVI, or CVI technology. Significant cost saving over full IP migration.",
      },
    ],
  },
  {
    category: "Access Control",
    icon: Lock,
    color: "indigo",
    systems: [
      {
        name: "Door Access Controllers",
        description:
          "IP-based access controllers for single and multi-door installations. Credential management, time-zone scheduling, anti-passback, and full audit trail of every entry event.",
      },
      {
        name: "Card & Fob Readers",
        description:
          "MIFARE, DESFire, and proximity card readers. Surface-mount and mullion formats. Vandal-resistant stainless steel for external and high-traffic doors.",
      },
      {
        name: "Biometric Authentication",
        description:
          "Fingerprint and facial recognition readers for high-security areas. Eliminate card sharing and buddy-punching. Integrated with access control software for centralised management.",
      },
      {
        name: "Electric Locks & Strikes",
        description:
          "Fail-safe and fail-secure electric strikes, magnetic locks, and mortice bolts. Sized and specified for the door type and security requirement, with proper suppression and monitoring.",
      },
    ],
  },
];

/* ─── Full scope ─── */
const scopeItems = [
  {
    icon: ClipboardList,
    title: "Security Needs Assessment",
    detail:
      "Entry points, vulnerable areas, camera coverage zones, and access control requirements assessed on-site. Risk areas prioritised and documented before design begins.",
  },
  {
    icon: Map,
    title: "System Design & Camera Layout",
    detail:
      "Camera coverage plans produced for every floor and external area. Lens selection, mounting height, angle, and field of view calculated to eliminate blind spots.",
  },
  {
    icon: Layers,
    title: "Access Control Architecture",
    detail:
      "Door schedule produced listing every controlled door, credential type, lock type, and controller. Cabling design and power budget included.",
  },
  {
    icon: Wrench,
    title: "Cabling Installation",
    detail:
      "Cat 6 for IP cameras and access control, coax where analogue systems are retained. All cabling correctly supported, labelled, and tested. PoE switch ports and power supply sizing confirmed.",
  },
  {
    icon: Camera,
    title: "Camera Installation & Alignment",
    detail:
      "Cameras installed at designed positions. Every camera aligned, focused, and configured. Coverage verified on-screen before the engineer leaves site.",
  },
  {
    icon: Lock,
    title: "Access Control Hardware Installation",
    detail:
      "Readers, controllers, locks, and door contacts installed by our team. Door hardware fitted correctly — we check door alignment, lock force, and request-to-exit coverage on every door.",
  },
  {
    icon: Server,
    title: "NVR / Head-End Configuration",
    detail:
      "NVR configured with camera names, recording schedules, retention settings, and motion detection zones. Remote access configured securely. Tested fully before handover.",
  },
  {
    icon: KeySquare,
    title: "Access Control Software Setup",
    detail:
      "Access control database built — users, credentials, time zones, and access levels configured. Audit trail verified. Enrolment of initial credential set completed at handover.",
  },
  {
    icon: ScanLine,
    title: "System Integration",
    detail:
      "CCTV and access control integrated where required — door-forced events triggered camera pop-up, or access events time-stamped against video footage for rapid incident review.",
  },
  {
    icon: FileCheck,
    title: "Handover & Training",
    detail:
      "Documented as-built drawings, camera coverage plans, access control door schedule, equipment register, and user manuals delivered. On-site operator training for NVR and access control software.",
  },
];

/* ─── Environments ─── */
const environments = [
  {
    icon: Building2,
    title: "Commercial Offices",
    description:
      "Reception, lobby, server room, and car park CCTV. Front-door and internal access control with time-zone scheduling and visitor management integration. Remote access for facilities management.",
    items: [
      "Reception and lobby CCTV",
      "Server room access control",
      "Car park and perimeter cameras",
      "Visitor management integration",
    ],
  },
  {
    icon: Warehouse,
    title: "Warehouses & Logistics",
    description:
      "Loading bay, perimeter, and internal aisle CCTV. Yard cameras with wide-angle coverage. Access control on office-to-warehouse doors and secure areas. Integration with gate control and ANPR.",
    items: [
      "Loading bay and yard cameras",
      "Internal aisle and racking CCTV",
      "Office-to-warehouse access control",
      "Perimeter and gate security",
    ],
  },
  {
    icon: Hospital,
    title: "Healthcare",
    description:
      "Clinical area CCTV for incident management and staff safety. Access control on pharmacy, controlled drug areas, and server rooms. Patient area coverage with appropriate privacy masking.",
    items: [
      "Pharmacy and controlled drug access control",
      "Staff-only area access management",
      "Patient area cameras with privacy masking",
      "Incident management camera coverage",
    ],
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Campus perimeter and internal CCTV. Access control on main entrances, IT suites, and staff-only areas. Integration with visitor management systems and DBS-compliant access policies.",
    items: [
      "Campus perimeter CCTV coverage",
      "Main entrance access control",
      "IT suite and staff area access",
      "Visitor management integration",
    ],
  },
  {
    icon: Hotel,
    title: "Hospitality",
    description:
      "Hotel entrance, lobby, car park, and back-of-house CCTV. Electronic room access with key card management. Staff-only area access control. Integration with PMS for room-based access management.",
    items: [
      "Lobby and entrance CCTV",
      "Car park and perimeter cameras",
      "Staff-only area access control",
      "PMS-integrated room key management",
    ],
  },
  {
    icon: ShoppingBag,
    title: "Retail",
    description:
      "Store floor, stockroom, and till area CCTV. Access control on stockroom and cash office. Loss prevention camera placement designed to eliminate blind spots and support EAS integration.",
    items: [
      "Store floor and till area CCTV",
      "Stockroom and cash office access control",
      "Loss prevention camera layout",
      "EAS and alarm panel integration",
    ],
  },
];

/* ─── Why WCT ─── */
const whyWCT = [
  {
    icon: Eye,
    title: "No Blind Spots",
    description:
      "Camera coverage is designed, not guessed. We produce coverage plans before installation and verify on-screen after — every camera aligned and every zone covered.",
  },
  {
    icon: Lock,
    title: "Properly Specified Hardware",
    description:
      "The right lock type, credential standard, and controller architecture for each door and site type. We don't fit one product to every situation.",
  },
  {
    icon: Wifi,
    title: "Integrated Systems",
    description:
      "CCTV and access control integrated where it adds value — door-forced events that trigger camera pop-up, and access events stamped against video for rapid incident review.",
  },
  {
    icon: FileText,
    title: "Complete Handover",
    description:
      "As-built drawings, equipment register, camera schedules, access control database, and on-site operator training — all included as standard, not an extra.",
  },
];

/* ─── Color map ─── */
const colorMap: Record<string, { border: string; bg: string; iconBg: string; iconText: string }> = {
  blue: { border: "border-blue-100", bg: "bg-blue-50/40", iconBg: "bg-blue-600", iconText: "text-white" },
  indigo: { border: "border-indigo-100", bg: "bg-indigo-50/40", iconBg: "bg-indigo-600", iconText: "text-white" },
};

export default function SecurityPage() {
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
                Services · Security
              </span>
            </div>

            <h1
              className="font-black tracking-tighter text-white leading-[0.88] mb-10"
              style={{ fontSize: "clamp(3.2rem, 9vw, 8.5rem)" }}
            >
              Security
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.22)" }}>
                Systems.
              </span>
              <br />
              <span className="text-blue-400">Designed to Protect.</span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mb-6">
              CCTV and access control designed, installed, and commissioned by
              one team — from coverage plan to on-site operator training.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xl mb-14">
              IP Camera Systems · NVR · Access Control · Biometrics · Electric Locks
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?service=Security+Systems"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
              >
                Get a Security Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact?service=Security+Systems"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 font-semibold transition-all duration-300"
              >
                Free Site Assessment
              </Link>
            </div>

            <div className="mt-20 pt-10 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { value: "IP + Analogue HD", label: "Camera systems" },
                { value: "MIFARE + Biometric", label: "Credential types" },
                { value: "Multi-site", label: "Remote management" },
                { value: "Full handover", label: "As-builts + training" },
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
          SYSTEM TYPES
      ══════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-6 h-px bg-blue-600" />
            <span className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium" style={{ fontFamily: "monospace" }}>
              Systems We Install
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 mb-14">
            <h2 className="font-black tracking-tighter text-slate-900" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              CCTV & Access Control.
              <br />
              One Installation Team.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed self-end">
              We install both CCTV and access control systems — meaning a single
              point of contact, coordinated cabling, and integrated systems when
              you need them to talk to each other.
            </p>
          </div>

          <div className="space-y-10">
            {systemTypes.map((cat) => {
              const CatIcon = cat.icon;
              const col = colorMap[cat.color];
              return (
                <div key={cat.category}>
                  <div className={`flex items-center gap-3 mb-6 pb-4 border-b border-slate-100`}>
                    <div className={`w-9 h-9 rounded-xl ${col.iconBg} flex items-center justify-center`}>
                      <CatIcon className={`w-5 h-5 ${col.iconText}`} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">{cat.category}</h3>
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
              From Assessment
              <br />
              to Handover.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed self-end">
              Every security engagement covers the complete process — site
              assessment, design, installation, commissioning, and operator
              training. Nothing is sub-contracted out.
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
              Every Site.
              <br />
              <span className="text-blue-400">Properly Secured.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed self-end">
              From small office access control to multi-site camera systems —
              we understand the security requirements of each environment and
              design accordingly.
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
                Security Systems
                <br />
                <span className="text-blue-600">Done Properly.</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                Security systems fail at the design stage or the installation
                stage. We control both — from coverage plan to commissioned
                hardware — so neither becomes your problem.
              </p>
              <Link
                href="/contact?service=Security+Systems"
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
              Protect What Matters.
              <br />
              <span className="text-blue-400">One Team. End to End.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-12 max-w-xl mx-auto">
              Tell us your site, your concern areas, and your objectives. We'll
              carry out a free site assessment and produce a coverage plan and
              fixed-price proposal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?service=Security+Systems"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
              >
                Request a Free Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact?service=Security+Systems"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 font-semibold transition-all duration-300"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
