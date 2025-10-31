'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Building2,
  CheckCircle,
  Server,
  Network,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const ProjectDetailPage = () => {
  const params = useParams();
  const projectId = parseInt(params.id as string);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Project data (should ideally be in a shared file or fetched from API)
  const projects = [
    // Data Center Projects
    {
      id: 1,
      title: 'Quara Finance Data Center',
      category: 'data-center',
      client: 'Quara Finance',
      location: 'Riyadh, Saudi Arabia',
      year: '2024',
      description: 'Complete data center infrastructure design and implementation with redundant power systems, advanced cooling solutions, and tier-3 compliance.',
      images: ['/projects/WhatsApp Image 2025-10-26 at 21.38.37.jpeg', '/projects/WhatsApp Image 2025-10-26 at 21.38.44.jpeg'],
      tags: ['Infrastructure Design', 'Power Systems', 'Cooling', 'Tier-3'],
      scope: ['Data Center Design', 'Power Infrastructure', 'Cooling Systems', 'Network Cabling', 'Security Integration']
    },
    {
      id: 2,
      title: 'Royal Court IT Infrastructure',
      category: 'data-center',
      client: 'Royal Court',
      location: 'Riyadh, Saudi Arabia',
      year: '2023',
      description: 'Mission-critical data center with highest security standards, redundant systems, and 24/7 monitoring capabilities.',
      images: ['/projects/WhatsApp Image 2025-10-26 at 21.38.44.jpeg'],
      tags: ['Mission Critical', 'High Security', 'Redundancy', 'Monitoring'],
      scope: ['Data Center Build', 'Security Systems', 'Network Infrastructure', 'Backup Systems', 'NOC Setup']
    },
    {
      id: 3,
      title: 'Ministry of Defense Data Center',
      category: 'data-center',
      client: 'Ministry of Defense',
      location: 'Riyadh, Saudi Arabia',
      year: '2023',
      description: 'High-security government data center with military-grade specifications and compliance requirements.',
      images: ['/projects/WhatsApp Image 2025-10-26 at 21.38.49.jpeg'],
      tags: ['Government', 'Military Grade', 'Compliance', 'High Security'],
      scope: ['Secure Infrastructure', 'Access Control', 'Network Design', 'Power Backup', 'Environmental Control']
    },
    {
      id: 4,
      title: 'GOSI Enterprise Data Center',
      category: 'data-center',
      client: 'GOSI',
      location: 'Riyadh, Saudi Arabia',
      year: '2022',
      description: 'Large-scale enterprise data center supporting critical government services with high availability requirements.',
      images: ['/projects/WhatsApp Image 2025-10-26 at 21.38.54.jpeg'],
      tags: ['Enterprise', 'High Availability', 'Scalable', 'Government'],
      scope: ['Data Center Infrastructure', 'Storage Solutions', 'Network Architecture', 'Disaster Recovery', 'Monitoring Systems']
    },
    {
      id: 5,
      title: 'Makkah Bus Company ICT Infrastructure',
      category: 'ict',
      client: 'Makkah Bus Company',
      location: 'Makkah, Saudi Arabia',
      year: '2024',
      description: 'Comprehensive ICT infrastructure including structured cabling, network systems, and communications setup for transportation hub.',
      images: ['/projects/WhatsApp Image 2025-10-26 at 21.39.16.jpeg'],
      tags: ['Structured Cabling', 'Network', 'Communications', 'Transport'],
      scope: ['Network Infrastructure', 'Structured Cabling', 'WiFi Systems', 'Voice Systems', 'CCTV Integration']
    },
    {
      id: 6,
      title: 'NCMS Network Infrastructure',
      category: 'ict',
      client: 'NCMS',
      location: 'Riyadh, Saudi Arabia',
      year: '2024',
      description: 'Advanced network infrastructure with fiber optics, structured cabling, and enterprise networking solutions.',
      images: ['/projects/WhatsApp Image 2025-10-26 at 21.39.20.jpeg'],
      tags: ['Fiber Optics', 'Enterprise Network', 'Infrastructure', 'Connectivity'],
      scope: ['Fiber Optic Cabling', 'Network Design', 'Switching Infrastructure', 'Wireless Solutions', 'Cable Management']
    },
    {
      id: 7,
      title: 'Dallah Hospital ICT Systems',
      category: 'ict',
      client: 'Dallah Hospital',
      location: 'Riyadh, Saudi Arabia',
      year: '2023',
      description: 'Healthcare-grade ICT infrastructure with structured cabling, network systems, and integrated communication platforms.',
      images: ['/projects/WhatsApp Image 2025-10-26 at 21.39.27.jpeg'],
      tags: ['Healthcare', 'Structured Cabling', 'Network', 'Communications'],
      scope: ['Hospital Network', 'Medical Systems Integration', 'Structured Cabling', 'Wireless Coverage', 'Voice Systems']
    },
    {
      id: 8,
      title: 'Ericsson Office Network',
      category: 'ict',
      client: 'Ericsson',
      location: 'Riyadh, Saudi Arabia',
      year: '2023',
      description: 'Corporate office network infrastructure with advanced cabling systems and high-speed connectivity.',
      images: ['/projects/WhatsApp Image 2025-10-26 at 21.39.32.jpeg'],
      tags: ['Corporate', 'High Speed', 'Structured Cabling', 'Office Network'],
      scope: ['Office Cabling', 'Network Setup', 'Access Points', 'Phone Systems', 'Conference Systems']
    },
    {
      id: 9,
      title: 'NCMS Security Systems',
      category: 'security',
      client: 'NCMS',
      location: 'Riyadh, Saudi Arabia',
      year: '2024',
      description: 'Comprehensive security solution including CCTV surveillance, access control, and intrusion detection systems.',
      images: ['/projects/WhatsApp Image 2025-10-26 at 21.38.37.jpeg'],
      tags: ['CCTV', 'Access Control', 'Intrusion Detection', 'Monitoring'],
      scope: ['CCTV Systems', 'Access Control', 'Alarm Systems', 'Perimeter Security', 'Control Room Setup']
    },
    {
      id: 10,
      title: 'King Khalid Masjid Security',
      category: 'security',
      client: 'King Khalid Masjid',
      location: 'Riyadh, Saudi Arabia',
      year: '2023',
      description: 'Advanced security infrastructure for religious facility with crowd management and safety systems.',
      images: ['/projects/WhatsApp Image 2025-10-26 at 21.38.44.jpeg'],
      tags: ['CCTV', 'Crowd Management', 'Public Safety', 'Monitoring'],
      scope: ['Video Surveillance', 'Public Address System', 'Emergency Systems', 'Access Management', 'Monitoring Center']
    },
    {
      id: 11,
      title: 'Hitachi Facility Security',
      category: 'security',
      client: 'Hitachi',
      location: 'Riyadh, Saudi Arabia',
      year: '2023',
      description: 'Corporate facility security with integrated CCTV, access control, and perimeter protection systems.',
      images: ['/projects/WhatsApp Image 2025-10-26 at 21.38.49.jpeg'],
      tags: ['Corporate Security', 'CCTV', 'Access Control', 'Perimeter'],
      scope: ['Surveillance Systems', 'Access Control', 'Visitor Management', 'Parking Security', 'Integration Platform']
    },
    {
      id: 12,
      title: 'ABB Security Infrastructure',
      category: 'security',
      client: 'ABB',
      location: 'Riyadh, Saudi Arabia',
      year: '2022',
      description: 'Industrial facility security with advanced monitoring, access control, and safety integration systems.',
      images: ['/projects/WhatsApp Image 2025-10-26 at 21.38.54.jpeg'],
      tags: ['Industrial', 'CCTV', 'Safety', 'Monitoring'],
      scope: ['Industrial CCTV', 'Access Control', 'Safety Integration', 'Analytics', 'Central Monitoring']
    }
  ];

  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-gray-100 mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'data-center': return Server;
      case 'ict': return Network;
      case 'security': return Shield;
      default: return Building2;
    }
  };

  const categoryIcon = getCategoryIcon(project.category);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-slate-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-slate-900 dark:text-gray-100">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-100/30 via-slate-50 to-white dark:from-blue-900/20 dark:via-gray-900 dark:to-gray-950" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 dark:opacity-10" />
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-8">
        <Link 
          href="/projects"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Project Image Gallery */}
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden border border-slate-200 dark:border-gray-800/50 shadow-2xl dark:shadow-none">
                <Image
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-white/50 via-transparent to-transparent dark:from-gray-900/50 dark:via-transparent dark:to-transparent" />
                
                <div className="absolute top-6 left-6">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/90 backdrop-blur-sm text-sm font-medium text-white">
                    {React.createElement(categoryIcon, { className: "w-4 h-4" })}
                    <span>{project.category.replace('-', ' ').toUpperCase()}</span>
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

            {/* Project Info */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-gray-100 mb-6">
                {project.title}
              </h1>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-slate-600 dark:text-gray-400">
                  <Building2 className="w-5 h-5" />
                  <span>{project.client}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-gray-400">
                  <Calendar className="w-5 h-5" />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-gray-400">
                  <MapPin className="w-5 h-5" />
                  <span>{project.location}</span>
                </div>
              </div>

              <p className="text-lg text-slate-700 dark:text-gray-300 leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 text-sm text-blue-700 dark:text-blue-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Project Scope */}
              <div className="rounded-2xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 p-6 shadow-lg dark:shadow-none">
                <h2 className="text-xl font-bold text-slate-900 dark:text-gray-100 mb-4">Project Scope</h2>
                <div className="space-y-3">
                  {project.scope.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 rounded-2xl bg-linear-to-br from-blue-100/80 via-blue-50/50 to-transparent dark:from-blue-600/10 dark:via-blue-500/5 dark:to-transparent backdrop-blur-sm border border-blue-300 dark:border-blue-500/30 text-center shadow-xl dark:shadow-none">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-gray-100 mb-4">
              Interested in a Similar Project?
            </h2>
            <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help you achieve your infrastructure goals.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
