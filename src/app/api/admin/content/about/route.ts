import { NextResponse } from 'next/server';
import { getAboutContent, saveAboutContent } from '@/lib/content/about-content';
import { normalizeAboutContent } from '@/lib/content/about-schema';
import { requireAdminApiSession } from '@/lib/admin/guards';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await requireAdminApiSession();
    const content = await getAboutContent();
    return NextResponse.json({ ok: true, content });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ ok: false, error: 'Impossible de lire le contenu.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdminApiSession();
    const payload = (await request.json()) as unknown;
    const normalized = normalizeAboutContent(payload);
    const saved = await saveAboutContent(normalized);
    return NextResponse.json({ ok: true, content: saved });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ ok: false, error: 'Impossible de sauvegarder le contenu.' }, { status: 500 });
  }
}
