// Data Center Home Types
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

  // Home Page Types
  interface HomePageData {
    cctvSection: {
      badge: string;
      title: string;
      description: string;
      solutions: Array<{
        icon: string;
        title: string;
        description: string;
        color: string;
        features: string[];
      }>;
    };
    lowCurrentSection: {
      badge: string;
      title: string;
      description: string;
      solutions: Array<{
        icon: string;
        title: string;
        description: string;
        features: string[];
      }>;
      additionalSolutions: Array<{
        icon: string;
        title: string;
        description: string;
      }>;
    };
    structuredCablingSection: {
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
    };
    clientsSection: {
      badge: string;
      title: string;
      description: string;
      logos: Array<{
        src: string;
        alt: string;
      }>;
    };
  }
}

export {};
