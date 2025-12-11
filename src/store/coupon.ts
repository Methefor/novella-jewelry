// src/store/coupon.ts
// NOVELLA - Kupon Kodu Sistemi Store

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Kupon tipi
export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number; // Yüzde veya sabit TL
  minPurchase?: number; // Minimum sepet tutarı
  maxDiscount?: number; // Maksimum indirim (yüzde için)
  expiresAt?: string; // Son kullanma tarihi
  usageLimit?: number; // Kullanım limiti
  usedCount: number; // Kullanım sayısı
  description: {
    tr: string;
    en: string;
  };
  isActive: boolean;
}

// Örnek kuponlar (gerçek uygulamada backend'den gelecek)
export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'HOSGELDIN10',
    type: 'percentage',
    value: 10,
    minPurchase: 100,
    maxDiscount: 50,
    description: {
      tr: 'Hoş geldin indirimi - %10',
      en: 'Welcome discount - 10%',
    },
    usedCount: 0,
    isActive: true,
  },
  {
    code: 'YAZ2025',
    type: 'percentage',
    value: 15,
    minPurchase: 200,
    maxDiscount: 75,
    expiresAt: '2025-09-01T00:00:00Z',
    description: {
      tr: 'Yaz sezonu indirimi - %15',
      en: 'Summer season discount - 15%',
    },
    usedCount: 0,
    isActive: true,
  },
  {
    code: 'KARGO',
    type: 'fixed',
    value: 29.99,
    minPurchase: 150,
    description: {
      tr: 'Ücretsiz kargo',
      en: 'Free shipping',
    },
    usedCount: 0,
    isActive: true,
  },
  {
    code: 'ILKALIS50',
    type: 'fixed',
    value: 50,
    minPurchase: 300,
    usageLimit: 100,
    description: {
      tr: 'İlk alışverişe özel 50₺ indirim',
      en: '50₺ discount for first purchase',
    },
    usedCount: 45,
    isActive: true,
  },
  {
    code: 'VIP20',
    type: 'percentage',
    value: 20,
    minPurchase: 500,
    maxDiscount: 200,
    description: {
      tr: 'VIP müşteri indirimi - %20',
      en: 'VIP customer discount - 20%',
    },
    usedCount: 0,
    isActive: true,
  },
];

// Validation result type
export interface CouponValidationResult {
  isValid: boolean;
  error?: {
    code: 'INVALID' | 'EXPIRED' | 'MIN_PURCHASE' | 'USAGE_LIMIT' | 'INACTIVE';
    message: {
      tr: string;
      en: string;
    };
  };
  coupon?: Coupon;
  discount?: number;
}

interface CouponState {
  appliedCoupon: Coupon | null;
  discountAmount: number;
  
  // Actions
  validateCoupon: (code: string, subtotal: number) => CouponValidationResult;
  applyCoupon: (code: string, subtotal: number) => CouponValidationResult;
  removeCoupon: () => void;
  calculateDiscount: (coupon: Coupon, subtotal: number) => number;
  
  // Getters
  getAppliedCoupon: () => Coupon | null;
  getDiscountAmount: () => number;
}

export const useCouponStore = create<CouponState>()(
  persist(
    (set, get) => ({
      appliedCoupon: null,
      discountAmount: 0,

      validateCoupon: (code: string, subtotal: number): CouponValidationResult => {
        const normalizedCode = code.trim().toUpperCase();
        
        // Kuponu bul
        const coupon = AVAILABLE_COUPONS.find(
          (c) => c.code.toUpperCase() === normalizedCode
        );

        // Kupon bulunamadı
        if (!coupon) {
          return {
            isValid: false,
            error: {
              code: 'INVALID',
              message: {
                tr: 'Geçersiz kupon kodu',
                en: 'Invalid coupon code',
              },
            },
          };
        }

        // Kupon aktif değil
        if (!coupon.isActive) {
          return {
            isValid: false,
            error: {
              code: 'INACTIVE',
              message: {
                tr: 'Bu kupon artık geçerli değil',
                en: 'This coupon is no longer valid',
              },
            },
          };
        }

        // Süresi dolmuş
        if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
          return {
            isValid: false,
            error: {
              code: 'EXPIRED',
              message: {
                tr: 'Kuponun süresi dolmuş',
                en: 'Coupon has expired',
              },
            },
          };
        }

        // Kullanım limiti aşılmış
        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
          return {
            isValid: false,
            error: {
              code: 'USAGE_LIMIT',
              message: {
                tr: 'Kupon kullanım limiti dolmuş',
                en: 'Coupon usage limit reached',
              },
            },
          };
        }

        // Minimum tutar kontrolü
        if (coupon.minPurchase && subtotal < coupon.minPurchase) {
          return {
            isValid: false,
            error: {
              code: 'MIN_PURCHASE',
              message: {
                tr: `Minimum ${coupon.minPurchase}₺ alışveriş gerekli`,
                en: `Minimum purchase of ${coupon.minPurchase}₺ required`,
              },
            },
          };
        }

        // İndirim hesapla
        const discount = get().calculateDiscount(coupon, subtotal);

        return {
          isValid: true,
          coupon,
          discount,
        };
      },

      applyCoupon: (code: string, subtotal: number): CouponValidationResult => {
        const validation = get().validateCoupon(code, subtotal);

        if (validation.isValid && validation.coupon) {
          set({
            appliedCoupon: validation.coupon,
            discountAmount: validation.discount || 0,
          });
        }

        return validation;
      },

      removeCoupon: () => {
        set({
          appliedCoupon: null,
          discountAmount: 0,
        });
      },

      calculateDiscount: (coupon: Coupon, subtotal: number): number => {
        let discount = 0;

        if (coupon.type === 'percentage') {
          discount = (subtotal * coupon.value) / 100;
          
          // Maksimum indirim kontrolü
          if (coupon.maxDiscount && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
          }
        } else {
          // Sabit indirim
          discount = coupon.value;
        }

        // İndirim sepet tutarını geçemez
        return Math.min(discount, subtotal);
      },

      getAppliedCoupon: () => get().appliedCoupon,
      getDiscountAmount: () => get().discountAmount,
    }),
    {
      name: 'novella-coupon',
      storage: createJSONStorage(() => sessionStorage), // Session bazlı (sayfa kapanınca sıfırlanır)
      partialize: (state) => ({
        appliedCoupon: state.appliedCoupon,
        discountAmount: state.discountAmount,
      }),
    }
  )
);

// Helper function to format discount display
export const formatCouponDiscount = (coupon: Coupon, locale: 'tr' | 'en' = 'tr'): string => {
  if (coupon.type === 'percentage') {
    return `%${coupon.value}`;
  }
  return `${coupon.value.toLocaleString('tr-TR')}₺`;
};
