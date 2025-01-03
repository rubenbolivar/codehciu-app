import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';

export async function GET() {
  const client = await sql.connect();
  
  try {
    console.log('Starting admin user creation...');
    
    // Hash de la contraseña
    const hashedPassword = await hash('admin123', 10);
    console.log('Password hashed successfully');
    
    // Verificar si el usuario ya existe
    const existingUser = await client.sql`
      SELECT email FROM users WHERE email = 'admin@codehciu.org';
    `;
    console.log('Existing user check:', existingUser.rows);

    if (existingUser.rows.length > 0) {
      return NextResponse.json({ 
        message: 'Admin user already exists',
        loginEmail: 'admin@codehciu.org',
        loginPassword: 'admin123'
      });
    }
    
    // Crear usuario admin
    const result = await client.sql`
      INSERT INTO users (name, email, password, is_admin, created_at, updated_at)
      VALUES (
        'Admin', 
        'admin@codehciu.org', 
        ${hashedPassword}, 
        true,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      )
      RETURNING id, email;
    `;
    
    return NextResponse.json({ 
      message: 'Admin user created successfully',
      loginEmail: 'admin@codehciu.org',
      loginPassword: 'admin123',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { error: 'Error creating admin user', details: error.message },
      { status: 500 }
    );
  } finally {
    await client.end();
  }
}
