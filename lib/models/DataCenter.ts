import mongoose, { Schema, Model } from 'mongoose';

// Data Center Home Section Schema
export interface IDataCenterHome {
  sectionHeader: {
    badge: string;
    title: string;
    description: string;
  };
  solutions: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  features: string[];
  images: Array<{
    src: string;
    alt: string;
    title: string;
    description: string;
    format?: string;
    publicId?: string;
  }>;
  cta: {
    title: string;
    description: string;
    primaryButton: {
      text: string;
      link: string;
    };
    secondaryButton: {
      text: string;
      link: string;
    };
  };
  updatedAt?: Date;
  createdAt?: Date;
}

const DataCenterHomeSchema = new Schema<IDataCenterHome>(
  {
    sectionHeader: {
      badge: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
    solutions: [
      {
        icon: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    features: [{ type: String, required: true }],
    images: [
      {
        src: { type: String, required: true },
        alt: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        format: { type: String },
        publicId: { type: String },
      },
    ],
    cta: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      primaryButton: {
        text: { type: String, required: true },
        link: { type: String, required: true },
      },
      secondaryButton: {
        text: { type: String, required: true },
        link: { type: String, required: true },
      },
    },
  },
  {
    timestamps: true,
    collection: 'data_center_home',
  }
);

// Data Center Page Schema
export interface IDataCenterPage {
  hero: {
    badge: string;
    title: string;
    description: string;
    features: string[];
    image: string;
    primaryButton: {
      text: string;
      link: string;
    };
    secondaryButton: {
      text: string;
      link: string;
    };
  };
  services: Array<{
    icon: string;
    title: string;
    description: string;
    features: string[];
  }>;
  process: Array<{
    step: string;
    title: string;
    description: string;
    icon: string;
  }>;
  benefits: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  brands: Array<{
    name: string;
    logo: string;
    specialization: string;
  }>;
  projects: Array<{
    name: string;
    client: string;
    location: string;
    image: string;
  }>;
  cta: {
    title: string;
    description: string;
    primaryButton: {
      text: string;
      link: string;
    };
    secondaryButton: {
      text: string;
      link: string;
    };
  };
  updatedAt?: Date;
  createdAt?: Date;
}

const DataCenterPageSchema = new Schema<IDataCenterPage>(
  {
    hero: {
      badge: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      features: [{ type: String, required: true }],
      image: { type: String, required: true },
      primaryButton: {
        text: { type: String, required: true },
        link: { type: String, required: true },
      },
      secondaryButton: {
        text: { type: String, required: true },
        link: { type: String, required: true },
      },
    },
    services: [
      {
        icon: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        features: [{ type: String, required: true }],
      },
    ],
    process: [
      {
        step: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, required: true },
      },
    ],
    benefits: [
      {
        icon: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    brands: [
      {
        name: { type: String, required: true },
        logo: { type: String, required: true },
        specialization: { type: String, required: true },
      },
    ],
    projects: [
      {
        name: { type: String, required: true },
        client: { type: String, required: true },
        location: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
    cta: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      primaryButton: {
        text: { type: String, required: true },
        link: { type: String, required: true },
      },
      secondaryButton: {
        text: { type: String, required: true },
        link: { type: String, required: true },
      },
    },
  },
  {
    timestamps: true,
    collection: 'data_center_page',
  }
);

export const DataCenterHome: Model<IDataCenterHome> =
  mongoose.models.DataCenterHome || mongoose.model<IDataCenterHome>('DataCenterHome', DataCenterHomeSchema);

export const DataCenterPage: Model<IDataCenterPage> =
  mongoose.models.DataCenterPage || mongoose.model<IDataCenterPage>('DataCenterPage', DataCenterPageSchema);
