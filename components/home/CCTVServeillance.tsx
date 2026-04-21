'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';

interface CCTVSurveillanceProps {
  data?: {
    badge: string;
    title: string;
    description: string;
    solutions: Array<{
      icon: string;
      title: string;
      description: string;
      color: string;
      features: string[];
      _id?: string;
    }>;
  };
}

function LiveClock() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(now.toTimeString().slice(0, 8));
      setDate(
        [
          String(now.getDate()).padStart(2, '0'),
          String(now.getMonth() + 1).padStart(2, '0'),
          now.getFullYear(),
        ].join('.')
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-slate-500 text-xs tabular-nums tracking-widest">
      {date}&nbsp;&nbsp;{time}
    </span>
  );
}

const CCTVSurveillance = ({ data }: CCTVSurveillanceProps) => {
  if (!data) return null;

  return (
    <section className="bg-white overflow-hidden">

      {/* ── Top monitoring bar ── */}
      <div className="border-b border-slate-100 bg-slate-50 px-6 lg:px-12 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-red-500 text-[11px] font-bold tracking-[0.2em]">REC</span>
            </div>
            <span className="text-slate-200 font-mono">|</span>
            <span className="font-mono text-slate-400 text-[11px] tracking-[0.15em] uppercase">
              WCT Surveillance Management System
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="font-mono text-slate-400 text-[11px] tracking-widest">
                {data.solutions.length} FEEDS ACTIVE
              </span>
            </div>
            <LiveClock />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">

        {/* ── Section header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-blue-600" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
                {data.badge}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.06] tracking-tight mb-4">
              {data.title}
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-xl">
              {data.description}
            </p>
          </div>

          {/* Status panel — on-brand */}
          <div className="shrink-0 rounded-2xl border border-slate-200 bg-slate-50 p-5 font-mono text-[11px] space-y-2.5 min-w-[210px]">
            <p className="text-slate-400 tracking-[0.18em] mb-3 uppercase text-[10px]">System Status</p>
            {[
              { label: 'Network',  value: 'ONLINE',   ok: true },
              { label: 'Storage',  value: '73% FREE', ok: true },
              { label: 'Alerts',   value: '0 ACTIVE', ok: null },
              { label: 'Motion',   value: 'ARMED',    ok: true },
            ].map(({ label, value, ok }) => (
              <div key={label} className="flex items-center justify-between gap-6">
                <span className="text-slate-400 tracking-widest uppercase">{label}</span>
                <span className={`font-bold tracking-widest ${ok === true ? 'text-blue-600' : ok === null ? 'text-amber-500' : 'text-slate-500'}`}>
                  {value}
                </span>
              </div>
            ))}
            <div className="h-px bg-slate-200 !mt-3" />
            <div className="flex items-center gap-2 !mt-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-slate-400 tracking-[0.15em] uppercase text-[10px]">All feeds nominal</span>
            </div>
          </div>
        </div>

        {/* ── Camera feed grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {data.solutions.map((solution, index) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Icon = (LucideIcons as any)[solution.icon] || LucideIcons.Camera;
            const camId = String(index + 1).padStart(2, '0');

            return (
              <div
                key={solution._id || index}
                className="group relative border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/8 rounded-2xl overflow-hidden bg-white transition-all duration-300"
              >
                {/* Corner brackets */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-slate-200 group-hover:border-blue-400 transition-colors duration-300 rounded-tl-sm" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-slate-200 group-hover:border-blue-400 transition-colors duration-300 rounded-tr-sm" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-slate-200 group-hover:border-blue-400 transition-colors duration-300 rounded-bl-sm" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-slate-200 group-hover:border-blue-400 transition-colors duration-300 rounded-br-sm" />

                {/* Feed header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50/80">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-blue-600 text-[11px] font-bold tracking-[0.2em]">
                      CAM {camId}
                    </span>
                    <span className="text-slate-300 font-mono text-xs">│</span>
                    <span className="font-mono text-slate-400 text-[11px] tracking-wider truncate max-w-[140px] uppercase">
                      {solution.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-mono text-red-500 text-[10px] font-bold tracking-[0.2em]">REC</span>
                  </div>
                </div>

                {/* Feed body */}
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-110 transition-transform duration-300 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-bold text-base mb-1.5 leading-tight">
                        {solution.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {solution.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {solution.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs text-slate-600 font-medium group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-700 transition-colors duration-200"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Feed footer */}
                <div className="flex items-center justify-between px-5 py-2.5 border-t border-slate-100 bg-slate-50/60">
                  <span className="font-mono text-slate-400 text-[10px] tracking-widest">
                    1920×1080 · 30FPS · H.265
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="font-mono text-slate-400 text-[10px] tracking-[0.2em]">ACTIVE</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div className="flex items-center justify-between flex-wrap gap-6 pt-10 border-t border-slate-100">
          <div>
            <p className="text-slate-900 font-black text-xl tracking-tight mb-1">Secure every angle.</p>
            <p className="text-slate-500 text-sm">End-to-end surveillance design, supply, and commissioning.</p>
          </div>
          <Link
            href="/services/security"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-blue-600/30 shrink-0"
          >
            View Security Service
            <LucideIcons.ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default CCTVSurveillance;
