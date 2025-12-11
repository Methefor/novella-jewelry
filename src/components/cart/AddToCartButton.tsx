'use client';

// src/components/cart/AddToCartButton.tsx
// NOVELLA - Sepete Ekle Butonu Bileşeni

import { useTranslations } from '@/lib/i18n-client';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import type { Product } from '@/types/product';

interface AddToCartButtonProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline';
  showQuantity?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export function AddToCartButton({
  product,
  size = 'md',
  variant = 'primary',
  showQuantity = false,
  fullWidth = false,
  className,
}: AddToCartButtonProps) {
  const t = useTranslations('cart');
  const { addItem, openCart, isInCart, getItemByProductId, updateQuantity } =
    useCartStore();

  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isOutOfStock = product.status === 'out-of-stock';
  const cartItem = getItemByProductId(product.id);
  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    setIsAdding(true);

    // Sepete ekle
    addItem(product, quantity);

    // Başarı animasyonu
    setTimeout(() => {
      setIsAdding(false);
      setShowSuccess(true);
      setQuantity(1);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    }, 300);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > 10) return; // Max 10 adet
    setQuantity(newQuantity);
  };

  // Stokta yoksa
  if (isOutOfStock) {
    return (
      <Button
        size={size}
        variant="outline"
        fullWidth={fullWidth}
        disabled
        className={cn('opacity-50 cursor-not-allowed', className)}
      >
        {t('outOfStock')}
      </Button>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center gap-3',
        fullWidth && 'w-full',
        className
      )}
    >
      {/* Quantity Selector */}
      {showQuantity && (
        <div className="flex items-center border rounded-lg">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="p-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 font-medium min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= 10}
            className="p-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Add to Cart Button */}
      <Button
        size={size}
        variant={variant}
        fullWidth={fullWidth && !showQuantity}
        onClick={handleAddToCart}
        loading={isAdding}
        className={cn(
          'relative overflow-hidden',
          fullWidth && showQuantity && 'flex-1'
        )}
        leftIcon={
          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
              >
                <Check className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div
                key="bag"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <ShoppingBag className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        }
      >
        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {t('addedToCart')}
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {t('addToCart')}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
}

export default AddToCartButton;
