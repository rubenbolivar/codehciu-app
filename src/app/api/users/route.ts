import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    console.log('🚀 Iniciando registro de usuario...');
    
    const body = await request.json();
    console.log('📦 Datos recibidos:', { ...body, password: '[HIDDEN]' });
    
    const { email, name, password } = body;
    
    // Validar campos requeridos
    if (!email || !name || !password) {
      console.log('❌ Campos requeridos faltantes');
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    try {
      console.log('🔍 Verificando si el usuario existe...');
      // Verificar si el usuario ya existe
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      console.log('Resultado de búsqueda:', existingUser);

      if (existingUser.length > 0) {
        console.log('❌ Usuario ya existe');
        return NextResponse.json(
          { error: 'El correo electrónico ya está registrado' },
          { status: 400 }
        );
      }
      
      console.log('🔒 Generando hash de contraseña...');
      // Hash de la contraseña
      const hashedPassword = await hash(password, 10);
      
      console.log('💾 Creando usuario en la base de datos...');
      // Crear usuario sin el campo id (se generará automáticamente)
      const [result] = await db.insert(users)
        .values({
          name,
          email,
          password: hashedPassword,
          isAdmin: false,
        })
        .returning();
      
      console.log('✅ Usuario creado exitosamente:', result);
      
      // Retornar usuario creado (sin la contraseña)
      const { password: _, ...user } = result;
      return NextResponse.json({ 
        message: 'Usuario registrado exitosamente',
        user 
      });
    } catch (dbError) {
      console.error('Error de base de datos:', dbError);
      throw dbError;
    }
  } catch (error: any) {
    console.error('❌ Error al crear usuario:', {
      message: error?.message,
      stack: error?.stack,
      error
    });
    return NextResponse.json(
      { 
        error: 'Error al crear usuario', 
        details: error?.message,
        stack: error?.stack
      },
      { status: 500 }
    );
  }
}