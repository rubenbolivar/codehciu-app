import { createClient } from '@vercel/postgres';

export async function migrate() {
  console.log('🚀 Iniciando migración...');

  const client = createClient();
  await client.connect();

  try {
    // Eliminar la tabla si existe
    await client.sql`DROP TABLE IF EXISTS users CASCADE;`;
    
    // Crear la tabla desde cero
    await client.sql`
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
  } finally {
    await client.end();
  }
}
