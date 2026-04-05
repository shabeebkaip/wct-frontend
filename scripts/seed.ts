/**
 * Database Seed Script - WE CARE TECH SOLUTIONS
 * Run: npx tsx scripts/seed.ts
 *
 * BEFORE RUNNING:
 *   Update MONGODB_URI in .env to your new Frankfurt cluster connection string.
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error('MONGODB_URI is not defined in .env');

// ─── Connect ──────────────────────────────────────────────────────────────────
async function connect() {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB');
}

// ─── Models (inline to avoid import path issues) ─────────────────────────────

const HeroSchema = new mongoose.Schema(
  {
    title: String, subtitle: String, description: String,
    badgeText: String, badgeDescription: String,
    primaryButtonText: String, primaryButtonLink: String,
    secondaryButtonText: String, secondaryButtonLink: String,
    backgroundImage: { type: String, default: '' },
  },
  { timestamps: true, collection: 'hero_section' }
);

const AboutPageSchema = new mongoose.Schema(
  {
    hero: { badge: String, title: String, description: String },
    companyStory: { badge: String, title: String, paragraphs: [String], image: { type: String, default: '/logo.png' } },
    mission: { icon: String, title: String, description: String },
    vision: { icon: String, title: String, description: String },
    coreValues: [{ icon: String, title: String, description: String }],
    teamMembers: [{ name: String, role: String, image: String, description: String, isLeadership: Boolean, order: Number }],
    cta: {
      title: String, description: String,
      primaryButton: { text: String, link: String },
      secondaryButton: { text: String, link: String },
    },
  },
  { timestamps: true, collection: 'about_page' }
);

const DataCenterHomeSchema = new mongoose.Schema(
  {
    sectionHeader: { badge: String, title: String, description: String },
    solutions: [{ icon: String, title: String, description: String }],
    features: [String],
    images: [{ src: String, alt: String, title: String, description: String }],
    cta: {
      title: String, description: String,
      primaryButton: { text: String, link: String },
      secondaryButton: { text: String, link: String },
    },
  },
  { timestamps: true, collection: 'data_center_home' }
);

const DataCenterPageSchema = new mongoose.Schema(
  {
    hero: {
      badge: String, title: String, description: String, features: [String], image: String,
      primaryButton: { text: String, link: String },
      secondaryButton: { text: String, link: String },
    },
    services: [{ icon: String, title: String, description: String, features: [String] }],
    process: [{ step: String, title: String, description: String, icon: String }],
    benefits: [{ icon: String, title: String, description: String }],
    brands: [{ name: String, logo: String, specialization: String }],
    projects: [{ name: String, client: String, location: String, image: String }],
    cta: {
      title: String, description: String,
      primaryButton: { text: String, link: String },
      secondaryButton: { text: String, link: String },
    },
  },
  { timestamps: true, collection: 'data_center_page' }
);

const SolutionSchema = new mongoose.Schema(
  {
    title: String, slug: { type: String, unique: true }, category: String,
    published: { type: Boolean, default: true }, order: { type: Number, default: 0 },
    hero: { title: String, subtitle: String, description: String, backgroundImage: String, features: [String] },
    overview: { title: String, description: String, image: String },
    services: [{ icon: String, title: String, description: String, features: [String] }],
    brands: [{ name: String, logo: String, specialization: String }],
    solutionTypes: [{ icon: String, title: String, description: String, applications: [String] }],
    features: [{ icon: String, title: String, description: String }],
    process: { title: String, steps: [{ number: Number, icon: String, title: String, description: String }] },
    benefits: { title: String, items: [{ icon: String, title: String, description: String }] },
    stats: [{ value: String, label: String, icon: String }],
    projects: [{ title: String, client: String, image: String, description: String }],
    cta: { title: String, description: String, buttonText: String, buttonLink: String },
    seo: { metaTitle: String, metaDescription: String, keywords: [String] },
  },
  { timestamps: true, collection: 'solutions' }
);

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    category: { type: String, enum: ['data-center', 'structured-cabling', 'low-current-solutions', 'low-voltage', 'control-rooms'] },
    client: String, location: String, year: String,
    duration: { type: String, default: '' }, projectValue: { type: String, default: '' },
    description: String, overview: { type: String, default: '' },
    images: { type: [String], default: [] }, industry: { type: String, default: '' },
    status: { type: String, enum: ['completed', 'in-progress', 'planned'], default: 'completed' },
    services: { type: [String], default: [] }, technologies: { type: [String], default: [] },
    tags: { type: [String], default: [] }, scope: { type: [String], default: [] },
    featured: { type: Boolean, default: false }, order: { type: Number, default: 0 },
    complexity: { type: String, enum: ['basic', 'medium', 'complex', 'enterprise'], default: 'medium' },
  },
  { timestamps: true }
);

const CCTVSectionSchema = new mongoose.Schema(
  {
    badge: String, title: String, description: String,
    solutions: [{ icon: String, title: String, description: String, color: String, features: [String] }],
  },
  { timestamps: true, collection: 'cctv_section' }
);

const LowCurrentSectionSchema = new mongoose.Schema(
  {
    badge: String, title: String, description: String,
    securityFlow: [{ step: Number, title: String, description: String }],
    solutions: [{ icon: String, title: String, description: String, features: [String] }],
    additionalSolutions: [{ icon: String, title: String, description: String }],
  },
  { timestamps: true, collection: 'low_current_section' }
);

const StructuredCablingSectionSchema = new mongoose.Schema(
  {
    badge: String, title: String, description: String,
    cablingFlow: [{ label: String, active: Boolean, highlight: Boolean }],
    copperCabling: [{ title: String, icon: String }],
    fiberCabling: [{ title: String, subtitle: String, icon: String }],
    features: [{ icon: String, title: String, description: String }],
  },
  { timestamps: true, collection: 'structured_cabling_section' }
);

const ClientsSectionSchema = new mongoose.Schema(
  {
    badge: String, title: String, description: String,
    logos: [{ src: String, alt: String }],
  },
  { timestamps: true, collection: 'clients_section' }
);

const TrustedBrandsSectionSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    categories: [String],
    brands: [{ src: String, alt: String, width: Number, height: Number }],
    trustBadge: String,
  },
  { timestamps: true, collection: 'trusted_brands_section' }
);

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'admin' },
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ─── Seed Data ────────────────────────────────────────────────────────────────

const heroData = {
  title: 'Next-Gen Data Center &',
  subtitle: 'ICT Solutions',
  description:
    "Pioneering turnkey data center solutions, electro-mechanical systems, and enterprise-grade infrastructure for the Kingdom's digital transformation since 2004.",
  badgeText: 'EST. 2005',
  badgeDescription: '20+ Years of ICT Excellence',
  primaryButtonText: 'Explore Solutions',
  primaryButtonLink: '/solutions/data-center',
  secondaryButtonText: 'View Projects',
  secondaryButtonLink: '/projects',
  backgroundImage: '',
};

const aboutPageData = {
  hero: {
    badge: 'ABOUT US',
    title: 'Building the Digital Infrastructure of Tomorrow',
    description:
      'We specialize in comprehensive solutions spanning Data Centers, Structured Cabling, Security Systems, Audio-Visual Integration, and Low Current Systems.',
  },
  companyStory: {
    badge: 'OUR STORY',
    title: 'Who We Are',
    paragraphs: [
      'We specialize in comprehensive solutions spanning Data Centers, Structured Cabling, Security Systems, Audio-Visual Integration, and Low Current Systems. Our team of certified engineers brings decades of combined experience, ensuring every project meets the highest standards of quality and reliability.',
      'Founded in 2005, WeCare Technology emerged with a clear mission to provide exceptional IT infrastructure solutions that empower businesses to thrive in the digital age. Our journey began in Riyadh, and over the years, we\'ve grown to become one of the most trusted names in the industry.',
      "Today, we serve a diverse portfolio of clients across government, healthcare, education, corporate, and hospitality sectors. Our commitment to innovation, quality, and customer satisfaction has made us the partner of choice for mission-critical infrastructure projects throughout the Kingdom and beyond.",
    ],
    image: '/logo.png',
  },
  mission: {
    icon: 'Target',
    title: 'Our Mission',
    description:
      'To provide exceptional IT infrastructure solutions that empower businesses to thrive in the digital age, delivering reliable and scalable infrastructure with a focus on quality and innovation.',
  },
  vision: {
    icon: 'Eye',
    title: 'Our Vision',
    description:
      'To be the most trusted infrastructure and technology solutions company in the Kingdom, recognized for excellence in data centers, networking, and integrated security systems.',
  },
  coreValues: [
    { icon: 'Shield', title: 'Reliability', description: 'Delivering dependable infrastructure solutions that perform consistently under the most demanding conditions.' },
    { icon: 'Star', title: 'Excellence', description: 'Maintaining the highest standards of quality in every project, from design through commissioning.' },
    { icon: 'Zap', title: 'Innovation', description: 'Embracing cutting-edge technologies to provide future-proof solutions for our clients.' },
    { icon: 'Users', title: 'Partnership', description: 'Building long-term relationships with clients based on trust, transparency, and mutual success.' },
  ],
  teamMembers: [],
  cta: {
    title: 'Ready to Build Your Infrastructure?',
    description: 'Partner with WE CARE TECH SOLUTIONS for reliable, standards-compliant infrastructure that powers your digital transformation.',
    primaryButton: { text: 'Get in Touch', link: '/contact' },
    secondaryButton: { text: 'View Projects', link: '/projects' },
  },
};

const dataCenterHomeData = {
  sectionHeader: {
    badge: 'DATA CENTER SOLUTIONS',
    title: 'Enterprise Data Center Infrastructure',
    description:
      'End-to-end data center turnkey solutions covering planning, design coordination, supply, installation, testing, and commissioning of infrastructure systems.',
  },
  solutions: [
    { icon: 'Server', title: 'Legacy Data Centers', description: 'Upgrading and modernizing existing facilities to improve performance, efficiency, and reliability.' },
    { icon: 'Layers', title: 'Modular Data Centers', description: 'Scalable, prefabricated modules for flexible expansion and rapid deployment.' },
    { icon: 'Cloud', title: 'Hybrid & Containerized', description: 'Combining on-premise infrastructure with modular or portable units for evolving requirements.' },
  ],
  features: [
    'Tier III & IV Certified Design',
    'N+1 Redundancy',
    'Precision Cooling',
    'Fire Suppression',
    'Structured Cabling',
    'Power Distribution',
  ],
  images: [
    { src: '/images/datacenter-1.jpg', alt: 'Data Center Server Room', title: 'Enterprise Server Infrastructure', description: 'High-density server racks with precision cooling and redundant power.' },
    { src: '/images/datacenter-2.jpg', alt: 'Structured Cabling', title: 'Structured Cabling Systems', description: 'Certified cabling infrastructure for reliable high-speed connectivity.' },
    { src: '/images/datacenter-3.jpg', alt: 'Cooling Systems', title: 'Precision Cooling', description: 'Advanced CRAC units maintaining optimal temperature and humidity.' },
    { src: '/images/datacenter-4.jpg', alt: 'Power Distribution', title: 'Power Distribution', description: 'N+1 redundant UPS and PDU systems ensuring zero downtime.' },
  ],
  cta: {
    title: 'Ready for a World-Class Data Center?',
    description: 'Contact us to discuss your data center requirements and get a tailored solution.',
    primaryButton: { text: 'Explore Solutions', link: '/solutions/data-center' },
    secondaryButton: { text: 'View Projects', link: '/projects' },
  },
};

const dataCenterPageData = {
  hero: {
    badge: 'DATA CENTER SOLUTIONS',
    title: 'Turnkey Data Center Solutions',
    description:
      'WE CARE TECH SOLUTIONS delivers complete data center turnkey solutions covering planning, design coordination, supply, installation, testing, and commissioning of infrastructure systems under a single execution framework.',
    features: ['Tier III & IV Design', 'End-to-End Delivery', 'Standards Compliant', '24/7 Support'],
    image: '',
    primaryButton: { text: 'Get a Quote', link: '/contact' },
    secondaryButton: { text: 'View Projects', link: '/projects' },
  },
  services: [
    {
      icon: 'Layers',
      title: 'Integrated Engineering Systems',
      description: 'We integrate civil, electrical, mechanical, low voltage, and IT infrastructure systems for seamless operation and reliable performance.',
      features: ['Civil Works', 'Electrical Systems', 'Mechanical Systems', 'IT Infrastructure'],
    },
    {
      icon: 'Shield',
      title: 'Precision Cooling & Environmental Control',
      description: 'Precision cooling solutions maintaining stable temperature and humidity levels for optimal IT equipment performance.',
      features: ['Precision Air Conditioning', 'Hot/Cold Aisle Containment', 'Environmental Monitoring', 'Scalable Design'],
    },
    {
      icon: 'Zap',
      title: 'Power Distribution & UPS',
      description: 'Comprehensive power solutions including UPS systems, PDUs, generators, and automatic transfer switches for maximum uptime.',
      features: ['UPS Systems', 'Power Distribution Units', 'Generators', 'ATS Installations'],
    },
    {
      icon: 'Fire',
      title: 'Fire, Safety & Monitoring',
      description: 'Clean agent fire suppression with advanced detection and real-time monitoring for mission-critical environments.',
      features: ['Clean Agent Suppression', 'Fire Detection', 'Environmental Monitoring', 'Alert Systems'],
    },
    {
      icon: 'Network',
      title: 'Structured Cabling & Networking',
      description: 'End-to-end networking infrastructure with copper and fiber cabling for maximum speed and reliability.',
      features: ['Cat6A Copper', 'Single/Multi-mode Fiber', 'Cable Management', 'Testing & Certification'],
    },
    {
      icon: 'Building',
      title: 'Civil & Infrastructure Works',
      description: 'Raised floor systems, fire-rated partitions, fire-rated doors, and associated civil works for secure, compliant facilities.',
      features: ['Raised Floor Systems', 'Fire-Rated Partitions', 'Fire-Rated Doors', 'Civil Coordination'],
    },
  ],
  process: [
    { step: '01', icon: 'Search', title: 'Site Assessment & Planning', description: 'Comprehensive evaluation of requirements, site conditions, and infrastructure needs to develop an optimal design.' },
    { step: '02', icon: 'PenTool', title: 'Design & Engineering', description: 'Detailed engineering design covering all disciplines — civil, electrical, mechanical, and IT systems.' },
    { step: '03', icon: 'Package', title: 'Supply & Procurement', description: 'Sourcing and procurement of equipment from certified vendors meeting international standards.' },
    { step: '04', icon: 'Wrench', title: 'Installation & Integration', description: 'Professional installation by certified technicians ensuring optimal performance and code compliance.' },
    { step: '05', icon: 'CheckCircle', title: 'Testing & Commissioning', description: 'Thorough testing, validation, and commissioning of all systems to ensure they meet design specifications.' },
    { step: '06', icon: 'LifeBuoy', title: 'Handover & Support', description: 'Project handover with complete documentation, training, and ongoing maintenance support.' },
  ],
  benefits: [
    { icon: 'Shield', title: 'Standards Compliance', description: 'Full compliance with TIA-942, BICSI, EIA/TIA-568A and other international data center standards.' },
    { icon: 'Zap', title: 'Operational Continuity', description: 'Redundant systems and N+1 architecture ensuring maximum uptime and business continuity.' },
    { icon: 'Layers', title: 'Scalable Design', description: 'Infrastructure designed to grow with your business — from initial deployment to full capacity.' },
    { icon: 'Clock', title: 'On-Time Delivery', description: 'Disciplined project management ensuring delivery within agreed timelines and budget.' },
  ],
  brands: [],
  projects: [
    { name: 'Wakeb – Tier 3 Data Center', client: 'Wakeb', location: 'Saudi Arabia', image: '' },
    { name: 'King Khalid University – Tier III Data Center', client: 'King Khalid University', location: 'Saudi Arabia', image: '' },
    { name: 'Ministry of Defense – Legacy Data Center', client: 'Ministry of Defense', location: 'Saudi Arabia', image: '' },
    { name: '2P Cloud – Tier 3 Data Center', client: '2P Cloud', location: 'Saudi Arabia', image: '' },
  ],
  cta: {
    title: 'Ready to Build Your Data Center?',
    description: 'Contact our team to discuss your data center requirements and get a tailored turnkey solution.',
    primaryButton: { text: 'Get in Touch', link: '/contact' },
    secondaryButton: { text: 'View Projects', link: '/projects' },
  },
};

const solutionsData = [
  {
    title: 'Data Center Solutions',
    slug: 'data-center',
    category: 'Infrastructure',
    published: true,
    order: 1,
    hero: {
      title: 'Turnkey Data Center Solutions',
      subtitle: 'End-to-End Infrastructure Delivery',
      description: 'Complete data center solutions from planning and design through installation, testing, and commissioning — delivered under a single execution framework.',
      features: ['Tier III & IV Design', 'End-to-End Delivery', 'Standards Compliant'],
    },
    overview: {
      title: 'Comprehensive Data Center Infrastructure',
      description: 'WE CARE TECH SOLUTIONS integrates civil, electrical, mechanical, low voltage, and IT infrastructure systems to deliver mission-critical data centers that meet the highest standards of reliability, efficiency, and compliance.',
    },
    services: [
      { icon: 'Server', title: 'Legacy Data Centers', description: 'Upgrading and modernizing existing facilities to improve performance, efficiency, and reliability while extending operational life.', features: ['Infrastructure Assessment', 'Performance Optimization', 'System Modernization', 'Extended Lifecycle'] },
      { icon: 'Layers', title: 'Modular Data Centers', description: 'Prefabricated modular solutions for scalability, rapid deployment, and flexible infrastructure growth.', features: ['Prefabricated Modules', 'Rapid Deployment', 'Scalable Expansion', 'Controlled Growth'] },
      { icon: 'Cloud', title: 'Hybrid & Containerized', description: 'Combining on-premise infrastructure with modular or portable units for high-density computing and fast deployment.', features: ['Hybrid Architecture', 'High-Density Computing', 'Portable Units', 'Adaptable Design'] },
    ],
    features: [
      { icon: 'Shield', title: 'Standards Compliance', description: 'Full compliance with TIA-942, BICSI, and international data center standards.' },
      { icon: 'Zap', title: 'Redundant Power', description: 'N+1 UPS systems, PDUs, generators, and ATS for maximum uptime.' },
      { icon: 'Wind', title: 'Precision Cooling', description: 'Stable temperature and humidity control for mission-critical IT equipment.' },
      { icon: 'Eye', title: 'Fire & Safety Systems', description: 'Clean agent suppression and advanced detection systems.' },
    ],
    process: {
      title: 'Our Delivery Process',
      steps: [
        { number: 1, icon: 'Search', title: 'Assessment & Planning', description: 'Comprehensive evaluation of requirements and site conditions.' },
        { number: 2, icon: 'PenTool', title: 'Design & Engineering', description: 'Detailed multi-discipline engineering design.' },
        { number: 3, icon: 'Wrench', title: 'Installation', description: 'Professional installation by certified technicians.' },
        { number: 4, icon: 'CheckCircle', title: 'Testing & Commissioning', description: 'Thorough validation and commissioning of all systems.' },
      ],
    },
    benefits: {
      title: 'Why Choose Us',
      items: [
        { icon: 'Shield', title: 'Standards-Compliant', description: 'Every project meets international data center standards.' },
        { icon: 'Clock', title: 'On-Time Delivery', description: 'Disciplined project management within agreed timelines.' },
        { icon: 'Layers', title: 'Scalable Design', description: 'Future-proof infrastructure that grows with your needs.' },
      ],
    },
    stats: [
      { value: '20+', label: 'Years Experience', icon: 'Calendar' },
      { value: '100+', label: 'Projects Delivered', icon: 'CheckCircle' },
      { value: 'Tier III', label: 'Certified Design', icon: 'Award' },
    ],
    cta: { title: 'Ready to Build Your Data Center?', description: 'Contact our team for a tailored turnkey solution.', buttonText: 'Get in Touch', buttonLink: '/contact' },
    seo: { metaTitle: 'Data Center Solutions | WE CARE TECH', metaDescription: 'Turnkey data center solutions including design, installation, and commissioning.', keywords: ['data center', 'turnkey', 'tier 3', 'Saudi Arabia'] },
  },
  {
    title: 'Structured Cabling Solutions',
    slug: 'structured-cabling',
    category: 'Networking',
    published: true,
    order: 2,
    hero: {
      title: 'Structured Cabling Solutions',
      subtitle: 'EIA/TIA-568A Compliant Infrastructure',
      description: 'We Care Tech has a concrete design approach for Structured Cabling Solutions. We follow EIA/TIA-568A Standards ensuring all sub-elements of the infrastructure are accounted for.',
      features: ['EIA/TIA-568A Compliant', 'Copper & Fiber', 'Enterprise-Grade'],
    },
    overview: {
      title: 'Comprehensive Cabling Infrastructure',
      description: 'End-to-end structured cabling deployment including copper (UTP, STP, FTP, Coaxial) and fiber optic (single-mode and multi-mode) solutions for data centers and enterprise environments.',
    },
    services: [
      { icon: 'Cable', title: 'Copper Cabling', description: 'UTP, STP, FTP, and Coaxial cabling for reliable data, voice, and control communications.', features: ['Cat6A UTP', 'STP/FTP Shielded', 'Coaxial Cable', 'EIA/TIA Standards'] },
      { icon: 'Network', title: 'Fiber Optic Cabling', description: 'Single-mode and multi-mode fiber for high-speed, secure, and scalable network connectivity.', features: ['Single Mode (Indoor & Outdoor)', 'Multi Mode (Indoor & Outdoor)', 'High-Speed Connectivity', 'Long Distance'] },
      { icon: 'Server', title: 'Network Infrastructure', description: 'End-to-end implementation including cable management, termination, testing, and integration.', features: ['Cable Management', 'Termination & Testing', 'Documentation', 'Certification'] },
    ],
    features: [
      { icon: 'Shield', title: 'Standards Compliance', description: 'Full compliance with EIA/TIA-568A international standards.' },
      { icon: 'Zap', title: 'High Performance', description: 'Cat6A and fiber optic solutions for maximum speed and reliability.' },
      { icon: 'Settings', title: 'Scalable Design', description: 'Future-proof infrastructure that grows with your business.' },
    ],
    process: {
      title: 'Implementation Process',
      steps: [
        { number: 1, icon: 'Search', title: 'Site Survey', description: 'Detailed assessment of existing infrastructure and requirements.' },
        { number: 2, icon: 'PenTool', title: 'Design', description: 'Standards-compliant cabling design and documentation.' },
        { number: 3, icon: 'Wrench', title: 'Installation', description: 'Professional cable installation and management.' },
        { number: 4, icon: 'CheckCircle', title: 'Testing & Certification', description: 'Full certification testing to international standards.' },
      ],
    },
    benefits: { title: 'Key Benefits', items: [
      { icon: 'Shield', title: 'Standards-Compliant', description: 'Meets EIA/TIA-568A requirements.' },
      { icon: 'Zap', title: 'High Performance', description: 'Optimized for maximum network speed.' },
      { icon: 'Layers', title: 'Scalable', description: 'Grows with your infrastructure needs.' },
    ]},
    stats: [
      { value: '300+', label: 'Locations Cabled', icon: 'MapPin' },
      { value: '20+', label: 'Years Experience', icon: 'Calendar' },
      { value: 'Cat6A', label: 'Enterprise Grade', icon: 'Award' },
    ],
    cta: { title: 'Need Structured Cabling?', description: 'Get a professional cabling solution that meets international standards.', buttonText: 'Get in Touch', buttonLink: '/contact' },
    seo: { metaTitle: 'Structured Cabling Solutions | WE CARE TECH', metaDescription: 'EIA/TIA-568A compliant structured cabling solutions including copper and fiber optic.', keywords: ['structured cabling', 'fiber optic', 'Cat6A', 'Saudi Arabia'] },
  },
  {
    title: 'CCTV Surveillance Solutions',
    slug: 'cctv-surveillance',
    category: 'Security',
    published: true,
    order: 3,
    hero: {
      title: 'CCTV Surveillance Solutions',
      subtitle: 'Comprehensive Security Systems',
      description: 'Comprehensive security systems tailored to your specific needs, powered by cutting-edge technology and industry-leading expertise.',
      features: ['AI-Powered Analytics', '24/7 Monitoring', 'IP & Analog Systems'],
    },
    overview: {
      title: 'Advanced Surveillance Technology',
      description: 'From high-value asset protection to crowd management, we deliver tailored CCTV solutions for every environment — banks, defense, residential, retail, and places of worship.',
    },
    services: [
      { icon: 'Shield', title: 'High Value Assets', description: 'Advanced surveillance for banks, jewelry stores, and critical infrastructure with AI-powered threat detection.', features: ['24/7 Monitoring', 'AI Analytics', 'Tamper Detection', 'Encrypted Feeds'] },
      { icon: 'Building2', title: 'Military & Defense', description: 'Military-grade surveillance with thermal imaging, perimeter security, and command center integration.', features: ['Thermal Imaging', 'Perimeter Security', 'Encrypted Feeds', 'Command Center'] },
      { icon: 'Users', title: 'Crowd Management', description: 'Intelligent crowd monitoring for events, stadiums, and public spaces with real-time analytics.', features: ['Crowd Analytics', 'Heat Mapping', 'Alert System', 'Real-Time Monitoring'] },
      { icon: 'Home', title: 'Residential Areas', description: 'Smart home security with mobile access, motion detection, and neighborhood watch integration.', features: ['Mobile Access', 'Motion Detection', 'Cloud Storage', 'Smart Alerts'] },
      { icon: 'Moon', title: 'Masjid Solutions', description: 'Respectful surveillance for places of worship ensuring safety while maintaining privacy and sanctity.', features: ['Privacy Zones', 'Audio Masking', 'Donation Security', 'Discrete Placement'] },
      { icon: 'ShoppingBag', title: 'Mall & Retail', description: 'Retail security with customer analytics, theft prevention, and parking lot monitoring.', features: ['Facial Recognition', 'People Counting', 'POS Integration', 'Parking Monitoring'] },
    ],
    features: [
      { icon: 'Eye', title: '4K Resolution', description: 'Ultra-high definition cameras for crystal clear footage.' },
      { icon: 'Brain', title: 'AI Analytics', description: 'Smart detection, facial recognition, and behavioral analysis.' },
      { icon: 'Cloud', title: 'Cloud & NVR Storage', description: 'Flexible storage options from local NVR to cloud.' },
      { icon: 'Smartphone', title: 'Remote Access', description: 'Monitor your premises from anywhere via mobile app.' },
    ],
    process: { title: 'Installation Process', steps: [
      { number: 1, icon: 'Search', title: 'Site Survey', description: 'Detailed assessment of the premises and security requirements.' },
      { number: 2, icon: 'PenTool', title: 'System Design', description: 'Custom camera placement and system architecture design.' },
      { number: 3, icon: 'Wrench', title: 'Installation', description: 'Professional installation and cable management.' },
      { number: 4, icon: 'CheckCircle', title: 'Configuration & Training', description: 'System configuration and staff training.' },
    ]},
    benefits: { title: 'Benefits', items: [
      { icon: 'Shield', title: 'Deterrence', description: 'Visible cameras deter criminal activity.' },
      { icon: 'Eye', title: 'Evidence', description: 'High-quality footage for investigations.' },
      { icon: 'Clock', title: '24/7 Coverage', description: 'Round-the-clock monitoring and recording.' },
    ]},
    stats: [
      { value: '500+', label: 'Cameras Installed', icon: 'Camera' },
      { value: '20+', label: 'Years Experience', icon: 'Calendar' },
      { value: '24/7', label: 'Monitoring', icon: 'Eye' },
    ],
    cta: { title: 'Secure Your Premises', description: 'Get a custom CCTV solution designed for your specific needs.', buttonText: 'Get in Touch', buttonLink: '/contact' },
    seo: { metaTitle: 'CCTV Surveillance Solutions | WE CARE TECH', metaDescription: 'Advanced CCTV surveillance systems for residential, commercial, and government facilities.', keywords: ['CCTV', 'surveillance', 'security cameras', 'Saudi Arabia'] },
  },
  {
    title: 'Low Current & Security Systems',
    slug: 'low-current-systems',
    category: 'Security',
    published: true,
    order: 4,
    hero: {
      title: 'Integrated Low Current Systems',
      subtitle: 'Complete Security Integration',
      description: 'Complete low current system integration for comprehensive facility management and security — from perimeter protection to building automation.',
      features: ['Access Control', 'Intrusion Detection', 'Building Management'],
    },
    overview: {
      title: 'Multi-Layered Security Approach',
      description: 'WE CARE TECH SOLUTIONS delivers integrated electro-mechanical, low voltage, and security systems designed to ensure operational reliability, safety, and seamless system integration.',
    },
    services: [
      { icon: 'Shield', title: 'Perimeter Protection', description: 'Advanced boundary security with electric fencing, intrusion detection, and real-time alert systems.', features: ['Electric Fencing', 'Motion Sensors', 'Laser Barriers', 'Alert Integration'] },
      { icon: 'Lock', title: 'Access Control', description: 'Biometric and card-based access management for secure entry and exit control across facilities.', features: ['Biometric Readers', 'RFID Cards', 'Time & Attendance', 'Multi-Level Access'] },
      { icon: 'Eye', title: 'On-Premise Security', description: 'Comprehensive indoor monitoring with IP cameras, NVR systems, and integrated surveillance.', features: ['IP Cameras', 'NVR/DVR Systems', 'Analytics', 'Remote Monitoring'] },
      { icon: 'Wifi', title: 'MATV & IPTV', description: 'Master Antenna Television and IP Television systems for hotels, hospitals, and large facilities.', features: ['Hotel Systems', 'Hospital TV', 'IPTV Streaming', 'Distribution'] },
      { icon: 'Volume2', title: 'Audio/Video Systems', description: 'Professional AV solutions for conference rooms, auditoriums, and command centers.', features: ['Conference Rooms', 'Auditoriums', 'Command Centers', 'Video Walls'] },
      { icon: 'Building', title: 'Building Management', description: 'Integrated BMS solutions for HVAC, lighting, and energy management.', features: ['HVAC Control', 'Lighting Control', 'Energy Management', 'Centralized Monitoring'] },
    ],
    features: [
      { icon: 'Layers', title: 'System Integration', description: 'All systems integrated for centralized control and monitoring.' },
      { icon: 'Shield', title: 'Multi-Layer Security', description: 'Defense-in-depth approach from perimeter to interior.' },
      { icon: 'Zap', title: 'Certified Installation', description: 'All works carried out by certified technicians.' },
    ],
    process: { title: 'Our Process', steps: [
      { number: 1, icon: 'Search', title: 'Site Assessment', description: 'Comprehensive evaluation of security requirements and infrastructure.' },
      { number: 2, icon: 'PenTool', title: 'System Design', description: 'Custom solution design for your facility requirements.' },
      { number: 3, icon: 'Wrench', title: 'Professional Installation', description: 'Expert installation by certified technicians.' },
      { number: 4, icon: 'CheckCircle', title: 'Testing & Support', description: 'Thorough testing and ongoing maintenance support.' },
    ]},
    benefits: { title: 'Benefits', items: [
      { icon: 'Shield', title: 'Enhanced Security', description: 'Comprehensive protection across all facility zones.' },
      { icon: 'Layers', title: 'Centralized Control', description: 'Manage all systems from a single platform.' },
      { icon: 'Settings', title: 'Scalable', description: 'Systems that grow and adapt with your needs.' },
    ]},
    stats: [
      { value: '20+', label: 'Years Experience', icon: 'Calendar' },
      { value: '100+', label: 'Facilities Secured', icon: 'Building' },
      { value: '9', label: 'Solution Types', icon: 'Layers' },
    ],
    cta: { title: 'Protect Your Facility', description: 'Get a comprehensive integrated security solution tailored to your needs.', buttonText: 'Get in Touch', buttonLink: '/contact' },
    seo: { metaTitle: 'Low Current & Security Systems | WE CARE TECH', metaDescription: 'Integrated low current and security systems including access control, CCTV, and building management.', keywords: ['low current systems', 'access control', 'security systems', 'Saudi Arabia'] },
  },
];

const projectsData = [
  {
    title: 'Hitachi Expansion and Passive Cabling Project Dammam',
    category: 'structured-cabling',
    client: 'HITACHI Energy LTD',
    location: 'KSA, Dammam',
    year: '2023-2024',
    description: 'Structured Cabling for Network with UTP Cables and Fiber Cabling for Security and IT.',
    status: 'completed',
    services: ['Data Center Setup', 'Structured Cabling'],
    technologies: ['IT Rack Systems', 'UPS', 'Precision Cooling'],
    scope: ['Structured Cabling for Data cable and Fiber Cabling'],
    industry: 'Energy',
    complexity: 'medium',
    projectValue: '2 Million',
    teamSize: '15-20',
    duration: '10 months',
    featured: true,
    order: 1,
  },
  {
    title: 'ABB Active Network Switches Project',
    category: 'low-voltage',
    client: 'ABB',
    location: 'KSA, Dammam',
    year: '2025',
    description: 'Supply and deployment of Active Cisco Switches for ABB facilities.',
    status: 'completed',
    services: ['Active Devices Cisco Network Switches'],
    technologies: ['Network Switches'],
    scope: ['Supply of Active Devices Switches'],
    industry: 'Industrial',
    complexity: 'medium',
    projectValue: '1.5 Million',
    teamSize: '2',
    duration: '10 months',
    featured: true,
    order: 2,
  },
  {
    title: 'NCMS CCTV Project',
    category: 'low-current-solutions',
    client: 'NCMS',
    location: 'KSA, Riyadh',
    year: '2025',
    description: 'CCTV and security systems deployment for NCMS facilities in Riyadh.',
    status: 'completed',
    services: ['CCTV Surveillance', 'Security Systems'],
    technologies: ['IP Cameras', 'NVR Systems', 'Network Switches'],
    scope: ['Supply and installation of CCTV security systems'],
    industry: 'Government',
    complexity: 'complex',
    projectValue: '2 Million',
    teamSize: '2',
    duration: '10 months',
    featured: true,
    order: 3,
  },
  {
    title: 'CATRION HPE Aruba Wi-Fi System – NEOM',
    category: 'low-voltage',
    client: 'CATRION',
    location: 'KSA, NEOM',
    year: '2025',
    description: 'Supply and deployment of HPE Aruba Wi-Fi systems for CATRION facilities at NEOM.',
    status: 'completed',
    services: ['Wireless Networking', 'HPE Aruba Wi-Fi'],
    technologies: ['HPE Aruba Access Points', 'Network Switches'],
    scope: ['Supply of HPE Aruba Wi-Fi systems'],
    industry: 'Hospitality',
    complexity: 'complex',
    projectValue: '1 Million',
    teamSize: '5-10',
    duration: '3 months',
    featured: true,
    order: 4,
  },
  {
    title: 'ALMARAI CCTV Project – Jeddah',
    category: 'low-current-solutions',
    client: 'ALMARAI',
    location: 'KSA, Jeddah',
    year: '2026',
    description: 'CCTV surveillance system supply and installation for ALMARAI facilities in Jeddah.',
    status: 'completed',
    services: ['CCTV Surveillance', 'Security Systems'],
    technologies: ['IP Cameras', 'NVR Systems', 'Network Switches'],
    scope: ['Supply of Almarai CCTV Project Jeddah'],
    industry: 'Food & Beverage',
    complexity: 'complex',
    projectValue: '1.2 Million',
    teamSize: '5-8',
    duration: '4 months',
    featured: true,
    order: 5,
  },
  {
    title: 'ALMARAI Security Systems – Phase 2',
    category: 'low-current-solutions',
    client: 'ALMARAI',
    location: 'KSA, Jeddah',
    year: '2026',
    description: 'Phase 2 of CCTV and security systems deployment for ALMARAI facilities in Jeddah.',
    status: 'completed',
    services: ['CCTV Surveillance', 'Security Systems'],
    technologies: ['IP Cameras', 'NVR Systems', 'Network Switches'],
    scope: ['Supply of Almarai CCTV Project Jeddah Phase 2'],
    industry: 'Food & Beverage',
    complexity: 'complex',
    projectValue: '1.2 Million',
    teamSize: '5-8',
    duration: '4 months',
    featured: false,
    order: 6,
  },
  {
    title: 'ALMARAI Security Systems – Phase 3',
    category: 'low-current-solutions',
    client: 'ALMARAI',
    location: 'KSA, Jeddah',
    year: '2026',
    description: 'Phase 3 of CCTV and security systems deployment for ALMARAI facilities in Jeddah.',
    status: 'completed',
    services: ['CCTV Surveillance', 'Security Systems'],
    technologies: ['IP Cameras', 'NVR Systems', 'Network Switches'],
    scope: ['Supply of Almarai CCTV Project Jeddah Phase 3'],
    industry: 'Food & Beverage',
    complexity: 'complex',
    projectValue: '1.2 Million',
    teamSize: '5-8',
    duration: '4 months',
    featured: false,
    order: 7,
  },
];

const cctvSectionData = {
  badge: 'SURVEILLANCE SOLUTIONS',
  title: 'CCTV Surveillance Solutions',
  description: 'Comprehensive security systems tailored to your specific needs, powered by cutting-edge technology and industry-leading expertise',
  solutions: [
    { icon: 'Shield', title: 'High Value Assets', description: 'Advanced surveillance systems for banks, jewelry stores, and critical infrastructure with AI-powered threat detection', color: 'from-blue-500 to-cyan-500', features: ['24/7 Monitoring', 'AI Analytics', 'Tamper Detection'] },
    { icon: 'Building2', title: 'Military & Defense', description: 'Military-grade surveillance solutions with thermal imaging, perimeter security, and command center integration', color: 'from-red-500 to-orange-500', features: ['Thermal Imaging', 'Perimeter Security', 'Encrypted Feeds'] },
    { icon: 'Users', title: 'Crowd Management', description: 'Intelligent crowd monitoring for events, stadiums, and public spaces with real-time analytics and alerts', color: 'from-purple-500 to-pink-500', features: ['Crowd Analytics', 'Heat Mapping', 'Alert System'] },
    { icon: 'MapPin', title: 'Residential Areas', description: 'Smart home security with mobile access, motion detection, and neighborhood watch integration', color: 'from-green-500 to-emerald-500', features: ['Mobile Access', 'Motion Detection', 'Cloud Storage'] },
    { icon: 'Building2', title: 'Masjid Solutions', description: 'Respectful surveillance for places of worship ensuring safety while maintaining privacy and sanctity', color: 'from-indigo-500 to-blue-500', features: ['Privacy Zones', 'Audio Masking', 'Donation Security'] },
    { icon: 'ShoppingBag', title: 'Mall & Retail', description: 'Comprehensive retail security with customer analytics, theft prevention, and parking lot monitoring', color: 'from-yellow-500 to-orange-500', features: ['Facial Recognition', 'People Counting', 'POS Integration'] },
  ],
};

const lowCurrentSectionData = {
  badge: 'LOW CURRENT SYSTEMS',
  title: 'Integrated Security Solutions',
  description: 'Complete low current system integration for comprehensive facility management and security',
  securityFlow: [
    { step: 1, title: 'Site Assessment', description: 'Comprehensive evaluation of security requirements and infrastructure needs' },
    { step: 2, title: 'System Design', description: "Custom solution design tailored to your facility's specific requirements" },
    { step: 3, title: 'Professional Installation', description: 'Expert installation by certified technicians ensuring optimal performance' },
    { step: 4, title: 'Testing & Support', description: 'Thorough testing and ongoing maintenance support for system reliability' },
  ],
  solutions: [
    { icon: 'Shield', title: 'Perimeter Protection System', description: 'Advanced boundary security with electric fencing, intrusion detection, and real-time alert systems', features: ['Electric Fencing', 'Motion Sensors', 'Laser Barriers', 'Alert Integration'] },
    { icon: 'Lock', title: 'Access Control System', description: 'Biometric and card-based access management for secure entry and exit control across facilities', features: ['Biometric Readers', 'RFID Cards', 'Time Attendance', 'Multi-Level Access'] },
    { icon: 'Eye', title: 'On Premise Security', description: 'Comprehensive indoor monitoring with IP cameras, NVR systems, and integrated surveillance platforms', features: ['IP Cameras', 'NVR/DVR Systems', 'Analytics', 'Remote Monitoring'] },
    { icon: 'MapPin', title: 'Public Area Protection', description: 'Wide-area surveillance solutions for public spaces, parking lots, and outdoor facilities', features: ['PTZ Cameras', 'License Plate Recognition', 'Crowd Analytics', 'Emergency Response'] },
  ],
  additionalSolutions: [
    { icon: 'Zap', title: 'MATV & IPTV Solutions', description: 'Master Antenna Television and IP Television systems for hotels, hospitals, and large facilities' },
    { icon: 'Shield', title: 'Audio/Video Systems', description: 'Professional AV solutions for conference rooms, auditoriums, and command centers' },
    { icon: 'Eye', title: 'Building Management', description: 'Integrated BMS solutions for HVAC, lighting, and energy management' },
  ],
};

const structuredCablingSectionData = {
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
    { icon: 'Shield', title: 'Standards Compliance', description: 'Full compliance with EIA/TIA-568A international standards' },
    { icon: 'Zap', title: 'High Performance', description: 'Cat6A and fiber optic solutions for maximum speed and reliability' },
    { icon: 'Settings', title: 'Scalable Design', description: 'Future-proof infrastructure that grows with your business needs' },
  ],
};

const clientsSectionData = {
  badge: 'OUR PARTNERS',
  title: 'Trusted by Industry Leaders',
  description: 'Partnering with world-class brands to deliver excellence',
  logos: [],
};

const trustedBrandsSectionData = {
  title: 'Trusted Brands We Use',
  description: 'We work with industry-leading brands to deliver reliable and high-performance solutions. Our expertise with these trusted products ensures quality installations and support.',
  categories: ['Power & UPS Systems', 'Cooling Solutions', 'Infrastructure & Racks', 'Generators & Backup Power'],
  brands: [
    { src: '/trusted-brands/rm.png',        alt: 'R&M',            width: 120, height: 60 },
    { src: '/trusted-brands/panduit.webp',  alt: 'Panduit',        width: 120, height: 60 },
    { src: '/trusted-brands/corning.webp',  alt: 'Corning',        width: 120, height: 60 },
    { src: '/trusted-brands/legrand.jpg',   alt: 'Legrand',        width: 120, height: 60 },
    { src: '/trusted-brands/commscope.png', alt: 'CommScope',      width: 120, height: 60 },
    { src: '/trusted-brands/3m.jpg',        alt: '3M',             width: 120, height: 60 },
    { src: '/trusted-brands/leviton.jpg',   alt: 'Leviton',        width: 120, height: 60 },
    { src: '/trusted-brands/datwyler.jpg',  alt: 'Datwyler',       width: 120, height: 60 },
    { src: '/trusted-brands/bosch.png',     alt: 'Bosch',          width: 120, height: 60 },
    { src: '/trusted-brands/axis.jpg',      alt: 'Axis',           width: 120, height: 60 },
    { src: '/trusted-brands/nitgen.png',    alt: 'Nitgen',         width: 120, height: 60 },
    { src: '/trusted-brands/samsung.avif',  alt: 'Samsung',        width: 120, height: 60 },
    { src: '/trusted-brands/milestone.webp',alt: 'Milestone',      width: 120, height: 60 },
    { src: '/trusted-brands/genetec.png',   alt: 'Genetec',        width: 120, height: 60 },
    { src: '/trusted-brands/aiphone.png',   alt: 'Aiphone',        width: 120, height: 60 },
    { src: '/trusted-brands/cat.webp',      alt: 'CAT',            width: 120, height: 60 },
    { src: '/trusted-brands/edpac.png',     alt: 'EDPAC',          width: 120, height: 60 },
    { src: '/trusted-brands/yuasa.png',     alt: 'Yuasa',          width: 120, height: 60 },
    { src: '/trusted-brands/airedale.png',  alt: 'Airedale',       width: 120, height: 60 },
    { src: '/trusted-brands/apc.png',       alt: 'APC',            width: 120, height: 60 },
    { src: '/trusted-brands/huawei.svg',    alt: 'Huawei',         width: 120, height: 60 },
    { src: '/trusted-brands/vertiv.svg',    alt: 'Vertiv',         width: 120, height: 60 },
  ],
  trustBadge: 'Certified partners and authorized installers of premium enterprise solutions',
};

// ─── Seed Functions ───────────────────────────────────────────────────────────

async function seed() {
  await connect();

  const Hero = mongoose.models.Hero || mongoose.model('Hero', HeroSchema);
  const AboutPage = mongoose.models.AboutPage || mongoose.model('AboutPage', AboutPageSchema);
  const DataCenterHome = mongoose.models.DataCenterHome || mongoose.model('DataCenterHome', DataCenterHomeSchema);
  const DataCenterPage = mongoose.models.DataCenterPage || mongoose.model('DataCenterPage', DataCenterPageSchema);
  const Solution = mongoose.models.Solution || mongoose.model('Solution', SolutionSchema);
  const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
  const CCTVSection = mongoose.models.CCTVSection || mongoose.model('CCTVSection', CCTVSectionSchema);
  const LowCurrentSection = mongoose.models.LowCurrentSection || mongoose.model('LowCurrentSection', LowCurrentSectionSchema);
  const StructuredCablingSection = mongoose.models.StructuredCablingSection || mongoose.model('StructuredCablingSection', StructuredCablingSectionSchema);
  const ClientsSection = mongoose.models.ClientsSection || mongoose.model('ClientsSection', ClientsSectionSchema);
  const TrustedBrandsSection = mongoose.models.TrustedBrandsSection || mongoose.model('TrustedBrandsSection', TrustedBrandsSectionSchema);
  const User = mongoose.models.User || mongoose.model('User', UserSchema);

  console.log('\n📦 Seeding database...\n');

  // Hero
  await Hero.deleteMany({});
  await Hero.create(heroData);
  console.log('✅ Hero seeded');

  // About Page
  await AboutPage.deleteMany({});
  await AboutPage.create(aboutPageData);
  console.log('✅ About Page seeded');

  // Data Center Home
  await DataCenterHome.deleteMany({});
  await DataCenterHome.create(dataCenterHomeData);
  console.log('✅ Data Center Home seeded');

  // Data Center Page
  await DataCenterPage.deleteMany({});
  await DataCenterPage.create(dataCenterPageData);
  console.log('✅ Data Center Page seeded');

  // Solutions
  await Solution.deleteMany({});
  await Solution.insertMany(solutionsData);
  console.log('✅ Solutions seeded (4 solutions)');

  // Projects
  await Project.deleteMany({});
  await Project.insertMany(projectsData);
  console.log('✅ Projects seeded (10 projects)');

  // CCTV Section
  await CCTVSection.deleteMany({});
  await CCTVSection.create(cctvSectionData);
  console.log('✅ CCTV Section seeded');

  // Low Current Section
  await LowCurrentSection.deleteMany({});
  await LowCurrentSection.create(lowCurrentSectionData);
  console.log('✅ Low Current Section seeded');

  // Structured Cabling Section
  await StructuredCablingSection.deleteMany({});
  await StructuredCablingSection.create(structuredCablingSectionData);
  console.log('✅ Structured Cabling Section seeded');

  // Clients Section
  await ClientsSection.deleteMany({});
  await ClientsSection.create(clientsSectionData);
  console.log('✅ Clients Section seeded');

  // Trusted Brands Section
  await TrustedBrandsSection.deleteMany({});
  await TrustedBrandsSection.create(trustedBrandsSectionData);
  console.log('✅ Trusted Brands Section seeded');

  // Admin User
  const existingAdmin = await User.findOne({ email: 'admin@wecaretech.com' });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('WCT@Admin2025!', 10);
    await User.create({
      email: 'admin@wecaretech.com',
      password: hashedPassword,
      name: 'WCT Admin',
      role: 'admin',
      isActive: true,
    });
    console.log('✅ Admin user created');
    console.log('   Email:    admin@wecaretech.com');
    console.log('   Password: WCT@Admin2025!');
  } else {
    console.log('• Admin user already exists, skipping');
  }

  console.log('\n🎉 Database seeded successfully!\n');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
