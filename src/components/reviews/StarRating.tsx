'use client';

// src/components/reviews/StarRating.tsx
// NOVELLA - Yıldız Rating Bileşeni

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
  showValue?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-3.5 h-3.5',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onChange,
  showValue = false,
  className,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const displayRating = hoverRating ?? rating;

  const handleClick = (value: number) => {
    if (interactive && onChange) {
      onChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (interactive) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(null);
    }
  };

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: maxRating }, (_, index) => {
        const value = index + 1;
        const isFilled = value <= displayRating;
        const isHalf = !isFilled && value - 0.5 <= displayRating;

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(value)}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
            disabled={!interactive}
            className={cn(
              'relative transition-transform',
              interactive && 'cursor-pointer hover:scale-110',
              !interactive && 'cursor-default'
            )}
          >
            {/* Background Star (Empty) */}
            <Star
              className={cn(
                sizeClasses[size],
                'text-neutral-200 dark:text-neutral-700'
              )}
              fill="currentColor"
            />
            
            {/* Foreground Star (Filled) */}
            {(isFilled || isHalf) && (
              <Star
                className={cn(
                  sizeClasses[size],
                  'absolute inset-0 text-amber-400',
                  isHalf && 'clip-path-half'
                )}
                fill="currentColor"
                style={isHalf ? { clipPath: 'inset(0 50% 0 0)' } : undefined}
              />
            )}
          </button>
        );
      })}
      
      {showValue && (
        <span className="ml-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

// Kompakt versiyon (ürün kartları için)
export function StarRatingCompact({
  rating,
  reviewCount,
  size = 'sm',
  className,
}: {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Star
        className={cn(
          size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4',
          'text-amber-400'
        )}
        fill="currentColor"
      />
      <span className={cn(
        'font-medium text-neutral-700 dark:text-neutral-300',
        size === 'sm' ? 'text-xs' : 'text-sm'
      )}>
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className={cn(
          'text-neutral-400 dark:text-neutral-500',
          size === 'sm' ? 'text-xs' : 'text-sm'
        )}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}

export default StarRating;
