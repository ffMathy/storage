import { NextResponse } from 'next/server';
import { queryUsers } from '@/lib/postgres-kysely';

export const runtime = 'nodejs';

export async function GET(): Promise<Response> {
  try {
    const users = await queryUsers();
    return NextResponse.json(users);
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 500 },
    );
  }
}
