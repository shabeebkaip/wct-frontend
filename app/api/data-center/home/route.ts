import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { DataCenterHome } from '@/lib/models/DataCenter';
import { requireAdmin, forbiddenResponse } from '@/lib/api-auth';

const defaultData = {
  sectionHeader: {
    badge: 'DATA CENTER SOLUTIONS',
    title: 'Enterprise Data Center Infrastructure',
    description: 'Delivering world-class data center solutions with cutting-edge technology, proven expertise, and comprehensive infrastructure services across Saudi Arabia',
  },
  solutions: [
    {
      icon: 'Server',
      title: 'Infrastructure Design',
      description: 'Complete data center design from concept to commissioning with tier-rated facilities',
    },
    {
      icon: 'Zap',
      title: 'Power Systems',
      description: 'UPS, PDU, generators, and power distribution ensuring 99.99% uptime',
    },
    {
      icon: 'Thermometer',
      title: 'Cooling Solutions',
      description: 'Precision air conditioning, hot/cold aisle containment, and thermal management',
    },
    {
      icon: 'Shield',
      title: 'Physical Security',
      description: 'Access control, surveillance, and environmental monitoring systems',
    },
    {
      icon: 'Database',
      title: 'Storage Systems',
      description: 'Enterprise SAN, NAS, and hybrid cloud storage infrastructure',
    },
    {
      icon: 'Network',
      title: 'Network Infrastructure',
      description: 'High-speed networking, fiber optics, and structured cabling solutions',
    },
  ],
  features: [
    'Tier III & Tier IV Data Center Design',
    'N+1 & 2N Redundancy Configuration',
    'Hot/Cold Aisle Containment',
    'Modular & Scalable Architecture',
    'Energy-Efficient Green Solutions',
    '24/7 Monitoring & Management',
    'Disaster Recovery Planning',
    'Compliance & Certification Support',
  ],
  images: [
    {
      src: '/data-center-images/Data-Centre-Illustration.jpg',
      alt: 'Data Center Infrastructure',
      title: 'Modern Data Center Architecture',
      description: 'State-of-the-art facility design and implementation',
    },
    {
      src: '/data-center-images/taylor-vick-M5tzZtFCOfs-unsplash.jpg',
      alt: 'Server Infrastructure',
      title: 'High-Performance Computing',
      description: 'Enterprise-grade server and storage solutions',
    },
    {
      src: '/data-center-images/vertiv.webp',
      alt: 'Vertiv Solutions',
      title: 'Power & Cooling Systems',
      description: 'Advanced climate control and power management',
    },
    {
      src: '/data-center-images/apc.webp',
      alt: 'APC Infrastructure',
      title: 'UPS & Power Protection',
      description: 'Uninterruptible power supply solutions',
    },
    {
      src: '/data-center-images/schneider.webp',
      alt: 'Schneider Electric',
      title: 'Smart Infrastructure',
      description: 'Intelligent building management systems',
    },
    {
      src: '/data-center-images/eaton.jpeg',
      alt: 'Eaton Systems',
      title: 'Energy Management',
      description: 'Comprehensive power distribution solutions',
    },
    {
      src: '/data-center-images/liebert.jpg',
      alt: 'Liebert Precision',
      title: 'Precision Cooling',
      description: 'Advanced thermal management technology',
    },
    {
      src: '/data-center-images/sdmo.jpg',
      alt: 'SDMO Generators',
      title: 'Backup Power Generation',
      description: 'Reliable standby power solutions',
    },
  ],
  cta: {
    title: 'Ready to Build Your Data Center?',
    description: 'Our team of certified experts is ready to design, implement, and manage your mission-critical data center infrastructure with world-class standards.',
    primaryButton: {
      text: 'Request Consultation',
      link: '/contact',
    },
    secondaryButton: {
      text: 'Download Brochure',
      link: '/GFS PROFILE.pptx',
    },
  },
};

export async function GET() {
  try {
    await connectDB();
    let data = await DataCenterHome.findOne();
    
    if (!data) {
      data = await DataCenterHome.create(defaultData);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data center home data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== 'Bearer admin-token') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    await connectDB();

    const data = await DataCenterHome.findOneAndUpdate(
      {},
      body,
      { new: true, upsert: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Data center home updated successfully',
      data,
    });
  } catch (error) {
    console.error('Error updating data center home:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}
