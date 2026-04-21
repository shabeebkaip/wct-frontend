"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle,
  Cable, Layers, FileText, Ruler,
  Building2, Hospital, GraduationCap, Warehouse,
  Hotel, ShoppingBag, Shield, Award,
  Wrench, ClipboardList, ScanLine, FileCheck,
  Zap, Network, Tag, BookOpen,
} from "lucide-react";

/* ─── Cable categories ─── */
const cableCategories = [
  {
    cat: "Cat 5e",
    speed: "1 Gbps",
    freq: "100 MHz",
    distance: "100 m",
    use: "VoIP phones, standard office workstations, PoE devices, legacy network upgrades.",
    suitable: ["Small offices", "Retrofit projects", "Budget-conscious builds"],
    color: "slate",
  },
  {
    cat: "Cat 6",
    speed: "1 Gbps",
    freq: "250 MHz",
    distance: "100 m",
    use: "General office environments, meeting rooms, high-density workstation areas requiring improved noise margins.",
    suitable: ["Corporate offices", "Meeting rooms", "Mid-size deployments"],
    color: "blue",
  },
  {
    cat: "Cat 6A",
    speed: "10 Gbps",
    freq: "500 MHz",
    distance: "100 m",
    use: "Data centres, hospitals, high-density Wi-Fi AP feeds, PoE++ (90W), and futureproofed enterprise networks.",
    suitable: ["Data centres", "Healthcare", "High-density Wi-Fi"],
    color: "indigo",
  },
  {
    cat: "Cat 8",
    speed: "40 Gbps",
    freq: "2000 MHz",
    distance: "30 m",
    use: "Top-of-rack data centre switch interconnects, high-speed server uplinks where short runs are acceptable.",
    suitable: ["Server rooms", "ToR interconnects", "Ultra-low latency"],
    color: "violet",
  },
];

/* ─── Full scope of work ─── */
const scopeItems = [
  {
    icon: Ruler,
    title: "Site Survey & Cable Route Planning",
    detail: "We walk the site, measure routes, identify trunking paths, ceiling heights, and riser shafts before any design is committed to paper. Every cable route is documented.",
  },
  {
    icon: ClipboardList,
    title: "Cabling Design & Port Schedule",
    detail: "Detailed CAD drawings showing outlet positions, patch panel ports, rack layout, and cable routes. Port schedules produced for every floor and zone.",
  },
  {
    icon: Cable,
    title: "Cable Installation & Routing",
    detail: "Cables are pulled through trunking, conduit, cable trays, and ceiling voids — neatly bundled, correctly separated from power, and supported at proper intervals.",
  },
  {
    icon: Layers,
    title: "Termination & Punch-Down",
    detail: "Cat 5e, 6, and 6A terminated to 110-style patch panels using proper punch-down tools. Every termination is checked for correct pin-out and twist preservation.",
  },
  {
    icon: Network,
    title: "Patch Panel & Rack Dressing",
    detail: "Patch panels front-loaded into racks, cables laced and velcroed at the rear, 1U blanking between panels. Clean, structured, and maintainable.",
  },
  {
    icon: Zap,
    title: "Outlet & Face Plate Installation",
    detail: "Flush wall plates, floor boxes, surface-mount outlets, and desk grommets — all installed to specified positions, labelled, and keystoned to the correct port.",
  },
  {
    icon: Tag,
    title: "Labelling & Asset Tagging",
    detail: "Every cable, patch panel port, face plate outlet, and rack unit labelled to ANSI/TIA-606 — machine-printed, durable, and consistent throughout the installation.",
  },
  {
    icon: ScanLine,
    title: "Testing & Certification",
    detail: "All copper links tested with the Fluke Networks DSX-5000 to the relevant TIA or ISO standard. Pass/fail for every parameter — wiremap, length, insertion loss, NEXT, FEXT, return loss.",
  },
  {
    icon: FileCheck,
    title: "As-Built Documentation & Reports",
    detail: "Complete as-built drawings updated to reflect final installed positions, plus full LinkWare test reports — every run, every result, delivered digitally.",
  },
  {
    icon: BookOpen,
    title: "Warranty & Handover",
    detail: "Installation documentation package, port-to-outlet schedule, and where applicable, a system warranty registered with the cable manufacturer.",
  },
];

/* ─── Environments ─── */
const environments = [
  {
    icon: Building2,
    title: "Corporate Offices",
    description: "Open-plan workstation feeds, meeting room AV drops, reception, server room backbone — designed for growth and easy MAC work.",
    items: ["Workstation outlets", "Meeting room AV & UC", "Reception & common areas", "Server room / IDF cabling"],
  },
  {
    icon: Hospital,
    title: "Healthcare & Hospitals",
    description: "Infection-controlled installation practices, Cat 6A for medical devices and PoE nurse-call systems, compliant with HTM standards.",
    items: ["Nurse call & patient monitoring", "Medical device feeds", "Imaging & radiology rooms", "Pharmacy & administration"],
  },
  {
    icon: GraduationCap,
    title: "Education Campuses",
    description: "High-density wireless feeds, classroom AV infrastructure, admin blocks and inter-building backbone across multi-building sites.",
    items: ["Classroom AV & AP feeds", "Library & study areas", "Administration offices", "Inter-building fiber links"],
  },
  {
    icon: Warehouse,
    title: "Warehouses & Industrial",
    description: "Heavy-duty trunking, IP65-rated outlets, barcode scanner feeds, and WMS terminal connections in challenging environments.",
    items: ["Barcode scanner drops", "WMS workstations", "IP camera positions", "Office & mezzanine areas"],
  },
  {
    icon: Hotel,
    title: "Hotels & Hospitality",
    description: "Guest room data/TV, back-of-house network, conference room AV and Wi-Fi AP infrastructure — installed around live operations.",
    items: ["Guest room data & TV", "Conference & banquet rooms", "Reception & front desk", "Back-of-house IT rooms"],
  },
  {
    icon: ShoppingBag,
    title: "Retail & Commercial",
    description: "POS terminal cabling, digital signage, customer Wi-Fi APs, and security camera feeds — delivered to tight fit-out schedules.",
    items: ["POS & till points", "Digital signage drops", "Stock room workstations", "CCTV & access control feeds"],
  },
];

/* ─── Why WCT ─── */
const whyWCT = [
  {
    icon: Award,
    title: "Certified Every Time",
    description: "We certify every single cable run with the Fluke DSX-5000. Not a sample — every run. You get a LinkWare report showing pass/fail for each parameter.",
  },
  {
    icon: Shield,
    title: "Standards Compliance",
    description: "All work is designed and installed to TIA-568, ISO/IEC 11801, and ANSI/TIA-606 labelling standards — meeting manufacturer warranty requirements.",
  },
  {
    icon: Wrench,
    title: "Clean, Engineered Installations",
    description: "We take pride in the quality of our physical workmanship. Neat cable management, consistent dressing, and racks that look as good in 10 years as day one.",
  },
  {
    icon: FileText,
    title: "Full Documentation",
    description: "As-built drawings, port schedules, test reports, and warranty documents delivered at handover — not chased for weeks after the job is done.",
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  slate: { border: "border-slate-200", bg: "bg-slate-50", text: "text-slate-700", badge: "bg-slate-100 text-slate-600" },
  blue: { border: "border-blue-200", bg: "bg-blue-50/60", text: "text-blue-700", badge: "bg-blue-100 text-blue-700" },
  indigo: { border: "border-indigo-200", bg: "bg-indigo-50/60", text: "text-indigo-700", badge: "bg-indigo-100 text-indigo-700" },
  violet: { border: "border-violet-200", bg: "bg-violet-50/60", text: "text-violet-700", badge: "bg-violet-100 text-violet-700" },
};

export default function StructuredCablingPage() {
  const [activeEnv, setActiveEnv] = useState(0);

  return (
    <main className="min-h-screen" style={{ fontFamily: "var(--font-montserrat, Montserrat, sans-serif)" }}>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: "#080C14" }}>
        <div className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.13) 0%, transparent 65%)", filter: "blur(80px)" }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        {/* Vertical accent lines */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent hidden lg:block" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-40 lg:py-48">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-px bg-blue-500" />
              <span className="text-blue-400 uppercase tracking-[0.35em] text-[10px]" style={{ fontFamily: "monospace" }}>
                Services · Infrastructure
              </span>
            </div>

            <h1 className="font-black tracking-tighter text-white leading-[0.88] mb-10"
              style={{ fontSize: "clamp(3.2rem, 9vw, 8.5rem)" }}>
              Structured
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.22)" }}>
                Cabling
              </span>
              <br />
              <span className="text-blue-400">Solutions.</span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mb-6">
              From initial site survey to certified handover — we design, install,
              test, and document copper cabling infrastructure that performs to
              standard and lasts.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xl mb-14">
              Cat 5e · Cat 6 · Cat 6A · Cat 8 — certified with Fluke DSX-5000.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact?service=Structured+Cabling"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105">
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 font-semibold transition-all duration-300">
                Our Test Instruments
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-20 pt-10 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { value: "4", label: "Cable categories" },
                { value: "100%", label: "Runs certified" },
                { value: "TIA / ISO", label: "Standards complied" },
                { value: "10 Gbps", label: "Max supported" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-black tracking-tighter text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>
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
          CABLE CATEGORIES
      ══════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-6 h-px bg-blue-600" />
            <span className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium" style={{ fontFamily: "monospace" }}>
              Cable Standards
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 mb-6">
            <h2 className="font-black tracking-tighter text-slate-900" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              The Right Cable
              <br />
              for the Right Job.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed self-end">
              We assess your bandwidth requirements, device density, PoE load, and
              growth plans before recommending a cable category. Installing the
              wrong standard costs more to fix than getting it right first time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-12">
            {cableCategories.map((c) => {
              const col = colorMap[c.color];
              return (
                <div key={c.cat} className={`rounded-2xl border ${col.border} ${col.bg} p-6 flex flex-col`}>
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="font-black tracking-tighter text-slate-900 text-3xl">{c.cat}</p>
                      <p className={`text-xs font-semibold mt-1 ${col.text}`}>{c.speed} · {c.freq}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${col.badge}`}>
                      {c.distance}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-1">{c.use}</p>
                  <div className="space-y-1.5 pt-4 border-t border-slate-200/60">
                    {c.suitable.map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="text-xs text-slate-600">{s}</span>
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
          FULL SCOPE OF WORK
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
              Everything Included.
              <br />
              Nothing Missed.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed self-end">
              Our structured cabling engagements cover the full lifecycle — from
              the first site walk to the final certification report. No scope gaps,
              no subcontracted surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scopeItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={item.title}
                  className="bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 p-6 group flex gap-5">
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
          WHERE WE WORK
      ══════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: "#080C14" }}>
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.11) 0%, transparent 65%)", filter: "blur(80px)" }}
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
              Every Environment.
              <br />
              <span className="text-blue-400">Properly Cabled.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed self-end">
              We've installed structured cabling in offices, hospitals, warehouses,
              schools, hotels, and retail spaces. Each environment has different
              constraints — we know them all.
            </p>
          </div>

          {/* Tab selector */}
          <div className="flex flex-wrap gap-2 mb-8">
            {environments.map((env, i) => {
              const Icon = env.icon;
              return (
                <button key={env.title} onClick={() => setActiveEnv(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    activeEnv === i
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-white/10 text-white/50 hover:text-white/80 hover:border-white/20"
                  }`}>
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
                  <h3 className="font-black tracking-tighter text-white mb-4"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                    {env.title}
                  </h3>
                  <p className="text-slate-400 text-base leading-relaxed">{env.description}</p>
                </div>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500 mb-5"
                    style={{ fontFamily: "monospace" }}>
                    What we cable in this environment
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
          CERTIFICATION CALLOUT
      ══════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-slate-50 p-8 lg:p-12 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-blue-600" />
                <span className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium" style={{ fontFamily: "monospace" }}>
                  Certified Testing
                </span>
              </div>
              <h2 className="font-black tracking-tighter text-slate-900 mb-5"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
                Every Run Tested.
                <br />
                Every Result Documented.
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-4">
                We certify 100% of installed links using the{" "}
                <span className="font-semibold text-slate-800">Fluke Networks DSX-5000</span> — the
                industry benchmark for copper cable certification. Tests cover:
              </p>
              <div className="grid grid-cols-2 gap-2 mt-6">
                {["Wiremap", "Cable length", "Insertion loss", "Return loss", "NEXT", "PS-NEXT", "FEXT", "PS-ACRF"].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="text-slate-700 text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 mb-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-400 mb-4" style={{ fontFamily: "monospace" }}>
                  Test output per link
                </p>
                {[
                  { label: "Wiremap", result: "PASS", val: "All pairs correct" },
                  { label: "Length", result: "PASS", val: "42.3 m" },
                  { label: "Insertion Loss", result: "PASS", val: "8.4 dB @ 500 MHz" },
                  { label: "NEXT (worst pair)", result: "PASS", val: "3.2 dB margin" },
                  { label: "Return Loss", result: "PASS", val: "4.1 dB margin" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                    <span className="text-sm text-slate-600">{row.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400">{row.val}</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{row.result}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 text-center">
                Sample — all results delivered via LinkWare certification report
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
                <span className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium" style={{ fontFamily: "monospace" }}>
                  Why WCT
                </span>
              </div>
              <h2 className="font-black tracking-tighter text-slate-900 mb-6"
                style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}>
                Cabling Done
                <br />
                <span className="text-blue-600">Properly.</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                Bad cabling causes intermittent faults, failed upgrades, and warranty
                headaches for years. We install it right — and certify it to prove it.
              </p>
              <Link href="/contact?service=Structured+Cabling"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 group">
                Talk to Our Team
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyWCT.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title}
                    className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 group">
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
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
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
            <h2 className="font-black tracking-tighter text-white mb-6"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>
              Need Cabling
              <br />
              <span className="text-blue-400">Done Right?</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-12 max-w-xl mx-auto">
              Tell us your site, your port count, and your timeline. We'll scope
              the job, recommend the right cable category, and deliver a fixed-price
              proposal — with certification included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?service=Structured+Cabling"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105">
                Request a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/products"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 font-semibold transition-all duration-300">
                Our Test Instruments
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
