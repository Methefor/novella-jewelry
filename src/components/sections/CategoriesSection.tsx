'use client';

import { useTranslations } from '@/lib/i18n-client';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Container, Section } from '@/components/ui';
import { CATEGORY_LINKS } from '@/lib/constants';

interface CategoriesSectionProps {
  locale: string;
}

const categoryImages: Record<string, string> = {
  necklaces: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
  bracelets: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
  earrings: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
  rings: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
  bags: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
  'hair-accessories': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80',
  'steel-collection': 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
};

export function CategoriesSection({ locale }: CategoriesSectionProps) {
  const t = useTranslations('categories');
  const tCommon = useTranslations('common');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Section className="bg-muted/30">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Koleksiyonlarımız
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Her tarza ve her ana uygun, özenle seçilmiş takı koleksiyonlarımızı
            keşfedin
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {CATEGORY_LINKS.map((category) => (
            <motion.div key={category.key} variants={itemVariants}>
              <Link href={`/${locale}${category.href}`}>
                <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-500">
                  {/* Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${categoryImages[category.key]})`,
                    }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-xl font-serif font-bold text-white mb-1">
                          {t(category.key)}
                        </h3>
                        <p className="text-white/70 text-sm">
                          {tCommon('viewAll')}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
