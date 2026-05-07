import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Instagram, MessageSquare } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-text-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-white/20 shadow-md flex items-center justify-center shrink-0">
                <Image
                  src="/images/logo.jpg"
                  alt="Logo DNS Assainissement"
                  width={46}
                  height={46}
                  className="w-[46px] h-[46px] object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl leading-tight">DNS Assainissement</span>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-white/60">
                  Propreté • Hygiène • Sécurité
                </span>
              </div>
            </Link>
            <p className="text-white/60 leading-relaxed">
              Votre expert en nettoyage, désinfection et entretien d'espaces à Yaoundé. Intervention rapide
              24h/24 pour un environnement sain.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Liens Rapides</h3>
            <ul className="flex flex-col gap-4 text-white/60">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-white transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Nos Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contact</h3>
            <ul className="flex flex-col gap-4 text-white/60">
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-primary shrink-0" />
                <span>+237 670 64 07 88</span>
              </li>
              <li className="flex items-start gap-3">
                <MessageSquare size={20} className="text-primary shrink-0" />
                <span>+237 670 64 07 88 (WhatsApp)</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-primary shrink-0" />
                <span className="break-all">ekanidenis04@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary shrink-0" />
                <span>Akak, Yaoundé, Cameroun</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Disponibilité</h3>
            <p className="text-white/60 mb-4">Nous intervenons dans plusieurs quartiers de Yaoundé.</p>
            <div className="bg-primary/20 border border-primary/30 p-4 rounded-xl">
              <p className="text-primary font-bold text-center">Disponible 24h / 24</p>
              <p className="text-white/60 text-xs text-center mt-1">Selon les interventions</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© {new Date().getFullYear()} DNS Assainissement. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <p>Réalisé avec excellence pour Yaoundé</p>
            <Link href="/admin/login" className="text-[11px] uppercase tracking-[0.12em] text-white/30 hover:text-white/70 transition-colors">
              Espace admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
