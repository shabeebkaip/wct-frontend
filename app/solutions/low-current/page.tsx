'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Network,
  Wifi,
  Radio,
  Phone,
  Speaker,
  Tv,
  Building2,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  Clock,
  Users,
  Award,
  Layers,
  Settings,
  TrendingUp,
  Database,
  Gauge,
  MapPin,
  Cpu
} from 'lucide-react';

const LowCurrentSolutionPage = () => {
  const heroFeatures = [
    'End-to-End ICT Solutions',
    'Certified Professionals',
    'Future-Ready Infrastructure',
    'Comprehensive Support'
  ];

  const services = [
    {
      icon: Network,
      title: 'Network Infrastructure',
      description: 'Complete network design and implementation for reliable, high-speed connectivity.',
      features: [
        'LAN/WAN network design',
        'Switch and router configuration',
        'Network security implementation',
        'VLAN setup and optimization',
        'Network monitoring tools'
      ]
    },
    {
      icon: Wifi,
      title: 'Wireless Solutions',
      description: 'Enterprise-grade wireless networks providing seamless coverage and performance.',
      features: [
        'WiFi 6/6E access points',
        'Site survey and heat mapping',
        'Wireless controller setup',
        'Guest network configuration',
        'Roaming optimization'
      ]
    },
    {
      icon: Phone,
      title: 'Telephony Systems',
      description: 'Modern communication systems including VoIP, IP-PBX, and unified communications.',
      features: [
        'IP-PBX installation',
        'VoIP phone systems',
        'SIP trunking integration',
        'Call recording solutions',
        'Unified communications'
      ]
    },
    {
      icon: Speaker,
      title: 'Audio-Visual Systems',
      description: 'Professional AV solutions for meeting rooms, auditoriums, and conference facilities.',
      features: [
        'Conference room systems',
        'Video conferencing setup',
        'Digital signage',
        'Public address systems',
        'Audio distribution'
      ]
    },
    {
      icon: Building2,
      title: 'Building Management',
      description: 'Integrated building automation and management systems for smart facilities.',
      features: [
        'BMS integration',
        'Access control systems',
        'Fire alarm integration',
        'Environmental monitoring',
        'Energy management'
      ]
    },
    {
      icon: Tv,
      title: 'IPTV & MATV Systems',
      description: 'Television distribution systems for hospitality, healthcare, and commercial buildings.',
      features: [
        'IPTV headend setup',
        'Digital TV distribution',
        'Interactive TV solutions',
        'Satellite systems (MATV)',
        'Content management'
      ]
    },
    {
      icon: Radio,
      title: 'Intercom & Paging',
      description: 'Communication systems for internal announcements and emergency notifications.',
      features: [
        'IP intercom systems',
        'Paging systems',
        'Emergency communication',
        'Zone-based announcements',
        'Integration with other systems'
      ]
    },
    {
      icon: Database,
      title: 'System Integration',
      description: 'Seamless integration of multiple low-current systems for unified management.',
      features: [
        'Multi-system integration',
        'Centralized monitoring',
        'API integration',
        'Automation workflows',
        'Single dashboard management'
      ]
    }
  ];

  const solutions = [
    {
      icon: Building2,
      title: 'Corporate Offices',
      description: 'Complete ICT infrastructure for modern workplaces enabling productivity and collaboration.',
      applications: [
        'Network infrastructure',
        'WiFi coverage',
        'VoIP systems',
        'Conference room AV',
        'Building automation'
      ]
    },
    {
      icon: Building2,
      title: 'Healthcare Facilities',
      description: 'Reliable, secure infrastructure supporting critical healthcare operations and patient care.',
      applications: [
        'Hospital networks',
        'Nurse call systems',
        'IPTV for patients',
        'Wireless systems',
        'Medical equipment connectivity'
      ]
    },
    {
      icon: Users,
      title: 'Education Institutions',
      description: 'Smart campus solutions enabling digital learning and administrative efficiency.',
      applications: [
        'Campus-wide networking',
        'WiFi for students',
        'Digital classrooms',
        'Public address systems',
        'Security integration'
      ]
    },
    {
      icon: Building2,
      title: 'Hospitality',
      description: 'Guest experience enhancement through integrated communication and entertainment systems.',
      applications: [
        'Guest WiFi',
        'IPTV systems',
        'Phone systems',
        'Digital signage',
        'Conference facilities'
      ]
    },
    {
      icon: Shield,
      title: 'Government Buildings',
      description: 'Secure, compliant infrastructure meeting stringent government requirements.',
      applications: [
        'Secure networks',
        'Access control integration',
        'Emergency systems',
        'Conference rooms',
        'Building management'
      ]
    },
    {
      icon: Building2,
      title: 'Industrial & Manufacturing',
      description: 'Robust infrastructure supporting industrial operations and automation systems.',
      applications: [
        'Industrial networking',
        'Wireless in harsh environments',
        'SCADA integration',
        'Plant-wide communication',
        'Automation systems'
      ]
    }
  ];

  /* const standards = [
    {
      icon: Award,
      title: 'ISO/IEC 11801',
      description: 'International cabling standards compliance'
    },
    {
      icon: Award,
      title: 'TIA/EIA 568',
      description: 'Commercial building telecommunications'
    },
    {
      icon: Award,
      title: 'EN 50173',
      description: 'European cabling standards'
    },
    {
      icon: Shield,
      title: 'BICSI Certified',
      description: 'Industry-certified installation teams'
    },
    {
      icon: CheckCircle2,
      title: 'Fluke Certified',
      description: 'Professional testing and certification'
    },
    {
      icon: Award,
      title: '25-Year Warranty',
      description: 'Extended warranty on cabling systems'
    }
  ]; */

  const process = [
    {
      step: '01',
      title: 'Site Survey & Analysis',
      description: 'Comprehensive assessment of your facility and infrastructure requirements.',
      icon: MapPin
    },
    {
      step: '02',
      title: 'Design & Engineering',
      description: 'Detailed design drawings, BOQ, and technical specifications.',
      icon: Layers
    },
    {
      step: '03',
      title: 'Material Procurement',
      description: 'Sourcing quality materials from certified vendors and manufacturers.',
      icon: Database
    },
    {
      step: '04',
      title: 'Installation',
      description: 'Professional installation by certified technicians following best practices.',
      icon: Settings
    },
    {
      step: '05',
      title: 'Testing & Certification',
      description: 'Comprehensive testing using Fluke and other professional equipment.',
      icon: Gauge
    },
    {
      step: '06',
      title: 'Documentation & Training',
      description: 'Complete as-built documentation and user training.',
      icon: Users
    },
    {
      step: '07',
      title: 'Warranty & Support',
      description: 'Extended warranty coverage and ongoing technical support.',
      icon: Shield
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Future-ready infrastructure supporting current and emerging technologies.'
    },
    {
      icon: Shield,
      title: 'Reliability',
      description: 'Robust systems with redundancy and failover capabilities.'
    },
    {
      icon: TrendingUp,
      title: 'Scalability',
      description: 'Flexible infrastructure that grows with your business needs.'
    },
    {
      icon: Clock,
      title: 'Quick Deployment',
      description: 'Efficient installation minimizing disruption to operations.'
    },
    {
      icon: Award,
      title: 'Certified Quality',
      description: 'Compliance with international standards and certifications.'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Experienced team providing ongoing technical assistance.'
    }
  ];

  const stats = [
    { value: '150+', label: 'ICT Projects Delivered' },
    { value: '100+', label: 'Systems Integrated' },
    { value: '24/7', label: 'Technical Support' },
    { value: '15+ Years', label: 'Industry Experience' }
  ];

  const projects = [
    {
      name: 'Makkah Bus Company ICT Infrastructure',
      client: 'Makkah Bus Company',
      location: 'Makkah, Saudi Arabia',
      type: 'Transportation',
      image: '/projects/WhatsApp Image 2025-10-26 at 21.39.16.jpeg'
    },
    {
      name: 'NCMS Network Infrastructure',
      client: 'NCMS',
      location: 'Riyadh, Saudi Arabia',
      type: 'Government',
      image: '/projects/WhatsApp Image 2025-10-26 at 21.39.20.jpeg'
    },
    {
      name: 'Dallah Hospital ICT Systems',
      client: 'Dallah Hospital',
      location: 'Riyadh, Saudi Arabia',
      type: 'Healthcare',
      image: '/projects/WhatsApp Image 2025-10-26 at 21.39.27.jpeg'
    },
    {
      name: 'Ericsson Office Network',
      client: 'Ericsson',
      location: 'Riyadh, Saudi Arabia',
      type: 'Corporate',
      image: '/projects/WhatsApp Image 2025-10-26 at 21.39.32.jpeg'
    }
  ];

  const technologies = [
    {
      category: 'Wireless',
      items: ['WiFi 6', 'WiFi 6E', 'Mesh Networks', 'Point-to-Point']
    },
    {
      category: 'Networking',
      items: ['Switches', 'Routers', 'Firewalls', 'Load Balancers']
    },
    {
      category: 'Telephony',
      items: ['IP-PBX', 'VoIP', 'SIP Trunking', 'UC Platforms']
    },
    {
      category: 'Audio Visual',
      items: ['Video Conferencing', 'Digital Signage', 'PA Systems', 'IPTV']
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
                <Network className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">Low-Current & ICT Solutions</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-linear-to-r from-gray-100 via-blue-100 to-gray-100 bg-clip-text text-transparent">
                Integrated Low-Current Systems for Smart Buildings
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                Complete low-current solutions including networking, telephony, audio-visual, IPTV, 
                and building automation systems for intelligent facilities.
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
                  <span>Get Started</span>
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
                  src="/lowcurrent.png"
                  alt="Low-Current Infrastructure"
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
              <span className="text-sm font-medium text-blue-400">Comprehensive Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-4">
              Low-Current System Solutions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive low-current systems and technology integration for modern buildings.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6 text-blue-400" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-100 mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{service.description}</p>

                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                        <CheckCircle2 className="w-3 h-3 text-blue-400 shrink-0 mt-0.5" />
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

      {/* Technologies Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Technologies</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-4">
              Latest Technology Standards
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We work with the most advanced and reliable technologies in the industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative">
                  <h3 className="text-lg font-bold text-gray-100 mb-3">{tech.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {tech.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-xs text-blue-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
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
              Solutions for Every Sector
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Specialized ICT infrastructure designed for specific industry needs and requirements.
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

                  <div className="space-y-2">
                    {solution.applications.map((app, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                        <span>{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards & Certifications */}
      {/* <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
              <Award className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Standards & Certifications</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-4">
              Certified Quality Assurance
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our installations comply with international standards and come with extended warranties.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standards.map((standard, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <standard.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-gray-100 mb-1">{standard.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{standard.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Process Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
              <Settings className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Implementation Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-4">
              Professional Delivery Process
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our proven methodology ensures quality, timely delivery, and customer satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl font-bold text-blue-400/20">{step.step}</div>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-gray-100 mb-2">{step.title}</h3>
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
              Why Choose Our Solutions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience the advantages of working with certified ICT professionals.
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

      {/* Projects Showcase */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
              <Network className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Success Stories</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-4">
              Featured ICT Projects
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Delivering excellence across diverse industries and facility types.
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
                  <h3 className="text-base font-bold text-gray-100 mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {project.client}
                  </h3>
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
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
              <span>View All ICT Projects</span>
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
                Ready to Upgrade Your Infrastructure?
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Let&apos;s design a future-ready ICT solution tailored to your facility&apos;s needs. Get a free consultation today.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <span>Request Consultation</span>
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

export default LowCurrentSolutionPage;
