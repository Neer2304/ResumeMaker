import { NextRequest, NextResponse } from 'next/server';
import { deleteFromCloudinary, uploadToCloudinary } from '@/lib/cloudinary';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    
    if (!user?.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string || 'general';
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size
    const maxSize = type === 'profile' ? 4 * 1024 * 1024 : 8 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: `File size must be less than ${maxSize / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'File type not allowed' },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const folder = `resumes/${user.userId}/${type}`;
    const result = await uploadToCloudinary(file, folder);

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    
    if (!user?.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { publicId } = await req.json();

    if (!publicId) {
      return NextResponse.json(
        { success: false, error: 'Public ID is required' },
        { status: 400 }
      );
    }

    // Delete from Cloudinary
    await deleteFromCloudinary(publicId);

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Delete failed' },
      { status: 500 }
    );
  }
}