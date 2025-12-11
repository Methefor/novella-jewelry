'use client';

// src/app/[locale]/checkout/page.tsx
// NOVELLA - Checkout Sayfası

import { useLocale, useTranslations } from '@/lib/i18n-client';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  ExternalLink,
  MapPin,
  MessageCircle,
  Package,
  Shield,
  ShoppingBag,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { cn, formatPrice } from '@/lib/utils';
import { calculateShipping, calculateTotal, useCartStore } from '@/store/cart';

// Form data tipi
interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  orderNote: string;
}

// Checkout adımları
type CheckoutStep = 'info' | 'payment' | 'complete';

// WhatsApp ve Shopier linkleri
const SHOPIER_URL = 'https://novella.shopier.com';
const WHATSAPP_NUMBER = '905451125059'; // NOVELLA WhatsApp

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const tCart = useTranslations('cart');
  const locale = useLocale();

  const { items, getSubtotal, clearCart } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = calculateShipping(subtotal);
  const total = calculateTotal(subtotal);

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('info');
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    postalCode: '',
    orderNote: '',
  });
  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});
  const [orderNumber, setOrderNumber] = useState<string>('');

  const breadcrumbItems = [
    { label: tCart('title'), href: `/${locale}/cart` },
    { label: t('title') },
  ];

  const steps = [
    { key: 'cart', icon: ShoppingBag, label: t('steps.cart'), completed: true },
    {
      key: 'info',
      icon: User,
      label: t('steps.info'),
      completed: currentStep !== 'info',
    },
    {
      key: 'payment',
      icon: CreditCard,
      label: t('steps.payment'),
      completed: currentStep === 'complete',
    },
    {
      key: 'complete',
      icon: CheckCircle2,
      label: t('steps.complete'),
      completed: currentStep === 'complete',
    },
  ];

  // Form validasyonu
  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutFormData> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = t('validation.required');
    if (!formData.lastName.trim())
      newErrors.lastName = t('validation.required');
    if (!formData.email.trim()) {
      newErrors.email = t('validation.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('validation.invalidEmail');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('validation.required');
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = t('validation.invalidPhone');
    }
    if (!formData.address.trim()) newErrors.address = t('validation.required');
    if (!formData.city.trim()) newErrors.city = t('validation.required');
    if (!formData.district.trim())
      newErrors.district = t('validation.required');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form input değişikliği
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Hata varsa temizle
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Sonraki adıma geç
  const handleContinue = () => {
    if (currentStep === 'info') {
      if (validateForm()) {
        setCurrentStep('payment');
      }
    }
  };

  // WhatsApp sipariş mesajı oluştur
  const generateWhatsAppMessage = () => {
    const itemsList = items
      .map(
        (item) =>
          `• ${item.product.name[locale as 'tr' | 'en']} x${
            item.quantity
          } - ${formatPrice(item.product.price * item.quantity, locale)}`
      )
      .join('\n');

    const message = `
🛒 *NOVELLA Sipariş*

*Müşteri Bilgileri:*
Ad Soyad: ${formData.firstName} ${formData.lastName}
E-posta: ${formData.email}
Telefon: ${formData.phone}

*Teslimat Adresi:*
${formData.address}
${formData.district}, ${formData.city} ${formData.postalCode}

*Sipariş Detayları:*
${itemsList}

*Ara Toplam:* ${formatPrice(subtotal, locale)}
*Kargo:* ${shipping === 0 ? 'Ücretsiz' : formatPrice(shipping, locale)}
*Toplam:* ${formatPrice(total, locale)}

${formData.orderNote ? `*Not:* ${formData.orderNote}` : ''}
    `.trim();

    return encodeURIComponent(message);
  };

  // WhatsApp ile sipariş
  const handleWhatsAppOrder = () => {
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');

    // Sipariş numarası oluştur
    const newOrderNumber = `NOV-${Date.now().toString(36).toUpperCase()}`;
    setOrderNumber(newOrderNumber);
    setCurrentStep('complete');
    clearCart();
  };

  // Shopier'e yönlendir
  const handleShopierOrder = () => {
    window.open(SHOPIER_URL, '_blank');
  };

  // Sepet boşsa
  if (items.length === 0 && currentStep !== 'complete') {
    return (
      <Section className="py-16">
        <Container>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="font-heading text-2xl font-semibold mb-3">
              {tCart('empty.title')}
            </h2>
            <p className="text-muted-foreground mb-8">
              {tCart('empty.description')}
            </p>
            <Link href={`/${locale}/collections`}>
              <Button size="lg">{tCart('empty.button')}</Button>
            </Link>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <>
      {/* Header */}
      <Section className="bg-gradient-to-b from-muted/50 to-background pt-8 pb-4">
        <Container>
          <Breadcrumb items={breadcrumbItems} />

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-4xl font-bold mt-4"
          >
            {t('title')}
          </motion.h1>
        </Container>
      </Section>

      {/* Steps Progress */}
      <Section className="py-6 border-b">
        <Container>
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive =
                step.key === currentStep ||
                (step.key === 'cart' && currentStep === 'info') ||
                (step.key === 'info' && currentStep === 'payment');
              const isCompleted = step.completed;

              return (
                <div key={step.key} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                        isCompleted
                          ? 'bg-primary text-white'
                          : isActive
                          ? 'bg-primary/20 text-primary'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs mt-1 hidden sm:block">
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        'w-8 md:w-16 h-0.5 mx-2',
                        isCompleted ? 'bg-primary' : 'bg-muted'
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section className="py-8">
        <Container>
          <AnimatePresence mode="wait">
            {currentStep === 'complete' ? (
              // Success State
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-lg mx-auto text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="font-heading text-2xl font-bold mb-3">
                  {t('success.title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('success.description')}
                </p>
                {orderNumber && (
                  <div className="bg-muted rounded-lg p-4 mb-8">
                    <p className="text-sm text-muted-foreground mb-1">
                      {t('success.orderNumber')}
                    </p>
                    <p className="font-mono font-bold text-lg">{orderNumber}</p>
                  </div>
                )}
                <Link href={`/${locale}/collections`}>
                  <Button size="lg">{t('success.button')}</Button>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="checkout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid lg:grid-cols-3 gap-8"
              >
                {/* Form Section */}
                <div className="lg:col-span-2 space-y-6">
                  <AnimatePresence mode="wait">
                    {currentStep === 'info' && (
                      <motion.div
                        key="info-form"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                      >
                        {/* Customer Info */}
                        <div className="card">
                          <h2 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" />
                            {t('customerInfo.title')}
                          </h2>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1.5">
                                {t('customerInfo.firstName')} *
                              </label>
                              <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className={cn(
                                  'w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all',
                                  errors.firstName && 'border-red-500'
                                )}
                              />
                              {errors.firstName && (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors.firstName}
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1.5">
                                {t('customerInfo.lastName')} *
                              </label>
                              <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className={cn(
                                  'w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all',
                                  errors.lastName && 'border-red-500'
                                )}
                              />
                              {errors.lastName && (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors.lastName}
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1.5">
                                {t('customerInfo.email')} *
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={cn(
                                  'w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all',
                                  errors.email && 'border-red-500'
                                )}
                              />
                              {errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors.email}
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1.5">
                                {t('customerInfo.phone')} *
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder={t('customerInfo.phonePlaceholder')}
                                className={cn(
                                  'w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all',
                                  errors.phone && 'border-red-500'
                                )}
                              />
                              {errors.phone && (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors.phone}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="card">
                          <h2 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary" />
                            {t('shippingAddress.title')}
                          </h2>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1.5">
                                {t('shippingAddress.address')} *
                              </label>
                              <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder={t(
                                  'shippingAddress.addressPlaceholder'
                                )}
                                rows={2}
                                className={cn(
                                  'w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none',
                                  errors.address && 'border-red-500'
                                )}
                              />
                              {errors.address && (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors.address}
                                </p>
                              )}
                            </div>
                            <div className="grid sm:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-1.5">
                                  {t('shippingAddress.city')} *
                                </label>
                                <input
                                  type="text"
                                  name="city"
                                  value={formData.city}
                                  onChange={handleInputChange}
                                  className={cn(
                                    'w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all',
                                    errors.city && 'border-red-500'
                                  )}
                                />
                                {errors.city && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {errors.city}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1.5">
                                  {t('shippingAddress.district')} *
                                </label>
                                <input
                                  type="text"
                                  name="district"
                                  value={formData.district}
                                  onChange={handleInputChange}
                                  className={cn(
                                    'w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all',
                                    errors.district && 'border-red-500'
                                  )}
                                />
                                {errors.district && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {errors.district}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1.5">
                                  {t('shippingAddress.postalCode')}
                                </label>
                                <input
                                  type="text"
                                  name="postalCode"
                                  value={formData.postalCode}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Order Note */}
                        <div className="card">
                          <h2 className="font-heading text-lg font-semibold mb-4">
                            {t('orderNote.title')}
                          </h2>
                          <textarea
                            name="orderNote"
                            value={formData.orderNote}
                            onChange={handleInputChange}
                            placeholder={t('orderNote.placeholder')}
                            rows={3}
                            className="w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                          />
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between">
                          <Link href={`/${locale}/cart`}>
                            <Button
                              variant="ghost"
                              leftIcon={<ArrowLeft className="w-4 h-4" />}
                            >
                              {t('actions.back')}
                            </Button>
                          </Link>
                          <Button
                            onClick={handleContinue}
                            rightIcon={<ArrowRight className="w-4 h-4" />}
                          >
                            {t('actions.continue')}
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 'payment' && (
                      <motion.div
                        key="payment-form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        {/* Payment Options */}
                        <div className="card">
                          <h2 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-primary" />
                            {t('payment.title')}
                          </h2>

                          <div className="space-y-4">
                            {/* Shopier Option */}
                            <div className="border rounded-xl p-4 hover:border-primary transition-colors">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center flex-shrink-0">
                                  <CreditCard className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold">
                                    {t('payment.shopier.title')}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mb-3">
                                    {t('payment.shopier.description')}
                                  </p>
                                  <Button
                                    onClick={handleShopierOrder}
                                    rightIcon={
                                      <ExternalLink className="w-4 h-4" />
                                    }
                                  >
                                    {t('payment.shopier.button')}
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {/* WhatsApp Option */}
                            <div className="border rounded-xl p-4 hover:border-primary transition-colors">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center flex-shrink-0">
                                  <MessageCircle className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold">
                                    {t('payment.whatsapp.title')}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mb-3">
                                    {t('payment.whatsapp.description')}
                                  </p>
                                  <Button
                                    variant="outline"
                                    onClick={handleWhatsAppOrder}
                                    rightIcon={
                                      <MessageCircle className="w-4 h-4" />
                                    }
                                  >
                                    {t('payment.whatsapp.button')}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mt-4 flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            {t('securePayment')}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between">
                          <Button
                            variant="ghost"
                            onClick={() => setCurrentStep('info')}
                            leftIcon={<ArrowLeft className="w-4 h-4" />}
                          >
                            {t('actions.back')}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-1">
                  <div className="card sticky top-24">
                    <h2 className="font-heading text-lg font-semibold mb-4">
                      {t('summary.title')}
                    </h2>

                    {/* Items */}
                    <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex gap-3">
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            {item.product.images[0] ? (
                              <Image
                                src={item.product.images[0].src}
                                alt={item.product.images[0].alt}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-6 h-6 text-muted-foreground" />
                              </div>
                            )}
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium line-clamp-1">
                              {item.product.name[locale as 'tr' | 'en']}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatPrice(
                                item.product.price * item.quantity,
                                locale
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Summary */}
                    <div className="border-t pt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t('summary.subtotal')}
                        </span>
                        <span>{formatPrice(subtotal, locale)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t('summary.shipping')}
                        </span>
                        <span
                          className={
                            shipping === 0 ? 'text-green-600 font-medium' : ''
                          }
                        >
                          {shipping === 0
                            ? tCart('shippingFree')
                            : formatPrice(shipping, locale)}
                        </span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between text-base font-semibold">
                          <span>{t('summary.total')}</span>
                          <span className="text-primary">
                            {formatPrice(total, locale)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Section>
    </>
  );
}
