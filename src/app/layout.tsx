import type { Metadata } from 'next';
import Image from 'next/image';
import type { ReactNode } from 'react';
import './globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'DNS Assainissement | Propreté, Hygiène, Sécurité',
  description:
    'DNS Assainissement propose des services professionnels de nettoyage, désinfection et assainissement à Yaoundé.',
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
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />

        <a
          href="https://wa.me/237670640788"
          target="_blank"
          rel="noreferrer"
          aria-label="Discuter avec DNS Assainissement sur WhatsApp"
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
