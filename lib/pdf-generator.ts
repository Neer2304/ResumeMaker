import { Resume } from '@/types';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable: { finalY: number };
    autoTable: (options: any) => void;
  }
}

export async function generatePDF(resume: Resume): Promise<Buffer> {
  const doc = new jsPDF();
  
  // Set PDF properties
  doc.setProperties({
    title: `${resume.personalInfo.firstName} ${resume.personalInfo.lastName} - Resume`,
    subject: 'Professional Resume',
    author: `${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`,
    keywords: 'resume, cv, professional',
  });

  // Set margins
  const margin = resume.settings?.margin || 20;
  let yPos = margin;

  // Apply template colors
  const primaryColor = resume.template?.colors?.primary || '#000000';
  const textColor = resume.template?.colors?.text || '#000000';

  // Helper function to add section
  const addSection = (title: string, content: () => void) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = margin;
    }
    
    // Section title with line
    doc.setFontSize(14);
    doc.setTextColor(primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, yPos);
    
    // Line under title
    doc.setDrawColor(primaryColor);
    doc.line(margin, yPos + 2, 210 - margin, yPos + 2);
    
    yPos += 10;
    content();
    yPos += 10;
  };

  // 1. HEADER SECTION
  doc.setFontSize(24);
  doc.setTextColor(primaryColor);
  doc.setFont('helvetica', 'bold');
  const fullName = `${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`;
  const nameWidth = doc.getTextWidth(fullName);
  doc.text(fullName, (210 - nameWidth) / 2, yPos);
  yPos += 8;

  doc.setFontSize(14);
  doc.setTextColor(textColor);
  doc.setFont('helvetica', 'normal');
  if (resume.personalInfo.jobTitle) {
    const jobTitleWidth = doc.getTextWidth(resume.personalInfo.jobTitle);
    doc.text(resume.personalInfo.jobTitle, (210 - jobTitleWidth) / 2, yPos);
    yPos += 6;
  }

  // Contact information in a row
  doc.setFontSize(10);
  const contactInfo = [];
  if (resume.personalInfo.email) contactInfo.push(resume.personalInfo.email);
  if (resume.personalInfo.phone) contactInfo.push(resume.personalInfo.phone);
  if (resume.personalInfo.city) contactInfo.push(resume.personalInfo.city);
  if (resume.personalInfo.linkedin) contactInfo.push('LinkedIn');
  if (resume.personalInfo.github) contactInfo.push('GitHub');
  if (resume.personalInfo.website) contactInfo.push('Website');

  const contactY = yPos;
  const contactSpacing = 210 / (contactInfo.length + 1);
  
  contactInfo.forEach((info, index) => {
    const xPos = contactSpacing * (index + 1);
    doc.text(info, xPos, contactY, { align: 'center' });
  });
  
  yPos += 15;

  // 2. SUMMARY SECTION
  if (resume.personalInfo.summary) {
    addSection('PROFILE', () => {
      doc.setFontSize(11);
      doc.setTextColor(textColor);
      doc.setFont('helvetica', 'normal');
      
      const summaryLines = doc.splitTextToSize(resume.personalInfo.summary, 170);
      doc.text(summaryLines, margin, yPos);
      yPos += summaryLines.length * 5;
    });
  }

  // 3. WORK EXPERIENCE SECTION
  if (resume.workExperience && resume.workExperience.length > 0) {
    addSection('WORK EXPERIENCE', () => {
      resume.workExperience.forEach((exp, index) => {
        if (yPos > 250 && index > 0) {
          doc.addPage();
          yPos = margin;
        }

        // Job title and company
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(primaryColor);
        doc.text(exp.jobTitle, margin, yPos);
        
        const companyText = exp.employer;
        const companyWidth = doc.getTextWidth(companyText);
        doc.setFont('helvetica', 'normal');
        doc.text(companyText, 210 - margin - companyWidth, yPos);
        yPos += 6;

        // Date and location
        doc.setFontSize(10);
        doc.setTextColor(100);
        const startDate = exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';
        const endDate = exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '');
        const dateText = `${startDate} - ${endDate}`;
        doc.text(dateText, margin, yPos);
        
        const locationText = exp.city ? `${exp.city}, ${exp.country}` : exp.country || '';
        if (locationText) {
          const locationWidth = doc.getTextWidth(locationText);
          doc.text(locationText, 210 - margin - locationWidth, yPos);
        }
        yPos += 6;

        // Description
        if (exp.description) {
          doc.setFontSize(10);
          doc.setTextColor(textColor);
          const descLines = doc.splitTextToSize(exp.description, 170);
          doc.text(descLines, margin, yPos);
          yPos += descLines.length * 4;
        }

        // Achievements
        if (exp.achievements && exp.achievements.length > 0) {
          exp.achievements.forEach(achievement => {
            if (achievement.trim()) {
              const bullet = '• ';
              const bulletWidth = doc.getTextWidth(bullet);
              const achievementLines = doc.splitTextToSize(achievement, 170 - bulletWidth);
              
              doc.text(bullet, margin, yPos);
              doc.text(achievementLines, margin + bulletWidth, yPos);
              yPos += achievementLines.length * 4;
            }
          });
        }

        yPos += 8;
      });
    });
  }

  // 4. EDUCATION SECTION
  if (resume.education && resume.education.length > 0) {
    addSection('EDUCATION', () => {
      resume.education.forEach((edu, index) => {
        if (yPos > 250 && index > 0) {
          doc.addPage();
          yPos = margin;
        }

        // Degree and school
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(primaryColor);
        doc.text(edu.degree, margin, yPos);
        
        const schoolText = edu.school;
        const schoolWidth = doc.getTextWidth(schoolText);
        doc.setFont('helvetica', 'normal');
        doc.text(schoolText, 210 - margin - schoolWidth, yPos);
        yPos += 6;

        // Date and location
        doc.setFontSize(10);
        doc.setTextColor(100);
        const startDate = edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';
        const endDate = edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '');
        const dateText = `${startDate} - ${endDate}`;
        doc.text(dateText, margin, yPos);
        
        const locationText = edu.city ? `${edu.city}, ${edu.country}` : edu.country || '';
        if (locationText) {
          const locationWidth = doc.getTextWidth(locationText);
          doc.text(locationText, 210 - margin - locationWidth, yPos);
        }
        yPos += 6;

        // GPA if exists
        if (edu.gpa) {
          doc.setFontSize(10);
          doc.setTextColor(textColor);
          doc.text(`GPA: ${edu.gpa}`, margin, yPos);
          yPos += 5;
        }

        // Description
        if (edu.description) {
          const descLines = doc.splitTextToSize(edu.description, 170);
          doc.text(descLines, margin, yPos);
          yPos += descLines.length * 4;
        }

        yPos += 8;
      });
    });
  }

  // 5. SKILLS SECTION (Using autoTable for better formatting)
  if (resume.skills && resume.skills.length > 0) {
    addSection('SKILLS', () => {
      const skillsData = resume.skills.map(skill => [
        skill.name,
        skill.category || '',
        getSkillLevelText(skill.level)
      ]);

      doc.autoTable({
        startY: yPos,
        head: [['Skill', 'Category', 'Level']],
        body: skillsData,
        theme: 'grid',
        headStyles: {
          fillColor: primaryColor,
          textColor: 255,
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 9,
          cellPadding: 3
        },
        columnStyles: {
          0: { cellWidth: 60 },
          1: { cellWidth: 60 },
          2: { cellWidth: 30 }
        },
        margin: { left: margin, right: margin }
      });

      yPos = doc.lastAutoTable.finalY + 10;
    });
  }

  // 6. PROJECTS SECTION
  if (resume.projects && resume.projects.length > 0) {
    addSection('PROJECTS', () => {
      resume.projects.forEach((project, index) => {
        if (yPos > 250 && index > 0) {
          doc.addPage();
          yPos = margin;
        }

        // Project title
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(primaryColor);
        doc.text(project.title, margin, yPos);
        yPos += 6;

        // Technologies
        if (project.technologies && project.technologies.length > 0) {
          doc.setFontSize(9);
          doc.setTextColor(100);
          const techText = project.technologies.join(' • ');
          doc.text(techText, margin, yPos);
          yPos += 5;
        }

        // Description
        if (project.description) {
          doc.setFontSize(10);
          doc.setTextColor(textColor);
          const descLines = doc.splitTextToSize(project.description, 170);
          doc.text(descLines, margin, yPos);
          yPos += descLines.length * 4;
        }

        yPos += 8;
      });
    });
  }

  // 7. CERTIFICATIONS SECTION
  if (resume.certifications && resume.certifications.length > 0) {
    addSection('CERTIFICATIONS', () => {
      resume.certifications.forEach((cert, index) => {
        if (yPos > 250 && index > 0) {
          doc.addPage();
          yPos = margin;
        }

        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(primaryColor);
        doc.text(cert.name, margin, yPos);
        
        const issuerText = cert.issuer;
        const issuerWidth = doc.getTextWidth(issuerText);
        doc.setFont('helvetica', 'normal');
        doc.text(issuerText, 210 - margin - issuerWidth, yPos);
        yPos += 5;

        if (cert.date) {
          doc.setFontSize(9);
          doc.setTextColor(100);
          const dateText = new Date(cert.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
          doc.text(dateText, margin, yPos);
          yPos += 4;
        }

        yPos += 6;
      });
    });
  }

  // 8. LANGUAGES SECTION
  if (resume.languages && resume.languages.length > 0) {
    addSection('LANGUAGES', () => {
      const languagesData = resume.languages.map(lang => [
        lang.language,
        getLanguageLevelText(lang.proficiency)
      ]);

      doc.autoTable({
        startY: yPos,
        head: [['Language', 'Proficiency']],
        body: languagesData,
        theme: 'plain',
        headStyles: {
          fillColor: primaryColor,
          textColor: 255,
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 10,
          cellPadding: 5
        },
        columnStyles: {
          0: { cellWidth: 80 },
          1: { cellWidth: 80 }
        },
        margin: { left: margin, right: margin }
      });

      yPos = doc.lastAutoTable.finalY + 10;
    });
  }

  // 9. HOBBIES SECTION (if space available)
  if (resume.hobbies && resume.hobbies.length > 0 && yPos < 250) {
    addSection('HOBBIES & INTERESTS', () => {
      doc.setFontSize(10);
      doc.setTextColor(textColor);
      const hobbiesText = resume.hobbies.join(' • ');
      const hobbiesLines = doc.splitTextToSize(hobbiesText, 170);
      doc.text(hobbiesLines, margin, yPos);
      yPos += hobbiesLines.length * 4;
    });
  }

  // Add page numbers
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Page ${i} of ${pageCount}`, 210 - margin - 20, 297 - margin);
  }

  // Convert to Buffer
  const pdfBytes = doc.output('arraybuffer');
  return Buffer.from(pdfBytes);
}

// Helper functions
function getSkillLevelText(level: string): string {
  const levels: Record<string, string> = {
    'beginner': 'Beginner',
    'intermediate': 'Intermediate',
    'advanced': 'Advanced',
    'expert': 'Expert'
  };
  return levels[level] || level;
}

function getLanguageLevelText(proficiency: string): string {
  const levels: Record<string, string> = {
    'basic': 'Basic',
    'conversational': 'Conversational',
    'professional': 'Professional',
    'native': 'Native'
  };
  return levels[proficiency] || proficiency;
}

// Alternative: Simple PDF generator (if you don't want complex formatting)
export async function generateSimplePDF(resume: Resume): Promise<Buffer> {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(24);
  doc.text(`${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`, 20, 20);
  
  doc.setFontSize(14);
  doc.text(resume.personalInfo.jobTitle || '', 20, 30);
  
  // Contact info
  let y = 40;
  if (resume.personalInfo.email) {
    doc.text(`Email: ${resume.personalInfo.email}`, 20, y);
    y += 10;
  }
  if (resume.personalInfo.phone) {
    doc.text(`Phone: ${resume.personalInfo.phone}`, 20, y);
    y += 10;
  }
  if (resume.personalInfo.linkedin) {
    doc.text(`LinkedIn: ${resume.personalInfo.linkedin}`, 20, y);
    y += 10;
  }
  
  y += 10;
  
  // Summary
  if (resume.personalInfo.summary) {
    doc.setFontSize(16);
    doc.text('Summary', 20, y);
    y += 10;
    
    doc.setFontSize(11);
    const summaryLines = doc.splitTextToSize(resume.personalInfo.summary, 170);
    doc.text(summaryLines, 20, y);
    y += summaryLines.length * 5 + 10;
  }
  
  // Work Experience
  if (resume.workExperience && resume.workExperience.length > 0) {
    doc.setFontSize(16);
    doc.text('Work Experience', 20, y);
    y += 10;
    
    doc.setFontSize(12);
    resume.workExperience.forEach(exp => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }
      
      doc.setFont('helvetica', 'bold');
      doc.text(exp.jobTitle, 20, y);
      y += 7;
      
      doc.setFont('helvetica', 'normal');
      doc.text(`${exp.employer} | ${exp.city || ''}`, 20, y);
      y += 7;
      
      const startDate = exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';
      const endDate = exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '');
      doc.text(`${startDate} - ${endDate}`, 20, y);
      y += 7;
      
      if (exp.description) {
        const descLines = doc.splitTextToSize(exp.description, 170);
        doc.text(descLines, 20, y);
        y += descLines.length * 5;
      }
      
      y += 5;
    });
  }
  
  // Education
  if (resume.education && resume.education.length > 0) {
    doc.setFontSize(16);
    doc.text('Education', 20, y);
    y += 10;
    
    doc.setFontSize(12);
    resume.education.forEach(edu => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }
      
      doc.setFont('helvetica', 'bold');
      doc.text(edu.degree, 20, y);
      y += 7;
      
      doc.setFont('helvetica', 'normal');
      doc.text(`${edu.school} | ${edu.city || ''}`, 20, y);
      y += 7;
      
      const startDate = edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';
      const endDate = edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '');
      doc.text(`${startDate} - ${endDate}`, 20, y);
      y += 10;
    });
  }
  
  // Skills
  if (resume.skills && resume.skills.length > 0) {
    doc.setFontSize(16);
    doc.text('Skills', 20, y);
    y += 10;
    
    doc.setFontSize(12);
    const skillsText = resume.skills.map(skill => skill.name).join(', ');
    const skillsLines = doc.splitTextToSize(skillsText, 170);
    doc.text(skillsLines, 20, y);
    y += skillsLines.length * 5 + 10;
  }
  
  const pdfBytes = doc.output('arraybuffer');
  return Buffer.from(pdfBytes);
}