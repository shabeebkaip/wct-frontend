'use client';

import { Server, Wifi, Shield, ChevronRight, Building2, Network, Zap } from 'lucide-react';
import { Project } from '@/types/project';
import Link from 'next/link';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList = ({ projects }: ProjectListProps) => {
  // Group projects by category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'data-center':
        return Server;
      case 'structured-cabling':
        return Network;
      case 'low-current-solutions':
        return Wifi;
      case 'low-voltage':
        return Zap;
      case 'control-rooms':
        return Shield;
      default:
        return Building2;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'data-center':
        return 'DATA CENTER';
      case 'structured-cabling':
        return 'STRUCTURED CABLING';
      case 'low-current-solutions':
        return 'LOW CURRENT SOLUTIONS';
      case 'low-voltage':
        return 'LOW VOLTAGE';
      case 'control-rooms':
        return 'CONTROL ROOMS';
      default:
        return category.toUpperCase();
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'data-center':
        return 'from-blue-500 to-cyan-500';
      case 'structured-cabling':
        return 'from-green-500 to-teal-500';
      case 'low-current-solutions':
        return 'from-purple-500 to-pink-500';
      case 'low-voltage':
        return 'from-orange-500 to-red-500';
      case 'control-rooms':
        return 'from-indigo-500 to-blue-500';
      default:
        return 'from-blue-500 to-indigo-500';
    }
  };

  // Group projects by category
  const groupedProjects = projects.reduce((acc, project) => {
    if (!acc[project.category]) {
      acc[project.category] = [];
    }
    acc[project.category].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  const projectCategories = Object.keys(groupedProjects).map((category) => ({
    category,
    title: getCategoryTitle(category),
    icon: getCategoryIcon(category),
    color: getCategoryColor(category),
    projects: groupedProjects[category],
  }));

  return (
    <section className="relative bg-linear-to-b from-white via-slate-50 to-blue-50 dark:from-black dark:via-gray-900 dark:to-black py-20 overflow-hidden">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 rounded-full text-blue-700 dark:text-blue-400 text-sm font-semibold tracking-wide mb-6">
            <Building2 className="w-4 h-4" />
            <span>OUR PROJECTS</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-gray-100">
            Projects & Clients
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Trusted by leading organizations across multiple verticals. Our expertise spans 
            Data Centers, ICT Infrastructure, and Security Solutions.
          </p>
        </div>

        {/* Project Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {projectCategories.map((category, index) => {
            const Icon = category.icon;
            const projectCount = category.projects.length;
            const displayProjects = category.projects.slice(0, 5);
            const hasMore = projectCount > 5;
            
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 rounded-2xl p-6 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-linear-to-br ${category.color} transition-opacity duration-500`}></div>

                {/* Header */}
                <div className="relative mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${category.color} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        {category.title}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-gray-500">{projectCount} {projectCount === 1 ? 'Project' : 'Projects'}</span>
                    </div>
                  </div>
                  <div className="h-0.5 w-full bg-linear-to-r from-blue-500 dark:from-blue-500/50 to-transparent rounded-full"></div>
                </div>

                {/* Projects List */}
                <div className="relative space-y-2">
                  {displayProjects.map((project, projectIndex) => (
                    <Link
                      key={projectIndex}
                      href={`/projects/${project._id}`}
                      className="flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-300 group/item cursor-pointer py-1"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-blue-500 dark:text-blue-500/50 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 group-hover/item:translate-x-1 transition-all duration-300 shrink-0" />
                      <span className="text-sm font-medium line-clamp-1">{project.client}</span>
                    </Link>
                  ))}
                  
                  {hasMore && (
                    <Link
                      href="/projects"
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 pt-2 text-sm font-semibold"
                    >
                      <span>+{projectCount - 5} more</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            );
          })}
        </div>


        {/* CTA Section */}
        <div className="relative bg-linear-to-r from-slate-100/80 via-blue-50/80 to-slate-100/80 dark:from-gray-900/60 dark:via-gray-800/60 dark:to-gray-900/60 backdrop-blur-sm border border-slate-200 dark:border-gray-700/50 rounded-2xl p-8 md:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-gray-100 mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-slate-600 dark:text-gray-400 mb-6 leading-relaxed max-w-2xl mx-auto">
              Let us help you build world-class infrastructure with our proven expertise 
              across Data Centers, ICT, and Security Solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white transition-colors duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40">
                Start Your Project
              </Link>
              <Link href="/projects" className="px-8 py-3 bg-slate-200 dark:bg-gray-800/80 border border-slate-300 dark:border-gray-700 hover:bg-slate-300 dark:hover:bg-gray-700/80 rounded-xl font-semibold text-slate-900 dark:text-gray-200 transition-all duration-300">
                View All Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectList;
