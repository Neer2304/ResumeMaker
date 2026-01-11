import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Helper function to verify token and get user
async function getAuthenticatedUser(token: string) {
  if (!token) throw new Error('No token provided');
  
  const decoded = jwt.verify(token, JWT_SECRET) as {
    userId: string;
    email: string;
  };
  
  const user = await User.findById(decoded.userId).select('-password');
  if (!user) throw new Error('User not found');
  
  return user;
}

// GET - Get current user profile
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const token = req.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const user = await getAuthenticatedUser(token);

    return NextResponse.json({
      success: true,
      data: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        subscription: user.subscription
      }
    });
  } catch (error: any) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { success: false, error: 'Not authenticated' },
      { status: 401 }
    );
  }
}

// PUT - Update user profile
export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const token = req.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const user = await getAuthenticatedUser(token);
    const body = await req.json();
    const { name, avatar, currentPassword, newPassword } = body;

    const updateData: any = {};
    
    // Update name if provided
    if (name !== undefined) updateData.name = name;
    
    // Update avatar if provided
    if (avatar !== undefined) updateData.avatar = avatar;
    
    // Update password if both current and new passwords provided
    if (currentPassword && newPassword) {
      const bcrypt = require('bcryptjs');
      const dbUser = await User.findById(user._id); // Get user with password
      const isPasswordValid = await bcrypt.compare(currentPassword, dbUser.password);
      
      if (!isPasswordValid) {
        return NextResponse.json(
          { success: false, error: 'Current password is incorrect' },
          { status: 400 }
        );
      }
      
      if (newPassword.length < 6) {
        return NextResponse.json(
          { success: false, error: 'New password must be at least 6 characters' },
          { status: 400 }
        );
      }
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedPassword;
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      updateData,
      { new: true }
    ).select('-password');

    return NextResponse.json({
      success: true,
      data: {
        id: updatedUser._id.toString(),
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        subscription: updatedUser.subscription
      }
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}