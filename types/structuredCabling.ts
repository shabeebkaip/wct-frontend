export interface CablingFlowItem {
  label: string;
  active?: boolean;
  highlight?: boolean;
  _id?: string;
}

export interface CopperCabling {
  title: string;
  icon: string;
  _id?: string;
}

export interface FiberCabling {
  title: string;
  subtitle: string;
  icon: string;
  _id?: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
  _id?: string;
}

export interface StructuredCablingData {
  _id?: string;
  badge: string;
  title: string;
  description: string;
  cablingFlow: CablingFlowItem[];
  copperCabling: CopperCabling[];
  fiberCabling: FiberCabling[];
  features: Feature[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
