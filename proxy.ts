import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes - check JWT cookie instead of old adminAuth
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const authToken = request.cookies.get('auth_token')?.value;
    
    if (!authToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // API routes are now protected by requireAuth/requireAdmin helpers
  // No need to check authorization header here anymore

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
