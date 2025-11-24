declare global {
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
        _id?: string;
      }>;
    };
    lowCurrentSection: {
      badge: string;
      title: string;
      description: string;
      securityFlow?: Array<{
        step: number;
        title: string;
        description: string;
      }>;
      solutions?: Array<{
        icon: string;
        title: string;
        description: string;
        features: string[];
      }>;
      additionalSolutions?: Array<{
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
