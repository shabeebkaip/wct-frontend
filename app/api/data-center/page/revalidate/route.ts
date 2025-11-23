import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== 'Bearer admin-token') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    revalidateTag('data-center-page');
    
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
