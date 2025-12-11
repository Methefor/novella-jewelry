'use client';

// src/app/[locale]/collections/hair-accessories/page.tsx
// NOVELLA - Saç Aksesuarları Kategorisi Sayfası

import { useLocale, useTranslations } from '@/lib/i18n-client';
import { motion } from 'framer-motion';
import { Bell, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export default function HairAccessoriesPage() {
  const tCat = useTranslations('categories');
  const tBreadcrumb = useTranslations('breadcrumb');
  const tCollections = useTranslations('collections');
  const locale = useLocale();

  const breadcrumbItems = [
    { label: tBreadcrumb('collections'), href: `/${locale}/collections` },
    { label: tCat('hair-accessories') },
  ];

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-pink-50 to-background dark:from-pink-950/20 pt-8 pb-12">
        <Container>
          <Breadcrumb items={breadcrumbItems} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-center max-w-2xl mx-auto"
          >
            <div className="text-6xl mb-4">🎀</div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              {tCat('hair-accessories')}
            </h1>

            <p className="text-lg text-muted-foreground">
              {tCat('hairAccessoriesDescription')}
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Coming Soon */}
      <Section className="py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="w-24 h-24 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-pink-600 dark:text-pink-400" />
            </div>

            <h2 className="font-heading text-2xl font-bold mb-3">
              {tCollections('comingSoon')}
            </h2>

            <p className="text-muted-foreground mb-8">
              {locale === 'tr'
                ? 'Saç aksesuarları koleksiyonumuz üzerinde çalışıyoruz. Haberdar olmak için bizi takip edin!'
                : 'We are working on our hair accessories collection. Follow us to stay updated!'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={`/${locale}/collections`}>
                <Button variant="outline">
                  {tCollections('backToCollections')}
                </Button>
              </Link>
              <a
                href="https://instagram.com/jewelry.novella"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button leftIcon={<Bell className="w-4 h-4" />}>
                  {tCollections('followUs')}
                </Button>
              </a>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
