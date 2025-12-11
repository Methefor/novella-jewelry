'use client';

import { useTranslations } from '@/lib/i18n-client';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface CollectionsSectionProps {
  locale: string;
}

const collections = [
  {
    id: 'necklaces',
    slug: 'kolyeler',
    name: 'Kolyeler',
    description: 'Zarif ve modern kolye tasarımları',
    productCount: 50,
    gradient: 'from-amber-400 to-yellow-600',
  },
  {
    id: 'earrings',
    slug: 'kupeler',
    name: 'Küpeler',
    description: 'Her tarz için küpe modelleri',
    productCount: 45,
    gradient: 'from-rose-400 to-pink-600',
  },
  {
    id: 'bracelets',
    slug: 'bilezikler',
    name: 'Bilezikler',
    description: 'Şık ve göz alıcı bilezikler',
    productCount: 40,
    gradient: 'from-violet-400 to-purple-600',
  },
  {
    id: 'rings',
    slug: 'yuzukler',
    name: 'Yüzükler',
    description: 'Minimal ve zarif yüzük seçenekleri',
    productCount: 35,
    gradient: 'from-blue-400 to-indigo-600',
  },
  {
    id: 'steel-collection',
    slug: 'steel-collection',
    name: 'Çelik Koleksiyon',
    description: 'Dayanıklı ve modern çelik takılar',
    productCount: 30,
    gradient: 'from-slate-400 to-gray-600',
  },
  {
    id: 'bags',
    slug: 'bags',
    name: 'Çantalar',
    description: 'Şık ve kullanışlı çanta modelleri',
    productCount: 25,
    gradient: 'from-emerald-400 to-green-600',
  },
];

export default function CollectionsSection({
  locale,
}: CollectionsSectionProps) {
  const t = useTranslations('collections');

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37]/10 to-[#B76E79]/10 rounded-full mb-4"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-sm font-medium">Koleksiyonlarımız</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4"
        >
          Senin Tarzını{' '}
          <span className="bg-gradient-to-r from-[#D4AF37] to-[#B76E79] bg-clip-text text-transparent">
            Bul
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Her stil ve her an için özenle seçilmiş takı koleksiyonlarımızı
          keşfedin
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection, index) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/${locale}/collections/${collection.slug}`}>
              <motion.div
                whileHover={{ scale: 1.02, y: -8 }}
                className="group relative h-80 rounded-3xl overflow-hidden bg-gradient-to-br from-card to-card/50 border border-border hover:border-[#D4AF37]/50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative h-full p-8 flex flex-col justify-between">
                  {/* Top */}
                  <div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 dark:from-zinc-800/80 dark:to-zinc-800/40 backdrop-blur-sm flex items-center justify-center mb-6"
                    >
                      <Sparkles className="w-8 h-8 text-[#D4AF37]" />
                    </motion.div>

                    <h3 className="text-2xl font-serif font-bold mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {collection.description}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      {collection.productCount}+ Ürün
                    </span>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-[#D4AF37] font-semibold"
                    >
                      Keşfet
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/20 to-transparent" />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View All CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Link href={`/${locale}/collections`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Tüm Koleksiyonları Gör
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
