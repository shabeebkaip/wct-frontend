import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdmin, forbiddenResponse } from '@/lib/api-auth';

export async function POST() {
  try {
    const { authorized } = await requireAdmin();
    if (!authorized) {
      return forbiddenResponse();
    }

    revalidatePath('/');
    revalidatePath('/solutions/cctv');

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 });
  }
}
