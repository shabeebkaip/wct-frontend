export interface SecurityFlowStep {
  step: number;
  title: string;
  description: string;
  _id?: string;
}

export interface Solution {
  icon: string;
  title: string;
  description: string;
  features: string[];
  _id?: string;
}

export interface AdditionalSolution {
  icon: string;
  title: string;
  description: string;
  _id?: string;
}

export interface LowCurrentData {
  _id?: string;
  badge: string;
  title: string;
  description: string;
  securityFlow: SecurityFlowStep[];
  solutions: Solution[];
  additionalSolutions: AdditionalSolution[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
