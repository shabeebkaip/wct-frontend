export interface HeroSection {
  badge: string;
  title: string;
  description: string;
}

export interface CompanyStorySection {
  badge: string;
  title: string;
  paragraphs: string[];
  image: string;
}

export interface MissionVisionItem {
  icon: string;
  title: string;
  description: string;
}

export interface CoreValue {
  icon: string;
  title: string;
  description: string;
  _id?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string | null;
  description: string;
  isLeadership: boolean;
  order: number;
  _id?: string;
}

export interface CTASection {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    link: string;
  };
  secondaryButton: {
    text: string;
    link: string;
  };
}

export interface AboutPageData {
  _id?: string;
  hero: HeroSection;
  companyStory: CompanyStorySection;
  mission: MissionVisionItem;
  vision: MissionVisionItem;
  coreValues: CoreValue[];
  teamMembers: TeamMember[];
  cta: CTASection;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
