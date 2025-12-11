'use client';

// src/components/cart/CartDrawer.tsx
// NOVELLA - Sepet Drawer Bileşeni

import { useLocale, useTranslations } from '@/lib/i18n-client';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import {
  createCartData,
  sendCartInquiry,
  trackWhatsAppClick,
} from '@/lib/whatsapp';
import {
  FREE_SHIPPING_THRESHOLD,
  calculateShipping,
  getRemainingForFreeShipping,
  useCartStore,
} from '@/store/cart';

export function CartDrawer() {
  const t = useTranslations('cart');
  const locale = useLocale();

  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getItemCount,
    getSubtotal,
  } = useCartStore();

  const itemCount = getItemCount();
  const subtotal = getSubtotal();
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;
  const remainingForFreeShipping = getRemainingForFreeShipping(subtotal);

  // WhatsApp ile sipariş ver
  const handleWhatsAppOrder = () => {
    const cartData = createCartData(items, shipping);
    sendCartInquiry(cartData, locale);
    trackWhatsAppClick('cart', cartData);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="font-heading text-lg font-semibold">
                  {t('title')}
                </h2>
                {itemCount > 0 && (
                  <span className="bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {itemCount > 0 && (
              <div className="p-4 bg-muted/50 border-b">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4 text-primary" />
                  <span className="text-sm">
                    {remainingForFreeShipping > 0
                      ? t('cart.freeShippingRemaining').replace(
                          '{amount}',
                          formatPrice(remainingForFreeShipping, locale)
                        )
                      : t('cart.freeShippingReached')}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(
                        (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
                        100
                      )}%`,
                    }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                // Empty Cart
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2">
                    {t('empty.title')}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {t('empty.description')}
                  </p>
                  <Button onClick={closeCart}>{t('empty.button')}</Button>
                </div>
              ) : (
                // Cart Items List
                <ul className="divide-y">
                  {items.map((item) => (
                    <motion.li
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="p-4"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <Link
                          href={`/${locale}/products/${item.product.slug}`}
                          onClick={closeCart}
                          className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0"
                        >
                          {item.product.images[0] ? (
                            <Image
                              src={item.product.images[0].src}
                              alt={item.product.images[0].alt}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                            </div>
                          )}
                        </Link>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/${locale}/products/${item.product.slug}`}
                            onClick={closeCart}
                            className="font-medium hover:text-primary transition-colors line-clamp-1"
                          >
                            {item.product.name[locale as 'tr' | 'en']}
                          </Link>

                          <p className="text-primary font-semibold mt-1">
                            {formatPrice(item.product.price, locale)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border rounded-lg">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1
                                  )
                                }
                                className="p-1.5 hover:bg-muted transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-3 text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + 1
                                  )
                                }
                                className="p-1.5 hover:bg-muted transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer - Summary & Actions */}
            {items.length > 0 && (
              <div className="border-t p-4 space-y-4 bg-background">
                {/* Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t('subtotal')}
                    </span>
                    <span>{formatPrice(subtotal, locale)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t('shipping')}
                    </span>
                    <span
                      className={
                        shipping === 0 ? 'text-green-600 font-medium' : ''
                      }
                    >
                      {shipping === 0
                        ? t('cart.shippingFree')
                        : formatPrice(shipping, locale)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-2 border-t">
                    <span>{t('total')}</span>
                    <span className="text-primary">
                      {formatPrice(total, locale)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  {/* WhatsApp ile Sipariş Ver */}
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    WhatsApp ile Sipariş Ver ({formatPrice(total, locale)})
                  </button>

                  <Link href={`/${locale}/checkout`} onClick={closeCart}>
                    <Button
                      fullWidth
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      {t('checkout')}
                    </Button>
                  </Link>
                  <Link href={`/${locale}/cart`} onClick={closeCart}>
                    <Button variant="outline" fullWidth>
                      {t('goToCart')}
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
