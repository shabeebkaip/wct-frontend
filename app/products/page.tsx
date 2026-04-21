"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle, Shield, Award, ArrowRight, Star,
  Target, Layers, FileText, Wifi, Radio, Map,
  BarChart2, ScanLine, Zap, Eye, GitBranch, Activity,
} from "lucide-react";

/* ─── Cable Certification (Fluke DSX-5000) ─── */
const cableExpertise = [
  {
    icon: Award,
    title: "Standards-Certified Testing",
    description: "Every cable run certified to TIA-568 and ISO/IEC 11801 before handover. You get a pass — or we fix it.",
  },
  {
    icon: Target,
    title: "Precision Fault Diagnosis",
    description: "Faults located to the centimetre — split pairs, shorts, impedance mismatches — not just flagged.",
  },
  {
    icon: FileText,
    title: "Full Certification Reports",
    description: "Professional LinkWare documentation delivered with every project for compliance and warranty purposes.",
  },
  {
    icon: Shield,
    title: "Warranty-Grade Results",
    description: "Results meet manufacturer criteria for extended cabling warranties — long-term protection for your investment.",
  },
  {
    icon: Layers,
    title: "End-to-End Accountability",
    description: "We design, install, and certify. One team, from cable pull to report — no gaps in responsibility.",
  },
  {
    icon: Star,
    title: "10-Gig Ready Verification",
    description: "Insertion loss, NEXT, FEXT, and return loss measured across the full bandwidth to confirm 10GBase-T performance.",
  },
];

const whatWeTestCable = [
  { label: "Category 5e", detail: "Legacy networks, VoIP, PoE devices" },
  { label: "Category 6", detail: "Gigabit Ethernet, standard office environments" },
  { label: "Category 6A", detail: "10-Gigabit, high-density data centres, hospitals" },
  { label: "PoE / PoE+", detail: "IP cameras, wireless APs, access control systems" },
  { label: "Wiremap & Continuity", detail: "Opens, shorts, split pairs, miswires" },
  { label: "Patch Panels & Outlets", detail: "Full channel and permanent link testing" },
];

/* ─── OptiFiber images ─── */
const optiFiberImages = [
  { src: "/products/optifibre/4Rzx4F4qr3-2UUDxj2vootySNejo-I3MpQvmGPuDVVN8Q0r0EGQ9UJcL2mBLvbBOKhpnmUaz7HrhBoo0Jv6gsF9znqCgPnGx-kOFsgpQrdUn1SixWhtc5W3hDpTKk6scPstHbIwlddlzUlqDIl8nqa6gpBef_1lsEE8IOdYC8zybVCwfQMz3JcAiUoamPJZ5.jpeg", alt: "Fluke OptiFiber Pro OTDR device" },
  { src: "/products/optifibre/DBYkHETYcwdddQbLldqP3aXXqEmPcXmhBTrfcSvvdR7W8mV_C1bXnarGuBmKtxhcptyqy-pMG1b893tWHa60_w9cJ52ahO7lh3C5jqsc7bEGJLl3Jw-r3B-tfp9xQhuPt200as2AXiMpaXWGRtr-wEaDlQerR6Ko8zjLOgzfaDsMvaV-wR4I4XkG5bmGD7kv.jpeg", alt: "OptiFiber Pro OTDR trace results" },
  { src: "/products/optifibre/G5Zc1_ENieKzK5wWtJU-UausVgWSSuaTYBvV3fz9alZPNqze30ZA6CbusL6qMYONpdNDpjKUcMNoW2csFroTp38LyJ6RGJx2kYLF8HhtFXx4Olv7jjYubc0xkffObFXMj27wzBf7VYvvRlmjTr06rIe40bh2hbqh5jOvXZD7Q57ZUmRNPmK-Q5Q8sP-CKff9.jpeg", alt: "OptiFiber Pro with fiber connectors" },
  { src: "/products/optifibre/TfPpu141ZGUulDVNv-fplgCoMBgetx0mLUvvimWfL6QWEKC7RIuIA2jbHFNzk_RMmdFCw3pN8uPb8oyOehpjYWewB5SkaGIjjlc_pP9L7YGo4964z6CpGReXyXh7w_IB2aZovGDjh0ZyfVPuLWrsF7QXPo6o6heYiV2i7H12Tj1mGRkRGZQBc5XZ7rgtXsuL.jpeg", alt: "OptiFiber Pro kit and accessories" },
  { src: "/products/optifibre/uk8yEm8EBUkX5QAKGY6PSvDYYYOvI4zVLx4xRrMpyQ1IoxxDQJDfdAWgW0V6Mp9a6pOHC-z-Sm-WNJeJ2wHivpSSQZIW5T4X6L6h2RXdekyTQHlnzZsYU-njyPqEw1_tk3UxvQyxY_coAhu4WEAGW19yXCX29raX4lPzEMpzUbCPY_KfDBpUxW9_msSYfCGO.jpeg", alt: "OptiFiber Pro full view" },
];

/* ─── Fiber Testing (Fluke OptiFiber Pro OTDR) ─── */
const fiberExpertise = [
  {
    icon: Eye,
    title: "OTDR Fault Location",
    description: "We pinpoint breaks, bad splices, dirty connectors, and bends along the fiber — with exact distance and loss readings for each event.",
  },
  {
    icon: GitBranch,
    title: "Singlemode & Multimode",
    description: "Full testing across OS1/OS2 singlemode and OM1–OM5 multimode fiber — covering data centres, campus backbones, and outside plant runs.",
  },
  {
    icon: Activity,
    title: "Bi-Directional Testing",
    description: "We test in both directions and average the results — the correct method for accurate, standards-compliant loss measurements.",
  },
  {
    icon: FileText,
    title: "Connector End-Face Inspection",
    description: "Every connector end-face is inspected to IEC 61300-3-35 standards before testing — because a dirty connector is the most common fiber failure.",
  },
  {
    icon: Shield,
    title: "High-Speed Fiber Certification",
    description: "We certify fiber links to support 10G, 40G, 100G, and 400G Ethernet — meeting IEEE 802.3 loss budgets for your bandwidth requirements.",
  },
  {
    icon: Award,
    title: "LinkWare Fiber Reports",
    description: "Full OTDR trace files and pass/fail certification reports, delivered digitally — audit-ready and manufacturer warranty-eligible.",
  },
];

const whatWeTestFiber = [
  { label: "OS2 Singlemode", detail: "Long-haul campus backbones, inter-building runs" },
  { label: "OM3 / OM4 Multimode", detail: "10G / 40G data centre fiber, short-haul links" },
  { label: "OM5 Wideband Multimode", detail: "100G+ data centre, SWDM applications" },
  { label: "Splice & Connector Loss", detail: "Fusion splices, mechanical splices, LC/SC/MPO connectors" },
  { label: "Outside Plant (OSP)", detail: "Underground, aerial, and direct-burial fiber routes" },
  { label: "Data Centre Fiber", detail: "Structured fiber, trunk cables, MTP/MPO systems" },
];

/* ─── Sidekick images ─── */
const sidekickImages = [
  { src: "/products/sidekick/5C7tiC4_UeNPilbgX5SdluZHnHb_ktuLIeg1QBfqssxhnmhb3dDuXcq13Gj29L6Y4_8AM4H3YjkW4aLA4DgxlvgmUlEqLRO7cAMeIx2Tuk5VfSLCeV1n_BuDIpKM7sZMwqJkQwft8qWDq8pa6XKaPPEYruGlhXgfAoI3kbfw1jiFW6SrZ4p_8nCIa-xHSDZV.jpeg", alt: "Ekahau Sidekick 2 device" },
  { src: "/products/sidekick/JrJzVnCSPOT24Po6ZjdurLvZHXm4loRgquLy56V_-ySRKC6Vm6K0-LyXGOKxT0rbNfqvyuVlPjwRKo7_QERAfd23T_pEza0tfYUCUu8NMwC83I5LuNZhGnfRLi7NW-NPO03DHznEm6TmQjs7qs_br8yo1XRTOrYKAFH1LyqBsac.jpeg", alt: "Ekahau Sidekick 2 with laptop survey" },
  { src: "/products/sidekick/JsJEXEucafdF_hLwLU9Q-ar8Jkg13G0oiTmXGVZSmxy7edDn_pgErm9ojhVJ8c4B88PJhrzHkqRPqXoKqtDt0NJnNCJGNqrGv0-ssTtUXm-aCF0h4G1P-6VwzAJu0gWUpL_aVuNaZPDJXTsW5oa0kg8amWB6pQ4YGse7lp9Fhn6iIKWX2SYh36Tylg2yLtB7.jpeg", alt: "Ekahau survey heatmap on screen" },
  { src: "/products/sidekick/KLHuq7AmtFMYynNEZeriPJOnqgTkvexeVIe4XZ8ecu89UqSFOagPXjEl4bZY95uPNAci3oqYTRIXi2tZQSeIuVQlpMe6lQ94omXYLd7YAGoHskdFY7X4FdFlXFmfFqEJlkn3h6XBUv9YDXQ5w-Ez_hXko3b4nUcD7zcT2t5hMQtE1KZwZYkCZGdGdFzsbYtm.jpeg", alt: "Ekahau Sidekick 2 close-up" },
  { src: "/products/sidekick/MMVOTt0sDxF-TQszoKJfNsdD7O23jU8SN-rWkB51_bNey_HWidbD3zquXRhorZmmOETxNb8ueerXnjcY3lOhiksBQ_GfZO7-lf0Ui3Q1XH4uuBPmXF-5barB_5JoUEPsSv2VJr-vIOUbBraSw7XJfe3qFpVmcnixt1tvZO20LD8KDIN-OJ5n6RVxp9fyVxp-.jpeg", alt: "Ekahau Sidekick 2 kit" },
];

/* ─── Wi-Fi Survey (Ekahau Sidekick 2) ─── */
const wifiExpertise = [
  {
    icon: Map,
    title: "Predictive & Physical Surveys",
    description: "We design your Wi-Fi layout before anything is installed, then validate it with a live physical survey after deployment.",
  },
  {
    icon: Radio,
    title: "Wi-Fi 6 & 6E Coverage",
    description: "Full tri-band analysis across 2.4 GHz, 5 GHz, and 6 GHz — ensuring your network is ready for the latest devices and standards.",
  },
  {
    icon: BarChart2,
    title: "Heatmap & Coverage Analysis",
    description: "Visual signal strength heatmaps show exactly where coverage is strong, weak, or overlapping — eliminating guesswork in AP placement.",
  },
  {
    icon: ScanLine,
    title: "Interference & Spectrum Analysis",
    description: "We identify sources of RF interference — neighbouring networks, microwaves, Bluetooth — and design around them.",
  },
  {
    icon: Wifi,
    title: "Capacity Planning",
    description: "We size your wireless infrastructure for real user density — not just coverage — so performance holds up under load.",
  },
  {
    icon: Zap,
    title: "Professional Survey Reports",
    description: "Every survey delivers a detailed Ekahau report with heatmaps, AP placements, channel plans, and recommendations.",
  },
];

const whatWeSurvey = [
  { label: "Office & Corporate Spaces", detail: "Dense deployments, roaming, VoIP over Wi-Fi" },
  { label: "Warehouses & Logistics", detail: "High ceilings, RF-reflective environments, barcode scanners" },
  { label: "Hospitals & Healthcare", detail: "Critical coverage, device roaming, compliance zones" },
  { label: "Hotels & Hospitality", detail: "High client density, per-room coverage, guest isolation" },
  { label: "Education Campuses", detail: "Multi-building, outdoor bridging, BYOD density" },
  { label: "Retail & Public Spaces", detail: "POS systems, digital signage, customer Wi-Fi" },
];

/* ─── DSX-5000 images ─── */
const dsxImages = [
  { src: "/products/DSX/91bGhdr5zn9GOwVHd2qw4sMl5FWlGa5_2V9zgMryWGF9Thmlj9TlfXc0fIl2JHgDO7wbYkcAujdwh6Xe2C8xvd0cGryMbm4c27WlaHQe5MXg1o1zFImM6Tp9iavZLH46GttcMEwLeiHQSBZfcUv3aUpi-V-x0kmyjstY5uRVJh4eokeoBQLLAncyqwxO1yYu.jpeg", alt: "Main unit and remote — PASS result on screen" },
  { src: "/products/DSX/95UQy-eB39wT9D-3PRYmDKaUL9H1aHuxI-3JlZtyvyg4PZOsWl8Vfa1KypwTDly1tAihBNtPTgUOxAqGxc_kb6UGXzJz9uCmTJE0enibZvJ4NjYC_VMm8pYJ-Y1ZCgIGeUE5_IF0-C37FJwQsa7RWwGtKnNdkBudsMsq8tEzhMTX2k6I-OpDhWdOTTmuUiOs.jpeg", alt: "DSX-5000 Versiv 2 front and remote unit" },
  { src: "/products/DSX/zmnpPQjJcQm-oNdygbHGs7VIyRuRp1r9ovEUNBFgyN8XAz4c60pgNrRG0HFwiuLSePWa_-1b_4HbE__LkvYkUcfSr-ZazfUswgZiZ18NXQjVe30kbV-EuFv1HIERdeTXVGhT7mrVxx12UPN2ZMz5dPB_TWHs6usjkD1nTTkVcyLpL5qzOll_IdqzSo0VOc64.jpeg", alt: "Single unit — PASS certification results list" },
  { src: "/products/DSX/2r222UDiI_YGTA7Yrq2scunbH7tyv-OclHgm-_UNJ3D0xbxr_N9qLejqUNYsgieBLa5bDvfp7I8C13T3hI7iJNOsDWO3FOMwD_RXUavg_HADgftHOgsLgYqqZSc_C-4eP9l6B-aVC-gbfA-RprGVikIkMR4BX_GU0HADUvLqTJI-7NGa_et9m-DDIBiksDqo.jpeg", alt: "Versiv units with shoulder straps" },
  { src: "/products/DSX/8Xnz2KEJUBV9UnmCO-hONEMY4fCACVrHL26Nrc6aQlGGeCdO7rLucVMhnMd8BBtCg5uZgwV5uuWNc3VgkkdEev5jFB0T6nSKQmyqjR6zDMHRAiL_4GtlhplMHToxBmNjqCYr4MWe5XpEtXwV2qJfprL86oJPsPT_AyLLovAt7YHaMG2dLhpK6ueYNAnSLAIY.jpeg", alt: "Version information screen — serial and calibration data" },
  { src: "/products/DSX/pn3CjqVWC4C-YABckY5QL0b64URcv-S7T0XOyokA3eNR6ujFLDzTEGpLGddLypwBQtTCvhSXUDpxxHhGlhAyDVV0EZ7OsYtT8gbg_MzBcEBum6bZN3TSbsimWaqcm0Bsm1cOcKZu2krC3gMkuHW3xmGx_Cd_LU9TgD2CrMgIq3KfujPlGlhA95yPDOBnNr5t.jpeg", alt: "Complete kit with fiber adapters and accessories" },
  { src: "/products/DSX/NJfYGDiBUjYuioincokHgW9zbqvdb6cmMx2pnrw7IYQtKlGAQzfcSAcCEtC9OUwEitgSKDJAZpXBoLFQtL0d9fucbFdpa-Fi2hnN9roFlBokWsx66E2lkRqClHSrgHnHTs6JFcLCnlorziS35rqsL19RWOOHc6Z0L7rnjzY3O16oATfYEabjeGmeqgdTb0gS.jpeg", alt: "Full kit — hard case, bags, cables, and all accessories" },
];

function DSXGallery() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {dsxImages.map((img, i) => (
        <div
          key={i}
          className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all duration-200"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-contain p-2"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      ))}
    </div>
  );
}

/* ─── Shared sub-components ─── */
function SectionLabel({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-6 h-px bg-blue-600" />
      <span
        className="text-blue-600 uppercase tracking-[0.35em] text-[10px] font-medium"
        style={{ fontFamily: "monospace" }}
      >
        {number} · {text}
      </span>
    </div>
  );
}

function CheckList({ items }: { items: { label: string; detail: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-300"
        >
          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-slate-900 text-sm">{item.label}</p>
            <p className="text-slate-500 text-sm mt-0.5">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExpertiseCards({ items }: { items: { icon: React.ElementType; title: string; description: string }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="group p-6 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
              <Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2 text-base">{item.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
          </div>
        );
      })}
    </div>
  );
}

function SectionCTA({ headline, sub, label, service }: { headline: string; sub: string; label: string; service: string }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
      <div className="max-w-xl">
        <p className="font-black tracking-tight text-slate-900 text-xl mb-2">{headline}</p>
        <p className="text-slate-600 text-sm leading-relaxed">{sub}</p>
      </div>
      <Link
        href={`/contact?service=${encodeURIComponent(service)}`}
        className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 whitespace-nowrap"
      >
        {label}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default function ExpertisePage() {
  return (
    <main className="min-h-screen" style={{ fontFamily: "var(--font-montserrat, Montserrat, sans-serif)" }}>

      {/* ─── Dark Hero ─── */}
      <section
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{ backgroundColor: "#080C14" }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(37,99,235,0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-blue-500" />
              <span
                className="text-blue-400 uppercase tracking-[0.35em] text-[10px]"
                style={{ fontFamily: "monospace" }}
              >
                Cable Certification · Fiber Testing · Wi-Fi Survey
              </span>
            </div>

            <h1
              className="font-black tracking-tighter text-white leading-[0.9] mb-8"
              style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}
            >
              We Test.
              <br />
              <span className="text-blue-400">We Prove It.</span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mb-6">
              From copper cable certification to fiber OTDR testing and wireless site surveys — we
              use industry-leading instruments to verify that your infrastructure performs exactly as
              it should, and give you the documentation to prove it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
              >
                Talk to Our Team
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white/75 hover:text-white hover:bg-white/5 font-semibold transition-all duration-300"
              >
                See Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          01 · COPPER CABLE CERTIFICATION
      ══════════════════════════════════════════ */}
      <section className="bg-white pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionLabel number="01" text="Copper Cable Certification" />
              <h2
                className="font-black tracking-tighter text-slate-900 mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                Certified with
                <br />
                Fluke DSX-5000
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-4">
                We certify every copper cable run to TIA-568 and ISO/IEC 11801 standards using the{" "}
                <span className="font-semibold text-slate-800">Fluke Networks DSX-5000</span> —
                the industry benchmark for cable certification. If it does not pass, we fix it.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                Results are produced in Fluke LinkWare and delivered as professional
                certification reports — recognised by manufacturers for extended warranty programmes.
              </p>
            </div>
            <CheckList items={whatWeTestCable} />
          </div>

          {/* DSX-5000 Photo Gallery */}
          <DSXGallery />

          <ExpertiseCards items={cableExpertise} />

          <SectionCTA
            headline="Need copper cabling certified?"
            sub="We'll scope your project, run every test to standard, and hand over the full certification reports — ready for audit or warranty claim."
            label="Request Cable Certification"
            service="Copper Cable Certification"
          />
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mx-8 lg:mx-24" />

      {/* ══════════════════════════════════════════
          02 · FIBER OPTIC TESTING
      ══════════════════════════════════════════ */}
      <section className="bg-white pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionLabel number="02" text="Fiber Optic Testing" />
              <h2
                className="font-black tracking-tighter text-slate-900 mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                Tested with Fluke
                <br />
                OptiFiber Pro OTDR
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-4">
                We test and certify fiber optic infrastructure using the{" "}
                <span className="font-semibold text-slate-800">Fluke Networks OptiFiber Pro OTDR</span> —
                producing detailed trace files that locate every fault, splice, and connector event
                along the entire fiber link.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                From data centre backbone fiber to outside plant runs, we deliver bi-directional
                OTDR test results with full loss budgets — certified to TIA and ISO/IEC fiber
                standards and ready for 100G+ deployments.
              </p>
            </div>
            <CheckList items={whatWeTestFiber} />
          </div>

          {/* OptiFiber Photo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {optiFiberImages.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all duration-200"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
            ))}
          </div>

          <ExpertiseCards items={fiberExpertise} />

          <SectionCTA
            headline="Need fiber optic testing or certification?"
            sub="Whether it's a new installation, a fault investigation, or a pre-handover audit — we'll test your fiber, locate every issue, and deliver OTDR reports you can rely on."
            label="Request Fiber Testing"
            service="Fiber Optic Testing"
          />
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mx-8 lg:mx-24" />

      {/* ══════════════════════════════════════════
          03 · WI-FI SURVEY & DESIGN
      ══════════════════════════════════════════ */}
      <section className="bg-white pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionLabel number="03" text="Wi-Fi Survey & Design" />
              <h2
                className="font-black tracking-tighter text-slate-900 mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                Surveyed with
                <br />
                Ekahau Sidekick 2
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-4">
                We plan and validate wireless networks using the{" "}
                <span className="font-semibold text-slate-800">Ekahau Sidekick 2</span> — a
                dedicated tri-band Wi-Fi survey instrument supporting Wi-Fi 6 and Wi-Fi 6E across
                2.4 GHz, 5 GHz, and 6 GHz.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                Every survey produces heatmaps, channel plans, AP placement recommendations, and
                interference reports — so your wireless infrastructure is built on real data,
                not assumptions.
              </p>
            </div>
            <CheckList items={whatWeSurvey} />
          </div>

          {/* Sidekick Photo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {sidekickImages.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all duration-200"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
            ))}
          </div>

          <ExpertiseCards items={wifiExpertise} />

          <SectionCTA
            headline="Need a professional Wi-Fi survey?"
            sub="Poor Wi-Fi coverage costs more than a survey. We'll assess your space, design a network that performs under real load, and validate it with measured data."
            label="Request a Wi-Fi Survey"
            service="Wi-Fi Survey & Design"
          />
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: "#080C14" }}>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-black tracking-tighter text-white mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Infrastructure You Can Trust.
            <br />
            <span className="text-blue-400">Backed by Data.</span>
          </h2>
          <p className="text-slate-400 text-base mb-10 max-w-xl mx-auto leading-relaxed">
            Copper certification, fiber testing, or wireless design — we bring the right tools and
            the expertise to use them properly. Talk to our team about your project.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
