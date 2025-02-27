import * as vercelBlob from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function handleBody(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const pathname = searchParams.get('filename');

  if (!request.body || pathname === null) {
    return NextResponse.json(
      { message: 'No file to upload.' },
      {
        status: 400,
      },
    );
  }

  // Note: this will stream the file to Vercel's Blob Store
  const blob = await vercelBlob.put(pathname, request.body, {
    access: 'public',
  });

  return NextResponse.json(blob);
}
