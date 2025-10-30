'use client';

import Link from 'next/link';
import { Cable, Network, Server, Workflow } from 'lucide-react';

const StructuredCabling = () => {
  const cablingFlow = [
    { label: 'Structured cabling', active: true },
    { label: 'Backbone Cabling' },
    { label: 'Main Cross-connect (MC)' },
    { label: 'Interbuilding Backbone Cable', highlight: true },
    { label: 'Telecommunications Closet (TS)' },
    { label: 'Equipment Room (ER)' },
    { label: 'Entrance Facility (EF)' },
  ];

  const copperCabling = [
    { title: 'UTP Cabling', icon: Cable },
    { title: 'STP Cabling', icon: Network },
    { title: 'FTP Cabling', icon: Cable },
    { title: 'Coaxial Cabling', icon: Network },
  ];

  const fiberCabling = [
    { title: 'Single Mode', subtitle: 'Indoor & Outdoor', icon: Server },
    { title: 'Multi Mode', subtitle: 'Indoor & Outdoor', icon: Server },
  ];

  const features = [
    {
      icon: Workflow,
      title: 'EIA/TIA-568A Standards',
      description: 'Following international standards for structured cabling infrastructure design and implementation',
    },
    {
      icon: Cable,
      title: 'Complete Infrastructure',
      description: 'End-to-end cabling solutions from backbone to workstation connectivity',
    },
    {
      icon: Network,
      title: 'Scalable Design',
      description: 'Future-proof infrastructure that grows with your business requirements',
    },
    {
      icon: Server,
      title: 'High Performance',
      description: 'Optimized for speed, reliability, and maximum data throughput',
    },
  ];

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
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 rounded-full text-blue-700 dark:text-blue-400 text-sm font-semibold tracking-wide mb-6">
            <Cable className="w-4 h-4" />
            <span>STRUCTURED CABLING</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-gray-100">
            Structured Cabling Solutions
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            We Care Tech has a concrete design approach for Structured Cabling Solutions. We follow EIA/TIA-568A Standards. 
            Our design considerations always take into consideration all the sub-elements in the infrastructure.
          </p>
        </div>

        {/* Cabling Flow Diagram */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-gray-100 text-center mb-8">Infrastructure Components</h3>
          
          {/* Top Row - 5 components */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
            {cablingFlow.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className={`
                  bg-white dark:bg-gray-900/50 border-2 rounded-xl p-4 md:p-6 
                  transition-all duration-300 backdrop-blur-sm
                  ${item.active ? 'border-blue-500 dark:border-blue-500/60 bg-blue-100 dark:bg-blue-500/10 shadow-lg dark:shadow-none' : 
                    item.highlight ? 'border-blue-400 dark:border-blue-400/60 bg-blue-50 dark:bg-blue-400/10 shadow-md dark:shadow-none' : 
                    'border-slate-300 dark:border-gray-700/50 hover:border-blue-400 dark:hover:border-blue-500/40'}
                  hover:bg-slate-50 dark:hover:bg-gray-800/50
                `}
              >
                <h4 className={`
                  text-sm md:text-base font-bold text-center
                  ${item.active || item.highlight ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-gray-300'}
                `}>
                  {item.label}
                </h4>
              </div>
            ))}
          </div>

          {/* Bottom Row - 2 components centered */}
          <div className="flex justify-center gap-4">
            {cablingFlow.slice(5).map((item, index) => (
              <div
                key={index + 5}
                className="bg-white dark:bg-gray-900/50 border-2 border-slate-300 dark:border-gray-700/50 rounded-xl p-4 md:p-6 hover:border-blue-400 dark:hover:border-blue-500/40 transition-all duration-300 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-gray-800/50 w-full md:w-64 shadow-md dark:shadow-none"
              >
                <h4 className="text-sm md:text-base font-bold text-center text-slate-700 dark:text-gray-300">
                  {item.label}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Cabling Types Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Copper Cabling */}
          <div className="bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 rounded-2xl p-8 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 shadow-lg dark:shadow-none">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
                <Cable className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-gray-100">Copper Cabling</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {copperCabling.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-slate-50 dark:bg-gray-800/40 border border-slate-200 dark:border-gray-700/50 rounded-xl p-4 hover:border-blue-400 dark:hover:border-blue-500/40 hover:bg-slate-100 dark:hover:bg-gray-800/60 transition-all duration-300 group"
                  >
                    <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                    <h4 className="text-slate-900 dark:text-white font-bold text-sm">{item.title}</h4>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fiber Cabling */}
          <div className="bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 rounded-2xl p-8 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 shadow-lg dark:shadow-none">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
                <Server className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-gray-100">Fiber Cabling</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fiberCabling.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-slate-50 dark:bg-gray-800/40 border border-slate-200 dark:border-gray-700/50 rounded-xl p-4 hover:border-blue-400 dark:hover:border-blue-500/40 hover:bg-slate-100 dark:hover:bg-gray-800/60 transition-all duration-300 group"
                  >
                    <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                    <h4 className="text-slate-900 dark:text-white font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-slate-600 dark:text-gray-400 text-xs">{item.subtitle}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 rounded-2xl p-6 hover:border-slate-300 dark:hover:border-gray-700/80 transition-all duration-500 hover:bg-slate-50 dark:hover:bg-gray-800/50 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 bg-linear-to-br from-blue-500 to-cyan-500 transition-opacity duration-500"></div>
                
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-500/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100 mb-3 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="relative bg-linear-to-r from-slate-100/80 via-blue-50/80 to-slate-100/80 dark:from-gray-900/60 dark:via-gray-800/60 dark:to-gray-900/60 backdrop-blur-sm border border-slate-200 dark:border-gray-700/50 rounded-2xl p-8 md:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-gray-100 mb-4">
              Need a Structured Cabling Solution?
            </h3>
            <p className="text-slate-600 dark:text-gray-400 mb-6 leading-relaxed max-w-2xl mx-auto">
              Our expert team designs and implements comprehensive structured cabling infrastructure 
              that meets international standards and ensures optimal performance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white transition-colors duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
              >
                Request Quote
              </Link>
              <Link
                href="/projects"
                className="inline-block px-8 py-3 bg-slate-200 dark:bg-gray-800/80 border border-slate-300 dark:border-gray-700 hover:bg-slate-300 dark:hover:bg-gray-700/80 rounded-xl font-semibold text-slate-900 dark:text-gray-200 transition-all duration-300"
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StructuredCabling;
