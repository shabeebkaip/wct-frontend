'use client';

import React from 'react';
import { Users } from 'lucide-react';
import LogoCard from '../shared/LogoCard';

interface ClientsProps {
  data?: {
    badge: string;
    title: string;
    description: string;
    logos: Array<{ src: string; alt: string; _id?: string }>;
  } | null;
}

const Clients = ({ data }: ClientsProps) => {
  const content = data || {
    badge: "OUR CLIENTS",
    title: "Trusted by Industry Leaders",
    description: "We partner with leading organizations across multiple sectors to deliver world-class infrastructure solutions.",
    logos: []
  };
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
            <Users className="w-4 h-4" />
            <span>{content.badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-gray-100">
            {content.title}
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Clients Grid */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {content.logos.map((client, index) => (
            <div className="w-[calc(33.333%-0.5rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(16.666%-0.67rem)]" key={client._id || index}>
              <LogoCard
                
                src={client.src}
                alt={client.alt}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
