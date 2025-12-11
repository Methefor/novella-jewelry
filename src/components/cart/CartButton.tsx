'use client';

// src/components/cart/CartButton.tsx
// NOVELLA - Sepet Butonu Bileşeni

import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useCartStore } from '@/store/cart';

export function CartButton() {
  const { openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  return (
    <button
      onClick={openCart}
      className="relative p-2 hover:bg-muted rounded-lg transition-colors"
      aria-label="Open cart"
    >
      <ShoppingBag className="w-5 h-5" />
      
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-medium rounded-full flex items-center justify-center"
          >
            {itemCount > 99 ? '99+' : itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default CartButton;
