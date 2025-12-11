'use client';

// src/app/[locale]/shipping/page.tsx
// NOVELLA - Kargo Bilgileri Sayfası

import { useLocale, useTranslations } from '@/lib/i18n-client';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Gift,
  MapPin,
  Package,
  RotateCcw,
  Shield,
  Truck,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { cn } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ShippingPage() {
  const t = useTranslations('shipping');
  const locale = useLocale();

  const breadcrumbItems = [{ label: t('title') }];

  const deliveryTimes = [
    {
      key: 'metro',
      icon: Building2,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      key: 'other',
      icon: MapPin,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      key: 'express',
      icon: Zap,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
  ];

  const trackingSteps = [
    { key: 'step1', icon: CheckCircle2, active: true },
    { key: 'step2', icon: Package, active: true },
    { key: 'step3', icon: Truck, active: true },
    { key: 'step4', icon: Gift, active: false },
  ];

  const returnPolicy = [
    {
      key: 'period',
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      key: 'condition',
      icon: CheckCircle2,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      key: 'refund',
      icon: RotateCcw,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  const packagingFeatures = [
    { key: 'box', icon: Package },
    { key: 'wrap', icon: Gift },
    { key: 'card', icon: CheckCircle2 },
    { key: 'protection', icon: Shield },
  ];

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-muted/50 to-background pt-8 pb-16">
        <Container>
          <Breadcrumb items={breadcrumbItems} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
              <Truck className="w-8 h-8" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-muted-foreground">{t('description')}</p>
          </motion.div>
        </Container>
      </Section>

      {/* Delivery Times Section */}
      <Section className="py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {t('delivery.title')}
            </h2>
            <p className="text-muted-foreground">{t('delivery.description')}</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {deliveryTimes.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.key}
                  variants={fadeInUp}
                  className="card text-center group hover:shadow-lg transition-shadow"
                >
                  <div
                    className={cn(
                      'w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform',
                      item.bgColor,
                      item.color
                    )}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2">
                    {t(`delivery.times.${item.key}.title`)}
                  </h3>
                  <p className="text-2xl font-bold text-primary mb-2">
                    {t(`delivery.times.${item.key}.time`)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t(`delivery.times.${item.key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </Section>

      {/* Shipping Pricing Section */}
      <Section className="py-16 bg-muted/30">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {t('pricing.title')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Free Shipping */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card border-2 border-primary relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                {t('pricing.freeShipping.badge')}
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {t('pricing.freeShipping.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('pricing.freeShipping.description')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Standard Shipping */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted text-muted-foreground flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {t('pricing.standardShipping.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('pricing.standardShipping.description')}
                  </p>
                  <p className="text-primary font-bold mt-1">
                    {t('pricing.standardShipping.price')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Shipping Partners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <h3 className="font-semibold mb-2">{t('partners.title')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('partners.description')}
            </p>
            <p className="text-muted-foreground">{t('partners.list')}</p>
          </motion.div>
        </Container>
      </Section>

      {/* Order Tracking Section */}
      <Section className="py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {t('tracking.title')}
            </h2>
            <p className="text-muted-foreground">{t('tracking.description')}</p>
          </motion.div>

          {/* Tracking Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-8 left-0 right-0 h-1 bg-muted hidden md:block">
                <div className="h-full w-3/4 bg-primary rounded-full" />
              </div>

              {/* Steps */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {trackingSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center relative"
                    >
                      <div
                        className={cn(
                          'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10',
                          step.active
                            ? 'bg-primary text-white'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <h4 className="font-semibold mb-1">
                        {t(`tracking.steps.${step.key}.title`)}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {t(`tracking.steps.${step.key}.description`)}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              {t('tracking.note')}
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Returns Section */}
      <Section className="py-16 bg-muted/30">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {t('returns.title')}
            </h2>
            <p className="text-muted-foreground">{t('returns.description')}</p>
          </motion.div>

          {/* Return Policy */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {returnPolicy.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.key}
                  variants={fadeInUp}
                  className="card text-center"
                >
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4',
                      item.bgColor,
                      item.color
                    )}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2">
                    {t(`returns.policy.${item.key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`returns.policy.${item.key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Return Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h3 className="font-heading text-xl font-semibold text-center mb-6">
              {t('returns.process.title')}
            </h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className="flex items-start gap-4 p-4 rounded-lg bg-card"
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-semibold">
                    {step}
                  </div>
                  <p className="text-muted-foreground pt-1">
                    {t(`returns.process.step${step}`)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Packaging Section */}
      <Section className="py-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Packaging Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                {t('packaging.title')}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t('packaging.description')}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {packagingFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.key}
                      className="flex items-center gap-3 p-4 rounded-lg bg-muted/50"
                    >
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">
                        {t(`packaging.features.${feature.key}`)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Packaging Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Gift className="w-16 h-16 mx-auto mb-4 text-primary" />
                    <p className="text-muted-foreground">
                      {locale === 'tr'
                        ? 'Paketleme Görseli'
                        : 'Packaging Image'}
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-muted-foreground mb-8">{t('cta.description')}</p>
            <Link href={`/${locale}/collections`}>
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                {t('cta.button')}
              </Button>
            </Link>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
