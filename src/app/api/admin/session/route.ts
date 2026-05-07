import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin/session';

export const runtime = 'nodejs';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: true, authenticated: false });
  }

  return NextResponse.json({
    ok: true,
    authenticated: true,
    username: session.username,
  });
}
