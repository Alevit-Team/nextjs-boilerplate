import { db } from '@/db';
import { UserTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

async function getUserById(
  _request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const users = await db.query.UserTable.findMany({
    where: eq(UserTable.id, userId),
    columns: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  return NextResponse.json(users);
}

export { getUserById as GET };
