import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import crypto from 'crypto';

// Create new user
export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();
    
    // Validate input
    if (!email || !name || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Hash the password
    const hashedPassword = await hash(password, 10);
    
    // Generate unique ID
    const userId = crypto.randomUUID();
    
    const result = await sql`
      INSERT INTO users (id, email, name, password, role)
      VALUES (${userId}, ${email}, ${name}, ${hashedPassword}, 'USER')
      RETURNING id, email, name, role;
    `;
    
    return NextResponse.json({ user: result.rows[0] });
  } catch (error) {
    console.error('User creation error:', error);
    return NextResponse.json(
      { error: 'Error creating user' },
      { status: 500 }
    );
  }
}

// Get all users
export async function GET() {
  try {
    const result = await sql`
      SELECT id, email, name, role, created_at 
      FROM users 
      ORDER BY created_at DESC;
    `;
    
    return NextResponse.json({ users: result.rows });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Error fetching users' },
      { status: 500 }
    );
  }
}