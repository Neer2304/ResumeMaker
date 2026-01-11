// @/hooks/useAuth.ts
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { 
  getCurrentUser, 
  login as loginAction, 
  logout as logoutAction,
  register as registerAction,
  updateProfile as updateProfileAction,
  changePassword as changePasswordAction,
  clearError 
} from '@/store/authSlice';
import { User } from '@/types';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading, error } = useAppSelector(
    (state) => state.auth
  );

  const login = useCallback(async (email: string, password: string) => {
    const result = await dispatch(loginAction({ email, password }));
    return result;
  }, [dispatch]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const result = await dispatch(registerAction({ name, email, password }));
    return result;
  }, [dispatch]);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    const result = await dispatch(updateProfileAction(data));
    return result;
  }, [dispatch]);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    const result = await dispatch(changePasswordAction({ currentPassword, newPassword }));
    return result;
  }, [dispatch]);

  const logout = useCallback(async () => {
    await dispatch(logoutAction());
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    updateProfile,
    changePassword,
    logout,
    clearAuthError,
  };
};