import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    console.log('Starting admin user creation...');
    
    // Hash de la contraseña
    const hashedPassword = await hash('admin123', 10);
    console.log('Password hashed successfully');
    
    // Verificar si el usuario ya existe
    const existingUser = await db.select().from(users).where(eq(users.email, 'admin@codehciu.org'));
    console.log('Existing user check:', existingUser);

    if (existingUser.length > 0) {
      return NextResponse.json({ 
        message: 'Admin user already exists',
        loginEmail: 'admin@codehciu.org',
        loginPassword: 'admin123'
      });
    }
    
    // Crear usuario admin usando Drizzle
    const result = await db.insert(users).values({
      name: 'Admin',
      email: 'admin@codehciu.org',
      password: hashedPassword,
      isAdmin: true,
    }).returning();
    
    return NextResponse.json({ 
      message: 'Admin user created successfully',
      loginEmail: 'admin@codehciu.org',
      loginPassword: 'admin123',
      user: result[0]
    });
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { error: 'Error creating admin user', details: error.message },
      { status: 500 }
    );
  }
}
