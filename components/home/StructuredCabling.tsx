'use client';

import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';

interface StructuredCablingProps {
  data: {
    badge: string;
    title: string;
    description: string;
    cablingFlow: Array<{ label: string; active?: boolean; highlight?: boolean }>;
    copperCabling: Array<{ title: string; icon: string }>;
    fiberCabling: Array<{ title: string; subtitle: string; icon: string }>;
    features: Array<{ icon: string; title: string; description: string }>;
  };
}

const CABLE_STANDARDS = [
  'TIA-568-C.2',
  'ANSI/TIA-1005',
  'ISO/IEC 14763',
  'TIA-569-D',
];

/* ── Live Clock ── */
function LiveClock() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(now.toTimeString().slice(0, 8));
      setDate([
        String(now.getDate()).padStart(2, '0'),
        String(now.getMonth() + 1).padStart(2, '0'),
        now.getFullYear(),
      ].join('.'));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="font-mono text-slate-500 text-[11px] tabular-nums tracking-widest">
      {date}&nbsp;&nbsp;{time}
    </span>
  );
}

/* ── Cabling Infrastructure SVG Visual ── */
function CablingVisual() {
  // Topology: MDA (top) → HDA-01 + HDA-02 (mid) → 3 endpoints each (bottom)
  // Fiber backbone = blue solid lines + dots
  // Copper horizontal = amber dashed lines + dots
  const mdaCx = 220, mdaCy = 38;
  const hda1Cx = 100, hda1Cy = 135;
  const hda2Cx = 340, hda2Cy = 135;

  const ep1 = [{ x: 42, y: 218 }, { x: 100, y: 218 }, { x: 158, y: 218 }];
  const ep2 = [{ x: 282, y: 218 }, { x: 340, y: 218 }, { x: 398, y: 218 }];

  const endpoints = [
    ...ep1.map((ep, i) => ({ ...ep, type: ['WS', 'AP', 'SRV'][i], floor: '01' })),
    ...ep2.map((ep, i) => ({ ...ep, type: ['WS', 'IP-PH', 'AP'][i], floor: '02' })),
  ];

  return (
    <div className="w-full max-w-[480px] bg-white border border-slate-200 rounded-2xl shadow-xl shadow-blue-500/10 overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">
            Cabling Infrastructure Map
          </span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[10px]">
          <span className="text-blue-500 font-bold">● All Links Up</span>
          <span className="text-slate-400">WCT-CAB-01</span>
        </div>
      </div>

      {/* SVG Diagram */}
      <div className="px-3 pt-3 pb-1">
        <svg viewBox="0 0 440 300" className="w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="cab-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="cab-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.8" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <pattern id="cab-grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="0.8"/>
            </pattern>
          </defs>

          <rect width="440" height="300" fill="url(#cab-grid)"/>

          {/* ── Fiber backbone lines (MDA → HDAs) ── */}
          <line x1={mdaCx} y1={mdaCy + 19} x2={hda1Cx} y2={hda1Cy - 18}
            stroke="rgba(59,130,246,0.5)" strokeWidth="2.5"/>
          <line x1={mdaCx} y1={mdaCy + 19} x2={hda2Cx} y2={hda2Cy - 18}
            stroke="rgba(59,130,246,0.5)" strokeWidth="2.5"/>
          <text x="148" y="92" textAnchor="middle" fill="rgba(59,130,246,0.5)" fontSize="6" fontFamily="monospace" fontWeight="bold">OS2 FIBER</text>
          <text x="306" y="92" textAnchor="middle" fill="rgba(59,130,246,0.5)" fontSize="6" fontFamily="monospace" fontWeight="bold">OS2 FIBER</text>

          {/* Animated packets: MDA → HDAs */}
          <circle r="2.5" fill="#3b82f6" opacity="0.9">
            <animateMotion dur="1.6s" repeatCount="indefinite"
              path={`M ${mdaCx} ${mdaCy+19} L ${hda1Cx} ${hda1Cy-18}`}/>
          </circle>
          <circle r="2.5" fill="#3b82f6" opacity="0.9">
            <animateMotion dur="1.4s" repeatCount="indefinite"
              path={`M ${mdaCx} ${mdaCy+19} L ${hda2Cx} ${hda2Cy-18}`}/>
          </circle>
          {/* Return traffic */}
          <circle r="1.8" fill="#93c5fd" opacity="0.7">
            <animateMotion dur="2.1s" repeatCount="indefinite"
              path={`M ${hda1Cx} ${hda1Cy-18} L ${mdaCx} ${mdaCy+19}`}/>
          </circle>
          <circle r="1.8" fill="#93c5fd" opacity="0.7">
            <animateMotion dur="2.3s" repeatCount="indefinite"
              path={`M ${hda2Cx} ${hda2Cy-18} L ${mdaCx} ${mdaCy+19}`}/>
          </circle>

          {/* ── Copper horizontal lines (HDAs → Endpoints) ── */}
          {ep1.map((ep, i) => (
            <g key={`ep1-${i}`}>
              <line x1={hda1Cx} y1={hda1Cy + 18} x2={ep.x} y2={ep.y - 14}
                stroke="rgba(245,158,11,0.45)" strokeWidth="1.5" strokeDasharray="4,2.5"/>
              <circle r="2" fill="#f59e0b" opacity="0.85">
                <animateMotion dur={`${1.1 + i * 0.2}s`} repeatCount="indefinite"
                  path={`M ${hda1Cx} ${hda1Cy+18} L ${ep.x} ${ep.y-14}`}/>
              </circle>
            </g>
          ))}
          {ep2.map((ep, i) => (
            <g key={`ep2-${i}`}>
              <line x1={hda2Cx} y1={hda2Cy + 18} x2={ep.x} y2={ep.y - 14}
                stroke="rgba(245,158,11,0.45)" strokeWidth="1.5" strokeDasharray="4,2.5"/>
              <circle r="2" fill="#f59e0b" opacity="0.85">
                <animateMotion dur={`${1.2 + i * 0.2}s`} repeatCount="indefinite"
                  path={`M ${hda2Cx} ${hda2Cy+18} L ${ep.x} ${ep.y-14}`}/>
              </circle>
            </g>
          ))}
          <text x="42"  y="183" fill="rgba(245,158,11,0.5)" fontSize="5.5" fontFamily="monospace" fontWeight="bold">Cat6A</text>
          <text x="370" y="183" fill="rgba(245,158,11,0.5)" fontSize="5.5" fontFamily="monospace" fontWeight="bold">Cat6A</text>

          {/* ── MDA Box ── */}
          <g filter="url(#cab-glow)">
            <rect x={mdaCx - 70} y={mdaCy - 19} width="140" height="38" rx="7"
              fill="rgba(239,246,255,0.99)" stroke="rgba(59,130,246,0.75)" strokeWidth="1.8"/>
          </g>
          {[0,1,2,3,4,5,6,7,8].map(p => (
            <rect key={p} x={mdaCx - 60 + p * 13} y={mdaCy - 12} width="9" height="6" rx="1.5"
              fill={p < 7 ? "rgba(59,130,246,0.75)" : "rgba(74,222,128,0.9)"}/>
          ))}
          <text x={mdaCx} y={mdaCy + 11} textAnchor="middle" fill="rgba(37,99,235,0.95)" fontSize="8" fontFamily="monospace" fontWeight="bold">MDA · MAIN DIST AREA</text>
          <text x={mdaCx} y={mdaCy + 21} textAnchor="middle" fill="rgba(99,130,200,0.55)" fontSize="5.5" fontFamily="monospace">FIBER ENTRY · CORE SWITCHES · PATCH PANELS</text>
          <circle cx={mdaCx + 60} cy={mdaCy - 11} r="3" fill="rgba(74,222,128,0.9)" filter="url(#cab-glow-sm)">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite"/>
          </circle>

          {/* ── HDA Boxes ── */}
          {/* HDA-01 */}
          <g filter="url(#cab-glow-sm)">
            <rect x={hda1Cx - 56} y={hda1Cy - 18} width="112" height="36" rx="5"
              fill="rgba(239,246,255,0.98)" stroke="rgba(59,130,246,0.6)" strokeWidth="1.5"/>
          </g>
          {[0,1,2,3,4,5].map(p => (
            <rect key={p} x={hda1Cx - 46 + p * 16} y={hda1Cy - 10} width="11" height="5.5" rx="1.5"
              fill={p < 4 ? "rgba(59,130,246,0.7)" : "rgba(74,222,128,0.85)"}/>
          ))}
          <text x={hda1Cx} y={hda1Cy + 9} textAnchor="middle" fill="rgba(37,99,235,0.9)" fontSize="7.5" fontFamily="monospace" fontWeight="bold">HDA-01 · FLOOR 01</text>
          <text x={hda1Cx} y={hda1Cy + 19} textAnchor="middle" fill="rgba(100,130,200,0.55)" fontSize="5.5" fontFamily="monospace">DIST SWITCH · 24P PATCH</text>
          <circle cx={hda1Cx + 46} cy={hda1Cy - 10} r="2.5" fill="rgba(74,222,128,0.9)" filter="url(#cab-glow-sm)">
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
          </circle>

          {/* HDA-02 */}
          <g filter="url(#cab-glow-sm)">
            <rect x={hda2Cx - 56} y={hda2Cy - 18} width="112" height="36" rx="5"
              fill="rgba(239,246,255,0.98)" stroke="rgba(59,130,246,0.6)" strokeWidth="1.5"/>
          </g>
          {[0,1,2,3,4,5].map(p => (
            <rect key={p} x={hda2Cx - 46 + p * 16} y={hda2Cy - 10} width="11" height="5.5" rx="1.5"
              fill={p < 5 ? "rgba(59,130,246,0.7)" : "rgba(74,222,128,0.85)"}/>
          ))}
          <text x={hda2Cx} y={hda2Cy + 9} textAnchor="middle" fill="rgba(37,99,235,0.9)" fontSize="7.5" fontFamily="monospace" fontWeight="bold">HDA-02 · FLOOR 02</text>
          <text x={hda2Cx} y={hda2Cy + 19} textAnchor="middle" fill="rgba(100,130,200,0.55)" fontSize="5.5" fontFamily="monospace">DIST SWITCH · 24P PATCH</text>
          <circle cx={hda2Cx + 46} cy={hda2Cy - 10} r="2.5" fill="rgba(74,222,128,0.9)" filter="url(#cab-glow-sm)">
            <animate attributeName="opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite"/>
          </circle>

          {/* ── Endpoint Nodes ── */}
          {endpoints.map((ep, i) => (
            <g key={`ep-node-${i}`}>
              <rect x={ep.x - 24} y={ep.y - 14} width="48" height="30" rx="5"
                fill="rgba(248,250,252,0.98)" stroke="rgba(148,163,184,0.5)" strokeWidth="1.2"/>
              <text x={ep.x} y={ep.y - 1} textAnchor="middle" fill="rgba(51,65,85,0.85)" fontSize="7" fontFamily="monospace" fontWeight="bold">{ep.type}</text>
              <text x={ep.x} y={ep.y + 10} textAnchor="middle" fill="rgba(148,163,184,0.6)" fontSize="5.5" fontFamily="monospace">FL-{ep.floor}</text>
              <circle cx={ep.x + 19} cy={ep.y - 9} r="2" fill="rgba(74,222,128,0.85)">
                <animate attributeName="opacity" values="1;0.3;1" dur={`${1.5 + i * 0.18}s`} repeatCount="indefinite"/>
              </circle>
            </g>
          ))}

          {/* ── Legend ── */}
          <line x1="10" y1="262" x2="32" y2="262" stroke="rgba(59,130,246,0.6)" strokeWidth="2.5"/>
          <text x="36" y="266" fill="rgba(59,130,246,0.65)" fontSize="6" fontFamily="monospace">FIBER BACKBONE</text>
          <line x1="148" y1="262" x2="170" y2="262" stroke="rgba(245,158,11,0.6)" strokeWidth="1.5" strokeDasharray="4,2.5"/>
          <text x="174" y="266" fill="rgba(245,158,11,0.65)" fontSize="6" fontFamily="monospace">COPPER HORIZONTAL</text>

          {/* Corner tags */}
          <text x="8"   y="12"  fill="rgba(59,130,246,0.28)" fontSize="5.5" fontFamily="monospace">WCT · STRUCTURED CABLING</text>
          <text x="432" y="294" textAnchor="end" fill="rgba(59,130,246,0.2)" fontSize="5.5" fontFamily="monospace">TIA-568 · KSA</text>
        </svg>
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50">
        <span className="font-mono text-slate-400 text-[10px] tracking-widest">2 FLOORS · 6 ENDPOINTS · ALL LINKS UP</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span className="font-mono text-blue-600 text-[10px] tracking-widest font-bold">BW: 10GbE</span>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ── */
const StructuredCabling = ({ data }: StructuredCablingProps) => {
  const content = data;
  const { Cable } = LucideIcons;

  return (
    <section className="relative bg-white overflow-hidden">

      {/* ── Top cabling console bar ── */}
      <div className="border-b border-slate-100 bg-slate-50 px-6 lg:px-12 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="font-mono text-blue-600 text-[11px] font-bold tracking-[0.2em]">CERTIFIED</span>
            </div>
            <span className="text-slate-200 font-mono">|</span>
            <span className="font-mono text-slate-400 text-[11px] tracking-[0.15em] uppercase">
              WCT Structured Cabling Infrastructure Console
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <Cable className="w-3 h-3 text-slate-400" />
              <span className="font-mono text-slate-400 text-[11px] tracking-widest">
                {content.copperCabling.length + content.fiberCabling.length} CABLE TYPES SUPPORTED
              </span>
            </div>
            <LiveClock />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">

        {/* ── Hero layout: visual left + text right ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">

          {/* Left: CablingVisual */}
          <div className="flex justify-center lg:justify-start">
            <CablingVisual />
          </div>

          {/* Right: Text + link status panel */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-blue-600" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
                {content.badge}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.06] tracking-tight mb-5">
              {content.title}
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              {content.description}
            </p>

            {/* Link status panel */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 font-mono text-[11px] space-y-2.5">
              <p className="text-slate-400 tracking-[0.18em] mb-3 uppercase text-[10px]">Link Status</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {[
                  { label: 'Copper',  value: 'Cat6A · 10G',  ok: true  },
                  { label: 'Fiber',   value: 'OS2 · 40G',    ok: true  },
                  { label: 'Faults',  value: '0 DETECTED',   ok: null  },
                  { label: 'Cert',    value: 'TIA/ISO COMP', ok: true  },
                ].map(({ label, value, ok }) => (
                  <div key={label} className="flex items-center justify-between gap-4">
                    <span className="text-slate-400 tracking-widest uppercase">{label}</span>
                    <span className={`font-bold tracking-widest ${ok === true ? 'text-blue-600' : ok === null ? 'text-amber-500' : 'text-slate-500'}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="h-px bg-slate-200 !mt-3" />
              <div className="flex items-center gap-2 !mt-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-slate-400 tracking-[0.15em] uppercase text-[10px]">All links certified & operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Cabling Hierarchy Flow ── */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-blue-600" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
              Cabling Hierarchy
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center flex-wrap gap-y-3 justify-center">
              {content.cablingFlow.map((item, index) => (
                <React.Fragment key={index}>
                  <div className={`flex flex-col items-center gap-1.5 px-5 py-3 rounded-xl border-2 font-mono text-[11px] font-bold tracking-wide transition-all duration-200 min-w-[90px] text-center ${
                    item.active
                      ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : item.highlight
                      ? 'border-blue-300 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      item.active ? 'bg-white animate-pulse' : item.highlight ? 'bg-blue-400' : 'bg-slate-300'
                    }`} />
                    {item.label}
                  </div>
                  {index < content.cablingFlow.length - 1 && (
                    <div className="flex items-center px-1">
                      <div className="h-px w-5 bg-slate-300" />
                      <LucideIcons.ChevronRight className="w-3.5 h-3.5 text-slate-300 -mx-0.5" />
                      <div className="h-px w-5 bg-slate-300" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* ── Copper + Fiber Cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-14">

          {/* Copper */}
          <div className="group bg-white border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/8 rounded-2xl p-7 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-110 transition-transform duration-300">
                <Cable className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Copper Cabling</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-[10px] text-blue-600 font-bold tracking-widest">TIA-568-C.2</span>
                  <span className="text-slate-300 font-mono">·</span>
                  <span className="font-mono text-[10px] text-slate-400 tracking-widest">{content.copperCabling.length} TYPES</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {content.copperCabling.map((item, index) => {
                const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[item.icon] || Cable;
                return (
                  <div
                    key={index}
                    className="relative group/item flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
                  >
                    <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-slate-300 group-hover/item:border-blue-300 transition-colors" />
                    <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-slate-300 group-hover/item:border-blue-300 transition-colors" />
                    <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-slate-300 group-hover/item:border-blue-300 transition-colors" />
                    <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-slate-300 group-hover/item:border-blue-300 transition-colors" />
                    <Icon className="w-6 h-6 text-blue-600 shrink-0 group-hover/item:scale-110 transition-transform" />
                    <div>
                      <span className="text-slate-900 font-bold text-sm block leading-tight">{item.title}</span>
                      <span className="font-mono text-[9px] text-slate-400 tracking-wide">{CABLE_STANDARDS[index % CABLE_STANDARDS.length]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fiber */}
          <div className="group bg-white border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/8 rounded-2xl p-7 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-110 transition-transform duration-300">
                <LucideIcons.Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Fiber Cabling</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-[10px] text-blue-600 font-bold tracking-widest">ISO/IEC 11801</span>
                  <span className="text-slate-300 font-mono">·</span>
                  <span className="font-mono text-[10px] text-slate-400 tracking-widest">{content.fiberCabling.length} TYPES</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {content.fiberCabling.map((item, index) => {
                const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[item.icon] || LucideIcons.Server;
                return (
                  <div
                    key={index}
                    className="relative group/item flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
                  >
                    <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-slate-300 group-hover/item:border-blue-300 transition-colors" />
                    <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-slate-300 group-hover/item:border-blue-300 transition-colors" />
                    <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-slate-300 group-hover/item:border-blue-300 transition-colors" />
                    <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-slate-300 group-hover/item:border-blue-300 transition-colors" />
                    <Icon className="w-6 h-6 text-blue-600 mt-0.5 shrink-0 group-hover/item:scale-110 transition-transform" />
                    <div>
                      <p className="text-slate-900 font-bold text-sm leading-tight">{item.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Features ── */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-blue-600" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
              Why WCT Cabling
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.features.map((feature, index) => {
              const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[feature.icon] || Cable;
              return (
                <div
                  key={index}
                  className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/8 transition-all duration-300"
                >
                  <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-slate-200 group-hover:border-blue-400 transition-colors duration-300" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-slate-200 group-hover:border-blue-400 transition-colors duration-300" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-slate-200 group-hover:border-blue-400 transition-colors duration-300" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-slate-200 group-hover:border-blue-400 transition-colors duration-300" />
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] text-slate-300 font-bold tracking-widest pt-1">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-slate-900 tracking-tight mb-2">{feature.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="flex items-center justify-between flex-wrap gap-6 pt-10 border-t border-slate-100">
          <div>
            <p className="text-slate-900 font-black text-xl tracking-tight mb-1">Future-proof connectivity starts here.</p>
            <p className="text-slate-500 text-sm">Cat6A, OS2 fiber, and end-to-end structured cabling delivery.</p>
          </div>
          <Link
            href="/services/structured-cabling"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-blue-600/30 shrink-0"
          >
            View Cabling Service
            <LucideIcons.ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default StructuredCabling;
