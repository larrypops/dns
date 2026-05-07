import 'server-only';

export type MediaProvider = 'cloudinary' | 's3';

const parsePositiveNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return parsed;
};

const parseAllowedMimeTypes = (value: string | undefined): string[] => {
  if (!value) {
    return [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'video/mp4',
      'video/webm',
      'video/quicktime',
    ];
  }

  return value
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
};

const parseMediaProvider = (value: string | undefined): MediaProvider => {
  if (value === 's3') return 's3';
  return 'cloudinary';
};

export const serverEnv = {
  adminUsername: process.env.ADMIN_USERNAME || 'admin',
  adminPassword: process.env.ADMIN_PASSWORD || '',
  adminPasswordHash: process.env.ADMIN_PASSWORD_HASH || '',
  adminSessionSecret: process.env.ADMIN_SESSION_SECRET || '',
  mediaProvider: parseMediaProvider(process.env.MEDIA_PROVIDER),
  adminUploadMaxMb: parsePositiveNumber(process.env.ADMIN_UPLOAD_MAX_MB, 20),
  adminUploadAllowedTypes: parseAllowedMimeTypes(process.env.ADMIN_UPLOAD_ALLOWED_TYPES),
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
    uploadFolder: process.env.CLOUDINARY_UPLOAD_FOLDER || 'dns-service/about',
    secureDistribution: process.env.CLOUDINARY_SECURE_DISTRIBUTION || '',
  },
  s3: {
    bucket: process.env.S3_BUCKET || '',
    region: process.env.S3_REGION || '',
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    publicUrlBase: process.env.S3_PUBLIC_URL_BASE || '',
    uploadPrefix: process.env.S3_UPLOAD_PREFIX || 'dns-service/about',
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
  },
};
