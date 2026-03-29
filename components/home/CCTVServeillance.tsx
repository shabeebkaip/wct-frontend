'use client';

import React from 'react';
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

const CCTVSurveillance = ({ data }: CCTVSurveillanceProps) => {
  if (!data) return null;

  return (
    <section className="py-28 px-6 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-blue-600" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
              {data.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            {data.title}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {data.solutions.map((solution, index) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Icon = (LucideIcons as any)[solution.icon] || LucideIcons.Camera;
            return (
              <div
                key={solution._id || index}
                className="group bg-white border border-slate-200 rounded-2xl p-7 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/8 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3">{solution.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{solution.description}</p>

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
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="flex items-center justify-between flex-wrap gap-6 pt-10 border-t border-slate-200">
          <div>
            <p className="text-slate-900 font-bold text-xl mb-1">Secure every angle.</p>
            <p className="text-slate-500 text-sm">End-to-end surveillance design, supply, and commissioning.</p>
          </div>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-blue-600/30 shrink-0"
          >
            View CCTV Solutions
            <LucideIcons.ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CCTVSurveillance;
