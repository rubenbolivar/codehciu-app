import { migrate } from '@/db/migrations/0000_init';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await migrate();
    return NextResponse.json({ message: 'Migration completed successfully' });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: 'Migration failed', details: error.message },
      { status: 500 }
    );
  }
}
