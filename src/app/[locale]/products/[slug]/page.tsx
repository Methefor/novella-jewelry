'use client';

import { AddToCartButton } from '@/components/cart';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ReviewSection } from '@/components/reviews';
import {
  BreadcrumbStructuredData,
  ProductStructuredData,
} from '@/components/seo/StructuredData';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { useLocale, useTranslations } from '@/lib/i18n-client';
import { cn } from '@/lib/utils';
import { CATEGORIES, STATUS_LABELS } from '@/types/product';
import { motion } from 'framer-motion';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  RotateCcw,
  Share2,
  Shield,
  Sparkles,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function ProductDetailPage() {
  const params = useParams();
  const locale = useLocale() as 'tr' | 'en';
  const t = useTranslations('products');
  const tCat = useTranslations('categories');
  const tMat = useTranslations('materials');
  const tBreadcrumb = useTranslations('breadcrumb');

  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen pt-20">
        <Section className="py-8 md:py-12">
          <Container>
            <div className="flex min-h-[400px] flex-col items-center justify-center">
              <h1 className="mb-4 text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                Ürün bulunamadı
              </h1>
              <Link
                href={`/${locale}/collections`}
                className="rounded-lg bg-gold px-6 py-2.5 font-medium text-white transition-colors hover:bg-gold/90 dark:bg-gold-dark"
              >
                Koleksiyonlara Dön
              </Link>
            </div>
          </Container>
        </Section>
      </main>
    );
  }

  const relatedProducts = getRelatedProducts(product, 4);
  const categoryInfo = CATEGORIES.find((c) => c.slug === product.category);
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.originalPrice! - product.price) / product.originalPrice!) *
          100
      )
    : 0;
  const isOutOfStock = product.status === 'out-of-stock';
  const shopierLink = `https://novella.shopier.com/product/${product.slug}`;

  const breadcrumbItems = [
    { label: tBreadcrumb('collections'), href: `/${locale}/collections` },
    {
      label: categoryInfo?.name[locale] || '',
      href: `/${locale}/collections/${product.category}`,
    },
    { label: product.name[locale] },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name[locale],
        url: window.location.href,
      });
    }
  };

  return (
    <>
      {/* SEO Components */}
      title={product.name[locale]}
      description={product.description[locale]}
      type="product" locale={locale}
      image={product.images[0] || '/images/placeholder.jpg'}
      url={`/${locale}/products/${product.slug}`}
      keywords=
      {[
        product.category,
        product.material,
        'takı',
        'NOVELLA',
        ...(product.isNew ? ['yeni ürün'] : []),
      ]}
      canonicalUrl={`https://novella.com.tr/${locale}/products/${product.slug}`}
      alternateLanguages=
      {{
        tr: `https://novella.com.tr/tr/products/${product.slug}`,
        en: `https://novella.com.tr/en/products/${product.slug}`,
      }}
      /
      <ProductStructuredData
        product={product}
        locale={locale}
        availability={product.status === 'in-stock' ? 'InStock' : 'OutOfStock'}
      />
      <BreadcrumbStructuredData
        items={breadcrumbItems.map((item, index) => ({
          name: item.label,
          url:
            item.href ||
            `https://novella.com.tr/${locale}/products/${product.slug}`,
          position: index + 1,
        }))}
      />
      <main className="min-h-screen pt-20">
        <Section className="py-8 md:py-12">
          <Container>
            <Breadcrumb items={breadcrumbItems} />

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="h-24 w-24 text-gold/20 dark:text-gold-dark/20" />
                  </div>

                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-neutral-800 shadow-lg hover:bg-white dark:bg-neutral-800/80 dark:text-neutral-100"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-neutral-800 shadow-lg hover:bg-white dark:bg-neutral-800/80 dark:text-neutral-100"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  <div className="absolute left-4 top-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="rounded-full bg-gold px-3 py-1 text-sm font-medium text-white dark:bg-gold-dark">
                        {t('badges.new')}
                      </span>
                    )}
                    {hasDiscount && (
                      <span className="rounded-full bg-rose-500 px-3 py-1 text-sm font-medium text-white">
                        -{discountPercentage}%
                      </span>
                    )}
                  </div>
                </div>

                {product.images.length > 1 && (
                  <div className="mt-4 flex gap-3">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={cn(
                          'relative h-20 w-20 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800',
                          currentImageIndex === index &&
                            'ring-2 ring-gold dark:ring-gold-dark'
                        )}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles className="h-6 w-6 text-gold/20 dark:text-gold-dark/20" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col"
              >
                <Link
                  href={`/${locale}/collections/${product.category}`}
                  className="mb-2 text-sm font-medium uppercase tracking-wider text-gold hover:underline dark:text-gold-dark"
                >
                  {tCat(product.category)}
                </Link>

                <h1 className="font-serif text-3xl font-bold text-neutral-800 dark:text-neutral-100 md:text-4xl">
                  {product.name[locale]}
                </h1>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">
                    {product.price.toLocaleString('tr-TR')} ₺
                  </span>
                  {hasDiscount && (
                    <span className="text-xl text-neutral-400 line-through dark:text-neutral-500">
                      {product.originalPrice!.toLocaleString('tr-TR')} ₺
                    </span>
                  )}
                </div>

                <div className="mt-4">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium',
                      product.status === 'in-stock' &&
                        'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
                      product.status === 'low-stock' &&
                        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
                      product.status === 'out-of-stock' &&
                        'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                    )}
                  >
                    {product.status === 'in-stock' && (
                      <Check className="h-4 w-4" />
                    )}
                    {STATUS_LABELS[product.status][locale]}
                  </span>
                </div>

                <div className="mt-6">
                  <h3 className="mb-2 font-medium text-neutral-800 dark:text-neutral-100">
                    {t('detail.description')}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {product.description[locale]}
                  </p>
                </div>

                <div className="mt-4">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {t('detail.material')}:{' '}
                  </span>
                  <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
                    {tMat(product.material)}
                  </span>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <AddToCartButton
                    product={product}
                    size="lg"
                    showQuantity
                    fullWidth
                    className="flex-1"
                  />

                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={cn(
                      'flex items-center justify-center gap-2 rounded-xl border px-6 py-4 font-medium transition-colors',
                      isFavorite
                        ? 'border-rose-500 bg-rose-50 text-rose-500 dark:border-rose-400 dark:bg-rose-900/20 dark:text-rose-400'
                        : 'border-neutral-300 text-neutral-700 hover:border-rose-500 hover:text-rose-500 dark:border-neutral-600 dark:text-neutral-200'
                    )}
                  >
                    <Heart
                      className={cn('h-5 w-5', isFavorite && 'fill-current')}
                    />
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-6 py-4 font-medium text-neutral-700 hover:border-gold hover:text-gold dark:border-neutral-600 dark:text-neutral-200 dark:hover:border-gold-dark dark:hover:text-gold-dark"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-neutral-200 pt-8 dark:border-neutral-700">
                  <div className="flex flex-col items-center text-center">
                    <Truck className="mb-2 h-6 w-6 text-gold dark:text-gold-dark" />
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">
                      Hızlı Kargo
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Shield className="mb-2 h-6 w-6 text-gold dark:text-gold-dark" />
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">
                      Güvenli Ödeme
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <RotateCcw className="mb-2 h-6 w-6 text-gold dark:text-gold-dark" />
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">
                      Kolay İade
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {relatedProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-16"
              >
                <h2 className="mb-8 text-center font-serif text-2xl font-bold text-neutral-800 dark:text-neutral-100 md:text-3xl">
                  {t('detail.relatedProducts')}
                </h2>
                <ProductGrid products={relatedProducts} columns={4} />
              </motion.div>
            )}

            {/* Müşteri Yorumları */}
            <div className="mt-16 pt-16 border-t border-neutral-200 dark:border-neutral-800">
              <ReviewSection
                productId={product.id}
                productName={product.name[locale]}
              />
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}
