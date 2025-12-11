// src/store/filters.ts
// NOVELLA - Ürün Filtreleme State Yönetimi (Zustand)

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Filtreleme state tipi
interface FiltersState {
  // Fiyat aralığı: [min, max]
  priceRange: [number, number];

  // Actions
  setPriceRange: (range: [number, number]) => void;
  resetFilters: () => void;
}

// Varsayılan değerler
const DEFAULT_PRICE_RANGE: [number, number] = [50, 2000];

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set) => ({
      priceRange: DEFAULT_PRICE_RANGE,

      // Fiyat aralığını ayarla
      setPriceRange: (range: [number, number]) => {
        set({ priceRange: range });
      },

      // Tüm filtreleri sıfırla
      resetFilters: () => {
        set({ priceRange: DEFAULT_PRICE_RANGE });
      },
    }),
    {
      name: 'novella-filters',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Selector hooks
export const usePriceRange = () => useFiltersStore((state) => state.priceRange);
export const useSetPriceRange = () =>
  useFiltersStore((state) => state.setPriceRange);
export const useResetFilters = () =>
  useFiltersStore((state) => state.resetFilters);
