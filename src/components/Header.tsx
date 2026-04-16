'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Button } from './UI';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À Propos', path: '/a-propos' },
    { name: 'Contact', path: '/contact' },
  ];

  const onHome = pathname === '/';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6',
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.jpg"
            alt="Logo DNS Assainissement"
            width={48}
            height={48}
            className="w-12 h-12 rounded-lg object-cover shadow-sm"
            priority
          />
          <div className="flex flex-col">
            <span
              className={cn(
                'font-display font-bold text-xl leading-tight',
                !isScrolled && onHome ? 'text-white' : 'text-primary',
              )}
            >
              DNS Assainissement
            </span>
            <span
              className={cn(
                'text-[10px] uppercase tracking-widest font-semibold',
                !isScrolled && onHome ? 'text-white/80' : 'text-gray-500',
              )}
            >
              Propreté • Hygiène • Sécurité
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={cn(
                'font-medium transition-colors hover:text-accent',
                !isScrolled && onHome ? 'text-white/90 hover:text-white' : 'text-text-dark',
                pathname === link.path && 'text-primary font-bold',
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button size="sm" onClick={() => (window.location.href = 'tel:+237670640788')}>
            <Phone size={18} />
            +237 670 64 07 88
          </Button>
        </nav>

        <button
          type="button"
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          className={cn('md:hidden p-2 rounded-lg', !isScrolled && onHome ? 'text-white' : 'text-primary')}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn('text-xl font-semibold text-text-dark', pathname === link.path && 'text-primary')}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-4 pt-4 border-t border-gray-100">
                <Button className="w-full justify-center" onClick={() => (window.location.href = 'tel:+237670640788')}>
                  <Phone size={20} />
                  Appeler maintenant
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-center"
                  onClick={() => (window.location.href = 'https://wa.me/237670640788')}
                >
                  <MessageSquare size={20} />
                  WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
