'use client';

import React from 'react';
import { 
  Award, 
  Target, 
  Eye, 
  Users, 
  Shield, 
  Zap, 
  TrendingUp, 
  Globe,
  Building2,
  Briefcase,
  Star
} from 'lucide-react';
import Image from 'next/image';

const About = () => {
  const stats = [
    { value: '18+', label: 'Years of Excellence' },
    { value: '100+', label: 'Projects Completed' },
    { value: '50+', label: 'Expert Engineers' },
    { value: '99%', label: 'Client Satisfaction' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Reliability',
      description: 'We deliver dependable solutions that our clients can trust, backed by proven expertise and industry certifications.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Staying ahead with cutting-edge technologies and innovative approaches to solve complex infrastructure challenges.'
    },
    {
      icon: Users,
      title: 'Client Focus',
      description: 'Your success is our priority. We work closely with clients to understand and exceed their expectations.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering exceptional quality in every project, from design to implementation and support.'
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: 'Continuously evolving and expanding our capabilities to meet the changing needs of the industry.'
    },
    {
      icon: Globe,
      title: 'Integrity',
      description: 'Operating with transparency, honesty, and ethical practices in all our business relationships.'
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
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">About WeCare Technology</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-linear-to-r from-gray-100 via-blue-100 to-gray-100 bg-clip-text text-transparent">
              Building Tomorrow&apos;s Infrastructure
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              For over 18 years, WeCare Technology has been at the forefront of delivering world-class 
              IT infrastructure solutions across Saudi Arabia and the GCC region.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">Our Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-100">
                Pioneering Excellence in IT Infrastructure
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  Founded in 2007, WeCare Technology emerged with a clear mission: to provide exceptional 
                  IT infrastructure solutions that empower businesses to thrive in the digital age. Our 
                  journey began in Riyadh, and over the years, we&apos;ve grown to become one of the most 
                  trusted names in the industry.
                </p>
                <p>
                  We specialize in comprehensive solutions spanning Data Centers, Structured Cabling, 
                  Security Systems, Audio-Visual Integration, and Low Current Systems. Our team of certified 
                  engineers brings decades of combined experience, ensuring every project meets the highest 
                  standards of quality and reliability.
                </p>
                <p>
                  Today, we serve a diverse portfolio of clients across government, healthcare, education, 
                  corporate, and hospitality sectors. Our commitment to innovation, quality, and customer 
                  satisfaction has made us the partner of choice for mission-critical infrastructure projects 
                  throughout the Kingdom and beyond.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden border border-gray-800/50">
                <Image
                  src="/logo.png"
                  alt="WeCare Technology Office"
                  fill
                  className="object-contain p-12 bg-linear-to-br from-gray-900/90 to-gray-800/90"
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="group relative p-10 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-100 mb-4">Our Mission</h3>
                <p className="text-gray-400 leading-relaxed">
                  To deliver innovative, reliable, and scalable IT infrastructure solutions that empower 
                  organizations to achieve their strategic objectives. We are committed to excellence in 
                  every aspect of our work, from initial consultation to ongoing support, ensuring our 
                  clients receive solutions that drive real business value.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="group relative p-10 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-100 mb-4">Our Vision</h3>
                <p className="text-gray-400 leading-relaxed">
                  To be the leading technology partner in the region, recognized for our innovation, 
                  reliability, and commitment to customer success. We envision a future where every 
                  organization, regardless of size, has access to world-class infrastructure solutions 
                  that enable them to compete and succeed in the global marketplace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
              <Star className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Core Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our values are the foundation of everything we do, guiding our decisions and shaping our culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-100 mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
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
                Ready to Transform Your Infrastructure?
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss how our expertise can help your organization achieve its technology goals.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="/contact"
                  className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  Get in Touch
                </a>
                <a
                  href="/projects"
                  className="px-8 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                >
                  View Our Work
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
