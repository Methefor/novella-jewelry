'use client';

// src/components/reviews/ReviewCard.tsx
// NOVELLA - Yorum Kartı Bileşeni

import { useLocale } from '@/lib/i18n-client';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle, ThumbsUp, User } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { useReviewsStore } from '@/store/reviews';
import type { Review } from '@/types/review';
import { StarRating } from './StarRating';

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  const locale = useLocale() as 'tr' | 'en';
  const { toggleLike, isLiked } = useReviewsStore();

  const [showFullContent, setShowFullContent] = useState(false);
  const liked = isLiked(review.id);
  const [localLikes, setLocalLikes] = useState(review.likes);

  const handleLike = () => {
    toggleLike(review.id);
    setLocalLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  // Uzun içeriği kısalt
  const maxLength = 200;
  const isLongContent = review.content.length > maxLength;
  const displayContent = showFullContent
    ? review.content
    : review.content.slice(0, maxLength) + (isLongContent ? '...' : '');

  // Tarih formatla
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Zaman farkı hesapla
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return locale === 'tr' ? 'Bugün' : 'Today';
    if (diffInDays === 1) return locale === 'tr' ? 'Dün' : 'Yesterday';
    if (diffInDays < 7)
      return locale === 'tr'
        ? `${diffInDays} gün önce`
        : `${diffInDays} days ago`;
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return locale === 'tr'
        ? `${weeks} hafta önce`
        : `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
    return formatDate(dateString);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800',
        'bg-white dark:bg-neutral-900/50',
        'hover:border-gold/30 dark:hover:border-gold-dark/30 transition-colors',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 dark:from-gold-dark/20 dark:to-gold-dark/10 flex items-center justify-center">
            {review.author.avatar ? (
              <img
                src={review.author.avatar}
                alt={review.author.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-gold dark:text-gold-dark" />
            )}
          </div>

          {/* Author Info */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-neutral-800 dark:text-neutral-100">
                {review.author.name}
              </span>
              {review.author.isVerifiedPurchase && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs">
                  <CheckCircle2 className="w-3 h-3" />
                  {locale === 'tr' ? 'Onaylı Alıcı' : 'Verified'}
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {getTimeAgo(review.createdAt)}
            </p>
          </div>
        </div>

        {/* Rating */}
        <StarRating rating={review.rating} size="sm" />
      </div>

      {/* Content */}
      <div className="mt-4">
        {review.title && (
          <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
            {review.title}
          </h4>
        )}
        <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
          {displayContent}
        </p>
        {isLongContent && (
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            className="mt-2 text-sm text-gold dark:text-gold-dark hover:underline"
          >
            {showFullContent
              ? locale === 'tr'
                ? 'Daha az göster'
                : 'Show less'
              : locale === 'tr'
              ? 'Devamını oku'
              : 'Read more'}
          </button>
        )}
      </div>

      {/* Images (if any) */}
      {review.images && review.images.length > 0 && (
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {review.images.map((image, index) => (
            <div
              key={index}
              className="w-20 h-20 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex-shrink-0 overflow-hidden"
            >
              <img
                src={image}
                alt={`Review image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Reply from Store */}
      {review.reply && (
        <div className="mt-4 p-4 rounded-xl bg-gold/5 dark:bg-gold-dark/5 border border-gold/20 dark:border-gold-dark/20">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-4 h-4 text-gold dark:text-gold-dark" />
            <span className="text-sm font-medium text-gold dark:text-gold-dark">
              NOVELLA
            </span>
            <span className="text-xs text-neutral-400">
              {getTimeAgo(review.reply.createdAt)}
            </span>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            {review.reply.content}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
        <button
          onClick={handleLike}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all',
            liked
              ? 'bg-gold/10 text-gold dark:bg-gold-dark/10 dark:text-gold-dark'
              : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          )}
        >
          <ThumbsUp className={cn('w-4 h-4', liked && 'fill-current')} />
          <span>{locale === 'tr' ? 'Faydalı' : 'Helpful'}</span>
          <span className="font-medium">({localLikes})</span>
        </button>

        <span className="text-xs text-neutral-400">
          {formatDate(review.createdAt)}
        </span>
      </div>
    </motion.div>
  );
}

export default ReviewCard;
