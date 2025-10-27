'use client';

import React from 'react';
import { Camera, Shield, Users, Building2, MapPin, ShoppingBag } from 'lucide-react';

const CCTVSurveillance = () => {
  const solutions = [
    {
      icon: Shield,
      title: 'High Value Assets',
      description: 'Advanced surveillance systems for banks, jewelry stores, and critical infrastructure with AI-powered threat detection',
      color: 'from-blue-500 to-cyan-500',
      features: ['24/7 Monitoring', 'AI Analytics', 'Tamper Detection'],
    },
    {
      icon: Building2,
      title: 'Military & Defense',
      description: 'Military-grade surveillance solutions with thermal imaging, perimeter security, and command center integration',
      color: 'from-red-500 to-orange-500',
      features: ['Thermal Imaging', 'Perimeter Security', 'Encrypted Feeds'],
    },
    {
      icon: Users,
      title: 'Crowd Management',
      description: 'Intelligent crowd monitoring for events, stadiums, and public spaces with real-time analytics and alerts',
      color: 'from-purple-500 to-pink-500',
      features: ['Crowd Analytics', 'Heat Mapping', 'Alert System'],
    },
    {
      icon: MapPin,
      title: 'Residential Areas',
      description: 'Smart home security with mobile access, motion detection, and neighborhood watch integration',
      color: 'from-green-500 to-emerald-500',
      features: ['Mobile Access', 'Motion Detection', 'Cloud Storage'],
    },
    {
      icon: Building2,
      title: 'Masjid Solutions',
      description: 'Respectful surveillance for places of worship ensuring safety while maintaining privacy and sanctity',
      color: 'from-indigo-500 to-blue-500',
      features: ['Privacy Zones', 'Audio Masking', 'Donation Security'],
    },
    {
      icon: ShoppingBag,
      title: 'Mall & Retail',
      description: 'Comprehensive retail security with customer analytics, theft prevention, and parking lot monitoring',
      color: 'from-yellow-500 to-orange-500',
      features: ['Facial Recognition', 'People Counting', 'POS Integration'],
    },
  ];

  return (
    <section className="relative bg-linear-to-b from-black via-gray-900 to-black py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)',
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-semibold tracking-wide mb-6">
            <Camera className="w-4 h-4" />
            <span>SURVEILLANCE SOLUTIONS</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-100">
            CCTV Surveillance Solutions
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Comprehensive security systems tailored to your specific needs, 
            powered by cutting-edge technology and industry-leading expertise
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={index}
                className="group relative bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700/80 transition-all duration-500 hover:bg-gray-800/50 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-linear-to-br ${solution.color} transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${solution.color} bg-opacity-10 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-white transition-colors">
                  {solution.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {solution.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {solution.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-800/50 border border-gray-700/50 rounded-full text-xs text-gray-400 group-hover:border-blue-500/30 group-hover:text-blue-400 transition-all duration-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="relative bg-linear-to-r from-gray-900/60 via-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 md:p-12 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4">
                Need a Custom Security Solution?
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Our expert team will assess your requirements and design a comprehensive 
                surveillance system tailored to your specific needs and budget.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white transition-colors duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40">
                  Get Free Consultation
                </button>
                <button className="px-6 py-3 bg-gray-800/80 border border-gray-700 hover:bg-gray-700/80 rounded-xl font-semibold text-gray-200 transition-all duration-300">
                  View Projects
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">500+</div>
                <div className="text-sm text-gray-500">Cameras Installed</div>
              </div>
              <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">100+</div>
                <div className="text-sm text-gray-500">Projects Completed</div>
              </div>
              <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">24/7</div>
                <div className="text-sm text-gray-500">Support Available</div>
              </div>
              <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">18+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default CCTVSurveillance;
