import mongoose, { Schema, Document } from 'mongoose';

export interface IResume extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    jobTitle: string;
    summary: string;
    website?: string;
    linkedin?: string;
    github?: string;
    photo?: string;
  };
  workExperience: Array<{
    id: string;
    jobTitle: string;
    employer: string;
    city: string;
    country: string;
    startDate: Date;
    endDate: Date;
    current: boolean;
    description: string;
    achievements: string[];
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    city: string;
    country: string;
    startDate: Date;
    endDate: Date;
    current: boolean;
    description: string;
    gpa?: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    category?: string;
    keywords: string[];
  }>;
  template: {
    name: string;
    category: 'professional' | 'creative' | 'modern' | 'minimal';
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    font: {
      heading: string;
      body: string;
    };
  };
  visibility: 'private' | 'public' | 'unlisted';
  viewCount: number;
  lastModified: Date;
  createdAt: Date;
}

const ResumeSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'My Resume' },
  slug: { type: String, unique: true, sparse: true },
  personalInfo: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    country: String,
    postalCode: String,
    jobTitle: String,
    summary: String,
    website: String,
    linkedin: String,
    github: String,
    photo: String
  },
  workExperience: [{
    id: String,
    jobTitle: String,
    employer: String,
    city: String,
    country: String,
    startDate: Date,
    endDate: Date,
    current: { type: Boolean, default: false },
    description: String,
    achievements: [String]
  }],
  education: [{
    id: String,
    degree: String,
    school: String,
    city: String,
    country: String,
    startDate: Date,
    endDate: Date,
    current: { type: Boolean, default: false },
    description: String,
    gpa: String
  }],
  skills: [{
    id: String,
    name: String,
    level: { 
      type: String, 
      enum: ['beginner', 'intermediate', 'advanced', 'expert'] 
    },
    category: String,
    keywords: [String]
  }],
  projects: [{
    id: String,
    title: String,
    description: String,
    url: String,
    technologies: [String],
    startDate: Date,
    endDate: Date
  }],
  certifications: [{
    id: String,
    name: String,
    issuer: String,
    date: Date,
    credentialId: String,
    url: String
  }],
  languages: [{
    id: String,
    language: String,
    proficiency: { 
      type: String, 
      enum: ['basic', 'conversational', 'professional', 'native'] 
    }
  }],
  hobbies: [String],
  references: [{
    id: String,
    name: String,
    position: String,
    company: String,
    email: String,
    phone: String
  }],
  template: {
    name: String,
    category: { 
      type: String, 
      enum: ['professional', 'creative', 'modern', 'minimal'] 
    },
    colors: {
      primary: String,
      secondary: String,
      background: String,
      text: String
    },
    font: {
      heading: String,
      body: String
    }
  },
  settings: {
    margin: { type: Number, default: 20 },
    fontSize: { type: Number, default: 12 },
    lineHeight: { type: Number, default: 1.5 },
    pageSize: { type: String, default: 'A4' }
  },
  visibility: { 
    type: String, 
    enum: ['private', 'public', 'unlisted'], 
    default: 'private' 
  },
  viewCount: { type: Number, default: 0 },
  lastModified: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

ResumeSchema.index({ user: 1, createdAt: -1 });
ResumeSchema.index({ slug: 1 });
ResumeSchema.index({ visibility: 1, createdAt: -1 });

export default mongoose.models.Resume || mongoose.model<IResume>('Resume', ResumeSchema);