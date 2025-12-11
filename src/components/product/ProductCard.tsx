'use client';

// src/components/product/ProductCard.tsx
// NOVELLA - Ürün Kartı Bileşeni (Hızlı Sepete Ekle + Favori ile)

import { AnimatePresence, motion } from 'framer-motion';
import { Check, Eye, Heart, Plus, ShoppingBag, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { StarRatingCompact } from '@/components/reviews/StarRating';
import { getAllProductRatings } from '@/data/reviews';
import { useLocale, useTranslations } from '@/lib/i18n-client';
import { cn } from '@/lib/utils';
import { sendProductInquiry, trackWhatsAppClick } from '@/lib/whatsapp';
import { useCartStore } from '@/store/cart';
import { useFavoritesStore } from '@/store/favorites';
import { MATERIALS, Product, STATUS_LABELS } from '@/types/product';

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
  showQuickAdd?: boolean;
}

export function ProductCard({
  product,
  index = 0,
  className,
  showQuickAdd = true,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const locale = useLocale();
  const t = useTranslations('product');
  const tCart = useTranslations('cart');
  const { addItem, isInCart } = useCartStore();
  const { toggleItem, isInFavorites } = useFavoritesStore();

  const isFavorite = isInFavorites(product.id);
  const inCart = isInCart(product.id);

  // Rating bilgisi
  const allRatings = getAllProductRatings();
  const productRating = allRatings[product.id];

  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.originalPrice! - product.price) / product.originalPrice!) *
          100
      )
    : 0;

  const isOutOfStock = product.status === 'out-of-stock';
  const isLowStock = product.status === 'low-stock';

  // Hover'da ikinci görsele geç
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  // Hızlı sepete ekle
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock || isAdding) return;

    setIsAdding(true);
    addItem(product, 1);

    setTimeout(() => {
      setIsAdding(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    }, 300);
  };

  // Favorilere ekle/çıkar
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  // WhatsApp ile soru sor
  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sendProductInquiry(product, locale);
    trackWhatsAppClick('product', product);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn('group relative', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Görsel Container */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
        {/* Ana Görsel */}
        <Link href={`/${locale}/products/${product.slug}`}>
          <div className="relative h-full w-full">
            {/* Placeholder görsel */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gold/10 to-rose-gold/10 dark:from-gold-dark/10 dark:to-rose-gold-dark/10">
              <Sparkles className="h-12 w-12 text-gold/30 dark:text-gold-dark/30" />
            </div>
          </div>
        </Link>

        {/* Üst Etiketler */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="rounded-full bg-gold px-3 py-1 text-xs font-medium text-white dark:bg-gold-dark">
              {t('badges.new')}
            </span>
          )}
          {hasDiscount && (
            <span className="rounded-full bg-rose-500 px-3 py-1 text-xs font-medium text-white">
              -{discountPercentage}%
            </span>
          )}
          {product.isBestseller && !product.isNew && (
            <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-white">
              {t('badges.bestseller')}
            </span>
          )}
          {product.isSteelCollection && (
            <span className="rounded-full bg-slate-600 px-3 py-1 text-xs font-medium text-white">
              ⚙️ {locale === 'tr' ? 'Çelik' : 'Steel'}
            </span>
          )}
        </div>

        {/* Stok Durumu */}
        {(isOutOfStock || isLowStock) && (
          <div className="absolute right-3 top-3">
            <span
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium',
                isOutOfStock
                  ? 'bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-800'
                  : 'bg-amber-500 text-white'
              )}
            >
              {STATUS_LABELS[product.status][locale]}
            </span>
          </div>
        )}

        {/* Favorilere Ekle - Sağ üst */}
        <button
          onClick={handleToggleFavorite}
          className={cn(
            'absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200',
            isOutOfStock && 'top-12',
            isLowStock && 'top-12',
            isFavorite
              ? 'bg-rose-500 text-white'
              : 'bg-white/80 text-neutral-600 hover:bg-rose-500 hover:text-white opacity-0 group-hover:opacity-100'
          )}
          title={t('actions.addToFavorites')}
        >
          <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} />
        </button>

        {/* Hover Aksiyonları */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-x-3 bottom-3 flex items-center gap-2"
        >
          {/* Hızlı Görüntüle */}
          <Link
            href={`/${locale}/products/${product.slug}`}
            className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-white/90 backdrop-blur-sm text-neutral-800 text-sm font-medium transition-colors hover:bg-white"
            title={t('actions.quickView')}
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">{t('actions.quickView')}</span>
          </Link>

          {/* Hızlı Sepete Ekle */}
          {showQuickAdd && !isOutOfStock && (
            <button
              onClick={handleQuickAdd}
              disabled={isAdding}
              className={cn(
                'flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-all duration-200',
                showSuccess
                  ? 'bg-emerald-500 text-white'
                  : inCart
                  ? 'bg-primary/90 text-white hover:bg-primary'
                  : 'bg-primary text-white hover:bg-primary/90'
              )}
              title={tCart('addToCart')}
            >
              <AnimatePresence mode="wait">
                {isAdding ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                  />
                ) : showSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <Check className="h-4 w-4" />
                  </motion.div>
                ) : inCart ? (
                  <motion.div
                    key="in-cart"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="add"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          )}

          {/* WhatsApp ile Soru Sor */}
          <button
            onClick={handleWhatsAppInquiry}
            className="flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition-all duration-200"
            title="WhatsApp'ta Sor"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
            <span className="hidden sm:inline">WhatsApp</span>
          </button>
        </motion.div>

        {/* Stok Tükendi Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-lg bg-white px-4 py-2 font-medium text-neutral-800">
              {t('status.outOfStock')}
            </span>
          </div>
        )}
      </div>

      {/* Ürün Bilgileri */}
      <div className="mt-4 space-y-2">
        {/* Kategori/Malzeme */}
        <p className="text-xs font-medium uppercase tracking-wider text-gold dark:text-gold-dark">
          {MATERIALS[product.material][locale]}
        </p>

        {/* Ürün Adı */}
        <Link href={`/${locale}/products/${product.slug}`}>
          <h3 className="line-clamp-2 font-serif text-lg font-medium text-neutral-800 transition-colors hover:text-gold dark:text-neutral-100 dark:hover:text-gold-dark">
            {product.name[locale]}
          </h3>
        </Link>

        {/* Fiyat */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
            {product.price.toLocaleString('tr-TR')} ₺
          </span>
          {hasDiscount && (
            <span className="text-sm text-neutral-400 line-through dark:text-neutral-500">
              {product.originalPrice!.toLocaleString('tr-TR')} ₺
            </span>
          )}
        </div>

        {/* Rating */}
        {productRating && (
          <StarRatingCompact
            rating={productRating.average}
            reviewCount={productRating.count}
            size="sm"
          />
        )}

        {/* Mobile: Sepete Ekle Butonu */}
        {showQuickAdd && !isOutOfStock && (
          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            className={cn(
              'w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 sm:hidden',
              showSuccess
                ? 'bg-emerald-500 text-white'
                : 'bg-primary text-white hover:bg-primary/90'
            )}
          >
            <AnimatePresence mode="wait">
              {showSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Check className="h-4 w-4" />
                  <span>{tCart('addedToCart')}</span>
                </motion.div>
              ) : (
                <motion.div
                  key="add"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>{tCart('addToCart')}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        )}
      </div>
    </motion.article>
  );
}

export default ProductCard;
