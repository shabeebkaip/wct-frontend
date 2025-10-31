'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Cable,
  Network,
  CheckCircle2,
  ArrowRight,
  Award,
  Shield,
  Zap,
  Clock,
  Users,
  Layers,
  Settings,
  TrendingUp,
  MapPin,
  Building2,
  Gauge,
  FileCheck,
  Wrench,
  PackageCheck,
  ClipboardCheck,
  GraduationCap,
  Server,
  HardDrive,
  Radio
} from 'lucide-react';

const StructuredCablingPage = () => {
  const heroFeatures = [
    'ISO/IEC 11801 Compliant',
    'Fluke Certified Testing',
    '25-Year System Warranty',
    'End-to-End Solutions'
  ];

  const cableTypes = [
    {
      icon: Cable,
      title: 'Category 6 (Cat6)',
      description: 'Standard Ethernet cabling supporting up to 1 Gbps speeds.',
      specifications: [
        'Bandwidth: 250 MHz',
        'Speed: Up to 1 Gbps',
        'Distance: 100 meters',
        'Applications: Office networks',
        'Cost-effective solution'
      ]
    },
    {
      icon: Cable,
      title: 'Category 6A (Cat6A)',
      description: 'Augmented cabling supporting 10 Gigabit Ethernet networks.',
      specifications: [
        'Bandwidth: 500 MHz',
        'Speed: Up to 10 Gbps',
        'Distance: 100 meters',
        'Applications: High-performance',
        'Future-proof investment'
      ]
    },
    {
      icon: Cable,
      title: 'Category 7 (Cat7)',
      description: 'Shielded cabling for high-interference environments.',
      specifications: [
        'Bandwidth: 600 MHz',
        'Speed: Up to 10 Gbps',
        'Distance: 100 meters',
        'Shielded: S/FTP',
        'Industrial grade'
      ]
    },
    {
      icon: Radio,
      title: 'Fiber Optic',
      description: 'High-speed fiber optic cabling for backbone and long-distance runs.',
      specifications: [
        'Single-mode & Multi-mode',
        'Speed: Up to 100+ Gbps',
        'Distance: Up to 100+ km',
        'OM3, OM4, OS2 standards',
        'Immune to EMI'
      ]
    }
  ];

  const services = [
    {
      icon: Layers,
      title: 'Design & Engineering',
      description: 'Comprehensive cabling design tailored to your infrastructure needs.',
      features: [
        'Site surveys and assessments',
        'AutoCAD design drawings',
        'Bill of quantities (BOQ)',
        'Load calculations',
        'Standards compliance review'
      ]
    },
    {
      icon: Cable,
      title: 'Horizontal Cabling',
      description: 'Cabling from telecommunications room to work areas.',
      features: [
        'Cat6/6A/7 installation',
        'Cable tray systems',
        'J-hooks and cable support',
        'Proper labeling',
        'Work area outlets'
      ]
    },
    {
      icon: Network,
      title: 'Backbone Cabling',
      description: 'Vertical cabling connecting floors and buildings.',
      features: [
        'Fiber optic backbone',
        'Multi-mode and single-mode',
        'Riser and plenum rated',
        'Inter-building connections',
        'Redundant pathways'
      ]
    },
    {
      icon: Server,
      title: 'Data Center Cabling',
      description: 'High-density cabling for data centers and server rooms.',
      features: [
        'Structured patch panels',
        'Cable management systems',
        'Hot/cold aisle optimization',
        'Fiber distribution panels',
        'High-density connectivity'
      ]
    },
    {
      icon: Wrench,
      title: 'Termination & Testing',
      description: 'Professional termination and comprehensive testing services.',
      features: [
        'Modular jack termination',
        'Fiber splicing and termination',
        'Fluke certification testing',
        'Performance verification',
        'Test report documentation'
      ]
    },
    {
      icon: Settings,
      title: 'Cable Management',
      description: 'Organized cable routing and management systems.',
      features: [
        'Cable trays and ladders',
        'Overhead and underfloor',
        'Patch panel organization',
        'Color-coded systems',
        'Future expansion ready'
      ]
    },
    {
      icon: PackageCheck,
      title: 'Warranty & Support',
      description: 'Extended warranty coverage and ongoing technical support.',
      features: [
        '25-year system warranty',
        'Manufacturer backed',
        'Technical support',
        'Maintenance services',
        'System documentation'
      ]
    },
    {
      icon: GraduationCap,
      title: 'Consultation & Training',
      description: 'Expert consultation and end-user training services.',
      features: [
        'Infrastructure consulting',
        'Technology recommendations',
        'User training sessions',
        'Best practices guidance',
        'As-built documentation'
      ]
    }
  ];

  const standards = [
    {
      icon: Award,
      title: 'ISO/IEC 11801',
      description: 'International standard for generic cabling for customer premises'
    },
    {
      icon: Award,
      title: 'TIA/EIA 568',
      description: 'Commercial building telecommunications cabling standard'
    },
    {
      icon: Award,
      title: 'EN 50173',
      description: 'European standard for information technology cabling'
    },
    {
      icon: Shield,
      title: 'BICSI Certified',
      description: 'Certified installation teams following industry best practices'
    },
    {
      icon: CheckCircle2,
      title: 'Fluke Certified',
      description: 'Professional testing and certification using Fluke equipment'
    },
    {
      icon: Award,
      title: '25-Year Warranty',
      description: 'Comprehensive warranty on complete cabling systems'
    }
  ];

  const applications = [
    {
      icon: Building2,
      title: 'Corporate Offices',
      description: 'Complete structured cabling for modern office environments.',
      features: [
        'Desktop connectivity',
        'VoIP phone systems',
        'Wireless access points',
        'Conference rooms',
        'Shared facilities'
      ]
    },
    {
      icon: HardDrive,
      title: 'Data Centers',
      description: 'High-density cabling infrastructure for critical operations.',
      features: [
        'Server connectivity',
        'Storage networks',
        'Management networks',
        'High-speed backbone',
        'Redundant pathways'
      ]
    },
    {
      icon: Building2,
      title: 'Healthcare Facilities',
      description: 'Reliable cabling supporting patient care and operations.',
      features: [
        'Patient monitoring',
        'Medical equipment',
        'Nurse stations',
        'Administrative areas',
        'Emergency systems'
      ]
    },
    {
      icon: GraduationCap,
      title: 'Educational Institutions',
      description: 'Campus-wide cabling for learning and administration.',
      features: [
        'Classroom connectivity',
        'Computer labs',
        'Library systems',
        'Administrative offices',
        'Campus WiFi backbone'
      ]
    },
    {
      icon: Building2,
      title: 'Hospitality',
      description: 'Guest and operational cabling for hotels and resorts.',
      features: [
        'Guest room connectivity',
        'Public WiFi backbone',
        'IPTV systems',
        'POS systems',
        'Back office networks'
      ]
    },
    {
      icon: Building2,
      title: 'Industrial Facilities',
      description: 'Robust cabling for manufacturing and industrial environments.',
      features: [
        'Plant floor networks',
        'SCADA systems',
        'Industrial Ethernet',
        'Control systems',
        'Office areas'
      ]
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Site Survey',
      description: 'Detailed assessment of your facility and cabling requirements.',
      icon: MapPin
    },
    {
      step: '02',
      title: 'Design & Planning',
      description: 'CAD drawings, cable routing plans, and material specifications.',
      icon: Layers
    },
    {
      step: '03',
      title: 'Material Procurement',
      description: 'Sourcing certified cables and components from trusted vendors.',
      icon: PackageCheck
    },
    {
      step: '04',
      title: 'Installation',
      description: 'Professional installation by certified technicians.',
      icon: Wrench
    },
    {
      step: '05',
      title: 'Termination',
      description: 'Precise termination at patch panels and outlets.',
      icon: Cable
    },
    {
      step: '06',
      title: 'Testing & Certification',
      description: 'Fluke testing and performance certification for every link.',
      icon: Gauge
    },
    {
      step: '07',
      title: 'Documentation',
      description: 'Complete as-built drawings and test reports.',
      icon: FileCheck
    },
    {
      step: '08',
      title: 'Handover & Training',
      description: 'System handover with user training and documentation.',
      icon: ClipboardCheck
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Future-ready infrastructure supporting emerging technologies and higher speeds.'
    },
    {
      icon: Shield,
      title: 'Reliability',
      description: 'Quality components and professional installation ensuring long-term reliability.'
    },
    {
      icon: TrendingUp,
      title: 'Scalability',
      description: 'Flexible infrastructure easily accommodating growth and technology changes.'
    },
    {
      icon: Clock,
      title: 'Reduced Downtime',
      description: 'Properly installed systems minimizing network failures and maintenance issues.'
    },
    {
      icon: Award,
      title: 'Standards Compliance',
      description: 'Meeting international standards with comprehensive testing and certification.'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Experienced team providing consultation, installation, and ongoing support.'
    }
  ];

  const stats = [
    { value: '500km+', label: 'Cable Installed' },
    { value: '200+', label: 'Projects Completed' },
    { value: '25 Years', label: 'System Warranty' },
    { value: '100%', label: 'Certified Testing' }
  ];

  /* const certifications = [
    'ISO/IEC 11801 Compliant',
    'TIA/EIA 568 Standards',
    'EN 50173 European Standards',
    'BICSI Certified Installers',
    'Fluke Networks Certified',
    'Manufacturer Warranties'
  ]; */

  const projects = [
    {
      name: 'Makkah Bus Company Network Infrastructure',
      client: 'Makkah Bus Company',
      location: 'Makkah, Saudi Arabia',
      scope: 'Complete structured cabling with fiber backbone',
      image: '/projects/WhatsApp Image 2025-10-26 at 21.39.16.jpeg'
    },
    {
      name: 'NCMS Data Center Cabling',
      client: 'NCMS',
      location: 'Riyadh, Saudi Arabia',
      scope: 'High-density data center cabling solution',
      image: '/projects/WhatsApp Image 2025-10-26 at 21.39.20.jpeg'
    },
    {
      name: 'Dallah Hospital Network',
      client: 'Dallah Hospital',
      location: 'Riyadh, Saudi Arabia',
      scope: 'Hospital-wide structured cabling system',
      image: '/projects/WhatsApp Image 2025-10-26 at 21.39.27.jpeg'
    },
    {
      name: 'Ericsson Office Cabling',
      client: 'Ericsson',
      location: 'Riyadh, Saudi Arabia',
      scope: 'Corporate office structured cabling',
      image: '/projects/WhatsApp Image 2025-10-26 at 21.39.32.jpeg'
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
                <Cable className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Structured Cabling Solutions</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-gray-100 dark:via-blue-100 dark:to-gray-100 bg-clip-text text-transparent">
                Professional Structured Cabling Infrastructure
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 mb-8 leading-relaxed">
                End-to-end structured cabling solutions from design to certification, providing the 
                foundation for your network infrastructure with 25-year warranty.
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
                  <span>Request Quote</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white font-medium border border-slate-300 hover:border-blue-500/50 dark:border-gray-700 dark:hover:border-blue-500/50 shadow-sm transition-all duration-300"
                >
                  <span>View Projects</span>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden border border-slate-200 dark:border-gray-800/50 shadow-xl dark:shadow-none">
                <Image
                  src="/structured-cabling.jpeg"
                  alt="Structured Cabling"
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

      {/* Cable Types Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30 mb-6">
              <Cable className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Cable Types</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-gray-100 mb-4">
              Comprehensive Cable Solutions
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              From standard Cat6 to high-speed fiber optic, we install the right cabling for your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cableTypes.map((cable, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-lg hover:shadow-xl dark:bg-gray-900/40 dark:border-gray-800/50 dark:hover:border-blue-500/30 dark:shadow-none transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-transparent dark:from-blue-500/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <cable.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100 mb-2">{cable.title}</h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{cable.description}</p>

                  <ul className="space-y-1">
                    {cable.specifications.map((spec, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-gray-400">
                        <CheckCircle2 className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30 mb-6">
              <Settings className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Our Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-gray-100 mb-4">
              End-to-End Cabling Services
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Complete structured cabling services from initial design to final certification.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-lg hover:shadow-xl dark:bg-gray-900/40 dark:border-gray-800/50 dark:hover:border-blue-500/30 dark:shadow-none transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-transparent dark:from-blue-500/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100 mb-2">{service.title}</h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{service.description}</p>

                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-gray-400">
                        <CheckCircle2 className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
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

      {/* Standards & Certifications */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30 mb-6">
              <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Standards & Certifications</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-gray-100 mb-4">
              Certified Quality Assurance
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our installations comply with international standards and come with extended warranties.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standards.map((standard, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-lg hover:shadow-xl dark:bg-gray-900/40 dark:border-gray-800/50 dark:hover:border-blue-500/30 dark:shadow-none transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-transparent dark:from-blue-500/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <standard.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100 mb-1">{standard.title}</h3>
                    <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{standard.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30 mb-6">
              <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Applications</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-gray-100 mb-4">
              Industry Applications
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Structured cabling solutions tailored for diverse industries and facilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-lg hover:shadow-xl dark:bg-gray-900/40 dark:border-gray-800/50 dark:hover:border-blue-500/30 dark:shadow-none transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-transparent dark:from-blue-500/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 border border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <app.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100 mb-3">{app.title}</h3>
                  <p className="text-slate-600 dark:text-gray-400 mb-4 leading-relaxed">{app.description}</p>

                  <div className="space-y-2">
                    {app.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>{feature}</span>
                      </div>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30 mb-6">
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Our Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-gray-100 mb-4">
              Professional Installation Process
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our proven 8-step process ensures quality installation and certification.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-lg hover:shadow-xl dark:bg-gray-900/40 dark:border-gray-800/50 dark:hover:border-blue-500/30 dark:shadow-none transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-transparent dark:from-blue-500/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl font-bold text-blue-200 dark:text-blue-400/20">{step.step}</div>
                    <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 mb-2">{step.title}</h3>
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
              Why Choose Our Cabling Solutions
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the advantages of professional structured cabling infrastructure.
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

      {/* Projects Showcase */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30 mb-6">
              <Network className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Featured Projects</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-gray-100 mb-4">
              Successful Cabling Projects
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Delivering quality structured cabling across various industries and scales.
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
                  <h3 className="text-base font-bold text-slate-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {project.client}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-gray-400 flex items-center gap-1 mb-2">
                    <MapPin className="w-3 h-3" />
                    {project.location}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-gray-500">{project.scope}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white font-medium border border-slate-300 hover:border-blue-500/50 dark:border-gray-700 dark:hover:border-blue-500/50 shadow-sm transition-all duration-300"
            >
              <span>View All Cabling Projects</span>
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
                Need Professional Structured Cabling?
              </h2>
              <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Get a comprehensive structured cabling solution with 25-year warranty. Contact us for a site survey and quotation.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <span>Request Site Survey</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white font-medium border border-slate-300 hover:border-blue-500/50 dark:border-gray-700 dark:hover:border-blue-500/50 shadow-sm transition-all duration-300"
                >
                  <span>Learn More</span>
                </Link>
              </div>

              {/* <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-400">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StructuredCablingPage;
