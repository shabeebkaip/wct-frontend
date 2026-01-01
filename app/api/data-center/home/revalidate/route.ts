import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdmin, forbiddenResponse } from '@/lib/api-auth';

export async function POST(request: NextRequest) {
  try {
    const { authorized } = await requireAdmin();
    if (!authorized) {
      return forbiddenResponse();
    }

    revalidatePath('/', 'page');
    
    return NextResponse.json({
      success: true,
      message: 'Data center home cache revalidated',
      revalidated: true,
      now: Date.now(),
    });
  } catch (error) {
    console.error('Error revalidating data center home:', error);
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 });
  }
}
