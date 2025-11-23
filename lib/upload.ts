/**
 * Generic file upload utility for uploading images to Cloudinary
 * Can be used throughout the application for any image upload needs
 */

export interface UploadResult {
  success: boolean;
  url: string;
  publicId?: string;
  format?: string;
  width?: number;
  height?: number;
  error?: string;
}

/**
 * Upload a file to Cloudinary via the API
 * @param file - The file to upload
 * @param authToken - Optional auth token (defaults to 'admin-token')
 * @returns Promise with upload result including Cloudinary URL
 */
export async function uploadFile(
  file: File,
  authToken: string = 'admin-token'
): Promise<UploadResult> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        url: '',
        error: error.error || 'Upload failed',
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      url: '',
      error: 'Network error during upload',
    };
  }
}

/**
 * Upload multiple files to Cloudinary
 * @param files - Array of files to upload
 * @param authToken - Optional auth token
 * @returns Promise with array of upload results
 */
export async function uploadMultipleFiles(
  files: File[],
  authToken: string = 'admin-token'
): Promise<UploadResult[]> {
  const uploadPromises = files.map((file) => uploadFile(file, authToken));
  return Promise.all(uploadPromises);
}

/**
 * Validate file before upload
 * @param file - File to validate
 * @param maxSizeMB - Maximum file size in MB (default 10)
 * @returns Object with isValid and error message
 */
export function validateFile(
  file: File,
  maxSizeMB: number = 10
): { isValid: boolean; error?: string } {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid file type. Only JPEG, PNG, WebP, and AVIF images are allowed.',
    };
  }

  const maxSize = maxSizeMB * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `File too large. Maximum size is ${maxSizeMB}MB.`,
    };
  }

  return { isValid: true };
}
