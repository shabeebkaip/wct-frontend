import Link from 'next/link';
import { Camera, Zap, Cable, Users, ArrowRight, Sparkles, Server } from 'lucide-react';

export default function HomePage() {
  const sections = [
    {
      title: 'Hero Section',
      description: 'Edit main hero banner, headlines, and call-to-action',
      icon: Sparkles,
      href: '/admin/hero',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
    },
    {
      title: 'CCTV Surveillance',
      description: 'Manage CCTV solutions, features, and security options',
      icon: Camera,
      href: '/admin/cctv-section',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Low Current Solutions',
      description: 'Edit security flow, solutions, and additional services',
      icon: Zap,
      href: '/admin/low-current-section',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Structured Cabling',
      description: 'Update cabling infrastructure and network solutions',
      icon: Cable,
      href: '/admin/structured-cabling-section',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Data Center',
      description: 'Manage data center solutions and infrastructure',
      icon: Server,
      href: '/admin/data-center-home',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-50',
      iconColor: 'text-cyan-600',
    },
    {
      title: 'Clients',
      description: 'Manage client logos and testimonials',
      icon: Users,
      href: '/admin/clients-section',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Trusted Brands',
      description: 'Manage trusted brand logos and product categories',
      icon: Users,
      href: '/admin/trusted-brands-section',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">🏠 Home Page Sections</h1>
            <p className="text-gray-600 mt-2 text-lg">Manage all sections of your homepage</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className="group relative bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-linear-to-br ${section.color} rounded-2xl transition-opacity duration-300`}></div>
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${section.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${section.iconColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-900 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {section.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                    <span>Edit Section</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-blue-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            );
          })}
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">💡 Quick Tip</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Each section has its own dedicated page for easier management. Changes are saved independently for each section. Click on any card above to start editing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
