import { NextResponse } from 'next/server';
import { getAdminTokenHash } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (!ADMIN_PASSWORD) {
      console.error('ADMIN_PASSWORD environment variable is not set!');
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    if (password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true });
      const hash = getAdminTokenHash();
      if (hash) {
        response.cookies.set('admin_token', hash, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24, // 1 day
          path: '/',
        });
      }
      return response;
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
