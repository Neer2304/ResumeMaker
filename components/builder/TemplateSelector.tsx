import React, { useState } from 'react'
import { Check, Palette, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TemplateConfig } from '@/types'

interface TemplateSelectorProps {
  currentTemplate: TemplateConfig
  onChange: (template: TemplateConfig) => void
}

const templates = [
  {
    id: 'modern',
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
    },
    thumbnail: '/templates/modern.svg',
    description: 'Clean and contemporary design with blue accents',
    popular: true
  },
  {
    id: 'professional',
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
    },
    thumbnail: '/templates/professional.svg',
    description: 'Formal and traditional layout',
    popular: true
  },
  {
    id: 'creative',
    name: 'Creative',
    category: 'creative',
    colors: {
      primary: '#7C3AED',
      secondary: '#8B5CF6',
      background: '#F9FAFB',
      text: '#374151'
    },
    font: {
      heading: 'Poppins',
      body: 'Open Sans'
    },
    thumbnail: '/templates/creative.svg',
    description: 'Modern with creative color palette',
    popular: false
  },
  {
    id: 'minimal',
    name: 'Minimal',
    category: 'minimal',
    colors: {
      primary: '#000000',
      secondary: '#333333',
      background: '#FFFFFF',
      text: '#000000'
    },
    font: {
      heading: 'Helvetica',
      body: 'Helvetica'
    },
    thumbnail: '/templates/minimal.svg',
    description: 'Simple and clean black & white design',
    popular: false
  },
  {
    id: 'executive',
    name: 'Executive',
    category: 'professional',
    colors: {
      primary: '#0F766E',
      secondary: '#14B8A6',
      background: '#FFFFFF',
      text: '#134E4A'
    },
    font: {
      heading: 'Georgia',
      body: 'Georgia'
    },
    thumbnail: '/templates/executive.svg',
    description: 'Elegant design for executive positions',
    popular: false
  },
  {
    id: 'bold',
    name: 'Bold',
    category: 'creative',
    colors: {
      primary: '#DC2626',
      secondary: '#EF4444',
      background: '#FFFFFF',
      text: '#1F2937'
    },
    font: {
      heading: 'Montserrat',
      body: 'Roboto'
    },
    thumbnail: '/templates/bold.svg',
    description: 'Bold colors for standout resumes',
    popular: false
  }
]

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  currentTemplate,
  onChange
}) => {
  const [previewTemplate, setPreviewTemplate] = useState<TemplateConfig | null>(null)

  const handleTemplateSelect = (template: typeof templates[0]) => {
    onChange({
      name: template.name,
      category: template.category as TemplateConfig['category'],
      colors: template.colors,
      font: template.font
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Choose a Template</h2>
        <p className="text-gray-600">
          Select a template that matches your style and industry
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const isSelected = currentTemplate.name === template.name
          const isPopular = template.popular

          return (
            <div
              key={template.id}
              className={`
                relative border-2 rounded-lg overflow-hidden transition-all
                ${isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200'}
                hover:border-gray-300 hover:shadow-lg
              `}
            >
              {isPopular && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2 py-1 text-xs font-semibold bg-yellow-500 text-white rounded-full">
                    Popular
                  </span>
                </div>
              )}

              {isSelected && (
                <div className="absolute top-3 right-3 z-10">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}

              {/* Template Preview */}
              <div 
                className="h-48 bg-gray-100 relative cursor-pointer"
                onClick={() => setPreviewTemplate(template)}
                style={{ backgroundColor: template.colors.background }}
              >
                {/* Mock resume content */}
                <div className="p-4 h-full flex flex-col justify-between">
                  <div>
                    <div 
                      className="h-4 rounded mb-2"
                      style={{ backgroundColor: template.colors.primary, width: '60%' }}
                    />
                    <div 
                      className="h-3 rounded mb-1"
                      style={{ backgroundColor: template.colors.secondary, width: '40%' }}
                    />
                    <div 
                      className="h-2 rounded"
                      style={{ backgroundColor: template.colors.text, opacity: 0.3, width: '80%' }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div 
                      className="h-2 rounded"
                      style={{ backgroundColor: template.colors.text, opacity: 0.2 }}
                    />
                    <div 
                      className="h-2 rounded"
                      style={{ backgroundColor: template.colors.text, opacity: 0.2 }}
                    />
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-4 bg-white">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                  <button
                    onClick={() => setPreviewTemplate(template)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                    title="Preview template"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex space-x-2">
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: template.colors.primary }}
                      title="Primary color"
                    />
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: template.colors.secondary }}
                      title="Secondary color"
                    />
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: template.colors.background }}
                      title="Background color"
                    />
                  </div>

                  <Button
                    size="sm"
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    {isSelected ? 'Selected' : 'Select'}
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Color Customizer */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-6">
        <div className="flex items-center space-x-2">
          <Palette className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold">Customize Colors</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Primary Color</label>
            <input
              type="color"
              value={currentTemplate.colors.primary}
              onChange={(e) => onChange({
                ...currentTemplate,
                colors: { ...currentTemplate.colors, primary: e.target.value }
              })}
              className="w-full h-10 cursor-pointer rounded border"
            />
            <div className="mt-1 text-xs text-gray-500">
              Used for headings and highlights
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Secondary Color</label>
            <input
              type="color"
              value={currentTemplate.colors.secondary}
              onChange={(e) => onChange({
                ...currentTemplate,
                colors: { ...currentTemplate.colors, secondary: e.target.value }
              })}
              className="w-full h-10 cursor-pointer rounded border"
            />
            <div className="mt-1 text-xs text-gray-500">
              Used for subheadings and accents
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Background</label>
            <input
              type="color"
              value={currentTemplate.colors.background}
              onChange={(e) => onChange({
                ...currentTemplate,
                colors: { ...currentTemplate.colors, background: e.target.value }
              })}
              className="w-full h-10 cursor-pointer rounded border"
            />
            <div className="mt-1 text-xs text-gray-500">
              Resume background color
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Text Color</label>
            <input
              type="color"
              value={currentTemplate.colors.text}
              onChange={(e) => onChange({
                ...currentTemplate,
                colors: { ...currentTemplate.colors, text: e.target.value }
              })}
              className="w-full h-10 cursor-pointer rounded border"
            />
            <div className="mt-1 text-xs text-gray-500">
              Main text color
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">Preview: {previewTemplate.name}</h3>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 overflow-auto max-h-[calc(90vh-80px)]">
              <div 
                className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg"
                style={{ backgroundColor: previewTemplate.colors.background }}
              >
                {/* Mock resume preview */}
                <div style={{ color: previewTemplate.colors.text }}>
                  <div className="text-center mb-8">
                    <h1 
                      className="text-3xl font-bold mb-2"
                      style={{ color: previewTemplate.colors.primary }}
                    >
                      JOHN DOE
                    </h1>
                    <h2 className="text-xl mb-4" style={{ color: previewTemplate.colors.secondary }}>
                      Senior Software Engineer
                    </h2>
                    <div className="flex justify-center space-x-4 text-sm">
                      <span>john@example.com</span>
                      <span>•</span>
                      <span>+1 (555) 123-4567</span>
                      <span>•</span>
                      <span>San Francisco, CA</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 
                        className="text-lg font-bold mb-3 pb-2 border-b"
                        style={{ borderColor: previewTemplate.colors.primary }}
                      >
                        Professional Summary
                      </h3>
                      <p className="text-gray-700">
                        Experienced software engineer with 8+ years in full-stack development. 
                        Passionate about building scalable applications and mentoring junior developers.
                      </p>
                    </div>

                    <div>
                      <h3 
                        className="text-lg font-bold mb-3 pb-2 border-b"
                        style={{ borderColor: previewTemplate.colors.primary }}
                      >
                        Work Experience
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between">
                            <h4 className="font-semibold">Senior Software Engineer</h4>
                            <span className="text-sm" style={{ color: previewTemplate.colors.secondary }}>
                              2020 - Present
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">Google Inc. • Mountain View, CA</p>
                          <p className="mt-2 text-sm">
                            Led a team of 5 developers in building cloud-native applications...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  This is a preview of how your resume will look
                </div>
                <div className="space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setPreviewTemplate(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      handleTemplateSelect(previewTemplate)
                      setPreviewTemplate(null)
                    }}
                  >
                    Use This Template
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TemplateSelector