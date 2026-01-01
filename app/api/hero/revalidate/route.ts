import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdmin, forbiddenResponse } from '@/lib/api-auth';

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const { authorized } = await requireAdmin();
    if (!authorized) {
      return forbiddenResponse();
    }

    // Revalidate the home page where hero section appears
    revalidatePath('/', 'page');

    return NextResponse.json({
      success: true,
      message: 'Hero cache revalidated',
      revalidated: true,
      now: Date.now(),
    });
  } catch (error) {
    console.error('Error revalidating hero:', error);
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    );
  }
}
