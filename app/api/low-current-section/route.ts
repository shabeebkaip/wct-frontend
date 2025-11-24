import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { LowCurrentSection } from '@/lib/models/LowCurrentSection';
import { requireAdmin, forbiddenResponse } from '@/lib/api-auth';

export async function GET() {
  try {
    await connectDB();
    const data = await LowCurrentSection.findOne();
    
    if (!data) {
      return NextResponse.json({ error: 'Low current section not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching low current section:', error);
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

    const data = await LowCurrentSection.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Low current section updated successfully',
      data,
    });
  } catch (error) {
    console.error('Error updating low current section:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}
