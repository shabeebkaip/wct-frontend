import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Solution from '@/lib/models/Solution';

// Get single solution
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();
    const solution = await Solution.findById(id).lean();

    if (!solution) {
      return NextResponse.json({ error: 'Solution not found' }, { status: 404 });
    }

    return NextResponse.json(solution);
  } catch (error) {
    console.error('Error fetching solution:', error);
    return NextResponse.json(
      { error: 'Failed to fetch solution' },
      { status: 500 }
    );
  }
}

// PUT - Update solution
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();
    const body = await request.json();

    const solution = await Solution.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    ).lean();

    if (!solution) {
      return NextResponse.json({ error: 'Solution not found' }, { status: 404 });
    }

    return NextResponse.json(solution);
  } catch (error: unknown) {
    console.error('Error updating solution:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update solution' },
      { status: 500 }
    );
  }
}

// DELETE solution
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();
    const solution = await Solution.findByIdAndDelete(id);

    if (!solution) {
      return NextResponse.json({ error: 'Solution not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Solution deleted successfully' });
  } catch (error) {
    console.error('Error deleting solution:', error);
    return NextResponse.json(
      { error: 'Failed to delete solution' },
      { status: 500 }
    );
  }
}
