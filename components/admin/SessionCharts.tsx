'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface SessionMetrics {
  totalSessions: number;
  avgSessionDuration: number;
  avgPagesPerSession: number;
  bounceRate: number;
}

interface ChartData {
  sessionMetrics: SessionMetrics;
  entryPages: Array<{ _id: string; count: number }>;
  exitPages: Array<{ _id: string; count: number }>;
  avgTimeOnPages: Array<{ _id: string; avgTime: number; visits: number }>;
}

interface Props {
  data: ChartData;
}

export default function SessionCharts({ data }: Props) {
  if (!data || !data.sessionMetrics) {
    return null;
  }
  // Prepare data for Session Metrics Pie Chart
  const sessionMetricsPie = [
    { 
      name: 'Multi-page Sessions', 
      value: Math.round((100 - data.sessionMetrics.bounceRate) * data.sessionMetrics.totalSessions / 100),
      color: '#10b981'
    },
    { 
      name: 'Bounce (Single Page)', 
      value: Math.round(data.sessionMetrics.bounceRate * data.sessionMetrics.totalSessions / 100),
      color: '#f59e0b'
    },
  ];

  // Prepare Entry Pages data for bar chart
  const entryPagesData = data.entryPages.slice(0, 5).map((page) => ({
    name: page._id.length > 20 ? page._id.substring(0, 20) + '...' : page._id,
    fullName: page._id,
    visits: page.count,
  }));

  // Prepare Exit Pages data for bar chart
  const exitPagesData = data.exitPages.slice(0, 5).map((page) => ({
    name: page._id.length > 20 ? page._id.substring(0, 20) + '...' : page._id,
    fullName: page._id,
    visits: page.count,
  }));

  // Prepare Time on Page data
  const timeOnPageData = data.avgTimeOnPages.slice(0, 6).map((page) => ({
    name: page._id.length > 15 ? page._id.substring(0, 15) + '...' : page._id,
    fullName: page._id,
    seconds: Math.round(page.avgTime / 1000),
    visits: page.visits,
  }));

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-sm opacity-90 mb-1">Total Sessions</div>
          <div className="text-3xl font-bold">{data.sessionMetrics.totalSessions}</div>
          <div className="text-xs opacity-75 mt-2">Total visits tracked</div>
        </div>
        
        <div className="bg-linear-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-sm opacity-90 mb-1">Avg Duration</div>
          <div className="text-3xl font-bold">{formatDuration(Math.round(data.sessionMetrics.avgSessionDuration / 1000))}</div>
          <div className="text-xs opacity-75 mt-2">Time per visit</div>
        </div>
        
        <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-sm opacity-90 mb-1">Pages/Session</div>
          <div className="text-3xl font-bold">{data.sessionMetrics.avgPagesPerSession.toFixed(1)}</div>
          <div className="text-xs opacity-75 mt-2">Avg pages viewed</div>
        </div>
        
        <div className="bg-linear-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-sm opacity-90 mb-1">Bounce Rate</div>
          <div className="text-3xl font-bold">{data.sessionMetrics.bounceRate.toFixed(1)}%</div>
          <div className="text-xs opacity-75 mt-2">Single-page visits</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Session Quality Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📊</span>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Session Quality</h3>
              <p className="text-sm text-slate-600">How engaged are your visitors?</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={sessionMetricsPie}
                cx="50%"
                cy="50%"
                labelLine={false}
                label
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {sessionMetricsPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value} sessions`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Landing Pages */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">�</span>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Top Landing Pages</h3>
              <p className="text-sm text-slate-600">Where visitors enter your site</p>
            </div>
          </div>
          {entryPagesData.length > 0 ? (
            <div className="space-y-3">
              {entryPagesData.map((page, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700 truncate max-w-[200px]" title={page.fullName}>
                      {page.name}
                    </span>
                    <span className="text-sm font-bold text-blue-600">{page.visits}</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-linear-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${(page.visits / entryPagesData[0].visits) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 text-center py-8">No data available</p>
          )}
        </div>
      </div>

      {/* Bottom Row Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Exit Pages */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">�</span>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Top Exit Pages</h3>
              <p className="text-sm text-slate-600">Where visitors leave your site</p>
            </div>
          </div>
          {exitPagesData.length > 0 ? (
            <div className="space-y-3">
              {exitPagesData.map((page, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700 truncate max-w-[200px]" title={page.fullName}>
                      {page.name}
                    </span>
                    <span className="text-sm font-bold text-amber-600">{page.visits}</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-linear-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500"
                      style={{ width: `${(page.visits / exitPagesData[0].visits) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 text-center py-8">No data available</p>
          )}
        </div>

        {/* Time on Page */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">⏱️</span>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Avg Time on Page</h3>
              <p className="text-sm text-slate-600">Engagement by page</p>
            </div>
          </div>
          {timeOnPageData.length > 0 ? (
            <div className="space-y-3">
              {timeOnPageData.map((page, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700 truncate max-w-[150px]" title={page.fullName}>
                      {page.name}
                    </span>
                    <span className="text-sm font-bold text-green-600">{formatDuration(page.seconds)}</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-linear-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((page.seconds / 180) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 text-center py-8">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
