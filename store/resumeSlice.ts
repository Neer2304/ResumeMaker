import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Resume, PersonalInfo, WorkExperience, Education, Skill } from '@/types';
import { resumeService } from '@/services/resumeService';

interface ResumeState {
  currentResume: Resume | null;
  resumes: Resume[];
  loading: boolean;
  error: string | null;
  autosaveStatus: 'idle' | 'saving' | 'saved' | 'error';
}

const initialState: ResumeState = {
  currentResume: null,
  resumes: [],
  loading: false,
  error: null,
  autosaveStatus: 'idle',
};

export const fetchResumes = createAsyncThunk(
  'resume/fetchResumes',
  async (params: { page?: number; limit?: number; search?: string }) => {
    const response = await resumeService.getResumes(
      params.page || 1,
      params.limit || 10,
      params.search || ''
    );
    return response;
  }
);

export const fetchResume = createAsyncThunk(
  'resume/fetchResume',
  async (id: string) => {
    const resume = await resumeService.getResume(id);
    return resume;
  }
);

export const createResume = createAsyncThunk(
  'resume/createResume',
  async (data: Partial<Resume>) => {
    const resume = await resumeService.createResume(data);
    return resume;
  }
);

export const updateResume = createAsyncThunk(
  'resume/updateResume',
  async ({ id, data }: { id: string; data: Partial<Resume> }) => {
    const resume = await resumeService.updateResume(id, data);
    return resume;
  }
);

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    // Add this reducer at the beginning
    setCurrentResume: (state, action: PayloadAction<Resume>) => {
      state.currentResume = action.payload;
    },
    
    updatePersonalInfo: (state, action: PayloadAction<Partial<PersonalInfo>>) => {
      if (state.currentResume) {
        state.currentResume.personalInfo = {
          ...state.currentResume.personalInfo,
          ...action.payload,
        };
        state.autosaveStatus = 'saving';
      }
    },
    addWorkExperience: (state, action: PayloadAction<WorkExperience>) => {
      if (state.currentResume) {
        state.currentResume.workExperience.push(action.payload);
        state.autosaveStatus = 'saving';
      }
    },
    updateWorkExperience: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<WorkExperience> }>
    ) => {
      if (state.currentResume) {
        const index = state.currentResume.workExperience.findIndex(
          exp => exp.id === action.payload.id
        );
        if (index !== -1) {
          state.currentResume.workExperience[index] = {
            ...state.currentResume.workExperience[index],
            ...action.payload.updates,
          };
          state.autosaveStatus = 'saving';
        }
      }
    },
    removeWorkExperience: (state, action: PayloadAction<string>) => {
      if (state.currentResume) {
        state.currentResume.workExperience = 
          state.currentResume.workExperience.filter(exp => exp.id !== action.payload);
        state.autosaveStatus = 'saving';
      }
    },
    addEducation: (state, action: PayloadAction<Education>) => {
      if (state.currentResume) {
        state.currentResume.education.push(action.payload);
        state.autosaveStatus = 'saving';
      }
    },
    addSkill: (state, action: PayloadAction<Skill>) => {
      if (state.currentResume) {
        state.currentResume.skills.push(action.payload);
        state.autosaveStatus = 'saving';
      }
    },
    updateTemplate: (state, action: PayloadAction<Partial<Resume['template']>>) => {
      if (state.currentResume) {
        state.currentResume.template = {
          ...state.currentResume.template,
          ...action.payload,
        };
        state.autosaveStatus = 'saving';
      }
    },
    setAutosaveStatus: (
      state,
      action: PayloadAction<'idle' | 'saving' | 'saved' | 'error'>
    ) => {
      state.autosaveStatus = action.payload;
    },
    clearCurrentResume: (state) => {
      state.currentResume = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumes.fulfilled, (state, action) => {
        state.loading = false;
        // Handle both response structures
        state.resumes = action.payload.data || action.payload.resumes || action.payload;
      })
      .addCase(fetchResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch resumes';
      })
      .addCase(fetchResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResume.fulfilled, (state, action) => {
        state.loading = false;
        // Handle both response structures
        state.currentResume = action.payload.data || action.payload;
      })
      .addCase(fetchResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch resume';
      })
      .addCase(createResume.fulfilled, (state, action) => {
        // Handle both response structures
        const resume = action.payload.data || action.payload;
        state.currentResume = resume;
        state.resumes.unshift(resume);
      })
      .addCase(updateResume.fulfilled, (state, action) => {
        // Handle both response structures
        const resume = action.payload.data || action.payload;
        state.currentResume = resume;
        const index = state.resumes.findIndex(r => r._id === resume._id);
        if (index !== -1) {
          state.resumes[index] = resume;
        }
        state.autosaveStatus = 'saved';
      })
      .addCase(updateResume.rejected, (state) => {
        state.autosaveStatus = 'error';
      });
  },
});

export const {
  setCurrentResume,
  updatePersonalInfo,
  addWorkExperience,
  updateWorkExperience,
  removeWorkExperience,
  addEducation,
  addSkill,
  updateTemplate,
  setAutosaveStatus,
  clearCurrentResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;