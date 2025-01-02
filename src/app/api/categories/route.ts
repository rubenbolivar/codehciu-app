import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Define a type for the accent map
type AccentMap = {
  'á': string;
  'é': string;
  'í': string;
  'ó': string;
  'ú': string;
  'ñ': string;
};

// Get all categories
export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM categories 
      ORDER BY created_at DESC;
    `;
    return NextResponse.json({ categories: result.rows });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Error fetching categories' },
      { status: 500 }
    );
  }
}

// Create new category
export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();
    
    // Validate input
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    
    // Define accent map
    const accentMap: AccentMap = {
      'á': 'a',
      'é': 'e',
      'í': 'i',
      'ó': 'o',
      'ú': 'u',
      'ñ': 'n'
    };
    
    // Create slug from name
    const slug = name.toLowerCase()
      .replace(/[áéíóúñ]/g, (c: string) => accentMap[c as keyof AccentMap] || c)
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    const result = await sql`
      INSERT INTO categories (id, name, slug, description)
      VALUES (${crypto.randomUUID()}, ${name}, ${slug}, ${description})
      RETURNING *;
    `;
    
    return NextResponse.json({ category: result.rows[0] });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Error creating category' },
      { status: 500 }
    );
  }
}