'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.email || !formData.password) {
      setToast({ message: 'Please fill in all fields', type: 'error' });
      return;
    }

    setLoading(true);
    
    try {
      // Mock login - replace with your actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setToast({ message: 'Login successful!', type: 'success' });
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f9fafb',
      padding: '48px 16px'
    }}>
      {toast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '16px 24px',
          backgroundColor: toast.type === 'success' ? '#10b981' : '#ef4444',
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{ fontWeight: 500 }}>{toast.message}</div>
          <button 
            onClick={() => setToast(null)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '20px',
              padding: 0,
              marginLeft: '8px'
            }}
          >
            ×
          </button>
        </div>
      )}
      
      <div style={{ maxWidth: '28rem', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
            CV Maker
          </h1>
          <p style={{ color: '#4b5563' }}>Create professional resumes in minutes</p>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: 'none'
        }}>
          <div style={{ padding: '32px 32px 0 32px' }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
                Sign In
              </h2>
              <p style={{ color: '#6b7280', marginTop: '8px' }}>
                Enter your credentials to access your account
              </p>
            </div>
          </div>
          
          <div style={{ padding: '32px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Email
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail style={{ 
                      position: 'absolute', 
                      left: '12px', 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      height: '20px',
                      width: '20px',
                      color: '#9ca3af'
                    }} />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 12px 12px 40px',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock style={{ 
                      position: 'absolute', 
                      left: '12px', 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      height: '20px',
                      width: '20px',
                      color: '#9ca3af'
                    }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 40px 12px 40px',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#9ca3af',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                    >
                      {showPassword ? 
                        <EyeOff style={{ height: '20px', width: '20px' }} /> : 
                        <Eye style={{ height: '20px', width: '20px' }} />
                      }
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <div style={{
                  padding: '12px',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '8px'
                }}>
                  <p style={{ fontSize: '14px', color: '#dc2626', textAlign: 'center' }}>
                    {error}
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link
                  href="/forgot-password"
                  style={{
                    fontSize: '14px',
                    color: '#2563eb',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = '#1d4ed8';
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = '#2563eb';
                }}
              >
                {loading ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid white',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Signing in...
                  </div>
                ) : 'Sign In'}
              </button>

              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#4b5563' }}>
                  Don't have an account?{' '}
                  <Link
                    href="/register"
                    style={{
                      fontWeight: '500',
                      color: '#2563eb',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            By continuing, you agree to our{' '}
            <a href="#" style={{ color: '#2563eb', textDecoration: 'none' }}
               onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
               onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" style={{ color: '#2563eb', textDecoration: 'none' }}
               onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
               onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }
      `}</style>
    </div>
  );
}