import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { AboutPage } from '@/lib/models/AboutPage';
import { requireAdmin, forbiddenResponse } from '@/lib/api-auth';

export async function GET() {
  try {
    await connectDB();
    const data = await AboutPage.findOne();
    
    if (!data) {
      return NextResponse.json({ error: 'About page data not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching about page:', error);
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

    const data = await AboutPage.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    return NextResponse.json({
      success: true,
      message: 'About page updated successfully',
      data,
    });
  } catch (error) {
    console.error('Error updating about page:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}
