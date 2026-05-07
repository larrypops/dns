import { NextResponse } from 'next/server';
import { requireAdminApiSession } from '@/lib/admin/guards';
import { serverEnv } from '@/lib/env/server';
import { storageProvider } from '@/lib/storage';
import type { UploadKind } from '@/lib/storage/types';

export const runtime = 'nodejs';

const allowedKinds = new Set<UploadKind>(['photo', 'video']);

const extensionForUrl = (fileName: string): string => {
  const parts = fileName.toLowerCase().split('.');
  return parts.length > 1 ? parts[parts.length - 1] : '';
};

export async function POST(request: Request) {
  try {
    await requireAdminApiSession();

    const formData = await request.formData();
    const file = formData.get('file');
    const rawKind = formData.get('kind');
    const kind = typeof rawKind === 'string' ? (rawKind as UploadKind) : 'photo';

    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: 'Aucun fichier reçu.' }, { status: 400 });
    }

    if (!allowedKinds.has(kind)) {
      return NextResponse.json({ ok: false, error: 'Type de média invalide.' }, { status: 400 });
    }

    const contentType = file.type.toLowerCase();
    const maxBytes = serverEnv.adminUploadMaxMb * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        { ok: false, error: `Le fichier dépasse la limite de ${serverEnv.adminUploadMaxMb} MB.` },
        { status: 400 },
      );
    }

    if (!serverEnv.adminUploadAllowedTypes.includes(contentType)) {
      return NextResponse.json(
        {
          ok: false,
          error: `Type MIME non autorisé: ${contentType}.`,
        },
        { status: 400 },
      );
    }

    if (kind === 'photo' && !contentType.startsWith('image/')) {
      return NextResponse.json({ ok: false, error: 'Le champ photo accepte uniquement des images.' }, { status: 400 });
    }

    if (kind === 'video' && !contentType.startsWith('video/')) {
      return NextResponse.json({ ok: false, error: 'Le champ vidéo accepte uniquement des vidéos.' }, { status: 400 });
    }

    const upload = await storageProvider.upload({ file, kind });
    return NextResponse.json({
      ok: true,
      media: {
        url: upload.url,
        bytes: upload.bytes ?? file.size,
        width: upload.width ?? null,
        height: upload.height ?? null,
        format: upload.format || extensionForUrl(file.name) || null,
        type: upload.resourceType || (contentType.startsWith('video/') ? 'video' : 'image'),
      },
    });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Échec de l’upload.' },
      { status: 500 },
    );
  }
}
