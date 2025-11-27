import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Enquiry } from '@/lib/models/Enquiry';

export async function GET() {
  try {
    await connectDB();
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const serialized = enquiries.map((enq: any) => ({
      ...enq,
      _id: enq._id.toString(),
    }));
    
    return NextResponse.json(serialized);
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const enquiry = await Enquiry.create(body);
    
    return NextResponse.json({ 
      success: true,
      message: 'Enquiry submitted successfully',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      id: (enquiry as any)._id.toString()
    });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 });
  }
}
