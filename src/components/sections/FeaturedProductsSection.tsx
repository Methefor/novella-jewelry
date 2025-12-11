'use client';

// src/components/sections/FeaturedProductsSection.tsx
// NOVELLA - Öne Çıkan Ürünler Section

import { useLocale, useTranslations } from '@/lib/i18n-client';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { ProductCarousel } from '@/components/product/ProductCarousel';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import {
  getBestsellerProducts,
  getFeaturedProducts,
  getNewProducts,
} from '@/data/products';

type ProductType = 'featured' | 'new' | 'bestseller';

interface FeaturedProductsSectionProps {
  type?: ProductType;
  limit?: number;
  showViewAll?: boolean;
}

export function FeaturedProductsSection({
  type = 'featured',
  limit = 8,
  showViewAll = true,
}: FeaturedProductsSectionProps) {
  const t = useTranslations('home');
  const locale = useLocale();

  // Ürün tipine göre ürünleri al
  const getProducts = () => {
    switch (type) {
      case 'new':
        return getNewProducts().slice(0, limit);
      case 'bestseller':
        return getBestsellerProducts().slice(0, limit);
      case 'featured':
      default:
        return getFeaturedProducts().slice(0, limit);
    }
  };

  const products = getProducts();

  // Section içerik bilgileri
  const sectionContent = {
    featured: {
      badge: locale === 'tr' ? 'Öne Çıkanlar' : 'Featured',
      title: locale === 'tr' ? 'Sizin İçin Seçtiklerimiz' : 'Picked for You',
      subtitle:
        locale === 'tr'
          ? 'En beğenilen ve trend ürünlerimizi keşfedin'
          : 'Discover our most loved and trending products',
    },
    new: {
      badge: locale === 'tr' ? 'Yeni Gelenler' : 'New Arrivals',
      title: locale === 'tr' ? 'En Yeni Ürünler' : 'Latest Products',
      subtitle:
        locale === 'tr'
          ? 'Koleksiyonumuza yeni eklenen parçalar'
          : 'Freshly added pieces to our collection',
    },
    bestseller: {
      badge: locale === 'tr' ? 'Çok Satanlar' : 'Best Sellers',
      title: locale === 'tr' ? 'En Çok Tercih Edilenler' : 'Most Popular Picks',
      subtitle:
        locale === 'tr'
          ? 'Müşterilerimizin en sevdiği ürünler'
          : "Our customers' favorite products",
    },
  };

  const content = sectionContent[type];

  if (products.length === 0) return null;

  return (
    <Section className="py-16 md:py-24">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {content.badge}
            </span>
          </div>

          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            {content.title}
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Product Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProductCarousel
            products={products}
            autoPlay={false}
            showArrows={true}
            showDots={true}
            itemsPerView={{ mobile: 1, tablet: 2, desktop: 4 }}
          />
        </motion.div>

        {/* View All Button */}
        {showViewAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-10"
          >
            <Link href={`/${locale}/collections`}>
              <Button
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {locale === 'tr' ? 'Tüm Ürünleri Gör' : 'View All Products'}
              </Button>
            </Link>
          </motion.div>
        )}
      </Container>
    </Section>
  );
}

export default FeaturedProductsSection;
