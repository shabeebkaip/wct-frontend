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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-100">
            Our Business Verticals
          </h2>
          <div className="max-w-5xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
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
