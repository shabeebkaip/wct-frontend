'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/shared/AdminSidebar';
import {
  Eye,
  Users,
  Download,
  Mail,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  TrendingUp,
  MapPin,
  MousePointer,
} from 'lucide-react';

interface AnalyticsData {
  success: boolean;
  analytics: Array<{
    _id: string;
    eventType: string;
    page: string;
    timestamp: string;
    location?: {
      city?: string;
      country?: string;
    };
    device?: {
      deviceType?: string;
      browser?: string;
      os?: string;
    };
  }>;
  stats: Array<{
    _id: string;
    count: number;
  }>;
  pageViewsByDay: Array<{
    _id: string;
    count: number;
  }>;
  topPages: Array<{
    _id: string;
    count: number;
  }>;
  totalEvents: number;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(7);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/analytics/track?days=${timeRange}`);
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventCount = (eventType: string) => {
    return data?.stats.find((s) => s._id === eventType)?.count || 0;
  };

  const getDeviceIcon = (deviceType?: string) => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'tablet':
        return <Tablet className="w-4 h-4" />;
      case 'desktop':
        return <Monitor className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Website Analytics</h1>
            <p className="text-slate-600">Track visitor behavior, engagement, and conversions</p>
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

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : !data?.success ? (
            <div className="text-center py-12 text-slate-500">Failed to load analytics data</div>
          ) : (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Eye className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Page Views</p>
                      <p className="text-2xl font-bold text-slate-900">{getEventCount('page_view').toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Total Events</p>
                      <p className="text-2xl font-bold text-slate-900">{data.totalEvents.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Mail className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Contact Forms</p>
                      <p className="text-2xl font-bold text-slate-900">{getEventCount('contact_form')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Download className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Brochure Downloads</p>
                      <p className="text-2xl font-bold text-slate-900">{getEventCount('brochure_download')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Top Pages */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Top Pages
                  </h3>
                  <div className="space-y-3">
                    {data.topPages.map((page, index) => (
                      <div key={page._id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-sm text-slate-700 truncate">{page._id || '/'}</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{page.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Page Views by Day */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-green-600" />
                    Daily Page Views
                  </h3>
                  <div className="space-y-3">
                    {data.pageViewsByDay.slice(-7).map((day) => (
                      <div key={day._id} className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">{day._id}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{
                                width: `${Math.min((day.count / Math.max(...data.pageViewsByDay.map((d) => d.count))) * 100, 100)}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-slate-900 w-12 text-right">{day.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <MousePointer className="w-5 h-5 text-blue-600" />
                    Recent Activity
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Event
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Page
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Device
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {data.analytics.slice(0, 20).map((event) => (
                        <tr key={event._id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                event.eventType === 'page_view'
                                  ? 'bg-blue-100 text-blue-800'
                                  : event.eventType === 'contact_form'
                                  ? 'bg-orange-100 text-orange-800'
                                  : event.eventType === 'brochure_download'
                                  ? 'bg-purple-100 text-purple-800'
                                  : event.eventType === 'project_view'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {event.eventType.replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-700">
                            <div className="max-w-xs truncate">{event.page}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {event.location?.city && event.location?.country ? (
                              <div className="flex items-center gap-1 text-sm text-slate-600">
                                <MapPin className="w-3 h-3" />
                                <span>{event.location.city}, {event.location.country}</span>
                              </div>
                            ) : (
                              <span className="text-xs text-slate-400">Unknown</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              {getDeviceIcon(event.device?.deviceType)}
                              <span className="capitalize">{event.device?.deviceType || 'Unknown'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {formatDate(event.timestamp)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
