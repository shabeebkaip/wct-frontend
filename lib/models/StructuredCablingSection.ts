import mongoose from 'mongoose';

interface IStructuredCablingSection {
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
  createdAt?: Date;
  updatedAt?: Date;
}

const StructuredCablingSectionSchema = new mongoose.Schema<IStructuredCablingSection>(
  {
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
  {
    timestamps: true,
    collection: 'structured_cabling_section',
  }
);

export const StructuredCablingSection =
  mongoose.models.StructuredCablingSection ||
  mongoose.model<IStructuredCablingSection>(
    'StructuredCablingSection',
    StructuredCablingSectionSchema
  );

export type { IStructuredCablingSection };
