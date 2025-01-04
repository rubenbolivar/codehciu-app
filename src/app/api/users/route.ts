import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();
    
    // Validar campos requeridos
    if (!email || !name || !password) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'El correo electrónico ya está registrado' },
        { status: 400 }
      );
    }
    
    // Hash de la contraseña
    const hashedPassword = await hash(password, 10);
    
    try {
      // Crear usuario (el id se generará automáticamente)
      const result = await db.insert(users).values({
        name,
        email,
        password: hashedPassword,
        isAdmin: false,
      }).returning();
      
      // Retornar usuario creado (sin la contraseña)
      const { password: _, ...user } = result[0];
      return NextResponse.json({ 
        message: 'Usuario registrado exitosamente',
        user 
      });
    } catch (dbError: any) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Error al crear usuario en la base de datos', details: dbError?.message },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Request error:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud', details: error?.message },
      { status: 500 }
    );
  }
}