'use client';

// src/components/layout/MobileMenu.tsx
// NOVELLA - Mobile Menu Bileşeni (Yeni Kategoriler ile)

import { useTranslations } from '@/lib/i18n-client';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ShoppingBag, Star, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Logo } from '@/components/brand';
import { LanguageSwitcher, ThemeToggle } from '@/components/ui';
import {
  ACCESSORY_LINKS,
  JEWELRY_LINKS,
  NAVIGATION_LINKS,
  SPECIAL_LINKS,
} from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store';
import { useCartStore } from '@/store/cart';

interface MobileMenuProps {
  locale: string;
}

export function MobileMenu({ locale }: MobileMenuProps) {
  const t = useTranslations('nav');
  const tCat = useTranslations('categories');
  const tMenu = useTranslations('mobileMenu');
  const { isMobileMenuOpen, closeMobileMenu } = useAppStore();
  const { getItemCount, openCart } = useCartStore();

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const itemCount = getItemCount();

  // Body scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileMenu();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeMobileMenu]);

  // Reset categories state when menu closes
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setIsCategoriesOpen(false);
    }
  }, [isMobileMenuOpen]);

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  };

  const handleCartClick = () => {
    closeMobileMenu();
    openCart();
  };

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={closeMobileMenu}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-background border-l border-border shadow-2xl md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Logo size="sm" />
                <div className="flex items-center gap-2">
                  {/* Cart Button */}
                  <button
                    onClick={handleCartClick}
                    className="relative p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-medium rounded-full flex items-center justify-center">
                        {itemCount > 99 ? '99+' : itemCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    aria-label={tMenu('close')}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-4">
                <motion.div
                  initial="closed"
                  animate="open"
                  transition={{ staggerChildren: 0.05, delayChildren: 0.1 }}
                  className="space-y-1"
                >
                  {NAVIGATION_LINKS.map((link) => {
                    // Koleksiyonlar için accordion menü
                    if (link.key === 'collections') {
                      return (
                        <motion.div key={link.key} variants={itemVariants}>
                          {/* Collections Header */}
                          <button
                            onClick={() =>
                              setIsCategoriesOpen(!isCategoriesOpen)
                            }
                            className="w-full flex items-center justify-between px-4 py-3 text-lg font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                          >
                            <span>{t(link.key)}</span>
                            <ChevronDown
                              className={cn(
                                'w-5 h-5 transition-transform duration-200',
                                isCategoriesOpen && 'rotate-180'
                              )}
                            />
                          </button>

                          {/* Categories Accordion */}
                          <AnimatePresence>
                            {isCategoriesOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-2 py-2 space-y-3">
                                  {/* All Collections */}
                                  <Link
                                    href={`/${locale}/collections`}
                                    onClick={closeMobileMenu}
                                    className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-primary hover:bg-muted rounded-lg transition-colors"
                                  >
                                    <span>🏷️</span>
                                    <span>
                                      {locale === 'tr'
                                        ? 'Tümünü Gör'
                                        : 'View All'}
                                    </span>
                                  </Link>

                                  {/* Takılar */}
                                  <div>
                                    <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                      {tCat('jewelry')}
                                    </p>
                                    {JEWELRY_LINKS.map((category) => (
                                      <Link
                                        key={category.key}
                                        href={`/${locale}${category.href}`}
                                        onClick={closeMobileMenu}
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                                      >
                                        <span>{category.icon}</span>
                                        <span>{tCat(category.key)}</span>
                                      </Link>
                                    ))}
                                  </div>

                                  {/* Özel Koleksiyon */}
                                  <div>
                                    <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                      {tCat('special')}
                                    </p>
                                    {SPECIAL_LINKS.map((special) => (
                                      <Link
                                        key={special.key}
                                        href={`/${locale}${special.href}`}
                                        onClick={closeMobileMenu}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                                      >
                                        <Star className="w-4 h-4 text-primary" />
                                        <span>{tCat(special.key)}</span>
                                        <span className="text-xs bg-primary text-white px-1.5 py-0.5 rounded-full ml-auto">
                                          {locale === 'tr'
                                            ? 'Popüler'
                                            : 'Popular'}
                                        </span>
                                      </Link>
                                    ))}
                                  </div>

                                  {/* Aksesuarlar */}
                                  <div>
                                    <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                      {tCat('accessories')}
                                    </p>
                                    {ACCESSORY_LINKS.map((category) => (
                                      <Link
                                        key={category.key}
                                        href={`/${locale}${category.href}`}
                                        onClick={closeMobileMenu}
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                                      >
                                        <span>{category.icon}</span>
                                        <span>{tCat(category.key)}</span>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    }

                    // Diğer linkler
                    return (
                      <motion.div key={link.key} variants={itemVariants}>
                        <Link
                          href={`/${locale}${
                            link.href === '/' ? '' : link.href
                          }`}
                          onClick={closeMobileMenu}
                          className="block px-4 py-3 text-lg font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                        >
                          {t(link.key)}
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Quick Links */}
                <motion.div
                  initial="closed"
                  animate="open"
                  transition={{ staggerChildren: 0.05, delayChildren: 0.3 }}
                  className="mt-6 pt-6 border-t border-border"
                >
                  <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    {locale === 'tr' ? 'Hızlı Erişim' : 'Quick Access'}
                  </p>
                  <motion.div variants={itemVariants}>
                    <Link
                      href={`/${locale}/faq`}
                      onClick={closeMobileMenu}
                      className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                    >
                      {locale === 'tr' ? 'Sıkça Sorulan Sorular' : 'FAQ'}
                    </Link>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Link
                      href={`/${locale}/shipping`}
                      onClick={closeMobileMenu}
                      className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                    >
                      {locale === 'tr' ? 'Kargo Bilgileri' : 'Shipping Info'}
                    </Link>
                  </motion.div>
                </motion.div>
              </nav>

              {/* Footer Actions */}
              <div className="p-4 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {locale === 'tr' ? 'Tema & Dil' : 'Theme & Language'}
                  </span>
                  <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <ThemeToggle />
                  </div>
                </div>

                {/* Cart Button */}
                <button
                  onClick={handleCartClick}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>
                    {locale === 'tr' ? 'Sepeti Görüntüle' : 'View Cart'}
                  </span>
                  {itemCount > 0 && (
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                      {itemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
