'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import AdminHeader from '@/components/admin/shared/AdminHeader';
import Link from 'next/link';

interface Solution {
  _id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function SolutionsAdmin() {
  const router = useRouter();
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = async () => {
    try {
      const res = await fetch('/api/solutions');
      const data = await res.json();
      setSolutions(data);
    } catch (error) {
      console.error('Error fetching solutions:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSolution = async (id: string) => {
    if (!confirm('Are you sure you want to delete this solution?')) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/solutions/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSolutions(solutions.filter((s) => s._id !== id));
        alert('✓ Solution deleted successfully!');
      } else {
        alert('✗ Failed to delete solution');
      }
    } catch (error) {
      console.error('Error deleting solution:', error);
      alert('✗ Error deleting solution');
    } finally {
      setDeleting(null);
    }
  };

  const togglePublished = async (solution: Solution) => {
    try {
      const res = await fetch(`/api/solutions/${solution._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...solution, published: !solution.published }),
      });

      if (res.ok) {
        const updated = await res.json();
        setSolutions(solutions.map((s) => (s._id === updated._id ? updated : s)));
      }
    } catch (error) {
      console.error('Error updating solution:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        title="Solutions"
        description="Manage your solution pages"
        backHref="/admin/dashboard"
        hasChanges={false}
        saving={false}
        onSave={() => {}}
      />

      <div className="container mx-auto p-6">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Solutions</h2>
            <p className="text-gray-600 mt-1">
              {solutions.length} solution{solutions.length !== 1 ? 's' : ''} total
            </p>
          </div>
          <Link
            href="/admin/solutions/new"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Create Solution
          </Link>
        </div>

        {/* Solutions Grid */}
        {solutions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No solutions yet</h3>
              <p className="text-gray-600 mb-6">
                Create your first solution page to showcase your services and offerings.
              </p>
              <Link
                href="/admin/solutions/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus className="w-5 h-5" />
                Create First Solution
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution) => (
              <div
                key={solution._id}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{solution.title}</h3>
                    <p className="text-sm text-gray-500">/{solution.slug}</p>
                  </div>
                  <button
                    onClick={() => togglePublished(solution)}
                    className={`p-2 rounded-lg transition-colors ${
                      solution.published
                        ? 'bg-green-100 text-green-600 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title={solution.published ? 'Published' : 'Draft'}
                  >
                    {solution.published ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium text-gray-900">{solution.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Order:</span>
                    <span className="font-medium text-gray-900">{solution.order}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        solution.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {solution.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <Link
                    href={`/admin/solutions/${solution._id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteSolution(solution._id)}
                    disabled={deleting === solution._id}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium disabled:opacity-50"
                  >
                    {deleting === solution._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
