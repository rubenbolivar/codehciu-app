import { migrate } from '@/db/migrations/0000_init';
import { NextResponse } from 'next/server';

// Asegurarnos de que esta ruta solo se ejecute en el servidor
export const runtime = 'edge';

export async function GET() {
  try {
    await migrate();
    return NextResponse.json({ message: 'Migration completed successfully' });
  } catch (error: any) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { 
        error: 'Migration failed', 
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
