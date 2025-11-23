import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken, isAdmin } from '@/lib/auth';

export async function requireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return { authorized: false, user: null };
  }

  const payload = verifyToken(token);
  if (!payload) {
    return { authorized: false, user: null };
  }

  return { authorized: true, user: payload };
}

export async function requireAdmin() {
  const { authorized, user } = await requireAuth();
  
  if (!authorized || !isAdmin(user)) {
    return { authorized: false, user: null };
  }

  return { authorized: true, user };
}

export function unauthorizedResponse() {
  return NextResponse.json(
    { error: 'Unauthorized' },
    { status: 401 }
  );
}

export function forbiddenResponse() {
  return NextResponse.json(
    { error: 'Forbidden - Admin access required' },
    { status: 403 }
  );
}
