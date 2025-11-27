import mongoose from 'mongoose';

interface IEnquiry {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  source: 'contact-page' | 'home-page';
  status: 'new' | 'in-progress' | 'resolved' | 'archived';
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const EnquirySchema = new mongoose.Schema<IEnquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    service: { type: String, required: true },
    message: { type: String, required: true },
    source: { 
      type: String, 
      enum: ['contact-page', 'home-page'], 
      required: true,
      default: 'contact-page'
    },
    status: { 
      type: String, 
      enum: ['new', 'in-progress', 'resolved', 'archived'], 
      default: 'new' 
    },
    notes: { type: String },
  },
  {
    timestamps: true,
    collection: 'enquiries',
  }
);

export const Enquiry =
  mongoose.models.Enquiry ||
  mongoose.model<IEnquiry>('Enquiry', EnquirySchema);

export type { IEnquiry };
