'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Server,
  Zap,
  Wind,
  Shield,
  Network,
  Activity,
  Gauge,
  CheckCircle2,
  ArrowRight,
  Building2,
  Clock,
  TrendingUp,
  Users,
  Award,
  Layers,
  Settings,
  Eye
} from 'lucide-react';

const DataCenterSolutionPage = () => {
  const heroFeatures = [
    'Tier-3 Compliant Design',
    '99.99% Uptime Guarantee',
    'Scalable Infrastructure',
    '24/7 Monitoring & Support'
  ];

  const services = [
    {
      icon: Building2,
      title: 'Data Center Design & Build',
      description: 'End-to-end data center design and construction services, from concept to commissioning.',
      features: [
        'Site assessment and planning',
        'Architectural and structural design',
        'MEP (Mechanical, Electrical, Plumbing) design',
        'Tier-3 and Tier-4 compliance',
        'Green data center solutions'
      ]
    },
    {
      icon: Zap,
      title: 'Power Infrastructure',
      description: 'Redundant power systems ensuring continuous operation with multiple backup layers.',
      features: [
        'UPS systems (single and parallel)',
        'Generator installation and integration',
        'Power distribution units (PDUs)',
        'Automatic transfer switches (ATS)',
        'Power monitoring and management'
      ]
    },
    {
      icon: Wind,
      title: 'Cooling Solutions',
      description: 'Advanced cooling systems maintaining optimal temperature and humidity levels.',
      features: [
        'Precision air conditioning',
        'Hot/cold aisle containment',
        'In-row cooling units',
        'Chilled water systems',
        'Free cooling solutions'
      ]
    },
    {
      icon: Shield,
      title: 'Physical Security',
      description: 'Multi-layered security systems protecting your critical infrastructure.',
      features: [
        'Biometric access control',
        '24/7 CCTV surveillance',
        'Mantrap entry systems',
        'Intrusion detection',
        'Security operations center (SOC)'
      ]
    },
    {
      icon: Network,
      title: 'Network Infrastructure',
      description: 'High-performance networking solutions for seamless connectivity.',
      features: [
        'Structured cabling (Cat6A, Cat7, fiber)',
        'Network switches and routers',
        'Redundant network paths',
        'Cable management systems',
        'Network monitoring tools'
      ]
    },
    {
      icon: Activity,
      title: 'Monitoring & Management',
      description: 'Comprehensive monitoring systems providing real-time visibility and control.',
      features: [
        'DCIM (Data Center Infrastructure Management)',
        'Environmental monitoring',
        'Power and energy monitoring',
        'Asset tracking and management',
        'Predictive maintenance alerts'
      ]
    }
  ];

  const brands = [
    {
      name: 'Schneider Electric',
      logo: '/datacenter-brands/schneider.jpeg',
      specialization: 'Power & Cooling Solutions'
    },
    {
      name: 'APC by Schneider Electric',
      logo: '/datacenter-brands/apc.png',
      specialization: 'UPS & Power Distribution'
    },
    {
      name: 'Vertiv (Liebert)',
      logo: '/datacenter-brands/liebert.jpg',
      specialization: 'Precision Cooling & Power'
    },
    {
      name: 'Eaton',
      logo: '/datacenter-brands/eaton.png',
      specialization: 'Power Management'
    },
    {
      name: 'Huawei',
      logo: '/datacenter-brands/huawei.png',
      specialization: 'Modular Data Centers'
    },
    {
      name: 'SDMO',
      logo: '/datacenter-brands/SDMO.avif',
      specialization: 'Generator Sets'
    },
    {
      name: 'Airedale',
      logo: '/datacenter-brands/airedale.webp',
      specialization: 'Cooling Systems'
    },
    {
      name: 'Yuasa',
      logo: '/datacenter-brands/yuasa.png',
      specialization: 'Battery Solutions'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Consultation & Assessment',
      description: 'Understanding your requirements, assessing the site, and defining project scope.',
      icon: Users
    },
    {
      step: '02',
      title: 'Design & Planning',
      description: 'Creating detailed designs, specifications, and implementation plans.',
      icon: Layers
    },
    {
      step: '03',
      title: 'Implementation',
      description: 'Professional installation and integration of all systems and components.',
      icon: Settings
    },
    {
      step: '04',
      title: 'Testing & Commissioning',
      description: 'Rigorous testing to ensure all systems meet performance standards.',
      icon: Gauge
    },
    {
      step: '05',
      title: 'Training & Handover',
      description: 'Comprehensive training and documentation for your operations team.',
      icon: Award
    },
    {
      step: '06',
      title: 'Support & Maintenance',
      description: 'Ongoing 24/7 support and preventive maintenance services.',
      icon: Eye
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'High Availability',
      description: '99.99% uptime with redundant systems and failover protection.'
    },
    {
      icon: Shield,
      title: 'Enhanced Security',
      description: 'Multi-layered physical and cyber security protecting your assets.'
    },
    {
      icon: Zap,
      title: 'Energy Efficiency',
      description: 'Optimized power usage and cooling for reduced operational costs.'
    },
    {
      icon: TrendingUp,
      title: 'Scalability',
      description: 'Flexible infrastructure that grows with your business needs.'
    },
    {
      icon: Clock,
      title: 'Quick Deployment',
      description: 'Efficient project execution minimizing time to operation.'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: '24/7 monitoring and support from certified professionals.'
    }
  ];

  const stats = [
    { value: '50+', label: 'Data Centers Delivered' },
    { value: '99.99%', label: 'Average Uptime' },
    { value: '24/7', label: 'Monitoring & Support' },
    { value: 'Tier-3', label: 'Compliance Standard' }
  ];

  const projects = [
    {
      name: 'Quara Finance Data Center',
      client: 'Quara Finance',
      location: 'Riyadh, Saudi Arabia',
      image: '/projects/WhatsApp Image 2025-10-26 at 21.38.37.jpeg'
    },
    {
      name: 'Royal Court IT Infrastructure',
      client: 'Royal Court',
      location: 'Riyadh, Saudi Arabia',
      image: '/projects/WhatsApp Image 2025-10-26 at 21.38.44.jpeg'
    },
    {
      name: 'Ministry of Defense Data Center',
      client: 'Ministry of Defense',
      location: 'Riyadh, Saudi Arabia',
      image: '/projects/WhatsApp Image 2025-10-26 at 21.38.49.jpeg'
    },
    {
      name: 'GOSI Enterprise Data Center',
      client: 'GOSI',
      location: 'Riyadh, Saudi Arabia',
      image: '/projects/WhatsApp Image 2025-10-26 at 21.38.54.jpeg'
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-slate-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-slate-900 dark:text-gray-100">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-100/20 via-slate-50 to-white dark:from-blue-900/20 dark:via-gray-900 dark:to-gray-950" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30 mb-6">
                <Server className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Data Center Solutions</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-gray-100 dark:via-blue-100 dark:to-gray-100 bg-clip-text text-transparent">
                Mission-Critical Data Center Infrastructure
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 mb-8 leading-relaxed">
                Design, build, and maintain world-class data centers with tier-3 compliance, 
                ensuring maximum uptime, security, and scalability for your critical operations.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {heroFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="text-slate-700 dark:text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white font-medium border border-slate-300 hover:border-blue-500/50 dark:border-gray-700 dark:hover:border-blue-500/50 transition-all duration-300 shadow-sm"
                >
                  <span>View Projects</span>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden border border-slate-200 dark:border-gray-800/50 shadow-xl dark:shadow-none">
                <Image
                  src="/data-center-images/Data-Centre-Illustration.jpg"
                  alt="Data Center Infrastructure"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-white/80 via-transparent to-transparent dark:from-gray-900 dark:via-transparent dark:to-transparent" />
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-6 left-6 right-6 grid grid-cols-2 gap-4">
                {stats.slice(0, 2).map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/95 backdrop-blur-sm border border-slate-200 shadow-lg dark:bg-gray-900/90 dark:border-gray-800/50 dark:shadow-none"
                  >
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                    <div className="text-xs text-slate-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30 mb-6">
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Comprehensive Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-gray-100 mb-4">
              Complete Data Center Solutions
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              From initial design to ongoing support, we provide end-to-end data center infrastructure services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-lg hover:shadow-xl dark:bg-gray-900/40 dark:border-gray-800/50 dark:hover:border-blue-500/30 dark:shadow-none transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-transparent dark:from-blue-500/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 border border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100 mb-3">{service.title}</h3>
                  <p className="text-slate-600 dark:text-gray-400 mb-4 leading-relaxed">{service.description}</p>

                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30 mb-6">
              <Settings className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Our Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-gray-100 mb-4">
              Proven Implementation Methodology
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              A systematic approach ensuring successful delivery of your data center project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((step, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-lg hover:shadow-xl dark:bg-gray-900/40 dark:border-gray-800/50 dark:hover:border-blue-500/30 dark:shadow-none transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-transparent dark:from-blue-500/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl font-bold text-blue-200 dark:text-blue-400/20">{step.step}</div>
                    <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100 mb-2">{step.title}</h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30 mb-6">
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Key Benefits</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-gray-100 mb-4">
              Why Choose Our Data Center Solutions
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the advantages of working with industry-leading experts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-lg hover:shadow-xl dark:bg-gray-900/40 dark:border-gray-800/50 dark:hover:border-blue-500/30 dark:shadow-none transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-transparent dark:from-blue-500/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100 mb-2">{benefit.title}</h3>
                    <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30 mb-6">
              <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Technology Partners</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-gray-100 mb-4">
              Leading Global Brands
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              We partner with world-renowned manufacturers to deliver best-in-class solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-lg hover:shadow-xl dark:bg-gray-900/40 dark:border-gray-800/50 dark:hover:border-blue-500/30 dark:shadow-none transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-transparent dark:from-blue-500/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative">
                  <div className="relative h-24 mb-4 flex items-center justify-center">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-gray-100 mb-1 text-center">{brand.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-gray-400 text-center">{brand.specialization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30 mb-6">
              <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Success Stories</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-gray-100 mb-4">
              Featured Data Center Projects
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Delivering excellence across government, enterprise, and commercial sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-blue-300 shadow-lg hover:shadow-xl dark:bg-gray-900/40 dark:border-gray-800/50 dark:hover:border-blue-500/30 dark:shadow-none transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-white via-white/50 to-transparent dark:from-gray-900 dark:via-gray-900/50 dark:to-transparent" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.client}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-gray-400">{project.location}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white font-medium border border-slate-300 hover:border-blue-500/50 dark:border-gray-700 dark:hover:border-blue-500/50 shadow-sm transition-all duration-300"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 rounded-2xl bg-linear-to-br from-blue-100/50 via-blue-50/30 to-transparent dark:from-blue-600/10 dark:via-blue-500/5 dark:to-transparent backdrop-blur-sm border border-blue-300 dark:border-blue-500/30 overflow-hidden shadow-xl dark:shadow-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-200/30 via-transparent to-transparent dark:from-blue-500/20 dark:via-transparent dark:to-transparent" />
            
            <div className="relative text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-gray-100 mb-4">
                Ready to Build Your Data Center?
              </h2>
              <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss your requirements and design a solution that meets your specific needs.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <span>Contact Our Experts</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white font-medium border border-slate-300 hover:border-blue-500/50 dark:border-gray-700 dark:hover:border-blue-500/50 shadow-sm transition-all duration-300"
                >
                  <span>Learn More About Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DataCenterSolutionPage;
