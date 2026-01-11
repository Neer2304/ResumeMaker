'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Globe, Camera, Save, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import ProfilePhotoUpload from '@/components/profile/ProfilePhotoUpload';
import { Toast } from '@/components/ui/toast';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading, updateProfile } = useAuth();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    bio: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: '',
        website: '',
        bio: '',
      });
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await updateProfile(profileData);
      setToast({ message: 'Profile updated successfully!', type: 'success' });
    } catch (error: any) {
      setToast({ message: error.message || 'Failed to update profile', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setToast({ message: 'Passwords do not match', type: 'error' });
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setToast({ message: 'Password must be at least 6 characters', type: 'error' });
      return;
    }

    setLoading(true);
    
    try {
      // Implement password change API call
      setToast({ message: 'Password changed successfully!', type: 'success' });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      setToast({ message: error.message || 'Failed to change password', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = async (url: string) => {
    try {
      await updateProfile({ avatar: url });
      setToast({ message: 'Profile photo updated!', type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to update photo', type: 'error' });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and profile photo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Photo */}
                    <div className="lg:col-span-1">
                      <div className="space-y-4">
                        <h3 className="font-medium">Profile Photo</h3>
                        <ProfilePhotoUpload
                          currentPhoto={user?.avatar}
                          onPhotoChange={handlePhotoChange}
                          size="lg"
                        />
                        <p className="text-sm text-gray-500">
                          Recommended: Square image, 300x300 pixels
                        </p>
                      </div>
                    </div>

                    {/* Profile Form */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                              type="text"
                              value={profileData.name}
                              onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                              className="pl-10"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Email</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                              type="email"
                              value={profileData.email}
                              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                              className="pl-10"
                              placeholder="you@example.com"
                              disabled
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Email cannot be changed
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                              type="tel"
                              value={profileData.phone}
                              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                              className="pl-10"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Website</label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                              type="url"
                              value={profileData.website}
                              onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                              className="pl-10"
                              placeholder="https://yourwebsite.com"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Bio</label>
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          className="w-full h-32 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Tell us about yourself..."
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button type="submit" loading={loading}>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Update your password and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-6 max-w-2xl">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Current Password</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="pl-10"
                        placeholder="Enter current password"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">New Password</label>
                      <div className="relative">
                        <Key className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          className="pl-10"
                          placeholder="Enter new password"
                          required
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Must be at least 6 characters
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Confirm Password</label>
                      <div className="relative">
                        <Key className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          className="pl-10"
                          placeholder="Confirm new password"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" loading={loading}>
                      Update Password
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
                <CardDescription>
                  Manage your account and data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Export Data</h4>
                      <p className="text-sm text-gray-600">
                        Download all your resumes and data
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Export Data
                    </Button>
                  </div>

                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-red-600">Delete Account</h4>
                      <p className="text-sm text-gray-600">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}