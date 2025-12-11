'use client';

// src/components/reviews/ReviewList.tsx
// NOVELLA - Yorum Listesi Bileşeni

import { useLocale } from '@/lib/i18n-client';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Filter, MessageSquare } from 'lucide-react';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';
import { useReviewsStore } from '@/store/reviews';
import type {
  Review,
  ReviewSortOption,
  ReviewStats as ReviewStatsType,
} from '@/types/review';
import { ReviewCard } from './ReviewCard';
import { ReviewStats } from './ReviewStats';

interface ReviewListProps {
  reviews: Review[];
  stats: ReviewStatsType;
  className?: string;
}

const SORT_OPTIONS: {
  value: ReviewSortOption;
  label: { tr: string; en: string };
}[] = [
  { value: 'newest', label: { tr: 'En Yeni', en: 'Newest' } },
  { value: 'oldest', label: { tr: 'En Eski', en: 'Oldest' } },
  { value: 'highest', label: { tr: 'En Yüksek Puan', en: 'Highest Rated' } },
  { value: 'lowest', label: { tr: 'En Düşük Puan', en: 'Lowest Rated' } },
  { value: 'helpful', label: { tr: 'En Faydalı', en: 'Most Helpful' } },
];

export function ReviewList({ reviews, stats, className }: ReviewListProps) {
  const locale = useLocale() as 'tr' | 'en';

  const {
    sortOption,
    filterRating,
    setSortOption,
    setFilterRating,
    getSortedReviews,
    getFilteredReviews,
  } = useReviewsStore();

  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  // Filtreleme ve sıralama uygula
  const processedReviews = useMemo(() => {
    const filtered = getFilteredReviews(reviews);
    return getSortedReviews(filtered);
  }, [reviews, sortOption, filterRating, getSortedReviews, getFilteredReviews]);

  const visibleReviews = processedReviews.slice(0, visibleCount);
  const hasMore = visibleCount < processedReviews.length;

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortOption)
    ?.label[locale];

  if (reviews.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <MessageSquare className="w-12 h-12 mx-auto text-neutral-300 dark:text-neutral-600 mb-4" />
        <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-100 mb-2">
          {locale === 'tr' ? 'Henüz yorum yok' : 'No reviews yet'}
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400">
          {locale === 'tr'
            ? 'Bu ürün için ilk yorumu siz yazın!'
            : 'Be the first to review this product!'}
        </p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* İstatistikler */}
      <ReviewStats
        stats={stats}
        onFilterClick={setFilterRating}
        activeFilter={filterRating}
      />

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {processedReviews.length} {locale === 'tr' ? 'yorum' : 'reviews'}
            {filterRating !== null && (
              <span className="ml-1">
                ({filterRating} {locale === 'tr' ? 'yıldız' : 'star'})
              </span>
            )}
          </span>
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-gold dark:hover:border-gold-dark transition-colors"
          >
            <Filter className="w-4 h-4 text-neutral-500" />
            <span className="text-sm">{currentSortLabel}</span>
            <ChevronDown
              className={cn(
                'w-4 h-4 transition-transform',
                showSortDropdown && 'rotate-180'
              )}
            />
          </button>

          <AnimatePresence>
            {showSortDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowSortDropdown(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-lg z-50 overflow-hidden"
                >
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortOption(option.value);
                        setShowSortDropdown(false);
                      }}
                      className={cn(
                        'w-full px-4 py-2.5 text-left text-sm transition-colors',
                        'hover:bg-neutral-50 dark:hover:bg-neutral-800',
                        sortOption === option.value &&
                          'bg-gold/10 dark:bg-gold-dark/10 text-gold dark:text-gold-dark font-medium'
                      )}
                    >
                      {option.label[locale]}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Yorum Listesi */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {visibleReviews.map((review, index) => (
            <motion.div
              key={review.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Daha Fazla Yükle */}
      {hasMore && (
        <div className="text-center pt-4">
          <button
            onClick={() => setVisibleCount((prev) => prev + 5)}
            className="px-6 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-gold dark:hover:border-gold-dark text-neutral-700 dark:text-neutral-300 hover:text-gold dark:hover:text-gold-dark transition-colors"
          >
            {locale === 'tr'
              ? `Daha fazla göster (${
                  processedReviews.length - visibleCount
                } yorum)`
              : `Show more (${processedReviews.length - visibleCount} reviews)`}
          </button>
        </div>
      )}
    </div>
  );
}

export default ReviewList;
