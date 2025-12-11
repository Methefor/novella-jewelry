'use client';

// src/components/product/ProductCarousel.tsx
// NOVELLA - Ürün Carousel/Slider Bileşeni

import { useLocale } from '@/lib/i18n-client';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import type { Product } from '@/types/product';
import { ProductCard } from './ProductCard';

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  itemsPerView?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  className?: string;
}

export function ProductCarousel({
  products,
  title,
  subtitle,
  autoPlay = false,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 4 },
  className,
}: ProductCarouselProps) {
  const locale = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(itemsPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(itemsPerView.tablet);
      } else {
        setItemsToShow(itemsPerView.desktop);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  const maxIndex = Math.max(0, products.length - itemsToShow);

  // Auto play
  useEffect(() => {
    if (autoPlay && !isHovered) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, isHovered, maxIndex]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goToIndex = useCallback(
    (index: number) => {
      setCurrentIndex(Math.min(index, maxIndex));
    },
    [maxIndex]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('keydown', handleKeyDown);
      return () => container.removeEventListener('keydown', handleKeyDown);
    }
  }, [goToPrevious, goToNext]);

  // Touch/Swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();
  };

  if (products.length === 0) return null;

  // Calculate dot count
  const dotCount = Math.ceil(products.length / itemsToShow);
  const activeDot = Math.floor(currentIndex / itemsToShow);

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="flex items-end justify-between mb-8">
          <div>
            {title && (
              <h2 className="font-heading text-2xl md:text-3xl font-bold">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>

          {/* Desktop Arrows in Header */}
          {showArrows && products.length > itemsToShow && (
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={goToPrevious}
                className="p-2 rounded-full border hover:bg-muted transition-colors disabled:opacity-50"
                disabled={currentIndex === 0}
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="p-2 rounded-full border hover:bg-muted transition-colors disabled:opacity-50"
                disabled={currentIndex >= maxIndex}
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Carousel Container */}
      <div
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * (100 / itemsToShow)}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / itemsToShow}%` }}
            >
              <ProductCard
                product={product}
                index={index}
                showQuickAdd={true}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile Arrows */}
      {showArrows && products.length > itemsToShow && (
        <>
          <button
            onClick={goToPrevious}
            className={cn(
              'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10',
              'w-10 h-10 rounded-full bg-background shadow-lg border',
              'flex items-center justify-center',
              'hover:bg-muted transition-colors',
              'md:hidden',
              currentIndex === 0 && 'opacity-50 pointer-events-none'
            )}
            disabled={currentIndex === 0}
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className={cn(
              'absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10',
              'w-10 h-10 rounded-full bg-background shadow-lg border',
              'flex items-center justify-center',
              'hover:bg-muted transition-colors',
              'md:hidden',
              currentIndex >= maxIndex && 'opacity-50 pointer-events-none'
            )}
            disabled={currentIndex >= maxIndex}
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && dotCount > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: dotCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index * itemsToShow)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                index === activeDot
                  ? 'w-6 bg-primary'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductCarousel;
