declare global {
  interface SolutionItem {
    icon: string;
    title: string;
    description: string;
  }

  interface ImageItem {
    src: string;
    alt: string;
    title: string;
    description: string;
    format?: string;
    publicId?: string;
  }

  interface DataCenterHomeData {
    sectionHeader: {
      badge: string;
      title: string;
      description: string;
    };
    solutions: SolutionItem[];
    features: string[];
    images: ImageItem[];
    cta: {
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
    };
  }
}

export {};
