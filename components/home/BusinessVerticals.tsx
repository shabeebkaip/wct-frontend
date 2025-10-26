'use client';

import MagicBento from '../MagicBento';

const BusinessVerticals = () => {
  return (
    <section className="relative bg-black py-20">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Our Business Verticals
          </h2>
          <div className="max-w-5xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Right from incorporation WeCare Technology has always strived to be a knowledge base company and has focused in keeping a technically agile and versatile group of Engineers and Technicians who form the solid core of the company. Our team of Professionals has managed to keep the Quality of Service and the speed of execution very high.
            </p>
            <p className="text-gray-400 text-base">
              In this Profile, we will introduce you the Business Verticals we handle and also a list of a few projects recently executed will be detailed.
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
    </section>
  );
};

export default BusinessVerticals;
