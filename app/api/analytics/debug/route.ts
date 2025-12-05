import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Debug endpoint to check IP detection and headers
export async function GET(request: NextRequest) {
  const headers: Record<string, string> = {};
  
  // Collect all relevant headers
  request.headers.forEach((value, key) => {
    if (key.includes('ip') || key.includes('forward') || key.includes('client') || key.includes('real')) {
      headers[key] = value;
    }
  });
  
  // Get IP address with multiple fallbacks
  const ipAddress = request.headers.get('x-client-ip') || 
                   request.headers.get('cf-connecting-ip') ||
                   request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                   request.headers.get('x-real-ip') || 
                   'unknown';
  
  // Check if it's a local IP
  const isLocalhost = ipAddress === 'unknown' || 
                     ipAddress.includes('127.0.0.1') || 
                     ipAddress.includes('::1') ||
                     ipAddress.includes('localhost') ||
                     ipAddress.startsWith('192.168.') ||
                     ipAddress.startsWith('10.') ||
                     ipAddress.startsWith('172.');
  
  return NextResponse.json({
    detectedIp: ipAddress,
    isLocalhost,
    headers,
    userAgent: request.headers.get('user-agent'),
    message: isLocalhost 
      ? 'Local IP detected - location tracking will be skipped in production'
      : 'Public IP detected - location tracking should work',
  });
}
