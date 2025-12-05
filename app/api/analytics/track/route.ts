import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Analytics from '@/lib/models/Analytics';

export const dynamic = 'force-dynamic';

// Simple in-memory cache for location data
const locationCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Helper to get location from IP with multiple fallbacks
async function getLocationFromIP(ip: string) {
  console.log('Attempting to get location for IP:', ip);
  
  // Check cache first
  const cached = locationCache.get(ip);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('Using cached location for IP:', ip);
    return cached.data;
  }
  
  // Try ipapi.co first (1000 requests/day, no API key needed)
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: {
        'User-Agent': 'WCT-Analytics/1.0'
      },
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });
    
    if (response.ok) {
      const data = await response.json();
      
      // Check if we got an error response (rate limit, etc.)
      if (data.error) {
        console.warn('ipapi.co error:', data.reason || data.error);
      } else if (data.country_name) {
        const location = {
          country: data.country_name,
          countryCode: data.country_code,
          region: data.region,
          city: data.city,
          timezone: data.timezone,
          latitude: data.latitude,
          longitude: data.longitude,
        };
        console.log('Location fetched successfully:', location);
        
        // Cache the result
        locationCache.set(ip, { data: location, timestamp: Date.now() });
        
        return location;
      }
    } else {
      console.warn('ipapi.co returned status:', response.status);
    }
  } catch (error) {
    console.error('ipapi.co fetch error:', error);
  }
  
  // Fallback to ip-api.com (free, 45 requests/minute)
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,region,city,timezone,lat,lon`, {
      signal: AbortSignal.timeout(5000),
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.status === 'success') {
        const location = {
          country: data.country,
          countryCode: data.countryCode,
          region: data.region,
          city: data.city,
          timezone: data.timezone,
          latitude: data.lat,
          longitude: data.lon,
        };
        console.log('Location fetched from fallback:', location);
        
        // Cache the result
        locationCache.set(ip, { data: location, timestamp: Date.now() });
        
        return location;
      }
    }
  } catch (error) {
    console.error('ip-api.com fetch error:', error);
  }
  
  console.warn('Failed to fetch location for IP:', ip);
  
  // Cache null result to avoid repeated failed attempts
  locationCache.set(ip, { data: null, timestamp: Date.now() });
  
  return null;
}

// Helper to parse user agent
function parseUserAgent(ua: string) {
  const device = /mobile/i.test(ua) ? 'mobile' : /tablet/i.test(ua) ? 'tablet' : 'desktop';
  
  let browser = 'Unknown';
  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edge')) browser = 'Edge';
  
  let os = 'Unknown';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iOS')) os = 'iOS';
  
  return { type: device, browser, os };
}

// POST - Track new event
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { eventType, page, metadata, device: clientDevice, session } = body;

    // Extract request info
    const userAgent = request.headers.get('user-agent') || '';
    const referrer = request.headers.get('referer') || '';
    
    // Get IP address with multiple fallbacks
    let ipAddress = request.headers.get('x-client-ip') || // From middleware
                    request.headers.get('cf-connecting-ip') || // Cloudflare
                    request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                    request.headers.get('x-real-ip') || 
                    'unknown';
    
    console.log('Client IP detected:', ipAddress);

    // Get location from IP (skip for localhost/unknown/private IPs)
    let location = null;
    const isLocalhost = ipAddress === 'unknown' || 
                       ipAddress.includes('127.0.0.1') || 
                       ipAddress.includes('::1') ||
                       ipAddress.includes('localhost') ||
                       ipAddress.startsWith('192.168.') ||
                       ipAddress.startsWith('10.') ||
                       ipAddress.startsWith('172.');
    
    if (!isLocalhost) {
      location = await getLocationFromIP(ipAddress);
      
      // Log if location fetch failed
      if (!location) {
        console.warn('Location could not be determined for IP:', ipAddress);
      }
    } else {
      console.log('Skipping location fetch for local/private IP:', ipAddress);
    }

    // Parse device info
    const deviceInfo = parseUserAgent(userAgent);
    const device = {
      deviceType: deviceInfo.type,
      browser: deviceInfo.browser,
      os: deviceInfo.os,
      screenResolution: clientDevice?.screenResolution || 'unknown',
    };

    // Log for debugging
    console.log('Tracking event:', {
      eventType,
      page,
      ipAddress,
      hasLocation: !!location,
      deviceType: device.deviceType,
    });

    // Determine if this is an entry page (first page in session)
    const isEntryPage = session?.isNewSession && eventType === 'page_view';

    // Create analytics entry
    const analyticsEntry = await Analytics.create({
      eventType,
      page,
      referrer,
      userAgent,
      ipAddress,
      sessionId: session?.sessionId || 'unknown',
      isNewSession: session?.isNewSession || false,
      isEntryPage,
      isExitPage: false, // Will be updated later when we detect session end
      previousPage: session?.previousPage || null,
      timeOnPage: session?.timeOnPage || 0,
      location,
      device,
      metadata: metadata || {},
      timestamp: new Date(),
    });

    console.log('Analytics entry created:', analyticsEntry._id, {
      hasLocation: !!location,
      location: location ? `${location.city}, ${location.country}` : 'none'
    });

    return NextResponse.json({ 
      success: true, 
      id: analyticsEntry._id,
      debug: {
        ipDetected: ipAddress,
        locationFetched: !!location,
        isLocalhost,
      }
    });
  } catch (error: unknown) {
    console.error('Analytics tracking error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// GET - Fetch analytics data (for admin dashboard)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const eventType = searchParams.get('eventType');
    const days = parseInt(searchParams.get('days') || '30');

    // Calculate date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Build query
    const query: Record<string, unknown> = { timestamp: { $gte: startDate } };
    if (eventType) query.eventType = eventType;

    // Fetch analytics
    const analytics = await Analytics.find(query)
      .sort({ timestamp: -1 })
      .limit(1000)
      .lean();

    // Aggregate statistics
    const stats = await Analytics.aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      {
        $group: {
          _id: '$eventType',
          count: { $sum: 1 },
        },
      },
    ]);

    // Page views by day
    const pageViewsByDay = await Analytics.aggregate([
      {
        $match: {
          eventType: 'page_view',
          timestamp: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamp' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Top pages
    const topPages = await Analytics.aggregate([
      {
        $match: {
          eventType: 'page_view',
          timestamp: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: '$page',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    return NextResponse.json({
      success: true,
      analytics,
      stats,
      pageViewsByDay,
      topPages,
      totalEvents: analytics.length,
    });
  } catch (error: unknown) {
    console.error('Analytics fetch error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
