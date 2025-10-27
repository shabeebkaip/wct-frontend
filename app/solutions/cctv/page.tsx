'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Camera,
  Eye,
  Shield,
  Bell,
  Monitor,
  Smartphone,
  Cloud,
  CheckCircle2,
  ArrowRight,
  Building2,
  Clock,
  Users,
  Award,
  Layers,
  Settings,
  Zap,
  TrendingUp,
  Video,
  ScanFace,
  MapPin,
  Wifi,
  HardDrive,
  SearchCheck
} from 'lucide-react';

const CCTVSolutionPage = () => {
  const heroFeatures = [
    '24/7 Real-time Monitoring',
    'AI-Powered Analytics',
    'Remote Access & Control',
    'Scalable Infrastructure'
  ];

  const services = [
    {
      icon: Camera,
      title: 'CCTV Installation & Design',
      description: 'Complete surveillance system design and professional installation tailored to your facility requirements.',
      features: [
        'Site survey and assessment',
        'Camera placement optimization',
        'Network infrastructure design',
        'Multi-site integration',
        'Future-proof scalability'
      ]
    },
    {
      icon: Eye,
      title: 'IP & Analog Camera Systems',
      description: 'High-definition cameras with advanced features for comprehensive coverage and crystal-clear footage.',
      features: [
        'HD/4K IP cameras',
        'PTZ (Pan-Tilt-Zoom) cameras',
        'Day/night vision cameras',
        'Thermal imaging cameras',
        'License plate recognition (LPR)'
      ]
    },
    {
      icon: HardDrive,
      title: 'Video Recording Solutions',
      description: 'Robust recording systems with redundancy and extended retention capabilities.',
      features: [
        'Network Video Recorders (NVR)',
        'Digital Video Recorders (DVR)',
        'Cloud storage integration',
        'RAID storage systems',
        'Automated backup solutions'
      ]
    },
    {
      icon: Monitor,
      title: 'Control Room Setup',
      description: 'Professional control room infrastructure for efficient monitoring and management.',
      features: [
        'Video wall displays',
        'Operator workstations',
        'Multi-monitor setups',
        'Command & control software',
        'Ergonomic design'
      ]
    },
    {
      icon: Smartphone,
      title: 'Remote Monitoring',
      description: 'Access your surveillance system anytime, anywhere with mobile and web applications.',
      features: [
        'Mobile app access (iOS/Android)',
        'Web-based viewing',
        'Real-time alerts',
        'Multi-device support',
        'Secure remote access'
      ]
    },
    {
      icon: SearchCheck,
      title: 'Video Analytics & AI',
      description: 'Intelligent video analysis for proactive security and business insights.',
      features: [
        'Motion detection & tracking',
        'Facial recognition',
        'People counting',
        'Perimeter intrusion detection',
        'Behavior analysis'
      ]
    }
  ];

  const brands = [
    {
      name: 'Hikvision',
      logo: '/clients/hikvision.png',
      specialization: 'IP Cameras & NVR Systems'
    },
    {
      name: 'Axis Communications',
      logo: '/clients/axis-communications.jpg',
      specialization: 'Network Cameras & Solutions'
    },
    {
      name: 'Bosch Security',
      logo: '/clients/bosch.png',
      specialization: 'Video Surveillance Systems'
    },
    {
      name: 'Samsung',
      logo: '/clients/samsung.png',
      specialization: 'Smart Security Solutions'
    },
    {
      name: 'American Dynamics',
      logo: '/clients/american-dynamics.png',
      specialization: 'Video Management Software'
    },
    {
      name: 'Nitgen',
      logo: '/clients/nitgen.jpg',
      specialization: 'Biometric Integration'
    }
  ];

  const solutions = [
    {
      icon: Building2,
      title: 'Corporate & Office',
      description: 'Comprehensive security for business premises, protecting assets and employees.',
      applications: ['Office buildings', 'Reception areas', 'Parking facilities', 'Warehouses']
    },
    {
      icon: Shield,
      title: 'Government & Public',
      description: 'High-security surveillance meeting government compliance and safety standards.',
      applications: ['Government buildings', 'Public spaces', 'Transportation hubs', 'Border security']
    },
    {
      icon: Users,
      title: 'Retail & Commercial',
      description: 'Loss prevention and customer behavior analytics for retail environments.',
      applications: ['Shopping malls', 'Retail stores', 'Restaurants', 'Banks']
    },
    {
      icon: Building2,
      title: 'Education & Healthcare',
      description: 'Safe and secure environments for students, patients, and staff.',
      applications: ['Schools & universities', 'Hospitals', 'Medical facilities', 'Research centers']
    },
    {
      icon: Shield,
      title: 'Industrial & Manufacturing',
      description: 'Robust surveillance for harsh environments and safety monitoring.',
      applications: ['Factories', 'Power plants', 'Oil & gas facilities', 'Construction sites']
    },
    {
      icon: Building2,
      title: 'Residential & Hospitality',
      description: 'Ensuring safety and comfort for residents and guests.',
      applications: ['Residential compounds', 'Hotels', 'Resorts', 'Apartment buildings']
    }
  ];

  const features = [
    {
      icon: Video,
      title: 'High-Definition Recording',
      description: 'Crystal-clear 4K video quality capturing every detail.'
    },
    {
      icon: Clock,
      title: '24/7 Continuous Recording',
      description: 'Round-the-clock surveillance with reliable storage systems.'
    },
    {
      icon: ScanFace,
      title: 'Facial Recognition',
      description: 'Advanced AI-powered facial recognition technology.'
    },
    {
      icon: Bell,
      title: 'Instant Alerts',
      description: 'Real-time notifications for security events and incidents.'
    },
    {
      icon: Cloud,
      title: 'Cloud Integration',
      description: 'Secure cloud backup and storage solutions.'
    },
    {
      icon: Wifi,
      title: 'Wireless Options',
      description: 'Flexible wireless camera deployments where needed.'
    },
    {
      icon: Eye,
      title: 'Night Vision',
      description: 'Infrared technology for clear footage in low-light conditions.'
    },
    {
      icon: Zap,
      title: 'Weather Resistant',
      description: 'IP66/IP67 rated cameras for outdoor environments.'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Site Assessment',
      description: 'Comprehensive evaluation of your premises to identify security needs and optimal camera placement.',
      icon: MapPin
    },
    {
      step: '02',
      title: 'System Design',
      description: 'Custom surveillance system design including camera types, coverage areas, and infrastructure.',
      icon: Layers
    },
    {
      step: '03',
      title: 'Installation',
      description: 'Professional installation by certified technicians ensuring optimal performance.',
      icon: Settings
    },
    {
      step: '04',
      title: 'Configuration',
      description: 'System setup, network configuration, and integration with existing security systems.',
      icon: Settings
    },
    {
      step: '05',
      title: 'Training',
      description: 'Comprehensive operator training on system use, monitoring, and basic troubleshooting.',
      icon: Users
    },
    {
      step: '06',
      title: 'Support & Maintenance',
      description: 'Ongoing technical support and preventive maintenance services.',
      icon: Award
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Enhanced Security',
      description: 'Deter crime and protect your assets with visible surveillance presence.'
    },
    {
      icon: Eye,
      title: 'Real-time Monitoring',
      description: 'Live viewing from anywhere with instant access to all cameras.'
    },
    {
      icon: HardDrive,
      title: 'Evidence Recording',
      description: 'High-quality recordings for investigation and legal purposes.'
    },
    {
      icon: TrendingUp,
      title: 'Operational Insights',
      description: 'Analytics providing valuable business intelligence and insights.'
    },
    {
      icon: Bell,
      title: 'Instant Alerts',
      description: 'Immediate notifications of security breaches or unusual activity.'
    },
    {
      icon: Smartphone,
      title: 'Remote Access',
      description: 'Monitor your premises from anywhere using mobile devices.'
    }
  ];

  const stats = [
    { value: '100+', label: 'CCTV Projects Completed' },
    { value: '10,000+', label: 'Cameras Installed' },
    { value: '24/7', label: 'Technical Support' },
    { value: '99.9%', label: 'System Uptime' }
  ];

  const projects = [
    {
      name: 'NCMS Security Systems',
      location: 'Riyadh, Saudi Arabia',
      type: 'Government',
      image: '/projects/WhatsApp Image 2025-10-26 at 21.38.37.jpeg'
    },
    {
      name: 'King Khalid Masjid Security',
      location: 'Riyadh, Saudi Arabia',
      type: 'Public Facility',
      image: '/projects/WhatsApp Image 2025-10-26 at 21.38.44.jpeg'
    },
    {
      name: 'Hitachi Facility Security',
      location: 'Riyadh, Saudi Arabia',
      type: 'Corporate',
      image: '/projects/WhatsApp Image 2025-10-26 at 21.38.49.jpeg'
    },
    {
      name: 'ABB Security Infrastructure',
      location: 'Riyadh, Saudi Arabia',
      type: 'Industrial',
      image: '/projects/WhatsApp Image 2025-10-26 at 21.38.54.jpeg'
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/20 via-gray-900 to-gray-950" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
                <Camera className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">CCTV Surveillance Solutions</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-linear-to-r from-gray-100 via-blue-100 to-gray-100 bg-clip-text text-transparent">
                Advanced Security Through Intelligent Surveillance
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                Protect your assets with cutting-edge CCTV surveillance systems featuring AI-powered 
                analytics, remote monitoring, and crystal-clear HD recording capabilities.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {heroFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <span>Request Consultation</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                >
                  <span>View Projects</span>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden border border-gray-800/50">
                <Image
                  src="/cctv.avif"
                  alt="CCTV Surveillance System"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent" />
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-6 left-6 right-6 grid grid-cols-2 gap-4">
                {stats.slice(0, 2).map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-gray-900/90 backdrop-blur-sm border border-gray-800/50"
                  >
                    <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
              <Layers className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Complete Surveillance Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-4">
              End-to-End CCTV Solutions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From design to maintenance, we provide comprehensive surveillance solutions tailored to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-blue-400" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-100 mb-3">{service.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{service.description}</p>

                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
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

      {/* Features Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Advanced Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-4">
              Cutting-Edge Technology
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our CCTV systems come equipped with the latest features for enhanced security and performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-100 mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Industry Solutions</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-4">
              Tailored for Every Industry
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Customized surveillance solutions designed for specific industry requirements and challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <solution.icon className="w-7 h-7 text-blue-400" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-100 mb-3">{solution.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{solution.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {solution.applications.map((app, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-gray-800/50 text-xs text-gray-400"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
              <Settings className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Implementation Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-4">
              Professional Installation Process
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our systematic approach ensures seamless deployment and optimal performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((step, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl font-bold text-blue-400/20">{step.step}</div>
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-100 mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Key Benefits</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-4">
              Why Choose Our CCTV Solutions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive security solutions delivering peace of mind and operational efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-gray-100 mb-2">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
              <Award className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Trusted Partners</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-4">
              World-Class CCTV Brands
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We partner with leading global manufacturers to deliver reliable, high-performance systems.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative">
                  <div className="relative h-24 mb-4 flex items-center justify-center">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-100 mb-1 text-center">{brand.name}</h3>
                  <p className="text-xs text-gray-400 text-center">{brand.specialization}</p>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
              <Camera className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Success Stories</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-4">
              Featured Security Projects
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Delivering comprehensive surveillance solutions across multiple sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-sm text-xs font-medium text-white">
                      {project.type}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-100 mb-2 group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
            >
              <span>View All Security Projects</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 rounded-2xl bg-linear-to-br from-blue-600/10 via-blue-500/5 to-transparent backdrop-blur-sm border border-blue-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
            
            <div className="relative text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
                Secure Your Premises Today
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Get a free consultation and security assessment from our experts. Let&apos;s design the perfect surveillance solution for you.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <span>Request Free Consultation</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
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

export default CCTVSolutionPage;
