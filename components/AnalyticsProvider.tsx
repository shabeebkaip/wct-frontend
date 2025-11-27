'use client';

import { useAnalytics } from '@/lib/hooks/useAnalytics';

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useAnalytics();
  return <>{children}</>;
}
