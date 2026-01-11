import { useState } from 'react';

interface UploadOptions {
  folder?: string;
  type?: 'profile' | 'resume' | 'general';
  maxSize?: number;
}

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const uploadImage = async (file: File, options: UploadOptions = {}) => {
    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', options.type || 'general');
      if (options.folder) {
        formData.append('folder', options.folder);
      }

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      // Simulate progress (in real app, use axios with progress event)
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const data = await response.json();

      clearInterval(interval);
      setProgress(100);

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      return data.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const deleteImage = async (publicId: string) => {
    try {
      const response = await fetch('/api/upload/image', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Delete failed');
      }

      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const getOptimizedUrl = (url: string, width?: number, height?: number) => {
    if (!url) return url;
    
    // If using Cloudinary
    if (url.includes('cloudinary.com')) {
      const parts = url.split('/upload/');
      if (parts.length === 2) {
        const transform = [];
        if (width) transform.push(`w_${width}`);
        if (height) transform.push(`h_${height}`);
        if (transform.length > 0) {
          return `${parts[0]}/upload/${transform.join(',')}/${parts[1]}`;
        }
      }
    }
    
    return url;
  };

  return {
    uploadImage,
    deleteImage,
    getOptimizedUrl,
    uploading,
    error,
    progress,
    clearError: () => setError(null),
  };
};