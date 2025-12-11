'use client';

// src/components/reviews/ReviewForm.tsx
// NOVELLA - Yorum Yazma Formu

import { useLocale } from '@/lib/i18n-client';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Send, Star, X } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import type { ReviewFormData } from '@/types/review';
import { StarRating } from './StarRating';

interface ReviewFormProps {
  productId: string;
  productName: string;
  onSubmit?: (data: ReviewFormData) => Promise<void>;
  className?: string;
}

export function ReviewForm({
  productId,
  productName,
  onSubmit,
  className,
}: ReviewFormProps) {
  const locale = useLocale() as 'tr' | 'en';

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    title: '',
    content: '',
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ReviewFormData, string>>
  >({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ReviewFormData, string>> = {};

    if (formData.rating === 0) {
      newErrors.rating =
        locale === 'tr' ? 'Lütfen puan verin' : 'Please give a rating';
    }
    if (!formData.name.trim()) {
      newErrors.name = locale === 'tr' ? 'İsim gerekli' : 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email =
        locale === 'tr' ? 'E-posta gerekli' : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email =
        locale === 'tr' ? 'Geçerli e-posta girin' : 'Enter a valid email';
    }
    if (!formData.content.trim()) {
      newErrors.content =
        locale === 'tr' ? 'Yorum gerekli' : 'Review is required';
    } else if (formData.content.length < 10) {
      newErrors.content =
        locale === 'tr'
          ? 'En az 10 karakter yazın'
          : 'Write at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (onSubmit) {
        await onSubmit(formData);
      }

      setIsSuccess(true);

      // Form'u sıfırla
      setTimeout(() => {
        setIsOpen(false);
        setIsSuccess(false);
        setFormData({
          rating: 0,
          title: '',
          content: '',
          name: '',
          email: '',
        });
      }, 2000);
    } catch (error) {
      console.error('Review submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const labels = {
    writeReview: locale === 'tr' ? 'Yorum Yaz' : 'Write a Review',
    rating: locale === 'tr' ? 'Puanınız' : 'Your Rating',
    title: locale === 'tr' ? 'Başlık (opsiyonel)' : 'Title (optional)',
    titlePlaceholder:
      locale === 'tr'
        ? 'Yorumunuza bir başlık verin'
        : 'Give your review a title',
    review: locale === 'tr' ? 'Yorumunuz' : 'Your Review',
    reviewPlaceholder:
      locale === 'tr'
        ? 'Bu ürün hakkında ne düşünüyorsunuz?'
        : 'What do you think about this product?',
    name: locale === 'tr' ? 'İsminiz' : 'Your Name',
    namePlaceholder: locale === 'tr' ? 'Görünecek isim' : 'Display name',
    email: locale === 'tr' ? 'E-posta' : 'Email',
    emailPlaceholder:
      locale === 'tr' ? 'Yayınlanmayacak' : 'Will not be published',
    submit: locale === 'tr' ? 'Yorumu Gönder' : 'Submit Review',
    submitting: locale === 'tr' ? 'Gönderiliyor...' : 'Submitting...',
    success: locale === 'tr' ? 'Yorumunuz alındı!' : 'Review submitted!',
    successDetail:
      locale === 'tr'
        ? 'İnceledikten sonra yayınlanacak'
        : 'Will be published after review',
    cancel: locale === 'tr' ? 'İptal' : 'Cancel',
  };

  return (
    <div className={cn('', className)}>
      {/* Trigger Button */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsOpen(true)}
          className="w-full py-4 px-6 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-700 hover:border-gold dark:hover:border-gold-dark text-neutral-600 dark:text-neutral-400 hover:text-gold dark:hover:text-gold-dark transition-all flex items-center justify-center gap-2"
        >
          <Star className="w-5 h-5" />
          <span className="font-medium">{labels.writeReview}</span>
        </motion.button>
      )}

      {/* Form */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
              {/* Success State */}
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-1">
                    {labels.success}
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    {labels.successDetail}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">
                      {labels.writeReview}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Product Name */}
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {productName}
                  </p>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      {labels.rating} *
                    </label>
                    <StarRating
                      rating={formData.rating}
                      size="lg"
                      interactive
                      onChange={(rating) => {
                        setFormData((prev) => ({ ...prev, rating }));
                        setErrors((prev) => ({ ...prev, rating: undefined }));
                      }}
                    />
                    {errors.rating && (
                      <p className="mt-1 text-sm text-rose-500">
                        {errors.rating}
                      </p>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      {labels.title}
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder={labels.titlePlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:border-gold dark:focus:border-gold-dark focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      {labels.review} *
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }));
                        setErrors((prev) => ({ ...prev, content: undefined }));
                      }}
                      placeholder={labels.reviewPlaceholder}
                      rows={4}
                      className={cn(
                        'w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-gold/20 outline-none transition-all resize-none',
                        errors.content
                          ? 'border-rose-300 dark:border-rose-700 focus:border-rose-500'
                          : 'border-neutral-200 dark:border-neutral-700 focus:border-gold dark:focus:border-gold-dark'
                      )}
                    />
                    {errors.content && (
                      <p className="mt-1 text-sm text-rose-500">
                        {errors.content}
                      </p>
                    )}
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        {labels.name} *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }));
                          setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder={labels.namePlaceholder}
                        className={cn(
                          'w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-gold/20 outline-none transition-all',
                          errors.name
                            ? 'border-rose-300 dark:border-rose-700 focus:border-rose-500'
                            : 'border-neutral-200 dark:border-neutral-700 focus:border-gold dark:focus:border-gold-dark'
                        )}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-rose-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        {labels.email} *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }));
                          setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder={labels.emailPlaceholder}
                        className={cn(
                          'w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-gold/20 outline-none transition-all',
                          errors.email
                            ? 'border-rose-300 dark:border-rose-700 focus:border-rose-500'
                            : 'border-neutral-200 dark:border-neutral-700 focus:border-gold dark:focus:border-gold-dark'
                        )}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-rose-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    >
                      {labels.cancel}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        'flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all',
                        'bg-gold hover:bg-gold/90 dark:bg-gold-dark dark:hover:bg-gold-dark/90 text-white',
                        'disabled:opacity-50 disabled:cursor-not-allowed'
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {labels.submitting}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {labels.submit}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ReviewForm;
