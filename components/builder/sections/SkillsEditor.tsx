import React, { useState } from 'react'
import { Plus, Trash2, Star, StarOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Skill } from '@/types'
import { v4 as uuidv4 } from 'uuid'

interface SkillsEditorProps {
  skills: Skill[]
  onChange: (skills: Skill[]) => void
}

const skillCategories = [
  { value: 'programming', label: 'Programming Languages' },
  { value: 'framework', label: 'Frameworks & Libraries' },
  { value: 'database', label: 'Databases' },
  { value: 'cloud', label: 'Cloud & DevOps' },
  { value: 'design', label: 'Design Tools' },
  { value: 'soft', label: 'Soft Skills' },
  { value: 'language', label: 'Languages' },
  { value: 'other', label: 'Other' },
]

const skillLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' },
]

const SkillsEditor: React.FC<SkillsEditorProps> = ({
  skills,
  onChange
}) => {
  const [skillName, setSkillName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('intermediate')

  const addSkill = () => {
    if (!skillName.trim()) return

    const newSkill: Skill = {
      id: uuidv4(),
      name: skillName.trim(),
      category: selectedCategory || undefined,
      level: selectedLevel as Skill['level'],
      keywords: []
    }

    onChange([...skills, newSkill])
    setSkillName('')
    setSelectedCategory('')
    setSelectedLevel('intermediate')
  }

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    const updated = skills.map(skill =>
      skill.id === id ? { ...skill, ...updates } : skill
    )
    onChange(updated)
  }

  const deleteSkill = (id: string) => {
    const filtered = skills.filter(skill => skill.id !== id)
    onChange(filtered)
  }

  const addKeyword = (skillId: string, keyword: string) => {
    if (!keyword.trim()) return

    const skill = skills.find(s => s.id === skillId)
    if (skill) {
      updateSkill(skillId, {
        keywords: [...skill.keywords, keyword.trim()]
      })
    }
  }

  const removeKeyword = (skillId: string, keywordIndex: number) => {
    const skill = skills.find(s => s.id === skillId)
    if (skill) {
      const newKeywords = skill.keywords.filter((_, i) => i !== keywordIndex)
      updateSkill(skillId, { keywords: newKeywords })
    }
  }

  const getLevelStars = (level: string) => {
    const stars = {
      beginner: 1,
      intermediate: 2,
      advanced: 3,
      expert: 4
    }
    
    return Array.from({ length: 4 }, (_, i) => (
      i < stars[level as keyof typeof stars] 
        ? <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        : <StarOff key={i} className="w-4 h-4 text-gray-300" />
    ))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Skills</h2>
        <p className="text-gray-600">
          Add your skills and proficiency levels
        </p>
      </div>

      {/* Add Skill Form */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <h3 className="font-semibold">Add New Skill</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Skill Name"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            placeholder="e.g., React, Python, Project Management"
            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
          />

          <Select
            label="Category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            options={skillCategories}
          />

          <Select
            label="Proficiency Level"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            options={skillLevels}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={addSkill} disabled={!skillName.trim()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </div>
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Your Skills ({skills.length})</h3>
          {skills.length > 0 && (
            <div className="text-sm text-gray-500">
              Drag to reorder skills
            </div>
          )}
        </div>

        {skills.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No skills added
            </h3>
            <p className="text-gray-500 mb-4">
              Add your skills to showcase your expertise.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="border rounded-lg p-4 hover:border-gray-400 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{skill.name}</h4>
                    {skill.category && (
                      <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {skillCategories.find(c => c.value === skill.category)?.label || skill.category}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Proficiency</span>
                      <span className="text-sm font-medium capitalize">
                        {skill.level}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      {getLevelStars(skill.level)}
                    </div>
                  </div>

                  {/* Keywords */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Keywords</span>
                      <div className="flex space-x-1">
                        <Input
                          placeholder="Add keyword"
                          className="h-8 text-sm"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                              addKeyword(skill.id, e.currentTarget.value)
                              e.currentTarget.value = ''
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800"
                        >
                          {keyword}
                          <button
                            onClick={() => removeKeyword(skill.id, index)}
                            className="ml-1 text-gray-500 hover:text-red-500"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {skill.keywords.length === 0 && (
                        <span className="text-sm text-gray-400">
                          No keywords added
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SkillsEditor