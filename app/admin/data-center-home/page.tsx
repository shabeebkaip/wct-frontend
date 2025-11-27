'use client';

import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/shared/AdminHeader';
import EditableDataCenterHome from '@/components/admin/EditableDataCenterHome';

export default function DataCenterHomeEditor() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <AdminHeader
        title="Data Center - Live Edit Mode"
        description="Click on any text to edit directly"
        backHref="/admin/dashboard"
        previewHref="/"
        showSaveButton={false}
      />
      <main>
        <EditableDataCenterHome isEditMode={true} />
      </main>
    </div>
  );
}
