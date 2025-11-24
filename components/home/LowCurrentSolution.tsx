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
  const { Zap, ArrowRight } = LucideIcons;
  
  return (
    <section className="relative bg-linear-to-b from-white via-slate-50 to-blue-50 dark:from-black dark:via-gray-900 dark:to-black py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)',
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 rounded-full text-blue-700 dark:text-blue-400 text-sm font-semibold tracking-wide mb-6">
            <Zap className="w-4 h-4" />
            <span>{content.badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-gray-100">
            {content.title}
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            {content.description}
          </p>
        </div>

        {/* Security Flow Diagram */}
        {content.securityFlow && content.securityFlow.length > 0 && (
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-gray-100 text-center mb-8">Multi-Layered Security Approach</h3>
          <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {content.securityFlow.map((item, index) => (
              <React.Fragment key={index}>
                {/* Flow Card */}
                <div className="relative group">
                  <div className="bg-white dark:bg-gray-900/50 border-2 border-blue-400 dark:border-blue-500/40 rounded-2xl p-6 min-w-[200px] backdrop-blur-sm group-hover:border-blue-500 dark:group-hover:border-blue-400/60 transition-all duration-300 shadow-lg dark:shadow-none">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold mb-3">
                        {item.step}
                      </div>
                      <h4 className="text-slate-900 dark:text-white font-bold text-sm mb-2">{item.title}</h4>
                      <p className="text-slate-600 dark:text-gray-400 text-xs">{item.description}</p>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                {content.securityFlow && index < content.securityFlow.length - 1 && (
                  <ArrowRight className="hidden md:block w-8 h-8 text-blue-500 dark:text-blue-400/50 mx-2 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        )}

        {/* Main Solutions Grid */}
        {content.solutions && content.solutions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {content.solutions.map((solution, index) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Icon = (LucideIcons as any)[solution.icon] || LucideIcons.Shield;
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 rounded-2xl p-6 hover:border-slate-300 dark:hover:border-gray-700/80 transition-all duration-500 hover:bg-slate-50 dark:hover:bg-gray-800/50 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 bg-linear-to-br from-blue-500 to-cyan-500 transition-opacity duration-500"></div>
                
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-500/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100 mb-3 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {solution.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {solution.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {solution.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-500/50"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            );
          })}
        </div>
        )}

        {/* Additional Solutions */}
        {content.additionalSolutions && content.additionalSolutions.length > 0 && (
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-gray-100 text-center mb-8">Additional Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.additionalSolutions.map((item, index) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Icon = (LucideIcons as any)[item.icon] || LucideIcons.Zap;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900/30 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 rounded-xl p-6 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-gray-800/40 shadow-md dark:shadow-none"
                >
                  <Icon className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="text-lg font-bold text-slate-900 dark:text-gray-100 mb-2">{item.title}</h4>
                  <p className="text-slate-600 dark:text-gray-400 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        )}

        {/* CTA Section */}
        <div className="relative bg-linear-to-r from-slate-100/80 via-blue-50/80 to-slate-100/80 dark:from-gray-900/60 dark:via-gray-800/60 dark:to-gray-900/60 backdrop-blur-sm border border-slate-200 dark:border-gray-700/50 rounded-2xl p-8 md:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-gray-100 mb-4">
              Ready to Secure Your Facility?
            </h3>
            <p className="text-slate-600 dark:text-gray-400 mb-6 leading-relaxed max-w-2xl mx-auto">
              Our expert team designs comprehensive low current solutions tailored to your 
              security requirements, ensuring complete protection and peace of mind.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white transition-colors duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
              >
                Request Consultation
              </Link>
              <a
                href="/GFS PROFILE.pptx"
                download="WeCare-Tech-Company-Profile.pptx"
                className="inline-block px-8 py-3 bg-slate-200 dark:bg-gray-800/80 border border-slate-300 dark:border-gray-700 hover:bg-slate-300 dark:hover:bg-gray-700/80 rounded-xl font-semibold text-slate-900 dark:text-gray-200 transition-all duration-300"
              >
                Download Brochure
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default LowCurrentSolution;