export const TEMPLATES = [
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
    thumbnail: '/templates/modern.png',
    description: 'Clean and contemporary design'
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
    thumbnail: '/templates/professional.png',
    description: 'Formal and traditional layout'
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
    thumbnail: '/templates/creative.png',
    description: 'Modern with creative elements'
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
    thumbnail: '/templates/minimal.png',
    description: 'Simple and clean design'
  }
];

export const SKILL_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' }
];

export const LANGUAGE_LEVELS = [
  { value: 'basic', label: 'Basic' },
  { value: 'conversational', label: 'Conversational' },
  { value: 'professional', label: 'Professional' },
  { value: 'native', label: 'Native' }
];

export const PAGE_SIZES = [
  { value: 'A4', label: 'A4 (210 × 297 mm)' },
  { value: 'Letter', label: 'Letter (8.5 × 11 in)' },
  { value: 'Legal', label: 'Legal (8.5 × 14 in)' }
];