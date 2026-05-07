import 'server-only';

import { redirect } from 'next/navigation';
import { getAdminSession } from './session';

export const requireAdminPageSession = async (): Promise<{ username: string }> => {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }
  return { username: session.username };
};

export const requireAdminApiSession = async (): Promise<{ username: string }> => {
  const session = await getAdminSession();
  if (!session) {
    throw new Response(JSON.stringify({ ok: false, error: 'Non autorisé.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return { username: session.username };
};
