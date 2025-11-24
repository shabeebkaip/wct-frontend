'use client';

import React from 'react';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface AdminHeaderProps {
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
  previewHref?: string;
  previewLabel?: string;
  hasChanges?: boolean;
  saving?: boolean;
  onSave?: () => void;
  showSaveButton?: boolean;
}

export default function AdminHeader({
  title,
  description,
  backHref = '/admin/dashboard',
  backLabel = 'Back',
  previewHref,
  previewLabel = 'Visit Website',
  hasChanges = false,
  saving = false,
  onSave,
  showSaveButton = true,
}: AdminHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={backHref}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors group"
              title={`Back to ${backLabel}`}
            >
              <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                {backLabel}
              </span>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600 mt-1">{description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {previewHref && (
              <Link
                href={previewHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                {previewLabel}
              </Link>
            )}
            {hasChanges && (
              <span className="px-3 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium">
                Unsaved Changes
              </span>
            )}
            {showSaveButton && onSave && (
              <button
                onClick={onSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
