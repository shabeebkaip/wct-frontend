import React from 'react';
import * as LucideIcons from 'lucide-react';
import ImageGallery from './DataCenterImageGallery';
import Link from 'next/link';

async function getDataCenterData(): Promise<DataCenterHomeData> {
  try {
    const connectDB = (await import('@/lib/mongodb')).default;
    const { DataCenterHome } = await import('@/lib/models/DataCenter');
    await connectDB();
    const data = await DataCenterHome.findOne().lean();
    if (data) {
      const plainData = JSON.parse(JSON.stringify(data, (key, value) => {
        if (key === '_id' || key === '__v') return undefined;
        return value;
      }));
      return plainData as DataCenterHomeData;
    }
  } catch (error) {
    console.error('Error fetching data center data from database:', error);
  }
  throw new Error('Failed to fetch data center data');
}

const DataCenterImages = async () => {
  const data = await getDataCenterData();

  return (
    <section className="bg-white overflow-hidden">

      {/* Top rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/30">
                <LucideIcons.Server className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
                {data.sectionHeader.badge}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.06] tracking-tight mb-5">
              {data.sectionHeader.title}
            </h2>

            <p className="text-slate-500 text-lg leading-relaxed">
              {data.sectionHeader.description}
            </p>
          </div>

          {/* Stat pills */}
          <div className="flex gap-4 shrink-0">
            {[
              { value: '99.9%', label: 'Uptime SLA' },
              { value: 'Tier III', label: 'Standard' },
            ].map((stat) => (
              <div key={stat.label} className="text-center px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50">
                <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Solutions Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 mb-14">
          {data.solutions.map((solution, index) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Icon = (LucideIcons as any)[solution.icon] || LucideIcons.Server;
            return (
              <div
                key={index}
                className="group relative bg-white p-8 hover:bg-blue-50/40 transition-colors duration-300"
              >
                {/* Hover left accent */}
                <div className="absolute left-0 top-8 bottom-8 w-0.5 bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top rounded-full" />

                <div className="absolute top-6 right-6 text-5xl font-black text-slate-100 group-hover:text-blue-100 transition-colors select-none leading-none">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="relative space-y-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/25 group-hover:shadow-blue-600/40 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{solution.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{solution.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Features Strip ── */}
        {data.features && data.features.length > 0 && (
          <div className="relative rounded-2xl bg-slate-900 overflow-hidden mb-14">
            {/* Subtle blue glow top-left */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-7">
                <div className="h-px w-8 bg-blue-500" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400">
                  Key Capabilities
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {data.features.map((feature, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-200"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center shrink-0">
                      <LucideIcons.Check className="w-3 h-3 text-blue-400" />
                    </div>
                    <span className="text-white/75 text-sm font-medium group-hover:text-white/90 transition-colors">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Image Gallery ── */}
        <div className="mb-14">
          <ImageGallery images={data.images} />
        </div>

        {/* ── CTA ── */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pt-10 border-t border-slate-100">
          <div>
            <p className="text-slate-900 font-black text-xl md:text-2xl tracking-tight mb-1.5">
              {data.cta.title}
            </p>
            <p className="text-slate-500 text-sm">{data.cta.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href={data.cta.primaryButton.link}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-blue-600/30"
            >
              {data.cta.primaryButton.text}
              <LucideIcons.ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={data.cta.secondaryButton.link}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700 font-semibold text-sm transition-colors duration-200"
            >
              {data.cta.secondaryButton.text}
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

    </section>
  );
};

export default DataCenterImages;
