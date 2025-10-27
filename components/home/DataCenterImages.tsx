'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Server, Shield, Zap, Thermometer, Database, Network, CheckCircle } from 'lucide-react';

const DataCenterImages = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
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
  ];

  const solutions = [
    {
      icon: Server,
      title: 'Infrastructure Design',
      description: 'Complete data center design from concept to commissioning with tier-rated facilities',
    },
    {
      icon: Zap,
      title: 'Power Systems',
      description: 'UPS, PDU, generators, and power distribution ensuring 99.99% uptime',
    },
    {
      icon: Thermometer,
      title: 'Cooling Solutions',
      description: 'Precision air conditioning, hot/cold aisle containment, and thermal management',
    },
    {
      icon: Shield,
      title: 'Physical Security',
      description: 'Access control, surveillance, and environmental monitoring systems',
    },
    {
      icon: Database,
      title: 'Storage Systems',
      description: 'Enterprise SAN, NAS, and hybrid cloud storage infrastructure',
    },
    {
      icon: Network,
      title: 'Network Infrastructure',
      description: 'High-speed networking, fiber optics, and structured cabling solutions',
    },
  ];

  const features = [
    'Tier III & Tier IV Data Center Design',
    'N+1 & 2N Redundancy Configuration',
    'Hot/Cold Aisle Containment',
    'Modular & Scalable Architecture',
    'Energy-Efficient Green Solutions',
    ' 24/7 Monitoring & Management',
    'Disaster Recovery Planning',
    'Compliance & Certification Support',
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
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-semibold tracking-wide mb-6">
            <Server className="w-4 h-4" />
            <span>DATA CENTER SOLUTIONS</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-100">
            Enterprise Data Center Infrastructure
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Delivering world-class data center solutions with cutting-edge technology, proven expertise, 
            and comprehensive infrastructure services across Saudi Arabia
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={index}
                className="group relative bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-100 mb-2 group-hover:text-white transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {solution.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6 text-center">Key Features & Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
              >
                <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>


        {/* Bento Grid Layout - KEPT AS IS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[240px]">
          {/* Large Featured Image */}
          <div
            className="relative lg:col-span-2 lg:row-span-2 rounded-2xl overflow-hidden group cursor-pointer"
            onClick={() => setSelectedImage(0)}
          >
            <Image
              src={images[0].src}
              alt={images[0].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white mb-2">{images[0].title}</h3>
                <p className="text-gray-300 text-sm">{images[0].description}</p>
              </div>
            </div>
          </div>

          {/* Grid Items */}
          {images.slice(1).map((image, index) => (
            <div
              key={index + 1}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${
                index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
              onClick={() => setSelectedImage(index + 1)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-white mb-1">{image.title}</h3>
                  <p className="text-gray-300 text-xs line-clamp-2">{image.description}</p>
                </div>
              </div>
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 border-2 border-blue-500/50 rounded-2xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative bg-linear-to-r from-gray-900/60 via-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 md:p-12 overflow-hidden mt-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4">
              Ready to Build Your Data Center?
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-2xl mx-auto">
              Our team of certified experts is ready to design, implement, and manage your 
              mission-critical data center infrastructure with world-class standards.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white transition-colors duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40">
                Request Consultation
              </button>
              <button className="px-8 py-3 bg-gray-800/80 border border-gray-700 hover:bg-gray-700/80 rounded-xl font-semibold text-gray-200 transition-all duration-300">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-blue-400 transition-colors p-2 hover:bg-white/10 rounded-full"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <div className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center">
            <div className="relative w-full h-[80vh] mb-6">
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="text-center max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {images[selectedImage].title}
              </h3>
              <p className="text-gray-300 text-lg">
                {images[selectedImage].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DataCenterImages;
