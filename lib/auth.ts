import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

export interface JwtPayload {
  userId: string;
  email: string;
  name?: string;
}

// Generate JWT token
export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// Verify JWT token
export function verifyToken(token: string): JwtPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Compare password
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Get user from request (replaces getServerSession)
export async function getAuthUser(req: Request) {
  const token = req.headers.get('cookie')?.match(/token=([^;]+)/)?.[1] || 
                req.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return null;
  }
  
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}

// Get user from cookies (for NextRequest)
export async function getUserFromRequest(req: { cookies: { get: (name: string) => { value: string } | undefined } }) {
  const token = req.cookies.get('token')?.value;
  
  if (!token) {
    return null;
  }
  
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}