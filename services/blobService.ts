import { put, del, list } from '@vercel/blob';

export class BlobService {
  static async uploadFile(
    file: File,
    options: {
      access: 'public' | 'private';
      prefix?: string;
    } = { access: 'public' }
  ) {
    try {
      const filename = `${options.prefix || 'uploads'}/${Date.now()}-${file.name}`;
      
      const blob = await put(filename, file, {
        access: options.access,
        contentType: file.type,
      });

      return {
        url: blob.url,
        downloadUrl: blob.downloadUrl,
        pathname: blob.pathname,
        size: file.size,
        uploadedAt: blob.uploadedAt,
      };
    } catch (error) {
      console.error('Blob upload error:', error);
      throw new Error('Failed to upload file');
    }
  }

  static async deleteFile(url: string) {
    try {
      await del(url);
    } catch (error) {
      console.error('Blob delete error:', error);
      throw new Error('Failed to delete file');
    }
  }

  static async listFiles(prefix?: string) {
    try {
      const { blobs } = await list({ prefix });
      return blobs;
    } catch (error) {
      console.error('Blob list error:', error);
      throw new Error('Failed to list files');
    }
  }
}