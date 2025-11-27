import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { ContactPage } from '@/lib/models/ContactPage';

export async function GET() {
  try {
    await connectDB();
    const data = await ContactPage.findOne().lean();
    
    if (!data) {
      // Return default data if none exists
      return NextResponse.json({
        badge: 'GET IN TOUCH',
        title: 'Contact Us',
        description: "Have a project in mind? Let's discuss how we can help you build world-class infrastructure solutions.",
        contactInfo: [
          {
            icon: 'Phone',
            title: 'Phone',
            details: ['+966 11 206 3919'],
            link: 'tel:+966112063919',
            description: 'Available all time',
          },
          {
            icon: 'Mail',
            title: 'Email',
            details: ['wct@wecaretech.com'],
            link: 'mailto:wct@wecaretech.com',
          },
          {
            icon: 'MapPin',
            title: 'Office',
            details: ['4310 Jarir, 7476', 'Riyadh 12837, Saudi Arabia'],
            link: 'https://maps.google.com',
            description: 'Visit us at our headquarters',
          },
          {
            icon: 'Clock',
            title: 'Business Hours',
            details: [
              'Monday - Thursday: 8:00 AM - 5:00 PM',
              'Friday: 8:00 AM - 12:00 PM',
            ],
            description: 'Weekend: Saturday & Sunday closed',
          },
        ],
        socialLinks: {},
      });
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const serializedData = { ...data, _id: (data as any)._id.toString() };
    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error fetching contact page data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const data = await ContactPage.findOneAndUpdate(
      {},
      body,
      { new: true, upsert: true }
    );
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating contact page data:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}
