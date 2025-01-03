import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    console.log('Starting admin user setup...');
    
    // Hash de la contraseña
    const hashedPassword = await hash('admin123', 10);
    console.log('Password hashed successfully');
    
    // Verificar si el usuario ya existe
    const existingUser = await db.select().from(users).where(eq(users.email, 'admin@codehciu.org'));
    console.log('Existing user check:', existingUser);

    if (existingUser.length > 0) {
      // Actualizar usuario existente
      const result = await db
        .update(users)
        .set({ 
          password: hashedPassword,
          isAdmin: true,
          name: 'Admin CODEHCIU'
        })
        .where(eq(users.email, 'admin@codehciu.org'))
        .returning();
      
      return NextResponse.json({ 
        message: 'Admin user updated successfully',
        loginEmail: 'admin@codehciu.org',
        loginPassword: 'admin123',
        user: result[0]
      });
    }
    
    // Crear usuario admin si no existe
    const result = await db.insert(users).values({
      name: 'Admin CODEHCIU',
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
  } catch (error: any) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { 
        error: 'Error setting up admin user', 
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
