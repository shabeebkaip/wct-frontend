import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { CCTVSection } from '@/lib/models/CCTVSection';
import { requireAdmin, forbiddenResponse } from '@/lib/api-auth';

export async function GET() {
  try {
    await connectDB();
    const data = await CCTVSection.findOne();
    
    if (!data) {
      return NextResponse.json({ error: 'CCTV section not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching CCTV section:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { authorized } = await requireAdmin();
    if (!authorized) {
      return forbiddenResponse();
    }

    const body = await request.json();
    await connectDB();

    const data = await CCTVSection.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    // Trigger revalidation
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/cctv-section/revalidate`, {
        method: 'POST',
        headers: {
          'Authorization': request.headers.get('Authorization') || '',
        },
      });
    } catch (e) {
      console.log('Revalidation trigger failed:', e);
    }

    return NextResponse.json({
      success: true,
      message: 'CCTV section updated successfully',
      data,
    });
  } catch (error) {
    console.error('Error updating CCTV section:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}
