export const SITE_NAME = 'DNS Service';
export const DEFAULT_TITLE = 'DNS Service | Assainissement, Agricole & Pisciculture à Yaoundé';
export const DEFAULT_DESCRIPTION =
  'DNS Service, basée à Yaoundé, propose des solutions durables en assainissement, désinfection, lutte contre les nuisibles, accompagnement agricole et pisciculture.';

const FALLBACK_SITE_URL = 'https://dns-service.vercel.app';

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK_SITE_URL;

  try {
    const withProtocol = raw.startsWith('http://') || raw.startsWith('https://') ? raw : `https://${raw}`;
    return new URL(withProtocol).toString().replace(/\/$/, '');
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export function absoluteUrl(path = '/'): string {
  const base = getSiteUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalizedPath, `${base}/`).toString();
}
