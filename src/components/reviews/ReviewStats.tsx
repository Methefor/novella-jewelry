'use client';

// src/components/reviews/ReviewStats.tsx
// NOVELLA - Yorum İstatistikleri Bileşeni

import { useLocale } from '@/lib/i18n-client';
import { motion } from 'framer-motion';
import { Star, TrendingUp } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { ReviewStats as ReviewStatsType } from '@/types/review';
import { StarRating } from './StarRating';

interface ReviewStatsProps {
  stats: ReviewStatsType;
  onFilterClick?: (rating: number | null) => void;
  activeFilter?: number | null;
  className?: string;
}

export function ReviewStats({
  stats,
  onFilterClick,
  activeFilter,
  className,
}: ReviewStatsProps) {
  const locale = useLocale() as 'tr' | 'en';

  const maxCount = Math.max(...Object.values(stats.ratingDistribution));

  return (
    <div
      className={cn(
        'p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50',
        className
      )}
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sol: Ortalama Puan */}
        <div className="flex flex-col items-center justify-center text-center md:pr-8 md:border-r border-neutral-200 dark:border-neutral-700">
          <div className="text-5xl font-bold text-neutral-800 dark:text-neutral-100">
            {stats.averageRating.toFixed(1)}
          </div>
          <StarRating rating={stats.averageRating} size="lg" className="mt-2" />
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {stats.totalReviews} {locale === 'tr' ? 'değerlendirme' : 'reviews'}
          </p>

          {/* Tavsiye oranı */}
          <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              %{stats.recommendationRate}{' '}
              {locale === 'tr' ? 'tavsiye ediyor' : 'recommend'}
            </span>
          </div>
        </div>

        {/* Sağ: Rating Dağılımı */}
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count =
              stats.ratingDistribution[
                rating as keyof typeof stats.ratingDistribution
              ];
            const percentage =
              stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
            const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;
            const isActive = activeFilter === rating;

            return (
              <button
                key={rating}
                onClick={() => onFilterClick?.(isActive ? null : rating)}
                className={cn(
                  'w-full flex items-center gap-3 p-2 rounded-lg transition-all',
                  'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                  isActive &&
                    'bg-gold/10 dark:bg-gold-dark/10 ring-1 ring-gold/30 dark:ring-gold-dark/30'
                )}
              >
                {/* Yıldız sayısı */}
                <div className="flex items-center gap-1 w-16 flex-shrink-0">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {rating}
                  </span>
                  <Star
                    className="w-4 h-4 text-amber-400"
                    fill="currentColor"
                  />
                </div>

                {/* Progress bar */}
                <div className="flex-1 h-2.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${barWidth}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className={cn(
                      'h-full rounded-full',
                      rating >= 4
                        ? 'bg-emerald-500'
                        : rating === 3
                        ? 'bg-amber-400'
                        : 'bg-rose-400'
                    )}
                  />
                </div>

                {/* Sayı ve yüzde */}
                <div className="w-20 text-right flex-shrink-0">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {count}
                  </span>
                  <span className="text-xs text-neutral-400 ml-1">
                    ({percentage.toFixed(0)}%)
                  </span>
                </div>
              </button>
            );
          })}

          {/* Filtreyi temizle */}
          {activeFilter !== null && (
            <button
              onClick={() => onFilterClick?.(null)}
              className="mt-2 text-sm text-gold dark:text-gold-dark hover:underline"
            >
              {locale === 'tr' ? 'Filtreyi temizle' : 'Clear filter'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewStats;
