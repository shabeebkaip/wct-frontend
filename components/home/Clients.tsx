'use client';

import React from 'react';
import Image from 'next/image';

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
    <section className="relative bg-black py-16 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-100">
            Our Valued Clients
          </h2>
          <p className="text-gray-500 text-sm">
            Trusted by leading technology brands
          </p>
        </div>

        {/* Simple Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {clientLogos.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-gray-900/20 border border-gray-800/40 rounded-lg hover:border-gray-700/60 hover:bg-gray-900/30 transition-all duration-300 group"
            >
              <Image
                src={client.src}
                alt={client.alt}
                width={100}
                height={50}
                className="object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
