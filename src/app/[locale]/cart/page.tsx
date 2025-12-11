'use client';

// src/app/[locale]/cart/page.tsx
// NOVELLA - Sepet Sayfası

import { useTranslations } from '@/lib/i18n-client';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  RotateCcw,
  Shield,
  ShoppingBag,
  Trash2,
  Truck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { formatPrice } from '@/lib/utils';
import {
  FREE_SHIPPING_THRESHOLD,
  calculateShipping,
  getRemainingForFreeShipping,
  useCartStore,
} from '@/store/cart';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function CartPage() {
  const params = useParams();
  const locale = params.locale as 'tr' | 'en';
  const t = useTranslations('cart');
  const tCheckout = useTranslations('checkout');

  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    getSubtotal,
  } = useCartStore();

  const itemCount = getItemCount();
  const subtotal = getSubtotal();
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;
  const remainingForFreeShipping = getRemainingForFreeShipping(subtotal);

  const breadcrumbItems = [{ label: t('title') }];

  const trustFeatures = [
    { icon: Truck, label: locale === 'tr' ? 'Hızlı Kargo' : 'Fast Shipping' },
    {
      icon: Shield,
      label: locale === 'tr' ? 'Güvenli Ödeme' : 'Secure Payment',
    },
    {
      icon: RotateCcw,
      label: locale === 'tr' ? '14 Gün İade' : '14-Day Returns',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-muted/50 to-background pt-8 pb-8">
        <Container>
          <Breadcrumb items={breadcrumbItems} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-3xl md:text-4xl font-bold">
              {t('title')}
            </h1>
            {itemCount > 0 && (
              <p className="text-muted-foreground mt-2">
                {itemCount} {itemCount === 1 ? t('item') : t('items')}
              </p>
            )}
          </motion.div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section className="py-8">
        <Container>
          {items.length === 0 ? (
            // Empty Cart
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="font-heading text-2xl font-semibold mb-3">
                {t('empty.title')}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {t('empty.description')}
              </p>
              <Link href={`/${locale}/collections`}>
                <Button
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  {t('empty.button')}
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                >
                  {/* Free Shipping Progress */}
                  <div className="p-4 bg-muted/50 rounded-t-2xl border-b">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">
                        {remainingForFreeShipping > 0
                          ? `${t('freeShippingRemaining')}${formatPrice(
                              remainingForFreeShipping,
                              locale
                            )} daha harcayın`
                          : t('freeShippingReached')}
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
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>

                  {/* Items List */}
                  <ul className="divide-y">
                    {items.map((item, index) => (
                      <motion.li
                        key={item.product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 md:p-6"
                      >
                        <div className="flex gap-4 md:gap-6">
                          {/* Product Image */}
                          <Link
                            href={`/${locale}/products/${item.product.slug}`}
                            className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-muted flex-shrink-0"
                          >
                            {item.product.images[0] ? (
                              <Image
                                src={item.product.images[0].src}
                                alt={item.product.images[0].alt}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                              </div>
                            )}
                          </Link>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                              <div>
                                <Link
                                  href={`/${locale}/products/${item.product.slug}`}
                                  className="font-heading font-semibold hover:text-primary transition-colors line-clamp-2"
                                >
                                  {item.product.name[locale as 'tr' | 'en']}
                                </Link>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {item.product.material &&
                                    (locale === 'tr'
                                      ? item.product.material === 'gold-plated'
                                        ? 'Altın Kaplama'
                                        : item.product.material ===
                                          'silver-plated'
                                        ? 'Gümüş Kaplama'
                                        : item.product.material ===
                                          'stainless-steel'
                                        ? 'Paslanmaz Çelik'
                                        : 'Karışık Metal'
                                      : item.product.material
                                          .split('-')
                                          .map(
                                            (w) =>
                                              w.charAt(0).toUpperCase() +
                                              w.slice(1)
                                          )
                                          .join(' '))}
                                </p>
                              </div>

                              <div className="text-right">
                                <p className="text-lg font-bold text-primary">
                                  {formatPrice(
                                    item.product.price * item.quantity,
                                    locale
                                  )}
                                </p>
                                {item.quantity > 1 && (
                                  <p className="text-xs text-muted-foreground">
                                    {formatPrice(item.product.price, locale)} x{' '}
                                    {item.quantity}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between mt-4">
                              {/* Quantity Controls */}
                              <div className="flex items-center border rounded-lg">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity - 1
                                    )
                                  }
                                  className="p-2 hover:bg-muted transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-4 font-medium min-w-[3rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity + 1
                                    )
                                  }
                                  className="p-2 hover:bg-muted transition-colors"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Remove Button */}
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span className="hidden sm:inline">
                                  {t('remove')}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Clear Cart */}
                  <div className="p-4 border-t flex justify-between items-center">
                    <Link href={`/${locale}/collections`}>
                      <Button
                        variant="ghost"
                        leftIcon={<ArrowLeft className="w-4 h-4" />}
                      >
                        {t('continueShopping')}
                      </Button>
                    </Link>
                    <button
                      onClick={clearCart}
                      className="text-sm text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      {t('clear')}
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="card sticky top-24"
                >
                  <h2 className="font-heading text-xl font-semibold mb-6">
                    {tCheckout('summary.title')}
                  </h2>

                  {/* Summary Lines */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {tCheckout('summary.subtotal')}
                      </span>
                      <span>{formatPrice(subtotal, locale)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {tCheckout('summary.shipping')}
                      </span>
                      <span
                        className={
                          shipping === 0 ? 'text-green-600 font-medium' : ''
                        }
                      >
                        {shipping === 0
                          ? t('shippingFree')
                          : formatPrice(shipping, locale)}
                      </span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>{tCheckout('summary.total')}</span>
                        <span className="text-primary">
                          {formatPrice(total, locale)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <div className="mt-6">
                    <Link href={`/${locale}/checkout`}>
                      <Button
                        fullWidth
                        size="lg"
                        rightIcon={<ArrowRight className="w-5 h-5" />}
                      >
                        {t('checkout')}
                      </Button>
                    </Link>
                  </div>

                  {/* Trust Features */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="grid grid-cols-3 gap-2">
                      {trustFeatures.map((feature) => {
                        const Icon = feature.icon;
                        return (
                          <div key={feature.label} className="text-center">
                            <Icon className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                            <span className="text-xs text-muted-foreground">
                              {feature.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
