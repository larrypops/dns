'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '../lib/utils';
import { 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Droplets, 
  Trash2, 
  Bug, 
  Trees, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  ArrowRight,
  Sprout
} from 'lucide-react';
import { Section, Button } from '../components/UI';

export const Home = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-dns-gradient text-white pt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 font-display">
                Un environnement <span className="text-accent underline decoration-white/30">propre, sain</span> et sécurisé à Yaoundé
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed font-medium">
                DNS Assainissement vous accompagne pour le nettoyage, la désinfection et l’entretien 
                de vos espaces : maisons, bureaux, terrains et exploitations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button 
                  size="lg" 
                  className="bg-white text-primary border-none hover:bg-accent hover:text-white"
                  onClick={() => window.location.href = 'tel:+237670640788'}
                >
                  <Phone /> Appeler maintenant
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="border-2 border-white/20 hover:bg-white hover:text-primary transition-all"
                  onClick={() => window.location.href = 'https://wa.me/237670640788'}
                >
                  <MessageSquare /> WhatsApp
                </Button>
              </div>

              {/* Quick Arguments */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 pt-10 border-t border-white/20">
                {[
                  { icon: Clock, text: "Intervention rapide" },
                  { icon: ShieldCheck, text: "Matériel professionnel" },
                  { icon: Sparkles, text: "Efficacité garantie" },
                  { icon: Droplets, text: "Prix accessibles" },
                  { icon: Clock, text: "Disponible 24h/24" }
                ].map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    key={i} 
                    className="flex items-center gap-2 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                      <CheckCircle2 size={16} className="text-accent group-hover:text-white" />
                    </div>
                    <span className="text-xs md:text-sm font-semibold tracking-wide uppercase opacity-90">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hero Visual Element */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden lg:block overflow-hidden pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-full w-full bg-white/5 backdrop-blur-3xl rounded-l-[100px] border-l border-white/10 flex items-center justify-center"
          >
            <div className="relative">
              <Droplets size={200} className="text-white/20 animate-pulse" />
              <ShieldCheck size={100} className="text-accent absolute -bottom-10 -right-10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Presentation Section */}
      <Section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-dns-gradient rounded-3xl overflow-hidden shadow-2xl relative">
              <Image
                src="/images/image.jpg"
                alt="Intervention DNS Assainissement"
                width={800}
                height={800}
                className="w-full h-full object-cover mix-blend-overlay opacity-60"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                      <Sparkles />
                    </div>
                    <h3 className="text-2xl font-bold text-primary">Expert à Yaoundé</h3>
                  </div>
                  <p className="text-gray-600 font-medium">
                    Une prestation adaptée aux réalités locales avec des standards internationaux.
                  </p>
                </div>
              </div>
            </div>
            {/* Stats Overlay */}
            <div className="absolute -bottom-6 -right-6 bg-secondary text-white p-6 rounded-2xl shadow-xl hidden md:block">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm opacity-80 uppercase tracking-wider">Satisfaction Client</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm uppercase tracking-[0.2em] text-primary font-bold mb-4">À Propos de nous</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 text-text-dark leading-tight">
              Votre expert en assainissement et entretien d’espaces
            </h3>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                <strong>DNS Assainissement</strong> est une entreprise spécialisée dans le nettoyage, 
                la désinfection, le désherbage et l’entretien général des espaces à Yaoundé.
              </p>
              <p>
                Nous intervenons auprès des particuliers, entreprises, écoles, chantiers 
                et exploitations agricoles pour garantir un environnement propre, sain et sécurisé.
              </p>
              <p>
                Grâce à un équipement moderne et une équipe formée, nous assurons des prestations rapides, 
                efficaces et adaptées à chaque besoin.
              </p>
            </div>
            <div className="mt-10">
              <Button as={Link} href="/a-propos">
                En savoir plus <ArrowRight size={20} />
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Services Section */}
      <Section id="services" className="bg-background-soft">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm uppercase tracking-[0.2em] text-primary font-bold mb-4">Nos Prestations</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-text-dark">
            Nos services d’assainissement et d’entretien
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Désherbage des espaces",
              desc: "Nous éliminons les herbes indésirables dans les cours, terrains, espaces verts et parcelles.",
              icon: Trees,
              color: "text-green-600",
              items: ["Cours", "Terrains", "Espaces verts", "Parcelles"]
            },
            {
              title: "Nettoyage cours & terrains",
              desc: "Nettoyage complet extérieur pour un terrain propre et débarrassé.",
              icon: Trash2,
              color: "text-blue-600",
              items: ["Débarras", "Nettoyage après chantier", "Entretien régulier"]
            },
            {
              title: "Désinfection bureaux & maisons",
              desc: "Élimination des bactéries, germes et agents nuisibles pour votre santé.",
              icon: ShieldCheck,
              color: "text-primary",
              items: ["Maisons", "Bureaux", "Écoles", "Espaces publics"]
            },
            {
              title: "Traitement anti-moustiques",
              desc: "Réduction des risques sanitaires par des traitements insecticides efficaces.",
              icon: Bug,
              color: "text-red-500",
              items: ["Moustiques", "Insectes nuisibles"]
            },
            {
              title: "Assainissement général",
              desc: "Service complet pour remettre un espace en état profond.",
              icon: Droplets,
              color: "text-secondary",
              items: ["Nettoyage en profondeur", "Désinfection", "Mise en état"]
            },
            {
              title: "Services complémentaires",
              desc: "Expertise pointue en aquaculture et agriculture.",
              icon: Sprout,
              color: "text-emerald-700",
              items: ["Aquaculture / Pisciculture", "Création exploitation agricole", "Entretien bassins et étangs"]
            }
          ].map((service, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className={cn("w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 transition-colors group-hover:bg-primary/10", service.color)}>
                <service.icon size={32} />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-text-dark">{service.title}</h4>
              <p className="text-gray-500 mb-6 leading-relaxed">{service.desc}</p>
              <ul className="space-y-3">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <CheckCircle2 size={16} className="text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Why Us Section */}
      <Section className="bg-text-dark text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-dns-gradient opacity-10 blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-4">Avantages</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">
              Pourquoi choisir <br />DNS Assainissement ?
            </h3>
            
            <div className="space-y-4">
              {[
                "Équipement professionnel moderne",
                "Intervention rapide sur site",
                "Travail propre et organisé",
                "Solutions adaptées à chaque client",
                "Prix accessibles à tous",
                "Disponible partout à Yaoundé"
              ].map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10"
                >
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <CheckCircle2 size={18} className="text-white" />
                  </div>
                  <span className="text-lg font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[3/4] max-w-sm mx-auto bg-white/10 rounded-3xl border border-white/20 p-2 overflow-hidden shadow-2xl">
              <Image
                src="/images/flyer.jpg"
                alt="Équipement DNS Assainissement"
                width={800}
                height={1200}
                className="w-full h-full object-cover rounded-2xl opacity-80"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            {/* Visual Callout */}
            <div className="absolute -top-10 -right-6 w-32 h-32 bg-accent rounded-full flex flex-col items-center justify-center text-center p-4 border-4 border-text-dark rotate-12 hidden md:flex">
              <span className="text-xs uppercase font-bold tracking-widest opacity-80 text-white">Qualité</span>
              <span className="text-xl font-extrabold uppercase mt-1 text-white">PRO</span>
              <ShieldCheck size={24} className="mt-1 text-white" />
            </div>
          </div>
        </div>
      </Section>

      {/* Process Section */}
      <Section className="bg-white">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm uppercase tracking-[0.2em] text-primary font-bold mb-4">Notre Méthode</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-text-dark leading-tight">
            Comment se déroule <br />votre intervention ?
          </h3>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-6 relative z-10">
            {[
              { step: "01", title: "Contact", desc: "Appelez-nous ou écrivez sur WhatsApp" },
              { step: "02", title: "Analyse", desc: "Nous évaluons votre besoin précisément" },
              { step: "03", title: "Proposition", desc: "Nous donnons une solution adaptée" },
              { step: "04", title: "Intervention", desc: "Nous intervenons rapidement sur site" },
              { step: "05", title: "Résultat", desc: "Espace propre, sain et sécurisé" }
            ].map((step, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-white border-4 border-background-soft flex items-center justify-center mb-6 text-primary font-bold text-xl shadow-md group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {step.step}
                </div>
                <h4 className="text-xl font-bold mb-2 text-text-dark">{step.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-dns-gradient text-white">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 font-display italic">
              Besoin d’un nettoyage ou d’un assainissement rapide ?
            </h2>
            <p className="text-xl md:text-2xl text-white/80 mb-12">
              Contactez DNS Assainissement dès maintenant pour une intervention rapide et professionnelle. 
              Nos équipes sont prêtes à transformer votre espace.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary border-none hover:bg-accent hover:text-white text-xl"
                onClick={() => window.location.href = 'tel:+237670640788'}
              >
                <Phone /> +237 670 64 07 88
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-accent border-none text-white hover:bg-white hover:text-primary text-xl"
                onClick={() => window.location.href = 'https://wa.me/237670640788'}
              >
                <MessageSquare /> WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};
