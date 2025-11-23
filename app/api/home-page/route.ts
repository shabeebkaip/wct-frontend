import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import HomePage from '@/lib/models/HomePage';
import { requireAdmin, forbiddenResponse } from '@/lib/api-auth';

const defaultData = {
  cctvSection: {
    badge: 'SURVEILLANCE SOLUTIONS',
    title: 'CCTV Surveillance Solutions',
    description: 'Comprehensive security systems tailored to your specific needs, powered by cutting-edge technology and industry-leading expertise',
    solutions: [
      {
        icon: 'Shield',
        title: 'High Value Assets',
        description: 'Advanced surveillance systems for banks, jewelry stores, and critical infrastructure with AI-powered threat detection',
        color: 'from-blue-500 to-cyan-500',
        features: ['24/7 Monitoring', 'AI Analytics', 'Tamper Detection'],
      },
      {
        icon: 'Building2',
        title: 'Military & Defense',
        description: 'Military-grade surveillance solutions with thermal imaging, perimeter security, and command center integration',
        color: 'from-red-500 to-orange-500',
        features: ['Thermal Imaging', 'Perimeter Security', 'Encrypted Feeds'],
      },
      {
        icon: 'Users',
        title: 'Crowd Management',
        description: 'Intelligent crowd monitoring for events, stadiums, and public spaces with real-time analytics and alerts',
        color: 'from-purple-500 to-pink-500',
        features: ['Crowd Analytics', 'Heat Mapping', 'Alert System'],
      },
      {
        icon: 'MapPin',
        title: 'Residential Areas',
        description: 'Smart home security with mobile access, motion detection, and neighborhood watch integration',
        color: 'from-green-500 to-emerald-500',
        features: ['Mobile Access', 'Motion Detection', 'Cloud Storage'],
      },
      {
        icon: 'Building2',
        title: 'Masjid Solutions',
        description: 'Respectful surveillance for places of worship ensuring safety while maintaining privacy and sanctity',
        color: 'from-indigo-500 to-blue-500',
        features: ['Privacy Zones', 'Audio Masking', 'Donation Security'],
      },
      {
        icon: 'ShoppingBag',
        title: 'Mall & Retail',
        description: 'Comprehensive retail security with customer analytics, theft prevention, and parking lot monitoring',
        color: 'from-yellow-500 to-orange-500',
        features: ['Facial Recognition', 'People Counting', 'POS Integration'],
      },
    ],
  },
  lowCurrentSection: {
    badge: 'LOW CURRENT SYSTEMS',
    title: 'Integrated Security Solutions',
    description: 'Complete low current system integration for comprehensive facility management and security',
    solutions: [
      {
        icon: 'Shield',
        title: 'Perimeter Protection System',
        description: 'Advanced boundary security with electric fencing, intrusion detection, and real-time alert systems',
        features: ['Electric Fencing', 'Motion Sensors', 'Laser Barriers', 'Alert Integration'],
      },
      {
        icon: 'Lock',
        title: 'Access Control System',
        description: 'Biometric and card-based access management for secure entry and exit control across facilities',
        features: ['Biometric Readers', 'RFID Cards', 'Time Attendance', 'Multi-Level Access'],
      },
      {
        icon: 'Eye',
        title: 'On Premise Security',
        description: 'Comprehensive indoor monitoring with IP cameras, NVR systems, and integrated surveillance platforms',
        features: ['IP Cameras', 'NVR/DVR Systems', 'Analytics', 'Remote Monitoring'],
      },
      {
        icon: 'MapPin',
        title: 'Public Area Protection',
        description: 'Wide-area surveillance solutions for public spaces, parking lots, and outdoor facilities',
        features: ['PTZ Cameras', 'License Plate Recognition', 'Crowd Analytics', 'Emergency Response'],
      },
    ],
    additionalSolutions: [
      {
        icon: 'Zap',
        title: 'MATV & IPTV Solutions',
        description: 'Master Antenna Television and IP Television systems for hotels, hospitals, and large facilities',
      },
      {
        icon: 'Shield',
        title: 'Audio/Video Systems',
        description: 'Professional AV solutions for conference rooms, auditoriums, and command centers',
      },
      {
        icon: 'Eye',
        title: 'Building Management',
        description: 'Integrated BMS solutions for HVAC, lighting, and energy management',
      },
    ],
  },
  structuredCablingSection: {
    badge: 'STRUCTURED CABLING',
    title: 'Structured Cabling Solutions',
    description: 'We Care Tech has a concrete design approach for Structured Cabling Solutions. We follow EIA/TIA-568A Standards. Our design considerations always take into consideration all the sub-elements in the infrastructure.',
    cablingFlow: [
      { label: 'Structured cabling', active: true },
      { label: 'Backbone Cabling', active: false },
      { label: 'Main Cross-connect (MC)', active: false },
      { label: 'Interbuilding Backbone Cable', highlight: true },
      { label: 'Telecommunications Closet (TS)', active: false },
      { label: 'Equipment Room (ER)', active: false },
      { label: 'Entrance Facility (EF)', active: false },
    ],
    copperCabling: [
      { title: 'UTP Cabling', icon: 'Cable' },
      { title: 'STP Cabling', icon: 'Network' },
      { title: 'FTP Cabling', icon: 'Cable' },
      { title: 'Coaxial Cabling', icon: 'Network' },
    ],
    fiberCabling: [
      { title: 'Single Mode', subtitle: 'Indoor & Outdoor', icon: 'Server' },
      { title: 'Multi Mode', subtitle: 'Indoor & Outdoor', icon: 'Server' },
    ],
    features: [
      {
        icon: 'Workflow',
        title: 'EIA/TIA-568A Standards',
        description: 'Following international standards for structured cabling infrastructure design and implementation',
      },
      {
        icon: 'Cable',
        title: 'Complete Infrastructure',
        description: 'End-to-end cabling solutions from backbone to workstation connectivity',
      },
      {
        icon: 'Network',
        title: 'Scalable Design',
        description: 'Future-proof infrastructure that grows with your business requirements',
      },
      {
        icon: 'Server',
        title: 'High Performance',
        description: 'Optimized for speed, reliability, and maximum data throughput',
      },
    ],
  },
  clientsSection: {
    badge: 'OUR PARTNERS',
    title: 'Trusted by Industry Leaders',
    description: 'Partnering with world-renowned technology brands to deliver cutting-edge solutions',
    logos: [
      { src: '/clients/hikvision.png', alt: 'Hikvision' },
      { src: '/clients/bosch.png', alt: 'Bosch' },
      { src: '/clients/axis-communications.jpg', alt: 'Axis Communications' },
      { src: '/clients/samsung.png', alt: 'Samsung' },
      { src: '/clients/american-dynamics.png', alt: 'American Dynamics' },
      { src: '/clients/nitgen.jpg', alt: 'Nitgen' },
    ],
  },
};

export async function GET() {
  try {
    await connectDB();
    let data = await HomePage.findOne();
    
    if (!data) {
      data = await HomePage.create(defaultData);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching home page data:', error);
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

    const data = await HomePage.findOneAndUpdate(
      {},
      body,
      { new: true, upsert: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Home page updated successfully',
      data,
    });
  } catch (error) {
    console.error('Error updating home page:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}
