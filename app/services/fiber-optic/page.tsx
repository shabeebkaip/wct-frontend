"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Network,
  Cable,
  Layers,
  FileText,
  Ruler,
  ScanLine,
  FileCheck,
  Wrench,
  ClipboardList,
  Activity,
  Eye,
  GitBranch,
  Zap,
  Building2,
  Hospital,
  Warehouse,
  Hotel,
  ShoppingBag,
  GraduationCap,
  Shield,
  Award,
  Server,
} from "lucide-react";

/* ─── Fiber Types ─── */
const fiberTypes = [
  {
    name: "OS1",
    subtitle: "Singlemode · 9/125µm",
    description: "Indoor tight-buffered singlemode fiber for riser and campus inter-floor applications. Low-loss, long-reach performance within buildings.",
    spec: "Up to 2 km",
    specLabel: "Max Reach",
    uses: ["Campus inter-floor links", "Riser backbone runs", "MDF to IDF connections"],
    badge: "Indoor / Tight-Buffered",
    color: "blue",
  },
  {
    name: "OS2",
    subtitle: "Singlemode · 9/125µm",
    description: "Loose-tube outdoor/OSP singlemode fiber engineered for inter-building and underground campus links requiring long reach and environmental resilience.",
    spec: "10 km+",
    specLabel: "Max Reach",
    uses: ["Inter-building links", "Underground campus routes", "Outside plant (OSP)"],
    badge: "Outdoor / Loose-Tube",
    color: "indigo",
  },
  {
    name: "OM3",
    subtitle: "Multimode · 50/125µm",
    description: "Laser-optimised multimode fiber suitable for 10G data centre horizontal and server room link applications at moderate distances.",
    spec: "300 m @ 10G",
    specLabel: "10G Reach",
    uses: ["Data centre horizontal", "Server room links", "10G switch interconnects"],
    badge: "Laser-Optimised MM",
    color: "violet",
  },
  {
    name: "OM4 / OM5",
    subtitle: "Multimode · 50/125µm",
    description: "OM4 delivers 10G to 550 m and 100G to 150 m. OM5 wideband multimode extends to 100G+ via SWDM, ideal for ultra-high-density hyperscale data centres.",
    spec: "550 m @ 10G",
    specLabel: "OM4 10G Reach",
    uses: ["High-speed data centre", "Storage area networks", "Ultra-high-density / hyperscale"],
    badge: "High-Speed MM",
    color: "emerald",
  },
];

/* ─── Connector types ─── */
const connectorTypes = [
  {
    name: "LC",
    full: "Lucent Connector",
    use: "The dominant data centre and enterprise connector. Small form factor, push-pull latch. Used on SFP/SFP+ transceivers, patch panels, and high-density installations.",
  },
  {
    name: "SC",
    full: "Subscriber Connector",
    use: "Square push-pull connector with excellent repeatability. Common in older installations, telco, and outside plant termination. Still widely specified.",
  },
  {
    name: "MPO/MTP",
    full: "Multi-Fibre Push-On",
    use: "Multi-fibre connector carrying 8, 12, or 24 fibres in a single push-fit body. Used in high-density trunk cable systems, pre-terminated backbone, and 40G/100G+ parallel optics.",
  },
  {
    name: "ST",
    full: "Straight Tip",
    use: "Bayonet-style connector used in legacy multimode installations, campus environments, and some industrial applications. Robust, but being replaced by LC/SC in new installs.",
  },
];

/* ─── Full scope of work ─── */
const scopeItems = [
  {
    icon: Ruler,
    title: "Site Survey & Route Planning",
    detail: "Underground routes, riser paths, and duct availability assessed on-site. Every proposed fiber route is walked, measured, and documented before design begins.",
  },
  {
    icon: ClipboardList,
    title: "Fiber Design & Specification",
    detail: "Core count, fiber type, connector selection, and loss budget calculation produced for every link. Design accounts for splices, connectors, bend losses, and future headroom.",
  },
  {
    icon: Cable,
    title: "Cable Installation",
    detail: "Internal installation via trunking and conduit. Underground via duct or direct-burial. Aerial span where required. All routes correctly supported, labelled, and documented.",
  },
  {
    icon: GitBranch,
    title: "Fusion Splicing",
    detail: "Arc-fusion splicing to less than 0.1 dB per splice. Every splice is heat-sleeved and properly housed in a splice tray within a suitable enclosure or termination point.",
  },
  {
    icon: Wrench,
    title: "Mechanical Termination",
    detail: "Field-terminated connectors installed where fusion splicing is not practical — using pre-polished ferrule termination kits for a clean, reliable end-face every time.",
  },
  {
    icon: Eye,
    title: "End-Face Inspection",
    detail: "Every connector end-face cleaned and inspected to IEC 61300-3-35 before testing. Contaminated connectors are the number one cause of fiber link failure — we eliminate that risk.",
  },
  {
    icon: Activity,
    title: "OTDR Testing",
    detail: "Bi-directional OTDR traces captured with the Fluke Networks OptiFiber Pro. Every event — connector, splice, bend — is identified, logged, and measured.",
  },
  {
    icon: ScanLine,
    title: "Optical Loss Testing",
    detail: "Insertion loss measured with a calibrated light source and power meter. Results validated against TIA/ISO loss budgets for the specific link type and length.",
  },
  {
    icon: FileCheck,
    title: "Certification Reports",
    detail: "Full OTDR trace files and pass/fail certification reports generated via Fluke LinkWare for every link. Delivered digitally at project handover.",
  },
  {
    icon: FileText,
    title: "As-Built Documentation",
    detail: "Fiber schedule, splice records, route drawings, and termination schedules compiled and delivered at handover. Complete record of the installed infrastructure.",
  },
];

/* ─── Environments ─── */
const environments = [
  {
    icon: GraduationCap,
    title: "Campus Backbones",
    description: "Inter-building OS2 singlemode for long-reach campus links, riser backbone cabling between floors, and MDF to IDF distribution fiber — the backbone your network depends on.",
    items: [
      "Inter-building OS2 singlemode links",
      "Riser backbone between floors",
      "MDF to IDF distribution fiber",
      "Multi-site campus ring topologies",
    ],
  },
  {
    icon: Server,
    title: "Data Centres",
    description: "OM4/OM5 structured fiber for server-to-switch links, pre-terminated MPO trunk systems for high-density cabling, and ToR switch interconnects — performance-optimised and fully certified.",
    items: [
      "OM4/OM5 structured fiber cabling",
      "Pre-terminated MPO trunk systems",
      "Top-of-rack (ToR) cabling",
      "High-density patch panel installations",
    ],
  },
  {
    icon: Warehouse,
    title: "Outside Plant",
    description: "Underground ducted OS2 runs between buildings, direct-burial cable in armoured or rodent-resistant formats, and aerial span where overhead routes are the most practical option.",
    items: [
      "Underground ducted OS2 fiber",
      "Direct-burial armoured cable",
      "Aerial span installations",
      "Duct and chamber survey & install",
    ],
  },
  {
    icon: Hospital,
    title: "Healthcare",
    description: "In-building OS1 singlemode backbone for hospitals and healthcare facilities, with specialist installations in theatre suites, imaging departments, and any area requiring clean-environment working practices.",
    items: [
      "In-building OS1 singlemode backbone",
      "Theatre & imaging department links",
      "Pharmacy and administration runs",
      "Infection-controlled installation practices",
    ],
  },
  {
    icon: Building2,
    title: "Industrial",
    description: "Armoured cable and ruggedised enclosures for factory and industrial environments. Harsh-environment connectors, long-span links across large sites, and installations designed to survive vibration and temperature variation.",
    items: [
      "Armoured fiber cable installation",
      "Harsh-environment connector types",
      "Long-span inter-building links",
      "Industrial enclosures and tray systems",
    ],
  },
  {
    icon: Hotel,
    title: "Hospitality & Retail",
    description: "Building backbone fiber for hotels, retail chains, and commercial premises — supporting IPTV distribution networks, IP security camera feeds, and high-bandwidth AP backhaul across large or multi-floor sites.",
    items: [
      "Building backbone fiber infrastructure",
      "IPTV distribution fiber feeds",
      "IP security camera fiber runs",
      "AP backhaul and Wi-Fi distribution",
    ],
  },
];

/* ─── Why WCT ─── */
const whyWCT = [
  {
    icon: GitBranch,
    title: "Fusion-Spliced Quality",
    description: "Less than 0.1 dB per splice, every time. Every splice is heat-sleeved and properly housed in a splice tray — not left loose in an enclosure.",
  },
  {
    icon: Activity,
    title: "Bi-Directional Testing",
    description: "We test every link in both directions and average the results — the correct method per TIA and ISO standards, not a shortcut.",
  },
  {
    icon: Eye,
    title: "End-Face Inspection",
    description: "Every connector is cleaned and inspected against IEC 61300-3-35 before testing. Dirty connectors are the number one failure cause in fiber — we eliminate the risk.",
  },
  {
    icon: FileText,
    title: "Complete Handover Pack",
    description: "OTDR traces, insertion loss reports, splice records, and as-built drawings — all delivered at handover, not chased for weeks afterwards.",
  },
];

/* ─── Color map for fiber types ─── */
const fiberColorMap: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  blue: {
    border: "border-blue-200",
    bg: "bg-blue-50/60",
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-700",
  },
  indigo: {
    border: "border-indigo-200",
    bg: "bg-indigo-50/60",
    text: "text-indigo-700",
    badge: "bg-indigo-100 text-indigo-700",
  },
  violet: {
    border: "border-violet-200",
    bg: "bg-violet-50/60",
    text: "text-violet-700",
    badge: "bg-violet-100 text-violet-700",
  },
  emerald: {
    border: "border-emerald-200",
    bg: "bg-emerald-50/60",
    text: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-700",
  },
};

/* ─── OTDR events ─── */
const otdrEvents = [
  { event: "Event 1", description: "Launch connector", distance: "0 m", loss: "0.08 dB", result: "PASS" },
  { event: "Event 2", description: "Fusion splice", distance: "245 m", loss: "0.04 dB", result: "PASS" },
  { event: "Event 3", description: "Fusion splice", distance: "612 m", loss: "0.06 dB", result: "PASS" },
  { event: "Event 4", description: "End connector", distance: "—", loss: "0.09 dB", result: "PASS" },
];

export default function FiberOpticPage() {
  const [activeEnv, setActiveEnv] = useState(0);

  return (
    <main className="min-h-screen" style={{ fontFamily: "var(--font-montserrat, Montserrat, sans-serif)" }}>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: "#080C14" }}>
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Radial blue glow */}
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(37,99,235,0.13) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        {/* Top/bottom gradient lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        {/* Vertical accent */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent hidden lg:block" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-40 lg:py-48">
          <div className="max-w-5xl">
            {/* Badge */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-px bg-blue-500" />
              <span
                className="text-blue-400 uppercase tracking-[0.35em] text-[10px]"
                style={{ fontFamily: "monospace" }}
              >
                Services · Infrastructure
              </span>
            </div>

            {/* Ghost headline */}
            <h1
              className="font-black tracking-tighter text-white leading-[0.88] mb-10"
              style={{ fontSize: "clamp(3.2rem, 9vw, 8.5rem)" }}
            >
              Fiber Optic
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.22)" }}
              >
                Networks.
              </span>
              <br />
              <span className="text-blue-400">Solutions.</span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mb-6">
              From site survey to certified handover — we install, splice, and
              OTDR-certify singlemode and multimode fiber infrastructure that
              performs to standard and lasts.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xl mb-14">
              OS1 · OS2 · OM3 · OM4 · OM5 — certified with Fluke OptiFiber Pro.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?service=Fiber+Optic+Networks"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 font-semibold transition-all duration-300"
              >
                Our Test Instruments
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-20 pt-10 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { value: "OS1/OS2 + OM3–OM5", label: "Fiber standards" },
                { value: "100%", label: "OTDR certified" },
                { value: "400G capable", label: "Max bandwidth" },
                { value: "IEC 61300-3-35", label: "End-face standard" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="font-black tracking-tighter text-white"
                    style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.7rem)" }}
                  >
                    {s.value}
                  </p>
                  <p
                    className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mt-1"
                    style={{ fontFamily: "monospace" }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FIBER TYPES
      ══════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-6 h-px bg-blue-600" />
            <span
              className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium"
              style={{ fontFamily: "monospace" }}
            >
              Fiber Standards
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 mb-6">
            <h2
              className="font-black tracking-tighter text-slate-900"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              The Right Fiber
              <br />
              for the Right Link.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed self-end">
              Singlemode or multimode, indoor or outdoor — the choice of fiber
              type, core count, and connector determines whether your link meets
              its loss budget now and remains fit for purpose as speeds increase.
            </p>
          </div>

          {/* Fiber type cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-12">
            {fiberTypes.map((f) => {
              const col = fiberColorMap[f.color];
              return (
                <div
                  key={f.name}
                  className={`rounded-2xl border ${col.border} ${col.bg} p-6 flex flex-col`}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="font-black tracking-tighter text-slate-900 text-3xl">{f.name}</p>
                      <p className={`text-xs font-semibold mt-1 ${col.text}`}>{f.subtitle}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${col.badge} text-right leading-tight`}>
                      {f.spec}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-1">{f.description}</p>
                  <div className="space-y-1.5 pt-4 border-t border-slate-200/60">
                    {f.uses.map((u) => (
                      <div key={u} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="text-xs text-slate-600">{u}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Connector types */}
          <div className="mt-20">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-6 h-px bg-blue-600" />
              <span
                className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium"
                style={{ fontFamily: "monospace" }}
              >
                Connector Types
              </span>
            </div>
            <h3
              className="font-black tracking-tighter text-slate-900 mb-10"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              LC · SC · MPO/MTP · ST
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {connectorTypes.map((c) => (
                <div
                  key={c.name}
                  className="bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 p-6 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                    <Network className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="font-black tracking-tighter text-slate-900 text-xl mb-0.5">{c.name}</p>
                  <p className="text-xs font-medium text-slate-400 mb-3">{c.full}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{c.use}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FULL SCOPE OF WORK
      ══════════════════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "#F4F3EF" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-6 h-px bg-blue-600" />
            <span
              className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium"
              style={{ fontFamily: "monospace" }}
            >
              Scope of Work
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 mb-14">
            <h2
              className="font-black tracking-tighter text-slate-900"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Everything Included.
              <br />
              Nothing Missed.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed self-end">
              Our fiber optic engagements cover the complete lifecycle — from the
              first site walk to the final OTDR certification report. No scope
              gaps, no corners cut.
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
                      <span
                        className="text-[10px] font-semibold text-slate-400 tabular-nums"
                        style={{ fontFamily: "monospace" }}
                      >
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
          WHERE WE INSTALL — ENVIRONMENT TABS
      ══════════════════════════════════════ */}
      <section
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{ backgroundColor: "#080C14" }}
      >
        {/* Grid overlay */}
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
            <span
              className="text-blue-400 uppercase tracking-[0.35em] text-[10px]"
              style={{ fontFamily: "monospace" }}
            >
              Environments
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <h2
              className="font-black tracking-tighter text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Every Environment.
              <br />
              <span className="text-blue-400">Properly Fibered.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed self-end">
              From underground campus runs to ultra-high-density data centres —
              we've installed fiber in demanding environments and understand the
              constraints, standards, and workmanship that each one requires.
            </p>
          </div>

          {/* Tab selector */}
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

          {/* Active panel */}
          {environments.map((env, i) => {
            const Icon = env.icon;
            if (i !== activeEnv) return null;
            return (
              <div key={env.title} className="grid lg:grid-cols-2 gap-8">
                <div className="rounded-2xl border border-blue-500/20 bg-blue-600/5 p-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3
                    className="font-black tracking-tighter text-white mb-4"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                  >
                    {env.title}
                  </h3>
                  <p className="text-slate-400 text-base leading-relaxed">{env.description}</p>
                </div>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
                  <p
                    className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500 mb-5"
                    style={{ fontFamily: "monospace" }}
                  >
                    What we install in this environment
                  </p>
                  <div className="space-y-4">
                    {env.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-4 pb-4 border-b border-white/[0.05] last:border-0 last:pb-0"
                      >
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
          OTDR TESTING CALLOUT
      ══════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-slate-50 p-8 lg:p-12 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-blue-600" />
                <span
                  className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium"
                  style={{ fontFamily: "monospace" }}
                >
                  OTDR Certification
                </span>
              </div>
              <h2
                className="font-black tracking-tighter text-slate-900 mb-5"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
              >
                Every Link Traced.
                <br />
                Every Event Logged.
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-4">
                We use the{" "}
                <span className="font-semibold text-slate-800">
                  Fluke Networks OptiFiber Pro OTDR
                </span>{" "}
                — the industry standard for fiber certification. Every link is
                tested bi-directionally, with results averaged per TIA and ISO
                methodology.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Bi-directional OTDR traces on every link",
                  "Every event identified, measured, and logged",
                  "Results averaged per TIA-526-14 / ISO/IEC 14763-3",
                  "Full trace files delivered via Fluke LinkWare",
                  "Pass/fail against design loss budget",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="text-slate-700 text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mock OTDR event table */}
            <div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 mb-4">
                <p
                  className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-400 mb-4"
                  style={{ fontFamily: "monospace" }}
                >
                  OTDR event log — sample link
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="text-left text-[10px] font-semibold text-slate-400 pb-2.5 pr-4" style={{ fontFamily: "monospace" }}>Event</th>
                        <th className="text-left text-[10px] font-semibold text-slate-400 pb-2.5 pr-4" style={{ fontFamily: "monospace" }}>Description</th>
                        <th className="text-left text-[10px] font-semibold text-slate-400 pb-2.5 pr-4" style={{ fontFamily: "monospace" }}>Distance</th>
                        <th className="text-left text-[10px] font-semibold text-slate-400 pb-2.5 pr-4" style={{ fontFamily: "monospace" }}>Loss</th>
                        <th className="text-left text-[10px] font-semibold text-slate-400 pb-2.5" style={{ fontFamily: "monospace" }}>Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {otdrEvents.map((row) => (
                        <tr key={row.event} className="border-b border-slate-100 last:border-0">
                          <td className="py-2.5 pr-4 text-xs text-slate-400 tabular-nums" style={{ fontFamily: "monospace" }}>{row.event}</td>
                          <td className="py-2.5 pr-4 text-sm text-slate-700 font-medium">{row.description}</td>
                          <td className="py-2.5 pr-4 text-xs text-slate-500 tabular-nums" style={{ fontFamily: "monospace" }}>{row.distance}</td>
                          <td className="py-2.5 pr-4 text-xs text-slate-500 tabular-nums font-semibold" style={{ fontFamily: "monospace" }}>{row.loss}</td>
                          <td className="py-2.5">
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                              {row.result}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Total summary row */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-700">Total link loss</p>
                    <p className="text-[10px] text-slate-400 mt-0.5" style={{ fontFamily: "monospace" }}>Budget: 1.5 dB</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black tracking-tighter text-slate-900 text-lg">0.27 dB</p>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      PASS
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400 text-center">
                Sample — tested bi-directionally, results averaged per TIA/ISO
              </p>
            </div>
          </div>
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
                <span
                  className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium"
                  style={{ fontFamily: "monospace" }}
                >
                  Why WCT
                </span>
              </div>
              <h2
                className="font-black tracking-tighter text-slate-900 mb-6"
                style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}
              >
                Fiber Done
                <br />
                <span className="text-blue-600">Properly.</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                A fiber link is only as good as its weakest splice, dirtiest
                connector, or missing test. We eliminate all three — and prove it
                with documentation you can rely on.
              </p>
              <Link
                href="/contact?service=Fiber+Optic+Networks"
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
                  <div
                    key={item.title}
                    className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 group"
                  >
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
      <section
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: "#080C14" }}
      >
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
              <span
                className="text-blue-400 uppercase tracking-[0.35em] text-[10px]"
                style={{ fontFamily: "monospace" }}
              >
                Start Your Project
              </span>
              <div className="w-6 h-px bg-blue-500" />
            </div>
            <h2
              className="font-black tracking-tighter text-white mb-6"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
            >
              Fiber That Performs.
              <br />
              <span className="text-blue-400">Certified to Prove It.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-12 max-w-xl mx-auto">
              Tell us your site, your routes, and your bandwidth requirements.
              We'll scope the job, specify the right fiber type, and deliver a
              fixed-price proposal — with OTDR certification included as standard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?service=Fiber+Optic+Networks"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
              >
                Request a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 font-semibold transition-all duration-300"
              >
                Our Test Instruments
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
