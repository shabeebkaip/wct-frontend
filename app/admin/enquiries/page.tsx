'use client';

import React, { useState, useEffect } from 'react';
import { 
  Loader2, 
  Search, 
  Filter, 
  Trash2, 
  Eye, 
  X,
  Mail,
  Phone,
  Building2,
  Calendar,
  MessageSquare,
  Tag,
  FileText
} from 'lucide-react';
import AdminHeader from '@/components/admin/shared/AdminHeader';

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  source: 'contact-page' | 'home-page';
  status: 'new' | 'in-progress' | 'resolved' | 'archived';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  useEffect(() => {
    filterEnquiries();
  }, [enquiries, searchTerm, statusFilter, sourceFilter]);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch('/api/enquiries');
      const data = await res.json();
      setEnquiries(data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterEnquiries = () => {
    let filtered = [...enquiries];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (enq) =>
          enq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          enq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          enq.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          enq.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((enq) => enq.status === statusFilter);
    }

    // Source filter
    if (sourceFilter !== 'all') {
      filtered = filtered.filter((enq) => enq.source === sourceFilter);
    }

    setFilteredEnquiries(filtered);
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setEnquiries(
          enquiries.map((enq) =>
            enq._id === id ? { ...enq, status: status as Enquiry['status'] } : enq
          )
        );
        if (selectedEnquiry?._id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: status as Enquiry['status'] });
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const updateNotes = async (id: string, notes: string) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });

      if (res.ok) {
        setEnquiries(
          enquiries.map((enq) => (enq._id === id ? { ...enq, notes } : enq))
        );
        if (selectedEnquiry?._id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, notes });
        }
      }
    } catch (error) {
      console.error('Error updating notes:', error);
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setEnquiries(enquiries.filter((enq) => enq._id !== id));
        if (selectedEnquiry?._id === id) {
          setIsModalOpen(false);
          setSelectedEnquiry(null);
        }
      }
    } catch (error) {
      console.error('Error deleting enquiry:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'resolved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'archived':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSourceBadge = (source: string) => {
    return source === 'contact-page' ? 'Contact Page' : 'Home Page';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <AdminHeader
        title="Enquiries"
        description={`Manage customer enquiries (${enquiries.length} total)`}
        backHref="/admin/dashboard"
        previewHref="/"
        hasChanges={false}
        saving={false}
        onSave={() => {}}
      />

      <div className="container mx-auto p-6">
        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Source Filter */}
            <div>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="all">All Sources</option>
                <option value="contact-page">Contact Page</option>
                <option value="home-page">Home Page</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {enquiries.filter((e) => e.status === 'new').length}
              </div>
              <div className="text-xs text-gray-600 mt-1">New</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {enquiries.filter((e) => e.status === 'in-progress').length}
              </div>
              <div className="text-xs text-gray-600 mt-1">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {enquiries.filter((e) => e.status === 'resolved').length}
              </div>
              <div className="text-xs text-gray-600 mt-1">Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {enquiries.filter((e) => e.status === 'archived').length}
              </div>
              <div className="text-xs text-gray-600 mt-1">Archived</div>
            </div>
          </div>
        </div>

        {/* Enquiries List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No enquiries found
                    </td>
                  </tr>
                ) : (
                  filteredEnquiries.map((enquiry) => (
                    <tr
                      key={enquiry._id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedEnquiry(enquiry);
                        setIsModalOpen(true);
                      }}
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{enquiry.name}</div>
                        <div className="text-sm text-gray-500">{enquiry.email}</div>
                        {enquiry.company && (
                          <div className="text-xs text-gray-400">{enquiry.company}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{enquiry.service}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                          {getSourceBadge(enquiry.source)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={enquiry.status}
                          onChange={(e) => {
                            e.stopPropagation();
                            updateStatus(enquiry._id, e.target.value);
                          }}
                          className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                            enquiry.status
                          )}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <option value="new">New</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(enquiry.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEnquiry(enquiry);
                              setIsModalOpen(true);
                            }}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteEnquiry(enquiry._id);
                            }}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {isModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Enquiry Details</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Name</div>
                    <div className="font-medium text-gray-900">{selectedEnquiry.name}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <a
                      href={`mailto:${selectedEnquiry.email}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {selectedEnquiry.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Phone className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <a
                      href={`tel:${selectedEnquiry.phone}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {selectedEnquiry.phone}
                    </a>
                  </div>
                </div>

                {selectedEnquiry.company && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Building2 className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Company</div>
                      <div className="font-medium text-gray-900">{selectedEnquiry.company}</div>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <Tag className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Service</div>
                    <div className="font-medium text-gray-900">{selectedEnquiry.service}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Submitted</div>
                    <div className="font-medium text-gray-900">
                      {formatDate(selectedEnquiry.createdAt)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  <label className="text-sm font-semibold text-gray-700">Message</label>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-gray-700 whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => updateStatus(selectedEnquiry._id, e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border-2 font-medium text-gray-900 ${getStatusColor(
                    selectedEnquiry.status
                  )}`}
                >
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <label className="text-sm font-semibold text-gray-700">Internal Notes</label>
                </div>
                <textarea
                  value={selectedEnquiry.notes || ''}
                  onChange={(e) => updateNotes(selectedEnquiry._id, e.target.value)}
                  placeholder="Add internal notes..."
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => deleteEnquiry(selectedEnquiry._id)}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Delete Enquiry
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
