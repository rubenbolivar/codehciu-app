import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export async function migrate() {
  console.log('🚀 Iniciando migración...');

  // Verificar que DATABASE_URL_UNPOOLED existe
  const databaseUrl = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('No se encontró una URL de base de datos válida');
  }

  console.log('Conectando a:', databaseUrl);

  const sql = neon(databaseUrl);
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
