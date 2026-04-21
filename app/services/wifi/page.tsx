"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Wifi,
  Activity,
  FileText,
  ScanLine,
  FileCheck,
  ClipboardList,
  Eye,
  Map,
  Signal,
  Layers,
  Shield,
  Building2,
  Hospital,
  Warehouse,
  Hotel,
  GraduationCap,
  ShoppingBag,
  Server,
  BarChart3,
} from "lucide-react";

/* ─── Survey types ─── */
const surveyTypes = [
  {
    name: "Passive Survey",
    subtitle: "Listen-only · No association",
    description:
      "The surveyor walks the site while Ekahau passively listens to all visible APs. No association required — the tool captures RSSI, channel, SSID, and interference from every 802.11 device in range.",
    spec: "Best for",
    specValue: "Existing network audit",
    uses: [
      "Audit existing Wi-Fi coverage",
      "Identify interference sources",
      "Detect rogue APs",
      "Baseline before upgrade",
    ],
    color: "blue",
  },
  {
    name: "Active Survey",
    subtitle: "Associated · Real throughput",
    description:
      "The survey device associates to your SSID and performs real data-rate testing as the surveyor walks. Captures actual throughput, packet loss, roaming events, and MCS rates — not just RSSI.",
    spec: "Best for",
    specValue: "New deployment validation",
    uses: [
      "Validate new AP deployments",
      "Test roaming performance",
      "Measure real throughput",
      "SLA compliance evidence",
    ],
    color: "indigo",
  },
  {
    name: "Predictive Design",
    subtitle: "CAD-based · Pre-deployment",
    description:
      "Using Ekahau AI Pro with your floor plan, we model AP placement, power levels, and channel assignments before a single cable is pulled. Predict coverage, capacity, and co-channel interference upfront.",
    spec: "Best for",
    specValue: "New builds & fit-outs",
    uses: [
      "New build and fit-out planning",
      "AP placement optimisation",
      "Channel and power design",
      "Cost and quote validation",
    ],
    color: "violet",
  },
  {
    name: "Spectrum Analysis",
    subtitle: "Non-Wi-Fi interference",
    description:
      "The Ekahau Sidekick 2 includes a full spectrum analyser for the 2.4 GHz and 5 GHz bands. Identify microwave leakage, Bluetooth congestion, DECT phones, baby monitors, and any non-802.11 interference before it degrades your network.",
    spec: "Best for",
    specValue: "Interference troubleshooting",
    uses: [
      "Identify microwave leakage",
      "Detect DECT & Bluetooth interference",
      "Pre-deployment spectrum clear",
      "Post-incident root cause analysis",
    ],
    color: "emerald",
  },
];

/* ─── Full scope ─── */
const scopeItems = [
  {
    icon: ClipboardList,
    title: "Requirements Gathering",
    detail:
      "Concurrent device counts, application types (VoIP, video, IoT), roaming requirements, and security policies documented before survey. The right design starts with the right brief.",
  },
  {
    icon: Map,
    title: "Site Walk & Floor Plan Collection",
    detail:
      "Every floor walked and measured. Accurate floor plans collected or CAD files requested. Wall types, construction materials, and physical obstructions documented — all of which affect RF propagation.",
  },
  {
    icon: Layers,
    title: "Predictive RF Design",
    detail:
      "Ekahau AI Pro predictive model built from your floor plans. AP placement, antenna selection, transmit power, and channel plan optimised for coverage, capacity, and co-channel interference before deployment.",
  },
  {
    icon: Wifi,
    title: "AP Placement & Installation",
    detail:
      "APs installed at surveyed locations. Ceiling mounts, wall mounts, or above-ceiling plenum installs. All cabling certified Cat 6A. PoE switch ports confirmed. No guesswork on cable routes.",
  },
  {
    icon: Activity,
    title: "Post-Deployment Active Survey",
    detail:
      "Once APs are live, a full active survey is conducted with Ekahau Sidekick 2 — associating to the SSID and walking every area to capture real RSSI, SNR, throughput, and roaming events.",
  },
  {
    icon: ScanLine,
    title: "Spectrum Analysis",
    detail:
      "Full 2.4 GHz and 5 GHz spectrum scan performed to identify non-802.11 interference sources. Microwave, DECT, Bluetooth — all detected, located, and documented.",
  },
  {
    icon: Signal,
    title: "Coverage & Capacity Validation",
    detail:
      "Every zone checked for minimum RSSI (-65 dBm or better), SNR (25 dB or better), and throughput targets. Coverage gaps and under-served high-density areas identified and remediated.",
  },
  {
    icon: Eye,
    title: "Roaming Performance Testing",
    detail:
      "Client roaming between APs validated for seamless handoff. 802.11r/k/v support verified where required. Voice-grade roaming tested where VoIP or real-time applications are in scope.",
  },
  {
    icon: BarChart3,
    title: "Heatmap & Channel Analysis",
    detail:
      "Ekahau heatmaps generated for RSSI, SNR, channel utilisation, and co-channel interference. Channel plan adjusted where necessary and final AP settings locked down.",
  },
  {
    icon: FileCheck,
    title: "Survey Report & Heatmaps",
    detail:
      "Full Ekahau survey project file, heatmaps for all measured metrics, channel plan, AP configuration summary, and remediation recommendations — all delivered at handover.",
  },
];

/* ─── Environments ─── */
const environments = [
  {
    icon: Building2,
    title: "Corporate Offices",
    description:
      "High-density office Wi-Fi for open-plan floors, meeting rooms, and huddle spaces. Designed for seamless roaming between floors, VoIP and video conferencing performance, and BYOD guest segmentation.",
    items: [
      "High-density open-plan coverage",
      "Meeting room and huddle space design",
      "Seamless floor-to-floor roaming",
      "BYOD, staff, and guest SSID segmentation",
    ],
  },
  {
    icon: Warehouse,
    title: "Warehouses & Logistics",
    description:
      "Large-footprint warehouses with high racking, metal shelving, and forklift-mounted devices. Coverage designed around real RF propagation through racking, with directional APs and proper channel planning for scan-gun performance.",
    items: [
      "Racking and metal obstruction modelling",
      "Forklift and handheld scanner coverage",
      "Directional AP selection and placement",
      "WMS and barcode scan performance testing",
    ],
  },
  {
    icon: Hospital,
    title: "Healthcare",
    description:
      "Patient wards, theatre suites, and clinical corridors. Voice-grade roaming for clinical handsets, medical device connectivity, and RTLS support. Designed and installed under infection-control protocols.",
    items: [
      "Voice-grade 802.11r/k/v roaming",
      "Clinical handset and RTLS support",
      "Theatre and imaging suite coverage",
      "Infection-controlled installation",
    ],
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Schools and universities with dense classroom environments, lecture theatres, and outdoor campus areas. High-density design for BYOD policy, secure staff and student SSID segregation, and outdoor coverage.",
    items: [
      "Classroom and lecture theatre density",
      "BYOD policy compliance",
      "Staff/student/IoT SSID segmentation",
      "Outdoor campus coverage design",
    ],
  },
  {
    icon: Hotel,
    title: "Hospitality",
    description:
      "Hotels, conference centres, and managed serviced offices. Guest Wi-Fi, back-of-house staff networks, banqueting and events coverage. Designed for high device counts and seamless roaming across large buildings.",
    items: [
      "Guest and staff Wi-Fi separation",
      "Banqueting and events capacity design",
      "In-room coverage validation",
      "PMS and IPTV integration support",
    ],
  },
  {
    icon: ShoppingBag,
    title: "Retail",
    description:
      "Retail stores, shopping centres, and distribution facilities. POS system connectivity, customer Wi-Fi, and loss-prevention IoT device coverage. Survey-designed to handle peak trading device counts.",
    items: [
      "POS and payment terminal coverage",
      "Customer Wi-Fi capacity planning",
      "IoT and loss-prevention devices",
      "Peak trading device count design",
    ],
  },
];

/* ─── Why WCT ─── */
const whyWCT = [
  {
    icon: Activity,
    title: "Survey Before You Deploy",
    description:
      "We design with a predictive model and validate with a post-deployment survey — not just a walk with a phone app. Every deployment is evidence-based.",
  },
  {
    icon: Signal,
    title: "Real-World Testing",
    description:
      "Active surveys associate to your SSID and measure real throughput, not just signal strength. We test the network you'll actually use — including roaming behaviour.",
  },
  {
    icon: ScanLine,
    title: "Spectrum Awareness",
    description:
      "Ekahau Sidekick 2 includes dedicated spectrum analysis hardware. We find non-802.11 interference that RSSI surveys miss completely.",
  },
  {
    icon: FileText,
    title: "Heatmaps You Can Act On",
    description:
      "Every survey produces heatmaps, channel analysis, and a written report. Not just a pretty picture — clear evidence of coverage quality and remediation priority.",
  },
];

/* ─── Color map ─── */
const colorMap: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  blue: { border: "border-blue-200", bg: "bg-blue-50/60", text: "text-blue-700", badge: "bg-blue-100 text-blue-700" },
  indigo: { border: "border-indigo-200", bg: "bg-indigo-50/60", text: "text-indigo-700", badge: "bg-indigo-100 text-indigo-700" },
  violet: { border: "border-violet-200", bg: "bg-violet-50/60", text: "text-violet-700", badge: "bg-violet-100 text-violet-700" },
  emerald: { border: "border-emerald-200", bg: "bg-emerald-50/60", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-700" },
};

export default function WifiPage() {
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
                Services · Wireless
              </span>
            </div>

            <h1
              className="font-black tracking-tighter text-white leading-[0.88] mb-10"
              style={{ fontSize: "clamp(3.2rem, 9vw, 8.5rem)" }}
            >
              Wi-Fi Design
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.22)" }}>
                & Survey.
              </span>
              <br />
              <span className="text-blue-400">Done Right.</span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mb-6">
              Predictive design, professional installation, and post-deployment
              active survey — every Wi-Fi engagement is backed by Ekahau
              heatmaps, not guesswork.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xl mb-14">
              Surveyed with Ekahau Sidekick 2 · Passive, active & spectrum analysis
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?service=Wi-Fi+Design+%26+Survey"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
              >
                Get a Wi-Fi Survey
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 font-semibold transition-all duration-300"
              >
                Our Survey Equipment
              </Link>
            </div>

            <div className="mt-20 pt-10 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { value: "Passive + Active", label: "Survey types" },
                { value: "2.4 + 5 GHz", label: "Spectrum analysis" },
                { value: "Ekahau AI Pro", label: "Design platform" },
                { value: "−65 dBm", label: "Coverage standard" },
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
          SURVEY TYPES
      ══════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-6 h-px bg-blue-600" />
            <span className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium" style={{ fontFamily: "monospace" }}>
              Survey Methodology
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 mb-14">
            <h2 className="font-black tracking-tighter text-slate-900" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              Four Ways to
              <br />
              See Your Network.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed self-end">
              Different survey types answer different questions. We match the
              methodology to your objective — whether you're planning a new
              deployment, validating an existing network, or diagnosing
              interference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {surveyTypes.map((s) => {
              const col = colorMap[s.color];
              return (
                <div key={s.name} className={`rounded-2xl border ${col.border} ${col.bg} p-6 flex flex-col`}>
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="font-black tracking-tighter text-slate-900 text-xl leading-tight">{s.name}</p>
                      <p className={`text-xs font-semibold mt-1 ${col.text}`}>{s.subtitle}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${col.badge} text-right leading-tight whitespace-nowrap ml-2`}>
                      {s.specValue}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-1">{s.description}</p>
                  <div className="space-y-1.5 pt-4 border-t border-slate-200/60">
                    {s.uses.map((u) => (
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
              Certified Heatmap.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed self-end">
              Our Wi-Fi engagements span the full process — site walk, predictive
              design, installation, and post-deployment validation. Every step
              documented, every deliverable included.
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
              Every Environment.
              <br />
              <span className="text-blue-400">Properly Surveyed.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed self-end">
              Dense offices, challenging warehouses, healthcare environments,
              and hospitality venues — each has unique RF requirements. We know
              them, and we design to them.
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
                    What we deliver in this environment
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
          EKAHAU SIDEKICK CALLOUT
      ══════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-slate-50 p-8 lg:p-12 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-blue-600" />
                <span className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium" style={{ fontFamily: "monospace" }}>
                  Survey Hardware
                </span>
              </div>
              <h2 className="font-black tracking-tighter text-slate-900 mb-5" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
                Ekahau Sidekick 2.
                <br />
                Professional-Grade.
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-4">
                The{" "}
                <span className="font-semibold text-slate-800">Ekahau Sidekick 2</span>{" "}
                is a dedicated survey hardware unit — not a laptop Wi-Fi card. It
                captures 2.4 GHz, 5 GHz, and 6 GHz simultaneously, with an
                integrated spectrum analyser that detects non-802.11 interference
                that consumer hardware misses entirely.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "2.4 GHz, 5 GHz & 6 GHz simultaneous capture",
                  "Dedicated 2.4 + 5 GHz spectrum analyser",
                  "Identifies non-802.11 interference sources",
                  "Used with Ekahau AI Pro design software",
                  "Industry standard for enterprise Wi-Fi surveys",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="text-slate-700 text-sm">{t}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  href="/contact?service=Wi-Fi+Design+%26+Survey"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  Book a Wi-Fi Survey
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Survey metrics panel */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-400 mb-5" style={{ fontFamily: "monospace" }}>
                Survey deliverables — what you receive
              </p>
              <div className="space-y-4">
                {[
                  { label: "Coverage Heatmap (RSSI)", note: "Per floor, all bands" },
                  { label: "SNR Heatmap", note: "Signal-to-noise per floor" },
                  { label: "Channel Utilisation Map", note: "2.4 + 5 + 6 GHz" },
                  { label: "Co-Channel Interference Map", note: "AP overlap analysis" },
                  { label: "Spectrum Analysis Report", note: "Non-802.11 interference" },
                  { label: "Active Throughput Results", note: "Real data-rate measurements" },
                  { label: "AP Configuration Summary", note: "Channel, power, SSID settings" },
                  { label: "Written Survey Report", note: "Findings + recommendations" },
                  { label: "Ekahau Project File", note: "Full raw survey data" },
                ].map((d) => (
                  <div key={d.label} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span className="text-sm font-medium text-slate-700">{d.label}</span>
                    </div>
                    <span className="text-xs text-slate-400" style={{ fontFamily: "monospace" }}>{d.note}</span>
                  </div>
                ))}
              </div>
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
              <h2 className="font-black tracking-tighter text-slate-900 mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}>
                Wi-Fi Built on
                <br />
                <span className="text-blue-600">Evidence.</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                Anyone can install access points. We design, survey, and certify
                — so you know your Wi-Fi performs to the standard you paid for,
                with documentation to prove it.
              </p>
              <Link
                href="/contact?service=Wi-Fi+Design+%26+Survey"
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
              Wi-Fi That Works.
              <br />
              <span className="text-blue-400">Surveyed to Prove It.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-12 max-w-xl mx-auto">
              Tell us your site size, device counts, and applications. We'll
              scope the right survey type, design the network, and deliver
              heatmap evidence that it meets the brief.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?service=Wi-Fi+Design+%26+Survey"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
              >
                Book a Wi-Fi Survey
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 font-semibold transition-all duration-300"
              >
                Our Survey Equipment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
