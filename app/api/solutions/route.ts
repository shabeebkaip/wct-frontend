import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Solution from '@/lib/models/Solution';

// GET all solutions or filter by query
export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const published = searchParams.get('published');

    const query: Record<string, unknown> = {};

    if (slug) {
      query.slug = slug;
      const solution = await Solution.findOne(query).lean();
      if (!solution) {
        return NextResponse.json({ error: 'Solution not found' }, { status: 404 });
      }
      return NextResponse.json(solution);
    }

    if (published === 'true') {
      query.published = true;
    }

    const solutions = await Solution.find(query).sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json(solutions);
  } catch (error) {
    console.error('Error fetching solutions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch solutions' },
      { status: 500 }
    );
  }
}

// POST - Create new solution
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const solution = await Solution.create(body);
    return NextResponse.json(solution, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating solution:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create solution' },
      { status: 500 }
    );
  }
}
