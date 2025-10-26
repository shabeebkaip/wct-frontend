'use client';

import React from 'react';
import LogoLoop from '../LogoLoop';

const Clients = () => {
  const clientLogos = [
    {
      src: '/clients/hikvision.png',
      alt: 'Hikvision',
      width: 80,
      height: 40,
    },
    {
      src: '/clients/bosch.png',
      alt: 'Bosch',
      width: 80,
      height: 40,
    },
    {
      src: '/clients/axis-communications.jpg',
      alt: 'Axis Communications',
      width: 80,
      height: 40,
    },
    {
      src: '/clients/samsung.png',
      alt: 'Samsung',
      width: 80,
      height: 40,
    },
    {
      src: '/clients/american-dynamics.png',
      alt: 'American Dynamics',
      width: 80,
      height: 40,
    },
    {
      src: '/clients/nitgen.jpg',
      alt: 'Nitgen',
      width: 80,
      height: 40,
    },
  ];

  return (
    <section className="relative bg-black py-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-100">
            Trusted By Industry Leaders
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Partnering with world-class technology providers to deliver excellence
          </p>
        </div>

        {/* Logo Loop */}
        <div className="relative">
          <LogoLoop
            logos={clientLogos}
            speed={30}
            direction="left"
            logoHeight={50}
            gap={50}
            pauseOnHover={true}
            fadeOut={true}
            fadeOutColor="rgba(0, 0, 0, 1)"
            scaleOnHover={true}
            ariaLabel="Our trusted technology partners"
            className="py-8"
          />
        </div>
      </div>
    </section>
  );
};

export default Clients;
