'use client';

import { useTranslations } from '@/lib/i18n-client';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { Button, Container } from '@/components/ui';

interface HeroSectionProps {
  locale: string;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
      </div>

      {/* Decorative Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute w-[500px] h-[500px] border border-primary/10 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute w-[700px] h-[700px] border border-primary/5 rounded-full"
        />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full uppercase mb-8 border border-primary/20">
              <Sparkles className="w-4 h-4" />
              {t('badge')}
              <Sparkles className="w-4 h-4" />
            </span>
          </motion.div>

          {/* Title - ÇEVİRİYE BAĞLANDI */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6"
          >
            <span className="text-foreground">{t('title')}</span>
            <br />
            <span className="text-primary">{t('titleHighlight')}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
          >
            {t('description')}
          </motion.p>

          {/* CTA Buttons - NESTED CTA KULLANIMI */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link href={`/${locale}/collections`}>
              <Button size="lg" className="group">
                {t('cta.primary')}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href={`/${locale}/about`}>
              <Button variant="outline" size="lg">
                {t('cta.secondary')}
              </Button>
            </Link>
          </motion.div>

          {/* Stats - ÇEVİRİLEBİLİR YAPTIM */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center gap-8 md:gap-12 mt-16 pt-8 border-t border-border/50"
          >
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">
                500+
              </p>
              <p className="text-sm text-muted-foreground">
                {locale === 'tr' ? 'Mutlu Müşteri' : 'Happy Customers'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">
                200+
              </p>
              <p className="text-sm text-muted-foreground">
                {locale === 'tr' ? 'Ürün Çeşidi' : 'Product Variety'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">4.9</p>
              <p className="text-sm text-muted-foreground">
                {locale === 'tr' ? 'Müşteri Puanı' : 'Customer Rating'}
              </p>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
