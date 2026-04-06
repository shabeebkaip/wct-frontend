'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

interface SliderProject {
  _id: string;
  title: string;
  category: string;
  client: string;
  location: string;
  year: string;
  status?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  'data-center': 'Data Center',
  'structured-cabling': 'Structured Cabling',
  'low-current-solutions': 'Low Current Solutions',
  'low-voltage': 'Low Voltage',
  'control-rooms': 'Control Rooms',
};

const STATUS_COLOR: Record<string, string> = {
  completed: 'bg-emerald-500',
  'in-progress': 'bg-blue-500',
  planned: 'bg-slate-400',
};

export default function ProjectsSlider({
  projects,
  currentId,
}: {
  projects: SliderProject[];
  currentId: string;
}) {
  const others = projects.filter((p) => p._id !== currentId);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: others.length > 3,
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    // Set initial state after mount
    const timer = setTimeout(onSelect, 0);
    return () => {
      clearTimeout(timer);
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (others.length === 0) return null;

  return (
    <section className="bg-[#F4F3EF] text-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-20">

        {/* Header row */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-mono text-[10px] text-slate-400 uppercase tracking-[0.3em] mb-3">
              Continue Exploring
            </p>
            <h2
              className="font-black tracking-tighter text-slate-900 leading-none"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Other Projects
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="w-10 h-10 flex items-center justify-center border border-slate-300 text-slate-500 hover:border-slate-900 hover:text-slate-900 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Previous"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="w-10 h-10 flex items-center justify-center border border-slate-300 text-slate-500 hover:border-slate-900 hover:text-slate-900 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Next"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/projects"
              className="hidden md:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors ml-2"
            >
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Embla viewport */}
        <div className="overflow-hidden -mx-6 px-6 lg:-mx-12 lg:px-12" ref={emblaRef}>
          <div className="flex gap-4 touch-pan-y">
            {others.map((p) => {
              const globalIdx = projects.findIndex((proj) => proj._id === p._id);
              return (
                <Link
                  key={p._id}
                  href={`/projects/${p._id}`}
                  className="group flex-none w-[300px] md:w-[340px] flex flex-col border border-slate-200 bg-white hover:border-slate-900 transition-all duration-300"
                  style={{ userSelect: 'none' }}
                >
                  {/* Card top accent */}
                  <div className="h-0.5 w-0 bg-slate-900 group-hover:w-full transition-all duration-500 ease-out" />

                  <div className="p-7 flex flex-col flex-1">
                    {/* Number + status */}
                    <div className="flex items-start justify-between mb-6">
                      <span className="font-mono text-4xl font-bold text-slate-200 group-hover:text-slate-900 transition-colors leading-none">
                        {String(globalIdx + 1).padStart(2, '0')}
                      </span>
                      {p.status && (
                        <span className={`w-2 h-2 rounded-full mt-1.5 ${STATUS_COLOR[p.status] ?? 'bg-slate-400'}`} />
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-black tracking-tight text-slate-900 leading-snug mb-2 group-hover:text-blue-700 transition-colors">
                      {p.title}
                    </h3>

                    {/* Client */}
                    <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-auto">
                      {p.client}
                    </p>

                    {/* Footer meta */}
                    <div className="flex items-end justify-between mt-8 pt-5 border-t border-slate-100">
                      <div>
                        <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest mb-1">
                          {CATEGORY_LABELS[p.category] ?? p.category}
                        </p>
                        <p className="font-mono text-[10px] text-slate-500">
                          {p.location?.split(',')[0] ?? ''} · {p.year}
                        </p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Dot indicators */}
        {others.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-8">
            {others.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-px transition-all duration-300 ${
                  i === selectedIndex
                    ? 'w-8 bg-slate-900'
                    : 'w-3 bg-slate-300 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Mobile: view all */}
        <div className="mt-8 flex md:hidden">
          <Link
            href="/projects"
            className="font-mono text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2"
          >
            View All Projects <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
