import 'server-only';

import crypto from 'node:crypto';
import { serverEnv } from '../env/server';
import type { StorageProvider, UploadInput, UploadResult } from './types';

type CloudinaryUploadResponse = {
  secure_url?: string;
  bytes?: number;
  width?: number;
  height?: number;
  format?: string;
  resource_type?: string;
  error?: { message?: string };
};

const slugifyFilename = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9-_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

const getPublicId = (fileName: string): string => {
  const base = fileName.replace(/\.[^.]+$/, '');
  const safeBase = slugifyFilename(base) || 'media';
  return `${safeBase}-${Date.now()}`;
};

const buildSignature = (params: Record<string, string | number>, apiSecret: string): string => {
  const serialized = Object.keys(params)
    .sort((a, b) => a.localeCompare(b))
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return crypto.createHash('sha1').update(`${serialized}${apiSecret}`).digest('hex');
};

const validateCloudinaryEnv = () => {
  const { cloudName, apiKey, apiSecret } = serverEnv.cloudinary;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      'Configuration Cloudinary manquante. Définissez CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY et CLOUDINARY_API_SECRET.',
    );
  }
};

const getResourceType = (input: UploadInput): 'image' | 'video' => {
  if (input.kind === 'video') return 'video';
  return input.file.type.startsWith('video/') ? 'video' : 'image';
};

export const cloudinaryProvider: StorageProvider = {
  upload: async (input: UploadInput): Promise<UploadResult> => {
    validateCloudinaryEnv();

    const { cloudName, apiKey, apiSecret, uploadFolder } = serverEnv.cloudinary;
    const timestamp = Math.floor(Date.now() / 1000);
    const publicId = getPublicId(input.file.name);
    const resourceType = getResourceType(input);

    const paramsToSign: Record<string, string | number> = {
      folder: uploadFolder,
      public_id: publicId,
      timestamp,
    };

    const signature = buildSignature(paramsToSign, apiSecret);
    const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const form = new FormData();
    form.append('file', input.file);
    form.append('api_key', apiKey);
    form.append('timestamp', String(timestamp));
    form.append('signature', signature);
    form.append('folder', uploadFolder);
    form.append('public_id', publicId);

    const response = await fetch(endpoint, {
      method: 'POST',
      body: form,
    });

    const payload = (await response.json()) as CloudinaryUploadResponse;
    if (!response.ok || !payload.secure_url) {
      throw new Error(payload.error?.message || 'Échec de l’upload Cloudinary.');
    }

    return {
      url: payload.secure_url,
      bytes: payload.bytes,
      width: payload.width,
      height: payload.height,
      format: payload.format,
      resourceType: payload.resource_type,
    };
  },
};
