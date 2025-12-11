'use client';

// src/components/sections/ProductCarousel.tsx
// NOVELLA - Ürün Carousel Bileşeni (Swiper.js ile)

import { useLocale, useTranslations } from '@/lib/i18n-client';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { products } from '@/data/products';
import type { Product } from '@/types/product';
import { ProductCardCarousel } from './ProductCardCarousel';

interface ProductCarouselProps {
  type: 'featured' | 'new' | 'bestseller';
  className?: string;
}

export function ProductCarousel({ type, className }: ProductCarouselProps) {
  const locale = useLocale() as 'tr' | 'en';
  const t = useTranslations('productCarousel');

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Ürünleri filtrele
  const getFilteredProducts = (): Product[] => {
    switch (type) {
      case 'featured':
        return products.filter((p) => p.isFeatured);
      case 'new':
        return products.filter((p) => p.isNew);
      case 'bestseller':
        return products.filter((p) => p.isBestseller);
      default:
        return products.slice(0, 8);
    }
  };

  const filteredProducts = getFilteredProducts();

  // Scroll handlers
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Card width + gap
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });

      // Check position after scroll animation
      setTimeout(checkScrollPosition, 300);
    }
  };

  // Title & subtitle based on type
  const title = t(`${type}.title`);
  const subtitle = t(`${type}.subtitle`);

  // Link based on type
  const viewAllLink =
    type === 'new'
      ? `/${locale}/collections?sort=newest`
      : `/${locale}/collections`;

  if (filteredProducts.length === 0) return null;

  return (
    <Section className={className}>
      <Container>
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                {subtitle}
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              {title}
            </h2>
          </motion.div>

          {/* Navigation Arrows + View All */}
          <div className="flex items-center gap-3">
            {/* Arrows - Desktop Only */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="p-2 rounded-full border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="p-2 rounded-full border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* View All Link */}
            <Link
              href={viewAllLink}
              className="text-sm font-medium text-primary hover:underline whitespace-nowrap"
            >
              {t('viewAll')} →
            </Link>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none hidden md:block" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none hidden md:block" />

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollPosition}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[280px] md:w-[300px] snap-start"
              >
                <ProductCardCarousel product={product} index={index} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
