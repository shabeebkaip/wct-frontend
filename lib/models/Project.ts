import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['data-center', 'structured-cabling', 'low-current-solutions', 'low-voltage', 'control-rooms'],
    },
    client: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    // Project Duration
    duration: {
      type: String,
      default: '',
    },
    // Project Value/Budget
    projectValue: {
      type: String,
      default: '',
    },
    // Short description for listings
    description: {
      type: String,
      required: true,
    },
    // Detailed overview
    overview: {
      type: String,
      default: '',
    },
    // Images
    images: {
      type: [String],
      default: [],
    },
    // Client industry/sector
    industry: {
      type: String,
      default: '',
    },
    // Project status
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'planned'],
      default: 'completed',
    },
    // Services provided (from our service categories)
    services: {
      type: [String],
      default: [],
      // Examples: Data Center Setup, CCTV Installation, Network Infrastructure, etc.
    },
    // Technologies/Products used
    technologies: {
      type: [String],
      default: [],
      // Examples: Cisco, HP, Dell, Hikvision, etc.
    },
    // Tags for filtering
    tags: {
      type: [String],
      default: [],
    },
    // Project scope items
    scope: {
      type: [String],
      default: [],
    },
    // Challenge faced
    challenge: {
      type: String,
      default: '',
    },
    // Solution provided
    solution: {
      type: String,
      default: '',
    },
    // Results/Outcomes achieved
    results: {
      type: [String],
      default: [],
    },
    // Key features/highlights
    keyFeatures: {
      type: [String],
      default: [],
    },
    // Technical specifications
    specifications: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
      // Can store category-specific specs:
      // For Data Center: { rackUnits: '42U', coolingCapacity: '50kW', powerRedundancy: 'N+1' }
      // For CCTV: { cameras: '24', resolution: '4K', storage: '30 days', analytics: true }
      // For Network: { switches: '10', routers: '5', accessPoints: '50', bandwidth: '10Gbps' }
    },
    // Team size involved
    teamSize: {
      type: String,
      default: '',
    },
    // Project complexity
    complexity: {
      type: String,
      enum: ['basic', 'medium', 'complex', 'enterprise'],
      default: 'medium',
    },
    // Certifications/Standards met
    certifications: {
      type: [String],
      default: [],
      // Examples: ISO 27001, TIA-942, BICSI, etc.
    },
    // Client testimonial
    testimonial: {
      type: {
        quote: {
          type: String,
          default: '',
        },
        author: {
          type: String,
          default: '',
        },
        position: {
          type: String,
          default: '',
        },
      },
      default: () => ({}),
    },
    // Featured project flag
    featured: {
      type: Boolean,
      default: false,
    },
    // Display order
    order: {
      type: Number,
      default: 0,
    },
    // Related projects
    relatedProjects: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
