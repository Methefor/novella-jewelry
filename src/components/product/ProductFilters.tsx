'use client';

// src/components/product/ProductFilters.tsx
// NOVELLA - Ürün Filtreleme Bileşeni (Fiyat Aralığı Slider Dahil)

import { useLocale, useTranslations } from '@/lib/i18n-client';
import { cn } from '@/lib/utils';
import type {
  ProductCategory,
  ProductMaterial,
  ProductSortOption,
} from '@/types/product';
import { CATEGORIES, MATERIALS, SORT_OPTIONS } from '@/types/product';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import { usePriceRange, useSetPriceRange } from '../../store/filters';
import { PriceRangeSlider } from './PriceRangeSlider';

// Fiyat sabitleri
const PRICE_MIN = 50;
const PRICE_MAX = 2000;
const PRICE_STEP = 10;

interface ProductFiltersProps {
  selectedCategory?: ProductCategory;
  selectedMaterial?: ProductMaterial;
  selectedSort: ProductSortOption;
  priceRange: [number, number];
  onCategoryChange: (category?: ProductCategory) => void;
  onMaterialChange: (material?: ProductMaterial) => void;
  onSortChange: (sort: ProductSortOption) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  productCount: number;
}

export function ProductFilters({
  selectedCategory,
  selectedMaterial,
  selectedSort,
  priceRange: propPriceRange,
  onCategoryChange,
  onMaterialChange,
  onSortChange,
  onPriceRangeChange,
  productCount,
}: ProductFiltersProps) {
  const locale = useLocale() as 'tr' | 'en';
  const t = useTranslations('products');
  const tCat = useTranslations('categories');
  const tMat = useTranslations('materials');

  // Store entegrasyonu
  const storePriceRange = usePriceRange();
  const setPriceRange = useSetPriceRange();

  // Props veya store'dan priceRange al (store öncelikli)
  const priceRange = storePriceRange || propPriceRange;

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Fiyat filtresi aktif mi?
  const isPriceFilterActive =
    priceRange[0] > PRICE_MIN || priceRange[1] < PRICE_MAX;
  const hasActiveFilters =
    selectedCategory || selectedMaterial || isPriceFilterActive;

  // Aktif filtre sayısı
  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    (selectedMaterial ? 1 : 0) +
    (isPriceFilterActive ? 1 : 0);

  const clearFilters = () => {
    onCategoryChange(undefined);
    onMaterialChange(undefined);
    // Store'u reset et ve props callback'ini çağır
    setPriceRange([PRICE_MIN, PRICE_MAX]);
    onPriceRangeChange([PRICE_MIN, PRICE_MAX]);
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // Fiyat presetleri
  const pricePresets = [
    {
      label: locale === 'tr' ? 'Tümü' : 'All',
      range: [PRICE_MIN, PRICE_MAX] as [number, number],
    },
    {
      label: locale === 'tr' ? '50-500 ₺' : '50-500 ₺',
      range: [50, 500] as [number, number],
    },
    {
      label: locale === 'tr' ? '500-1000 ₺' : '500-1000 ₺',
      range: [500, 1000] as [number, number],
    },
    {
      label: locale === 'tr' ? '1000+ ₺' : '1000+ ₺',
      range: [1000, PRICE_MAX] as [number, number],
    },
  ];

  // Dropdown bileşeni
  const Dropdown = ({
    name,
    label,
    value,
    options,
    onChange,
  }: {
    name: string;
    label: string;
    value?: string;
    options: { value: string; label: string }[];
    onChange: (value?: string) => void;
  }) => (
    <div className="relative">
      <button
        onClick={() => toggleDropdown(name)}
        className={cn(
          'flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors',
          value
            ? 'border-gold bg-gold/10 text-gold dark:border-gold-dark dark:bg-gold-dark/10 dark:text-gold-dark'
            : 'border-neutral-200 bg-white text-neutral-700 hover:border-gold/50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-gold-dark/50'
        )}
      >
        {label}
        {value && `: ${options.find((o) => o.value === value)?.label}`}
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform',
            openDropdown === name && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence>
        {openDropdown === name && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 mt-2 min-w-[180px] overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
          >
            <div className="p-2">
              {/* Tümü seçeneği */}
              <button
                onClick={() => {
                  onChange(undefined);
                  setOpenDropdown(null);
                }}
                className={cn(
                  'w-full rounded-lg px-3 py-2 text-left text-sm transition-colors',
                  !value
                    ? 'bg-gold/10 text-gold dark:bg-gold-dark/10 dark:text-gold-dark'
                    : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-700'
                )}
              >
                {tCat('all')}
              </button>

              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setOpenDropdown(null);
                  }}
                  className={cn(
                    'w-full rounded-lg px-3 py-2 text-left text-sm transition-colors',
                    value === option.value
                      ? 'bg-gold/10 text-gold dark:bg-gold-dark/10 dark:text-gold-dark'
                      : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-700'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Fiyat Dropdown (özel)
  const PriceDropdown = () => (
    <div className="relative">
      <button
        onClick={() => toggleDropdown('price')}
        className={cn(
          'flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors',
          isPriceFilterActive
            ? 'border-gold bg-gold/10 text-gold dark:border-gold-dark dark:bg-gold-dark/10 dark:text-gold-dark'
            : 'border-neutral-200 bg-white text-neutral-700 hover:border-gold/50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-gold-dark/50'
        )}
      >
        {t('filters.price')}
        {isPriceFilterActive && `: ${priceRange[0]}-${priceRange[1]} ₺`}
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform',
            openDropdown === 'price' && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence>
        {openDropdown === 'price' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
          >
            <PriceRangeSlider
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              defaultValue={priceRange}
              onChange={(range) => {
                console.log('Range changed:', range);
                setPriceRange(range);
                onPriceRangeChange(range);
              }}
              currency="₺"
              showValues
              presets={pricePresets}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="mb-8 hidden flex-wrap items-center justify-between gap-4 md:flex">
        {/* Sol: Filtreler */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Kategori Dropdown */}
          <Dropdown
            name="category"
            label={t('filters.category')}
            value={selectedCategory}
            options={CATEGORIES.map((cat) => ({
              value: cat.slug,
              label: tCat(cat.slug),
            }))}
            onChange={(val) =>
              onCategoryChange(val as ProductCategory | undefined)
            }
          />

          {/* Malzeme Dropdown */}
          <Dropdown
            name="material"
            label={t('filters.material')}
            value={selectedMaterial}
            options={Object.entries(MATERIALS).map(([key]) => ({
              value: key,
              label: tMat(key),
            }))}
            onChange={(val) =>
              onMaterialChange(val as ProductMaterial | undefined)
            }
          />

          {/* Fiyat Dropdown */}
          <PriceDropdown />

          {/* Filtreleri Temizle */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            >
              <X className="h-4 w-4" />
              {t('clearFilters')}
            </button>
          )}
        </div>

        {/* Sağ: Sonuç sayısı ve Sıralama */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {locale === 'tr'
              ? `${productCount} ürün gösteriliyor`
              : `Showing ${productCount} products`}
          </span>

          {/* Sıralama Dropdown */}
          <Dropdown
            name="sort"
            label={t('sort.title')}
            value={selectedSort}
            options={SORT_OPTIONS.map((opt) => ({
              value: opt.value,
              label: opt.label[locale],
            }))}
            onChange={(val) =>
              onSortChange((val as ProductSortOption) || 'newest')
            }
          />
        </div>
      </div>

      {/* Mobile Filters Button */}
      <div className="mb-6 flex items-center justify-between md:hidden">
        <span className="text-sm text-neutral-500 dark:text-neutral-400">
          {locale === 'tr'
            ? `${productCount} ürün gösteriliyor`
            : `Showing ${productCount} products`}
        </span>

        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {t('filters.title')}
          {hasActiveFilters && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-xs text-white dark:bg-gold-dark">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 z-50 bg-black/50 md:hidden"
            />

            {/* Modal */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white dark:bg-neutral-900 md:hidden"
            >
              {/* Header */}
              <div className="sticky top-0 flex items-center justify-between border-b border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                  {t('filters.title')}
                </h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6 p-4">
                {/* Kategori */}
                <div>
                  <h4 className="mb-3 font-medium text-neutral-800 dark:text-neutral-100">
                    {t('filters.category')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => onCategoryChange(undefined)}
                      className={cn(
                        'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                        !selectedCategory
                          ? 'bg-gold text-white dark:bg-gold-dark'
                          : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                      )}
                    >
                      {tCat('all')}
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() =>
                          onCategoryChange(cat.slug as ProductCategory)
                        }
                        className={cn(
                          'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                          selectedCategory === cat.slug
                            ? 'bg-gold text-white dark:bg-gold-dark'
                            : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                        )}
                      >
                        {tCat(cat.slug)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Malzeme */}
                <div>
                  <h4 className="mb-3 font-medium text-neutral-800 dark:text-neutral-100">
                    {t('filters.material')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => onMaterialChange(undefined)}
                      className={cn(
                        'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                        !selectedMaterial
                          ? 'bg-gold text-white dark:bg-gold-dark'
                          : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                      )}
                    >
                      {tCat('all')}
                    </button>
                    {Object.entries(MATERIALS).map(([key]) => (
                      <button
                        key={key}
                        onClick={() => onMaterialChange(key as ProductMaterial)}
                        className={cn(
                          'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                          selectedMaterial === key
                            ? 'bg-gold text-white dark:bg-gold-dark'
                            : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                        )}
                      >
                        {tMat(key)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fiyat Aralığı */}
                <div>
                  <h4 className="mb-3 font-medium text-neutral-800 dark:text-neutral-100">
                    {t('filters.priceRange')}
                  </h4>
                  <div className="rounded-xl bg-neutral-50 p-4 dark:bg-neutral-800/50">
                    <PriceRangeSlider
                      min={PRICE_MIN}
                      max={PRICE_MAX}
                      step={PRICE_STEP}
                      defaultValue={priceRange}
                      onChange={(range) => {
                        console.log('Range changed:', range);
                        setPriceRange(range);
                        onPriceRangeChange(range);
                      }}
                      currency="₺"
                      showValues
                      presets={pricePresets}
                    />
                  </div>
                </div>

                {/* Sıralama */}
                <div>
                  <h4 className="mb-3 font-medium text-neutral-800 dark:text-neutral-100">
                    {t('sort.title')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => onSortChange(opt.value)}
                        className={cn(
                          'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                          selectedSort === opt.value
                            ? 'bg-gold text-white dark:bg-gold-dark'
                            : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                        )}
                      >
                        {opt.label[locale]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 flex gap-3 border-t border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex-1 rounded-xl border border-neutral-300 py-3 font-medium text-neutral-700 dark:border-neutral-600 dark:text-neutral-200"
                  >
                    {t('filters.reset')}
                  </button>
                )}
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 rounded-xl bg-gold py-3 font-medium text-white dark:bg-gold-dark"
                >
                  {locale === 'tr'
                    ? `${productCount} ürün gösteriliyor`
                    : `Showing ${productCount} products`}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Click outside to close dropdown */}
      {openDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </>
  );
}

export default ProductFilters;
