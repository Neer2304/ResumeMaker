// @/components/common/ImageUpload.tsx
import React, { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  type?: 'profile' | 'resume' | 'general';
  folder?: string;
  aspectRatio?: number;
  maxSize?: number;
  className?: string;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
  type = 'general',
  folder = 'uploads',
  aspectRatio,
  maxSize = 4,
  className = '',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    if (file.size > maxSize * 1024 * 1024) {
      setError(`File must be less than ${maxSize}MB`);
      return;
    }

    // Validate aspect ratio if specified
    if (aspectRatio) {
      const image = new Image();
      const url = URL.createObjectURL(file);
      await new Promise((resolve) => {
        image.onload = resolve;
        image.src = url;
      });
      
      const actualAspectRatio = image.width / image.height;
      if (Math.abs(actualAspectRatio - aspectRatio) > 0.1) {
        setError(`Image aspect ratio should be ${aspectRatio}:1 (e.g., ${aspectRatio * 100}x100)`);
        URL.revokeObjectURL(url);
        return;
      }
      URL.revokeObjectURL(url);
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      formData.append('folder', folder);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      onChange(data.data.secure_url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    if (onRemove) onRemove();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          hover:border-blue-500 transition-colors
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={uploading ? undefined : triggerFileInput}
      >
        {value ? (
          <div className="relative">
            <img
              src={value}
              alt="Preview"
              className="max-h-64 mx-auto rounded"
            />
            {!uploading && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : uploading ? (
          <div className="py-12">
            <Loader2 className="w-12 h-12 mx-auto animate-spin text-blue-500" />
            <p className="mt-4 text-gray-600">Uploading...</p>
          </div>
        ) : (
          <div className="py-12">
            <Upload className="w-12 h-12 mx-auto text-gray-400" />
            <p className="mt-4 text-gray-600">Click to upload</p>
            <p className="text-sm text-gray-500 mt-2">
              PNG, JPG, WebP up to {maxSize}MB
              {aspectRatio && `, ${aspectRatio}:1 aspect ratio`}
            </p>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />

      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}