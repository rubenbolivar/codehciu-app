import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Define types
type AccentMap = {
  'á': string;
  'é': string;
  'í': string;
  'ó': string;
  'ú': string;
  'ñ': string;
};

// Get all content
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    
    let queryString = `
      SELECT c.*, 
             cat.name as category_name,
             u.name as author_name
      FROM contents c
      LEFT JOIN categories cat ON c.category_id = cat.id
      LEFT JOIN users u ON c.author_id = u.id
    `;
    
    const conditions: string[] = [];
    const values: any[] = [];
    
    if (category) {
      conditions.push('c.category_id = $1');
      values.push(category);
    }
    
    if (status) {
      conditions.push(`c.status = $${values.length + 1}`);
      values.push(status);
    }
    
    if (conditions.length > 0) {
      queryString += ` WHERE ${conditions.join(' AND ')}`;
    }
    
    queryString += ' ORDER BY c.created_at DESC';
    
    const result = await sql.query(queryString, values);
    return NextResponse.json({ contents: result.rows });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Error fetching content' },
      { status: 500 }
    );
  }
}

// Create new content
export async function POST(request: Request) {
  try {
    const { title, content, excerpt, category_id, author_id, featured_image, status = 'DRAFT' } = await request.json();
    
    // Validate input
    if (!title || !content || !category_id || !author_id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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
    
    // Create slug from title
    const slug = title.toLowerCase()
      .replace(/[áéíóúñ]/g, (c: string) => accentMap[c as keyof AccentMap] || c)
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    const result = await sql`
      INSERT INTO contents (
        id, title, slug, content, excerpt, 
        category_id, author_id, featured_image, status
      )
      VALUES (
        ${crypto.randomUUID()}, ${title}, ${slug}, ${content}, ${excerpt}, 
        ${category_id}, ${author_id}, ${featured_image}, ${status}
      )
      RETURNING *;
    `;
    
    return NextResponse.json({ content: result.rows[0] });
  } catch (error) {
    console.error('Error creating content:', error);
    return NextResponse.json(
      { error: 'Error creating content' },
      { status: 500 }
    );
  }
}