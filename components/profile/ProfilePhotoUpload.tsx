// @/components/profile/ProfilePhotoUpload.tsx
import React, { useState } from 'react';
import ImageUpload from '../common/ImageUpload';
import { Camera, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface ProfilePhotoUploadProps {
  currentPhoto?: string;
  onPhotoChange: (url: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({
  currentPhoto,
  onPhotoChange,
  size = 'md',
}) => {
  const [showUploader, setShowUploader] = useState(false);
  const { user } = useAuth();

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const handlePhotoUpload = (url: string) => {
    onPhotoChange(url);
    setShowUploader(false);
  };

  const handleRemovePhoto = async () => {
    // Remove photo from Cloudinary
    if (currentPhoto) {
      try {
        await fetch('/api/upload/image', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ publicId: extractPublicId(currentPhoto) }),
        });
      } catch (error) {
        console.error('Failed to delete photo:', error);
      }
    }
    onPhotoChange('');
  };

  const extractPublicId = (url: string): string => {
    const parts = url.split('/');
    const publicIdWithExtension = parts[parts.length - 1];
    return publicIdWithExtension.split('.')[0];
  };

  if (showUploader) {
    return (
      <div className="space-y-4">
        <ImageUpload
          value={currentPhoto}
          onChange={handlePhotoUpload}
          type="profile"
          folder={`users/${user?.id}/profile`}
          aspectRatio={1}
          maxSize={2}
        />
        <button
          type="button"
          onClick={() => setShowUploader(false)}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className={`${sizeClasses[size]} relative`}>
        {currentPhoto ? (
          <img
            src={currentPhoto}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-2 border-gray-200"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
            <span className="text-gray-500 text-2xl font-semibold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
        )}
        
        <button
          type="button"
          onClick={() => setShowUploader(true)}
          className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          <Camera className="w-4 h-4" />
        </button>
      </div>

      {currentPhoto && (
        <button
          type="button"
          onClick={handleRemovePhoto}
          className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4" />
          <span>Remove photo</span>
        </button>
      )}
    </div>
  );
};

export default ProfilePhotoUpload;