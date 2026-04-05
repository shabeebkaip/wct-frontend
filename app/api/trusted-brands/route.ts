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
          { src: '/trusted-brands/rm.png',        alt: 'R&M',       width: 120, height: 60 },
          { src: '/trusted-brands/panduit.webp',  alt: 'Panduit',   width: 120, height: 60 },
          { src: '/trusted-brands/corning.webp',  alt: 'Corning',   width: 120, height: 60 },
          { src: '/trusted-brands/legrand.jpg',   alt: 'Legrand',   width: 120, height: 60 },
          { src: '/trusted-brands/commscope.png', alt: 'CommScope', width: 120, height: 60 },
          { src: '/trusted-brands/3m.jpg',        alt: '3M',        width: 120, height: 60 },
          { src: '/trusted-brands/leviton.jpg',   alt: 'Leviton',   width: 120, height: 60 },
          { src: '/trusted-brands/datwyler.jpg',  alt: 'Datwyler',  width: 120, height: 60 },
          { src: '/trusted-brands/bosch.png',     alt: 'Bosch',     width: 120, height: 60 },
          { src: '/trusted-brands/axis.jpg',      alt: 'Axis',      width: 120, height: 60 },
          { src: '/trusted-brands/nitgen.png',    alt: 'Nitgen',    width: 120, height: 60 },
          { src: '/trusted-brands/samsung.avif',  alt: 'Samsung',   width: 120, height: 60 },
          { src: '/trusted-brands/milestone.webp',alt: 'Milestone', width: 120, height: 60 },
          { src: '/trusted-brands/genetec.png',   alt: 'Genetec',   width: 120, height: 60 },
          { src: '/trusted-brands/aiphone.png',   alt: 'Aiphone',   width: 120, height: 60 },
          { src: '/trusted-brands/cat.webp',      alt: 'CAT',       width: 120, height: 60 },
          { src: '/trusted-brands/edpac.png',     alt: 'EDPAC',     width: 120, height: 60 },
          { src: '/trusted-brands/yuasa.png',     alt: 'Yuasa',     width: 120, height: 60 },
          { src: '/trusted-brands/airedale.png',  alt: 'Airedale',  width: 120, height: 60 },
          { src: '/trusted-brands/apc.png',       alt: 'APC',       width: 120, height: 60 },
          { src: '/trusted-brands/huawei.svg',    alt: 'Huawei',    width: 120, height: 60 },
          { src: '/trusted-brands/vertiv.svg',    alt: 'Vertiv',    width: 120, height: 60 },
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

    // Trigger revalidation
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/trusted-brands/revalidate`, {
        method: 'POST',
        headers: {
          'Authorization': request.headers.get('Authorization') || '',
        },
      });
    } catch (e) {
      console.log('Revalidation trigger failed:', e);
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
