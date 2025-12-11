'use client';

// src/app/[locale]/collections/steel-collection/page.tsx
// NOVELLA - Çelik Koleksiyon Sayfası

import { useLocale, useTranslations } from '@/lib/i18n-client';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Filter, SlidersHorizontal, Star } from 'lucide-react';
import { useMemo, useState } from 'react';

import { ProductGrid } from '@/components/product/ProductGrid';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { PriceRangeSlider } from '@/components/ui/PriceRangeSlider';
import { Section } from '@/components/ui/Section';
import { filterProducts, products, sortProducts } from '@/data/products';
import type { ProductCategory, ProductSortOption } from '@/types/product';
import { JEWELRY_CATEGORIES } from '@/types/product';

// Fiyat sabitleri
const PRICE_MIN = 0;
const PRICE_MAX = 300;

export default function SteelCollectionPage() {
  const t = useTranslations('products');
  const tCat = useTranslations('categories');
  const tBreadcrumb = useTranslations('breadcrumb');
  const locale = useLocale() as 'tr' | 'en';

  const [sortBy, setSortBy] = useState<ProductSortOption>('popular');
  const [selectedCategory, setSelectedCategory] = useState<
    ProductCategory | 'all'
  >('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_MIN,
    PRICE_MAX,
  ]);
  const [showPriceFilter, setShowPriceFilter] = useState(false);

  // Fiyat filtresi aktif mi?
  const isPriceFilterActive =
    priceRange[0] > PRICE_MIN || priceRange[1] < PRICE_MAX;

  // Çelik ürünleri filtrele
  const steelProducts = useMemo(() => {
    let filtered = products.filter(
      (p) => p.material === 'stainless-steel' || p.isSteelCollection
    );

    // Kategori filtresi
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Fiyat filtresi
    if (isPriceFilterActive) {
      filtered = filterProducts(filtered, {
        minPrice: priceRange[0] > PRICE_MIN ? priceRange[0] : undefined,
        maxPrice: priceRange[1] < PRICE_MAX ? priceRange[1] : undefined,
      });
    }

    return sortProducts(filtered, sortBy);
  }, [sortBy, selectedCategory, priceRange, isPriceFilterActive]);

  const breadcrumbItems = [
    { label: tBreadcrumb('collections'), href: `/${locale}/collections` },
    { label: tCat('steel-collection') },
  ];

  const sortOptions: { value: ProductSortOption; label: string }[] = [
    { value: 'popular', label: locale === 'tr' ? 'Popüler' : 'Popular' },
    { value: 'newest', label: locale === 'tr' ? 'En Yeni' : 'Newest' },
    {
      value: 'price-asc',
      label: locale === 'tr' ? 'Fiyat: Düşük → Yüksek' : 'Price: Low → High',
    },
    {
      value: 'price-desc',
      label: locale === 'tr' ? 'Fiyat: Yüksek → Düşük' : 'Price: High → Low',
    },
  ];

  // Fiyat presetleri
  const pricePresets = [
    {
      label: locale === 'tr' ? 'Tümü' : 'All',
      range: [PRICE_MIN, PRICE_MAX] as [number, number],
    },
    { label: '0-100 ₺', range: [0, 100] as [number, number] },
    { label: '100-200 ₺', range: [100, 200] as [number, number] },
    { label: '200+ ₺', range: [200, PRICE_MAX] as [number, number] },
  ];

  // Sadece takı kategorileri (çelik koleksiyonda çanta/saç aksesuarı yok)
  const categoryFilters = JEWELRY_CATEGORIES;

  // Tüm filtreleri temizle
  const clearAllFilters = () => {
    setSelectedCategory('all');
    setPriceRange([PRICE_MIN, PRICE_MAX]);
  };

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-slate-100 to-background dark:from-slate-900/50 pt-8 pb-12">
        <Container>
          <Breadcrumb items={breadcrumbItems} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-800 mb-4">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">
                {locale === 'tr' ? 'Özel Koleksiyon' : 'Special Collection'}
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              {tCat('steel-collection')}
            </h1>

            <p className="text-lg text-muted-foreground">
              {locale === 'tr'
                ? 'Dayanıklı, şık ve zamansız. Paslanmaz çelik takılarımız her tarza uyum sağlar ve yıllarca parlaklığını korur.'
                : 'Durable, stylish and timeless. Our stainless steel jewelry matches every style and maintains its shine for years.'}
            </p>

            {/* Özellikler */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {[
                { icon: '💪', text: locale === 'tr' ? 'Dayanıklı' : 'Durable' },
                {
                  icon: '✨',
                  text: locale === 'tr' ? 'Paslanmaz' : 'Rust-free',
                },
                {
                  icon: '💧',
                  text: locale === 'tr' ? 'Su Geçirmez' : 'Waterproof',
                },
                {
                  icon: '🌿',
                  text: locale === 'tr' ? 'Alerji Dostu' : 'Hypoallergenic',
                },
              ].map((feature) => (
                <span
                  key={feature.text}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border text-sm"
                >
                  <span>{feature.icon}</span>
                  <span>{feature.text}</span>
                </span>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Products Section */}
      <Section className="py-8">
        <Container>
          {/* Filters & Sort */}
          <div className="flex flex-col gap-4 mb-8">
            {/* Üst satır: Kategori filtreleri ve sıralama */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {tCat('all')} (
                  {
                    products.filter((p) => p.material === 'stainless-steel')
                      .length
                  }
                  )
                </button>
                {categoryFilters.map((cat) => {
                  const count = products.filter(
                    (p) =>
                      p.material === 'stainless-steel' &&
                      p.category === cat.slug
                  ).length;
                  if (count === 0) return null;
                  return (
                    <button
                      key={cat.slug}
                      onClick={() =>
                        setSelectedCategory(cat.slug as ProductCategory)
                      }
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === cat.slug
                          ? 'bg-primary text-white'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {cat.icon} {cat.name[locale]} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Sort & Price Filter Toggle */}
              <div className="flex items-center gap-3">
                {/* Fiyat Filtresi Toggle */}
                <div className="relative">
                  <button
                    onClick={() => setShowPriceFilter(!showPriceFilter)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      isPriceFilterActive
                        ? 'border-gold bg-gold/10 text-gold dark:border-gold-dark dark:bg-gold-dark/10 dark:text-gold-dark'
                        : 'border-neutral-200 bg-white hover:border-gold/50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-gold-dark/50'
                    }`}
                  >
                    {locale === 'tr' ? 'Fiyat' : 'Price'}
                    {isPriceFilterActive &&
                      `: ${priceRange[0]}-${priceRange[1]} ₺`}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        showPriceFilter ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {showPriceFilter && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
                      >
                        <PriceRangeSlider
                          min={PRICE_MIN}
                          max={PRICE_MAX}
                          step={10}
                          value={priceRange}
                          onChange={setPriceRange}
                          formatPrice={(v) => `${v} ₺`}
                          label={
                            locale === 'tr' ? 'Fiyat Aralığı' : 'Price Range'
                          }
                          presets={pricePresets}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as ProductSortOption)
                    }
                    className="bg-background border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Close price filter when clicking outside */}
          {showPriceFilter && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowPriceFilter(false)}
            />
          )}

          {/* Products */}
          {steelProducts.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                {steelProducts.length}{' '}
                {locale === 'tr' ? 'ürün bulundu' : 'products found'}
              </p>
              <ProductGrid products={steelProducts} columns={4} />
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Filter className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">
                {locale === 'tr' ? 'Ürün Bulunamadı' : 'No Products Found'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {locale === 'tr'
                  ? 'Bu filtrelere uygun ürün bulunmuyor.'
                  : 'No products match these filters.'}
              </p>
              <Button onClick={clearAllFilters}>
                {locale === 'tr' ? 'Filtreleri Temizle' : 'Clear Filters'}
              </Button>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
