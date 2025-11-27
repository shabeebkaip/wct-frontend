'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/hooks/useAnalytics';

interface SolutionTrackerProps {
  solutionTitle: string;
  solutionSlug: string;
  category: string;
}

export default function SolutionTracker({ solutionTitle, solutionSlug, category }: SolutionTrackerProps) {
  useEffect(() => {
    trackEvent({
      eventType: 'solution_view',
      page: `/solutions/${solutionSlug}`,
      metadata: {
        solutionTitle,
        category,
      },
    });
  }, [solutionTitle, solutionSlug, category]);

  return null;
}
