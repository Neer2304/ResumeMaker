'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, Download, Eye, Settings, Share2, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/builder/Sidebar';
import EditorPanel from '@/components/builder/EditorPanel';
import PreviewPanel from '@/components/builder/PreviewPanel';
import ExportModal from '@/components/common/export/ExportModal';
import { useAuth } from '@/hooks/useAuth';
import { useResume } from '@/hooks/useResume';
import { Toast } from '@/components/ui/toast';

export default function BuilderPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { resume, loading, saving, autosaveStatus, loadResume, saveResume, updateResume } = useResume();

  const [activeSection, setActiveSection] = useState('personal');
  const [previewMode, setPreviewMode] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const resumeId = params.id as string;

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (resumeId && isAuthenticated) {
      loadResume(resumeId);
    }
  }, [resumeId, isAuthenticated, loadResume]);

  const handleSave = async () => {
    try {
      await saveResume();
      setToast({ message: 'Resume saved successfully!', type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to save resume', type: 'error' });
    }
  };

  const handleBack = () => {
    router.push('/dashboard');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Resume not found</h2>
          <p className="text-gray-600 mb-6">
            The resume you're looking for doesn't exist or you don't have access.
          </p>
          <Button onClick={handleBack}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Top Bar */}
      <div className="bg-white border-b px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">{resume.title}</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>
                Last saved: {new Date(resume.lastModified).toLocaleTimeString()}
              </span>
              <span className="flex items-center">
                <span
                  className={`w-2 h-2 rounded-full mr-1 ${
                    autosaveStatus === 'saved'
                      ? 'bg-green-500'
                      : autosaveStatus === 'saving'
                      ? 'bg-yellow-500 animate-pulse'
                      : autosaveStatus === 'error'
                      ? 'bg-red-500'
                      : 'bg-gray-300'
                  }`}
                />
                {autosaveStatus === 'saved' && 'Saved'}
                {autosaveStatus === 'saving' && 'Saving...'}
                {autosaveStatus === 'error' && 'Error'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Edit' : 'Preview'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            disabled={saving}
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowExport(true)}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              /* Share functionality */
            }}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveSection('settings')}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        {!previewMode && (
          <Sidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            resume={resume}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {!previewMode ? (
            <>
              {/* Editor Panel */}
              <div className="w-1/2 border-r overflow-y-auto">
                <EditorPanel
                  section={activeSection}
                  resume={resume}
                  onChange={updateResume}
                />
              </div>

              {/* Preview Panel */}
              <div className="w-1/2 overflow-y-auto p-6 bg-gray-100">
                <div className="max-w-4xl mx-auto">
                  <PreviewPanel resume={resume} />
                </div>
              </div>
            </>
          ) : (
            /* Full Preview Mode */
            <div className="w-full overflow-y-auto p-8 bg-gray-100">
              <div className="max-w-4xl mx-auto">
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Preview Mode</h2>
                  <Button variant="outline" onClick={() => setPreviewMode(false)}>
                    Exit Preview
                  </Button>
                </div>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <PreviewPanel resume={resume} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Export Modal - FIXED */}
      {showExport && resume && (
        <ExportModal
          isOpen={showExport}
          onClose={() => setShowExport(false)}
          resume={resume}
          // onExport will be optional in ExportModal → you can add it later
        />
      )}
    </div>
  );
}