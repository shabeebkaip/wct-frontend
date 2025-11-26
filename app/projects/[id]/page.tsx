import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Building2,
  CheckCircle,
  Target,
  Award,
  Zap,
  Shield,
  TrendingUp,
  Settings,
  MessageSquare,
  Star,
  Clock,
  DollarSign,
  Briefcase,
  Users,
} from 'lucide-react';
import { Project } from '@/types/project';
import ProjectDetailClient from '@/components/projects/ProjectDetailClient';

async function getProject(id: string): Promise<Project | null> {
  try {
    // Validate ObjectId format
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      console.error('Invalid project ID format:', id);
      return null;
    }

    const connectDB = (await import('@/lib/mongodb')).default;
    const ProjectModel = (await import('@/lib/models/Project')).default;
    await connectDB();
    
    const project = await ProjectModel.findById(id).lean();
    if (project) {
      // Convert MongoDB document to plain object with _id as string
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const plainProject: any = {
        ...project,
        _id: project._id.toString(),
      };
      
      // Convert testimonial._id to string if it exists
      if (plainProject.testimonial && plainProject.testimonial._id) {
        plainProject.testimonial = {
          ...plainProject.testimonial,
          _id: plainProject.testimonial._id.toString(),
        };
      }
      
      return plainProject;
    }
    
    console.error('Project not found with ID:', id);
  } catch (error) {
    console.error('Error fetching project from database:', error);
  }
  return null;
}

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { id } = await params;
  const project = await getProject(id);
  console.log('Fetched project:', project);
  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-gray-100 mb-4">Project Not Found</h1>
          <p className="text-slate-600 dark:text-gray-400 mb-6">The project you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all">
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-slate-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-slate-900 dark:text-gray-100">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-100/30 via-slate-50 to-white dark:from-blue-900/20 dark:via-gray-900 dark:to-gray-950" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 dark:opacity-10" />
      </div>

      {/* Back Button */}
      <div className="container mx-auto px-6 pt-36 pb-8">
        <Link 
          href="/projects"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 pb-12">
        <div className="container mx-auto">
          
          {/* Two Column Layout - Image Left, Info Right */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            
            {/* Left - Image Gallery */}
            <div className="rounded-xl overflow-hidden">
              <ProjectDetailClient project={project} />
            </div>

            {/* Right - Title, Description & Key Meta Cards */}
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 mb-3 w-fit">
                <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-medium text-blue-700 dark:text-blue-400">
                  {project.category === 'data-center' ? 'Data Center' 
                    : project.category === 'structured-cabling' ? 'Structured Cabling'
                    : project.category === 'low-current-solutions' ? 'Low Current Solutions'
                    : project.category === 'low-voltage' ? 'Low Voltage'
                    : project.category === 'control-rooms' ? 'Control Rooms'
                    : project.category}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-gray-100 mb-3 leading-tight">
                {project.title}
              </h1>

              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Compact Meta Info - Responsive Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                <div className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1 min-w-0">
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-gray-500 shrink-0">Client:</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-gray-100 wrap-break-word">{project.client}</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1 min-w-0">
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-gray-500 shrink-0">Location:</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-gray-100 wrap-break-word">{project.location}</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1 min-w-0">
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-gray-500 shrink-0">Year:</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-gray-100">{project.year}</span>
                  </div>
                </div>
                
                {project.status && (
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1 min-w-0">
                      <span className="text-xs sm:text-sm text-slate-500 dark:text-gray-500 shrink-0">Status:</span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-gray-100 capitalize">{project.status}</span>
                    </div>
                  </div>
                )}
                
                {project.duration && (
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1 min-w-0">
                      <span className="text-xs sm:text-sm text-slate-500 dark:text-gray-500 shrink-0">Duration:</span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-gray-100">{project.duration}</span>
                    </div>
                  </div>
                )}
                
                {project.projectValue && (
                  <div className="flex items-start gap-2">
                    <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1 min-w-0">
                      <span className="text-xs sm:text-sm text-slate-500 dark:text-gray-500 shrink-0">Value:</span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-gray-100 wrap-break-word">{project.projectValue}</span>
                    </div>
                  </div>
                )}
                
                {project.industry && (
                  <div className="flex items-start gap-2">
                    <Briefcase className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1 min-w-0">
                      <span className="text-xs sm:text-sm text-slate-500 dark:text-gray-500 shrink-0">Industry:</span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-gray-100 wrap-break-word">{project.industry}</span>
                    </div>
                  </div>
                )}
                
                {project.teamSize && (
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1 min-w-0">
                      <span className="text-xs sm:text-sm text-slate-500 dark:text-gray-500 shrink-0">Team:</span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-gray-100">{project.teamSize}</span>
                    </div>
                  </div>
                )}
                
                {project.complexity && (
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1 min-w-0">
                      <span className="text-xs sm:text-sm text-slate-500 dark:text-gray-500 shrink-0">Complexity:</span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-gray-100 capitalize">{project.complexity}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Grid - Two Column Layout */}
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8 space-y-5">

              {/* Overview */}
              {project.overview && (
                <div className="rounded-lg bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 p-5 shadow-sm dark:shadow-none">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Overview
                  </h2>
                  <div 
                    className="prose prose-sm prose-slate dark:prose-invert max-w-none prose-headings:text-base prose-headings:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-p:text-slate-700 dark:prose-p:text-gray-300 prose-p:text-sm"
                    dangerouslySetInnerHTML={{ __html: project.overview }}
                  />
                </div>
              )}

              {/* Challenge & Solution */}
              {(project.challenge || project.solution) && (
                <div className="grid sm:grid-cols-2 gap-3">
                  {project.challenge && (
                    <div className="rounded-lg bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 p-4 shadow-sm dark:shadow-none">
                      <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        Challenge
                      </h3>
                      <div 
                        className="prose prose-sm prose-slate dark:prose-invert max-w-none prose-p:text-slate-600 dark:prose-p:text-gray-400 prose-p:text-sm"
                        dangerouslySetInnerHTML={{ __html: project.challenge }}
                      />
                    </div>
                  )}
                  {project.solution && (
                    <div className="rounded-lg bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 p-4 shadow-sm dark:shadow-none">
                      <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                        Solution
                      </h3>
                      <div 
                        className="prose prose-sm prose-slate dark:prose-invert max-w-none prose-p:text-slate-600 dark:prose-p:text-gray-400 prose-p:text-sm"
                        dangerouslySetInnerHTML={{ __html: project.solution }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Scope & Results */}
              <div className="grid sm:grid-cols-2 gap-3">
                {/* Project Scope */}
                {project.scope && project.scope.length > 0 && (
                  <div className="rounded-lg bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 p-4 shadow-sm dark:shadow-none">
                    <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      Scope
                    </h3>
                    <div className="space-y-2">
                      {project.scope.slice(0, 5).map((item: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 shrink-0" />
                          <span className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results */}
                {project.results && project.results.length > 0 && (
                  <div className="rounded-lg bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-500/5 dark:to-emerald-500/5 backdrop-blur-sm border border-green-200 dark:border-green-500/20 p-4 shadow-sm dark:shadow-none">
                    <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                      Results
                    </h3>
                    <div className="space-y-2">
                      {project.results.slice(0, 5).map((result: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Star className="w-3.5 h-3.5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed font-medium">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Testimonial */}
              {project.testimonial && project.testimonial.quote && (
                <div className="rounded-lg bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-500/5 dark:to-indigo-500/5 backdrop-blur-sm border border-blue-200 dark:border-blue-500/30 p-5 shadow-sm dark:shadow-none">
                  <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-3" />
                  <blockquote className="text-base italic text-slate-700 dark:text-gray-300 leading-relaxed mb-4">
                    &quot;{project.testimonial.quote}&quot;
                  </blockquote>
                  <div className="flex items-center gap-3 pt-3 border-t border-blue-200 dark:border-blue-500/20">
                    <div className="h-10 w-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                    <div>
                      <div className="font-semibold text-sm text-slate-900 dark:text-gray-100">{project.testimonial.author}</div>
                      <div className="text-sm text-slate-600 dark:text-gray-400">{project.testimonial.position}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar - Quick Info */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Services */}
              {project.services && project.services.length > 0 && (
                <div className="rounded-xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 p-4 shadow-lg dark:shadow-none">
                  <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Services
                  </h3>
                  <div className="space-y-2">
                    {project.services.slice(0, 6).map((service: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="rounded-xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 p-4 shadow-lg dark:shadow-none">
                  <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-gray-800/50 text-sm font-medium text-slate-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div className="rounded-xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 p-4 shadow-lg dark:shadow-none">
                  <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Key Features
                  </h3>
                  <div className="space-y-2">
                    {project.keyFeatures.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Specifications */}
              {project.specifications && Object.keys(project.specifications).length > 0 && (
                <div className="rounded-xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 p-5 shadow-lg dark:shadow-none">
                  <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    Specifications
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(project.specifications).map(([key, value], idx) => (
                      <div key={idx} className="flex flex-col gap-1 py-2 border-b border-slate-100 dark:border-gray-800 last:border-0">
                        <span className="text-sm text-slate-500 dark:text-gray-500 font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-sm font-semibold text-slate-900 dark:text-gray-100">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {project.certifications && project.certifications.length > 0 && (
                <div className="rounded-xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 p-4 shadow-lg dark:shadow-none">
                  <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Certifications
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.certifications.map((cert: string, idx: number) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 text-sm font-medium text-blue-700 dark:text-blue-400"
                      >
                        <Award className="w-3 h-3" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 rounded-2xl bg-blue-50/50 dark:bg-blue-500/5 backdrop-blur-sm border border-blue-300 dark:border-blue-500/30 text-center shadow-xl dark:shadow-none">
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
