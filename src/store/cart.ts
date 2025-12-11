// src/store/cart.ts
// NOVELLA - Sepet State Yönetimi (Zustand)

import type { Product } from '@/types/product';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Sepetteki ürün tipi
export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: string;
}

// Sepet state tipi
interface CartState {
  items: CartItem[];
  isCartOpen: boolean;

  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed values (as functions)
  getItemCount: () => number;
  getSubtotal: () => number;
  getItemByProductId: (productId: string) => CartItem | undefined;
  isInCart: (productId: string) => boolean;
}

// Ücretsiz kargo limiti
export const FREE_SHIPPING_THRESHOLD =
  Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD) || 200;
export const SHIPPING_COST =
  Number(process.env.NEXT_PUBLIC_SHIPPING_COST) || 29.99;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      // Ürün ekle
      addItem: (product: Product, quantity: number = 1) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => item.product.id === product.id
        );

        if (existingItem) {
          // Ürün zaten sepette, miktarı artır
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          // Yeni ürün ekle
          set({
            items: [
              ...items,
              {
                product,
                quantity,
                addedAt: new Date().toISOString(),
              },
            ],
          });
        }
      },

      // Ürün çıkar
      removeItem: (productId: string) => {
        set({
          items: get().items.filter((item) => item.product.id !== productId),
        });
      },

      // Miktar güncelle
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      // Sepeti temizle
      clearCart: () => {
        set({ items: [] });
      },

      // Sepet drawer aç/kapa
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      // Toplam ürün sayısı
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      // Ara toplam
      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      // Ürün ID'sine göre sepet öğesi bul
      getItemByProductId: (productId: string) => {
        return get().items.find((item) => item.product.id === productId);
      },

      // Ürün sepette mi kontrol
      isInCart: (productId: string) => {
        return get().items.some((item) => item.product.id === productId);
      },
    }),
    {
      name: 'novella-cart',
      storage: createJSONStorage(() => localStorage),
      // Sadece items'ı persist et, isCartOpen'ı değil
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// Kargo ücreti hesaplama helper
export const calculateShipping = (subtotal: number): number => {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
};

// Toplam hesaplama helper
export const calculateTotal = (subtotal: number): number => {
  return subtotal + calculateShipping(subtotal);
};

// Ücretsiz kargoya kalan miktar
export const getRemainingForFreeShipping = (subtotal: number): number => {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return FREE_SHIPPING_THRESHOLD - subtotal;
};
export const useCartItems = () => useCartStore((state) => state.items);
export const useCartItemCount = () =>
  useCartStore((state) => state.getItemCount());
export const useCartSubtotal = () =>
  useCartStore((state) => state.getSubtotal());
