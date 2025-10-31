'use client';
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
  Star,
  UserCircle2
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const About = () => {
  const stats = [
    { value: '18+', label: 'Years of Excellence' },
    { value: '100+', label: 'Projects Completed' },
    { value: '50+', label: 'Expert Engineers' },
    { value: '99%', label: 'Client Satisfaction' }
  ];

  const leadership = [
    {
      name: 'Sheriff',
      role: 'Co-Founder & Managing Director',
      image: null,
      description: 'Leading WeCare Technology with strategic vision and extensive industry expertise.'
    },
    {
      name: 'Harris',
      role: 'Co-Founder & Technical Director',
      image: null,
      description: 'Driving technical excellence and innovation across all our infrastructure solutions.'
    }
  ];

  const team = [
    {
      name: 'Fasal Sheriff',
      role: 'Sales and Design Engineer',
      image: '/members/fasal.jpeg',
      description: 'Specialized in solution design and client relationship management.'
    },
    {
      name: 'Nawas Sheriff',
      role: 'Design Engineer',
      image: "/members/navas.jpeg",
      description: 'Expert in infrastructure design and technical specifications.'
    },
    {
      name: 'Faizan Solanki',
      role: 'Sales Account Manager',
      image: "/members/faizan.jpeg",
      description: 'Managing key accounts and ensuring client satisfaction.'
    }
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
    <div className="min-h-screen bg-linear-to-b from-white via-slate-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-slate-900 dark:text-gray-100">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-100/30 via-slate-50 to-white dark:from-blue-900/20 dark:via-gray-900 dark:to-gray-950" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 dark:opacity-10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 mb-6">
              <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">About WeCare Technology</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-linear-to-r from-slate-900 via-blue-700 to-slate-900 dark:from-gray-100 dark:via-blue-100 dark:to-gray-100 bg-clip-text text-transparent">
              Building Tomorrow&apos;s Infrastructure
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              For over 18 years, WeCare Technology has been at the forefront of delivering world-class 
              IT infrastructure solutions across Saudi Arabia and the GCC region.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 shadow-lg dark:shadow-none"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-600 dark:text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="relative pt-10 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 mb-6">
                <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Our Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-slate-900 dark:text-gray-100">
                Pioneering Excellence in IT Infrastructure
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-gray-400 leading-relaxed">
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
              <div className="relative h-[500px] rounded-2xl overflow-hidden border border-slate-200 dark:border-gray-800/50 shadow-2xl dark:shadow-none">
                <Image
                  src="/logo.png"
                  alt="WeCare Technology Office"
                  fill
                  className="object-contain p-12 bg-linear-to-br from-slate-100 to-white dark:from-gray-900/90 dark:to-gray-800/90"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-100 via-transparent to-transparent dark:from-gray-900 dark:via-transparent dark:to-transparent" />
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
            <div className="group relative p-10 rounded-2xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 shadow-lg dark:shadow-none">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-gray-100 mb-4">Our Mission</h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                  To deliver innovative, reliable, and scalable IT infrastructure solutions that empower 
                  organizations to achieve their strategic objectives. We are committed to excellence in 
                  every aspect of our work, from initial consultation to ongoing support, ensuring our 
                  clients receive solutions that drive real business value.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="group relative p-10 rounded-2xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 shadow-lg dark:shadow-none">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-gray-100 mb-4">Our Vision</h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 mb-6">
              <Star className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Core Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-gray-100 mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our values are the foundation of everything we do, guiding our decisions and shaping our culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 shadow-lg dark:shadow-none"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100 mb-3">{value.title}</h3>
                  <p className="text-slate-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 mb-6">
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Our Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-gray-100 mb-4">
              Meet the People Behind Our Success
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our team of dedicated professionals brings together decades of experience and expertise in IT infrastructure.
            </p>
          </div>

          {/* Leadership */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-gray-100 mb-8 text-center">Leadership Team</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {leadership.map((leader, index) => (
                <div
                  key={index}
                  className="group relative p-8 rounded-2xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 shadow-lg dark:shadow-none"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  <div className="relative">
                    <div className="flex flex-col items-center text-center">
                      {/* Avatar */}
                      <div className="w-32 h-32 rounded-full bg-linear-to-br from-blue-200 to-blue-100 dark:from-blue-500/20 dark:to-blue-600/10 border-2 border-blue-400 dark:border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                        {leader.image ? (
                          <div className="relative w-full h-full rounded-full overflow-hidden">
                            <Image
                              src={leader.image}
                              alt={leader.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <UserCircle2 className="w-20 h-20 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>

                      {/* Info */}
                      <h4 className="text-2xl font-bold text-slate-900 dark:text-gray-100 mb-2">{leader.name}</h4>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">{leader.role}</p>
                      <p className="text-slate-600 dark:text-gray-400 leading-relaxed">{leader.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Members */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-gray-100 mb-8 text-center">Our Team</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-2xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 shadow-lg dark:shadow-none"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  <div className="relative">
                    <div className="flex flex-col items-center text-center">
                      {/* Avatar */}
                      <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-200 to-blue-100 dark:from-blue-500/20 dark:to-blue-600/10 border-2 border-blue-400 dark:border-blue-500/30 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                        {member.image ? (
                          <div className="relative w-full h-full rounded-full overflow-hidden">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <UserCircle2 className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>

                      {/* Info */}
                      <h4 className="text-xl font-bold text-slate-900 dark:text-gray-100 mb-1">{member.name}</h4>
                      <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">{member.role}</p>
                      <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{member.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 rounded-2xl bg-linear-to-br from-blue-100/80 via-blue-50/50 to-transparent dark:from-blue-600/10 dark:via-blue-500/5 dark:to-transparent backdrop-blur-sm border border-blue-300 dark:border-blue-500/30 overflow-hidden shadow-xl dark:shadow-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-200/40 via-transparent to-transparent dark:from-blue-500/20 dark:via-transparent dark:to-transparent" />
            <div className="relative text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-gray-100 mb-4">
                Ready to Transform Your Infrastructure?
              </h2>
              <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss how our expertise can help your organization achieve its technology goals.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/projects"
                  className="px-8 py-3 rounded-xl bg-slate-200 dark:bg-gray-800 hover:bg-slate-300 dark:hover:bg-gray-700 text-slate-900 dark:text-white font-medium border border-slate-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500/50 transition-all duration-300"
                >
                  View Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
