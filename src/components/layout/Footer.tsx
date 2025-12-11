'use client';

import { motion } from 'framer-motion';
import { Instagram, MessageCircle } from 'lucide-react';
import Link from 'next/link';

import { Logo } from '@/components/brand';
import { Container } from '@/components/ui';
import { CATEGORY_LINKS, FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/constants';
import { useLocale, useTranslations } from '@/lib/i18n-client';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const ShopierIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z" />
  </svg>
);

interface FooterProps {
  // locale prop'u kaldırıldı, useTranslations kullanılıyor
}

export function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const tCategories = useTranslations('categories');
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-12 md:py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Logo size="md" />
              <p className="mt-2 text-sm text-primary font-medium tracking-wider">
                {t('tagline')}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                {t('description')}
              </p>
              <div className="mt-6">
                <p className="text-sm font-semibold text-foreground mb-3">
                  {t('followUs')}
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={SOCIAL_LINKS.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-background hover:bg-primary hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.tiktok.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-background hover:bg-primary hover:text-white transition-colors"
                    aria-label="TikTok"
                  >
                    <TikTokIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.shopier.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-background hover:bg-primary hover:text-white transition-colors"
                    aria-label="Shopier"
                  >
                    <ShopierIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-background hover:bg-primary hover:text-white transition-colors"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {t('quickLinks')}
              </h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.quickLinks.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {t('links.' + link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {t('categoriesTitle')}
              </h3>
              <ul className="space-y-3">
                {CATEGORY_LINKS.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {t(`categories.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {t('contact')}
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href={SOCIAL_LINKS.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {SOCIAL_LINKS.whatsapp.handle}
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <Instagram className="w-4 h-4" />
                    {SOCIAL_LINKS.instagram.handle}
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.shopier.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <ShopierIcon className="w-4 h-4" />
                    {SOCIAL_LINKS.shopier.handle}
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} NOVELLA.{' '}
              {locale === 'tr'
                ? 'Tüm hakları saklıdır.'
                : 'All rights reserved.'}
            </p>
            <div className="flex items-center gap-4">
              {FOOTER_LINKS.legal.map((link) => (
                <Link
                  key={link.key}
                  href={`/${locale}${link.href}`}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('links.' + link.key)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
