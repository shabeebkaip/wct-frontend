'use client';

import React from 'react';
import Image from 'next/image';
import { Users } from 'lucide-react';

const Clients = () => {
  const clientLogos = [
    {
      src: '/clients/hikvision.png',
      alt: 'Hikvision',
    },
    {
      src: '/clients/bosch.png',
      alt: 'Bosch',
    },
    {
      src: '/clients/axis-communications.jpg',
      alt: 'Axis Communications',
    },
    {
      src: '/clients/samsung.png',
      alt: 'Samsung',
    },
    {
      src: '/clients/american-dynamics.png',
      alt: 'American Dynamics',
    },
    {
      src: '/clients/nitgen.jpg',
      alt: 'Nitgen',
    },
  ];

  return (
    <section className="relative bg-linear-to-b from-black via-gray-900 to-black py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)',
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-semibold tracking-wide mb-6">
            <Users className="w-4 h-4" />
            <span>OUR PARTNERS</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-100">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Partnering with world-renowned technology brands to deliver cutting-edge solutions
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {clientLogos.map((client, index) => (
            <div
              key={index}
              className="group relative bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 flex items-center justify-center aspect-square"
            >
              {/* Background glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 bg-linear-to-br from-blue-500 to-cyan-500 transition-opacity duration-500 rounded-2xl"></div>
              
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={client.src}
                  alt={client.alt}
                  width={120}
                  height={60}
                  className="object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                />
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Stats or Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl">
            <div>
              <div className="text-3xl font-bold text-blue-400">6+</div>
              <div className="text-gray-400 text-sm">Technology Partners</div>
            </div>
            <div className="w-px h-12 bg-gray-700/50"></div>
            <div>
              <div className="text-3xl font-bold text-blue-400">100+</div>
              <div className="text-gray-400 text-sm">Joint Projects</div>
            </div>
            <div className="w-px h-12 bg-gray-700/50"></div>
            <div>
              <div className="text-3xl font-bold text-blue-400">18+</div>
              <div className="text-gray-400 text-sm">Years Partnership</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
