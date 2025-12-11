'use client';

// src/app/[locale]/collections/[category]/page.tsx
// NOVELLA - Kategori Sayfası

import { ProductFilters } from '@/components/product/ProductFilters';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import {
  filterProducts,
  getProductsByCategory,
  sortProducts,
} from '@/data/products';
import { useLocale, useTranslations } from '@/lib/i18n-client';
import type {
  ProductCategory,
  ProductMaterial,
  ProductSortOption,
} from '@/types/product';
import { CATEGORIES } from '@/types/product';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

// Fiyat sabitleri (ProductFilters ile senkron)
const PRICE_MIN = 0;
const PRICE_MAX = 300;

export default function CategoryPage() {
  const params = useParams();
  const locale = useLocale() as 'tr' | 'en';
  const t = useTranslations('products');
  const tCat = useTranslations('categories');
  const tBreadcrumb = useTranslations('breadcrumb');

  const categorySlug = params.category as ProductCategory;
  const categoryInfo = CATEGORIES.find((c) => c.slug === categorySlug);

  // Filter states
  const [selectedMaterial, setSelectedMaterial] = useState<
    ProductMaterial | undefined
  >();
  const [selectedSort, setSelectedSort] = useState<ProductSortOption>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_MIN,
    PRICE_MAX,
  ]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = getProductsByCategory(categorySlug);

    // Apply material filter
    if (selectedMaterial) {
      result = filterProducts(result, { material: selectedMaterial });
    }

    // Apply price filter
    if (priceRange[0] > PRICE_MIN || priceRange[1] < PRICE_MAX) {
      result = filterProducts(result, {
        minPrice: priceRange[0] > PRICE_MIN ? priceRange[0] : undefined,
        maxPrice: priceRange[1] < PRICE_MAX ? priceRange[1] : undefined,
      });
    }

    return sortProducts(result, selectedSort);
  }, [categorySlug, selectedMaterial, selectedSort, priceRange]);

  const breadcrumbItems = [
    { label: tBreadcrumb('collections'), href: `/${locale}/collections` },
    { label: tCat(categorySlug) },
  ];

  // Handle clear filters
  const handleClearFilters = () => {
    setSelectedMaterial(undefined);
    setPriceRange([PRICE_MIN, PRICE_MAX]);
  };

  if (!categoryInfo) {
    return (
      <main className="min-h-screen pt-20">
        <Section className="py-8 md:py-12">
          <Container>
            <div className="flex min-h-[400px] flex-col items-center justify-center">
              <h1 className="mb-4 text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                {locale === 'tr' ? 'Kategori bulunamadı' : 'Category not found'}
              </h1>
              <Link
                href={`/${locale}/collections`}
                className="rounded-lg bg-gold px-6 py-2.5 font-medium text-white transition-colors hover:bg-gold/90 dark:bg-gold-dark"
              >
                {locale === 'tr' ? 'Tüm Koleksiyonlar' : 'All Collections'}
              </Link>
            </div>
          </Container>
        </Section>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20">
      <Section className="py-8 md:py-12">
        <Container>
          <Breadcrumb items={breadcrumbItems} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center md:mb-12"
          >
            <h1 className="font-serif text-3xl font-bold text-neutral-800 dark:text-neutral-100 md:text-4xl lg:text-5xl">
              {categoryInfo.name[locale]}
            </h1>
            <p className="mt-3 text-neutral-600 dark:text-neutral-400 md:text-lg">
              {categoryInfo.description[locale]}
            </p>
          </motion.div>

          <ProductFilters
            selectedCategory={categorySlug}
            selectedMaterial={selectedMaterial}
            selectedSort={selectedSort}
            priceRange={priceRange}
            onCategoryChange={() => {}} // Kategori sayfasında kategori değiştirilemez
            onMaterialChange={setSelectedMaterial}
            onSortChange={setSelectedSort}
            onPriceRangeChange={setPriceRange}
            productCount={filteredProducts.length}
          />

          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} columns={4} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700"
            >
              <p className="mb-4 text-lg text-neutral-500 dark:text-neutral-400">
                {t('noProductsFound')}
              </p>
              <button
                onClick={handleClearFilters}
                className="rounded-lg bg-gold px-6 py-2.5 font-medium text-white transition-colors hover:bg-gold/90 dark:bg-gold-dark dark:hover:bg-gold-dark/90"
              >
                {t('clearFilters')}
              </button>
            </motion.div>
          )}
        </Container>
      </Section>
    </main>
  );
}
