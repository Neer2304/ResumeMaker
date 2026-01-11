import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Resume from '@/lib/models/Resume';
import { getUserFromRequest } from '@/lib/auth';
import { generatePDF } from '@/lib/pdf-generator'; // You'll need to create this

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

    // Generate PDF (you need to implement generatePDF)
    const pdfBuffer = await generatePDF(resume);
    
    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', `attachment; filename="${resume.title}.pdf"`);
    
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers
    });
  } catch (error: any) {
    console.error('Export PDF error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}