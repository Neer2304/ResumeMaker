'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  FileText, 
  Eye, 
  Download,
  Edit,
  Trash2,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useResume } from '@/hooks/useResume';
import { resumeService } from '@/services/resumeService';
import { Resume } from '@/types';
import { formatDate } from '@/lib/utils';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      setLoading(true);
      const response = await resumeService.getResumes(1, 20, searchTerm);
      // Extract resumes from response
      const resumesData = response.data || response.resumes || [];
      setResumes(resumesData);
    } catch (error) {
      console.error('Failed to load resumes:', error);
      setResumes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateResume = async () => {
    try {
      console.log('Creating resume...');
      
      // First, let's test the API endpoint directly
      const testResponse = await fetch('/api/resumes', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Untitled Resume',
          template: 'modern'
        }),
      });
      
      const result = await testResponse.json();
      console.log('Direct API Response:', result);
      
      if (!testResponse.ok) {
        throw new Error(result.error || 'Failed to create resume');
      }
      
      // Now try with the service
      const response = await resumeService.createResume({
        title: 'Untitled Resume',
        template: 'modern'
      });
      
      console.log('Service Response:', response);
      
      // Handle different response structures
      let newResume;
      if (response && typeof response === 'object') {
        if (response.data) {
          newResume = response.data; // If response has data property
        } else if (response._id) {
          newResume = response; // If response is already the resume
        } else {
          newResume = response; // Fallback
        }
      }
      
      console.log('New Resume:', newResume);
      
      if (newResume && newResume._id) {
        console.log('Navigating to resume:', newResume._id);
        router.push(`/builder/${newResume._id}`);
      } else {
        console.error('No _id found in response:', newResume);
        throw new Error('Failed to create resume - invalid response structure');
      }
    } catch (error: any) {
      console.error('Failed to create resume:', error);
      alert(`Error creating resume: ${error.message}`);
    }
  };

  const handleDeleteResume = async (id: string) => {
    try {
      await resumeService.deleteResume(id);
      setResumes(resumes.filter(resume => resume._id !== id));
      setShowDeleteModal(null);
    } catch (error) {
      console.error('Failed to delete resume:', error);
    }
  };

  const handleDuplicateResume = async (resume: Resume) => {
    try {
      // Create a new resume with the same data
      const duplicated = await resumeService.createResume({
        ...resume,
        title: `${resume.title} (Copy)`,
      });
      
      // Handle response structure
      const newResume = duplicated.data || duplicated;
      
      if (newResume && newResume._id) {
        setResumes([newResume, ...resumes]);
      }
    } catch (error) {
      console.error('Failed to duplicate resume:', error);
    }
  };

  const filteredResumes = Array.isArray(resumes) ? resumes.filter(resume => {
    if (!resume) return false;
    
    if (filter === 'recent') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(resume.lastModified) > weekAgo;
    }
    if (filter === 'popular') {
      return resume.viewCount > 10;
    }
    return true;
  }) : [];

  const totalViews = Array.isArray(resumes) 
    ? resumes.reduce((sum, resume) => sum + (resume?.viewCount || 0), 0)
    : 0;

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {user?.name || 'User'}!
              </p>
            </div>
            <Button onClick={handleCreateResume}>
              <Plus className="w-4 h-4 mr-2" />
              Create New Resume
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Resumes</p>
                  <p className="text-3xl font-bold mt-2">{resumes.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-3xl font-bold mt-2">{totalViews}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="text-3xl font-bold mt-2">
                    {resumes.length > 0 && resumes[0] 
                      ? formatDate(resumes[0].lastModified) 
                      : 'Never'
                    }
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search resumes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === 'Enter' && loadResumes()}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white"
              >
                <option value="all">All Resumes</option>
                <option value="recent">Recent</option>
                <option value="popular">Popular</option>
              </select>
              <Button variant="outline" onClick={loadResumes}>
                <Filter className="w-4 h-4 mr-2" />
                Apply
              </Button>
            </div>
          </div>
        </div>

        {/* Resumes Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredResumes.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No resumes found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? 'No resumes match your search. Try different keywords.'
                  : 'Create your first resume to get started.'
                }
              </p>
              <Button onClick={handleCreateResume}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Resume
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResumes.map((resume) => (
              <Card key={resume._id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold truncate">
                        {resume.title}
                      </CardTitle>
                      <CardDescription className="truncate">
                        {resume.personalInfo?.jobTitle || 'No job title'}
                      </CardDescription>
                    </div>
                    <div className="relative group">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                      </button>
                      <div className="absolute right-0 mt-1 w-48 bg-white border rounded-lg shadow-lg z-10 hidden group-hover:block">
                        <button
                          onClick={() => router.push(`/builder/${resume._id}`)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDuplicateResume(resume)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Duplicate
                        </button>
                        <button
                          onClick={() => setShowDeleteModal(resume._id)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600 flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Last Modified</span>
                      <span>{formatDate(resume.lastModified)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Views</span>
                      <span>{resume.viewCount || 0}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Template</span>
                      <span className="capitalize">{resume.template?.name || 'Modern'}</span>
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => router.push(`/builder/${resume._id}`)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={async () => {
                          try {
                            const blob = await resumeService.exportPDF(resume._id);
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `${resume.title}.pdf`;
                            a.click();
                          } catch (error) {
                            console.error('Export failed:', error);
                            alert('Failed to export resume');
                          }
                        }}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Delete Resume</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this resume? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteResume(showDeleteModal)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}