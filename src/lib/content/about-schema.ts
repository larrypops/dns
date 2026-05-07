import type { AboutContent, AboutPhoto, AboutVideo } from './types';

const MAX_ITEMS = 30;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const asString = (value: unknown, fallback = ''): string => (typeof value === 'string' ? value.trim() : fallback);

const sanitizeUrl = (value: unknown): string => {
  const url = asString(value);
  if (!url) return '';
  if (url.startsWith('/')) return url;

  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString();
    }
  } catch {
    return '';
  }

  return '';
};

const normalizePhoto = (value: unknown, index: number): AboutPhoto | null => {
  if (!isObject(value)) return null;

  const url = sanitizeUrl(value.url);
  if (!url) return null;

  const id = asString(value.id) || `photo-${index + 1}`;
  const alt = asString(value.alt) || 'Photo DNS Service';

  return { id, url, alt };
};

const normalizeVideo = (value: unknown, index: number): AboutVideo | null => {
  if (!isObject(value)) return null;

  const url = sanitizeUrl(value.url);
  if (!url) return null;

  const id = asString(value.id) || `video-${index + 1}`;
  const poster = sanitizeUrl(value.poster);
  const title = asString(value.title);

  return {
    id,
    url,
    poster: poster || undefined,
    title: title || undefined,
  };
};

const normalizePhotos = (value: unknown): AboutPhoto[] => {
  if (!Array.isArray(value)) return [];
  return value.map(normalizePhoto).filter((item): item is AboutPhoto => item !== null).slice(0, MAX_ITEMS);
};

const normalizeVideos = (value: unknown): AboutVideo[] => {
  if (!Array.isArray(value)) return [];
  return value.map(normalizeVideo).filter((item): item is AboutVideo => item !== null).slice(0, MAX_ITEMS);
};

export const defaultAboutContent = (): AboutContent => ({
  media: {
    photos: [
      {
        id: 'photo-default-1',
        url: '/images/new-image-01.jpeg',
        alt: 'Équipe DNS Service sur le terrain',
      },
    ],
    videos: [
      {
        id: 'video-default-1',
        url: '/images/new-video-02.mp4',
        poster: '/images/new-image-01.jpeg',
        title: 'DNS Service en action',
      },
    ],
  },
});

export const normalizeAboutContent = (value: unknown): AboutContent => {
  if (!isObject(value)) return defaultAboutContent();
  const media = isObject(value.media) ? value.media : {};

  const photos = normalizePhotos(media.photos);
  const videos = normalizeVideos(media.videos);
  const fallback = defaultAboutContent().media;

  return {
    media: {
      photos: photos.length ? photos : fallback.photos,
      videos,
    },
  };
};
