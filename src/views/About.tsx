'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Target,
  Eye,
  CheckCircle2,
  Sprout,
  Bug,
  Fish,
  Building2,
  ShieldPlus,
} from 'lucide-react';
import { Section, Button } from '../components/UI';
import { cn } from '../lib/utils';

export const About = () => {
  const interventions = [
    {
      title: 'Assainissement et désinfection',
      text: 'Bâtiments, bureaux, structures sanitaires et bâtiments d’élevage.',
      icon: ShieldPlus,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Lutte contre les nuisibles',
      text: 'Moustiques, cafards, termites, rats et souris avec des méthodes durables.',
      icon: Bug,
      color: 'bg-rose-50 text-rose-600',
    },
    {
      title: 'Accompagnement agricole',
      text: 'Création et suivi d’exploitations pour améliorer productivité et rentabilité.',
      icon: Sprout,
      color: 'bg-emerald-50 text-emerald-700',
    },
    {
      title: 'Pisciculture et espaces verts',
      text: 'Entretien, optimisation et valorisation d’environnements sains et durables.',
      icon: Fish,
      color: 'bg-cyan-50 text-cyan-700',
    },
  ];

  return (
    <div className="pt-24">
      <section className="bg-dns-gradient text-white py-20 overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <p className="text-sm uppercase tracking-[0.2em] font-bold text-white/80 mb-4">Fondée à Yaoundé</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display italic leading-tight">À propos de DNS Service</h1>
            <p className="text-xl text-white/85 leading-relaxed max-w-3xl">
              DNS Service est une entreprise spécialisée dans l’assainissement, l’entretien des espaces verts,
              l’agriculture et la pisciculture. Notre mission est d’apporter des solutions efficaces et durables
              pour la santé, la productivité et le bien-être de nos clients.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 text-sm font-semibold">
                <Building2 size={16} /> Yaoundé et ses environs
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 text-sm font-semibold">
                <CheckCircle2 size={16} /> Légalement reconnue au niveau national
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 text-sm font-semibold">
                <Target size={16} /> Slogan: Stop aux nuisibles
              </span>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2 pointer-events-none" />
      </section>

      <Section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg text-gray-600 leading-relaxed"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-text-dark leading-tight">
              Une équipe qualifiée au service de l’assainissement et du développement agricole
            </h2>
            <p>
              Grâce à une équipe composée de techniciens en agro-pastoral et de manœuvres expérimentés,
              nous combinons savoir-faire technique, conseils personnalisés et méthodes respectueuses de
              l’environnement.
            </p>
            <p>
              Nous intervenons aussi bien sur les bâtiments et structures professionnelles que sur les
              exploitations agricoles et piscicoles, avec une approche orientée performance et durabilité.
            </p>
            <p>
              Notre vision est de devenir une référence nationale en matière d’assainissement et
              d’accompagnement agricole, tout en créant des emplois et en luttant efficacement contre les
              pathologies liées aux nuisibles.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: 'Mission',
                icon: Target,
                text: 'Apporter des solutions efficaces et durables pour la gestion des nuisibles et l’entretien des exploitations agricoles et des bâtiments.',
                color: 'bg-green-50 text-green-600',
              },
              {
                title: 'Vision',
                icon: Eye,
                text: 'Être une référence à Yaoundé et au niveau national dans l’assainissement et l’accompagnement agricole.',
                color: 'bg-blue-50 text-blue-600',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6"
              >
                <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center', item.color)}>
                  <item.icon size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-text-dark">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-background-soft">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm uppercase tracking-[0.2em] text-primary font-bold mb-4">Nos interventions</h2>
          <h3 className="text-4xl font-bold text-text-dark">Domaines d’action DNS Service</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interventions.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center shrink-0', item.color)}>
                  <item.icon size={22} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-text-dark mb-2">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-sm uppercase tracking-[0.2em] text-primary font-bold mb-4">Médias</h2>
          <h3 className="text-4xl font-bold text-text-dark">DNS Service en action</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden border border-gray-200 shadow-lg bg-white"
          >
            <div className="w-full bg-gray-50">
              <Image
                src="/images/new-image-01.jpeg"
                alt="Équipe DNS Service sur le terrain"
                width={960}
                height={1280}
                className="w-full h-auto object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl overflow-hidden border border-gray-200 shadow-lg bg-black"
          >
            <video
              className="w-full h-auto max-h-[78vh] object-contain bg-black"
              controls
              preload="metadata"
              playsInline
              poster="/images/new-image-01.jpeg"
            >
              <source src="/images/new-video-02.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </motion.div>
        </div>
      </Section>

      <Section>
        <div className="mt-4 text-center">
          <div className="bg-dns-gradient p-12 rounded-[2rem] text-white">
            <h3 className="text-3xl font-bold mb-6">Besoin d’un service professionnel ?</h3>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Notre équipe est prête à intervenir pour répondre à vos exigences de propreté, d’hygiène,
              de création et de suivi d’exploitation agricole ou piscicole.
            </p>
            <Button
              size="lg"
              className="bg-white text-primary border-none hover:bg-accent hover:text-white"
              onClick={() => (window.location.href = 'tel:+237670640788')}
            >
              <ShieldCheck size={20} /> Parlons de votre projet
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};
