import mongoose from 'mongoose';

// Hero Section Schema
const HeroSectionSchema = new mongoose.Schema({
  badge: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

// Company Story Section Schema
const CompanyStorySectionSchema = new mongoose.Schema({
  badge: { type: String, required: true },
  title: { type: String, required: true },
  paragraphs: [{ type: String, required: true }],
  image: { type: String, default: '/logo.png' },
});

// Mission Vision Item Schema
const MissionVisionItemSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

// Core Value Schema
const CoreValueSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

// Team Member Schema
const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, default: null },
  description: { type: String, required: true },
  isLeadership: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
});

// CTA Section Schema
const CTASectionSchema = new mongoose.Schema({
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
});

// Main About Page Schema
interface IAboutPage {
  hero: typeof HeroSectionSchema;
  companyStory: typeof CompanyStorySectionSchema;
  mission: typeof MissionVisionItemSchema;
  vision: typeof MissionVisionItemSchema;
  coreValues: typeof CoreValueSchema[];
  teamMembers: typeof TeamMemberSchema[];
  cta: typeof CTASectionSchema;
  createdAt?: Date;
  updatedAt?: Date;
}

const AboutPageSchema = new mongoose.Schema<IAboutPage>(
  {
    hero: HeroSectionSchema,
    companyStory: CompanyStorySectionSchema,
    mission: MissionVisionItemSchema,
    vision: MissionVisionItemSchema,
    coreValues: [CoreValueSchema],
    teamMembers: [TeamMemberSchema],
    cta: CTASectionSchema,
  },
  {
    timestamps: true,
    collection: 'about_page',
  }
);

export const AboutPage =
  mongoose.models.AboutPage || mongoose.model<IAboutPage>('AboutPage', AboutPageSchema);

export type { IAboutPage };
