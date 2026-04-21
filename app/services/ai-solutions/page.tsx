"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Camera,
  Network,
  Building2,
  Brain,
  Eye,
  Activity,
  Zap,
  FileText,
  ClipboardList,
  BarChart3,
  Shield,
  Server,
  Cpu,
  MessageSquare,
  ScanLine,
  Layers,
  GitBranch,
  Hospital,
  Warehouse,
  Hotel,
  GraduationCap,
  ShoppingBag,
  Monitor,
} from "lucide-react";

/* ─── AI solution categories ─── */
const solutionCategories = [
  {
    name: "Intelligent Video Analytics",
    subtitle: "AI-Powered CCTV",
    icon: Camera,
    color: "blue",
    description:
      "Transform your existing CCTV infrastructure into an intelligent detection and analytics platform. AI video analytics runs on-premise at the edge — no cloud dependency, no latency.",
    capabilities: [
      "People counting & occupancy analytics",
      "Perimeter intrusion detection",
      "Loitering & abandoned object alerts",
      "Licence plate recognition (ANPR)",
      "Facial recognition & watchlist matching",
      "Slip, trip & fall detection",
      "Queue management & wait-time analytics",
      "Heatmaps & dwell-time mapping",
    ],
  },
  {
    name: "AI Network Management",
    subtitle: "Predictive & Autonomous",
    icon: Network,
    color: "indigo",
    description:
      "AI-driven network monitoring that moves from reactive to predictive. Detect anomalies before they become outages, automate routine changes, and get actionable intelligence from your network telemetry.",
    capabilities: [
      "Anomaly detection & predictive fault alerts",
      "Automated root-cause analysis",
      "Traffic pattern analysis & capacity planning",
      "AI-assisted configuration management",
      "Zero-trust network access (ZTNA) integration",
      "Behavioural threat detection on the LAN",
      "Automated switch & AP optimisation",
      "Natural language network queries",
    ],
  },
  {
    name: "Smart Building Automation",
    subtitle: "AI-Driven Building Intelligence",
    icon: Building2,
    color: "violet",
    description:
      "Integrate building systems — HVAC, lighting, access control, CCTV, and energy — under a single AI management layer that learns usage patterns, reduces waste, and improves occupant experience.",
    capabilities: [
      "Occupancy-based HVAC & lighting control",
      "Energy consumption anomaly detection",
      "Predictive maintenance for building plant",
      "Integrated building management dashboard",
      "Access control + CCTV correlation",
      "Digital twin modelling",
      "Automated incident response workflows",
      "ESG reporting & carbon monitoring",
    ],
  },
  {
    name: "Business AI & Automation",
    subtitle: "Workflow & Process Intelligence",
    icon: Brain,
    color: "emerald",
    description:
      "Implement large language models, document intelligence, and process automation tailored to your operations — deployed securely on-premise or in your private cloud environment.",
    capabilities: [
      "Private LLM deployment (on-premise)",
      "Document processing & data extraction",
      "AI customer service & knowledge bots",
      "IT helpdesk automation",
      "Predictive analytics for operations",
      "Computer vision for quality control",
      "Voice-to-action workflow triggers",
      "AI-ready infrastructure design",
    ],
  },
];

/* ─── How we deploy ─── */
const deploymentSteps = [
  {
    step: "01",
    title: "Discovery & Use-Case Workshop",
    detail:
      "We run a structured workshop to identify where AI adds genuine value in your environment — not a generic demo, but a targeted review of your current systems, workflows, and data assets.",
  },
  {
    step: "02",
    title: "Solution Design",
    detail:
      "Architecture design covering AI model selection, edge vs cloud deployment, integration points with existing infrastructure, and data privacy requirements. Full technical specification produced.",
  },
  {
    step: "03",
    title: "Proof of Concept",
    detail:
      "Where appropriate, a bounded PoC is deployed in a non-production environment to validate the solution against real data before full deployment commitment.",
  },
  {
    step: "04",
    title: "Infrastructure Preparation",
    detail:
      "GPU compute provisioning, edge AI hardware installation, network segmentation, and security hardening. AI workloads need the right infrastructure — we prepare it.",
  },
  {
    step: "05",
    title: "Deployment & Integration",
    detail:
      "AI models deployed, integrated with existing systems — CCTV platforms, network management tools, building management systems, or business applications — and tested end-to-end.",
  },
  {
    step: "06",
    title: "Monitoring, Tuning & Support",
    detail:
      "Post-deployment model monitoring, performance tuning, and ongoing support. AI systems drift over time — we maintain them, retrain where needed, and keep them performing.",
  },
];

/* ─── Use cases by sector ─── */
const sectors = [
  {
    icon: ShoppingBag,
    title: "Retail",
    description:
      "People counting and dwell-time analytics to optimise store layout and staffing. Queue management with real-time alerts. Loss prevention via AI behavioural detection on CCTV. Customer journey heatmaps.",
    items: [
      "People counting & conversion analytics",
      "Queue length alerts & management",
      "Loss prevention behavioural analytics",
      "Customer journey & dwell heatmaps",
    ],
  },
  {
    icon: Warehouse,
    title: "Warehouses & Logistics",
    description:
      "Perimeter intrusion detection on large-footprint sites. Forklift proximity alerts and near-miss detection. Slip and fall monitoring in loading areas. Asset tracking and dock management analytics.",
    items: [
      "Perimeter intrusion & after-hours alerts",
      "Forklift proximity & near-miss detection",
      "Slip, trip & fall detection",
      "Dock activity analytics",
    ],
  },
  {
    icon: Hospital,
    title: "Healthcare",
    description:
      "Patient fall detection and wandering alerts in care settings. Occupancy analytics for bed management. Infection control compliance monitoring. AI-assisted diagnostics image review integration.",
    items: [
      "Patient fall & wandering detection",
      "Ward occupancy & bed management",
      "Hand hygiene compliance monitoring",
      "Restricted area access analytics",
    ],
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Campus occupancy analytics and space utilisation. AI perimeter monitoring for safeguarding. Visitor management with facial recognition. Behaviour detection for lone-worker and safeguarding scenarios.",
    items: [
      "Campus occupancy & space analytics",
      "AI perimeter safeguarding alerts",
      "Visitor management & watchlist",
      "Behaviour anomaly detection",
    ],
  },
  {
    icon: Building2,
    title: "Corporate & Commercial",
    description:
      "Smart building energy optimisation with AI occupancy modelling. Private LLM deployment for internal knowledge management. AI network operations with automated incident response.",
    items: [
      "Smart building energy optimisation",
      "Private LLM / internal knowledge AI",
      "AI-driven network operations",
      "Meeting room & space analytics",
    ],
  },
  {
    icon: Monitor,
    title: "Critical Infrastructure",
    description:
      "AI-powered threat detection on OT/IT converged networks. Physical security perimeter intelligence for utilities and data centres. Automated anomaly response and forensic incident reconstruction.",
    items: [
      "OT/IT threat detection & response",
      "Perimeter intelligence for secure sites",
      "Automated anomaly & alert triage",
      "Forensic incident reconstruction",
    ],
  },
];

/* ─── Why WCT for AI ─── */
const whyWCT = [
  {
    icon: Layers,
    title: "Infrastructure-First Approach",
    description:
      "AI systems need the right foundations — GPU compute, network segmentation, edge hardware, and secure data pipelines. We build the infrastructure and the AI layer together.",
  },
  {
    icon: Shield,
    title: "On-Premise First",
    description:
      "We default to on-premise and private cloud deployment for AI workloads — keeping your data under your control, meeting data residency requirements, and eliminating recurring cloud AI costs.",
  },
  {
    icon: GitBranch,
    title: "Integration Depth",
    description:
      "AI analytics that connect to your CCTV, access control, network management, and building systems — not isolated tools sitting alongside your infrastructure. We integrate deeply.",
  },
  {
    icon: Activity,
    title: "Ongoing Performance Monitoring",
    description:
      "AI models degrade without maintenance. We monitor model performance, alert on drift, and retrain where required — treating AI as a managed service, not a one-time deployment.",
  },
];

/* ─── Color map ─── */
const colorMap: Record<string, { border: string; bg: string; iconBg: string; accent: string; badge: string }> = {
  blue: {
    border: "border-blue-200",
    bg: "bg-blue-50/60",
    iconBg: "bg-blue-600",
    accent: "text-blue-700",
    badge: "bg-blue-100 text-blue-700",
  },
  indigo: {
    border: "border-indigo-200",
    bg: "bg-indigo-50/60",
    iconBg: "bg-indigo-600",
    accent: "text-indigo-700",
    badge: "bg-indigo-100 text-indigo-700",
  },
  violet: {
    border: "border-violet-200",
    bg: "bg-violet-50/60",
    iconBg: "bg-violet-600",
    accent: "text-violet-700",
    badge: "bg-violet-100 text-violet-700",
  },
  emerald: {
    border: "border-emerald-200",
    bg: "bg-emerald-50/60",
    iconBg: "bg-emerald-600",
    accent: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-700",
  },
};

export default function AISolutionsPage() {
  const [activeSector, setActiveSector] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <main className="min-h-screen" style={{ fontFamily: "var(--font-montserrat, Montserrat, sans-serif)" }}>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: "#080C14" }}>
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Dual glow — blue left, indigo right */}
        <div
          className="absolute top-1/3 -left-20 w-[600px] h-[600px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(37,99,235,0.14) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(99,102,241,0.10) 0%, transparent 65%)",
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
                Services · Artificial Intelligence
              </span>
            </div>

            <h1
              className="font-black tracking-tighter text-white leading-[0.88] mb-10"
              style={{ fontSize: "clamp(3.2rem, 9vw, 8.5rem)" }}
            >
              AI
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.22)" }}>
                Solutions.
              </span>
              <br />
              <span className="text-blue-400">Built on Infrastructure.</span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mb-6">
              Intelligent video analytics, AI-driven network management, smart
              building automation, and private LLM deployments — delivered by
              the team that builds the infrastructure they run on.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xl mb-14">
              On-premise first · Edge AI · Private cloud · No vendor lock-in
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?service=AI+Solutions"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
              >
                Start an AI Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact?service=AI+Solutions"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 font-semibold transition-all duration-300"
              >
                Book a Discovery Session
              </Link>
            </div>

            <div className="mt-20 pt-10 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { value: "4 Disciplines", label: "AI solution areas" },
                { value: "On-Premise", label: "Deployment default" },
                { value: "Edge to Cloud", label: "Architecture options" },
                { value: "Sector-Agnostic", label: "Industries served" },
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
          SOLUTION CATEGORIES — TAB EXPLORER
      ══════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-6 h-px bg-blue-600" />
            <span className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium" style={{ fontFamily: "monospace" }}>
              AI Solutions
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 mb-14">
            <h2 className="font-black tracking-tighter text-slate-900" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              Four Areas.
              <br />
              Real Results.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed self-end">
              We focus on AI deployments that produce measurable outcomes —
              reduced incidents, lower costs, faster response times, or new
              revenue insight. If the use case doesn't stack up, we say so.
            </p>
          </div>

          {/* Category tab selector */}
          <div className="flex flex-wrap gap-2 mb-10">
            {solutionCategories.map((cat, i) => {
              const Icon = cat.icon;
              const col = colorMap[cat.color];
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    activeCategory === i
                      ? `${col.iconBg} border-transparent text-white`
                      : "border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 bg-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Active category panel */}
          {solutionCategories.map((cat, i) => {
            const Icon = cat.icon;
            const col = colorMap[cat.color];
            if (i !== activeCategory) return null;
            return (
              <div key={cat.name} className={`rounded-3xl border ${col.border} ${col.bg} p-8 lg:p-12 grid lg:grid-cols-2 gap-10`}>
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${col.iconBg} flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${col.accent} mb-2 block`} style={{ fontFamily: "monospace" }}>
                    {cat.subtitle}
                  </span>
                  <h3 className="font-black tracking-tighter text-slate-900 mb-5" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
                    {cat.name}
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed mb-8">{cat.description}</p>
                  <Link
                    href={`/contact?service=AI+Solutions+-+${encodeURIComponent(cat.name)}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    Discuss This Solution
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500 mb-5" style={{ fontFamily: "monospace" }}>
                    Capabilities
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {cat.capabilities.map((cap) => (
                      <div key={cap} className="flex items-start gap-2.5 bg-white/70 rounded-xl px-3.5 py-2.5 border border-white/80">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-xs font-medium leading-snug">{cap}</span>
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
          HOW WE DEPLOY
      ══════════════════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "#F4F3EF" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-6 h-px bg-blue-600" />
            <span className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium" style={{ fontFamily: "monospace" }}>
              Our Approach
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 mb-14">
            <h2 className="font-black tracking-tighter text-slate-900" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              Discovery to
              <br />
              Live Deployment.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed self-end">
              AI projects fail at the scoping stage or the integration stage. We
              have a structured process for both — starting with a use-case
              workshop and ending with a monitored, production-grade system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deploymentSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 p-6 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="font-black text-3xl tracking-tighter text-slate-100 group-hover:text-blue-100 transition-colors duration-300"
                    style={{ fontFamily: "monospace" }}
                  >
                    {step.step}
                  </span>
                  <div className="w-px h-8 bg-slate-100" />
                  <h3 className="font-bold text-slate-900 text-sm">{step.title}</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          USE CASES BY SECTOR
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
              By Sector
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <h2 className="font-black tracking-tighter text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              Every Sector.
              <br />
              <span className="text-blue-400">Targeted Use Cases.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed self-end">
              AI delivers different value in different environments. We work
              across sectors and bring use-case knowledge that means we scope
              projects that actually solve the problem at hand.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {sectors.map((s, i) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.title}
                  onClick={() => setActiveSector(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    activeSector === i
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-white/10 text-white/50 hover:text-white/80 hover:border-white/20"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {s.title}
                </button>
              );
            })}
          </div>

          {sectors.map((s, i) => {
            const Icon = s.icon;
            if (i !== activeSector) return null;
            return (
              <div key={s.title} className="grid lg:grid-cols-2 gap-8">
                <div className="rounded-2xl border border-blue-500/20 bg-blue-600/5 p-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-black tracking-tighter text-white mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                    {s.title}
                  </h3>
                  <p className="text-slate-400 text-base leading-relaxed mb-6">{s.description}</p>
                  <Link
                    href={`/contact?service=AI+Solutions+-+${encodeURIComponent(s.title)}`}
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors"
                  >
                    Discuss this sector
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500 mb-5" style={{ fontFamily: "monospace" }}>
                    AI use cases in this sector
                  </p>
                  <div className="space-y-4">
                    {s.items.map((item) => (
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
          DEPLOYMENT PHILOSOPHY
      ══════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-slate-50 p-8 lg:p-12 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-blue-600" />
                <span className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium" style={{ fontFamily: "monospace" }}>
                  Our Deployment Philosophy
                </span>
              </div>
              <h2 className="font-black tracking-tighter text-slate-900 mb-5" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
                On-Premise First.
                <br />
                Your Data Stays Yours.
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                We default to on-premise and private cloud AI deployment. Your
                CCTV footage, network telemetry, and business data never leave
                your infrastructure without explicit architectural justification.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Where cloud AI is appropriate — for specific model types or
                data volumes — we architect hybrid solutions that keep sensitive
                data local and use cloud compute only for non-sensitive workloads.
              </p>
              <Link
                href="/contact?service=AI+Solutions"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
              >
                Discuss Your Requirements
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-400 mb-5" style={{ fontFamily: "monospace" }}>
                Deployment options we support
              </p>
              <div className="space-y-3">
                {[
                  { label: "On-Premise Edge AI", note: "Local GPU / AI appliance", tag: "Recommended" },
                  { label: "Private Cloud (Hosted VM)", note: "Your cloud tenant, your data", tag: "Common" },
                  { label: "Air-Gapped Deployment", note: "No internet connectivity required", tag: "High-Security" },
                  { label: "Hybrid Edge + Cloud", note: "Edge inference, cloud training", tag: "Scalable" },
                  { label: "Managed AI Service", note: "WCT-hosted private instance", tag: "Available" },
                ].map((d) => (
                  <div key={d.label} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{d.label}</p>
                        <p className="text-xs text-slate-400">{d.note}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full whitespace-nowrap ml-4">
                      {d.tag}
                    </span>
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
                AI Built on
                <br />
                <span className="text-blue-600">Solid Foundations.</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                AI systems are only as reliable as the infrastructure they run
                on. We design, install, and support both — which means no gap
                between the AI layer and the network, storage, and compute
                beneath it.
              </p>
              <Link
                href="/contact?service=AI+Solutions"
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
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-6 h-px bg-blue-500" />
              <span className="text-blue-400 uppercase tracking-[0.35em] text-[10px]" style={{ fontFamily: "monospace" }}>
                Start Your AI Project
              </span>
              <div className="w-6 h-px bg-blue-500" />
            </div>
            <h2 className="font-black tracking-tighter text-white mb-6" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>
              Intelligence Built
              <br />
              <span className="text-blue-400">into Your Infrastructure.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-12 max-w-xl mx-auto">
              Tell us your use case, your existing systems, and your data
              privacy requirements. We'll scope an AI solution that fits your
              infrastructure — and your budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?service=AI+Solutions"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
              >
                Start an AI Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact?service=AI+Solutions"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 font-semibold transition-all duration-300"
              >
                Book a Discovery Session
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
