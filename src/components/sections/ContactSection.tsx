'use client';

// NOVELLA - Contact Section
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, MessageCircle } from 'lucide-react';
import { Container } from '@/components/ui';
import Link from 'next/link';

interface ContactSectionProps {
  locale: string;
}

export function ContactSection({ locale }: ContactSectionProps) {
  return (
    <Container>
      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-full mb-6">
            <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-medium text-[#D4AF37]">İletişim</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Bize Ulaşın</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Sorularınız için bizimle iletişime geçebilirsiniz. Size yardımcı olmaktan mutluluk duyarız.
          </p>
          <div className="space-y-4">
            <a href="tel:+905451125059" className="flex items-center gap-3 p-4 rounded-lg hover:bg-muted transition-colors">
              <Phone className="w-5 h-5 text-[#D4AF37]" />
              <span>0545 112 50 59</span>
            </a>
            <a href="mailto:info@novella.com.tr" className="flex items-center gap-3 p-4 rounded-lg hover:bg-muted transition-colors">
              <Mail className="w-5 h-5 text-[#D4AF37]" />
              <span>info@novella.com.tr</span>
            </a>
            <div className="flex items-center gap-3 p-4 rounded-lg">
              <MapPin className="w-5 h-5 text-[#D4AF37]" />
              <span>Tekirdağ, Türkiye</span>
            </div>
            <a href="https://instagram.com/jewelry.novella" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg hover:bg-muted transition-colors">
              <Instagram className="w-5 h-5 text-[#D4AF37]" />
              <span>@jewelry.novella</span>
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-card p-8 rounded-2xl border border-border"
        >
          <h3 className="text-2xl font-bold mb-6">Mesaj Gönderin</h3>
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Adınız"
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-colors"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="E-posta"
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-colors"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Mesajınız"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-colors resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B76E79] transition-colors font-medium"
            >
              Gönder
            </button>
          </form>
        </motion.div>
      </div>
    </Container>
  );
}
