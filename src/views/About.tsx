'use client';

import { motion } from 'motion/react';
import { ShieldCheck, Target, Eye, CheckCircle2, Sprout, Droplets, Bug, Trees, Trash2 } from 'lucide-react';
import { Section, Button } from '../components/UI';
import { cn } from '../lib/utils';

export const About = () => {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="bg-dns-gradient text-white py-20 overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display italic leading-tight">À propos de <br />DNS Assainissement</h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Nous sommes une entreprise dédiée à l'amélioration de la qualité de vie à Yaoundé 
              par des services d'assainissement et d'entretien d'excellence.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2 pointer-events-none" />
      </section>

      {/* Main Content */}
      <Section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8 text-lg text-gray-600 leading-relaxed">
            <h2 className="text-2xl font-bold text-text-dark">
              DNS Assainissement est une entreprise spécialisée dans le nettoyage, la désinfection, l’entretien des espaces et l’assainissement général à Yaoundé.
            </h2>
            <p>
              Nous accompagnons particuliers et professionnels dans la mise en place d’environnements propres, sains et sécurisés.
            </p>
            <p>
              Grâce à notre expérience et à l’utilisation d’un équipement professionnel, nous garantissons des prestations efficaces et adaptées aux réalités locales. Notre engagement est de fournir un service irréprochable tout en préservant l'intégrité de vos espaces de vie et de travail.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Mission", icon: Target, text: "Offrir des services d’assainissement fiables pour améliorer la qualité de vie et la santé des clients.", color: "bg-green-50 text-green-600" },
              { title: "Vision", icon: Eye, text: "Devenir une référence à Yaoundé dans le domaine de l’assainissement et de l’entretien des espaces.", color: "bg-blue-50 text-blue-600" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", item.color)}>
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

      {/* Values */}
      <Section className="bg-background-soft">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm uppercase tracking-[0.2em] text-primary font-bold mb-4">Notre ADN</h2>
          <h3 className="text-4xl font-bold text-text-dark">Nos Valeurs Fondamentales</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            "Propreté",
            "Rapidité",
            "Professionnalisme",
            "Efficacité",
            "Satisfaction client"
          ].map((val, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm text-center border border-gray-100 hover:border-primary transition-all group"
            >
              <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <CheckCircle2 size={24} />
              </div>
              <span className="font-bold text-lg text-text-dark">{val}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Expertise */}
      <Section>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm uppercase tracking-[0.2em] text-primary font-bold mb-4">Savoir-faire</h2>
          <h3 className="text-4xl font-bold text-text-dark">Domaines d'expertise</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Nettoyage", icon: Trash2 },
            { title: "Désinfection", icon: ShieldCheck },
            { title: "Désherbage", icon: Trees },
            { title: "Anti-insectes", icon: Bug },
            { title: "Assainissement", icon: Droplets },
            { title: "Pisciculture & Agri", icon: Sprout }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-6 bg-background-soft rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <item.icon size={24} />
              </div>
              <span className="text-xl font-bold text-text-dark">{item.title}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <div className="bg-dns-gradient p-12 rounded-[2rem] text-white">
            <h3 className="text-3xl font-bold mb-6">Besoin d’un service professionnel ?</h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Notre équipe est prête à intervenir pour répondre à vos exigences de propreté et d'hygiène.
            </p>
            <Button 
                size="lg" 
                className="bg-white text-primary border-none hover:bg-accent hover:text-white"
                onClick={() => window.location.href = 'tel:+237670640788'}
              >
                Parlons de votre projet
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};
