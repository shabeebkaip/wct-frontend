'use client';

import { Users, Clock, FileText, TrendingDown, ArrowRight } from 'lucide-react';

interface SessionMetrics {
  totalSessions: number;
  avgSessionDuration: number;
  avgPagesPerSession: number;
  bounceRate: number;
}

interface PageTransition {
  from: string;
  to: string;
  count: number;
}

interface SessionData {
  sessionMetrics: SessionMetrics;
  entryPages: Array<{ _id: string; count: number }>;
  exitPages: Array<{ _id: string; count: number }>;
  pageTransitions: PageTransition[];
  avgTimeOnPages: Array<{ _id: string; avgTime: number; visits: number }>;
}

interface UserJourneyVisualizerProps {
  data: SessionData | null;
  loading?: boolean;
}

export default function UserJourneyVisualizer({ data, loading }: UserJourneyVisualizerProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12 text-slate-500">
        No session data available
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const formatTime = (ms: number) => {
    const seconds = Math.round(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
  };

  return (
    <div className="space-y-6">
      {/* Session Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-500 rounded-xl shadow-md">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm font-medium text-blue-900">Total Sessions</p>
          </div>
          <p className="text-4xl font-bold text-blue-900 mb-2">
            {data.sessionMetrics.totalSessions.toLocaleString()}
          </p>
          <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full animate-pulse" style={{ width: '100%' }} />
          </div>
        </div>

        <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-lg border border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-green-500 rounded-xl shadow-md">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm font-medium text-green-900">Avg. Duration</p>
          </div>
          <p className="text-4xl font-bold text-green-900 mb-2">
            {formatDuration(data.sessionMetrics.avgSessionDuration)}
          </p>
          <div className="h-2 bg-green-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-600 rounded-full transition-all duration-1000" 
              style={{ width: `${Math.min((data.sessionMetrics.avgSessionDuration / 300) * 100, 100)}%` }} 
            />
          </div>
        </div>

        <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-lg border border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-purple-500 rounded-xl shadow-md">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm font-medium text-purple-900">Pages/Session</p>
          </div>
          <p className="text-4xl font-bold text-purple-900 mb-2">
            {data.sessionMetrics.avgPagesPerSession.toFixed(1)}
          </p>
          <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-600 rounded-full transition-all duration-1000" 
              style={{ width: `${Math.min((data.sessionMetrics.avgPagesPerSession / 10) * 100, 100)}%` }} 
            />
          </div>
        </div>

        <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-xl p-6 shadow-lg border border-orange-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-orange-500 rounded-xl shadow-md">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm font-medium text-orange-900">Bounce Rate</p>
          </div>
          <p className="text-4xl font-bold text-orange-900 mb-2">
            {data.sessionMetrics.bounceRate.toFixed(1)}%
          </p>
          <div className="h-2 bg-orange-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-600 rounded-full transition-all duration-1000" 
              style={{ width: `${data.sessionMetrics.bounceRate}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Entry & Exit Pages with Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entry Pages - Bar Chart Style */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">🚪 Entry Points</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4">Where visitors first land on your site</p>
          <div className="space-y-4">
            {data.entryPages.slice(0, 5).map((page, index) => {
              const maxCount = data.entryPages[0]?.count || 1;
              const percentage = (page.count / maxCount) * 100;
              const colors = ['bg-blue-500', 'bg-blue-400', 'bg-blue-300', 'bg-blue-200', 'bg-blue-100'];
              
              return (
                <div key={page._id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-slate-700 truncate font-medium">
                        {page._id || '/'}
                      </span>
                    </div>
                    <span className="font-bold text-blue-600 ml-2">{page.count}</span>
                  </div>
                  <div className="w-full h-8 bg-slate-100 rounded-lg overflow-hidden shadow-inner">
                    <div
                      className={`h-full ${colors[index] || 'bg-blue-500'} rounded-lg flex items-center justify-end pr-3 transition-all duration-1000 ease-out`}
                      style={{ width: `${percentage}%` }}
                    >
                      <span className="text-xs font-bold text-white">{percentage.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Exit Pages - Bar Chart Style */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">🚶 Exit Points</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4">Where visitors leave your site</p>
          <div className="space-y-4">
            {data.exitPages.slice(0, 5).map((page, index) => {
              const maxCount = data.exitPages[0]?.count || 1;
              const percentage = (page.count / maxCount) * 100;
              const colors = ['bg-orange-500', 'bg-orange-400', 'bg-orange-300', 'bg-orange-200', 'bg-orange-100'];
              
              return (
                <div key={page._id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-slate-700 truncate font-medium">
                        {page._id || '/'}
                      </span>
                    </div>
                    <span className="font-bold text-orange-600 ml-2">{page.count}</span>
                  </div>
                  <div className="w-full h-8 bg-slate-100 rounded-lg overflow-hidden shadow-inner">
                    <div
                      className={`h-full ${colors[index] || 'bg-orange-500'} rounded-lg flex items-center justify-end pr-3 transition-all duration-1000 ease-out`}
                      style={{ width: `${percentage}%` }}
                    >
                      <span className="text-xs font-bold text-white">{percentage.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Journey Paths & Page Engagement Time - Single Row Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Page Transitions (User Journey) - Enhanced Visual Flow */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-linear-to-r from-blue-100 to-purple-100 rounded-lg">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">🗺️ User Journey Paths</h3>
          </div>
          <p className="text-sm text-slate-600 mb-6">
            Most popular routes visitors take through your website
          </p>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {data.pageTransitions.slice(0, 8).map((transition, index) => {
              const maxCount = data.pageTransitions[0]?.count || 1;
              const percentage = (transition.count / maxCount) * 100;
              const gradients = [
                'from-blue-500 to-purple-500',
                'from-purple-500 to-pink-500',
                'from-pink-500 to-red-500',
                'from-red-500 to-orange-500',
                'from-orange-500 to-yellow-500',
                'from-yellow-500 to-green-500',
                'from-green-500 to-teal-500',
                'from-teal-500 to-cyan-500',
              ];
              
              return (
                <div key={index} className="bg-slate-50 rounded-lg p-3 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="shrink-0 w-7 h-7 rounded-full bg-linear-to-r from-blue-500 to-purple-500 text-white text-xs font-bold flex items-center justify-center shadow-md">
                      {index + 1}
                    </div>
                    <div className="flex-1 flex items-center gap-2 text-sm min-w-0">
                      <div className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg font-medium truncate max-w-[35%] text-xs">
                        {transition.from}
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                      <div className="px-2.5 py-1 bg-purple-100 text-purple-800 rounded-lg font-medium truncate max-w-[35%] text-xs">
                        {transition.to}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold text-slate-900">{transition.count}</div>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                    <div
                      className={`h-full bg-linear-to-r ${gradients[index] || gradients[0]} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Average Time on Pages - Visual Bars */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">⏱️ Page Engagement Time</h3>
          </div>
          <p className="text-sm text-slate-600 mb-6">
            How long visitors stay on each page
          </p>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {data.avgTimeOnPages.map((page, index) => {
              const maxTime = Math.max(...data.avgTimeOnPages.map(p => p.avgTime));
              const percentage = (page.avgTime / maxTime) * 100;
              const timeInSeconds = Math.round(page.avgTime / 1000);
              
              return (
                <div key={page._id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="shrink-0 w-6 h-6 rounded bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate">{page._id || '/'}</p>
                        <p className="text-xs text-slate-500">{page.visits} visits</p>
                      </div>
                    </div>
                    <div className="text-right ml-2">
                      <p className="text-base font-bold text-green-600">
                        {formatTime(page.avgTime)}
                      </p>
                    </div>
                  </div>
                  <div className="relative w-full h-5 bg-green-50 rounded-lg overflow-hidden border border-green-200">
                    <div
                      className="absolute inset-y-0 left-0 bg-linear-to-r from-green-400 to-green-600 rounded-lg transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-semibold text-slate-700 mix-blend-difference">
                        {timeInSeconds}s average
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
