import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Brochure from '@/lib/models/Brochure';

export const dynamic = 'force-dynamic';

// GET - Fetch all brochures or active brochure
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';

    if (activeOnly) {
      // Get the most recent active brochure
      const brochure = await Brochure.findOne({ active: true }).sort({ createdAt: -1 });
      return NextResponse.json(brochure);
    }

    // Get all brochures for admin
    const brochures = await Brochure.find().sort({ createdAt: -1 });
    return NextResponse.json(brochures);
  } catch (error) {
    console.error('Error fetching brochures:', error);
    return NextResponse.json(
      { error: 'Failed to fetch brochures' },
      { status: 500 }
    );
  }
}

// POST - Create new brochure
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    console.log('Creating brochure with data:', body);
    const brochure = await Brochure.create(body);
    console.log('Brochure created successfully:', brochure);
    return NextResponse.json(brochure, { status: 201 });
  } catch (error) {
    console.error('Error creating brochure:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create brochure';
    return NextResponse.json(
      { error: errorMessage, details: error },
      { status: 500 }
    );
  }
}

// PUT - Update brochure
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Brochure ID is required' },
        { status: 400 }
      );
    }

    const brochure = await Brochure.findByIdAndUpdate(id, body, { new: true });
    
    if (!brochure) {
      return NextResponse.json(
        { error: 'Brochure not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(brochure);
  } catch (error) {
    console.error('Error updating brochure:', error);
    return NextResponse.json(
      { error: 'Failed to update brochure' },
      { status: 500 }
    );
  }
}

// DELETE - Delete brochure
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Brochure ID is required' },
        { status: 400 }
      );
    }

    const brochure = await Brochure.findByIdAndDelete(id);
    
    if (!brochure) {
      return NextResponse.json(
        { error: 'Brochure not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Brochure deleted successfully' });
  } catch (error) {
    console.error('Error deleting brochure:', error);
    return NextResponse.json(
      { error: 'Failed to delete brochure' },
      { status: 500 }
    );
  }
}
