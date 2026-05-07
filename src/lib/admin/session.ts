import 'server-only';

import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { serverEnv } from '../env/server';

export const ADMIN_SESSION_COOKIE = 'dns_admin_session';
const DEFAULT_SESSION_TTL_SECONDS = 60 * 60 * 8;

export type AdminSession = {
  username: string;
  exp: number;
};

type SessionCookieOptions = {
  httpOnly: boolean;
  sameSite: 'lax' | 'strict' | 'none';
  secure: boolean;
  maxAge: number;
  path: string;
};

const base64UrlEncode = (value: string): string => Buffer.from(value, 'utf8').toString('base64url');
const base64UrlDecode = (value: string): string => Buffer.from(value, 'base64url').toString('utf8');

const getSecret = (): string => serverEnv.adminSessionSecret || 'dns-service-dev-secret-change-me';

const safeCompare = (a: string, b: string): boolean => {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) return false;
  return crypto.timingSafeEqual(aBuffer, bBuffer);
};

const sign = (payload: string): string => crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');

export const createSessionToken = (username: string): string => {
  const payload: AdminSession = {
    username,
    exp: Math.floor(Date.now() / 1000) + DEFAULT_SESSION_TTL_SECONDS,
  };

  const encoded = base64UrlEncode(JSON.stringify(payload));
  const signature = sign(encoded);
  return `${encoded}.${signature}`;
};

export const parseSessionToken = (token: string | null | undefined): AdminSession | null => {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [encoded, signature] = parts;
  const expected = sign(encoded);
  if (!safeCompare(signature, expected)) return null;

  try {
    const session = JSON.parse(base64UrlDecode(encoded)) as AdminSession;
    if (!session?.username || typeof session.exp !== 'number') return null;
    if (session.exp <= Math.floor(Date.now() / 1000)) return null;
    return session;
  } catch {
    return null;
  }
};

export const getAdminSession = async (): Promise<AdminSession | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return parseSessionToken(token);
};

export const getSessionCookieOptions = (): SessionCookieOptions => ({
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: DEFAULT_SESSION_TTL_SECONDS,
  path: '/',
});
