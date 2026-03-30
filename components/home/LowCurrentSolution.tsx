'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';

interface LowCurrentSolutionProps {
  data: {
    badge: string;
    title: string;
    description: string;
    securityFlow?: Array<{
      step: number;
      title: string;
      description: string;
    }>;
    solutions?: Array<{
      icon: string;
      title: string;
      description: string;
      features: string[];
    }>;
    additionalSolutions?: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
}

const SYSTEM_PROTOCOLS = [
  '12V DC · RS-485 · Wiegand',
  '24V DC · Modbus · BACnet',
  '48V DC · SIP · PoE',
  '12V DC · DALI · KNX',
];
const SYSTEM_STATUSES = ['ARMED', 'MONITORING', 'ACTIVE', 'STANDBY'];

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

/* ── Building Intelligence SVG Visual ── */
function BuildingVisual() {
  const cx = 220, cy = 155, sr = 105; // center, spoke radius

  const systems = [
    { angle:   0, abbr: 'ACC',  label: 'ACCESS',  sub: 'CTRL'   },
    { angle:  60, abbr: 'FIRE', label: 'FIRE',    sub: 'ALARM'  },
    { angle: 120, abbr: 'PA',   label: 'PA',      sub: 'SYSTEM' },
    { angle: 180, abbr: 'COM',  label: 'INTER',   sub: 'COM'    },
    { angle: 240, abbr: 'BLD',  label: 'BLD',     sub: 'MGMT'   },
    { angle: 300, abbr: 'CAM',  label: 'CCTV',    sub: ''       },
  ].map((s, i) => {
    const rad = (s.angle * Math.PI) / 180;
    const nx  = cx + sr * Math.cos(rad);
    const ny  = cy + sr * Math.sin(rad);
    // push label further outward
    const lx  = cx + (sr + 28) * Math.cos(rad);
    const ly  = cy + (sr + 28) * Math.sin(rad);
    const dur = 1.2 + i * 0.15;
    return { ...s, nx, ny, lx, ly, dur };
  });

  return (
    <div className="w-full max-w-[480px] bg-white border border-slate-200 rounded-2xl shadow-xl shadow-blue-500/10 overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">
            Building Intelligence Map
          </span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[10px]">
          <span className="text-blue-500 font-bold">● Operational</span>
          <span className="text-slate-400">WCT-BMS-01</span>
        </div>
      </div>

      {/* SVG Diagram */}
      <div className="px-3 pt-3 pb-1">
        <svg viewBox="0 0 440 310" className="w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="lc-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="lc-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <pattern id="lc-grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(59,130,246,0.06)" strokeWidth="0.8"/>
            </pattern>
          </defs>

          {/* Background grid */}
          <rect width="440" height="310" fill="url(#lc-grid)"/>

          {/* Spoke connection lines */}
          {systems.map((s, i) => (
            <line
              key={`line-${i}`}
              x1={s.nx} y1={s.ny} x2={cx} y2={cy}
              stroke="rgba(59,130,246,0.2)"
              strokeWidth="1.2"
              strokeDasharray="4,3"
            />
          ))}

          {/* Animated signal dots traveling to hub */}
          {systems.map((s, i) => (
            <circle key={`dot-${i}`} r="2.2" fill="#3b82f6" opacity="0.9">
              <animateMotion
                dur={`${s.dur}s`}
                repeatCount="indefinite"
                path={`M ${s.nx} ${s.ny} L ${cx} ${cy}`}
              />
            </circle>
          ))}

          {/* Central hub — pulse rings */}
          {[0, 0.6, 1.2].map((delay, i) => (
            <circle key={`ring-${i}`} cx={cx} cy={cy} r="38" fill="none" stroke="rgba(59,130,246,0.35)" strokeWidth="1">
              <animate attributeName="r" from="38" to="70" dur="2.2s" begin={`${delay}s`} repeatCount="indefinite"/>
              <animate attributeName="stroke-opacity" from="0.45" to="0" dur="2.2s" begin={`${delay}s`} repeatCount="indefinite"/>
            </circle>
          ))}

          {/* Central hub body */}
          <circle cx={cx} cy={cy} r="38" fill="rgba(37,99,235,0.12)" stroke="rgba(59,130,246,0.8)" strokeWidth="1.8" filter="url(#lc-glow)"/>
          <circle cx={cx} cy={cy} r="28" fill="rgba(37,99,235,0.18)" stroke="rgba(59,130,246,0.5)" strokeWidth="1"/>

          {/* Hub label */}
          <text x={cx} y={cy - 6} textAnchor="middle" fill="rgba(59,130,246,1)" fontSize="8" fontFamily="monospace" fontWeight="bold">BMS</text>
          <text x={cx} y={cy + 5} textAnchor="middle" fill="rgba(59,130,246,0.75)" fontSize="6.5" fontFamily="monospace">HUB</text>
          <text x={cx} y={cy + 15} textAnchor="middle" fill="rgba(59,130,246,0.5)" fontSize="5.5" fontFamily="monospace">CENTRAL</text>

          {/* Hub status LED */}
          <circle cx={cx + 30} cy={cy - 28} r="3" fill="rgba(74,222,128,0.9)" filter="url(#lc-glow-sm)">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite"/>
          </circle>

          {/* System nodes */}
          {systems.map((s, i) => (
            <g key={`node-${i}`}>
              {/* Node body */}
              <circle cx={s.nx} cy={s.ny} r="22" fill="rgba(248,250,252,0.95)" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5" filter="url(#lc-glow-sm)"/>
              <circle cx={s.nx} cy={s.ny} r="16" fill="rgba(239,246,255,0.8)" stroke="rgba(59,130,246,0.25)" strokeWidth="1"/>

              {/* Abbreviation */}
              <text x={s.nx} y={s.ny - 2} textAnchor="middle" fill="rgba(37,99,235,0.9)" fontSize="7" fontFamily="monospace" fontWeight="bold">
                {s.abbr}
              </text>
              <text x={s.nx} y={s.ny + 6} textAnchor="middle" fill="rgba(37,99,235,0.55)" fontSize="5.5" fontFamily="monospace">
                SYS
              </text>

              {/* Status LED */}
              <circle cx={s.nx + 16} cy={s.ny - 16} r="2.5" fill="rgba(74,222,128,0.85)">
                <animate attributeName="opacity" values="1;0.3;1" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite"/>
              </circle>

              {/* Labels */}
              <text
                x={s.lx} y={s.ly - 3}
                textAnchor="middle"
                fill="rgba(51,65,85,0.85)"
                fontSize="6.5"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {s.label}
              </text>
              {s.sub && (
                <text x={s.lx} y={s.ly + 6} textAnchor="middle" fill="rgba(100,116,139,0.7)" fontSize="5.5" fontFamily="monospace">
                  {s.sub}
                </text>
              )}
            </g>
          ))}

          {/* Corner tags */}
          <text x="8"  y="12"  fill="rgba(59,130,246,0.35)" fontSize="6" fontFamily="monospace">WCT · LOW CURRENT</text>
          <text x="432" y="304" textAnchor="end" fill="rgba(59,130,246,0.25)" fontSize="5.5" fontFamily="monospace">v2.4 · KSA</text>
        </svg>
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50">
        <span className="font-mono text-slate-400 text-[10px] tracking-widest">6 SYSTEMS · ALL ZONES ACTIVE</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span className="font-mono text-blue-600 text-[10px] tracking-widest font-bold">SIGNAL: 98%</span>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ── */
const LowCurrentSolution = ({ data }: LowCurrentSolutionProps) => {
  const content = data;
  const totalZones = (content.solutions?.length ?? 0) + (content.additionalSolutions?.length ?? 0);

  return (
    <section className="relative bg-slate-50 overflow-hidden">

      {/* Decorative background — subtle radial glow + grid (like Hero) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.07),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute -left-40 top-1/2 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute -right-40 bottom-1/4 w-80 h-80 rounded-full bg-blue-100/30 blur-3xl" />
      </div>

      {/* ── Top Building Control Bar ── */}
      <div className="relative z-10 border-b border-slate-200 bg-white/80 backdrop-blur-sm px-6 lg:px-12 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="font-mono text-blue-600 text-[11px] font-bold tracking-[0.2em]">ONLINE</span>
            </div>
            <span className="text-slate-200 font-mono">|</span>
            <span className="font-mono text-slate-400 text-[11px] tracking-[0.15em] uppercase">
              WCT Building Intelligence Console
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <LucideIcons.Layers className="w-3 h-3 text-slate-400" />
              <span className="font-mono text-slate-400 text-[11px] tracking-widest">
                {totalZones} SYSTEMS INTEGRATED
              </span>
            </div>
            <LiveClock />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16">

        {/* ── Hero-style Header: text left + visual right ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-14">

          {/* Left: Text + panel status */}
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

            {/* Panel status — inline under description */}
            <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5 font-mono text-[11px] space-y-2.5">
              <p className="text-slate-400 tracking-[0.18em] mb-3 uppercase text-[10px]">Panel Status</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {[
                  { label: 'Power',  value: 'NOMINAL',           ok: true  },
                  { label: 'Zones',  value: `${totalZones} ACTIVE`, ok: true },
                  { label: 'Faults', value: '0 FOUND',           ok: null  },
                  { label: 'Comms',  value: 'LINKED',            ok: true  },
                ].map(({ label, value, ok }) => (
                  <div key={label} className="flex items-center justify-between gap-4">
                    <span className="text-slate-400 tracking-widest uppercase">{label}</span>
                    <span className={`font-bold tracking-widest ${ok === true ? 'text-blue-600' : ok === null ? 'text-amber-500' : 'text-slate-500'}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="h-px bg-slate-100 !mt-3" />
              <div className="flex items-center gap-2 !mt-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-slate-400 tracking-[0.15em] uppercase text-[10px]">All systems nominal</span>
              </div>
            </div>
          </div>

          {/* Right: Building Intelligence Visual */}
          <div className="flex justify-center lg:justify-end">
            <BuildingVisual />
          </div>
        </div>

        {/* ── Security Flow — compact strip ── */}
        {content.securityFlow && content.securityFlow.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-blue-600" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
                Multi-Layered Security Approach
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              {content.securityFlow.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 px-5 py-3.5 border-b last:border-b-0 border-slate-100 hover:bg-blue-50/40 transition-colors duration-200"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-md shadow-blue-600/25 group-hover:scale-110 transition-transform duration-200">
                    {item.step}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                    <span className="text-slate-900 font-bold text-sm shrink-0">{item.title}</span>
                    <span className="hidden md:block text-slate-300">·</span>
                    <span className="text-slate-500 text-xs leading-relaxed">{item.description}</span>
                  </div>
                  {content.securityFlow && index < content.securityFlow.length - 1 && (
                    <LucideIcons.ChevronRight className="w-4 h-4 text-slate-300 shrink-0 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Core Solutions — Zone Cards (compact) ── */}
        {content.solutions && content.solutions.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-blue-600" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
                Integrated Systems
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {content.solutions.map((solution, index) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const Icon = (LucideIcons as any)[solution.icon] || LucideIcons.Shield;
                const zoneId   = String(index + 1).padStart(2, '0');
                const protocol = SYSTEM_PROTOCOLS[index % SYSTEM_PROTOCOLS.length];
                const status   = SYSTEM_STATUSES[index % SYSTEM_STATUSES.length];

                return (
                  <div
                    key={index}
                    className="group relative border border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/8 rounded-2xl bg-white p-4 transition-all duration-300"
                  >
                    {/* Corner brackets */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-slate-200 group-hover:border-blue-400 transition-colors duration-300" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-slate-200 group-hover:border-blue-400 transition-colors duration-300" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-slate-200 group-hover:border-blue-400 transition-colors duration-300" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-slate-200 group-hover:border-blue-400 transition-colors duration-300" />

                    {/* Zone badge + status inline */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-blue-600 text-[10px] font-bold tracking-[0.2em]">ZONE {zoneId}</span>
                        <span className="text-slate-300 font-mono text-xs">│</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        <span className="font-mono text-blue-600 text-[10px] font-bold tracking-wide">{status}</span>
                      </div>
                    </div>

                    {/* Icon + title */}
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/25 group-hover:scale-110 group-hover:shadow-blue-600/40 transition-all duration-300 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-slate-900 font-bold text-sm leading-tight group-hover:text-blue-700 transition-colors">
                        {solution.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-slate-500 text-xs leading-relaxed mb-3">{solution.description}</p>

                    {/* Features as pills */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {solution.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded-full text-[10px] text-slate-600 font-medium group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-700 transition-colors"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Protocol inline */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                      <span className="font-mono text-slate-400 text-[10px] tracking-wider">{protocol}</span>
                      <LucideIcons.Wifi className="w-3 h-3 text-blue-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Additional Solutions ── */}
        {content.additionalSolutions && content.additionalSolutions.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-blue-600" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
                Additional Services
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {content.additionalSolutions.map((item, index) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const Icon = (LucideIcons as any)[item.icon] || LucideIcons.Zap;
                const extZoneId = String((content.solutions?.length ?? 0) + index + 1).padStart(2, '0');
                return (
                  <div
                    key={index}
                    className="group flex gap-4 p-4 border border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/8 rounded-2xl bg-white transition-all duration-300"
                  >
                    <div className="mt-0.5 w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:shadow-md group-hover:shadow-blue-600/30 transition-all duration-300 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="font-mono text-blue-600 text-[10px] font-bold tracking-[0.15em]">ZONE {extZoneId}</span>
                      </div>
                      <h4 className="text-slate-900 font-bold text-sm mb-1 group-hover:text-blue-700 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="flex items-center justify-between flex-wrap gap-6 pt-10 border-t border-slate-200">
          <div>
            <p className="text-slate-900 font-black text-xl tracking-tight mb-1">
              Intelligent protection for your premises.
            </p>
            <p className="text-slate-500 text-sm">
              Integrated access control, fire alarms, PA systems, and more.
            </p>
          </div>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-blue-600/30 shrink-0"
          >
            Explore Low Current
            <LucideIcons.ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default LowCurrentSolution;
