import type { Metadata } from 'next';
import { Contact } from '../../views/Contact';
import { SITE_NAME, absoluteUrl } from '../../lib/seo';

export const dynamic = 'force-static';
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Contact DNS Service',
  description:
    'Contactez DNS Service à Yaoundé pour vos besoins en assainissement, désinfection, lutte anti-nuisibles, agriculture et pisciculture.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: `Contact DNS Service | ${SITE_NAME}`,
    description:
      'Demande de devis et intervention rapide à Yaoundé et ses environs.',
    url: absoluteUrl('/contact'),
  },
  twitter: {
    title: `Contact DNS Service | ${SITE_NAME}`,
    description: 'Demande de devis et intervention rapide à Yaoundé et ses environs.',
  },
};

export default function ContactPage() {
  return <Contact />;
}
