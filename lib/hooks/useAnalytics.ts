'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { 
  getSessionInfo, 
  setLastPage, 
  trackPageEnter,
  getTimeOnPage,
} from './useSession';

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

  // Track page views automatically with session info
  useEffect(() => {
    // Get time on previous page before tracking new page
    const timeOnPreviousPage = getTimeOnPage();
    
    // Track the page view
    trackEvent({
      eventType: 'page_view',
      page: pathname,
    });

    // Set this page as the last page for next navigation
    setLastPage(pathname);
    
    // Track when user enters this page
    trackPageEnter();

    // Optional: Track exit from previous page if there was one
    // This helps identify exit pages
    return () => {
      // Cleanup runs when component unmounts (user navigates away)
      // You could track exit event here if needed
    };
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
    const sessionInfo = getSessionInfo();

    console.log('Tracking event:', { eventType, page, metadata, sessionInfo });

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
        session: {
          sessionId: sessionInfo.sessionId,
          isNewSession: sessionInfo.isNewSession,
          previousPage: sessionInfo.previousPage,
          timeOnPage: sessionInfo.timeOnPage,
        },
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
