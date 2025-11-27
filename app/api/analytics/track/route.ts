import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Analytics from '@/lib/models/Analytics';

export const dynamic = 'force-dynamic';

// Helper to get location from IP
async function getLocationFromIP(ip: string) {
  try {
    // Use free ipapi.co service (no API key needed, 1000 requests/day)
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (response.ok) {
      const data = await response.json();
      return {
        country: data.country_name,
        countryCode: data.country_code,
        region: data.region,
        city: data.city,
        timezone: data.timezone,
        latitude: data.latitude,
        longitude: data.longitude,
      };
    }
  } catch (error) {
    console.error('Geolocation error:', error);
  }
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
    const { eventType, page, metadata, device: clientDevice } = body;

    // Extract request info
    const userAgent = request.headers.get('user-agent') || '';
    const referrer = request.headers.get('referer') || '';
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                      request.headers.get('x-real-ip') || 
                      'unknown';

    // Get location from IP (skip for localhost/unknown IPs)
    let location = null;
    if (ipAddress !== 'unknown' && !ipAddress.includes('127.0.0.1') && !ipAddress.includes('::1')) {
      location = await getLocationFromIP(ipAddress);
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

    // Create analytics entry
    const analyticsEntry = await Analytics.create({
      eventType,
      page,
      referrer,
      userAgent,
      ipAddress,
      location,
      device,
      metadata: metadata || {},
      timestamp: new Date(),
    });

    console.log('Analytics entry created:', analyticsEntry._id);

    return NextResponse.json({ 
      success: true, 
      id: analyticsEntry._id 
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
