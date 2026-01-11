// @/hooks/useResume.ts
import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Resume } from '@/types';
import { 
  fetchResume, 
  updateResume as updateResumeAction,
  setAutosaveStatus,
  setCurrentResume 
} from '@/store/resumeSlice';

export const useResume = (resumeId?: string) => {
  const dispatch = useAppDispatch();
  const { currentResume, loading, autosaveStatus } = useAppSelector(
    (state) => state.resume
  );
  
  // Use refs to store timeout and prevent memory leaks
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSavingRef = useRef(false);

  const loadResume = useCallback(async (id: string) => {
    await dispatch(fetchResume(id));
  }, [dispatch]);

  const saveResume = useCallback(async (data?: Partial<Resume>) => {
    if (!currentResume || !resumeId || isSavingRef.current) return;
    
    try {
      isSavingRef.current = true;
      dispatch(setAutosaveStatus('saving'));
      
      const resumeData = data || currentResume;
      await dispatch(updateResumeAction({ 
        id: resumeId, 
        data: resumeData 
      })).unwrap();
      
      dispatch(setAutosaveStatus('saved'));
    } catch (error) {
      console.error('Save failed:', error);
      dispatch(setAutosaveStatus('error'));
    } finally {
      isSavingRef.current = false;
    }
  }, [currentResume, resumeId, dispatch]);

  // ADD THIS FUNCTION - This is what's missing!
  const updateResume = useCallback((updates: Partial<Resume>) => {
    if (!currentResume) return;
    
    // Clear any existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }
    
    // Update local state immediately using Redux action
    dispatch(setCurrentResume({
      ...currentResume,
      ...updates,
      lastModified: new Date().toISOString()
    }));
    
    // Debounced save after 2 seconds of inactivity
    saveTimeoutRef.current = setTimeout(() => {
      saveResume();
    }, 2000);

  }, [currentResume, dispatch, saveResume]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    resume: currentResume,
    loading,
    saving: autosaveStatus === 'saving',
    autosaveStatus,
    loadResume,
    saveResume,
    updateResume, // Make sure this is included!
  };
};