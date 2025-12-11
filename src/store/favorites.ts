// src/store/favorites.ts
// NOVELLA - Favori Sistemi Store (Zustand + Persist)

import type { Product } from '@/types/product';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteItem {
  product: Product;
  addedAt: string;
}

interface FavoritesState {
  items: FavoriteItem[];
  isDrawerOpen: boolean;

  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  clearAll: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;

  // Computed
  getItemCount: () => number;
  isInFavorites: (productId: string) => boolean;
  getItems: () => FavoriteItem[];
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      // Favorilere ekle
      addItem: (product: Product) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => item.product.id === product.id
        );

        if (!existingItem) {
          set({
            items: [
              ...items,
              {
                product,
                addedAt: new Date().toISOString(),
              },
            ],
          });
        }
      },

      // Favorilerden çıkar
      removeItem: (productId: string) => {
        set({
          items: get().items.filter((item) => item.product.id !== productId),
        });
      },

      // Toggle favori (ekle/çıkar)
      toggleItem: (product: Product) => {
        const { items, addItem, removeItem } = get();
        const isInFavorites = items.some(
          (item) => item.product.id === product.id
        );

        if (isInFavorites) {
          removeItem(product.id);
        } else {
          addItem(product);
        }
      },

      // Tümünü temizle
      clearAll: () => {
        set({ items: [] });
      },

      // Drawer kontrolleri
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () =>
        set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      // Computed
      getItemCount: () => get().items.length,

      isInFavorites: (productId: string) => {
        return get().items.some((item) => item.product.id === productId);
      },

      getItems: () => get().items,
    }),
    {
      name: 'novella-favorites',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
export const useFavoritesItems = () =>
  useFavoritesStore((state) => state.items);
export const useFavoritesCount = () =>
  useFavoritesStore((state) => state.getItemCount());
