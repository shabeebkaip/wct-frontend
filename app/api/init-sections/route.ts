import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { CCTVSection } from '@/lib/models/CCTVSection';
import { LowCurrentSection } from '@/lib/models/LowCurrentSection';
import { StructuredCablingSection } from '@/lib/models/StructuredCablingSection';
import { ClientsSection } from '@/lib/models/ClientsSection';
import { requireAdmin, forbiddenResponse } from '@/lib/api-auth';

const defaultData = {
  cctvSection: {
    badge: 'SURVEILLANCE SOLUTIONS',
    title: 'CCTV Surveillance Solutions',
    description:
      'Comprehensive security systems tailored to your specific needs, powered by cutting-edge technology and industry-leading expertise',
    solutions: [
      {
        icon: 'Shield',
        title: 'High Value Assets',
        description:
          'Advanced surveillance systems for banks, jewelry stores, and critical infrastructure with AI-powered threat detection',
        color: 'from-blue-500 to-cyan-500',
        features: ['24/7 Monitoring', 'AI Analytics', 'Tamper Detection'],
      },
      {
        icon: 'Building2',
        title: 'Military & Defense',
        description:
          'Military-grade surveillance solutions with thermal imaging, perimeter security, and command center integration',
        color: 'from-red-500 to-orange-500',
        features: ['Thermal Imaging', 'Perimeter Security', 'Encrypted Feeds'],
      },
      {
        icon: 'Users',
        title: 'Crowd Management',
        description:
          'Intelligent crowd monitoring for events, stadiums, and public spaces with real-time analytics and alerts',
        color: 'from-purple-500 to-pink-500',
        features: ['Crowd Analytics', 'Heat Mapping', 'Alert System'],
      },
      {
        icon: 'MapPin',
        title: 'Residential Areas',
        description:
          'Smart home security with mobile access, motion detection, and neighborhood watch integration',
        color: 'from-green-500 to-emerald-500',
        features: ['Mobile Access', 'Motion Detection', 'Cloud Storage'],
      },
      {
        icon: 'Building2',
        title: 'Masjid Solutions',
        description:
          'Respectful surveillance for places of worship ensuring safety while maintaining privacy and sanctity',
        color: 'from-indigo-500 to-blue-500',
        features: ['Privacy Zones', 'Audio Masking', 'Donation Security'],
      },
      {
        icon: 'ShoppingBag',
        title: 'Mall & Retail',
        description:
          'Comprehensive retail security with customer analytics, theft prevention, and parking lot monitoring',
        color: 'from-yellow-500 to-orange-500',
        features: ['Facial Recognition', 'People Counting', 'POS Integration'],
      },
    ],
  },
  lowCurrentSection: {
    badge: 'LOW CURRENT SYSTEMS',
    title: 'Integrated Security Solutions',
    description:
      'Complete low current system integration for comprehensive facility management and security',
    securityFlow: [
      {
        step: 1,
        title: 'Site Assessment',
        description: 'Comprehensive evaluation of security requirements and infrastructure needs',
      },
      {
        step: 2,
        title: 'System Design',
        description: "Custom solution design tailored to your facility's specific requirements",
      },
      {
        step: 3,
        title: 'Professional Installation',
        description: 'Expert installation by certified technicians ensuring optimal performance',
      },
      {
        step: 4,
        title: 'Testing & Support',
        description: 'Thorough testing and ongoing maintenance support for system reliability',
      },
    ],
    solutions: [
      {
        icon: 'Shield',
        title: 'Perimeter Protection System',
        description:
          'Advanced boundary security with electric fencing, intrusion detection, and real-time alert systems',
        features: ['Electric Fencing', 'Motion Sensors', 'Laser Barriers', 'Alert Integration'],
      },
      {
        icon: 'Lock',
        title: 'Access Control System',
        description:
          'Biometric and card-based access management for secure entry and exit control across facilities',
        features: ['Biometric Readers', 'RFID Cards', 'Time Attendance', 'Multi-Level Access'],
      },
      {
        icon: 'Eye',
        title: 'On Premise Security',
        description:
          'Comprehensive indoor monitoring with IP cameras, NVR systems, and integrated surveillance platforms',
        features: ['IP Cameras', 'NVR/DVR Systems', 'Analytics', 'Remote Monitoring'],
      },
      {
        icon: 'MapPin',
        title: 'Public Area Protection',
        description:
          'Wide-area surveillance solutions for public spaces, parking lots, and outdoor facilities',
        features: [
          'PTZ Cameras',
          'License Plate Recognition',
          'Crowd Analytics',
          'Emergency Response',
        ],
      },
    ],
    additionalSolutions: [
      {
        icon: 'Zap',
        title: 'MATV & IPTV Solutions',
        description:
          'Master Antenna Television and IP Television systems for hotels, hospitals, and large facilities',
      },
      {
        icon: 'Shield',
        title: 'Audio/Video Systems',
        description:
          'Professional AV solutions for conference rooms, auditoriums, and command centers',
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
    description:
      'We Care Tech has a concrete design approach for Structured Cabling Solutions. We follow EIA/TIA-568A Standards. Our design considerations always take into consideration all the sub-elements in the infrastructure.',
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
        icon: 'Shield',
        title: 'Standards Compliance',
        description: 'Full compliance with EIA/TIA-568A international standards',
      },
      {
        icon: 'Zap',
        title: 'High Performance',
        description: 'Cat6A and fiber optic solutions for maximum speed and reliability',
      },
      {
        icon: 'Settings',
        title: 'Scalable Design',
        description: 'Future-proof infrastructure that grows with your business needs',
      },
    ],
  },
  clientsSection: {
    badge: 'OUR PARTNERS',
    title: 'Trusted by Industry Leaders',
    description: 'Partnering with world-class brands to deliver excellence',
    logos: [],
  },
};

export async function POST() {
  try {
    const { authorized } = await requireAdmin();
    if (!authorized) {
      return forbiddenResponse();
    }

    await connectDB();

    const results = [];

    // Initialize CCTV Section
    const cctvExists = await CCTVSection.findOne();
    if (!cctvExists) {
      await CCTVSection.create(defaultData.cctvSection);
      results.push('✓ CCTV Section initialized');
    } else {
      results.push('• CCTV Section already exists');
    }

    // Initialize Low Current Section
    const lowCurrentExists = await LowCurrentSection.findOne();
    if (!lowCurrentExists) {
      await LowCurrentSection.create(defaultData.lowCurrentSection);
      results.push('✓ Low Current Section initialized');
    } else {
      results.push('• Low Current Section already exists');
    }

    // Initialize Structured Cabling Section
    const cablingExists = await StructuredCablingSection.findOne();
    if (!cablingExists) {
      await StructuredCablingSection.create(defaultData.structuredCablingSection);
      results.push('✓ Structured Cabling Section initialized');
    } else {
      results.push('• Structured Cabling Section already exists');
    }

    // Initialize Clients Section
    const clientsExists = await ClientsSection.findOne();
    if (!clientsExists) {
      await ClientsSection.create(defaultData.clientsSection);
      results.push('✓ Clients Section initialized');
    } else {
      results.push('• Clients Section already exists');
    }

    return NextResponse.json({
      success: true,
      message: 'Sections initialization complete',
      results,
    });
  } catch (error) {
    console.error('Error initializing sections:', error);
    return NextResponse.json({ error: 'Failed to initialize sections' }, { status: 500 });
  }
}
