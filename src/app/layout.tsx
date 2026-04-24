import type { Metadata } from 'next';
import Image from 'next/image';
import type { ReactNode } from 'react';
import './globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, absoluteUrl, getSiteUrl } from '../lib/seo';

const siteUrl = getSiteUrl();
const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_NAME,
  slogan: 'Stop aux nuisibles',
  url: siteUrl,
  telephone: '+237670640788',
  email: 'ekanidenis04@gmail.com',
  image: absoluteUrl('/images/logo.jpg'),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Yaoundé',
    addressCountry: 'CM',
  },
  areaServed: ['Yaoundé', 'Cameroun'],
  description: DEFAULT_DESCRIPTION,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'DNS Service',
    'assainissement Yaoundé',
    'désinfection Yaoundé',
    'lutte nuisibles Cameroun',
    'agriculture Yaoundé',
    'pisciculture Cameroun',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: absoluteUrl('/'),
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: absoluteUrl('/opengraph-image'),
        width: 1200,
        height: 630,
        alt: 'DNS Service - Stop aux nuisibles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl('/twitter-image')],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/images/logo.jpg',
    shortcut: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />

        <a
          href="https://wa.me/237670640788"
          target="_blank"
          rel="noreferrer"
          aria-label="Discuter avec DNS Service sur WhatsApp"
          className="fixed bottom-5 right-5 w-[68px] h-[68px] rounded-full flex items-center justify-center shadow-2xl z-40 hover:scale-110 transition-transform active:scale-95"
        >
          <Image
            src="/images/whatsapp-official.svg"
            alt="Logo officiel WhatsApp"
            width={64}
            height={64}
            className="w-16 h-16 object-contain"
            priority
          />
        </a>
      </body>
    </html>
  );
}
