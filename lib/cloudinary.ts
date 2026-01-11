import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface UploadResult {
  url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

// Upload file to Cloudinary
export async function uploadToCloudinary(
  file: File,
  folder: string = 'resumes'
): Promise<UploadResult> {
  try {
    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload options
    const uploadOptions: any = {
      folder,
      resource_type: 'auto',
    };

    // Add transformations for images
    if (file.type.startsWith('image/')) {
      uploadOptions.transformation = [
        { quality: 'auto', fetch_format: 'auto' }
      ];
    }

    // Upload to Cloudinary
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(base64, uploadOptions, (error, result) => {
        if (error) {
          reject(new Error('Failed to upload to Cloudinary'));
        } else if (result) {
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            width: result.width || 0,
            height: result.height || 0,
            format: result.format || '',
            bytes: result.bytes || 0,
          });
        }
      });
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload file');
  }
}

// Delete file from Cloudinary
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          reject(new Error('Failed to delete from Cloudinary'));
        } else {
          resolve();
        }
      });
    });
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete file');
  }
}

// Get optimized image URL
export function getOptimizedUrl(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
  } = {}
): string {
  if (!url || !url.includes('cloudinary.com')) return url;

  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;

  const transformations = [];
  
  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.quality) transformations.push(`q_${options.quality}`);
  if (options.format) transformations.push(`f_${options.format}`);

  const transformStr = transformations.length > 0 
    ? `${transformations.join(',')}/` 
    : '';

  return `${parts[0]}/upload/${transformStr}${parts[1]}`;
}

// Upload profile photo with optimizations
// export async function uploadProfilePhoto(file: File, userId: string): Promise<UploadResult> {
//   const transformation = [
//     { width: 300, height: 300, crop: 'fill', gravity: 'face' },
//     { quality: 'auto', fetch_format: 'auto' },
//   ];

//   return uploadToCloudinary(file, {
//     folder: `resumes/users/${userId}/profile`,
//     transformation,
//     public_id: `profile_${Date.now()}`,
//   });
// }

// Upload resume photo
// export async function uploadResumePhoto(file: File, userId: string): Promise<UploadResult> {
//   const transformation = [
//     { width: 1200, crop: 'limit' },
//     { quality: 'auto' }
//   ];

//   return uploadToCloudinary(file, {
//     folder: `resumes/users/${userId}/photos`,
//     transformation,
//   });
// }