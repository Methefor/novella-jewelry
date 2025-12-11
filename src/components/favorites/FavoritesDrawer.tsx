'use client';

// src/components/favorites/FavoritesDrawer.tsx
// NOVELLA - Favoriler Drawer Bileşeni

import { useLocale, useTranslations } from '@/lib/i18n-client';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, ShoppingBag, Sparkles, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cart';
import { useFavoritesStore } from '@/store/favorites';
import { MATERIALS } from '@/types/product';

export function FavoritesDrawer() {
  const locale = useLocale() as 'tr' | 'en';
  const t = useTranslations('favorites');
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    clearAll,
    getItemCount,
  } = useFavoritesStore();
  const { addItem: addToCart, openCart } = useCartStore();

  const itemCount = getItemCount();

  // Body scroll lock
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeDrawer]);

  // Sepete ekle ve favorilerden çıkar
  const handleMoveToCart = (item: (typeof items)[0]) => {
    addToCart(item.product, 1);
    removeItem(item.product.id);
  };

  // Tümünü sepete ekle
  const handleMoveAllToCart = () => {
    items.forEach((item) => {
      addToCart(item.product, 1);
    });
    clearAll();
    closeDrawer();
    openCart();
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-background border-l border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <h2 className="font-heading text-lg font-semibold">
                  {t('title')}
                </h2>
                {itemCount > 0 && (
                  <span className="bg-rose-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label={t('close')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            {itemCount === 0 ? (
              // Empty State
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-4">
                  <Heart className="w-10 h-10 text-rose-400" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">
                  {t('empty.title')}
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {t('empty.description')}
                </p>
                <Button onClick={closeDrawer}>{t('empty.button')}</Button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 p-3 bg-muted/50 rounded-xl"
                    >
                      {/* Product Image */}
                      <Link
                        href={`/${locale}/products/${item.product.slug}`}
                        onClick={closeDrawer}
                        className="relative w-20 h-20 rounded-lg bg-gradient-to-br from-gold/10 to-rose-gold/10 flex items-center justify-center flex-shrink-0 overflow-hidden"
                      >
                        <Sparkles className="w-8 h-8 text-gold/30" />
                        {/* Real image:
                        <Image
                          src={item.product.images[0]?.src}
                          alt={item.product.name[locale]}
                          fill
                          className="object-cover"
                        />
                        */}
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                          {MATERIALS[item.product.material][locale]}
                        </p>
                        <Link
                          href={`/${locale}/products/${item.product.slug}`}
                          onClick={closeDrawer}
                          className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors"
                        >
                          {item.product.name[locale]}
                        </Link>
                        <p className="font-semibold mt-1">
                          {item.product.price.toLocaleString('tr-TR')} ₺
                        </p>

                        {/* Actions */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => handleMoveToCart(item)}
                            className="flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            {t('moveToCart')}
                          </button>
                          <span className="text-muted-foreground">•</span>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-500"
                          >
                            <Trash2 className="w-3 h-3" />
                            {t('remove')}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-border space-y-3">
                  {/* Move All to Cart */}
                  <Button
                    onClick={handleMoveAllToCart}
                    className="w-full"
                    leftIcon={<ShoppingBag className="w-4 h-4" />}
                  >
                    {t('moveAllToCart')}
                  </Button>

                  {/* Clear All */}
                  <button
                    onClick={clearAll}
                    className="w-full py-2 text-sm text-muted-foreground hover:text-rose-500 transition-colors"
                  >
                    {t('clearAll')}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
