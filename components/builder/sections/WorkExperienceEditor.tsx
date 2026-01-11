import React, { useState } from 'react'
import { Plus, Trash2, ChevronUp, ChevronDown, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { WorkExperience } from '@/types'
import { v4 as uuidv4 } from 'uuid'
import { formatDate } from '@/lib/utils'

interface WorkExperienceEditorProps {
  experiences: WorkExperience[]
  onChange: (experiences: WorkExperience[]) => void
}

const WorkExperienceEditor: React.FC<WorkExperienceEditorProps> = ({
  experiences,
  onChange
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const addExperience = () => {
    const newExp: WorkExperience = {
      id: uuidv4(),
      jobTitle: '',
      employer: '',
      city: '',
      country: '',
      startDate: null,
      endDate: null,
      current: false,
      description: '',
      achievements: ['']
    }
    onChange([...experiences, newExp])
    setExpandedId(newExp.id)
  }

  const updateExperience = (id: string, updates: Partial<WorkExperience>) => {
    const updated = experiences.map(exp =>
      exp.id === id ? { ...exp, ...updates } : exp
    )
    onChange(updated)
  }

  const deleteExperience = (id: string) => {
    const filtered = experiences.filter(exp => exp.id !== id)
    onChange(filtered)
    if (expandedId === id) setExpandedId(null)
  }

  const moveExperience = (id: string, direction: 'up' | 'down') => {
    const index = experiences.findIndex(exp => exp.id === id)
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === experiences.length - 1)
    ) {
      return
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1
    const newExperiences = [...experiences]
    const [moved] = newExperiences.splice(index, 1)
    newExperiences.splice(newIndex, 0, moved)
    onChange(newExperiences)
  }

  const addAchievement = (expId: string) => {
    const exp = experiences.find(e => e.id === expId)
    if (exp) {
      updateExperience(expId, {
        achievements: [...exp.achievements, '']
      })
    }
  }

  const updateAchievement = (expId: string, index: number, value: string) => {
    const exp = experiences.find(e => e.id === expId)
    if (exp) {
      const newAchievements = [...exp.achievements]
      newAchievements[index] = value
      updateExperience(expId, { achievements: newAchievements })
    }
  }

  const removeAchievement = (expId: string, index: number) => {
    const exp = experiences.find(e => e.id === expId)
    if (exp && exp.achievements.length > 1) {
      const newAchievements = exp.achievements.filter((_, i) => i !== index)
      updateExperience(expId, { achievements: newAchievements })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Work Experience</h2>
          <p className="text-gray-600">
            List your work experience in reverse chronological order
          </p>
        </div>
        <Button onClick={addExperience} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            className="border rounded-lg overflow-hidden"
          >
            {/* Header */}
            <div
              className="p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
              onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
            >
              <div className="flex-1">
                <h3 className="font-semibold">
                  {exp.jobTitle || 'Untitled Position'}
                </h3>
                <p className="text-sm text-gray-600">
                  {exp.employer || 'Company name'} • {exp.city || 'City'}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      moveExperience(exp.id, 'up')
                    }}
                    className="p-1 hover:bg-gray-200 rounded"
                    disabled={index === 0}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      moveExperience(exp.id, 'down')
                    }}
                    className="p-1 hover:bg-gray-200 rounded"
                    disabled={index === experiences.length - 1}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteExperience(exp.id)
                  }}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            {expandedId === exp.id && (
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Job Title"
                    value={exp.jobTitle}
                    onChange={(e) => updateExperience(exp.id, { jobTitle: e.target.value })}
                    placeholder="Software Engineer"
                    required
                  />

                  <Input
                    label="Employer"
                    value={exp.employer}
                    onChange={(e) => updateExperience(exp.id, { employer: e.target.value })}
                    placeholder="Google Inc."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="City"
                    value={exp.city || ''}
                    onChange={(e) => updateExperience(exp.id, { city: e.target.value })}
                    placeholder="San Francisco"
                  />

                  <Input
                    label="Country"
                    value={exp.country || ''}
                    onChange={(e) => updateExperience(exp.id, { country: e.target.value })}
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
                      value={exp.startDate ? new Date(exp.startDate).toISOString().slice(0, 7) : ''}
                      onChange={(e) => updateExperience(exp.id, { 
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
                      {!exp.current && (
                        <Input
                          type="month"
                          value={exp.endDate ? new Date(exp.endDate).toISOString().slice(0, 7) : ''}
                          onChange={(e) => updateExperience(exp.id, { 
                            endDate: e.target.value ? new Date(e.target.value + '-01') : null 
                          })}
                          disabled={exp.current}
                        />
                      )}
                      <Checkbox
                        label="I currently work here"
                        checked={exp.current}
                        onChange={(e) => updateExperience(exp.id, { 
                          current: e.target.checked,
                          endDate: e.target.checked ? null : exp.endDate
                        })}
                      />
                    </div>
                  </div>
                </div>

                <Textarea
                  label="Description"
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                  placeholder="Describe your responsibilities and achievements in this role..."
                  rows={4}
                />

                {/* Achievements */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium">Key Achievements</label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addAchievement(exp.id)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Achievement
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {exp.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="flex-1">
                          <Input
                            value={achievement}
                            onChange={(e) => updateAchievement(exp.id, index, e.target.value)}
                            placeholder="Achieved 20% cost reduction..."
                          />
                        </div>
                        {exp.achievements.length > 1 && (
                          <button
                            onClick={() => removeAchievement(exp.id, index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {experiences.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <Briefcase className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No work experience added
            </h3>
            <p className="text-gray-500 mb-4">
              Add your first work experience to showcase your professional background.
            </p>
            <Button onClick={addExperience}>
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default WorkExperienceEditor