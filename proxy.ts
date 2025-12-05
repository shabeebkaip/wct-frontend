import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes - check adminAuth cookie
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const adminAuth = request.cookies.get('adminAuth')?.value;
    
    if (adminAuth !== 'true') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Get the client's real IP address for analytics tracking
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare
  
  // Determine the actual IP address
  let clientIp = 'unknown';
  
  if (cfConnectingIp) {
    // Cloudflare IP (most reliable if using Cloudflare)
    clientIp = cfConnectingIp;
  } else if (forwardedFor) {
    // X-Forwarded-For can contain multiple IPs, take the first one
    clientIp = forwardedFor.split(',')[0].trim();
  } else if (realIp) {
    clientIp = realIp;
  }
  
  // Create response
  const response = NextResponse.next();
  
  // Add the client IP to the request headers so it's available in API routes
  response.headers.set('x-client-ip', clientIp);
  
  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/analytics/track',
  ],
};
