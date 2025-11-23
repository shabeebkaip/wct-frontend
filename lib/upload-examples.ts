/**
 * Example usage of the upload utility
 * This file demonstrates how to use the generic upload functionality
 */

import { uploadFile, uploadMultipleFiles, validateFile } from '@/lib/upload';

// Example 1: Simple single file upload
export async function handleSingleUpload(file: File) {
  // Validate before upload
  const validation = validateFile(file);
  if (!validation.isValid) {
    alert(validation.error);
    return null;
  }

  // Upload the file
  const result = await uploadFile(file);
  
  if (result.success) {
    console.log('Upload successful!');
    console.log('Cloudinary URL:', result.url);
    console.log('Image dimensions:', result.width, 'x', result.height);
    return result.url;
  } else {
    console.error('Upload failed:', result.error);
    alert(`Upload failed: ${result.error}`);
    return null;
  }
}

// Example 2: Multiple files upload
export async function handleMultipleUploads(files: File[]) {
  // Validate all files first
  for (const file of files) {
    const validation = validateFile(file);
    if (!validation.isValid) {
      alert(`${file.name}: ${validation.error}`);
      return [];
    }
  }

  // Upload all files
  const results = await uploadMultipleFiles(files);
  
  const successfulUploads = results.filter(r => r.success);
  const failedUploads = results.filter(r => !r.success);

  console.log(`${successfulUploads.length} files uploaded successfully`);
  if (failedUploads.length > 0) {
    console.error(`${failedUploads.length} files failed to upload`);
  }

  return successfulUploads.map(r => r.url);
}

// Example 3: React component with upload functionality
/*
'use client';

import { useState } from 'react';
import { uploadFile, validateFile } from '@/lib/upload';

export function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate
    const validation = validateFile(file);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    // Upload
    setUploading(true);
    try {
      const result = await uploadFile(file);
      if (result.success) {
        setImageUrl(result.url);
        alert('Upload successful!');
      } else {
        alert(result.error);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
}
*/
