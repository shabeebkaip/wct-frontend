import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/lib/models/Project';
import { requireAdmin } from '@/lib/api-auth';

// GET all projects or single project by ID
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // If ID is provided, fetch single project
    if (id) {
      const project = await Project.findById(id);
      
      if (!project) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({ project }, { status: 200 });
    }

    // Otherwise, fetch all projects
    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST create new project
export async function POST(request: NextRequest) {
  try {
    const { authorized } = await requireAdmin();
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    
    const project = await Project.create(body);

    // Trigger revalidation
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/projects/revalidate`, {
        method: 'POST',
        headers: {
          'Authorization': request.headers.get('Authorization') || '',
        },
      });
    } catch (e) {
      console.log('Revalidation trigger failed:', e);
    }

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

// PUT update project
export async function PUT(request: NextRequest) {
  try {
    const { authorized } = await requireAdmin();
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, createdAt, updatedAt, __v, ...updateData } = body;

    if (!_id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    console.log('Updating project:', _id);
    console.log('Update data fields:', Object.keys(updateData));

    const project = await Project.findByIdAndUpdate(
      _id, 
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Trigger revalidation
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/projects/revalidate`, {
        method: 'POST',
        headers: {
          'Authorization': request.headers.get('Authorization') || '',
        },
      });
    } catch (e) {
      console.log('Revalidation trigger failed:', e);
    }

    console.log('Project updated successfully');
    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE project
export async function DELETE(request: NextRequest) {
  try {
    const { authorized } = await requireAdmin();
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Trigger revalidation
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/projects/revalidate`, {
        method: 'POST',
        headers: {
          'Authorization': request.headers.get('Authorization') || '',
        },
      });
    } catch (e) {
      console.log('Revalidation trigger failed:', e);
    }

    return NextResponse.json(
      { message: 'Project deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
