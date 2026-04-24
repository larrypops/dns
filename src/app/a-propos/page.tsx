import type { Metadata } from 'next';
import { About } from '../../views/About';
import { SITE_NAME, absoluteUrl } from '../../lib/seo';

export const dynamic = 'force-static';
export const revalidate = 86400;

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

export default function AboutPage() {
  return <About />;
}
