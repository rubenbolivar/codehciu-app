import { db } from '@/db';
import { users } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allUsers = await db.select({
      id: users.id,
      email: users.email,
      name: users.name,
      is_admin: users.isAdmin
    }).from(users);
    
    return NextResponse.json({ 
      users: allUsers,
      count: allUsers.length 
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Error fetching users', details: error.message },
      { status: 500 }
    );
  }
}
