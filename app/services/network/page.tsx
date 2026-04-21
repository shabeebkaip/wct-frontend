"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Network,
  Shield,
  Router,
  Layers,
  Wifi,
  FileText,
  Settings,
  Monitor,
  Globe,
  Tag,
  Building2,
  Server,
  Hospital,
  GraduationCap,
  ShoppingBag,
  Award,
  Wrench,
  BookOpen,
  ChevronRight,
} from "lucide-react";

/* ─── Services Grid ─── */
const serviceItems = [
  {
    icon: Network,
    title: "Network Design & Architecture",
    detail:
      "Topology design, IP addressing scheme, VLAN planning, and redundancy paths — documented before a single cable is ordered.",
  },
  {
    icon: Layers,
    title: "Core & Distribution Switching",
    detail:
      "High-availability core switch pairs, distribution layer with inter-VLAN routing, spanning tree hardening, and uplink redundancy.",
  },
  {
    icon: Settings,
    title: "Access Layer Switching",
    detail:
      "PoE/PoE+ access switches with port security, 802.1X authentication, and 1G/10G edge port configuration for all end devices.",
  },
  {
    icon: Shield,
    title: "Firewall & Perimeter Security",
    detail:
      "Next-gen firewall deployment, zone-based policies, IPS/IDS, site-to-site and remote-access VPN — perimeter built properly.",
  },
  {
    icon: Router,
    title: "Routing & WAN Connectivity",
    detail:
      "Static and dynamic routing (OSPF/BGP), SD-WAN integration, MPLS handoff, and WAN failover with policy-based routing.",
  },
  {
    icon: Tag,
    title: "VLAN Design & Segmentation",
    detail:
      "Data, voice, management, IoT, and guest VLANs properly segmented with inter-VLAN routing policies and access control lists.",
  },
  {
    icon: Monitor,
    title: "QoS Configuration",
    detail:
      "Voice and video prioritisation, traffic shaping, CoS/DSCP marking, and queue configuration across all switching and routing tiers.",
  },
  {
    icon: Globe,
    title: "Network Management & Monitoring",
    detail:
      "SNMP, syslog, NetFlow, and dashboard setup for the operations team — full visibility from day one of go-live.",
  },
  {
    icon: Wifi,
    title: "Wi-Fi Integration",
    detail:
      "Wired infrastructure configured to support AP deployment — PoE budgeting, trunk/access port prep, and wireless controller integration.",
  },
  {
    icon: BookOpen,
    title: "Documentation & Handover",
    detail:
      "Network diagrams, IP register, VLAN register, config backups, and a comprehensive operations guide delivered at handover.",
  },
];

/* ─── Vendors ─── */
const vendors = [
  {
    name: "Cisco",
    category: "Enterprise Switching & Routing",
    description:
      "Catalyst and Nexus switching, ISR/ASR routing, IOS-XE/NX-OS — the industry benchmark for enterprise networking.",
  },
  {
    name: "Fortinet",
    category: "Next-Gen Firewall",
    description:
      "FortiGate NGFW with FortiOS, IPS/IDS, SSL inspection, SD-WAN, and centralised management via FortiManager.",
  },
  {
    name: "HPE Aruba",
    category: "Campus Switching & Wi-Fi",
    description:
      "AOS-CX switching, ClearPass for 802.1X, and Aruba Central for cloud-managed campus deployments.",
  },
  {
    name: "Juniper",
    category: "Enterprise & SP Routing",
    description:
      "EX Series switching, SRX firewalls, and Junos OS — preferred for high-reliability and service-provider grade deployments.",
  },
  {
    name: "Palo Alto",
    category: "Zero-Trust Firewall",
    description:
      "PAN-OS NGFW with App-ID, User-ID, Panorama management, and tight integration into zero-trust network architectures.",
  },
  {
    name: "Ubiquiti",
    category: "SME / Cloud-Managed",
    description:
      "UniFi switching, Dream Machine Pro, and UniFi Network — cost-effective, cloud-managed networking for SME environments.",
  },
];

/* ─── Environments ─── */
const environments = [
  {
    icon: Building2,
    title: "Corporate Office",
    description:
      "Floor-by-floor distribution switching with full VLAN separation between departments, QoS for voice and video conferencing, and wireless backhaul integration throughout.",
    items: [
      "Floor distribution switches with uplink redundancy",
      "Department VLAN segmentation and ACLs",
      "QoS for unified communications and video",
      "Wireless AP backhaul and controller integration",
      "Guest Wi-Fi isolation and captive portal",
      "Firewall with site-to-site VPN to remote offices",
    ],
  },
  {
    icon: Server,
    title: "Data Centre",
    description:
      "Spine-leaf architecture designed for east-west traffic, 10G/25G/100G fabric, redundant uplinks at every tier, and out-of-band management network for resilient operations.",
    items: [
      "Spine-leaf switching fabric design",
      "10G/25G/100G server and uplink interconnects",
      "Redundant core with MLAG/vPC bonding",
      "Out-of-band management network",
      "Storage VLAN segmentation (iSCSI/NFS)",
      "BGP/OSPF routing with route policy control",
    ],
  },
  {
    icon: Hospital,
    title: "Healthcare",
    description:
      "Clinical and administrative network separation, dedicated medical device VLANs, nurse-call system integration, and uptime-critical redundant design aligned to HL7 and HIPAA requirements.",
    items: [
      "Clinical vs. admin VLAN separation",
      "Dedicated medical device network segments",
      "Nurse-call and patient monitoring integration",
      "Redundant core switching for uptime criticality",
      "Visitor Wi-Fi isolation from clinical network",
      "Firewall and IDS for patient data protection",
    ],
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Student, staff, and IoT network segmentation across campuses, high-density wireless backhaul, content filtering integration, and a managed guest portal for BYOD access.",
    items: [
      "Student, staff, and IoT VLAN segmentation",
      "High-density wireless backhaul switching",
      "Content filtering and DNS policy integration",
      "Inter-building routed links and campus backbone",
      "Guest BYOD portal with time-limited access",
      "802.1X for staff device authentication",
    ],
  },
  {
    icon: ShoppingBag,
    title: "Retail / Hospitality",
    description:
      "POS VLAN isolation from guest and management networks, customer Wi-Fi with captive portal, CCTV backhaul, and cloud-managed switching for multi-site operators.",
    items: [
      "POS VLAN isolated from guest network",
      "Customer Wi-Fi with captive portal branding",
      "CCTV and access control backhaul VLANs",
      "Cloud-managed switching for multi-site ops",
      "PCI-DSS network segmentation guidance",
      "Centralised monitoring across all branches",
    ],
  },
];

/* ─── Why WCT ─── */
const whyWCT = [
  {
    icon: Award,
    title: "Designed First",
    description:
      "We produce full network diagrams and IP addressing schemes before any hardware is ordered. No surprises during deployment.",
  },
  {
    icon: Shield,
    title: "Vendor-Neutral",
    description:
      "We recommend the right platform for your environment and budget — not what's easiest to sell. Your needs drive the spec.",
  },
  {
    icon: FileText,
    title: "Fully Documented",
    description:
      "Every configuration backed up, every VLAN documented, every switchport labelled. Handover means you can actually operate it.",
  },
  {
    icon: Wrench,
    title: "Post-Deployment Support",
    description:
      "We don't disappear at handover. Support contracts, remote management, and on-call assistance are available from day one.",
  },
];

export default function NetworkInfrastructurePage() {
  const [activeEnv, setActiveEnv] = useState(0);

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
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(37,99,235,0.13) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        {/* Top / bottom gradient lines */}
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
              Network
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.22)" }}
              >
                Infrastructure
              </span>
              <br />
              <span className="text-blue-400">Solutions.</span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mb-4">
              Enterprise LAN design, switching, routing, firewalls — end-to-end
              network deployment built to perform from day one and scale as you
              grow.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xl mb-14">
              From IP addressing scheme to firewall policy — we design, deploy,
              and document the full stack.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?service=Network+Infrastructure"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
              >
                Design My Network
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 font-semibold transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-20 pt-10 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { value: "Layer 2 / 3", label: "Switching & routing" },
                { value: "Enterprise", label: "Grade deployment" },
                { value: "Cisco · Fortinet · HPE", label: "Vendor platforms" },
                { value: "End-to-End", label: "Design to handover" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="font-black tracking-tighter text-white"
                    style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
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
          WHAT WE DEPLOY
      ══════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-6 h-px bg-blue-600" />
            <span
              className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium"
              style={{ fontFamily: "monospace" }}
            >
              What We Deploy
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left col */}
            <div>
              <h2
                className="font-black tracking-tighter text-slate-900 mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
              >
                The Full Network Stack.
                <br />
                Designed &amp; Deployed.
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-5">
                We handle the complete LAN and WAN deployment lifecycle — from
                topology design and IP addressing through to switch configuration,
                firewall policy, and certified handover documentation.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Every engagement starts with a design. We produce network diagrams,
                VLAN registers, and IP addressing schemes before any hardware
                arrives on site. That means no surprises during deployment and a
                documented network you can actually operate and maintain.
              </p>
              <div className="space-y-3">
                {[
                  "Layer 2 and Layer 3 switching design",
                  "Firewall and perimeter security deployment",
                  "VLAN segmentation and inter-VLAN routing",
                  "WAN connectivity and failover routing",
                  "Full post-deployment documentation",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-slate-600 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right col — Network hierarchy diagram */}
            <div
              className="rounded-2xl p-8 border border-white/[0.06]"
              style={{ backgroundColor: "#080C14" }}
            >
              <p
                className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500 mb-8"
                style={{ fontFamily: "monospace" }}
              >
                Network Hierarchy
              </p>

              <div className="space-y-0">
                {/* Core Layer */}
                <div className="relative">
                  <div className="rounded-xl border border-blue-500/30 bg-blue-600/10 p-4">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                      <span
                        className="text-[10px] uppercase tracking-[0.25em] text-blue-400"
                        style={{ fontFamily: "monospace" }}
                      >
                        Core Layer
                      </span>
                    </div>
                    <p className="text-white text-sm font-semibold">
                      Core Switch
                    </p>
                    <p className="text-slate-400 text-xs mt-0.5">
                      High-availability redundant pair
                    </p>
                  </div>
                  {/* Connector */}
                  <div className="flex justify-center">
                    <div className="w-px h-6 bg-white/10" />
                  </div>
                </div>

                {/* Distribution Layer */}
                <div className="relative">
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-2 h-2 rounded-full bg-slate-400" />
                      <span
                        className="text-[10px] uppercase tracking-[0.25em] text-slate-400"
                        style={{ fontFamily: "monospace" }}
                      >
                        Distribution Layer
                      </span>
                    </div>
                    <p className="text-white text-sm font-semibold">
                      Distribution Switches
                    </p>
                    <p className="text-slate-400 text-xs mt-0.5">
                      VLAN routing, QoS policy
                    </p>
                  </div>
                  {/* Connector */}
                  <div className="flex justify-center">
                    <div className="w-px h-6 bg-white/10" />
                  </div>
                </div>

                {/* Access Layer */}
                <div className="relative">
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-2 h-2 rounded-full bg-slate-500" />
                      <span
                        className="text-[10px] uppercase tracking-[0.25em] text-slate-400"
                        style={{ fontFamily: "monospace" }}
                      >
                        Access Layer
                      </span>
                    </div>
                    <p className="text-white text-sm font-semibold">
                      Access Switches
                    </p>
                    <p className="text-slate-400 text-xs mt-0.5">
                      PoE, 1G/10G edge ports
                    </p>
                  </div>
                  {/* Connector */}
                  <div className="flex justify-center">
                    <div className="w-px h-6 bg-white/10" />
                  </div>
                </div>

                {/* End Devices */}
                <div>
                  <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-2 h-2 rounded-full bg-slate-600" />
                      <span
                        className="text-[10px] uppercase tracking-[0.25em] text-slate-500"
                        style={{ fontFamily: "monospace" }}
                      >
                        End Devices
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Workstations · IP Phones · APs · Cameras · Printers
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.06]">
                <p className="text-slate-500 text-xs leading-relaxed">
                  Every topology is documented in Visio-compatible diagrams
                  before deployment begins.
                </p>
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
          <div className="flex items-center gap-3 mb-7">
            <div className="w-6 h-px bg-blue-600" />
            <span
              className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium"
              style={{ fontFamily: "monospace" }}
            >
              What&apos;s Included
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-14">
            <h2
              className="font-black tracking-tighter text-slate-900"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Every Layer.
              <br />
              Every Component.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed self-end">
              Our network engagements cover the complete stack — switching,
              routing, security, management, and documentation. No gaps, no
              subcontracted handoffs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviceItems.map((item, i) => {
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
                      <h3 className="font-bold text-slate-900 text-sm">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          VENDORS & PLATFORMS
      ══════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-6 h-px bg-blue-600" />
            <span
              className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium"
              style={{ fontFamily: "monospace" }}
            >
              Vendors &amp; Platforms
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-14">
            <h2
              className="font-black tracking-tighter text-slate-900"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              The Platforms
              <br />
              We Deploy.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed self-end">
              We work with the tools your team already knows — or help you choose
              the right platform. Vendor-neutral advice, hands-on deployment
              expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {vendors.map((v) => (
              <div
                key={v.name}
                className="rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 p-6 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-black tracking-tighter text-slate-900 text-2xl mb-1">
                      {v.name}
                    </p>
                    <span
                      className="inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white px-2.5 py-1 rounded-full transition-colors duration-300"
                      style={{ fontFamily: "monospace" }}
                    >
                      {v.category}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-blue-600 flex items-center justify-center transition-colors duration-300 shrink-0">
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ENVIRONMENTS — interactive tabs
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
            background:
              "radial-gradient(ellipse, rgba(37,99,235,0.11) 0%, transparent 65%)",
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
              <span className="text-blue-400">Properly Networked.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed self-end">
              We deploy network infrastructure across corporate offices, data
              centres, healthcare facilities, education campuses, and retail
              environments — each with its own design requirements.
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
                  <p className="text-slate-400 text-base leading-relaxed">
                    {env.description}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
                  <p
                    className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500 mb-5"
                    style={{ fontFamily: "monospace" }}
                  >
                    What we configure &amp; deploy
                  </p>
                  <div className="space-y-4">
                    {env.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-4 pb-4 border-b border-white/[0.05] last:border-0 last:pb-0"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span className="text-white/80 text-sm font-medium">
                          {item}
                        </span>
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
                Networking Done
                <br />
                <span className="text-blue-600">Properly.</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                A poorly designed network causes performance issues, security
                gaps, and painful re-engineering down the line. We get the design
                right first — and document it so it stays right.
              </p>
              <Link
                href="/contact?service=Network+Infrastructure"
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
                    <h3 className="font-bold text-slate-900 text-sm mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.description}
                    </p>
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
              Your Network,
              <br />
              <span className="text-blue-400">Engineered Properly.</span>
            </h2>

            <p className="text-slate-400 text-base leading-relaxed mb-12 max-w-xl mx-auto">
              Tell us your environment, scale, and requirements. We&apos;ll
              produce a network design, recommend the right platform, and deliver
              a fixed-price proposal — documentation included from day one.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?service=Network+Infrastructure"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
              >
                Design My Network
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 font-semibold transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
