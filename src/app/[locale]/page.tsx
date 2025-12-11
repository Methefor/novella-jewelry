import {
  CategoriesSection,
  FeaturesSection,
  HeroSection,
  NewsletterSection,
  AboutSection,
  ContactSection,
  AutoScrollCarousel,
} from '@/components/sections';
import { ProductShowcase3D } from '@/components/sections/ProductShowcase3DAutoScroll';

interface PageProps {
  params: { locale: string };
}

export default function HomePage({ params: { locale } }: PageProps) {
  return (
    <main className="relative">
      {/* Hero Section */}
      <section id="home" className="min-h-screen">
        <HeroSection locale={locale} />
      </section>

      {/* Öne Çıkan Ürünler - Auto Scroll */}
      <section id="featured" className="py-20">
        <AutoScrollCarousel title="Yeni Koleksiyonumuzu Keşfedin" locale={locale} />
      </section>

      {/* 3D Product Showcase - Otomatik Kayan */}
      <section id="showcase" className="py-20 bg-gradient-to-b from-background to-muted/20">
        <ProductShowcase3D locale={locale} />
      </section>

      {/* Kategoriler */}
      <section id="collections" className="py-20">
        <CategoriesSection locale={locale} />
      </section>

      {/* Yeni Gelenler - Auto Scroll */}
      <section id="new-arrivals" className="py-20 bg-muted/30">
        <AutoScrollCarousel title="Yeni Gelenler" locale={locale} />
      </section>

      {/* Özellikler */}
      <section id="features" className="py-20">
        <FeaturesSection />
      </section>

      {/* Çok Satanlar - Auto Scroll */}
      <section id="bestsellers" className="py-20 bg-muted/30">
        <AutoScrollCarousel title="Çok Satanlar" locale={locale} />
      </section>

      {/* Hakkımızda */}
      <section id="about" className="py-20">
        <AboutSection locale={locale} />
      </section>

      {/* İletişim */}
      <section id="contact" className="py-20 bg-muted/30">
        <ContactSection locale={locale} />
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-20">
        <NewsletterSection />
      </section>
    </main>
  );
}
