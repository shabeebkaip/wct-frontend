import fetch from 'node-fetch';

const dummyProject = {
  title: 'Dubai Finance Center Data Center Upgrade',
  category: 'data-center',
  client: 'Dubai Financial Services Authority',
  location: 'Dubai, UAE',
  year: '2024',
  duration: '8 months',
  projectValue: '$2.5M',
  industry: 'Banking & Finance',
  status: 'completed',
  description: 'Complete data center infrastructure upgrade with Tier III compliance, including server room setup, cooling systems, and power redundancy.',
  overview: 'This comprehensive project involved upgrading the existing data center infrastructure to meet Tier III standards. The scope included designing and implementing a highly available, fault-tolerant data center environment with N+1 redundancy across all critical systems. The project encompassed electrical infrastructure, cooling systems, server racks, network cabling, and advanced monitoring systems.',
  images: [
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800',
    'https://images.unsplash.com/photo-1551703599-6b3e8379aa8d?w=800'
  ],
  services: [
    'Data Center Design & Consulting',
    'Infrastructure Installation',
    'Power Distribution Setup',
    'Cooling System Implementation',
    'Cable Management',
    'Testing & Commissioning'
  ],
  technologies: [
    'HP Enterprise Servers',
    'Cisco UCS',
    'APC UPS Systems',
    'Schneider Electric PDUs',
    'Panduit Cable Management',
    'Vertiv Cooling Units'
  ],
  tags: [
    'data-center',
    'tier-3',
    'enterprise',
    'finance',
    'high-availability'
  ],
  scope: [
    '200 server rack installations with proper cable management',
    'N+1 redundant cooling system with 150kW capacity',
    '2N power distribution with dual UPS systems (500kVA each)',
    'Structured cabling with fiber backbone',
    'Environmental monitoring system',
    'Fire suppression system upgrade',
    'Access control and security systems'
  ],
  challenge: 'The client needed to upgrade their aging data center infrastructure while maintaining 24/7 operations with zero downtime. The existing facility had limited power capacity, inadequate cooling, and outdated cabling infrastructure. Additionally, they needed to achieve Tier III certification to meet regulatory requirements for financial institutions.',
  solution: 'We implemented a phased approach with parallel infrastructure deployment. First, we installed temporary backup systems to ensure business continuity. Then, we systematically upgraded each component - power, cooling, networking - in carefully planned maintenance windows. We used hot-swappable equipment and redundant paths to eliminate single points of failure. Advanced monitoring systems were deployed to provide real-time visibility and predictive maintenance capabilities.',
  results: [
    '99.982% uptime guarantee achieved (Tier III compliant)',
    'Zero downtime during entire migration process',
    '40% improvement in cooling efficiency',
    '50% reduction in power consumption per rack',
    'Passed all regulatory compliance audits',
    'ROI achieved within 18 months'
  ],
  keyFeatures: [
    '24/7 environmental monitoring with AI-based predictive alerts',
    'Dual fiber paths with automatic failover',
    'Hot/cold aisle containment for optimal cooling',
    'Modular UPS systems for easy scalability',
    'Comprehensive DCIM (Data Center Infrastructure Management) platform',
    'Biometric access control with audit trails'
  ],
  specifications: {
    'Total Raised Floor Area': '5,000 sq ft',
    'Rack Density': '200 racks @ 10kW per rack',
    'Total Power Capacity': '2.5 MW',
    'Cooling Capacity': '150 kW',
    'UPS Redundancy': 'N+1 (2x 500kVA)',
    'Generator Backup': '1.5 MW with 48-hour fuel',
    'Network Backbone': '100 Gbps fiber',
    'Environmental Controls': 'Temperature 18-27°C, Humidity 40-60%',
    'Fire Suppression': 'FM-200 Clean Agent System'
  },
  teamSize: '15-20 engineers',
  complexity: 'enterprise',
  certifications: [
    'Tier III Design Certification',
    'ISO 27001',
    'Uptime Institute Certification',
    'TIA-942 Compliant'
  ],
  testimonial: {
    quote: 'The team delivered an exceptional data center upgrade that exceeded our expectations. Their attention to detail, proactive communication, and technical expertise ensured a seamless transition with zero impact to our operations. The new infrastructure has significantly improved our reliability and efficiency.',
    author: 'Ahmed Al Maktoum',
    position: 'Chief Technology Officer'
  },
  featured: true,
  order: 1
};

async function createProject() {
  try {
    console.log('Creating dummy project...\n');
    
    const response = await fetch('http://localhost:3000/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dummyProject),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create project: ${error}`);
    }

    const data = await response.json();
    console.log('✅ Project created successfully!');
    console.log('\nProject Details:');
    console.log('- ID:', data.project._id);
    console.log('- Title:', data.project.title);
    console.log('- Category:', data.project.category);
    console.log('- Client:', data.project.client);
    console.log('\nYou can now edit this project at:');
    console.log(`http://localhost:3000/admin/projects/${data.project._id}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\nMake sure:');
    console.log('1. Your dev server is running (pnpm run dev)');
    console.log('2. You are logged in to the admin panel');
    console.log('3. MongoDB is connected');
  }
}

createProject();
