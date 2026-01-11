// @/components/builder/PreviewPanel.tsx
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Printer, Smartphone, Monitor, ZoomIn, ZoomOut } from 'lucide-react';
import { Resume } from '@/types';
import { formatDate } from '@/lib/utils';

interface PreviewPanelProps {
  resume: Resume;
  scale?: number;
  onScaleChange?: (scale: number) => void;
  onPrint?: () => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  resume,
  scale = 1,
  onScaleChange,
  onPrint
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');

  const handleZoomIn = () => {
    if (scale < 2 && onScaleChange) {
      onScaleChange(Math.min(2, scale + 0.1));
    }
  };

  const handleZoomOut = () => {
    if (scale > 0.5 && onScaleChange) {
      onScaleChange(Math.max(0.5, scale - 0.1));
    }
  };

  const renderResumeContent = () => {
    const { personalInfo, workExperience, education, skills } = resume;

    return (
      <div 
        className="bg-white p-8 shadow-lg"
        style={{ 
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          width: deviceMode === 'mobile' ? '375px' : '100%',
          margin: deviceMode === 'mobile' ? '0 auto' : '0'
        }}
      >
        {/* Personal Info */}
        <div className="mb-8 text-center">
          {personalInfo.photo && (
            <img
              src={personalInfo.photo}
              alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
          )}
          <h1 className="text-3xl font-bold text-gray-900">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.jobTitle && (
            <h2 className="text-xl text-gray-600 mt-2">{personalInfo.jobTitle}</h2>
          )}
          <div className="flex flex-wrap justify-center gap-4 mt-3 text-gray-500">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Summary</h3>
            <p className="text-gray-700">{personalInfo.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">
              Work Experience
            </h3>
            <div className="space-y-6">
              {workExperience.map((exp) => (
                <div key={exp.id} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg">{exp.jobTitle}</h4>
                      <p className="text-gray-700">{exp.company}</p>
                      {exp.location && (
                        <p className="text-gray-600 text-sm">{exp.location}</p>
                      )}
                    </div>
                    <div className="text-gray-600">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 mt-2">{exp.description}</p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-gray-700 flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{edu.degree}</h4>
                      <p className="text-gray-700">{edu.school}</p>
                      {edu.location && (
                        <p className="text-gray-600 text-sm">{edu.location}</p>
                      )}
                    </div>
                    <div className="text-gray-600">
                      {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 mt-1">{edu.description}</p>
                  )}
                  {edu.gpa && (
                    <p className="text-gray-600 text-sm mt-1">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg"
                >
                  <span className="font-medium">{skill.name}</span>
                  {skill.level && (
                    <span className="text-sm text-gray-600 ml-2">({skill.level})</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Eye className="h-5 w-5 text-gray-500" />
          <h3 className="font-semibold">Live Preview</h3>
          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
            {resume.template?.name || 'Modern'} Template
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Device Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant={deviceMode === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setDeviceMode('desktop')}
              className="h-8 px-3"
            >
              <Monitor className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">Desktop</span>
            </Button>
            <Button
              variant={deviceMode === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setDeviceMode('mobile')}
              className="h-8 px-3"
            >
              <Smartphone className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">Mobile</span>
            </Button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              disabled={scale <= 0.5}
              className="h-8 w-8"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm w-16 text-center">
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              disabled={scale >= 2}
              className="h-8 w-8"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          {/* Print Button */}
          {onPrint && (
            <Button
              variant="outline"
              size="sm"
              onClick={onPrint}
              className="ml-4"
            >
              <Printer className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Print</span>
            </Button>
          )}
        </div>
      </div>

      <CardContent className="flex-1 p-4 overflow-auto bg-gray-100">
        <div className="h-full flex justify-center items-start">
          {renderResumeContent()}
        </div>
      </CardContent>
    </Card>
  );
};

export default PreviewPanel;