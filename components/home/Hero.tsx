'use client';

import React from 'react';
import Link from 'next/link';
import DotGrid from '../DotGrid';
import ShinyText from '../ShinyText';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-900 via-black to-gray-900">
      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-b from-transparent to-black z-5 pointer-events-none"></div>
      
      {/* DotGrid Background - Interactive dots */}
      <div className="absolute inset-0 z-0 opacity-60">
        <DotGrid
          dotSize={2}
          gap={40}
          baseColor="#4b5563"
          activeColor="#60a5fa"
          proximity={120}
          speedTrigger={80}
          shockRadius={200}
          shockStrength={3}
          maxSpeed={3000}
          resistance={600}
          returnDuration={2}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32 text-center">
        {/* Badge */}
        <div className="inline-block relative mb-12 group">
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/40 via-purple-500/40 to-cyan-500/40 blur-2xl animate-pulse"></div>
          <div className="relative flex items-center gap-4 px-8 py-4 bg-black/80 backdrop-blur-md border border-gray-700/60 rounded-full shadow-2xl hover:shadow-blue-500/30 transition-all duration-300">
            <div className="relative">
              <svg className="w-6 h-6 text-blue-400 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div className="absolute inset-0 bg-blue-400/60 blur-md -z-10"></div>
            </div>
            <span className="text-sm font-mono tracking-wider text-gray-200 font-bold drop-shadow-sm">
              18+ YEARS • ICT EXCELLENCE • EST. 2006
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8 tracking-normal">
          <div className="relative">
            <ShinyText 
              text="Next-Gen Data Center & " 
              disabled={false} 
              speed={3} 
              className='bg-linear-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent block drop-shadow-2xl' 
            />
            <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 via-purple-600/20 to-cyan-500/20 blur-2xl -z-10 scale-110"></div>
            <div className="absolute inset-0 text-blue-500/15 blur-sm -z-10" style={{textShadow: '0 0 10px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.15)'}}>
              Next-Gen Data Center & 
            </div>
          </div>
          <div className="relative mt-2">
            <ShinyText 
              text="ICT Solutions" 
              disabled={false} 
              speed={3} 
              className='bg-linear-to-r from-emerald-500 via-teal-500 to-blue-500 bg-clip-text text-transparent block drop-shadow-2xl' 
            />
            <div className="absolute inset-0 bg-linear-to-r from-emerald-500/20 via-teal-500/20 to-blue-500/20 blur-2xl -z-10 scale-110"></div>
            <div className="absolute inset-0 text-emerald-500/15 blur-sm -z-10" style={{textShadow: '0 0 10px rgba(16, 185, 129, 0.2), 0 0 20px rgba(16, 185, 129, 0.15)'}}>
              ICT Solutions
            </div>
          </div>
        </h1>

        {/* Description */}
        <p className="max-w-4xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed mb-12 font-medium">
          Pioneering turnkey data center solutions, electro-mechanical systems, and 
          enterprise-grade infrastructure for the Kingdom&apos;s digital transformation since 2006.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <Link 
            href="/solutions/data-center"
            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold text-base text-white hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 transform backdrop-blur-sm"
          >
            <span className="relative z-10 drop-shadow-sm">Explore Solutions</span>
          </Link>
          <Link 
            href="/projects"
            className="group relative px-8 py-4 bg-gray-800/30 backdrop-blur-md border-2 border-gray-600/40 rounded-2xl font-bold text-base text-gray-200 hover:shadow-2xl hover:shadow-emerald-400/30 transition-all duration-300 hover:scale-105 hover:bg-gray-700/40 hover:border-emerald-400/60"
          >
            <span className="drop-shadow-sm">View Projects</span>
          </Link>
        </div>


      </div>
    </section>
  );
};

export default Hero;
