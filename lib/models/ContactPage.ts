import mongoose from 'mongoose';

interface IContactInfo {
  icon: string;
  title: string;
  details: string[];
  link?: string;
  description?: string;
}

interface IReason {
  icon: string;
  title: string;
  description: string;
}

interface IContactPage {
  badge: string;
  title: string;
  description: string;
  contactInfo: IContactInfo[];
  reasons?: IReason[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const ContactPageSchema = new mongoose.Schema<IContactPage>(
  {
    badge: { type: String, required: true, default: 'GET IN TOUCH' },
    title: { type: String, required: true, default: 'Contact Us' },
    description: { type: String, required: true },
    contactInfo: [
      {
        icon: { type: String, required: true },
        title: { type: String, required: true },
        details: [{ type: String, required: true }],
        link: { type: String },
        description: { type: String },
      },
    ],
    reasons: [
      {
        icon: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    socialLinks: {
      linkedin: { type: String },
      twitter: { type: String },
      facebook: { type: String },
      instagram: { type: String },
    },
  },
  {
    timestamps: true,
    collection: 'contact_page',
  }
);

export const ContactPage =
  mongoose.models.ContactPage ||
  mongoose.model<IContactPage>('ContactPage', ContactPageSchema);

export type { IContactPage, IContactInfo, IReason };
