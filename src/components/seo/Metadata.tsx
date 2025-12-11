// src/components/seo/Metadata.tsx
// NOVELLA - SEO Metadata Helper

import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  locale?: 'tr' | 'en';
  noIndex?: boolean;
}

const SITE_CONFIG = {
  name: 'NOVELLA',
  tagline: {
    tr: 'Her Parça Bir Hikaye',
    en: 'Every Piece Tells a Story',
  },
  description: {
    tr: "Tekirdağ'dan sizin için özenle seçilmiş, trend ve uygun fiyatlı butik takılar. Kolye, bilezik, küpe ve yüzük koleksiyonumuzu keşfedin.",
    en: 'Carefully selected, trendy and affordable boutique jewelry from Tekirdağ. Discover our collection of necklaces, bracelets, earrings and rings.',
  },
  url: 'https://novella.com.tr',
  defaultImage: '/images/og-image.jpg',
  twitter: '@novella_tr',
  instagram: '@jewelry.novella',
};

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  locale = 'tr',
  noIndex = false,
}: SEOProps): Metadata {
  const siteTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline[locale]}`;

  const siteDescription = description || SITE_CONFIG.description[locale];
  const siteImage = image || SITE_CONFIG.defaultImage;
  const siteUrl = url || SITE_CONFIG.url;

  const defaultKeywords = locale === 'tr'
    ? ['takı', 'kolye', 'bilezik', 'küpe', 'yüzük', 'butik takı', 'online takı', 'altın kaplama', 'gümüş kaplama', 'paslanmaz çelik', 'hediye', 'aksesuar', 'NOVELLA']
    : ['jewelry', 'necklace', 'bracelet', 'earrings', 'rings', 'boutique jewelry', 'online jewelry', 'gold plated', 'silver plated', 'stainless steel', 'gift', 'accessories', 'NOVELLA'];

  const allKeywords = Array.from(new Set([...defaultKeywords, ...keywords]));

  return {
    title: siteTitle,
    description: siteDescription,
    keywords: allKeywords,
    authors: [{ name: 'NOVELLA' }],
    creator: 'NOVELLA',
    publisher: 'NOVELLA',
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: siteUrl,
      languages: {
        'tr-TR': `${SITE_CONFIG.url}/tr`,
        'en-US': `${SITE_CONFIG.url}/en`,
      },
    },
    openGraph: {
      type: type,
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      url: siteUrl,
      title: siteTitle,
      description: siteDescription,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: siteImage,
          width: 1200,
          height: 630,
          alt: siteTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      images: [siteImage],
      creator: SITE_CONFIG.twitter,
    },
    other: {
      'instagram:creator': SITE_CONFIG.instagram,
    },
  };
}

// Ürün için özel metadata
export function generateProductMetadata({
  name,
  description,
  price,
  image,
  slug,
  category,
  locale = 'tr',
  inStock = true,
}: {
  name: string;
  description: string;
  price: number;
  image?: string;
  slug: string;
  category: string;
  locale?: 'tr' | 'en';
  inStock?: boolean;
}): Metadata {
  const productUrl = `${SITE_CONFIG.url}/${locale}/products/${slug}`;
  
  return {
    ...generateSEOMetadata({
      title: name,
      description: description,
      image: image,
      url: productUrl,
      type: 'website',
      locale: locale,
      keywords: [name, category, locale === 'tr' ? 'satın al' : 'buy'],
    }),
    other: {
      'product:price:amount': price.toString(),
      'product:price:currency': 'TRY',
      'product:availability': inStock ? 'in stock' : 'out of stock',
      'product:category': category,
    },
  };
}

// Kategori için özel metadata
export function generateCategoryMetadata({
  name,
  description,
  slug,
  locale = 'tr',
}: {
  name: string;
  description: string;
  slug: string;
  locale?: 'tr' | 'en';
}): Metadata {
  const categoryUrl = `${SITE_CONFIG.url}/${locale}/collections/${slug}`;
  
  return generateSEOMetadata({
    title: name,
    description: description,
    url: categoryUrl,
    locale: locale,
    keywords: [name, slug],
  });
}

export default generateSEOMetadata;
