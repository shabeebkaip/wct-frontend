"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle,
  Server, Thermometer, Zap, Cable, Network,
  Camera, Lock, Flame, Monitor, BarChart3,
  ClipboardList, Wrench, PackageCheck, FlaskConical,
  FileCheck, ShieldCheck, Award, Users, Layers,
  Building2, Star,
} from "lucide-react";

/* ─── Data ─── */
const services = [
  {
    icon: ClipboardList,
    title: "Site Assessment & Design",
    description: "Full feasibility study, load analysis, floor plan, and engineering drawings before a single cable is pulled.",
    tag: "Phase 01",
  },
  {
    icon: Building2,
    title: "Server Room Construction",
    description: "Raised flooring, partition walls, ceiling tiles, cable trays, and fire-rated penetrations built to spec.",
    tag: "Phase 01",
  },
  {
    icon: Thermometer,
    title: "Precision Cooling",
    description: "CRAC and CRAH unit selection, hot/cold aisle containment, and airflow modelling for optimal PUE.",
    tag: "Phase 02",
  },
  {
    icon: Zap,
    title: "UPS & Power Distribution",
    description: "N+1 UPS configuration, PDUs, automatic transfer switches, and generator integration for zero downtime.",
    tag: "Phase 02",
  },
  {
    icon: Cable,
    title: "Structured Cabling",
    description: "Cat 6A copper and OM4/OS2 fiber backbone — installed, terminated, and certified with Fluke DSX-5000.",
    tag: "Phase 03",
  },
  {
    icon: Server,
    title: "Rack Systems & Management",
    description: "Rack layout, blanking panels, cable management arms, overhead trays, and labelling to ANSI/TIA standards.",
    tag: "Phase 03",
  },
  {
    icon: Network,
    title: "Network Infrastructure",
    description: "Core/distribution/access layer switching, firewall deployment, and structured patch panel configuration.",
    tag: "Phase 03",
  },
  {
    icon: Lock,
    title: "Access Control",
    description: "Biometric and card-based entry for server room zones with audit logging and multi-factor authentication.",
    tag: "Phase 04",
  },
  {
    icon: Camera,
    title: "CCTV & Surveillance",
    description: "IP camera coverage across entry points, aisles, and perimeter — integrated with NVR and remote monitoring.",
    tag: "Phase 04",
  },
  {
    icon: Flame,
    title: "Fire Suppression",
    description: "Clean agent (FM-200 / Novec 1230) systems designed to protect equipment without water damage.",
    tag: "Phase 04",
  },
  {
    icon: BarChart3,
    title: "Remote Monitoring (DCIM)",
    description: "Real-time dashboards for temperature, humidity, power draw, and uptime — with alerting and reporting.",
    tag: "Phase 05",
  },
  {
    icon: FileCheck,
    title: "Testing, Commissioning & Handover",
    description: "End-to-end load testing, failover verification, full as-built documentation, and staff training.",
    tag: "Phase 05",
  },
];

const process = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Consultation & Survey",
    description: "We assess your site, understand your compute requirements, redundancy needs, and compliance constraints before any design work begins.",
  },
  {
    number: "02",
    icon: Wrench,
    title: "Design & Engineering",
    description: "Detailed architectural, electrical, and mechanical drawings. Load calculations, cooling models, and single-line diagrams reviewed and signed off.",
  },
  {
    number: "03",
    icon: PackageCheck,
    title: "Procurement",
    description: "We source hardware and materials from approved vendors — avoiding grey market components and ensuring full warranty coverage.",
  },
  {
    number: "04",
    icon: Building2,
    title: "Build & Installation",
    description: "Our certified team executes the full build: civil works, power, cooling, cabling, racks, and security — under one project plan.",
  },
  {
    number: "05",
    icon: FlaskConical,
    title: "Testing & Commissioning",
    description: "Comprehensive functional testing including failover drills, cooling stress tests, cable certification, and UPS discharge tests.",
  },
  {
    number: "06",
    icon: FileCheck,
    title: "Handover & Support",
    description: "Full as-built documentation, equipment registers, test reports, and a structured knowledge transfer to your operations team.",
  },
];

const whyWCT = [
  {
    icon: ShieldCheck,
    title: "Single Point of Accountability",
    description: "One contract, one project manager, one team responsible for every discipline — from civils to commissioning. No finger-pointing between contractors.",
  },
  {
    icon: Award,
    title: "Certified Engineers",
    description: "Our engineers hold industry certifications across data center design, structured cabling, electrical systems, and network infrastructure.",
  },
  {
    icon: Layers,
    title: "Manufacturer Partnerships",
    description: "We work directly with Schneider Electric, APC, Panduit, Fluke Networks, and other tier-1 vendors — giving you access to authorised products and support.",
  },
  {
    icon: Users,
    title: "Proven Delivery Track Record",
    description: "Dozens of data centre builds and server room fit-outs across commercial, healthcare, government, and industrial sectors.",
  },
  {
    icon: Monitor,
    title: "Post-Handover Support",
    description: "We don't disappear after handover. Maintenance contracts, remote monitoring, and rapid-response SLAs available from day one.",
  },
  {
    icon: Star,
    title: "Fully Documented Delivery",
    description: "Every project is closed with as-built drawings, equipment data sheets, test certificates, and a complete O&M manual — audit ready.",
  },
];

const tagColors: Record<string, string> = {
  "Phase 01": "bg-slate-100 text-slate-600",
  "Phase 02": "bg-blue-50 text-blue-600",
  "Phase 03": "bg-indigo-50 text-indigo-600",
  "Phase 04": "bg-violet-50 text-violet-600",
  "Phase 05": "bg-sky-50 text-sky-600",
};

const tagColorsDark: Record<string, string> = {
  "Phase 01": "bg-white/10 text-slate-300",
  "Phase 02": "bg-blue-500/15 text-blue-300",
  "Phase 03": "bg-indigo-500/15 text-indigo-300",
  "Phase 04": "bg-violet-500/15 text-violet-300",
  "Phase 05": "bg-sky-500/15 text-sky-300",
};

/* ─── Page ─── */
export default function DataCenterPage() {
  const [activeProcess, setActiveProcess] = useState(0);

  return (
    <main
      className="min-h-screen"
      style={{ fontFamily: "var(--font-montserrat, Montserrat, sans-serif)" }}
    >
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ backgroundColor: "#080C14" }}
      >
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(37,99,235,0.14) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        {/* Right architectural detail */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent hidden lg:block" />
        <div className="absolute right-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block" />

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

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

            {/* Headline */}
            <h1
              className="font-black tracking-tighter text-white leading-[0.88] mb-10"
              style={{ fontSize: "clamp(3.2rem, 9vw, 8.5rem)" }}
            >
              Turnkey
              <br />
              <span
                className="text-transparent"
                style={{
                  WebkitTextStroke: "1.5px rgba(255,255,255,0.25)",
                }}
              >
                Data Center
              </span>
              <br />
              <span className="text-blue-400">Solutions.</span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mb-6">
              From blank floor plan to fully operational data centre — we design,
              build, cable, cool, secure, and commission the entire facility under
              one contract.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xl mb-14">
              One team. One accountability. Zero gaps between disciplines.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?service=Turnkey+Data+Center"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 font-semibold transition-all duration-300"
              >
                View Completed Projects
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-20 pt-10 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { value: "12", label: "Disciplines covered" },
                { value: "6", label: "Phase delivery model" },
                { value: "99.9%", label: "Uptime target" },
                { value: "1", label: "Point of contact" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="font-black tracking-tighter text-white"
                    style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mt-1"
                    style={{ fontFamily: "monospace" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHAT TURNKEY MEANS
      ══════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-6 h-px bg-blue-600" />
                <span
                  className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium"
                  style={{ fontFamily: "monospace" }}
                >
                  What Turnkey Means
                </span>
              </div>
              <h2
                className="font-black tracking-tighter text-slate-900 mb-8"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                We Handle
                <br />
                Everything.
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Most data centre projects involve half a dozen separate contractors —
                a civils firm, an MEP engineer, a cabling company, a network
                integrator, a security installer. Each with their own schedule, their
                own interfaces, and their own excuses when things don't align.
              </p>
              <p className="text-slate-600 text-base leading-relaxed mb-10">
                We eliminate that complexity. WCT delivers the complete facility
                under one project plan, one commercial agreement, and one team
                responsible from concrete to commissioning.
              </p>
              <div className="space-y-3">
                {[
                  "Civil works, raised flooring & partition walls",
                  "Power: UPS, PDUs, ATS & generator interface",
                  "Precision cooling & hot/cold aisle containment",
                  "Structured cabling, fiber backbone & rack systems",
                  "Network infrastructure, access control & CCTV",
                  "Fire suppression, DCIM & full commissioning",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual panel */}
            <div
              className="rounded-3xl p-8 lg:p-10 relative overflow-hidden"
              style={{ backgroundColor: "#080C14" }}
            >
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.6), transparent)",
                }}
              />
              <div className="relative">
                <p
                  className="text-blue-400 uppercase tracking-[0.35em] text-[10px] mb-6"
                  style={{ fontFamily: "monospace" }}
                >
                  Disciplines Covered
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Building2, label: "Civil Works" },
                    { icon: Zap, label: "Electrical" },
                    { icon: Thermometer, label: "Mechanical" },
                    { icon: Cable, label: "Cabling" },
                    { icon: Network, label: "Networking" },
                    { icon: Lock, label: "Security" },
                    { icon: Camera, label: "Surveillance" },
                    { icon: Flame, label: "Fire Systems" },
                    { icon: BarChart3, label: "Monitoring" },
                    { icon: Server, label: "Racks & Infra" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] hover:border-blue-500/30 hover:bg-white/[0.03] transition-all duration-200 group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center group-hover:bg-blue-500/25 transition-colors">
                        <Icon className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <span className="text-white/70 text-xs font-medium group-hover:text-white/90 transition-colors">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES GRID
      ══════════════════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "#F4F3EF" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-6 h-px bg-blue-600" />
              <span
                className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium"
                style={{ fontFamily: "monospace" }}
              >
                Scope of Work
              </span>
            </div>
            <h2
              className="font-black tracking-tighter text-slate-900 mb-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              12 Disciplines.
              <br />
              One Delivery.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Every component of your data centre — designed, procured, installed,
              and certified by our team under a single project plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.title}
                  className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${tagColors[svc.tag]}`}>
                      {svc.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">{svc.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{svc.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROCESS
      ══════════════════════════════════════ */}
      <section
        className="relative py-24 lg:py-32 overflow-hidden"
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
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-7">
              <div className="w-6 h-px bg-blue-500" />
              <span
                className="text-blue-400 uppercase tracking-[0.35em] text-[10px]"
                style={{ fontFamily: "monospace" }}
              >
                How We Deliver
              </span>
              <div className="w-6 h-px bg-blue-500" />
            </div>
            <h2
              className="font-black tracking-tighter text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Six Phases.
              <br />
              <span className="text-blue-400">Zero Surprises.</span>
            </h2>
          </div>

          {/* Desktop: interactive step selector */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
            {/* Step list */}
            <div className="space-y-2">
              {process.map((step, i) => {
                const Icon = step.icon;
                const active = activeProcess === i;
                return (
                  <button
                    key={step.number}
                    onClick={() => setActiveProcess(i)}
                    className={`w-full flex items-center gap-5 p-5 rounded-2xl border text-left transition-all duration-300 ${
                      active
                        ? "bg-blue-600/10 border-blue-500/40"
                        : "border-white/[0.05] hover:border-white/10 hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      active ? "bg-blue-600" : "bg-white/5"
                    }`}>
                      <Icon className={`w-5 h-5 transition-colors duration-300 ${active ? "text-white" : "text-slate-500"}`} />
                    </div>
                    <div>
                      <p
                        className="text-[10px] uppercase tracking-[0.25em] mb-0.5"
                        style={{ fontFamily: "monospace", color: active ? "#60a5fa" : "#475569" }}
                      >
                        Phase {step.number}
                      </p>
                      <p className={`font-bold text-sm transition-colors duration-300 ${active ? "text-white" : "text-white/50"}`}>
                        {step.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active step detail */}
            <div className="sticky top-32">
              {process.map((step, i) => {
                const Icon = step.icon;
                if (i !== activeProcess) return null;
                return (
                  <div key={step.number} className="rounded-3xl border border-blue-500/20 bg-blue-600/5 p-10">
                    <div
                      className="font-black tracking-tighter text-blue-500/20 leading-none mb-6"
                      style={{ fontSize: "6rem" }}
                    >
                      {step.number}
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3
                      className="font-black tracking-tighter text-white mb-5"
                      style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-slate-400 text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile: plain cards */}
          <div className="lg:hidden space-y-4">
            {process.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-blue-400 text-[10px] uppercase tracking-[0.25em]" style={{ fontFamily: "monospace" }}>
                        Phase {step.number}
                      </p>
                      <p className="text-white font-bold text-sm">{step.title}</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY WCT
      ══════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-1">
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
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Built Different.
                <br />
                Delivered
                <br />
                <span className="text-blue-600">Differently.</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                There are many companies who will quote you a data centre. There are
                fewer who have built dozens, who know where projects fail, and who
                have the teams, partnerships, and processes to prevent it.
              </p>
              <Link
                href="/contact?service=Turnkey+Data+Center"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 group"
              >
                Discuss Your Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyWCT.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group p-6 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
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
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)" }}
        />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-6 h-px bg-blue-500" />
              <span
                className="text-blue-400 uppercase tracking-[0.35em] text-[10px]"
                style={{ fontFamily: "monospace" }}
              >
                Ready to Build
              </span>
              <div className="w-6 h-px bg-blue-500" />
            </div>
            <h2
              className="font-black tracking-tighter text-white mb-6"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
            >
              Your Data Centre.
              <br />
              <span className="text-blue-400">Built Right. First Time.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-12 max-w-xl mx-auto">
              Tell us about your project — capacity requirements, timeline, and
              site constraints. We'll come back with a scoped proposal, not a
              generic brochure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?service=Turnkey+Data+Center"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
              >
                Request a Proposal
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 font-semibold transition-all duration-300"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
