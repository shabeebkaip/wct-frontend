import mongoose from 'mongoose';

const BrochureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true },
    fileSize: { type: Number, required: true }, // in bytes
    uploadedBy: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: 'brochures',
  }
);

export interface IBrochure {
  _id?: string;
  title: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  uploadedBy: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export default mongoose.models.Brochure || mongoose.model<IBrochure>('Brochure', BrochureSchema);
