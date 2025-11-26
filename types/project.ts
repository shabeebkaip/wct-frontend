export interface Project {
  _id?: string;
  title: string;
  category: 'data-center' | 'ict' | 'security';
  client: string;
  location: string;
  year: string;
  duration?: string;
  projectValue?: string;
  description: string;
  overview?: string;
  images: string[];
  industry?: string;
  status?: 'completed' | 'in-progress' | 'planned';
  services?: string[];
  technologies?: string[];
  tags: string[];
  scope: string[];
  challenge?: string;
  solution?: string;
  results?: string[];
  keyFeatures?: string[];
  specifications?: {
    [key: string]: any;
  };
  teamSize?: string;
  complexity?: 'basic' | 'medium' | 'complex' | 'enterprise';
  certifications?: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  featured: boolean;
  order: number;
  relatedProjects?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectsData {
  projects: Project[];
}
