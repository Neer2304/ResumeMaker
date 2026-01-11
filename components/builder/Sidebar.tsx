import React from 'react'
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Palette,
  Download,
  Share2,
  Eye,
  Settings,
  FileText,
  Award,
  Globe,
  Heart
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  resume: any
}

const sections = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'work', label: 'Work Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: FileText },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'languages', label: 'Languages', icon: Globe },
  { id: 'hobbies', label: 'Hobbies', icon: Heart },
]

const actions = [
  { id: 'template', label: 'Template', icon: Palette },
  { id: 'preview', label: 'Preview', icon: Eye },
  { id: 'export', label: 'Export', icon: Download },
  { id: 'share', label: 'Share', icon: Share2 },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange,
  resume 
}) => {
  return (
    <div className="w-64 h-full bg-white border-r flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Resume Builder</h2>
        <p className="text-sm text-gray-500 truncate">{resume?.title || 'Untitled Resume'}</p>
      </div>

      {/* Sections */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Sections
        </h3>
        <div className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon
            const isActive = activeSection === section.id
            
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-gray-100 text-gray-700"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{section.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Actions
        </h3>
        <div className="space-y-1">
          {actions.map((action) => {
            const Icon = action.icon
            
            return (
              <button
                key={action.id}
                onClick={() => onSectionChange(action.id)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                  activeSection === action.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-gray-100 text-gray-700"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{action.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Status */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Auto-save</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-600">Saved</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar