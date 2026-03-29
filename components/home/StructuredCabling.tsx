'use client';

import React from 'react';
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

const StructuredCabling = ({ data }: StructuredCablingProps) => {
  const content = data;
  const { Cable } = LucideIcons;

  return (
    <section className="py-28 px-6 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-blue-600" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
              {content.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            {content.title}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Infrastructure Components */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-slate-300" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400">
              Infrastructure Components
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-3">
            {content.cablingFlow.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className={`rounded-xl px-4 py-5 text-center font-bold text-sm border-2 transition-all duration-200 ${
                  item.active
                    ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : item.highlight
                    ? 'border-blue-300 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200'
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-3">
            {content.cablingFlow.slice(5).map((item, index) => (
              <div
                key={index + 5}
                className="w-full md:w-64 rounded-xl px-4 py-5 text-center font-bold text-sm border-2 border-slate-200 bg-white text-slate-700 hover:border-blue-200 transition-all duration-200"
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Cabling types */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
          {/* Copper */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                <Cable className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Copper Cabling</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {content.copperCabling.map((item, index) => {
                const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[item.icon] || Cable;
                return (
                  <div
                    key={index}
                    className="group flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
                  >
                    <Icon className="w-7 h-7 text-blue-600 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-900 font-semibold text-sm">{item.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fiber */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                <LucideIcons.Server className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Fiber Cabling</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {content.fiberCabling.map((item, index) => {
                const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[item.icon] || LucideIcons.Server;
                return (
                  <div
                    key={index}
                    className="group flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
                  >
                    <Icon className="w-7 h-7 text-blue-600 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-slate-900 font-semibold text-sm">{item.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {content.features.map((feature, index) => {
            const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[feature.icon] || Cable;
            return (
              <div
                key={index}
                className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/8 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="flex items-center justify-between flex-wrap gap-6 pt-10 border-t border-slate-200">
          <div>
            <p className="text-slate-900 font-bold text-xl mb-1">Future-proof connectivity starts here.</p>
            <p className="text-slate-500 text-sm">Cat6A, OM4 fiber, and end-to-end structured cabling delivery.</p>
          </div>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-blue-600/30 shrink-0"
          >
            View Cabling Solutions
            <LucideIcons.ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StructuredCabling;
