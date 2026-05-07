import 'server-only';

import { serverEnv } from '../env/server';
import { cloudinaryProvider } from './cloudinary';
import type { StorageProvider } from './types';

const s3NotImplementedProvider: StorageProvider = {
  upload: async () => {
    throw new Error("Le provider S3 n'est pas encore activé dans ce projet. Utilisez MEDIA_PROVIDER=cloudinary.");
  },
};

export const storageProvider: StorageProvider =
  serverEnv.mediaProvider === 's3' ? s3NotImplementedProvider : cloudinaryProvider;
