'use client';

import Image from 'next/image';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import type { AboutContent, AboutPhoto, AboutVideo } from '@/lib/content/types';

type ApiResponse = {
  ok: boolean;
  error?: string;
  content?: AboutContent;
  media?: {
    url: string;
    bytes?: number;
    width?: number | null;
    height?: number | null;
    format?: string | null;
    type?: string;
  };
};

const createItemId = (prefix: 'photo' | 'video') => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
};

const emptyPhoto = (): AboutPhoto => ({
  id: createItemId('photo'),
  url: '',
  alt: '',
});

const emptyVideo = (): AboutVideo => ({
  id: createItemId('video'),
  url: '',
  poster: '',
  title: '',
});

export const AboutMediaForm = () => {
  const [photos, setPhotos] = useState<AboutPhoto[]>([]);
  const [videos, setVideos] = useState<AboutVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const hasData = useMemo(() => photos.length > 0 || videos.length > 0, [photos.length, videos.length]);

  const loadContent = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/content/about', { cache: 'no-store' });
      const payload = (await response.json()) as ApiResponse;

      if (!response.ok || !payload.ok || !payload.content) {
        setError(payload.error || 'Impossible de charger les médias.');
        return;
      }

      setPhotos(payload.content.media.photos || []);
      setVideos(payload.content.media.videos || []);
    } catch {
      setError('Erreur réseau pendant le chargement.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const onPhotoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setUploadingPhoto(true);
    setMessage('');
    setError('');

    try {
      const form = new FormData();
      form.append('kind', 'photo');
      form.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: form,
      });
      const payload = (await response.json()) as ApiResponse;
      if (!response.ok || !payload.ok || !payload.media?.url) {
        setError(payload.error || "Échec de l'upload de la photo.");
        return;
      }

      setPhotos((prev) => [
        ...prev,
        {
          id: createItemId('photo'),
          url: payload.media!.url,
          alt: file.name.replace(/\.[^.]+$/, ''),
        },
      ]);
      setMessage('Photo uploadée. N’oubliez pas de cliquer sur “Enregistrer”.');
    } catch {
      setError("Erreur réseau pendant l'upload photo.");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const onVideoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setUploadingVideo(true);
    setMessage('');
    setError('');

    try {
      const form = new FormData();
      form.append('kind', 'video');
      form.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: form,
      });
      const payload = (await response.json()) as ApiResponse;
      if (!response.ok || !payload.ok || !payload.media?.url) {
        setError(payload.error || "Échec de l'upload de la vidéo.");
        return;
      }

      setVideos((prev) => [
        ...prev,
        {
          id: createItemId('video'),
          url: payload.media!.url,
          title: file.name.replace(/\.[^.]+$/, ''),
          poster: photos[0]?.url || '',
        },
      ]);
      setMessage('Vidéo uploadée. N’oubliez pas de cliquer sur “Enregistrer”.');
    } catch {
      setError("Erreur réseau pendant l'upload vidéo.");
    } finally {
      setUploadingVideo(false);
    }
  };

  const save = async () => {
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const payload: AboutContent = { media: { photos, videos } };
      const response = await fetch('/api/admin/content/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ApiResponse;
      if (!response.ok || !result.ok || !result.content) {
        setError(result.error || 'Sauvegarde impossible.');
        return;
      }

      setPhotos(result.content.media.photos);
      setVideos(result.content.media.videos);
      setMessage('Modifications enregistrées avec succès.');
    } catch {
      setError('Erreur réseau pendant la sauvegarde.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-gray-600">Chargement du contenu…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-text-dark">Médias de la page À propos</h2>
        <p className="mt-1 text-sm text-gray-500">
          Ajoutez des photos et vidéos. Les URLs sauvegardées alimentent automatiquement la section “DNS Service en action”.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm">
            <span className="mb-2 block font-medium text-gray-700">Uploader une photo</span>
            <input type="file" accept="image/*" onChange={onPhotoUpload} className="block w-full text-sm" />
            <span className="mt-2 block text-xs text-gray-500">
              {uploadingPhoto ? 'Upload photo en cours…' : 'Formats image autorisés via configuration serveur.'}
            </span>
          </label>

          <label className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm">
            <span className="mb-2 block font-medium text-gray-700">Uploader une vidéo</span>
            <input type="file" accept="video/*" onChange={onVideoUpload} className="block w-full text-sm" />
            <span className="mt-2 block text-xs text-gray-500">
              {uploadingVideo ? 'Upload vidéo en cours…' : 'Formats vidéo autorisés via configuration serveur.'}
            </span>
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-text-dark">Photos ({photos.length})</h3>
          <button
            type="button"
            onClick={() => setPhotos((prev) => [...prev, emptyPhoto()])}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Ajouter une photo
          </button>
        </div>

        <div className="space-y-4">
          {photos.map((photo, index) => (
            <div key={photo.id} className="rounded-xl border border-gray-200 p-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
                <div className="md:col-span-3">
                  <label className="mb-1 block text-xs font-semibold text-gray-500">URL photo</label>
                  <input
                    value={photo.url}
                    onChange={(event) =>
                      setPhotos((prev) => prev.map((item, i) => (i === index ? { ...item, url: event.target.value } : item)))
                    }
                    placeholder="https://..."
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-xs font-semibold text-gray-500">Texte alternatif</label>
                  <input
                    value={photo.alt}
                    onChange={(event) =>
                      setPhotos((prev) => prev.map((item, i) => (i === index ? { ...item, alt: event.target.value } : item)))
                    }
                    placeholder="Description de la photo"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {photo.url ? (
                <div className="mt-3">
                  <Image
                    src={photo.url}
                    alt={photo.alt || 'Aperçu photo'}
                    width={640}
                    height={380}
                    className="h-auto max-h-72 w-full rounded-lg border border-gray-200 object-contain bg-gray-50"
                    unoptimized={photo.url.startsWith('http')}
                  />
                </div>
              ) : null}

              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setPhotos((prev) => prev.filter((item) => item.id !== photo.id))}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-text-dark">Vidéos ({videos.length})</h3>
          <button
            type="button"
            onClick={() => setVideos((prev) => [...prev, emptyVideo()])}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Ajouter une vidéo
          </button>
        </div>

        <div className="space-y-4">
          {videos.map((video, index) => (
            <div key={video.id} className="rounded-xl border border-gray-200 p-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
                <div className="md:col-span-3">
                  <label className="mb-1 block text-xs font-semibold text-gray-500">URL vidéo</label>
                  <input
                    value={video.url}
                    onChange={(event) =>
                      setVideos((prev) => prev.map((item, i) => (i === index ? { ...item, url: event.target.value } : item)))
                    }
                    placeholder="https://...mp4"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-xs font-semibold text-gray-500">Titre (optionnel)</label>
                  <input
                    value={video.title || ''}
                    onChange={(event) =>
                      setVideos((prev) => prev.map((item, i) => (i === index ? { ...item, title: event.target.value } : item)))
                    }
                    placeholder="Présentation DNS Service"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-5">
                <div className="md:col-span-3">
                  <label className="mb-1 block text-xs font-semibold text-gray-500">Poster (optionnel)</label>
                  <input
                    value={video.poster || ''}
                    onChange={(event) =>
                      setVideos((prev) => prev.map((item, i) => (i === index ? { ...item, poster: event.target.value } : item)))
                    }
                    placeholder="https://...jpg"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {video.url ? (
                <div className="mt-3 overflow-hidden rounded-lg border border-gray-200 bg-black">
                  <video
                    className="h-auto max-h-72 w-full object-contain"
                    controls
                    preload="metadata"
                    poster={video.poster || undefined}
                  >
                    <source src={video.url} />
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                </div>
              ) : null}

              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setVideos((prev) => prev.filter((item) => item.id !== video.id))}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!hasData ? <p className="text-sm text-amber-700">Ajoutez au moins une photo ou une vidéo avant d’enregistrer.</p> : null}
      {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={save}
          disabled={saving || !hasData}
          className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60"
        >
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>
    </div>
  );
};
