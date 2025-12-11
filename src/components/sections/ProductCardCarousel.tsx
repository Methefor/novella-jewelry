'use client';

// src/components/sections/ProductCardCarousel.tsx
// NOVELLA - Carousel için Ürün Kartı (Kompakt versiyon)

import { useLocale, useTranslations } from '@/lib/i18n-client';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Heart, ShoppingBag, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { useFavoritesStore } from '@/store/favorites';
import { MATERIALS, Product, STATUS_LABELS } from '@/types/product';

interface ProductCardCarouselProps {
  product: Product;
  index?: number;
}

export function ProductCardCarousel({
  product,
  index = 0,
}: ProductCardCarouselProps) {
  const locale = useLocale() as 'tr' | 'en';
  const t = useTranslations('products');

  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { addItem: addToCart } = useCartStore();
  const { toggleItem, isInFavorites } = useFavoritesStore();

  const isFavorite = isInFavorites(product.id);
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.originalPrice! - product.price) / product.originalPrice!) *
          100
      )
    : 0;
  const isOutOfStock = product.status === 'out-of-stock';

  // Sepete ekle
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock || isAdding) return;

    setIsAdding(true);
    addToCart(product, 1);

    setTimeout(() => {
      setIsAdding(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 300);
  };

  // Favorilere ekle/çıkar
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
        <Link href={`/${locale}/products/${product.slug}`}>
          <div className="relative h-full w-full">
            {/* Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gold/10 to-rose-gold/10 dark:from-gold-dark/10 dark:to-rose-gold-dark/10">
              <Sparkles className="h-12 w-12 text-gold/30 dark:text-gold-dark/30" />
            </div>
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-medium text-white">
              {t('badges.new')}
            </span>
          )}
          {hasDiscount && (
            <span className="rounded-full bg-rose-500 px-2.5 py-0.5 text-[10px] font-medium text-white">
              -{discountPercentage}%
            </span>
          )}
          {product.isBestseller && !product.isNew && (
            <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-medium text-white">
              {t('badges.bestseller')}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className={cn(
            'absolute right-2 top-2 p-2 rounded-full transition-all duration-200',
            isFavorite
              ? 'bg-rose-500 text-white'
              : 'bg-white/80 text-neutral-600 opacity-0 group-hover:opacity-100 hover:bg-rose-500 hover:text-white'
          )}
        >
          <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
        </button>

        {/* Quick Add Button - Hover */}
        <AnimatePresence>
          {isHovered && !isOutOfStock && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute inset-x-2 bottom-2"
            >
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={cn(
                  'w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  showSuccess
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white/95 backdrop-blur-sm text-neutral-800 hover:bg-primary hover:text-white'
                )}
              >
                {isAdding ? (
                  <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                ) : showSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{locale === 'tr' ? 'Eklendi' : 'Added'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      {locale === 'tr' ? 'Sepete Ekle' : 'Add to Cart'}
                    </span>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Out of Stock */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-neutral-800">
              {STATUS_LABELS[product.status][locale]}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-3 space-y-1">
        <p className="text-xs font-medium uppercase tracking-wider text-gold dark:text-gold-dark">
          {MATERIALS[product.material][locale]}
        </p>
        <Link href={`/${locale}/products/${product.slug}`}>
          <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
            {product.name[locale]}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            {product.price.toLocaleString('tr-TR')} ₺
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {product.originalPrice!.toLocaleString('tr-TR')} ₺
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
