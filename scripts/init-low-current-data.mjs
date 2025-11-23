import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/wecare-tech';

const lowCurrentData = {
  badge: 'LOW CURRENT SYSTEMS',
  title: 'Integrated Security Solutions',
  description: 'We care Tech has Expertise in designing State of the Art Security Solutions. Our Security Solutions has multiple Facets which suits both Government, Retail, Military, Residential and High Security Premises.',
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

async function initLowCurrentData() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✓ Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('homepages');

    // Check if home page data exists
    const existingData = await collection.findOne({});

    if (existingData) {
      // Update existing document with Low Current section
      const result = await collection.updateOne(
        {},
        {
          $set: {
            lowCurrentSection: lowCurrentData
          }
        }
      );
      console.log('✓ Updated Low Current section in existing home page data');
      console.log(`  Modified ${result.modifiedCount} document(s)`);
    } else {
      // Create new document with Low Current section
      await collection.insertOne({
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
      console.log('✓ Created new home page data with Low Current section');
    }

    console.log('\n📊 Low Current Section Data Structure:');
    console.log(`  • Badge: "${lowCurrentData.badge}"`);
    console.log(`  • Title: "${lowCurrentData.title}"`);
    console.log(`  • Security Steps: ${lowCurrentData.securityApproach.steps.length} steps`);
    console.log(`  • Main Solutions: ${lowCurrentData.mainSolutions.length} cards`);
    console.log(`  • Additional Services: ${lowCurrentData.additionalServices.services.length} services`);
    
    console.log('\n✅ Low Current data initialization complete!');
    console.log('\nYou can now:');
    console.log('  1. Visit http://localhost:3000/admin/home-content to edit content');
    console.log('  2. Visit http://localhost:3000 to see the changes on homepage');

  } catch (error) {
    console.error('❌ Error initializing Low Current data:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n✓ Database connection closed');
  }
}

initLowCurrentData();
