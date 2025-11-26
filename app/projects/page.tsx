import Link from "next/link";
import {
  Building2,
  ArrowRight,
} from "lucide-react";
import ProjectsClient from '@/components/projects/ProjectsClient';

async function getProjects() {
  try {
    const connectDB = (await import('@/lib/mongodb')).default;
    const Project = (await import('@/lib/models/Project')).default;
    await connectDB();
    const projects = await Project.find().lean();
    if (projects && projects.length > 0) {
      // Convert MongoDB documents to plain objects with _id as string
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedProjects = projects.map((project: any) => {
        const plainProject = {
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
      });
      console.log(`Fetched ${mappedProjects.length} projects from database`);
      return mappedProjects;
    }
    console.log('No projects found in database');
  } catch (error) {
    console.error('Error fetching projects from database:', error);
  }
  return [];
}

const ProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-slate-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-slate-900 dark:text-gray-100 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-100/30 via-slate-50 to-white dark:from-blue-900/20 dark:via-gray-900 dark:to-gray-950" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 dark:opacity-10" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-36 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 mb-6">
              <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                Our Portfolio
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-linear-to-r from-slate-900 via-blue-700 to-slate-900 dark:from-gray-100 dark:via-blue-100 dark:to-gray-100 bg-clip-text text-transparent">
              Delivering Excellence Across Industries
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of successfully completed projects spanning
              Data Centers, ICT Infrastructure, and Security Solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Projects List - Client Component */}
      <ProjectsClient projects={projects} />

      {/* CTA Section - Moved from below */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 rounded-2xl bg-blue-50/50 dark:bg-blue-500/5 backdrop-blur-sm border border-blue-300 dark:border-blue-500/30 overflow-hidden shadow-xl dark:shadow-none">
            <div className="relative text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-gray-100 mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss how we can bring your infrastructure vision
                to life with our proven expertise.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 flex items-center gap-2"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-3 rounded-xl bg-slate-200 dark:bg-gray-800 hover:bg-slate-300 dark:hover:bg-gray-700 text-slate-900 dark:text-white font-medium border border-slate-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500/50 transition-all duration-300"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
