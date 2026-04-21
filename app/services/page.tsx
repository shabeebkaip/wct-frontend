"use client";

import Link from "next/link";
import {
  ArrowRight,
  Server,
  Cable,
  Network,
  Activity,
  Wifi,
  Camera,
  Monitor,
  Sparkles,
  Shield,
  Check,
} from "lucide-react";

const SERVICES = [
  {
    icon: Server,
    number: "01",
    title: "Data Center Solutions",
    subtitle: "Turnkey · End-to-End",
    description:
      "Complete turnkey data centre and server room delivery — power distribution, precision cooling, structured cabling, rack installation, and full commissioning under one contract.",
    highlights: [
      "Power & UPS design",
      "Precision cooling",
      "Structured rack cabling",
      "Remote management",
      "Full commissioning",
      "Single point of contact",
    ],
    href: "/services/data-center",
    ctaService: "Turnkey+Data+Center",
  },
  {
    icon: Cable,
    number: "02",
    title: "Structured Cabling",
    subtitle: "Cat 5e · Cat 6 · Cat 6A · Cat 8",
    description:
      "Copper network cabling systems designed and installed to TIA-568 and ISO 11801 standards — from single-floor office fit-outs to multi-building campus installations, every link DSX-5000 certified.",
    highlights: [
      "Cat 5e / 6 / 6A / Cat 8",
      "TIA-568 & ISO 11801",
      "Patch panel & MDF/IDF builds",
      "DSX-5000 certification",
      "As-built documentation",
      "All environments",
    ],
    href: "/services/structured-cabling",
    ctaService: "Structured+Cabling",
  },
  {
    icon: Network,
    number: "03",
    title: "Fiber Optic Networks",
    subtitle: "OS1 · OS2 · OM3 · OM4 · OM5",
    description:
      "Singlemode and multimode fiber installation, fusion splicing, and OTDR certification — from campus backbone runs to high-density data centre structured fiber, every link bi-directionally tested.",
    highlights: [
      "OS1 / OS2 singlemode",
      "OM3 / OM4 / OM5 multimode",
      "Arc-fusion splicing < 0.1 dB",
      "OptiFiber Pro OTDR",
      "Bi-directional certification",
      "IEC 61300-3-35 end-face",
    ],
    href: "/services/fiber-optic",
    ctaService: "Fiber+Optic+Networks",
  },
  {
    icon: Activity,
    number: "04",
    title: "Network Infrastructure",
    subtitle: "LAN · WAN · Switching · Firewall",
    description:
      "Enterprise LAN and WAN design, switch and router configuration, firewall deployment, and SD-WAN — from single-site offices to multi-site distributed networks, properly documented and supported.",
    highlights: [
      "Enterprise LAN design",
      "Switch & router config",
      "Firewall & UTM",
      "SD-WAN deployment",
      "VLAN segmentation",
      "Network monitoring",
    ],
    href: "/services/network",
    ctaService: "Network+Infrastructure",
  },
  {
    icon: Wifi,
    number: "05",
    title: "Wi-Fi Design & Survey",
    subtitle: "Ekahau Sidekick 2 · Predictive + Active",
    description:
      "Predictive RF design, professional AP installation, and post-deployment active survey. Every engagement delivers Ekahau heatmaps, spectrum analysis, roaming validation, and a written survey report.",
    highlights: [
      "Predictive RF design",
      "Passive & active survey",
      "Spectrum analysis",
      "Roaming validation",
      "Ekahau heatmaps",
      "Written survey report",
    ],
    href: "/services/wifi",
    ctaService: "Wi-Fi+Design+%26+Survey",
  },
  {
    icon: Camera,
    number: "06",
    title: "Security Systems",
    subtitle: "CCTV · Access Control · Biometrics",
    description:
      "IP camera systems, NVR, and access control — designed, installed, and commissioned by one team. From single-door access control to multi-site camera management with full operator training.",
    highlights: [
      "IP & analogue HD cameras",
      "NVR & VMS configuration",
      "Card & biometric readers",
      "Electric locks & strikes",
      "Coverage planning",
      "Operator training",
    ],
    href: "/services/security",
    ctaService: "Security+Systems",
  },
  {
    icon: Monitor,
    number: "07",
    title: "AV & Low Current",
    subtitle: "AV · PA · BGM · PAVA · Nurse Call · IPTV",
    description:
      "Audiovisual systems, public address, background music, voice alarm, nurse call, and IPTV — designed, installed, and commissioned across commercial, healthcare, and hospitality environments.",
    highlights: [
      "Boardroom & meeting AV",
      "Digital signage",
      "PA & BGM systems",
      "BS EN 54 PAVA",
      "Nurse call systems",
      "IPTV & door entry",
    ],
    href: "/services/av-low-current",
    ctaService: "AV+%26+Low+Current+Systems",
  },
  {
    icon: Sparkles,
    number: "08",
    title: "AI Solutions",
    subtitle: "Edge AI · On-Premise · Private LLM",
    description:
      "Intelligent video analytics, AI-driven network management, smart building automation, and private LLM deployments — built on the infrastructure we install and maintain. On-premise first.",
    highlights: [
      "Intelligent video analytics",
      "AI network management",
      "Smart building AI",
      "Private LLM deployment",
      "On-premise first",
      "Model monitoring",
    ],
    href: "/services/ai-solutions",
    ctaService: "AI+Solutions",
  },
  {
    icon: Shield,
    number: "09",
    title: "Cable Certification",
    subtitle: "Copper · Fiber · Wi-Fi",
    description:
      "Third-party cable certification using Fluke DSX-5000, OptiFiber Pro OTDR, and Ekahau Sidekick 2 — manufacturer-warranty-grade reports, pass/fail against TIA and ISO standards.",
    highlights: [
      "Fluke DSX-5000 copper",
      "OptiFiber Pro OTDR",
      "Ekahau Wi-Fi survey",
      "TIA & ISO pass/fail",
      "LinkWare reports",
      "Manufacturer warranty",
    ],
    href: "/products",
    ctaService: "Cable+Certification",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Grid + glow — matches home hero exactly */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.3),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="relative container mx-auto px-6 lg:px-12 pt-40 pb-24">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/8 border border-white/10">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-blue-400">
                What We Offer
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.06] tracking-tight mb-4">
                Our
              </h1>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.06] tracking-tight mb-6 bg-linear-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
                Services.
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
                <span>Data Centers</span><span className="text-blue-700">•</span>
                <span>Cabling</span><span className="text-blue-700">•</span>
                <span>Fiber</span><span className="text-blue-700">•</span>
                <span>Wi-Fi</span><span className="text-blue-700">•</span>
                <span>Security</span><span className="text-blue-700">•</span>
                <span>AI</span>
              </div>
            </div>
            <div className="lg:pb-2">
              <p className="text-base text-slate-400 leading-relaxed mb-8">
                Nine service areas delivered by one in-house team — from
                structured cabling and fiber optic networks to AI solutions
                and turnkey data centres. Every service below includes a direct
                quote request.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-blue-600/30"
                >
                  Discuss Your Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/30 font-semibold text-sm transition-colors duration-200"
                >
                  View Projects
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="bg-slate-50">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">

          {/* Section label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/30">
              <Server className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
              All Services
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.06] tracking-tight">
              Everything WCT delivers.
            </h2>
            <p className="text-slate-500 text-base leading-relaxed max-w-md">
              Each service can be scoped and quoted independently, or
              combined into a single coordinated engagement.
            </p>
          </div>

          {/* 2-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.href}
                  className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden"
                >
                  {/* Hover left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top rounded-r-full" />

                  {/* Ghost number */}
                  <div className="absolute bottom-3 right-6 text-8xl font-black text-slate-100 group-hover:text-blue-50 transition-colors select-none leading-none">
                    {s.number}
                  </div>

                  <div className="relative p-7 flex flex-col gap-5 flex-1">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/25 group-hover:scale-110 group-hover:shadow-blue-600/40 transition-all duration-300 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900 leading-snug tracking-tight mb-1.5 group-hover:text-blue-700 transition-colors duration-200">
                          {s.title}
                        </h3>
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                          {s.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-500 text-sm leading-relaxed">{s.description}</p>

                    {/* Highlights grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5">
                      {s.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-blue-600/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 text-blue-600" />
                          </div>
                          <span className="text-slate-500 text-xs">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-slate-100" />

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/contact?service=${s.ctaService}`}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors duration-200 shadow-md shadow-blue-600/25"
                      >
                        Get a Quote
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={s.href}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700 font-semibold text-sm transition-colors duration-200 group/btn"
                      >
                        View Service
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </section>

      {/* ── BOTTOM CTA — dark strip matching home page features strip ── */}
      <section className="bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <div className="relative rounded-2xl bg-slate-900 overflow-hidden">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative p-10 lg:p-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-blue-500" />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400">
                    Multi-Service Projects
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-3">
                  Most projects combine
                  <br />
                  <span className="text-blue-400">multiple service areas.</span>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                  Tell us what you're trying to achieve and we'll scope the
                  right combination — cabling, fiber, Wi-Fi, security, AV, and
                  AI as one coordinated engagement with a single point of contact.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-blue-600/30 whitespace-nowrap"
                >
                  Talk to Our Team
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/30 font-semibold text-sm transition-colors duration-200 whitespace-nowrap"
                >
                  View Our Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
