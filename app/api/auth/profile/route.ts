import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// REMOVE the GET method - we already have it in /api/auth/me
// KEEP only PUT for updating profile

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

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
    };

    const body = await req.json();
    const { name, avatar, currentPassword, newPassword } = body;

    // Find user
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const updateData: any = {};
    
    // Update name if provided
    if (name !== undefined) updateData.name = name;
    
    // Update avatar if provided
    if (avatar !== undefined) updateData.avatar = avatar;
    
    // Update password if both current and new passwords provided
    if (currentPassword && newPassword) {
      const bcrypt = require('bcryptjs');
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      
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
      decoded.userId,
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