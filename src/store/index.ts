import { create } from 'zustand';

// Re-export stores
export { useReviewsStore } from './reviews';

interface AppState {
  // Mobile Menu
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;

  // Cart (ileride kullanılacak)
  cartItems: string[];
  addToCart: (item: string) => void;
  removeFromCart: (item: string) => void;
  clearCart: () => void;

  // UI States
  isScrolled: boolean;
  setIsScrolled: (value: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Mobile Menu
  isMobileMenuOpen: false,
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  // Cart
  cartItems: [],
  addToCart: (item) =>
    set((state) => ({ cartItems: [...state.cartItems, item] })),
  removeFromCart: (item) =>
    set((state) => ({ cartItems: state.cartItems.filter((i) => i !== item) })),
  clearCart: () => set({ cartItems: [] }),

  // UI States
  isScrolled: false,
  setIsScrolled: (value) => set({ isScrolled: value }),
}));
