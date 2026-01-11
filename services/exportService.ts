import { Resume } from '@/types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';

class ExportService {
  async exportToPDF(
    resume: Resume,
    options?: any,
    onProgress?: (progress: number) => void
  ) {
    onProgress?.(10);
    
    // Create PDF using jsPDF
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: resume.settings.pageSize || 'a4',
    });

    // Add content to PDF
    // Implementation depends on your resume template structure
    // You'll need to convert your React component to PDF
    
    onProgress?.(50);
    
    // Generate PDF
    const pdfBlob = doc.output('blob');
    
    onProgress?.(90);
    
    // Save file
    saveAs(pdfBlob, `${resume.title}.pdf`);
    
    onProgress?.(100);
  }

  async exportToPNG(resume: Resume, options?: any) {
    // Convert resume preview to PNG
    const previewElement = document.getElementById('resume-preview');
    
    if (!previewElement) {
      throw new Error('Preview element not found');
    }

    const canvas = await html2canvas(previewElement, {
      scale: options?.quality === 'high' ? 3 : 2,
      backgroundColor: resume.template.colors.background || '#ffffff',
      useCORS: true,
    });

    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `${resume.title}.png`);
      }
    });
  }

  exportToJSON(resume: Resume) {
    const jsonString = JSON.stringify(resume, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    saveAs(blob, `${resume.title}.json`);
  }
}

export const exportService = new ExportService();