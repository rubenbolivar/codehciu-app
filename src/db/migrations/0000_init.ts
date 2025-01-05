import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import dotenv from 'dotenv';

// Inicializar dotenv
dotenv.config();

export async function migrate() {
  console.log('🚀 Iniciando migración...');

  // Verificar que DATABASE_URL_UNPOOLED existe
  if (!process.env.DATABASE_URL_UNPOOLED) {
    throw new Error('DATABASE_URL_UNPOOLED no está definida');
  }

  console.log('Conectando a:', process.env.DATABASE_URL_UNPOOLED);

  const sql = neon(process.env.DATABASE_URL_UNPOOLED);
  const db = drizzle(sql);

  try {
    // Eliminar la tabla si existe
    await sql`DROP TABLE IF EXISTS users CASCADE`;
    console.log('✅ Tabla users eliminada');
    
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
    console.log('✅ Tabla users creada');

    console.log('✅ Migración completada exitosamente');
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    throw error;
  }
}
