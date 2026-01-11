import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Resume from '@/lib/models/Resume';
import { getUserFromRequest } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    
    if (!user?.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const skip = (page - 1) * limit;

    const query: any = { user: user.userId };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { 'personalInfo.firstName': { $regex: search, $options: 'i' } },
        { 'personalInfo.lastName': { $regex: search, $options: 'i' } },
        { 'personalInfo.jobTitle': { $regex: search, $options: 'i' } }
      ];
    }

    const [resumes, total] = await Promise.all([
      Resume.find(query)
        .sort({ lastModified: -1 })
        .skip(skip)
        .limit(limit)
        .select('-workExperience -education -skills -projects'),
      Resume.countDocuments(query)
    ]);

    return NextResponse.json({
      success: true,
      data: {
        resumes,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error: any) {
    console.error('Get resumes error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    
    if (!user?.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    
    const body = await req.json();
    const { title = 'Untitled Resume', template = 'modern' } = body;

    const defaultTemplate = {
      modern: {
        name: 'Modern',
        category: 'modern',
        colors: {
          primary: '#3B82F6',
          secondary: '#6B7280',
          background: '#FFFFFF',
          text: '#1F2937'
        },
        font: {
          heading: 'Inter',
          body: 'Inter'
        }
      },
      professional: {
        name: 'Professional',
        category: 'professional',
        colors: {
          primary: '#1E40AF',
          secondary: '#4B5563',
          background: '#FFFFFF',
          text: '#111827'
        },
        font: {
          heading: 'Calibri',
          body: 'Calibri'
        }
      }
    };

    const resume = new Resume({
      user: user.userId,
      title,
      slug: `resume-${uuidv4().slice(0, 8)}`,
      personalInfo: {
        firstName: '',
        lastName: '',
        email: user.email || '',
        phone: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        jobTitle: '',
        summary: ''
      },
      workExperience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      languages: [],
      hobbies: [],
      references: [],
      template: defaultTemplate[template as keyof typeof defaultTemplate] || defaultTemplate.modern,
      settings: {
        margin: 20,
        fontSize: 12,
        lineHeight: 1.5,
        pageSize: 'A4'
      },
      visibility: 'private'
    });

    await resume.save();

    return NextResponse.json(
      { success: true, data: resume },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create resume error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}