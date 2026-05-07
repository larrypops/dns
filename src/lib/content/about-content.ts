import 'server-only';

import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { AboutContent } from './types';
import { defaultAboutContent, normalizeAboutContent } from './about-schema';

const ABOUT_CONTENT_PATH = path.join(process.cwd(), 'content', 'about.json');

const ensureDirectory = async (filePath: string) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
};

export const getAboutContent = async (): Promise<AboutContent> => {
  try {
    const raw = await fs.readFile(ABOUT_CONTENT_PATH, 'utf8');
    const parsed = JSON.parse(raw) as unknown;
    return normalizeAboutContent(parsed);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      const fallback = defaultAboutContent();
      await saveAboutContent(fallback);
      return fallback;
    }
    return defaultAboutContent();
  }
};

export const saveAboutContent = async (content: AboutContent): Promise<AboutContent> => {
  const normalized = normalizeAboutContent(content);
  await ensureDirectory(ABOUT_CONTENT_PATH);
  await fs.writeFile(ABOUT_CONTENT_PATH, `${JSON.stringify(normalized, null, 2)}\n`, 'utf8');
  return normalized;
};
