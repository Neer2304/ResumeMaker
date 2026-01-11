// @/services/resumeService.ts
import { Resume, PaginatedResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const resumeService = {
  async getResumes(page = 1, limit = 10, search = ''): Promise<any> {
    const response = await fetch(
      `${API_URL}/resumes?page=${page}&limit=${limit}&search=${search}`,
      {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch resumes');
    }

    const result = await response.json();
    return result.data || result; // Handle both structures
  },

  async getResume(id: string): Promise<Resume> {
    const response = await fetch(`${API_URL}/resumes/${id}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch resume');
    }

    const result = await response.json();
    return result.data || result; // Handle both structures
  },

  async createResume(data: Partial<Resume>): Promise<any> {
    const response = await fetch(`${API_URL}/resumes`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create resume');
    }

    const result = await response.json();
    return result.data || result; // Handle both structures
  },

  async updateResume(id: string, data: Partial<Resume>): Promise<Resume> {
    const response = await fetch(`${API_URL}/resumes/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update resume');
    }

    const result = await response.json();
    return result.data || result; // Handle both structures
  },

  async deleteResume(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/resumes/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete resume');
    }
  },

  async exportPDF(id: string): Promise<Blob> {
    const response = await fetch(`${API_URL}/resumes/${id}/export?format=pdf`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to export resume');
    }

    return response.blob();
  },
};