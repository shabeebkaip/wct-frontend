'use client';

import React from 'react';
import MagicBento from '../MagicBento';

const BusinessVerticals = () => {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-32 bg-white">

      {/* Magic Bento Grid - Business Verticals */}
      <div className="mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Our Business Verticals
          </span>
        </h2>
        <MagicBento
          textAutoHide={false}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          disableAnimations={false}
          spotlightRadius={20}
          particleCount={15}
          enableTilt={true}
          glowColor="163, 230, 53"
          clickEffect={true}
          enableMagnetism={true}
        />
      </div>
    </section>
  );
};

export default BusinessVerticals;
