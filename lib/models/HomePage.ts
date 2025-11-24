import mongoose from 'mongoose';

// Home Page Schema
interface IHomePage {
  // CCTV Surveillance Section
  cctvSection: {
    badge: string;
    title: string;
    description: string;
    solutions: Array<{
      icon: string;
      title: string;
      description: string;
      color: string;
      features: string[];
    }>;
  };

  // Low Current Solutions Section
  lowCurrentSection: {
    badge: string;
    title: string;
    description: string;
    securityFlow?: Array<{
      step: number;
      title: string;
      description: string;
    }>;
    solutions: Array<{
      icon: string;
      title: string;
      description: string;
      features: string[];
    }>;
    additionalSolutions: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };

  // Structured Cabling Section
  structuredCablingSection: {
    badge: string;
    title: string;
    description: string;
    cablingFlow: Array<{
      label: string;
      active?: boolean;
      highlight?: boolean;
    }>;
    copperCabling: Array<{
      title: string;
      icon: string;
    }>;
    fiberCabling: Array<{
      title: string;
      subtitle: string;
      icon: string;
    }>;
    features: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };

  // Clients Section
  clientsSection: {
    badge: string;
    title: string;
    description: string;
    logos: Array<{
      src: string;
      alt: string;
    }>;
  };

  createdAt?: Date;
  updatedAt?: Date;
}

const HomePageSchema = new mongoose.Schema<IHomePage>(
  {
    cctvSection: {
      badge: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      solutions: [
        {
          icon: { type: String, required: true },
          title: { type: String, required: true },
          description: { type: String, required: true },
          color: { type: String, required: true },
          features: [{ type: String }],
        },
      ],
    },
    lowCurrentSection: {
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
    structuredCablingSection: {
      badge: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      cablingFlow: [
        {
          label: { type: String, required: true },
          active: { type: Boolean, default: false },
          highlight: { type: Boolean, default: false },
        },
      ],
      copperCabling: [
        {
          title: { type: String, required: true },
          icon: { type: String, required: true },
        },
      ],
      fiberCabling: [
        {
          title: { type: String, required: true },
          subtitle: { type: String, required: true },
          icon: { type: String, required: true },
        },
      ],
      features: [
        {
          icon: { type: String, required: true },
          title: { type: String, required: true },
          description: { type: String, required: true },
        },
      ],
    },
    clientsSection: {
      badge: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      logos: [
        {
          src: { type: String, required: true },
          alt: { type: String, required: true },
        },
      ],
    },
  },
  {
    timestamps: true,
    collection: 'home_page',
  }
);

export const HomePage =
  mongoose.models.HomePage || mongoose.model<IHomePage>('HomePage', HomePageSchema);

export type { IHomePage };
