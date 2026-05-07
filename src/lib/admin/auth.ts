import 'server-only';

import crypto from 'node:crypto';
import { serverEnv } from '../env/server';

const hashWithSha256 = (value: string): string => crypto.createHash('sha256').update(value).digest('hex');

const safeCompare = (a: string, b: string): boolean => {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
};

const normalizeHash = (value: string): string => {
  const trimmed = value.trim();
  if (trimmed.startsWith('sha256:')) return trimmed.slice('sha256:'.length);
  return trimmed;
};

export const verifyAdminCredentials = (username: string, password: string): { ok: true } | { ok: false; error: string } => {
  const expectedUsername = serverEnv.adminUsername;
  if (!expectedUsername) return { ok: false, error: "ADMIN_USERNAME n'est pas configuré." };
  if (!safeCompare(username, expectedUsername)) return { ok: false, error: 'Identifiants invalides.' };

  const passwordHash = normalizeHash(serverEnv.adminPasswordHash);
  if (passwordHash) {
    const inputHash = hashWithSha256(password);
    if (!safeCompare(inputHash, passwordHash)) return { ok: false, error: 'Identifiants invalides.' };
    return { ok: true };
  }

  if (serverEnv.adminPassword) {
    if (!safeCompare(password, serverEnv.adminPassword)) return { ok: false, error: 'Identifiants invalides.' };
    return { ok: true };
  }

  return {
    ok: false,
    error: 'Aucun mot de passe admin configuré. Définissez ADMIN_PASSWORD_HASH ou ADMIN_PASSWORD.',
  };
};
