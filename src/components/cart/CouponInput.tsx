'use client';

// src/components/cart/CouponInput.tsx
// NOVELLA - Kupon Kodu Giriş Bileşeni

import { useLocale, useTranslations } from '@/lib/i18n-client';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Gift,
  Loader2,
  Percent,
  Tag,
  X,
} from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import {
  AVAILABLE_COUPONS,
  formatCouponDiscount,
  useCouponStore,
} from '@/store/coupon';

interface CouponInputProps {
  subtotal: number;
  className?: string;
  showAvailableCoupons?: boolean;
}

export function CouponInput({
  subtotal,
  className,
  showAvailableCoupons = true,
}: CouponInputProps) {
  const locale = useLocale() as 'tr' | 'en';
  const t = useTranslations('cart');

  const {
    appliedCoupon,
    discountAmount,
    validateCoupon,
    applyCoupon,
    removeCoupon,
  } = useCouponStore();

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleApplyCoupon = async () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    setError(null);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = applyCoupon(inputValue, subtotal);

    if (result.isValid) {
      setShowSuccess(true);
      setInputValue('');
      setTimeout(() => setShowSuccess(false), 2000);
    } else if (result.error) {
      setError(result.error.message[locale]);
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplyCoupon();
    }
  };

  const handleQuickApply = (code: string) => {
    setInputValue(code);
    const result = applyCoupon(code, subtotal);
    if (!result.isValid && result.error) {
      setError(result.error.message[locale]);
    } else {
      setShowSuccess(true);
      setInputValue('');
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  // Uygulanabilir kuponları filtrele
  const availableCoupons = AVAILABLE_COUPONS.filter((coupon) => {
    if (!coupon.isActive) return false;
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date())
      return false;
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit)
      return false;
    if (appliedCoupon?.code === coupon.code) return false;
    return true;
  });

  return (
    <div className={cn('space-y-3', className)}>
      {/* Uygulanan Kupon */}
      <AnimatePresence>
        {appliedCoupon && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-emerald-800 dark:text-emerald-200">
                    {appliedCoupon.code}
                  </p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">
                    {appliedCoupon.description[locale]}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-emerald-700 dark:text-emerald-300">
                  -{discountAmount.toLocaleString('tr-TR')}₺
                </span>
                <button
                  onClick={removeCoupon}
                  className="p-1.5 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-800/50 text-emerald-600 dark:text-emerald-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kupon Girişi */}
      {!appliedCoupon && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value.toUpperCase());
                  setError(null);
                }}
                onKeyDown={handleKeyDown}
                placeholder={t('coupon.placeholder')}
                className={cn(
                  'w-full pl-10 pr-4 py-3 rounded-xl border bg-white dark:bg-neutral-900 transition-colors',
                  error
                    ? 'border-rose-300 dark:border-rose-700 focus:border-rose-500 focus:ring-rose-500/20'
                    : 'border-neutral-200 dark:border-neutral-700 focus:border-gold dark:focus:border-gold-dark focus:ring-gold/20'
                )}
                disabled={isLoading}
              />

              {/* Success Check */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={handleApplyCoupon}
              disabled={isLoading || !inputValue.trim()}
              className={cn(
                'px-5 py-3 rounded-xl font-medium transition-all',
                'bg-gold hover:bg-gold/90 dark:bg-gold-dark dark:hover:bg-gold-dark/90 text-white',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                t('coupon.apply')
              )}
            </button>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-rose-500 dark:text-rose-400"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Available Coupons Toggle */}
          {showAvailableCoupons && availableCoupons.length > 0 && (
            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full text-sm text-neutral-600 dark:text-neutral-400 hover:text-gold dark:hover:text-gold-dark transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  {locale === 'tr'
                    ? `${availableCoupons.length} kupon mevcut`
                    : `${availableCoupons.length} coupons available`}
                </span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 space-y-2">
                      {availableCoupons.map((coupon) => {
                        const validation = validateCoupon(
                          coupon.code,
                          subtotal
                        );
                        const isApplicable = validation.isValid;

                        return (
                          <div
                            key={coupon.code}
                            className={cn(
                              'flex items-center justify-between p-3 rounded-lg border transition-colors',
                              isApplicable
                                ? 'border-gold/30 bg-gold/5 dark:border-gold-dark/30 dark:bg-gold-dark/5 hover:border-gold dark:hover:border-gold-dark'
                                : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 opacity-60'
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={cn(
                                  'w-10 h-10 rounded-lg flex items-center justify-center',
                                  isApplicable
                                    ? 'bg-gold/20 dark:bg-gold-dark/20'
                                    : 'bg-neutral-200 dark:bg-neutral-700'
                                )}
                              >
                                {coupon.type === 'percentage' ? (
                                  <Percent
                                    className={cn(
                                      'w-5 h-5',
                                      isApplicable
                                        ? 'text-gold dark:text-gold-dark'
                                        : 'text-neutral-400'
                                    )}
                                  />
                                ) : (
                                  <Tag
                                    className={cn(
                                      'w-5 h-5',
                                      isApplicable
                                        ? 'text-gold dark:text-gold-dark'
                                        : 'text-neutral-400'
                                    )}
                                  />
                                )}
                              </div>
                              <div>
                                <p className="font-mono font-bold text-neutral-800 dark:text-neutral-100">
                                  {coupon.code}
                                </p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                  {coupon.description[locale]}
                                  {coupon.minPurchase && (
                                    <span className="ml-1">
                                      (Min: {coupon.minPurchase}₺)
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  'font-bold',
                                  isApplicable
                                    ? 'text-gold dark:text-gold-dark'
                                    : 'text-neutral-400'
                                )}
                              >
                                {formatCouponDiscount(coupon, locale)}
                              </span>
                              {isApplicable && (
                                <button
                                  onClick={() => handleQuickApply(coupon.code)}
                                  className="px-3 py-1 rounded-lg bg-gold dark:bg-gold-dark text-white text-sm font-medium hover:bg-gold/90 dark:hover:bg-gold-dark/90 transition-colors"
                                >
                                  {t('coupon.apply')}
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CouponInput;
