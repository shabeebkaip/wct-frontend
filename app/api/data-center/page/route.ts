import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { DataCenterPage } from '@/lib/models/DataCenter';
import { requireAdmin, forbiddenResponse } from '@/lib/api-auth';

const defaultData = {
  hero: {
    badge: 'ENTERPRISE DATA CENTER SOLUTIONS',
    title: 'Mission-Critical Infrastructure for the Digital Age',
    description: 'We Care Tech delivers comprehensive data center solutions designed to meet the most demanding requirements of modern enterprises, ensuring maximum uptime, scalability, and efficiency.',
    features: [
      'Tier III & IV Certified Design',
      '99.99% Uptime SLA',
      'Modular & Scalable Infrastructure',
      '24/7 Expert Support',
    ],
    image: '/data-center-images/Data-Centre-Illustration.jpg',
    buttons: [
      { text: 'Schedule Consultation', link: '/contact', variant: 'primary' },
      { text: 'View Case Studies', link: '#projects', variant: 'secondary' },
    ],
  },
  services: [
    {
      icon: 'LayoutGrid',
      title: 'Data Center Design & Consulting',
      description: 'Comprehensive planning and design services for optimal data center performance',
      features: [
        'Tier-rated facility design',
        'Capacity planning & optimization',
        'Energy efficiency analysis',
        'Future-proof scalability',
      ],
    },
    {
      icon: 'Zap',
      title: 'Power Infrastructure',
      description: 'Reliable power systems ensuring uninterrupted operations',
      features: [
        'UPS systems & battery backup',
        'Power distribution units (PDU)',
        'Generator installation',
        'N+1 & 2N redundancy',
      ],
    },
    {
      icon: 'Wind',
      title: 'Cooling & Climate Control',
      description: 'Advanced thermal management for optimal equipment performance',
      features: [
        'Precision air conditioning',
        'Hot/cold aisle containment',
        'Liquid cooling solutions',
        'Temperature monitoring',
      ],
    },
    {
      icon: 'Shield',
      title: 'Security & Monitoring',
      description: 'Multi-layer security protecting your critical infrastructure',
      features: [
        'Biometric access control',
        'CCTV surveillance',
        'Environmental monitoring',
        'Intrusion detection',
      ],
    },
    {
      icon: 'Network',
      title: 'Network & Cabling',
      description: 'High-performance network infrastructure and structured cabling',
      features: [
        'Fiber optic networks',
        'Structured cabling systems',
        'Cable management',
        'Network optimization',
      ],
    },
    {
      icon: 'Wrench',
      title: 'Maintenance & Support',
      description: '24/7 proactive maintenance ensuring peak performance',
      features: [
        'Preventive maintenance',
        'Emergency response',
        'Parts replacement',
        'Performance optimization',
      ],
    },
  ],
  process: [
    {
      step: '01',
      title: 'Consultation & Assessment',
      description: 'We begin with a comprehensive evaluation of your requirements, existing infrastructure, and future growth plans to design the perfect solution.',
      icon: 'MessageSquare',
    },
    {
      step: '02',
      title: 'Design & Planning',
      description: 'Our certified engineers create detailed designs including power, cooling, network, and physical security systems with redundancy planning.',
      icon: 'PenTool',
    },
    {
      step: '03',
      title: 'Procurement & Integration',
      description: 'We source premium equipment from world-class manufacturers and manage the entire supply chain for seamless integration.',
      icon: 'Package',
    },
    {
      step: '04',
      title: 'Installation & Commissioning',
      description: 'Expert installation teams deploy infrastructure following industry best practices, with rigorous testing and quality assurance.',
      icon: 'Hammer',
    },
    {
      step: '05',
      title: 'Testing & Validation',
      description: 'Comprehensive testing of all systems including load testing, failover scenarios, and performance benchmarking before handover.',
      icon: 'CheckCircle',
    },
    {
      step: '06',
      title: 'Support & Maintenance',
      description: 'Ongoing 24/7 monitoring, preventive maintenance, and rapid response support ensuring optimal performance and uptime.',
      icon: 'Headphones',
    },
  ],
  benefits: [
    {
      icon: 'Gauge',
      title: 'Maximum Uptime',
      description: 'Industry-leading 99.99% uptime with N+1 and 2N redundancy configurations protecting against single points of failure.',
    },
    {
      icon: 'TrendingDown',
      title: 'Reduced Operating Costs',
      description: 'Energy-efficient designs and smart cooling systems significantly reduce operational expenses while improving performance.',
    },
    {
      icon: 'Scaling',
      title: 'Scalable Architecture',
      description: 'Modular designs allow seamless expansion as your business grows without disrupting existing operations.',
    },
    {
      icon: 'Shield',
      title: 'Enhanced Security',
      description: 'Multi-layer physical and digital security protecting your mission-critical infrastructure and data.',
    },
    {
      icon: 'Leaf',
      title: 'Green Technology',
      description: 'Sustainable solutions meeting international environmental standards while reducing carbon footprint.',
    },
    {
      icon: 'Award',
      title: 'Certified Excellence',
      description: 'Our team holds industry certifications and follows international standards for data center design and operations.',
    },
  ],
  brands: [
    {
      name: 'Vertiv',
      logo: '/datacenter-brands/Vertiv.avif',
      specialization: 'Power & Cooling Solutions',
    },
    {
      name: 'APC by Schneider Electric',
      logo: '/datacenter-brands/APC.avif',
      specialization: 'UPS & Power Protection',
    },
    {
      name: 'Schneider Electric',
      logo: '/datacenter-brands/Schneider-Electric.avif',
      specialization: 'Smart Infrastructure',
    },
    {
      name: 'Eaton',
      logo: '/datacenter-brands/eaton.avif',
      specialization: 'Power Management',
    },
    {
      name: 'Liebert',
      logo: '/datacenter-brands/Liebert.avif',
      specialization: 'Precision Cooling',
    },
    {
      name: 'Chatsworth',
      logo: '/datacenter-brands/Chatsworth.avif',
      specialization: 'Rack Solutions',
    },
    {
      name: 'Rittal',
      logo: '/datacenter-brands/Rittal.avif',
      specialization: 'IT Infrastructure',
    },
    {
      name: 'SDMO',
      logo: '/datacenter-brands/SDMO.avif',
      specialization: 'Generator Sets',
    },
  ],
  projects: [
    {
      name: 'Enterprise Data Center',
      client: 'Major Financial Institution',
      location: 'Riyadh, Saudi Arabia',
      image: '/projects/datacenter-1.jpg',
    },
    {
      name: 'Tier III Facility',
      client: 'Government Entity',
      location: 'Jeddah, Saudi Arabia',
      image: '/projects/datacenter-2.jpg',
    },
    {
      name: 'Hybrid Cloud Infrastructure',
      client: 'Healthcare Provider',
      location: 'Dammam, Saudi Arabia',
      image: '/projects/datacenter-3.jpg',
    },
    {
      name: 'Modular Data Center',
      client: 'Technology Company',
      location: 'Al Khobar, Saudi Arabia',
      image: '/projects/datacenter-4.jpg',
    },
  ],
  cta: {
    title: 'Transform Your Data Center Infrastructure',
    description: 'Partner with We Care Tech to design, build, and maintain a world-class data center that powers your business growth with reliability, efficiency, and scalability.',
    buttons: [
      { text: 'Get Started', link: '/contact', variant: 'primary' },
      { text: 'Download Capabilities', link: '/GFS PROFILE.pptx', variant: 'secondary' },
    ],
  },
};

export async function GET() {
  try {
    await connectDB();
    let data = await DataCenterPage.findOne();
    
    if (!data) {
      data = await DataCenterPage.create(defaultData);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data center page data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const { authorized } = await requireAdmin();
    if (!authorized) {
      return forbiddenResponse();
    }

    const body = await request.json();
    await connectDB();

    const data = await DataCenterPage.findOneAndUpdate(
      {},
      body,
      { new: true, upsert: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Data center page updated successfully',
      data,
    });
  } catch (error) {
    console.error('Error updating data center page:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}
