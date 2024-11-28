import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test query to verify database connection
    const result = await sql`SELECT NOW();`;
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connected successfully!',
      timestamp: result.rows[0].now,
      database: 'Neon Postgres'
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500 
    });
  }
}