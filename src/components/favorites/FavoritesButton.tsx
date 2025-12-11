'use client';

// src/components/favorites/FavoritesButton.tsx
// NOVELLA - Favoriler Butonu

import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavoritesStore } from '@/store/favorites';

export function FavoritesButton() {
  const { openDrawer, getItemCount } = useFavoritesStore();
  const itemCount = getItemCount();

  return (
    <button
      onClick={openDrawer}
      className="relative p-2 rounded-lg hover:bg-muted transition-colors"
      aria-label="Favoriler"
    >
      <Heart className="w-5 h-5" />
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs font-medium rounded-full flex items-center justify-center"
          >
            {itemCount > 99 ? '99+' : itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
