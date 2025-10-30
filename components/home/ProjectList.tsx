'use client';

import React from 'react';
import { Server, Wifi, Shield, ChevronRight, Building2 } from 'lucide-react';

const ProjectList = () => {
  const projectCategories = [
    {
      title: 'DATA CENTER',
      icon: Server,
      color: 'from-blue-500 to-cyan-500',
      clients: [
        'QUARA FINANCE',
        'ROYAL COURT',
        'KKU',
        'MINISTRY OF DEFENSE',
        'GOSI',
        'MC DONALDS',
        'ABB',
        'HERFY',
        'HIDA',
        'PETRO RABIGH',
      ],
    },
    {
      title: 'ICT',
      icon: Wifi,
      color: 'from-blue-500 to-indigo-500',
      clients: [
        'MAKKAH BUS COMPANY',
        'NCMS',
        'ABB FACTORY',
        'DALLAH HOSPITAL',
        'ERICSSON',
        'SCHLUMBERGER',
        'MC DONALDS',
        'MONSHA (AL)',
        'MOBILY',
      ],
    },
    {
      title: 'SECURITY SOLUTION',
      icon: Shield,
      color: 'from-blue-500 to-purple-500',
      clients: [
        'NCMS',
        'HITACHI',
        'ABB',
        'KING KHALID MASJID',
        'SAMAMA',
      ],
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
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 rounded-full text-blue-700 dark:text-blue-400 text-sm font-semibold tracking-wide mb-6">
            <Building2 className="w-4 h-4" />
            <span>OUR PROJECTS</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-gray-100">
            Projects & Clients
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Trusted by leading organizations across multiple verticals. Our expertise spans 
            Data Centers, ICT Infrastructure, and Security Solutions.
          </p>
        </div>

        {/* Project Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {projectCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 rounded-2xl p-8 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-linear-to-br ${category.color} transition-opacity duration-500`}></div>

                {/* Header */}
                <div className="relative mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${category.color} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-gray-100 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      {category.title}
                    </h3>
                  </div>
                  <div className="h-1 w-full bg-linear-to-r from-blue-500 dark:from-blue-500/50 to-transparent rounded-full"></div>
                </div>

                {/* Clients List */}
                <div className="relative space-y-3">
                  {category.clients.map((client, clientIndex) => (
                    <div
                      key={clientIndex}
                      className="flex items-center gap-3 text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-300 group/item"
                    >
                      <ChevronRight className="w-4 h-4 text-blue-500 dark:text-blue-500/50 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 group-hover/item:translate-x-1 transition-all duration-300" />
                      <span className="text-sm font-medium">{client}</span>
                    </div>
                  ))}
                </div>

                {/* Client Count Badge */}
                <div className="relative mt-6 pt-6 border-t border-slate-200 dark:border-gray-800/50">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-gray-500 text-xs font-semibold uppercase tracking-wider">
                      Total Projects
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 text-2xl font-bold">
                      {category.clients.length}
                    </span>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-900/30 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 rounded-xl p-6 text-center hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 shadow-md dark:shadow-none">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">24+</div>
            <div className="text-slate-600 dark:text-gray-400 text-sm">Total Projects</div>
          </div>
          <div className="bg-white dark:bg-gray-900/30 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 rounded-xl p-6 text-center hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 shadow-md dark:shadow-none">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">3</div>
            <div className="text-slate-600 dark:text-gray-400 text-sm">Business Verticals</div>
          </div>
          <div className="bg-white dark:bg-gray-900/30 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 rounded-xl p-6 text-center hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 shadow-md dark:shadow-none">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">18+</div>
            <div className="text-slate-600 dark:text-gray-400 text-sm">Years Experience</div>
          </div>
          <div className="bg-white dark:bg-gray-900/30 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 rounded-xl p-6 text-center hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 shadow-md dark:shadow-none">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">100%</div>
            <div className="text-slate-600 dark:text-gray-400 text-sm">Client Satisfaction</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative bg-linear-to-r from-slate-100/80 via-blue-50/80 to-slate-100/80 dark:from-gray-900/60 dark:via-gray-800/60 dark:to-gray-900/60 backdrop-blur-sm border border-slate-200 dark:border-gray-700/50 rounded-2xl p-8 md:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-gray-100 mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-slate-600 dark:text-gray-400 mb-6 leading-relaxed max-w-2xl mx-auto">
              Let us help you build world-class infrastructure with our proven expertise 
              across Data Centers, ICT, and Security Solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white transition-colors duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40">
                Start Your Project
              </button>
              <button className="px-8 py-3 bg-slate-200 dark:bg-gray-800/80 border border-slate-300 dark:border-gray-700 hover:bg-slate-300 dark:hover:bg-gray-700/80 rounded-xl font-semibold text-slate-900 dark:text-gray-200 transition-all duration-300">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectList;
