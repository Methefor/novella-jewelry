// src/components/seo/StructuredData.tsx
// NOVELLA - Gelişmiş Structured Data (Server Component)

import { Product } from '@/types/product';
import Script from 'next/script';

interface BaseStructuredDataProps {
  id?: string;
}

interface OrganizationStructuredDataProps extends BaseStructuredDataProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs?: string[];
  openingHours?: string[];
  priceRange?: string;
}

interface ProductStructuredDataProps extends BaseStructuredDataProps {
  product: Product;
  locale: 'tr' | 'en';
  availability?: 'InStock' | 'OutOfStock' | 'LimitedAvailability';
}

interface BreadcrumbStructuredDataProps extends BaseStructuredDataProps {
  items: Array<{
    name: string;
    url: string;
    position: number;
  }>;
}

interface WebSiteStructuredDataProps extends BaseStructuredDataProps {
  name?: string;
  url?: string;
  searchUrl?: string;
  potentialAction?: boolean;
}

interface LocalBusinessStructuredDataProps extends BaseStructuredDataProps {
  name?: string;
  description?: string;
  url?: string;
  telephone?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  openingHours?: string[];
  priceRange?: string;
}

interface CollectionPageStructuredDataProps extends BaseStructuredDataProps {
  name: string;
  description: string;
  url: string;
  numberOfItems: number;
  category: string;
}

// Organization Schema
export function OrganizationStructuredData({
  id = 'organization',
  name = 'NOVELLA',
  url = 'https://novella.com.tr',
  logo = 'https://novella.com.tr/images/logo.png',
  description = 'Tekirdağ merkezli butik takı markası. Her parça bir hikaye.',
  telephone = '+90 545 112 50 59',
  email = 'info@novella.com.tr',
  address = {
    streetAddress: 'Merkez',
    addressLocality: 'Tekirdağ',
    addressRegion: 'Tekirdağ',
    postalCode: '59000',
    addressCountry: 'TR',
  },
  sameAs = [
    'https://instagram.com/jewelry.novella',
    'https://tiktok.com/@novella.tr',
    'https://facebook.com/novella.tr',
  ],
  openingHours = ['Mo-Fr 09:00-18:00', 'Sa 09:00-17:00'],
  priceRange = '₺₺',
}: OrganizationStructuredDataProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${url}/#${id}`,
    name,
    url,
    logo: {
      '@type': 'ImageObject',
      url: logo,
    },
    description,
    telephone,
    email,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    sameAs,
    openingHours,
    priceRange,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone,
      email,
      availableLanguage: ['Turkish', 'English'],
      areaServed: 'TR',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'NOVELLA Takı Koleksiyonu',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            category: 'Kolye',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            category: 'Küpe',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            category: 'Bilezik',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            category: 'Yüzük',
          },
        },
      ],
    },
  };

  return (
    <Script
      id={`structured-data-${id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
    />
  );
}

// Product Schema
export function ProductStructuredData({
  id = 'product',
  product,
  locale,
  availability = 'InStock',
}: ProductStructuredDataProps) {
  const productUrl = `https://novella.com.tr/${locale}/products/${product.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${productUrl}/#product`,
    name: product.name[locale],
    description: product.description[locale],
    image: product.images.map((img) =>
      img.src.startsWith('http') ? img.src : `https://novella.com.tr${img.src}`
    ),
    sku: product.id,
    mpn: product.id,
    brand: {
      '@type': 'Brand',
      name: 'NOVELLA',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'NOVELLA',
      url: 'https://novella.com.tr',
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'TRY',
      price: product.price.toString(),
      priceValidThrough: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0], // 30 days from now
      availability: `https://schema.org/${availability}`,
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'NOVELLA',
        url: 'https://novella.com.tr',
      },
    },
    category: product.category,
    material: product.material,
    isAccessoryOrSparePartFor: 'Fashion',
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Kategori',
        value: product.category,
      },
      {
        '@type': 'PropertyValue',
        name: 'Malzeme',
        value: product.material,
      },
      {
        '@type': 'PropertyValue',
        name: 'Durum',
        value: product.status === 'in-stock' ? 'Stokta' : product.status,
      },
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Adult',
    },
  };

  // Add original price if available
  if (product.originalPrice && product.originalPrice > product.price) {
    jsonLd.offers.priceValidThrough = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split('T')[0]; // 7 days for discount
  }

  return (
    <Script
      id={`structured-data-${id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          jsonLd,
          (key, value) => {
            // Avoid circular references
            if (typeof value === 'object' && value !== null) {
              if (value._owner) return undefined; // React specific
            }
            return value;
          },
          2
        ),
      }}
    />
  );
}

// BreadcrumbList Schema
export function BreadcrumbStructuredData({
  id = 'breadcrumb',
  items,
}: BreadcrumbStructuredDataProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id={`structured-data-${id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
    />
  );
}

// WebSite Schema with SearchAction
export function WebSiteStructuredData({
  id = 'website',
  name = 'NOVELLA',
  url = 'https://novella.com.tr',
  searchUrl = 'https://novella.com.tr/search?q=',
  potentialAction = true,
}: WebSiteStructuredDataProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}/#website`,
    url,
    name,
    description: 'Her parça bir hikaye - Butik takı koleksiyonu',
    publisher: {
      '@type': 'Organization',
      name: 'NOVELLA',
      '@id': `${url}/#organization`,
    },
    potentialAction: potentialAction
      ? {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${searchUrl}{search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        }
      : undefined,
    inLanguage: ['tr-TR', 'en-US'],
    about: [
      {
        '@type': 'Thing',
        name: 'Takı',
      },
      {
        '@type': 'Thing',
        name: 'Moda',
      },
    ],
  };

  // Remove undefined fields
  if (!jsonLd.potentialAction) {
    delete jsonLd.potentialAction;
  }

  return (
    <Script
      id={`structured-data-${id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
    />
  );
}

// LocalBusiness Schema (Store)
export function LocalBusinessStructuredData({
  id = 'store',
  name = 'NOVELLA',
  description = 'Butik takı mağazası - Tekirdağ',
  url = 'https://novella.com.tr',
  telephone = '+90 545 112 50 59',
  address = {
    streetAddress: 'Merkez Mahallesi',
    addressLocality: 'Tekirdağ',
    addressRegion: 'Tekirdağ',
    postalCode: '59000',
    addressCountry: 'TR',
  },
  openingHours = ['Mo-Fr 09:00-18:00', 'Sa 09:00-17:00'],
  priceRange = '₺₺',
}: LocalBusinessStructuredDataProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': `${url}/#store`,
    name,
    description,
    url,
    telephone,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    openingHours,
    priceRange,
    acceptsReservations: false,
    hasMap: 'https://maps.google.com/?q=Tekirdağ,Türkiye',
    areaServed: {
      '@type': 'Country',
      name: 'Turkey',
    },
    serviceArea: {
      '@type': 'Country',
      name: 'Turkey',
    },
  };

  return (
    <Script
      id={`structured-data-${id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
    />
  );
}

// Collection Page Schema
export function CollectionPageStructuredData({
  id = 'collection',
  name,
  description,
  url,
  numberOfItems,
  category,
}: CollectionPageStructuredDataProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}/#collection`,
    name,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'NOVELLA',
      url: 'https://novella.com.tr',
    },
    about: {
      '@type': 'Thing',
      name: category,
    },
    numberOfItems,
    inLanguage: ['tr-TR', 'en-US'],
  };

  return (
    <Script
      id={`structured-data-${id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
    />
  );
}

export default {
  OrganizationStructuredData,
  ProductStructuredData,
  BreadcrumbStructuredData,
  WebSiteStructuredData,
  LocalBusinessStructuredData,
  CollectionPageStructuredData,
};
