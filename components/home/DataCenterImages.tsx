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
    <section className="py-28 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-blue-600" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
              {data.sectionHeader.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            {data.sectionHeader.title}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            {data.sectionHeader.description}
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {data.solutions.map((solution, index) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Icon = (LucideIcons as any)[solution.icon] || LucideIcons.Server;
            return (
              <div
                key={index}
                className="group relative bg-white border border-slate-200 rounded-2xl p-7 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/8 transition-all duration-300"
              >
                <div className="absolute top-7 right-7 text-4xl font-black text-slate-100 group-hover:text-blue-50 transition-colors select-none leading-none">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="relative space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{solution.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{solution.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features strip */}
        {data.features && data.features.length > 0 && (
          <div className="bg-slate-950 rounded-2xl p-8 mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-blue-500" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400">
                Key Capabilities
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {data.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/8">
                  <LucideIcons.CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-white/80 text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Image Gallery */}
        <ImageGallery images={data.images} />

        {/* CTA */}
        <div className="mt-14 flex items-center justify-between flex-wrap gap-6 pt-10 border-t border-slate-100">
          <div>
            <p className="text-slate-900 font-bold text-xl mb-1">Ready to build your infrastructure?</p>
            <p className="text-slate-500 text-sm">Our engineers are ready to design and deliver your next project.</p>
          </div>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-blue-600/30 shrink-0"
          >
            Explore Solutions
            <LucideIcons.ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DataCenterImages;
