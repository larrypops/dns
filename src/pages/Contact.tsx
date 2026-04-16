'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, PhoneCall } from 'lucide-react';
import { Section, Button } from '../components/UI';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    // Reset after 3 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="bg-dns-gradient text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display italic">Contactez <br />DNS Assainissement</h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Une question ? Un devis ? Une intervention en urgence à Yaoundé ? 
              Nous sommes à votre écoute 24h/24.
            </p>
          </motion.div>
        </div>
      </section>

      <Section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-text-dark mb-8">Nos Coordonnées</h2>
              <div className="space-y-6">
                {[
                  { icon: Phone, title: "Téléphone", value: "+237 670 64 07 88", link: "tel:+237670640788" },
                  { icon: MessageSquare, title: "WhatsApp", value: "+237 670 64 07 88", link: "https://wa.me/237670640788" },
                  { icon: Mail, title: "Email", value: "ekanidenis04@gmail.com", link: "mailto:ekanidenis04@gmail.com" },
                  { icon: MapPin, title: "Adresse", value: "Akak, Yaoundé, Cameroun", link: "#" }
                ].map((item, i) => (
                  <motion.a 
                    href={item.link}
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-5 p-6 rounded-2xl bg-background-soft border border-transparent hover:border-primary transition-all group"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-dark">{item.title}</h3>
                      <p className="text-gray-500 font-medium">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="bg-secondary/5 rounded-3xl p-8 border border-secondary/10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
                   <MessageSquare className="animate-bounce" /> WhatsApp Rapide
                 </h3>
                 <p className="text-gray-600 mb-6">
                   Envoyez-nous directement votre besoin ou une photo de votre espace pour une prise en charge rapide.
                 </p>
                 <Button 
                    variant="secondary" 
                    className="w-full text-lg"
                    onClick={() => window.location.href = 'https://wa.me/237670640788'}
                  >
                   Discuter sur WhatsApp
                 </Button>
               </div>
            </div>

            <div>
               <h3 className="text-xl font-bold text-text-dark mb-4">Disponibilité</h3>
               <div className="flex items-center gap-3 text-primary font-bold bg-primary/5 p-4 rounded-xl border border-primary/20">
                 <PhoneCall className="animate-pulse" />
                 <span>Disponible 24h/24 selon les interventions</span>
               </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 border border-gray-100 relative">
              <h2 className="text-3xl font-bold text-text-dark mb-2">Envoyez-nous un message</h2>
              <p className="text-gray-500 mb-10">Réponse garantie sous 24h.</p>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 text-green-700 p-8 rounded-2xl flex flex-col items-center text-center gap-4"
                >
                  <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold">Message envoyé !</h3>
                  <p>Merci pour votre confiance. DNS Assainissement vous contactera très prochainement.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-bold text-text-dark uppercase tracking-wider">Nom complet</label>
                      <input 
                        required
                        type="text" 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        className="w-full bg-background-soft border-2 border-transparent focus:border-primary focus:bg-white rounded-xl px-4 py-3 outline-none transition-all placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-bold text-text-dark uppercase tracking-wider">Téléphone</label>
                      <input 
                        required
                        type="tel" 
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+237 ..."
                        className="w-full bg-background-soft border-2 border-transparent focus:border-primary focus:bg-white rounded-xl px-4 py-3 outline-none transition-all placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-bold text-text-dark uppercase tracking-wider">Type de service</label>
                    <select 
                      id="service" 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-background-soft border-2 border-transparent focus:border-primary focus:bg-white rounded-xl px-4 py-3 outline-none transition-all"
                    >
                      <option value="">Sélectionnez un service</option>
                      <option value="nettoyage">Nettoyage complet</option>
                      <option value="désinfection">Désinfection</option>
                      <option value="désherbage">Désherbage</option>
                      <option value="anti-insectes">Traitement anti-nuisibles</option>
                      <option value="agri">Agriculture / Pisciculture</option>
                      <option value="autre">Autre demande</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-text-dark uppercase tracking-wider">Votre message</label>
                    <textarea 
                      required
                      id="message" 
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Comment pouvons-nous vous aider ?"
                      className="w-full bg-background-soft border-2 border-transparent focus:border-primary focus:bg-white rounded-xl px-4 py-3 outline-none transition-all placeholder:text-gray-400 resize-none"
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full text-lg py-5 shadow-xl hover:shadow-primary/30">
                    Envoyer la demande <Send size={20} />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};
