import mongoose from 'mongoose';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: join(__dirname, '..', '.env.local') });

// Low Current Section Schema
const LowCurrentSectionSchema = new mongoose.Schema(
  {
    badge: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    securityFlow: [
      {
        step: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    solutions: [
      {
        icon: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        features: [{ type: String }],
      },
    ],
    additionalSolutions: [
      {
        icon: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    collection: 'low_current_section',
  }
);

const LowCurrentSection =
  mongoose.models.LowCurrentSection ||
  mongoose.model('LowCurrentSection', LowCurrentSectionSchema);

// Low Current Data
const lowCurrentData = {
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
};

async function initializeLowCurrentData() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if Low Current section already exists
    const existingLowCurrent = await LowCurrentSection.findOne();

    if (existingLowCurrent) {
      console.log('⚠️  Low Current section already exists. Updating...');
      await LowCurrentSection.findByIdAndUpdate(existingLowCurrent._id, lowCurrentData);
      console.log('✅ Low Current section updated successfully');
    } else {
      console.log('Creating new Low Current section...');
      await LowCurrentSection.create(lowCurrentData);
      console.log('✅ Low Current section created successfully');
    }

    // Verify the data
    const verifyData = await LowCurrentSection.findOne();
    console.log('\n📊 Low Current Section Data:');
    console.log(`   Badge: ${verifyData.badge}`);
    console.log(`   Title: ${verifyData.title}`);
    console.log(`   Security Flow: ${verifyData.securityFlow.length} steps`);
    verifyData.securityFlow.forEach((step, index) => {
      console.log(`   ${index + 1}. ${step.title}`);
    });
    console.log(`   Solutions: ${verifyData.solutions.length} items`);
    verifyData.solutions.forEach((solution, index) => {
      console.log(`   ${index + 1}. ${solution.title} (${solution.features.length} features)`);
    });
    console.log(`   Additional Solutions: ${verifyData.additionalSolutions.length} items`);
    verifyData.additionalSolutions.forEach((solution, index) => {
      console.log(`   ${index + 1}. ${solution.title}`);
    });

    console.log('\n✅ Low Current data initialization complete!');
  } catch (error) {
    console.error('❌ Error initializing Low Current data:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the initialization
initializeLowCurrentData();
