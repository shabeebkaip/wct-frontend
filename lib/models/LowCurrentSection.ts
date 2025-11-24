import mongoose from 'mongoose';

interface ILowCurrentSection {
  badge: string;
  title: string;
  description: string;
  securityFlow: Array<{
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
  createdAt?: Date;
  updatedAt?: Date;
}

const LowCurrentSectionSchema = new mongoose.Schema<ILowCurrentSection>(
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

export const LowCurrentSection =
  mongoose.models.LowCurrentSection ||
  mongoose.model<ILowCurrentSection>('LowCurrentSection', LowCurrentSectionSchema);

export type { ILowCurrentSection };
