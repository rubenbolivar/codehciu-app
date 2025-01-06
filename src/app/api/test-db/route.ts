import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();
    
    // Hash the password
    const hashedPassword = await hash(password, 10);
    
    const result = await sql`
      INSERT INTO users (id, email, name, password, role)
      VALUES (${crypto.randomUUID()}, ${email}, ${name}, ${hashedPassword}, 'USER')
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