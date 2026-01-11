import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Resume from '@/lib/models/Resume';
import { getUserFromRequest } from '@/lib/auth';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await connectToDatabase();
    
    const resume = await Resume.findById(id);
    
    if (!resume) {
      return NextResponse.json(
        { success: false, error: 'Resume not found' },
        { status: 404 }
      );
    }

    const user = await getUserFromRequest(req);
    const isOwner = user?.userId === resume.user.toString();
    const isPublic = resume.visibility === 'public';
    
    if (!isOwner && !isPublic) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      );
    }

    if (!isOwner && isPublic) {
      await Resume.findByIdAndUpdate(id, { 
        $inc: { viewCount: 1 } 
      });
    }

    return NextResponse.json({ 
      success: true, 
      data: resume 
    });
  } catch (error: any) {
    console.error('Get resume error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const user = await getUserFromRequest(req);
    
    if (!user?.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    
    const body = await req.json();
    
    const resume = await Resume.findOneAndUpdate(
      { _id: id, user: user.userId },
      { 
        ...body, 
        lastModified: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!resume) {
      return NextResponse.json(
        { success: false, error: 'Resume not found or access denied' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: resume 
    });
  } catch (error: any) {
    console.error('Update resume error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const user = await getUserFromRequest(req);
    
    if (!user?.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    
    const resume = await Resume.findOneAndDelete({
      _id: id,
      user: user.userId
    });

    if (!resume) {
      return NextResponse.json(
        { success: false, error: 'Resume not found or access denied' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Resume deleted successfully' 
    });
  } catch (error: any) {
    console.error('Delete resume error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}