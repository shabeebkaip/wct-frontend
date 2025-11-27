import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Project';
import { Enquiry } from '@/lib/models/Enquiry';

export async function GET() {
  try {
    await connectDB();

    // Get current date info for time-based calculations
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - 7);

    // Projects Analytics
    const totalProjects = await Project.countDocuments();
    const projectsThisMonth = await Project.countDocuments({
      createdAt: { $gte: startOfMonth }
    });
    const projectsByCategory = await Project.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    // Enquiries Analytics
    const totalEnquiries = await Enquiry.countDocuments();
    const newEnquiries = await Enquiry.countDocuments({ status: 'new' });
    const inProgressEnquiries = await Enquiry.countDocuments({ status: 'in-progress' });
    const resolvedEnquiries = await Enquiry.countDocuments({ status: 'resolved' });
    const archivedEnquiries = await Enquiry.countDocuments({ status: 'archived' });
    
    const enquiriesThisMonth = await Enquiry.countDocuments({
      createdAt: { $gte: startOfMonth }
    });
    const enquiriesThisWeek = await Enquiry.countDocuments({
      createdAt: { $gte: startOfWeek }
    });

    // Enquiries by source
    const enquiriesBySource = await Enquiry.aggregate([
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 }
        }
      }
    ]);

    // Enquiries by service
    const enquiriesByService = await Enquiry.aggregate([
      {
        $group: {
          _id: '$service',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      }
    ]);

    // Recent enquiries
    const recentEnquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email service status createdAt source');

    // Recent projects
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title category client createdAt');

    // Response rate calculation (resolved / total)
    const responseRate = totalEnquiries > 0 
      ? Math.round((resolvedEnquiries / totalEnquiries) * 100) 
      : 0;

    return NextResponse.json({
      projects: {
        total: totalProjects,
        thisMonth: projectsThisMonth,
        byCategory: projectsByCategory,
        recent: recentProjects
      },
      enquiries: {
        total: totalEnquiries,
        new: newEnquiries,
        inProgress: inProgressEnquiries,
        resolved: resolvedEnquiries,
        archived: archivedEnquiries,
        thisMonth: enquiriesThisMonth,
        thisWeek: enquiriesThisWeek,
        bySource: enquiriesBySource,
        byService: enquiriesByService,
        recent: recentEnquiries,
        responseRate
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
