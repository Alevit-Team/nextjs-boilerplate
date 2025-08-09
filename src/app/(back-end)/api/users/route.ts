import { db } from '@/db';
import { NextResponse } from 'next/server';

async function getUsers() {
  const users = await db.query.UserTable.findMany({
    columns: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  return NextResponse.json(users);
}

export { getUsers as GET };
