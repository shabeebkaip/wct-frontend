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
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/data-center/home`, {
      next: { revalidate: 60, tags: ['data-center-home'] },
    });

    if (!res.ok) throw new Error('Failed to fetch data');

    return await res.json();
  } catch (error) {
    console.error('Error fetching data center data:', error);
    // Return fallback data
    return {
      sectionHeader: {
        badge: 'DATA CENTER SOLUTIONS',
        title: 'Enterprise Data Center Infrastructure',
        description: 'Delivering world-class data center solutions with cutting-edge technology, proven expertise, and comprehensive infrastructure services across Saudi Arabia',
      },
      solutions: [
        {
          icon: 'Server',
          title: 'Infrastructure Design',
          description: 'Complete data center design from concept to commissioning with tier-rated facilities',
        },
        {
          icon: 'Zap',
          title: 'Power Systems',
          description: 'UPS, PDU, generators, and power distribution ensuring 99.99% uptime',
        },
        {
          icon: 'Thermometer',
          title: 'Cooling Solutions',
          description: 'Precision air conditioning, hot/cold aisle containment, and thermal management',
        },
        {
          icon: 'Shield',
          title: 'Physical Security',
          description: 'Access control, surveillance, and environmental monitoring systems',
        },
        {
          icon: 'Database',
          title: 'Storage Systems',
          description: 'Enterprise SAN, NAS, and hybrid cloud storage infrastructure',
        },
        {
          icon: 'Network',
          title: 'Network Infrastructure',
          description: 'High-speed networking, fiber optics, and structured cabling solutions',
        },
      ],
      features: [
        'Tier III & Tier IV Data Center Design',
        'N+1 & 2N Redundancy Configuration',
        'Hot/Cold Aisle Containment',
        'Modular & Scalable Architecture',
        'Energy-Efficient Green Solutions',
        '24/7 Monitoring & Management',
        'Disaster Recovery Planning',
        'Compliance & Certification Support',
      ],
      images: [
        {
          src: '/data-center-images/Data-Centre-Illustration.jpg',
          alt: 'Data Center Infrastructure',
          title: 'Modern Data Center Architecture',
          description: 'State-of-the-art facility design and implementation',
        },
        {
          src: '/data-center-images/taylor-vick-M5tzZtFCOfs-unsplash.jpg',
          alt: 'Server Infrastructure',
          title: 'High-Performance Computing',
          description: 'Enterprise-grade server and storage solutions',
        },
        {
          src: '/data-center-images/vertiv.webp',
          alt: 'Vertiv Solutions',
          title: 'Power & Cooling Systems',
          description: 'Advanced climate control and power management',
        },
        {
          src: '/data-center-images/apc.webp',
          alt: 'APC Infrastructure',
          title: 'UPS & Power Protection',
          description: 'Uninterruptible power supply solutions',
        },
        {
          src: '/data-center-images/schneider.webp',
          alt: 'Schneider Electric',
          title: 'Smart Infrastructure',
          description: 'Intelligent building management systems',
        },
        {
          src: '/data-center-images/eaton.jpeg',
          alt: 'Eaton Systems',
          title: 'Energy Management',
          description: 'Comprehensive power distribution solutions',
        },
        {
          src: '/data-center-images/liebert.jpg',
          alt: 'Liebert Precision',
          title: 'Precision Cooling',
          description: 'Advanced thermal management technology',
        },
        {
          src: '/data-center-images/sdmo.jpg',
          alt: 'SDMO Generators',
          title: 'Backup Power Generation',
          description: 'Reliable standby power solutions',
        },
      ],
      cta: {
        title: 'Ready to Build Your Data Center?',
        description: 'Our team of certified experts is ready to design, implement, and manage your mission-critical data center infrastructure with world-class standards.',
        primaryButton: {
          text: 'Request Consultation',
          link: '/contact',
        },
        secondaryButton: {
          text: 'Download Brochure',
          link: '/GFS PROFILE.pptx',
        },
      },
    };
  }
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
