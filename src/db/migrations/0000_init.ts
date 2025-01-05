import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export async function migrate() {
  console.log('🚀 Iniciando migración...');

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL no está definida');
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  try {
    // Eliminar la tabla si existe
    await sql`DROP TABLE IF EXISTS users CASCADE`;
    
    // Crear la tabla desde cero
    await sql`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE NOT NULL,
        password TEXT,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log('✅ Migración completada exitosamente');
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    throw error;
  }
}
