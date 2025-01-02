// Configuración de la conexión a la base de datos
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Verificamos que existe la variable de entorno
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no está definida en las variables de entorno');
}

// Creamos la conexión
const sql = neon(process.env.DATABASE_URL);

// Exportamos la instancia de la base de datos
export const db = drizzle(sql);
