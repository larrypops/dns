import type { Metadata } from 'next';
import { Home } from '../views/Home';
import { SITE_NAME, absoluteUrl } from '../lib/seo';

export const dynamic = 'force-static';
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Assainissement et Désinfection à Yaoundé',
  description:
    'DNS Service intervient à Yaoundé et ses environs pour l’assainissement, la désinfection, la lutte anti-nuisibles, la pisciculture et l’accompagnement agricole.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `Assainissement et Désinfection à Yaoundé | ${SITE_NAME}`,
    description:
      'Interventions rapides et durables en assainissement, désinfection, nuisibles, agriculture et pisciculture.',
    url: absoluteUrl('/'),
  },
  twitter: {
    title: `Assainissement et Désinfection à Yaoundé | ${SITE_NAME}`,
    description:
      'Interventions rapides et durables en assainissement, désinfection, nuisibles, agriculture et pisciculture.',
  },
};

export default function HomePage() {
  return <Home />;
}
