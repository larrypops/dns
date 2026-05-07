export type UploadKind = 'photo' | 'video';

export type UploadInput = {
  file: File;
  kind: UploadKind;
};

export type UploadResult = {
  url: string;
  bytes?: number;
  width?: number;
  height?: number;
  format?: string;
  resourceType?: string;
};

export type StorageProvider = {
  upload: (input: UploadInput) => Promise<UploadResult>;
};
