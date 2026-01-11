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

export class CloudinaryService {
  // Upload image
  static async uploadImage(
    file: File | Buffer | string,
    options: {
      folder?: string;
      transformation?: any;
      public_id?: string;
    } = {}
  ): Promise<UploadResult> {
    try {
      const uploadOptions: any = {
        folder: options.folder || 'resume-builder',
        resource_type: 'auto',
      };

      if (options.transformation) {
        uploadOptions.transformation = options.transformation;
      }

      if (options.public_id) {
        uploadOptions.public_id = options.public_id;
      }

      let uploadResponse;
      
      if (typeof file === 'string') {
        // Base64 or URL
        uploadResponse = await cloudinary.uploader.upload(file, uploadOptions);
      } else if (file instanceof File) {
        // Convert File to base64
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;
        uploadResponse = await cloudinary.uploader.upload(base64, uploadOptions);
      } else {
        // Buffer
        const base64 = `data:image/jpeg;base64,${file.toString('base64')}`;
        uploadResponse = await cloudinary.uploader.upload(base64, uploadOptions);
      }

      return {
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
        width: uploadResponse.width,
        height: uploadResponse.height,
        format: uploadResponse.format,
        bytes: uploadResponse.bytes,
      };
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw new Error('Failed to upload image');
    }
  }

  // Upload resume photo (optimized for CV)
  static async uploadResumePhoto(
    file: File,
    userId: string
  ): Promise<UploadResult> {
    const transformation = [
      { width: 300, height: 300, crop: 'fill', gravity: 'face' },
      { quality: 'auto', fetch_format: 'auto' },
    ];

    return this.uploadImage(file, {
      folder: `resume-builder/users/${userId}/photos`,
      transformation,
      public_id: `photo_${Date.now()}`,
    });
  }

  // Delete image
  static async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error('Cloudinary delete error:', error);
      throw new Error('Failed to delete image');
    }
  }

  // Get optimized image URL
  static getOptimizedUrl(url: string, options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
  } = {}): string {
    const parts = url.split('/upload/');
    if (parts.length !== 2) return url;

    const transformations = [];
    
    if (options.width || options.height) {
      transformations.push(`c_fill,w_${options.width || 'auto'},h_${options.height || 'auto'}`);
    }
    
    if (options.quality) {
      transformations.push(`q_${options.quality}`);
    }
    
    if (options.format) {
      transformations.push(`f_${options.format}`);
    }

    const transformStr = transformations.length > 0 
      ? `${transformations.join(',')}/` 
      : '';

    return `${parts[0]}/upload/${transformStr}${parts[1]}`;
  }
}

export default CloudinaryService;