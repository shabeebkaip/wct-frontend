import mongoose from 'mongoose';

interface ICCTVSection {
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
  createdAt?: Date;
  updatedAt?: Date;
}

const CCTVSectionSchema = new mongoose.Schema<ICCTVSection>(
  {
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
  {
    timestamps: true,
    collection: 'cctv_section',
  }
);

export const CCTVSection =
  mongoose.models.CCTVSection || mongoose.model<ICCTVSection>('CCTVSection', CCTVSectionSchema);

export type { ICCTVSection };
