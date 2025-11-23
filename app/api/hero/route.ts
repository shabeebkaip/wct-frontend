import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Hero from '@/lib/models/Hero';
import { requireAdmin, forbiddenResponse } from '@/lib/api-auth';

// GET - Fetch hero data
export async function GET() {
  try {
    await connectDB();
    
    // Get the first (and should be only) hero document
    let hero = await Hero.findOne();
    
    // If no hero exists, create default one
    if (!hero) {
      hero = await Hero.create({
        title: 'Next-Gen Data Center &',
        subtitle: 'ICT Solutions',
        description: "Pioneering turnkey data center solutions, electro-mechanical systems, and enterprise-grade infrastructure for the Kingdom's digital transformation since 2006.",
        badgeText: 'EST. 2005',
        badgeDescription: '20+ Years of ICT Excellence',
        primaryButtonText: 'Explore Solutions',
        primaryButtonLink: '/solutions/data-center',
        secondaryButtonText: 'View Projects',
        secondaryButtonLink: '/projects',
        backgroundImage: '',
      });
    }

    return NextResponse.json(hero);
  } catch (error) {
    console.error('Error reading hero data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero data' },
      { status: 500 }
    );
  }
}

// POST - Update hero data
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const { authorized } = await requireAdmin();
    if (!authorized) {
      return forbiddenResponse();
    }

    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.subtitle || !data.description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    // Update or create hero document (should only be one)
    const hero = await Hero.findOneAndUpdate(
      {},
      {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        badgeText: data.badgeText,
        badgeDescription: data.badgeDescription,
        primaryButtonText: data.primaryButtonText,
        primaryButtonLink: data.primaryButtonLink,
        secondaryButtonText: data.secondaryButtonText,
        secondaryButtonLink: data.secondaryButtonLink,
        backgroundImage: data.backgroundImage || '',
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    // Trigger revalidation via webhook
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/hero/revalidate`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer admin-token',
        },
      });
    } catch (e) {
      console.log('Revalidation trigger failed:', e);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Hero data updated successfully',
      data: hero,
    });
  } catch (error) {
    console.error('Error saving hero data:', error);
    return NextResponse.json(
      { error: 'Failed to save hero data' },
      { status: 500 }
    );
  }
}
