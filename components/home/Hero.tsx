'use client';

import Link from 'next/link';
import DotGrid from '../DotGrid';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-gray-900 dark:via-black dark:to-gray-900 transition-colors duration-300">
      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-b from-transparent to-white dark:to-black z-5 pointer-events-none"></div>
      
      {/* DotGrid Background - Interactive dots */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60">
        <DotGrid
          dotSize={2}
          gap={40}
          baseColor="#cbd5e1"
          activeColor="#3b82f6"
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
        <div className="inline-flex items-center gap-3 mb-12 px-6 py-2.5 bg-linear-to-r from-blue-100 via-purple-100 to-blue-100 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-blue-500/10 backdrop-blur-sm border border-blue-300 dark:border-blue-500/20 rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 tracking-wider">EST. 2006</span>
          </div>
          <div className="w-px h-4 bg-slate-400 dark:bg-gray-600"></div>
          <span className="text-xs font-medium text-slate-700 dark:text-gray-300 tracking-wide">
            18+ Years of ICT Excellence
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8 tracking-normal">
          <div className="relative">
            <div className="bg-linear-to-r from-[#28348c] via-[#3a4ba8] to-[#28348c] dark:from-blue-700 dark:via-purple-700 dark:to-cyan-600 bg-clip-text text-transparent block drop-shadow-lg">
              Next-Gen Data Center & 
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-[#28348c]/10 via-[#3a4ba8]/10 to-[#28348c]/10 dark:from-blue-700/10 dark:via-purple-700/10 dark:to-cyan-600/10 blur-xl -z-10 scale-110"></div>
          </div>
          <div className="relative mt-2">
            <div className="bg-linear-to-r from-[#28348c] via-[#4556b8] to-[#28348c] dark:from-emerald-600 dark:via-teal-600 dark:to-blue-700 bg-clip-text text-transparent block drop-shadow-lg">
              ICT Solutions
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-[#28348c]/10 via-[#4556b8]/10 to-[#28348c]/10 dark:from-emerald-600/10 dark:via-teal-600/10 dark:to-blue-700/10 blur-xl -z-10 scale-110"></div>
          </div>
        </h1>

        {/* Description */}
        <p className="max-w-4xl mx-auto text-lg md:text-xl text-slate-700 dark:text-gray-300 leading-relaxed mb-12 font-medium">
          Pioneering turnkey data center solutions, electro-mechanical systems, and 
          enterprise-grade infrastructure for the Kingdom&apos;s digital transformation since 2006.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <Link 
            href="/solutions/data-center"
            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold text-base text-white hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 transform"
          >
            <span className="relative z-10 drop-shadow-sm">Explore Solutions</span>
          </Link>
          <Link 
            href="/projects"
            className="group relative px-8 py-4 bg-white dark:bg-gray-800/30 border-2 border-slate-300 dark:border-gray-600/40 hover:border-blue-500 dark:hover:border-emerald-400/60 rounded-2xl font-bold text-base text-slate-700 dark:text-gray-200 hover:text-blue-700 dark:hover:text-white hover:shadow-xl hover:shadow-blue-400/20 dark:hover:shadow-emerald-400/30 transition-all duration-300 hover:scale-105 dark:hover:bg-gray-700/40"
          >
            <span className="drop-shadow-sm">View Projects</span>
          </Link>
        </div>


      </div>
    </section>
  );
};

export default Hero;
