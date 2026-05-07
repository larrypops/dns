import { NextResponse } from 'next/server';
import { verifyAdminCredentials } from '@/lib/admin/auth';
import { ADMIN_SESSION_COOKIE, createSessionToken, getSessionCookieOptions } from '@/lib/admin/session';

export const runtime = 'nodejs';

type LoginPayload = {
  username?: unknown;
  password?: unknown;
};

export async function POST(request: Request) {
  let body: LoginPayload = {};

  try {
    body = (await request.json()) as LoginPayload;
  } catch {
    return NextResponse.json({ ok: false, error: 'Payload invalide.' }, { status: 400 });
  }

  const username = typeof body.username === 'string' ? body.username.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  if (!username || !password) {
    return NextResponse.json({ ok: false, error: 'Nom d’utilisateur et mot de passe requis.' }, { status: 400 });
  }

  const check = verifyAdminCredentials(username, password);
  if (!check.ok) {
    return NextResponse.json({ ok: false, error: check.error }, { status: 401 });
  }

  const token = createSessionToken(username);
  const response = NextResponse.json({ ok: true, username });
  response.cookies.set(ADMIN_SESSION_COOKIE, token, getSessionCookieOptions());
  return response;
}
