import React from 'react'
import PersonalInfoEditor from './sections/PersonalInfoEditor'
import WorkExperienceEditor from './sections/WorkExperienceEditor'
import EducationEditor from './sections/EducationEditor'
import SkillsEditor from './sections/SkillsEditor'
import TemplateSelector from './TemplateSelector'
import SettingsEditor from './SettingsEditor'

interface EditorPanelProps {
  section: string
  resume: any
  onChange: (updates: any) => void
}

const EditorPanel: React.FC<EditorPanelProps> = ({ 
  section, 
  resume, 
  onChange 
}) => {
  const renderSection = () => {
    switch (section) {
      case 'personal':
        return (
          <PersonalInfoEditor
            personalInfo={resume?.personalInfo || {}}
            onChange={(updates) => onChange({ personalInfo: updates })}
          />
        )
      
      case 'work':
        return (
          <WorkExperienceEditor
            experiences={resume?.workExperience || []}
            onChange={(experiences) => onChange({ workExperience: experiences })}
          />
        )
      
      case 'education':
        return (
          <EducationEditor
            education={resume?.education || []}
            onChange={(education) => onChange({ education })}
          />
        )
      
      case 'skills':
        return (
          <SkillsEditor
            skills={resume?.skills || []}
            onChange={(skills) => onChange({ skills })}
          />
        )
      
      case 'template':
        return (
          <TemplateSelector
            currentTemplate={resume?.template}
            onChange={(template) => onChange({ template })}
          />
        )
      
      case 'settings':
        return (
          <SettingsEditor
            settings={resume?.settings || {}}
            onChange={(settings) => onChange({ settings })}
          />
        )
      
      default:
        return (
          <div className="p-8 text-center text-gray-500">
            Select a section to start editing
          </div>
        )
    }
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorPanel