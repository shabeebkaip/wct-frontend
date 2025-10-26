'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

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

  return (
    <section className="relative bg-linear-to-b from-black via-gray-900 to-black py-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-100">
            Our Data Center Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Delivering world-class infrastructure solutions with cutting-edge technology
            and proven expertise across the Kingdom
          </p>
        </div>

        {/* Bento Grid Layout */}
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
