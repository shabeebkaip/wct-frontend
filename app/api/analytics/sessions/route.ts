import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Analytics from '@/lib/models/Analytics';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    // Calculate date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // ==================== SESSION METRICS ====================
    
    // Total sessions
    const totalSessions = await Analytics.distinct('sessionId', {
      timestamp: { $gte: startDate },
      sessionId: { $ne: 'unknown' },
    });

    // Average session duration - FIXED to sort by timestamp first
    const sessionDurations = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate },
          sessionId: { $ne: 'unknown' },
          eventType: 'page_view',
        },
      },
      {
        $sort: { timestamp: 1 }, // Sort by timestamp ascending
      },
      {
        $group: {
          _id: '$sessionId',
          firstPage: { $first: '$timestamp' },
          lastPage: { $last: '$timestamp' },
          pageCount: { $sum: 1 },
        },
      },
      {
        $match: {
          pageCount: { $gte: 2 }, // Only sessions with 2+ pages for realistic duration
        },
      },
      {
        $project: {
          duration: { 
            $subtract: ['$lastPage', '$firstPage'] 
          },
        },
      },
      {
        $match: {
          duration: { $lte: 1800000 } // Max 30 minutes (filter out stale sessions)
        },
      },
      {
        $group: {
          _id: null,
          avgDuration: { $avg: '$duration' },
          totalDuration: { $sum: '$duration' },
          count: { $sum: 1 },
        },
      },
    ]);

    const avgSessionDuration = sessionDurations[0]?.avgDuration || 0;

    // Pages per session
    const pagesPerSession = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate },
          eventType: 'page_view',
          sessionId: { $ne: 'unknown' },
        },
      },
      {
        $group: {
          _id: '$sessionId',
          pageCount: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          avgPages: { $avg: '$pageCount' },
        },
      },
    ]);

    const avgPagesPerSession = pagesPerSession[0]?.avgPages || 0;

    // Bounce rate (sessions with only 1 page view)
    const sessionPageCounts = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate },
          eventType: 'page_view',
          sessionId: { $ne: 'unknown' },
        },
      },
      {
        $group: {
          _id: '$sessionId',
          pageCount: { $sum: 1 },
        },
      },
    ]);

    const singlePageSessions = sessionPageCounts.filter((s) => s.pageCount === 1).length;
    const bounceRate = totalSessions.length > 0 
      ? (singlePageSessions / totalSessions.length) * 100 
      : 0;

    // ==================== ENTRY & EXIT PAGES ====================

    // Top entry pages
    const entryPages = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate },
          isEntryPage: true,
          sessionId: { $ne: 'unknown' },
        },
      },
      {
        $group: {
          _id: '$page',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // Exit pages (last page in each session)
    const exitPages = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate },
          eventType: 'page_view',
          sessionId: { $ne: 'unknown' },
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: '$sessionId',
          lastPage: { $first: '$page' },
        },
      },
      {
        $group: {
          _id: '$lastPage',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // ==================== USER JOURNEY ====================

    // Get common page transitions (page A -> page B)
    const pageTransitions = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate },
          eventType: 'page_view',
          sessionId: { $ne: 'unknown' },
          previousPage: { $ne: null, $exists: true },
        },
      },
      {
        $group: {
          _id: {
            from: '$previousPage',
            to: '$page',
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 20 },
      {
        $project: {
          from: '$_id.from',
          to: '$_id.to',
          count: 1,
          _id: 0,
        },
      },
    ]);

    // ==================== SESSION EXAMPLES ====================

    // Get sample complete sessions for visualization
    const sampleSessions = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate },
          eventType: 'page_view',
          sessionId: { $ne: 'unknown' },
        },
      },
      {
        $sort: { timestamp: 1 },
      },
      {
        $group: {
          _id: '$sessionId',
          pages: {
            $push: {
              page: '$page',
              timestamp: '$timestamp',
              timeOnPage: '$timeOnPage',
            },
          },
          pageCount: { $sum: 1 },
          firstPage: { $first: '$page' },
          lastPage: { $last: '$page' },
          startTime: { $first: '$timestamp' },
          endTime: { $last: '$timestamp' },
        },
      },
      {
        $match: {
          pageCount: { $gte: 2 }, // Only sessions with 2+ pages
        },
      },
      {
        $project: {
          sessionId: '$_id',
          pages: 1,
          pageCount: 1,
          firstPage: 1,
          lastPage: 1,
          duration: { $subtract: ['$endTime', '$startTime'] },
          _id: 0,
        },
      },
      { $sort: { duration: -1 } },
      { $limit: 10 },
    ]);

    // ==================== TIME-BASED METRICS ====================

    // Average time on page by page
    const avgTimeOnPages = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate },
          eventType: 'page_view',
          timeOnPage: { $gt: 0 },
        },
      },
      {
        $group: {
          _id: '$page',
          avgTime: { $avg: '$timeOnPage' },
          visits: { $sum: 1 },
        },
      },
      { $sort: { visits: -1 } },
      { $limit: 10 },
    ]);

    return NextResponse.json({
      success: true,
      dateRange: {
        start: startDate,
        end: new Date(),
        days,
      },
      sessionMetrics: {
        totalSessions: totalSessions.length,
        avgSessionDuration: Math.round(avgSessionDuration / 1000), // Convert to seconds
        avgPagesPerSession: Math.round(avgPagesPerSession * 10) / 10, // 1 decimal
        bounceRate: Math.round(bounceRate * 10) / 10, // 1 decimal
      },
      entryPages,
      exitPages,
      pageTransitions,
      sampleSessions,
      avgTimeOnPages,
    });
  } catch (error: unknown) {
    console.error('Session analytics error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
