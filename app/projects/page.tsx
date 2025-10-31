"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Server,
  Network,
  Shield,
  Building2,
  Calendar,
  MapPin,
  CheckCircle,
  ArrowRight,
  Grid3x3,
  List,
} from "lucide-react";

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "data-center" | "ict" | "security"
  >("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = [
    { id: "all", label: "All Projects", icon: Building2 },
    { id: "data-center", label: "Data Center", icon: Server },
    { id: "ict", label: "ICT Solutions", icon: Network },
    { id: "security", label: "Security", icon: Shield },
  ];

  const projects = [
    // Data Center Projects
    {
      id: 1,
      title: "Quara Finance Data Center",
      category: "data-center",
      client: "Quara Finance",
      location: "Riyadh, Saudi Arabia",
      year: "2024",
      description:
        "Complete data center infrastructure design and implementation with redundant power systems, advanced cooling solutions, and tier-3 compliance.",
      images: ["/projects/WhatsApp Image 2025-10-26 at 21.38.37.jpeg"],
      tags: ["Infrastructure Design", "Power Systems", "Cooling", "Tier-3"],
      scope: [
        "Data Center Design",
        "Power Infrastructure",
        "Cooling Systems",
        "Network Cabling",
        "Security Integration",
      ],
    },
    {
      id: 2,
      title: "Royal Court IT Infrastructure",
      category: "data-center",
      client: "Royal Court",
      location: "Riyadh, Saudi Arabia",
      year: "2023",
      description:
        "Mission-critical data center with highest security standards, redundant systems, and 24/7 monitoring capabilities.",
      images: ["/projects/WhatsApp Image 2025-10-26 at 21.38.44.jpeg"],
      tags: ["Mission Critical", "High Security", "Redundancy", "Monitoring"],
      scope: [
        "Data Center Build",
        "Security Systems",
        "Network Infrastructure",
        "Backup Systems",
        "NOC Setup",
      ],
    },
    {
      id: 3,
      title: "Ministry of Defense Data Center",
      category: "data-center",
      client: "Ministry of Defense",
      location: "Riyadh, Saudi Arabia",
      year: "2023",
      description:
        "High-security government data center with military-grade specifications and compliance requirements.",
      images: ["/projects/WhatsApp Image 2025-10-26 at 21.38.49.jpeg"],
      tags: ["Government", "Military Grade", "Compliance", "High Security"],
      scope: [
        "Secure Infrastructure",
        "Access Control",
        "Network Design",
        "Power Backup",
        "Environmental Control",
      ],
    },
    {
      id: 4,
      title: "GOSI Enterprise Data Center",
      category: "data-center",
      client: "GOSI",
      location: "Riyadh, Saudi Arabia",
      year: "2022",
      description:
        "Large-scale enterprise data center supporting critical government services with high availability requirements.",
      images: ["/projects/WhatsApp Image 2025-10-26 at 21.38.54.jpeg"],
      tags: ["Enterprise", "High Availability", "Scalable", "Government"],
      scope: [
        "Data Center Infrastructure",
        "Storage Solutions",
        "Network Architecture",
        "Disaster Recovery",
        "Monitoring Systems",
      ],
    },

    // ICT Projects
    {
      id: 5,
      title: "Makkah Bus Company ICT Infrastructure",
      category: "ict",
      client: "Makkah Bus Company",
      location: "Makkah, Saudi Arabia",
      year: "2024",
      description:
        "Comprehensive ICT infrastructure including structured cabling, network systems, and communications setup for transportation hub.",
      images: ["/projects/WhatsApp Image 2025-10-26 at 21.39.16.jpeg"],
      tags: ["Structured Cabling", "Network", "Communications", "Transport"],
      scope: [
        "Network Infrastructure",
        "Structured Cabling",
        "WiFi Systems",
        "Voice Systems",
        "CCTV Integration",
      ],
    },
    {
      id: 6,
      title: "NCMS Network Infrastructure",
      category: "ict",
      client: "NCMS",
      location: "Riyadh, Saudi Arabia",
      year: "2024",
      description:
        "Advanced network infrastructure with fiber optics, structured cabling, and enterprise networking solutions.",
      images: ["/projects/WhatsApp Image 2025-10-26 at 21.39.20.jpeg"],
      tags: [
        "Fiber Optics",
        "Enterprise Network",
        "Infrastructure",
        "Connectivity",
      ],
      scope: [
        "Fiber Optic Cabling",
        "Network Design",
        "Switching Infrastructure",
        "Wireless Solutions",
        "Cable Management",
      ],
    },
    {
      id: 7,
      title: "Dallah Hospital ICT Systems",
      category: "ict",
      client: "Dallah Hospital",
      location: "Riyadh, Saudi Arabia",
      year: "2023",
      description:
        "Healthcare-grade ICT infrastructure with structured cabling, network systems, and integrated communication platforms.",
      images: ["/projects/WhatsApp Image 2025-10-26 at 21.39.27.jpeg"],
      tags: ["Healthcare", "Structured Cabling", "Network", "Communications"],
      scope: [
        "Hospital Network",
        "Medical Systems Integration",
        "Structured Cabling",
        "Wireless Coverage",
        "Voice Systems",
      ],
    },
    {
      id: 8,
      title: "Ericsson Office Network",
      category: "ict",
      client: "Ericsson",
      location: "Riyadh, Saudi Arabia",
      year: "2023",
      description:
        "Corporate office network infrastructure with advanced cabling systems and high-speed connectivity.",
      images: ["/projects/WhatsApp Image 2025-10-26 at 21.39.32.jpeg"],
      tags: ["Corporate", "High Speed", "Structured Cabling", "Office Network"],
      scope: [
        "Office Cabling",
        "Network Setup",
        "Access Points",
        "Phone Systems",
        "Conference Systems",
      ],
    },

    // Security Projects
    {
      id: 9,
      title: "NCMS Security Systems",
      category: "security",
      client: "NCMS",
      location: "Riyadh, Saudi Arabia",
      year: "2024",
      description:
        "Comprehensive security solution including CCTV surveillance, access control, and intrusion detection systems.",
      images: ["/projects/WhatsApp Image 2025-10-26 at 21.38.37.jpeg"],
      tags: ["CCTV", "Access Control", "Intrusion Detection", "Monitoring"],
      scope: [
        "CCTV Systems",
        "Access Control",
        "Alarm Systems",
        "Perimeter Security",
        "Control Room Setup",
      ],
    },
    {
      id: 10,
      title: "King Khalid Masjid Security",
      category: "security",
      client: "King Khalid Masjid",
      location: "Riyadh, Saudi Arabia",
      year: "2023",
      description:
        "Advanced security infrastructure for religious facility with crowd management and safety systems.",
      images: ["/projects/WhatsApp Image 2025-10-26 at 21.38.44.jpeg"],
      tags: ["CCTV", "Crowd Management", "Public Safety", "Monitoring"],
      scope: [
        "Video Surveillance",
        "Public Address System",
        "Emergency Systems",
        "Access Management",
        "Monitoring Center",
      ],
    },
    {
      id: 11,
      title: "Hitachi Facility Security",
      category: "security",
      client: "Hitachi",
      location: "Riyadh, Saudi Arabia",
      year: "2023",
      description:
        "Corporate facility security with integrated CCTV, access control, and perimeter protection systems.",
      images: ["/projects/WhatsApp Image 2025-10-26 at 21.38.49.jpeg"],
      tags: ["Corporate Security", "CCTV", "Access Control", "Perimeter"],
      scope: [
        "Surveillance Systems",
        "Access Control",
        "Visitor Management",
        "Parking Security",
        "Integration Platform",
      ],
    },
    {
      id: 12,
      title: "ABB Security Infrastructure",
      category: "security",
      client: "ABB",
      location: "Riyadh, Saudi Arabia",
      year: "2022",
      description:
        "Industrial facility security with advanced monitoring, access control, and safety integration systems.",
      images: ["/projects/WhatsApp Image 2025-10-26 at 21.38.54.jpeg"],
      tags: ["Industrial", "CCTV", "Safety", "Monitoring"],
      scope: [
        "Industrial CCTV",
        "Access Control",
        "Safety Integration",
        "Analytics",
        "Central Monitoring",
      ],
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const stats = [
    { value: "50+", label: "Completed Projects" },
    { value: "3", label: "Service Verticals" },
    { value: "99%", label: "Success Rate" },
    { value: "24/7", label: "Support Available" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-slate-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-slate-900 dark:text-gray-100 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-100/30 via-slate-50 to-white dark:from-blue-900/20 dark:via-gray-900 dark:to-gray-950" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 dark:opacity-10" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-10 px-6">
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

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 shadow-lg dark:shadow-none"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="relative py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    setActiveFilter(
                      category.id as "all" | "data-center" | "ict" | "security"
                    )
                  }
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeFilter === category.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : "bg-white dark:bg-gray-900/40 text-slate-600 dark:text-gray-400 border border-slate-200 dark:border-gray-800/50 hover:border-blue-400 dark:hover:border-blue-500/30 shadow-md dark:shadow-none"
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 p-1 rounded-xl bg-white dark:bg-gray-900/40 border border-slate-200 dark:border-gray-800/50 shadow-md dark:shadow-none">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-300"
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-300"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Projects Count */}
          <div className="mb-8">
            <p className="text-slate-600 dark:text-gray-400">
              Showing{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {filteredProjects.length}
              </span>{" "}
              projects
            </p>
          </div>

          {/* Projects Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative rounded-2xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 overflow-hidden shadow-lg dark:shadow-none"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-white via-white/50 to-transparent dark:from-gray-900 dark:via-gray-900/50 dark:to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-sm text-xs font-medium text-white">
                        {
                          categories.find((c) => c.id === project.category)
                            ?.label
                        }
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="relative p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{project.year}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location.split(",")[0]}</span>
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-gray-800/50 text-xs text-slate-600 dark:text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View Details Button */}
                    <Link
                      href={`/projects/${project.id}`}
                      className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/btn"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group relative rounded-2xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 overflow-hidden block shadow-lg dark:shadow-none"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative flex flex-col md:flex-row gap-6 p-6">
                    {/* Project Image */}
                    <div className="relative w-full md:w-80 h-64 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <div className="px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-sm text-xs font-medium text-white">
                          {
                            categories.find((c) => c.id === project.category)
                              ?.label
                          }
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          <span>{project.client}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{project.year}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{project.location}</span>
                        </div>
                      </div>

                      <p className="text-slate-600 dark:text-gray-400 mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Scope */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-slate-800 dark:text-gray-300 mb-2">
                          Project Scope:
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {project.scope.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400"
                            >
                              <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-gray-800/50 text-xs text-slate-600 dark:text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 rounded-2xl bg-linear-to-br from-blue-100/80 via-blue-50/50 to-transparent dark:from-blue-600/10 dark:via-blue-500/5 dark:to-transparent backdrop-blur-sm border border-blue-300 dark:border-blue-500/30 overflow-hidden shadow-xl dark:shadow-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-200/40 via-transparent to-transparent dark:from-blue-500/20 dark:via-transparent dark:to-transparent" />
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
