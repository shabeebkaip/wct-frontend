'use client';

import { useEffect, useState } from 'react';
import UserJourneyVisualizer from '@/components/admin/UserJourneyVisualizer';
import SessionCharts from '@/components/admin/SessionCharts';
import { Route } from 'lucide-react';

interface SessionData {
  success: boolean;
  dateRange: {
    start: string;
    end: string;
    days: number;
  };
  sessionMetrics: {
    totalSessions: number;
    avgSessionDuration: number;
    avgPagesPerSession: number;
    bounceRate: number;
  };
  entryPages: Array<{ _id: string; count: number }>;
  exitPages: Array<{ _id: string; count: number }>;
  pageTransitions: Array<{
    from: string;
    to: string;
    count: number;
  }>;
  sampleSessions: Array<{
    sessionId: string;
    pages: Array<{
      page: string;
      timestamp: string;
      timeOnPage: number;
    }>;
    pageCount: number;
    firstPage: string;
    lastPage: string;
    duration: number;
  }>;
  avgTimeOnPages: Array<{
    _id: string;
    avgTime: number;
    visits: number;
  }>;
}

export default function SessionsPage() {
  const [data, setData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(7);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/analytics/sessions?days=${timeRange}`);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching session data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [timeRange]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Route className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-slate-900">User Sessions & Journeys</h1>
        </div>
            <p className="text-slate-600">
              Understand how users navigate through your website and identify behavior patterns
            </p>
          </div>

          {/* Time Range Selector */}
          <div className="mb-6 flex gap-2">
            {[7, 30, 90].map((days) => (
              <button
                key={days}
                onClick={() => setTimeRange(days)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === days
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                Last {days} Days
              </button>
            ))}
          </div>

          {/* Session Metrics (Text-based) */}
          <UserJourneyVisualizer data={data} loading={loading} />

          {/* Visual Charts for Non-Technical Users */}
          {!loading && data && (
            <div className="mt-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Session Analytics Charts</h2>
                <p className="text-sm text-slate-600">
                  Visual representations of user behavior and engagement metrics
                </p>
              </div>
              <SessionCharts data={data} />
            </div>
          )}

          {/* Sample Sessions */}
          {!loading && data?.sampleSessions && data.sampleSessions.length > 0 && (
            <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Sample User Sessions
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Real examples of user journeys through your website
              </p>
              <div className="space-y-4">
                {data.sampleSessions.slice(0, 5).map((session, idx) => (
                  <div
                    key={session.sessionId || `session-${idx}`}
                    className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs text-slate-500 font-mono">
                          Session ID: {session.sessionId ? session.sessionId.slice(0, 8) + '...' : 'N/A'}
                        </p>
                        <p className="text-sm text-slate-600 mt-1">
                          {session.pageCount || 0} pages • {Math.round((session.duration || 0) / 1000)}s duration
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                      {session.pages?.map((pageVisit, index) => (
                        <div key={index} className="flex items-center gap-2 shrink-0">
                          <div className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium whitespace-nowrap">
                            {pageVisit.page || '/'}
                          </div>
                          {index < session.pages.length - 1 && (
                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
    </div>
  );
}
