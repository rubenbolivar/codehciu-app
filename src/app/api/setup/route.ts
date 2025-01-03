import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';

export async function GET() {
  try {
    // Hash de la contraseña
    const hashedPassword = await hash('admin123', 10);
    
    // Crear usuario admin usando el schema correcto
    await sql`
      INSERT INTO users (name, email, password, is_admin, created_at, updated_at)
      VALUES (
        'Admin', 
        'admin@codehciu.org', 
        ${hashedPassword}, 
        true,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      )
      ON CONFLICT (email) DO NOTHING;
    `;
    
    return NextResponse.json({ 
      message: 'Admin user created successfully',
      loginEmail: 'admin@codehciu.org',
      loginPassword: 'admin123'
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { error: 'Error creating admin user' },
      { status: 500 }
    );
  }
}
