'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Server, Network, Shield, Building2 } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <div className="relative">
      <div className="relative h-[350px] rounded-xl overflow-hidden border border-slate-200 dark:border-gray-800/50 shadow-lg dark:shadow-none">
        {project.images[currentImageIndex] ? (
          <>
            <Image
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-white/50 via-transparent to-transparent dark:from-gray-900/50 dark:via-transparent dark:to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-slate-200 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-slate-400 dark:text-gray-600">No image available</span>
          </div>
        )}
        
        <div className="absolute top-6 left-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/90 backdrop-blur-sm text-sm font-medium text-white">
            {project.category === 'data-center' && <Server className="w-4 h-4" />}
            {project.category === 'structured-cabling' && <Network className="w-4 h-4" />}
            {project.category === 'low-current-solutions' && <Shield className="w-4 h-4" />}
            {project.category === 'low-voltage' && <Building2 className="w-4 h-4" />}
            {project.category === 'control-rooms' && <Building2 className="w-4 h-4" />}
            <span>{project.category.replace(/-/g, ' ').toUpperCase()}</span>
          </div>
        </div>

        {/* Navigation Arrows - Only show if multiple images */}
        {project.images.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm text-slate-900 dark:text-white hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-lg dark:shadow-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm text-slate-900 dark:text-white hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-lg dark:shadow-none"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm text-sm text-slate-900 dark:text-white shadow-lg dark:shadow-none">
              {currentImageIndex + 1} / {project.images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Gallery - Only show if multiple images */}
      {project.images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {project.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                currentImageIndex === idx 
                  ? 'border-blue-500 ring-2 ring-blue-500/50' 
                  : 'border-slate-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-gray-500'
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
