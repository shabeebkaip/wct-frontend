'use client';

import React from 'react';
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

const LowCurrentSolution = ({ data }: LowCurrentSolutionProps) => {
  const content = data;

  return (
    <section className="py-28 px-6 bg-white overflow-hidden">
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

        {/* Security Flow */}
        {content.securityFlow && content.securityFlow.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-slate-300" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400">
                Multi-Layered Security Approach
              </span>
            </div>
            <div className="flex flex-col md:flex-row items-stretch gap-0">
              {content.securityFlow.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="flex-1 bg-slate-950 rounded-2xl p-6 group hover:bg-blue-950 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm mb-4 shadow-lg shadow-blue-600/30">
                      {item.step}
                    </div>
                    <h4 className="text-white font-bold text-base mb-2">{item.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
                  </div>
                  {content.securityFlow && index < content.securityFlow.length - 1 && (
                    <div className="hidden md:flex items-center px-2 shrink-0">
                      <LucideIcons.ChevronRight className="w-5 h-5 text-slate-300" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Main Solutions Grid */}
        {content.solutions && content.solutions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {content.solutions.map((solution, index) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Icon = (LucideIcons as any)[solution.icon] || LucideIcons.Shield;
              return (
                <div
                  key={index}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/8 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{solution.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{solution.description}</p>
                  <div className="space-y-1.5">
                    {solution.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-500">
                        <div className="w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Additional Solutions */}
        {content.additionalSolutions && content.additionalSolutions.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-slate-300" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400">
                Additional Services
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {content.additionalSolutions.map((item, index) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const Icon = (LucideIcons as any)[item.icon] || LucideIcons.Zap;
                return (
                  <div
                    key={index}
                    className="group flex gap-5 p-6 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="mt-0.5 w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom CTA bar */}
        <div className="flex items-center justify-between flex-wrap gap-6 pt-10 border-t border-slate-100">
          <div>
            <p className="text-slate-900 font-bold text-xl mb-1">Intelligent protection for your premises.</p>
            <p className="text-slate-500 text-sm">Integrated access control, fire alarms, PA systems, and more.</p>
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
