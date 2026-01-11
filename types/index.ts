// -----------------------------------------------------------------------------
// USER & AUTH
// -----------------------------------------------------------------------------
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  subscription: {
    plan: 'free' | 'premium' | 'business';
    expiresAt?: Date;
    features: string[];
  };
}

// -----------------------------------------------------------------------------
// RESUME CORE TYPES
// -----------------------------------------------------------------------------
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location?: string;          // e.g. "Surat, Gujarat, India"
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  jobTitle: string;
  summary?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  photo?: string;             // URL to photo
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;            // ← standardized (not employer)
  location?: string;
  startDate: Date | null;
  endDate: Date | null;
  current: boolean;
  description?: string;
  achievements?: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  fieldOfStudy?: string;
  location?: string;
  startDate: Date | null;
  endDate: Date | null;
  current: boolean;
  description?: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category?: string;
  keywords?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate?: Date | null;
  endDate?: Date | null;
  current?: boolean;
  url?: string;
  technologies?: string[];
  role?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: Date | null;
  expiryDate?: Date | null;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'native' | 'fluent' | 'advanced' | 'intermediate' | 'basic';
}

export interface Hobby {
  id: string;
  name: string;
  description?: string;
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
}

// -----------------------------------------------------------------------------
// TEMPLATE & SETTINGS
// -----------------------------------------------------------------------------
export interface TemplateConfig {
  name: string;
  category: 'professional' | 'creative' | 'modern' | 'minimal' | 'academic';
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
    background: string;
    text: string;
  };
  font: {
    heading: string;
    body: string;
  };
}

export interface ResumeSettings {
  margin: number;               // in mm
  fontSize: number;             // base font size in pt
  lineHeight: number;           // multiplier
  pageSize: 'A4' | 'Letter' | 'Legal';
  showPhoto: boolean;
  twoColumns?: boolean;
}

// -----------------------------------------------------------------------------
// MAIN RESUME TYPE
// -----------------------------------------------------------------------------
export interface Resume {
  _id: string;
  user: string;                 // user id
  title: string;
  slug: string;

  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];

  // Additional sections - no more any[]
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  hobbies: Hobby[];
  references: Reference[];

  template: TemplateConfig;
  settings: ResumeSettings;

  visibility: 'private' | 'public' | 'unlisted';
  viewCount: number;
  lastModified: Date;
  createdAt: Date;
}

// -----------------------------------------------------------------------------
// UTILITY / API TYPES
// -----------------------------------------------------------------------------
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}