// src/store/recentlyViewed.ts
// NOVELLA - Son Görüntülenen Ürünler Store

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '@/types/product';

interface RecentlyViewedItem {
  product: Product;
  viewedAt: string;
}

interface RecentlyViewedState {
  items: RecentlyViewedItem[];
  maxItems: number;
  
  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearAll: () => void;
  
  // Getters
  getItems: () => Product[];
  getRecentItems: (count?: number) => Product[];
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      items: [],
      maxItems: 12, // Maksimum 12 ürün sakla

      addItem: (product: Product) => {
        const { items, maxItems } = get();
        
        // Aynı ürün zaten varsa, önce kaldır (en üste taşımak için)
        const filteredItems = items.filter(
          (item) => item.product.id !== product.id
        );
        
        // Yeni ürünü başa ekle
        const newItems = [
          {
            product,
            viewedAt: new Date().toISOString(),
          },
          ...filteredItems,
        ].slice(0, maxItems); // Maksimum sayıyı aşma
        
        set({ items: newItems });
      },

      removeItem: (productId: string) => {
        set({
          items: get().items.filter((item) => item.product.id !== productId),
        });
      },

      clearAll: () => {
        set({ items: [] });
      },

      getItems: () => {
        return get().items.map((item) => item.product);
      },

      getRecentItems: (count = 6) => {
        return get().items.slice(0, count).map((item) => item.product);
      },
    }),
    {
      name: 'novella-recently-viewed',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Hook shortcuts
export const useRecentProducts = (count?: number) => 
  useRecentlyViewedStore((state) => state.getRecentItems(count));
