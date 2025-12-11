'use client';

// src/components/reviews/ReviewSection.tsx
// NOVELLA - Ürün Yorumları Ana Bileşeni

import { useLocale } from '@/lib/i18n-client';
import { motion } from 'framer-motion';
import { MessageSquarePlus } from 'lucide-react';
import { useEffect, useState } from 'react';

import { calculateReviewStats, getReviewsByProductId } from '@/data/reviews';
import { cn } from '@/lib/utils';
import type { Review, ReviewStats } from '@/types/review';
import { ReviewForm } from './ReviewForm';
import { ReviewList } from './ReviewList';

interface ReviewSectionProps {
  productId: string;
  productName: string;
  className?: string;
}

export function ReviewSection({
  productId,
  productName,
  className,
}: ReviewSectionProps) {
  const locale = useLocale() as 'tr' | 'en';

  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Yorumları yükle
    const productReviews = getReviewsByProductId(productId);
    setReviews(productReviews);

    // İstatistikleri hesapla
    const reviewStats = calculateReviewStats(productId);
    setStats(reviewStats);
  }, [productId]);

  if (!isClient) return null;

  const handleSubmitReview = async (data: any) => {
    // Gerçek uygulamada API'ye gönderilecek
    console.log('Review submitted:', data);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('', className)}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold/10 dark:bg-gold-dark/10 flex items-center justify-center">
            <MessageSquarePlus className="w-5 h-5 text-gold dark:text-gold-dark" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-neutral-800 dark:text-neutral-100">
              {locale === 'tr' ? 'Müşteri Yorumları' : 'Customer Reviews'}
            </h2>
            {stats && stats.totalReviews > 0 && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {stats.totalReviews}{' '}
                {locale === 'tr' ? 'değerlendirme' : 'reviews'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Yorum Formu */}
      <ReviewForm
        productId={productId}
        productName={productName}
        onSubmit={handleSubmitReview}
        className="mb-8"
      />

      {/* Yorum Listesi */}
      {stats && <ReviewList reviews={reviews} stats={stats} />}
    </motion.section>
  );
}

export default ReviewSection;
