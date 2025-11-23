import mongoose, { Schema, Model } from 'mongoose';

export interface IHero {
  title: string;
  subtitle: string;
  description: string;
  badgeText: string;
  badgeDescription: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  backgroundImage: string;
  updatedAt?: Date;
  createdAt?: Date;
}

const HeroSchema = new Schema<IHero>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      required: [true, 'Subtitle is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    badgeText: {
      type: String,
      required: true,
      trim: true,
    },
    badgeDescription: {
      type: String,
      required: true,
      trim: true,
    },
    primaryButtonText: {
      type: String,
      required: true,
      trim: true,
    },
    primaryButtonLink: {
      type: String,
      required: true,
      trim: true,
    },
    secondaryButtonText: {
      type: String,
      required: true,
      trim: true,
    },
    secondaryButtonLink: {
      type: String,
      required: true,
      trim: true,
    },
    backgroundImage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    collection: 'hero_section',
  }
);

const Hero: Model<IHero> = mongoose.models.Hero || mongoose.model<IHero>('Hero', HeroSchema);

export default Hero;
