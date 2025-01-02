import { migrate } from './migrations/0000_init';

// Ejecutar migración
migrate()
  .then(() => {
    console.log('🚀 Migración completada');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Error en la migración:', error);
    process.exit(1);
  }); 