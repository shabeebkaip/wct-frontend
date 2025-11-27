import mongoose from 'mongoose';

// Service Item Schema
const ServiceItemSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String }],
});

// Brand Schema
const BrandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  specialization: { type: String },
});

// Solution Type Schema
const SolutionTypeSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  applications: [{ type: String }],
});

// Feature Schema
const FeatureSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

// Process Step Schema
const ProcessStepSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

// Benefit Schema
const BenefitSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

// Stats Schema
const StatsSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  icon: { type: String, required: true },
});

// Project Reference Schema
const ProjectReferenceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  client: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String },
});

// Main Solution Schema
const SolutionSchema = new mongoose.Schema(
  {
    // Basic Info
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },

    // Hero Section
    hero: {
      title: { type: String, required: true },
      subtitle: { type: String, required: true },
      description: { type: String, required: true },
      backgroundImage: { type: String },
      features: [{ type: String }],
    },

    // Overview
    overview: {
      title: { type: String },
      description: { type: String },
      image: { type: String },
    },

    // Services/Offerings
    services: [ServiceItemSchema],

    // Partner Brands
    brands: [BrandSchema],

    // Solution Types/Industry Solutions
    solutionTypes: [SolutionTypeSchema],

    // Key Features
    features: [FeatureSchema],

    // Process/Implementation Steps
    process: {
      title: { type: String },
      steps: [ProcessStepSchema],
    },

    // Benefits
    benefits: {
      title: { type: String },
      items: [BenefitSchema],
    },

    // Statistics
    stats: [StatsSchema],

    // Related Projects
    projects: [ProjectReferenceSchema],

    // Call to Action
    cta: {
      title: { type: String },
      description: { type: String },
      buttonText: { type: String },
      buttonLink: { type: String },
    },

    // SEO
    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      keywords: [{ type: String }],
    },
  },
  {
    timestamps: true,
    collection: 'solutions',
  }
);

// Create index on slug for faster queries
SolutionSchema.index({ slug: 1 });

export interface ISolution {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  order: number;
  hero: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage?: string;
    features: string[];
  };
  overview?: {
    title?: string;
    description?: string;
    image?: string;
  };
  services: Array<{
    icon: string;
    title: string;
    description: string;
    features: string[];
  }>;
  brands: Array<{
    name: string;
    logo: string;
    specialization?: string;
  }>;
  solutionTypes: Array<{
    icon: string;
    title: string;
    description: string;
    applications: string[];
  }>;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  process: {
    title?: string;
    steps: Array<{
      number: number;
      icon: string;
      title: string;
      description: string;
    }>;
  };
  benefits: {
    title?: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  stats: Array<{
    value: string;
    label: string;
    icon: string;
  }>;
  cta: {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export default mongoose.models.Solution || mongoose.model<ISolution>('Solution', SolutionSchema);
