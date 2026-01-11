import React, { useState } from 'react'
import { Plus, Trash2, ChevronUp, ChevronDown, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select } from '@/components/ui/select'
import { Education } from '@/types'
import { v4 as uuidv4 } from 'uuid'

interface EducationEditorProps {
  education: Education[]
  onChange: (education: Education[]) => void
}

const degreeOptions = [
  { value: 'high-school', label: 'High School Diploma' },
  { value: 'associate', label: "Associate's Degree" },
  { value: 'bachelor', label: "Bachelor's Degree" },
  { value: 'master', label: "Master's Degree" },
  { value: 'phd', label: 'PhD' },
  { value: 'certificate', label: 'Certificate' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'other', label: 'Other' },
]

const EducationEditor: React.FC<EducationEditorProps> = ({
  education,
  onChange
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const addEducation = () => {
    const newEdu: Education = {
      id: uuidv4(),
      degree: '',
      school: '',
      city: '',
      country: '',
      startDate: null,
      endDate: null,
      current: false,
      description: '',
      gpa: ''
    }
    onChange([...education, newEdu])
    setExpandedId(newEdu.id)
  }

  const updateEducation = (id: string, updates: Partial<Education>) => {
    const updated = education.map(edu =>
      edu.id === id ? { ...edu, ...updates } : edu
    )
    onChange(updated)
  }

  const deleteEducation = (id: string) => {
    const filtered = education.filter(edu => edu.id !== id)
    onChange(filtered)
    if (expandedId === id) setExpandedId(null)
  }

  const moveEducation = (id: string, direction: 'up' | 'down') => {
    const index = education.findIndex(edu => edu.id === id)
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === education.length - 1)
    ) {
      return
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1
    const newEducation = [...education]
    const [moved] = newEducation.splice(index, 1)
    newEducation.splice(newIndex, 0, moved)
    onChange(newEducation)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Education</h2>
          <p className="text-gray-600">
            List your educational background in reverse chronological order
          </p>
        </div>
        <Button onClick={addEducation} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      <div className="space-y-4">
        {education.map((edu, index) => (
          <div
            key={edu.id}
            className="border rounded-lg overflow-hidden"
          >
            {/* Header */}
            <div
              className="p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
              onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
            >
              <div className="flex-1">
                <h3 className="font-semibold">
                  {edu.degree || 'Add Degree'}
                </h3>
                <p className="text-sm text-gray-600">
                  {edu.school || 'School name'} • {edu.city || 'City'}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      moveEducation(edu.id, 'up')
                    }}
                    className="p-1 hover:bg-gray-200 rounded"
                    disabled={index === 0}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      moveEducation(edu.id, 'down')
                    }}
                    className="p-1 hover:bg-gray-200 rounded"
                    disabled={index === education.length - 1}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteEducation(edu.id)
                  }}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            {expandedId === edu.id && (
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Degree"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    options={degreeOptions}
                    required
                  />

                  <Input
                    label="School/University"
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                    placeholder="Harvard University"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="City"
                    value={edu.city || ''}
                    onChange={(e) => updateEducation(edu.id, { city: e.target.value })}
                    placeholder="Cambridge"
                  />

                  <Input
                    label="Country"
                    value={edu.country || ''}
                    onChange={(e) => updateEducation(edu.id, { country: e.target.value })}
                    placeholder="United States"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Start Date
                    </label>
                    <Input
                      type="month"
                      value={edu.startDate ? new Date(edu.startDate).toISOString().slice(0, 7) : ''}
                      onChange={(e) => updateEducation(edu.id, { 
                        startDate: e.target.value ? new Date(e.target.value + '-01') : null 
                      })}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      End Date
                    </label>
                    <div className="space-y-2">
                      {!edu.current && (
                        <Input
                          type="month"
                          value={edu.endDate ? new Date(edu.endDate).toISOString().slice(0, 7) : ''}
                          onChange={(e) => updateEducation(edu.id, { 
                            endDate: e.target.value ? new Date(e.target.value + '-01') : null 
                          })}
                          disabled={edu.current}
                        />
                      )}
                      <Checkbox
                        label="I currently study here"
                        checked={edu.current}
                        onChange={(e) => updateEducation(edu.id, { 
                          current: e.target.checked,
                          endDate: e.target.checked ? null : edu.endDate
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="GPA"
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                    placeholder="3.8/4.0"
                    helperText="Format: 3.8/4.0 or 9.5/10"
                  />

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Field of Study
                    </label>
                    <Input
                      value={edu.description.split(' - ')[0] || ''}
                      onChange={(e) => {
                        const desc = edu.description.split(' - ')
                        desc[0] = e.target.value
                        updateEducation(edu.id, { description: desc.join(' - ') })
                      }}
                      placeholder="Computer Science"
                    />
                  </div>
                </div>

                <Textarea
                  label="Additional Details"
                  value={edu.description.split(' - ')[1] || edu.description}
                  onChange={(e) => {
                    const field = edu.description.split(' - ')[0] || ''
                    updateEducation(edu.id, { 
                      description: field ? `${field} - ${e.target.value}` : e.target.value 
                    })
                  }}
                  placeholder="Honors, awards, relevant coursework, or achievements..."
                  rows={3}
                />
              </div>
            )}
          </div>
        ))}

        {education.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <GraduationCap className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No education added
            </h3>
            <p className="text-gray-500 mb-4">
              Add your educational background to showcase your qualifications.
            </p>
            <Button onClick={addEducation}>
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default EducationEditor