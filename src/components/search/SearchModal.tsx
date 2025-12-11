'use client';

import { useLocale } from '@/lib/i18n-client';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Search, Star, TrendingUp, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const popularSearches = [
  'Altın kolye',
  'Gümüş bilezik',
  'Elmas küpe',
  'Rose gold yüzük',
  'İnci kolye',
  'Çelik bilezik',
];

const trendingProducts = [
  {
    id: 1,
    name: 'Gold Necklace',
    price: 299,
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    name: 'Silver Bracelet',
    price: 249,
    image:
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    name: 'Diamond Earrings',
    price: 399,
    image:
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100&h=100&fit=crop',
  },
  {
    id: 4,
    name: 'Rose Gold Ring',
    price: 349,
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100&h=100&fit=crop',
  },
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const locale = useLocale();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const recent = localStorage.getItem('recentSearches');
      if (recent) {
        setRecentSearches(JSON.parse(recent));
      }
    }
  }, []);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    const updated = [
      searchQuery,
      ...recentSearches.filter((s) => s !== searchQuery),
    ].slice(0, 5);
    setRecentSearches(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }

    window.location.href = `/${locale}/collections?search=${encodeURIComponent(
      searchQuery
    )}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const clearRecent = () => {
    setRecentSearches([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('recentSearches');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 md:top-20 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full max-w-2xl z-50"
          >
            <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Ürün, kategori veya marka ara..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-base md:text-lg"
                    autoFocus
                  />
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="max-h-[60vh] md:max-h-[70vh] overflow-y-auto p-4 space-y-6">
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <h3 className="font-semibold text-sm">Son Aramalar</h3>
                      </div>
                      <button
                        onClick={clearRecent}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Temizle
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-sm transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-semibold text-sm">En Çok Arananlar</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-sm transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-semibold text-sm">Öne Çıkan Ürünler</h3>
                  </div>
                  <div className="space-y-2">
                    {trendingProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/${locale}/products/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {product.name}
                          </p>
                          <p className="text-primary font-semibold text-sm">
                            {product.price} TL
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
