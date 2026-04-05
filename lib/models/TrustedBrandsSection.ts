import mongoose from 'mongoose';

interface ITrustedBrandsSection {
  title: string;
  description: string;
  categories: string[];
  brands: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
    format?: string;
    publicId?: string;
  }>;
  trustBadge: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TrustedBrandsSectionSchema = new mongoose.Schema<ITrustedBrandsSection>(
  {
    title: { type: String, required: true, default: 'Trusted Brands We Use' },
    description: { 
      type: String, 
      required: true,
      default: 'We work with industry-leading brands to deliver reliable and high-performance solutions. Our expertise with these trusted products ensures quality installations and support.'
    },
    categories: [{ type: String }],
    brands: [
      {
        src: { type: String, required: true },
        alt: { type: String, required: true },
        width: { type: Number, default: 120 },
        height: { type: Number, default: 60 },
        format: { type: String },
        publicId: { type: String },
      },
    ],
    trustBadge: { 
      type: String, 
      default: 'Certified partners and authorized installers of premium enterprise solutions' 
    },
  },
  {
    timestamps: true,
    collection: 'trusted_brands_section',
  }
);

export const TrustedBrandsSection =
  mongoose.models.TrustedBrandsSection ||
  mongoose.model<ITrustedBrandsSection>('TrustedBrandsSection', TrustedBrandsSectionSchema);

export type { ITrustedBrandsSection };
