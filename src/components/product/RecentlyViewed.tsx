'use client';

// src/components/product/RecentlyViewed.tsx
// NOVELLA - Son Görüntülenen Ürünler Bileşeni

import { useLocale, useTranslations } from '@/lib/i18n-client';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { cn } from '@/lib/utils';
import { useRecentlyViewedStore } from '@/store/recentlyViewed';
import { ProductCard } from './ProductCard';

interface RecentlyViewedProps {
  currentProductId?: string; // Mevcut ürünü hariç tut
  maxItems?: number;
  showClearButton?: boolean;
  title?: string;
  className?: string;
}

export function RecentlyViewed({
  currentProductId,
  maxItems = 4,
  showClearButton = true,
  title,
  className,
}: RecentlyViewedProps) {
  const locale = useLocale() as 'tr' | 'en';
  const t = useTranslations('products');

  const { items, clearAll } = useRecentlyViewedStore();
  const [isClient, setIsClient] = useState(false);

  // Hydration fix
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Mevcut ürünü hariç tut ve limitle
  const recentProducts = items
    .filter((item) => item.product.id !== currentProductId)
    .slice(0, maxItems)
    .map((item) => item.product);

  if (recentProducts.length === 0) return null;

  const displayTitle =
    title || (locale === 'tr' ? 'Son Görüntülenenler' : 'Recently Viewed');

  return (
    <Section className={cn('py-12', className)}>
      <Container>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/10 dark:bg-gold-dark/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-gold dark:text-gold-dark" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-neutral-800 dark:text-neutral-100">
              {displayTitle}
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm text-neutral-600 dark:text-neutral-400">
              {recentProducts.length}
            </span>
          </div>

          {showClearButton && (
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-neutral-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">
                {locale === 'tr' ? 'Temizle' : 'Clear'}
              </span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {recentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}

// Kompakt versiyon (sidebar veya drawer için)
export function RecentlyViewedCompact({
  currentProductId,
  maxItems = 5,
  className,
}: {
  currentProductId?: string;
  maxItems?: number;
  className?: string;
}) {
  const locale = useLocale() as 'tr' | 'en';
  const { items, removeItem } = useRecentlyViewedStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const recentProducts = items
    .filter((item) => item.product.id !== currentProductId)
    .slice(0, maxItems);

  if (recentProducts.length === 0) return null;

  return (
    <div className={cn('space-y-3', className)}>
      <h3 className="flex items-center gap-2 font-medium text-neutral-800 dark:text-neutral-100">
        <Clock className="w-4 h-4 text-gold dark:text-gold-dark" />
        {locale === 'tr' ? 'Son Görüntülenenler' : 'Recently Viewed'}
      </h3>

      <div className="space-y-2">
        {recentProducts.map(({ product }) => (
          <div
            key={product.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group"
          >
            {/* Thumbnail */}
            <Link
              href={`/${locale}/products/${product.slug}`}
              className="relative w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex-shrink-0 overflow-hidden"
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-2xl opacity-30">💎</span>
              </div>
            </Link>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <Link
                href={`/${locale}/products/${product.slug}`}
                className="block text-sm font-medium text-neutral-800 dark:text-neutral-100 truncate hover:text-gold dark:hover:text-gold-dark transition-colors"
              >
                {product.name[locale]}
              </Link>
              <p className="text-sm font-semibold text-gold dark:text-gold-dark">
                {product.price.toLocaleString('tr-TR')}₺
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeItem(product.id)}
              className="p-1.5 rounded-full text-neutral-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 opacity-0 group-hover:opacity-100 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentlyViewed;
