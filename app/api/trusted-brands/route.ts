import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { TrustedBrandsSection } from '@/lib/models/TrustedBrandsSection';

export async function GET() {
  try {
    await connectDB();
    let section = await TrustedBrandsSection.findOne();

    // Initialize with default data if not exists
    if (!section) {
      section = await TrustedBrandsSection.create({
        title: 'Trusted Brands We Use',
        description: 'We work with industry-leading brands to deliver reliable and high-performance solutions. Our expertise with these trusted products ensures quality installations and support.',
        categories: [
          'Power & UPS Systems',
          'Cooling Solutions',
          'Infrastructure & Racks',
          'Generators & Backup Power'
        ],
        brands: [
          { src: '/datacenter-brands/vertiv.svg', alt: 'Vertiv', width: 120, height: 60 },
          { src: '/datacenter-brands/huawei.jpg', alt: 'Huawei', width: 120, height: 60 },
          { src: '/datacenter-brands/apc.gif', alt: 'APC', width: 120, height: 60 },
          { src: '/datacenter-brands/liebert.jpg', alt: 'Liebert', width: 120, height: 60 },
          { src: '/datacenter-brands/SDMO.avif', alt: 'SDMO', width: 120, height: 60 },
          { src: '/datacenter-brands/airedale.webp', alt: 'Airedale', width: 120, height: 60 },
          { src: '/datacenter-brands/eaton.png', alt: 'Eaton', width: 120, height: 60 },
          { src: '/datacenter-brands/schneider.jpeg', alt: 'Schneider Electric', width: 120, height: 60 },
          { src: '/datacenter-brands/yuasa.png', alt: 'Yuasa', width: 120, height: 60 },
          { src: '/datacenter-brands/edpac.png', alt: 'Edpac', width: 120, height: 60 },
          { src: '/datacenter-brands/cat.png', alt: 'CAT', width: 120, height: 60 }
        ],
        trustBadge: 'Certified partners and authorized installers of premium enterprise solutions'
      });
    }

    return NextResponse.json(section);
  } catch (error) {
    console.error('Error fetching trusted brands section:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trusted brands section' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    let section = await TrustedBrandsSection.findOne();

    if (!section) {
      section = await TrustedBrandsSection.create(body);
    } else {
      section = await TrustedBrandsSection.findOneAndUpdate(
        {},
        body,
        { new: true, runValidators: true }
      );
    }

    return NextResponse.json(section);
  } catch (error) {
    console.error('Error updating trusted brands section:', error);
    return NextResponse.json(
      { error: 'Failed to update trusted brands section' },
      { status: 500 }
    );
  }
}
