'use client';

import { useState, useEffect } from 'react';
import { Upload, Loader2, Trash2, CheckCircle, FileText, Download, AlertCircle } from 'lucide-react';

interface Brochure {
  _id: string;
  title: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  uploadedBy: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function BrochureManagement() {
  const [brochures, setBrochures] = useState<Brochure[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchBrochures();
  }, []);

  const fetchBrochures = async () => {
    try {
      const res = await fetch('/api/brochures');
      const data = await res.json();
      setBrochures(data);
    } catch (error) {
      console.error('Error fetching brochures:', error);
      setError('Failed to load brochures');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type - allow PDF, PPTX, DOCX, XLSX
    const allowedTypes = [
      'application/pdf',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a valid document file (PDF, PPTX, DOCX, or XLSX)');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', file);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) {
        const uploadError = await uploadRes.json();
        console.error('Upload failed:', uploadError);
        throw new Error(uploadError.error || 'Upload failed');
      }

      const { secure_url } = await uploadRes.json();

      // Get admin email from session
      const adminEmail = sessionStorage.getItem('adminEmail') || 'admin';

      // Create brochure record
      const createRes = await fetch('/api/brochures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: file.name.replace(/\.(pdf|pptx?|docx?|xlsx?)$/i, ''),
          fileUrl: secure_url,
          fileName: file.name,
          fileSize: file.size,
          uploadedBy: adminEmail,
          active: false,
        }),
      });

      if (!createRes.ok) {
        const errorData = await createRes.json();
        console.error('Failed to save brochure:', errorData);
        throw new Error(errorData.error || 'Failed to save brochure');
      }

      setSuccess('Brochure uploaded successfully!');
      fetchBrochures();
      
      // Clear file input
      e.target.value = '';
    } catch (error) {
      console.error('Error uploading brochure:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload brochure';
      setError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const toggleActive = async (brochure: Brochure) => {
    try {
      // If activating this brochure, deactivate all others first
      if (!brochure.active) {
        await Promise.all(
          brochures
            .filter(b => b.active && b._id !== brochure._id)
            .map(b =>
              fetch(`/api/brochures?id=${b._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...b, active: false }),
              })
            )
        );
      }

      const res = await fetch(`/api/brochures?id=${brochure._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...brochure, active: !brochure.active }),
      });

      if (!res.ok) throw new Error('Failed to update brochure');

      setSuccess(brochure.active ? 'Brochure deactivated' : 'Brochure activated');
      fetchBrochures();
    } catch (error) {
      console.error('Error toggling brochure:', error);
      setError('Failed to update brochure');
    }
  };

  const deleteBrochure = async (id: string) => {
    if (!confirm('Are you sure you want to delete this brochure?')) return;

    try {
      const res = await fetch(`/api/brochures?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete brochure');

      setSuccess('Brochure deleted successfully');
      fetchBrochures();
    } catch (error) {
      console.error('Error deleting brochure:', error);
      setError('Failed to delete brochure');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
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

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Brochure Management</h1>
          <p className="text-slate-600">Upload and manage company brochures for public download</p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Upload Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Upload New Brochure</h2>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg cursor-pointer transition-colors">
              <Upload className="w-5 h-5" />
              <span>{uploading ? 'Uploading...' : 'Choose Document'}</span>
              <input
                type="file"
                accept=".pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
            <p className="text-sm text-slate-500">Max file size: 10MB • PDF, PPTX, DOCX, XLSX</p>
          </div>
        </div>

        {/* Brochures List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">Uploaded Brochures</h2>
            <p className="text-sm text-slate-500 mt-1">
              Only one brochure can be active at a time. Active brochure will be available for download on the website.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : brochures.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p>No brochures uploaded yet</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {brochures.map((brochure) => (
                <div
                  key={brochure._id}
                  className={`p-6 hover:bg-slate-50 transition-colors ${
                    brochure.active ? 'bg-green-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-slate-400" />
                        <h3 className="font-semibold text-slate-900">{brochure.title}</h3>
                        {brochure.active && (
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="ml-8 space-y-1 text-sm text-slate-600">
                        <p>File: {brochure.fileName}</p>
                        <p>Size: {formatFileSize(brochure.fileSize)}</p>
                        <p>Uploaded by: {brochure.uploadedBy}</p>
                        <p>Date: {formatDate(brochure.createdAt)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={brochure.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download className="w-5 h-5" />
                      </a>
                      <button
                        onClick={() => toggleActive(brochure)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          brochure.active
                            ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {brochure.active ? 'Deactivate' : 'Set as Active'}
                      </button>
                      <button
                        onClick={() => deleteBrochure(brochure._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
  );
}
