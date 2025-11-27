'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type EventType = 'page_view' | 'contact_form' | 'brochure_download' | 'project_view' | 'solution_view' | 'navigation_click' | 'footer_click';

interface TrackEventOptions {
  eventType: EventType;
  page?: string;
  metadata?: Record<string, unknown>;
}

// Helper to get device info
function getDeviceInfo() {
  if (typeof window === 'undefined') return null;
  
  return {
    screenResolution: `${window.screen.width}x${window.screen.height}`,
  };
}

export function useAnalytics() {
  const pathname = usePathname();

  // Track page views automatically
  useEffect(() => {
    trackEvent({
      eventType: 'page_view',
      page: pathname,
    });
  }, [pathname]);

  return { trackEvent };
}

// Standalone function to track events
export async function trackEvent({ eventType, page, metadata }: TrackEventOptions) {
  try {
    // Don't track admin pages
    if (page?.startsWith('/admin')) {
      console.log('Skipping tracking for admin page:', page);
      return;
    }

    const device = getDeviceInfo();

    console.log('Tracking event:', { eventType, page, metadata });

    const response = await fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType,
        page: page || window.location.pathname,
        metadata,
        device,
      }),
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('Event tracked successfully:', eventType, result.id);
    } else {
      console.error('Failed to track event:', result.error);
    }
  } catch (error) {
    // Fail silently - don't block user experience
    console.error('Analytics tracking failed:', error);
  }
}
