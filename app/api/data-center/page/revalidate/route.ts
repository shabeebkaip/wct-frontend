import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { requireAdmin, forbiddenResponse } from '@/lib/api-auth';

export async function POST(request: NextRequest) {
  try {
    const { authorized } = await requireAdmin();
    if (!authorized) {
      return forbiddenResponse();
    }

    await revalidateTag('data-center-page', 'default');
    
    return NextResponse.json({
      success: true,
      message: 'Data center page cache revalidated',
      revalidated: true,
      now: Date.now(),
    });
  } catch (error) {
    console.error('Error revalidating data center page:', error);
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 });
  }
}
