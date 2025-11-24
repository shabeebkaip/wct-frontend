import mongoose from 'mongoose';

interface IClientsSection {
  badge: string;
  title: string;
  description: string;
  logos: Array<{
    src: string;
    alt: string;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}

const ClientsSectionSchema = new mongoose.Schema<IClientsSection>(
  {
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
  {
    timestamps: true,
    collection: 'clients_section',
  }
);

export const ClientsSection =
  mongoose.models.ClientsSection ||
  mongoose.model<IClientsSection>('ClientsSection', ClientsSectionSchema);

export type { IClientsSection };
