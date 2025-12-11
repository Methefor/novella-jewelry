// src/components/seo/DynamicMeta.tsx
// NOVELLA - Dinamik Meta Tags Helper (Server Component)

import { Metadata } from 'next';

export interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  locale?: 'tr' | 'en';
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  canonicalUrl?: string;
  alternateLanguages?: {
    [key: string]: string;
  };
}

export const SITE_CONFIG = {
  name: 'NOVELLA',
  tagline: {
    tr: 'Her Parça Bir Hikaye',
    en: 'Every Piece Tells a Story',
  },
  baseUrl: 'https://novella.com.tr',
  defaultImage: '/images/og-image.jpg',
  twitter: '@novella_tr',
  instagram: '@jewelry.novella',
  themeColor: '#D4A574',
};

/**
 * Truncate description to SEO-friendly length (150-160 chars)
 */
function truncateDescription(text: string, maxLength: number = 155): string {
  if (text.length <= maxLength) return text;
  const truncated = text.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  return truncated.substring(0, lastSpace) + '...';
}

// Default keywords for jewelry e-commerce
const getDefaultKeywords = (locale: 'tr' | 'en') =>
  locale === 'tr'
    ? [
        'takı',
        'kolye',
        'bilezik',
        'küpe',
        'yüzük',
        'çelik takı',
        'butik takı',
        'online takı',
        'altın kaplama',
        'gümüş kaplama',
        'paslanmaz çelik',
        'hediye',
        'aksesuar',
        'NOVELLA',
        'Türkiye',
        'her parça bir hikaye',
      ]
    : [
        'jewelry',
        'necklace',
        'bracelet',
        'earrings',
        'rings',
        'steel jewelry',
        'boutique jewelry',
        'online jewelry',
        'gold plated',
        'silver plated',
        'stainless steel',
        'gift',
        'accessories',
        'NOVELLA',
        'Turkey',
        'every piece tells a story',
      ];

/**
 * Generate dynamic metadata for Next.js App Router
 * Use this function in page.tsx files with generateMetadata
 */
export function generateDynamicMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  locale = 'tr',
  publishedTime,
  modifiedTime,
  noIndex = false,
  noFollow = false,
  canonicalUrl,
  alternateLanguages,
}: MetaTagsProps): Metadata {
  // Generate complete title: "NOVELLA - {title} | Her Parça Bir Hikaye"
  const tagline = SITE_CONFIG.tagline[locale];
  const fullTitle = title.includes(SITE_CONFIG.name)
    ? title
    : `${SITE_CONFIG.name} - ${title} | ${tagline}`;

  // Truncate description to SEO-friendly length
  const seoDescription = truncateDescription(description);

  // Complete URL
  const completeUrl = url
    ? url.startsWith('http')
      ? url
      : `${SITE_CONFIG.baseUrl}${url}`
    : SITE_CONFIG.baseUrl;

  const canonicalLink = canonicalUrl || completeUrl;

  // Merge keywords
  const allKeywords = Array.from(
    new Set([...getDefaultKeywords(locale), ...keywords])
  );

  // Complete image URL
  const completeImage = image
    ? image.startsWith('http')
      ? image
      : `${SITE_CONFIG.baseUrl}${image}`
    : `${SITE_CONFIG.baseUrl}${SITE_CONFIG.defaultImage}`;

  // Build robots directive
  const robotsDirective = `${noIndex ? 'noindex' : 'index'}, ${
    noFollow ? 'nofollow' : 'follow'
  }`;

  // Build alternates
  const alternates: Metadata['alternates'] = {
    canonical: canonicalLink,
    languages: alternateLanguages || {
      'tr-TR': `${SITE_CONFIG.baseUrl}/tr`,
      'en-US': `${SITE_CONFIG.baseUrl}/en`,
    },
  };

  // Build OpenGraph
  const openGraph: Metadata['openGraph'] = {
    type: type === 'product' ? 'website' : type,
    locale: locale === 'tr' ? 'tr_TR' : 'en_US',
    url: completeUrl,
    title: fullTitle,
    description: seoDescription,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: completeImage,
        width: 1200,
        height: 630,
        alt: fullTitle,
      },
    ],
  };

  // Add article specific fields
  if (type === 'article') {
    if (publishedTime) {
      (openGraph as any).publishedTime = publishedTime;
    }
    if (modifiedTime) {
      (openGraph as any).modifiedTime = modifiedTime;
    }
  }

  // Build Twitter Card
  const twitter: Metadata['twitter'] = {
    card: 'summary_large_image',
    title: fullTitle,
    description: seoDescription,
    images: [completeImage],
    creator: SITE_CONFIG.twitter,
    site: SITE_CONFIG.twitter,
  };

  return {
    title: fullTitle,
    description: seoDescription,
    keywords: allKeywords,
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    robots: robotsDirective,
    alternates,
    openGraph,
    twitter,
    other: {
      'instagram:creator': SITE_CONFIG.instagram,
    },
    metadataBase: new URL(SITE_CONFIG.baseUrl),
  };
}

/**
 * Generate product-specific metadata
 */
export function generateProductMeta({
  name,
  description,
  price,
  originalPrice,
  image,
  slug,
  category,
  sku,
  locale = 'tr',
  inStock = true,
}: {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image?: string;
  slug: string;
  category: string;
  sku?: string;
  locale?: 'tr' | 'en';
  inStock?: boolean;
}): Metadata {
  const productUrl = `/${locale}/products/${slug}`;

  const baseMetadata = generateDynamicMetadata({
    title: name,
    description,
    image,
    url: productUrl,
    type: 'product',
    locale,
    keywords: [name, category, locale === 'tr' ? 'satın al' : 'buy'],
  });

  const otherMeta: Record<string, string> = {
    'product:price:amount': price.toString(),
    'product:price:currency': 'TRY',
    'product:availability': inStock ? 'in stock' : 'out of stock',
    'product:category': category,
  };

  if (originalPrice) {
    otherMeta['product:original_price:amount'] = originalPrice.toString();
  }
  if (sku) {
    otherMeta['product:retailer_item_id'] = sku;
  }

  return {
    ...baseMetadata,
    other: {
      ...otherMeta,
    },
  };
}

/**
 * Generate category/collection metadata
 */
export function generateCollectionMeta({
  name,
  description,
  slug,
  image,
  locale = 'tr',
  itemCount,
}: {
  name: string;
  description: string;
  slug: string;
  image?: string;
  locale?: 'tr' | 'en';
  itemCount?: number;
}): Metadata {
  const collectionUrl = `/${locale}/collections/${slug}`;

  const baseMetadata = generateDynamicMetadata({
    title: name,
    description,
    image,
    url: collectionUrl,
    locale,
    keywords: [name, slug, locale === 'tr' ? 'koleksiyon' : 'collection'],
  });

  const otherMeta: Record<string, string> = {};

  if (itemCount) {
    otherMeta['collection:item_count'] = itemCount.toString();
  }

  return {
    ...baseMetadata,
    other: otherMeta,
  };
}

// Re-export for backward compatibility
export { generateDynamicMetadata as DynamicMeta };
export default generateDynamicMetadata;
