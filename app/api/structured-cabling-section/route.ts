import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { StructuredCablingSection } from '@/lib/models/StructuredCablingSection';
import { requireAdmin, forbiddenResponse } from '@/lib/api-auth';

export async function GET() {
  try {
    await connectDB();
    const data = await StructuredCablingSection.findOne();
    
    if (!data) {
      return NextResponse.json({ error: 'Structured cabling section not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching structured cabling section:', error);
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

    const data = await StructuredCablingSection.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Structured cabling section updated successfully',
      data,
    });
  } catch (error) {
    console.error('Error updating structured cabling section:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}
