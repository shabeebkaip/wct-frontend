# Cloudinary File Upload System

## Overview
All file uploads in this application are handled by **Cloudinary**, a cloud-based image and video management service. Images are stored in Cloudinary's CDN (not in the repository), providing:

- ✅ Automatic image optimization
- ✅ Fast CDN delivery worldwide
- ✅ Automatic format conversion (WebP, AVIF)
- ✅ Responsive image transformations
- ✅ No repository bloat

## Configuration

### Environment Variables
Add these to your `.env.local` file (already configured):

```env
CLOUDINARY_URL=cloudinary://248992785421936:kb_ax5UVKZNwkvhSZmMsf7huPVY@dm5c31z7w
CLOUDINARY_CLOUD_NAME=dm5c31z7w
CLOUDINARY_API_KEY=248992785421936
CLOUDINARY_API_SECRET=kb_ax5UVKZNwkvhSZmMsf7huPVY
```

**⚠️ Important:** Never commit `.env.local` to the repository. It's already in `.gitignore`.

## API Endpoint

### POST `/api/upload`

Generic file upload endpoint that works with Cloudinary.

**Authentication:** Requires Bearer token
```
Authorization: Bearer admin-token
```

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: FormData with `file` field

**Response:**
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/dm5c31z7w/image/upload/v1234567890/wecare-tech/abc123.jpg",
  "publicId": "wecare-tech/abc123",
  "format": "jpg",
  "width": 1920,
  "height": 1080
}
```

**Features:**
- ✅ Automatic image optimization (quality: auto:good)
- ✅ Automatic format detection and conversion
- ✅ Image resizing (max 1920x1080, maintains aspect ratio)
- ✅ Files organized in `wecare-tech` folder
- ✅ Validates file type (JPEG, PNG, WebP, AVIF)
- ✅ Max file size: 10MB

## Usage

### Method 1: Using the Upload Utility (Recommended)

```typescript
import { uploadFile, validateFile } from '@/lib/upload';

// In your component
const handleUpload = async (file: File) => {
  // Validate first
  const validation = validateFile(file);
  if (!validation.isValid) {
    alert(validation.error);
    return;
  }

  // Upload to Cloudinary
  const result = await uploadFile(file);
  
  if (result.success) {
    console.log('Cloudinary URL:', result.url);
    // Use result.url in your state/database
  } else {
    console.error('Upload failed:', result.error);
  }
};
```

### Method 2: Direct API Call

```typescript
const handleUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer admin-token',
    },
    body: formData,
  });

  const result = await response.json();
  console.log('Cloudinary URL:', result.url);
};
```

### Method 3: Multiple Files

```typescript
import { uploadMultipleFiles } from '@/lib/upload';

const handleMultipleUploads = async (files: File[]) => {
  const results = await uploadMultipleFiles(files);
  const urls = results.filter(r => r.success).map(r => r.url);
  console.log('All uploaded URLs:', urls);
};
```

## React Component Example

```typescript
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
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt="Uploaded" 
          width={400}
          height={300}
        />
      )}
    </div>
  );
}
```

## File Structure

```
lib/
  ├── cloudinary.ts          # Cloudinary configuration
  ├── upload.ts              # Upload utility functions
  └── upload-examples.ts     # Usage examples

app/api/
  └── upload/
      └── route.ts           # Upload API endpoint
```

## Validation Rules

- **Allowed formats:** JPEG, JPG, PNG, WebP, AVIF
- **Max file size:** 10MB
- **Auto transformations:**
  - Max dimensions: 1920x1080 (maintains aspect ratio)
  - Quality: auto:good (Cloudinary optimizes)
  - Format: auto (converts to best format like WebP)

## Cloudinary Features Used

1. **Upload Stream:** Direct buffer upload without temp files
2. **Folder Organization:** All files in `wecare-tech/` folder
3. **Auto Quality:** Cloudinary chooses optimal quality
4. **Auto Format:** Delivers WebP/AVIF to modern browsers
5. **Image Resizing:** Prevents massive images
6. **CDN Delivery:** Fast worldwide delivery

## Migration Notes

**Old System:** Files stored in `/public/uploads/`
**New System:** Files stored in Cloudinary CDN

All existing upload components already work with Cloudinary:
- ✅ EditableHero component
- ✅ EditableDataCenterHome component
- ✅ Home content admin

No changes needed in components - they use the same `/api/upload` endpoint.

## Dashboard Access

Cloudinary Dashboard: https://console.cloudinary.com/
- View all uploaded images
- Manage transformations
- Monitor bandwidth usage
- Access image analytics
