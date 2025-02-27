import { NextResponse } from 'next/server';
import { queryUsers } from '@/lib/postgres-client';

export const runtime = 'edge';

export async function GET(): Promise<Response> {
  try {
    const users = await queryUsers();
    return NextResponse.json(users.rows);
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 500 },
    );
  }
}
