// src/store/search.ts
// NOVELLA - Arama Sistemi Store

import { create } from 'zustand';
import type { Product } from '@/types/product';
import { products } from '@/data/products';

interface SearchState {
  query: string;
  isOpen: boolean;
  results: Product[];
  recentSearches: string[];
  isLoading: boolean;

  // Actions
  setQuery: (query: string) => void;
  search: (query: string) => void;
  clearSearch: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

// Arama fonksiyonu
const searchProducts = (query: string): Product[] => {
  if (!query.trim()) return [];

  const searchTerm = query.toLowerCase().trim();
  
  return products.filter((product) => {
    // İsimde ara (TR ve EN)
    const nameMatch = 
      product.name.tr.toLowerCase().includes(searchTerm) ||
      product.name.en.toLowerCase().includes(searchTerm);
    
    // Açıklamada ara
    const descMatch = 
      product.description.tr.toLowerCase().includes(searchTerm) ||
      product.description.en.toLowerCase().includes(searchTerm);
    
    // Tag'lerde ara
    const tagMatch = product.tags?.some(tag => 
      tag.toLowerCase().includes(searchTerm)
    );
    
    // Kategori ve malzemede ara
    const categoryMatch = product.category.toLowerCase().includes(searchTerm);
    const materialMatch = product.material.toLowerCase().includes(searchTerm);

    return nameMatch || descMatch || tagMatch || categoryMatch || materialMatch;
  });
};

// localStorage'dan recent searches al
const getStoredRecentSearches = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('novella-recent-searches');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// localStorage'a recent searches kaydet
const storeRecentSearches = (searches: string[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('novella-recent-searches', JSON.stringify(searches));
  } catch {
    // Storage full or unavailable
  }
};

export const useSearchStore = create<SearchState>((set, get) => ({
  query: '',
  isOpen: false,
  results: [],
  recentSearches: [],
  isLoading: false,

  setQuery: (query: string) => {
    set({ query });
  },

  search: (query: string) => {
    set({ isLoading: true, query });
    
    // Simüle edilmiş loading (gerçek API'de gerekli olabilir)
    setTimeout(() => {
      const results = searchProducts(query);
      set({ results, isLoading: false });
      
      // Geçerli arama ise recent'e ekle
      if (query.trim().length >= 2 && results.length > 0) {
        get().addRecentSearch(query.trim());
      }
    }, 150);
  },

  clearSearch: () => {
    set({ query: '', results: [] });
  },

  openSearch: () => {
    const recentSearches = getStoredRecentSearches();
    set({ isOpen: true, recentSearches });
  },

  closeSearch: () => {
    set({ isOpen: false, query: '', results: [] });
  },

  toggleSearch: () => {
    const { isOpen } = get();
    if (isOpen) {
      get().closeSearch();
    } else {
      get().openSearch();
    }
  },

  addRecentSearch: (query: string) => {
    const { recentSearches } = get();
    const filtered = recentSearches.filter(s => s.toLowerCase() !== query.toLowerCase());
    const updated = [query, ...filtered].slice(0, 5); // Max 5 recent
    set({ recentSearches: updated });
    storeRecentSearches(updated);
  },

  clearRecentSearches: () => {
    set({ recentSearches: [] });
    storeRecentSearches([]);
  },
}));
