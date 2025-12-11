'use client';

// src/components/search/SearchKeyboardShortcut.tsx
// NOVELLA - Arama Klavye Kısayolu

import { useEffect } from 'react';
import { useSearchStore } from '@/store/search';

export function SearchKeyboardShortcut() {
  const { openSearch, isOpen } = useSearchStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K (Mac) veya Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) {
          openSearch();
        }
      }

      // "/" tuşu ile de arama aç (input'ta değilken)
      if (e.key === '/' && !isOpen) {
        const activeElement = document.activeElement;
        const isInputFocused = 
          activeElement instanceof HTMLInputElement ||
          activeElement instanceof HTMLTextAreaElement ||
          activeElement?.getAttribute('contenteditable') === 'true';
        
        if (!isInputFocused) {
          e.preventDefault();
          openSearch();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openSearch, isOpen]);

  return null;
}
