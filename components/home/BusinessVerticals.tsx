'use client';

import MagicBento from '../MagicBento';

const BusinessVerticals = () => {
  return (
    <section className="relative bg-linear-to-b from-gray-900 via-black to-black py-20 overflow-hidden">
      {/* Smooth transition overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black z-0"></div>
      
      {/* Subtle dot pattern continuation */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(75, 85, 99, 0.2) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          animation: 'drift 60s infinite linear'
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-semibold tracking-wide mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>BUSINESS SOLUTIONS</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-100">
            Our Business Verticals
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-6">
              Right from incorporation WeCare Technology has always strived to be a knowledge base company and has focused in keeping a technically agile and versatile group of Engineers and Technicians who form the solid core of the company. Our team of Professionals has managed to keep the Quality of Service and the speed of execution very high.
            </p>
          </div>
        </div>

        {/* Magic Bento Grid */}
        <MagicBento
          textAutoHide={false}
          enableStars={false}
          enableSpotlight={true}
          enableBorderGlow={false}
          disableAnimations={false}
          spotlightRadius={30}
          particleCount={8}
          enableTilt={false}
          glowColor="59, 130, 246"
          clickEffect={false}
          enableMagnetism={false}
        />
      </div>
      
      {/* Animation styles */}
      <style jsx>{`
        @keyframes drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
      `}</style>
    </section>
  );
};

export default BusinessVerticals;
