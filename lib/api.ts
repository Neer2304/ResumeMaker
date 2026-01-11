import { User } from "@/types";

// @/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data.error || data.message || 'Something went wrong');
  }

  return data;
}

export const api = {
  // Auth endpoints
  auth: {
    login: (credentials: LoginCredentials) => 
      request<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    
    register: (data: RegisterData) => 
      request<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    
    logout: () => 
      request('/auth/logout', {
        method: 'POST',
      }),
    
    me: () => 
      request<User>('/auth/me'),
    
    updateProfile: (data: Partial<User>) => 
      request<User>('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    
    changePassword: (data: { currentPassword: string; newPassword: string }) => 
      request('/auth/password', {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },

  // Resume endpoints
  resumes: {
    getAll: (params?: { page?: number; limit?: number; search?: string }) => {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.set('page', params.page.toString());
      if (params?.limit) queryParams.set('limit', params.limit.toString());
      if (params?.search) queryParams.set('search', params.search);
      
      return request<PaginatedResponse<Resume>>(`/resumes?${queryParams}`);
    },
    
    getById: (id: string) => 
      request<Resume>(`/resumes/${id}`),
    
    create: (data: Partial<Resume>) => 
      request<Resume>('/resumes', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    
    update: (id: string, data: Partial<Resume>) => 
      request<Resume>(`/resumes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    
    delete: (id: string) => 
      request(`/resumes/${id}`, {
        method: 'DELETE',
      }),
    
    duplicate: (id: string) => 
      request<Resume>(`/resumes/${id}/duplicate`, {
        method: 'POST',
      }),
    
    export: (id: string, format: 'pdf' | 'docx', options?: any) => 
      request<Blob>(`/resumes/${id}/export`, {
        method: 'POST',
        body: JSON.stringify({ format, ...options }),
      }),
  },

  // Templates endpoints
  templates: {
    getAll: () => 
      request<TemplateConfig[]>('/templates'),
    
    getDefault: () => 
      request<TemplateConfig>('/templates/default'),
  },

  // Analytics endpoints
  analytics: {
    getResumeViews: (resumeId: string) => 
      request<any>(`/analytics/resumes/${resumeId}/views`),
    
    getDashboardStats: () => 
      request<any>('/analytics/dashboard'),
  },
};

export default api;