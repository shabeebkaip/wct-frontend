import React from 'react';
import { Server, Shield, Zap, Thermometer, Database, Network, CheckCircle } from 'lucide-react';
import ImageGallery from './DataCenterImageGallery';

interface DataCenterData {
  sectionHeader: {
    badge: string;
    title: string;
    description: string;
  };
  solutions: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  features: string[];
  images: Array<{
    src: string;
    alt: string;
    title: string;
    description: string;
  }>;
  cta: {
    title: string;
    description: string;
    primaryButton: {
      text: string;
      link: string;
    };
    secondaryButton: {
      text: string;
      link: string;
    };
  };
}

const iconMap: Record<string, any> = {
  Server,
  Shield,
  Zap,
  Thermometer,
  Database,
  Network,
};

async function getDataCenterData(): Promise<DataCenterData> {
  // Fetch directly from database during build and runtime
  // This avoids HTTP request issues during Vercel build
  try {
    const connectDB = (await import('@/lib/mongodb')).default;
    const { DataCenterHome } = await import('@/lib/models/DataCenter');
    await connectDB();
    const data = await DataCenterHome.findOne().lean();
    if (data) {
      // Convert to plain object, removing MongoDB _id and __v fields from nested arrays
      const plainData = JSON.parse(JSON.stringify(data, (key, value) => {
        if (key === '_id' || key === '__v') return undefined;
        return value;
      }));
      return plainData as DataCenterData;
    }
  } catch (error) {
    console.error('Error fetching data center data from database:', error);
  }

  throw new Error('Failed to fetch data center data');
}

const DataCenterImages = async () => {
  const data = await getDataCenterData();

  return (
    <section className="relative bg-linear-to-b from-white via-slate-50 to-blue-50 dark:from-black dark:via-gray-900 dark:to-black py-20 overflow-hidden transition-colors duration-300">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)',
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 rounded-full text-blue-700 dark:text-blue-400 text-sm font-semibold tracking-wide mb-6 shadow-sm">
            <Server className="w-4 h-4" />
            <span>{data.sectionHeader.badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-gray-100">
            {data.sectionHeader.title}
          </h2>
          <p className="text-slate-700 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {data.sectionHeader.description}
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {data.solutions.map((solution, index) => {
            const Icon = iconMap[solution.icon] || Server;
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 rounded-2xl p-6 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg shadow-slate-200/50 dark:shadow-blue-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100 mb-2 group-hover:text-blue-700 dark:group-hover:text-white transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                      {solution.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 rounded-2xl p-8 mb-16 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-gray-100 mb-6 text-center">Key Features & Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-gray-800/30 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800/50 transition-all duration-300"
              >
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-gray-300 text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image Gallery */}
        <ImageGallery images={data.images} />

        {/* CTA Section */}
        <div className="relative bg-linear-to-r from-slate-100/80 via-blue-50/80 to-slate-100/80 dark:from-gray-900/60 dark:via-gray-800/60 dark:to-gray-900/60 backdrop-blur-sm border border-slate-200 dark:border-gray-700/50 rounded-2xl p-8 md:p-12 overflow-hidden mt-16 shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-gray-100 mb-4">
              {data.cta.title}
            </h3>
            <p className="text-slate-700 dark:text-gray-400 mb-6 leading-relaxed max-w-2xl mx-auto">
              {data.cta.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={data.cta.primaryButton.link}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white transition-colors duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
              >
                {data.cta.primaryButton.text}
              </a>
              <a
                href={data.cta.secondaryButton.link}
                download="WeCare-Tech-Company-Profile.pptx"
                className="inline-block px-8 py-3 bg-white dark:bg-gray-800/80 border border-slate-300 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700/80 rounded-xl font-semibold text-slate-700 dark:text-gray-200 transition-all duration-300"
              >
                {data.cta.secondaryButton.text}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataCenterImages;
