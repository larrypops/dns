import type { Metadata } from 'next';
import { About } from '../../views/About';
import { SITE_NAME, absoluteUrl } from '../../lib/seo';
import { getAboutContent } from '@/lib/content/about-content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'À propos de DNS Service',
  description:
    'Découvrez DNS Service, entreprise fondée à Yaoundé et reconnue au niveau national pour l’assainissement, la lutte contre les nuisibles, l’agriculture et la pisciculture.',
  alternates: {
    canonical: '/a-propos',
  },
  openGraph: {
    title: `À propos de DNS Service | ${SITE_NAME}`,
    description:
      'Mission, vision nationale, équipe qualifiée et domaines d’intervention de DNS Service.',
    url: absoluteUrl('/a-propos'),
  },
  twitter: {
    title: `À propos de DNS Service | ${SITE_NAME}`,
    description:
      'Mission, vision nationale, équipe qualifiée et domaines d’intervention de DNS Service.',
  },
};

export default async function AboutPage() {
  const content = await getAboutContent();
  return <About photos={content.media.photos} videos={content.media.videos} />;
}
