import { db } from '@/db';
import { users } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allUsers = await db.select().from(users);
    
    // Filtramos información sensible antes de retornar
    const safeUsers = allUsers.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin
    }));
    
    return NextResponse.json({ 
      users: safeUsers,
      count: safeUsers.length 
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Error fetching users', details: error.message },
      { status: 500 }
    );
  }
}
