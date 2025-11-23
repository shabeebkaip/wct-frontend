'use client';

import Link from 'next/link';
import Image from 'next/image';

interface HeroClientProps {
  title: string
  subtitle: string
  description: string
  badgeText: string
  badgeDescription: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  backgroundImageUrl: string
}

export default function HeroClient({
  title,
  subtitle,
  description,
  badgeText,
  badgeDescription,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  backgroundImageUrl,
}: HeroClientProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImageUrl}
          alt="Hero Background"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        {/* Gradient overlay for smooth transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"></div>
      </div>
      
      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-b from-transparent to-white z-5 pointer-events-none"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 mb-12 px-6 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-white tracking-wider">{badgeText}</span>
          </div>
          <div className="w-px h-4 bg-white/30"></div>
          <span className="text-xs font-medium text-white/90 tracking-wide">
            {badgeDescription}
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8 tracking-normal">
          <div className="relative">
            <div className="text-white drop-shadow-2xl block">
              {title}
            </div>
          </div>
          <div className="relative mt-2">
            <div className="bg-linear-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent block drop-shadow-2xl">
              {subtitle}
            </div>
          </div>
        </h1>

        {/* Description */}
        <p className="max-w-4xl mx-auto text-lg md:text-xl text-white/90 leading-relaxed mb-12 font-medium drop-shadow-lg">
          {description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <Link 
            href={primaryButtonLink}
            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold text-base text-white hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 transform"
          >
            <span className="relative z-10 drop-shadow-sm">{primaryButtonText}</span>
          </Link>
          <Link 
            href={secondaryButtonLink}
            className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:border-white/60 hover:bg-white/20 rounded-2xl font-bold text-base text-white hover:shadow-2xl hover:shadow-white/30 transition-all duration-300 hover:scale-105"
          >
            <span className="drop-shadow-sm">{secondaryButtonText}</span>
          </Link>
        </div>


      </div>
    </section>
  );
};

