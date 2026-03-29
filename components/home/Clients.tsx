'use client';

import React from 'react';
import Image from 'next/image';

interface ClientLogo {
  src: string;
  alt: string;
  _id?: string;
}

interface ClientsProps {
  data?: {
    badge: string;
    title: string;
    description: string;
    logos: ClientLogo[];
  } | null;
}

function ClientLogo({ logo }: { logo: ClientLogo }) {
  return (
    <div className="mx-3 flex items-center justify-center w-44 h-20 shrink-0 rounded-2xl bg-white border border-slate-200 px-6 hover:border-blue-200 hover:shadow-md transition-all duration-300 group">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={120}
        height={48}
        className="max-w-full h-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
        style={{ maxHeight: '42px' }}
      />
    </div>
  );
}

const Clients = ({ data }: ClientsProps) => {
  const content = data || {
    badge: 'OUR CLIENTS',
    title: 'Trusted by Industry Leaders',
    description: 'We partner with leading organizations across multiple sectors to deliver world-class infrastructure solutions.',
    logos: [],
  };

  const logos = content.logos;
  const row1 = logos.slice(0, Math.ceil(logos.length / 2));
  const row2 = logos.slice(Math.ceil(logos.length / 2));

  return (
    <section className="py-24 bg-white overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-14 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-8 bg-blue-600" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
            {content.badge}
          </span>
          <div className="h-px w-8 bg-blue-600" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{content.title}</h2>
        <p className="text-slate-500 text-base max-w-2xl mx-auto">{content.description}</p>
      </div>

      {logos.length > 0 && (
        <>
          {/* Row 1 — scrolls left */}
          {row1.length > 0 && (
            <div className="relative mb-4">
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-linear-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-linear-to-l from-white to-transparent" />
              <div className="flex overflow-hidden">
                <div className="flex animate-marquee">
                  {[...row1, ...row1].map((logo, i) => (
                    <ClientLogo key={i} logo={logo} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Row 2 — scrolls right */}
          {row2.length > 0 && (
            <div className="relative">
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-linear-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-linear-to-l from-white to-transparent" />
              <div className="flex overflow-hidden">
                <div className="flex animate-marquee-reverse">
                  {[...row2, ...row2].map((logo, i) => (
                    <ClientLogo key={i} logo={logo} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Clients;
