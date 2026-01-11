// @/components/builder/sections/PersonalInfoEditor.tsx
import React from 'react';
import { Input } from '@/components/ui/input';
import { PersonalInfo } from '@/types';

interface PersonalInfoEditorProps {
  personalInfo: PersonalInfo;
  onChange: (updates: Partial<PersonalInfo>) => void;
}

const PersonalInfoEditor: React.FC<PersonalInfoEditorProps> = ({ 
  personalInfo, 
  onChange 
}) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            label="First Name"
            value={personalInfo.firstName || ''}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="John"
          />
        </div>
        <div>
          <Input
            label="Last Name"
            value={personalInfo.lastName || ''}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Doe"
          />
        </div>
      </div>
      
      <Input
        label="Email"
        type="email"
        value={personalInfo.email || ''}
        onChange={(e) => handleChange('email', e.target.value)}
        placeholder="john.doe@example.com"
      />
      
      <Input
        label="Phone"
        value={personalInfo.phone || ''}
        onChange={(e) => handleChange('phone', e.target.value)}
        placeholder="+1 (555) 123-4567"
      />
      
      <Input
        label="Job Title"
        value={personalInfo.jobTitle || ''}
        onChange={(e) => handleChange('jobTitle', e.target.value)}
        placeholder="Senior Software Engineer"
      />
      
      <div>
        <label className="text-sm font-medium mb-2 block">Summary</label>
        <textarea
          className="w-full h-32 p-3 border rounded-md"
          value={personalInfo.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Write a brief summary about yourself..."
        />
      </div>
    </div>
  );
};

export default PersonalInfoEditor;