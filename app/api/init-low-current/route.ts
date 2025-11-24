import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { HomePage } from '@/lib/models/HomePage';

const lowCurrentData = {
  badge: 'LOW CURRENT SYSTEMS',
  title: 'Integrated Security Solutions',
  description: 'Complete low current system integration for comprehensive facility management and security',
  securityApproach: {
    title: 'Multi-Layered Security Approach',
    steps: [
      {
        number: '1',
        title: 'Perimeter Protection System',
        subtitle: 'First line of defense'
      },
      {
        number: '2',
        title: 'Access Control System',
        subtitle: 'Entry point management'
      },
      {
        number: '3',
        title: 'On Premise Security',
        subtitle: 'Internal monitoring'
      },
      {
        number: '4',
        title: 'Public Area Protection',
        subtitle: 'Comprehensive coverage'
      }
    ]
  },
  mainSolutions: [
    {
      icon: 'Shield',
      title: 'Perimeter Protection System',
      description: 'Advanced boundary security with electric fencing, intrusion detection, and real-time alert systems',
      features: ['Electric Fencing', 'Motion Sensors', 'Laser Barriers', 'Alert Integration']
    },
    {
      icon: 'Lock',
      title: 'Access Control System',
      description: 'Biometric and card-based access management for secure entry and exit control across facilities',
      features: ['Biometric Readers', 'RFID Cards', 'Time Attendance', 'Multi-Level Access']
    },
    {
      icon: 'Eye',
      title: 'On Premise Security',
      description: 'Comprehensive indoor monitoring with IP cameras, NVR systems, and integrated surveillance platforms',
      features: ['IP Cameras', 'NVR/DVR Systems', 'Analytics', 'Remote Monitoring']
    },
    {
      icon: 'MapPin',
      title: 'Public Area Protection',
      description: 'Wide-area surveillance solutions for public spaces, parking lots, and outdoor facilities',
      features: ['PTZ Cameras', 'License Plate Recognition', 'Crowd Analytics', 'Emergency Response']
    }
  ],
  additionalServices: {
    title: 'Additional Services',
    services: [
      {
        icon: 'Zap',
        title: 'MATV & IPTV Solutions',
        description: 'Master Antenna Television and IP Television systems for hotels, hospitals, and large facilities'
      },
      {
        icon: 'Shield',
        title: 'Audio/Video Systems',
        description: 'Professional AV solutions for conference rooms, auditoriums, and command centers'
      },
      {
        icon: 'Eye',
        title: 'Building Management',
        description: 'Integrated BMS solutions for HVAC, lighting, and energy management'
      }
    ]
  }
};

export async function POST() {
  try {
    await connectDB();

    // Check if home page data exists
    const existingData = await HomePage.findOne({});

    if (existingData) {
      // Update existing document with Low Current section
      existingData.lowCurrentSection = lowCurrentData;
      await existingData.save();
      
      return NextResponse.json({
        success: true,
        message: 'Low Current section updated successfully',
        data: lowCurrentData
      });
    } else {
      // Create new document with Low Current section
      await HomePage.create({
        lowCurrentSection: lowCurrentData,
        cctvSection: {
          badge: 'CCTV SURVEILLANCE',
          title: 'Advanced CCTV Solutions',
          description: 'Professional CCTV surveillance systems',
          solutions: []
        },
        structuredCablingSection: {
          badge: 'STRUCTURED CABLING',
          title: 'Enterprise Cabling Solutions',
          description: 'Professional structured cabling infrastructure',
          cablingFlow: [],
          copperCabling: [],
          fiberCabling: [],
          features: [],
          additionalSolutions: []
        },
        clientsSection: {
          badge: 'OUR CLIENTS',
          title: 'Trusted by Leading Organizations',
          description: 'We are proud to serve various clients',
          logos: []
        }
      });
      
      return NextResponse.json({
        success: true,
        message: 'Home page data created with Low Current section',
        data: lowCurrentData
      });
    }
  } catch (error) {
    console.error('Error initializing Low Current data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to initialize data' },
      { status: 500 }
    );
  }
}
