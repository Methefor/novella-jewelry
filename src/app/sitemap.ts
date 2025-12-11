// src/app/sitemap.ts
// NOVELLA - Dinamik Sitemap (Sitemap Index)

import { products } from '@/data/products';
import { CATEGORIES } from '@/types/product';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://novella.com.tr';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['tr', 'en'];
  const currentDate = new Date().toISOString();

  // Statik sayfalar
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/faq',
    '/shipping',
    '/collections',
  ];

  // Kategori sayfaları
  const categoryPages = CATEGORIES.map((cat) => `/collections/${cat.slug}`);

  // Ürün sayfaları
  const productPages = products.map((product) => `/products/${product.slug}`);

  // Tüm URL'leri oluştur
  const urls: MetadataRoute.Sitemap = [];

  // Her locale için sayfalar
  locales.forEach((locale) => {
    // Ana sayfa
    urls.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          tr: `${BASE_URL}/tr`,
          en: `${BASE_URL}/en`,
        },
      },
    });

    // Statik sayfalar
    staticPages.forEach((page) => {
      if (page === '') return; // Ana sayfa zaten eklendi
      urls.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: {
            tr: `${BASE_URL}/tr${page}`,
            en: `${BASE_URL}/en${page}`,
          },
        },
      });
    });

    // Kategori sayfaları
    categoryPages.forEach((page) => {
      urls.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: {
          languages: {
            tr: `${BASE_URL}/tr${page}`,
            en: `${BASE_URL}/en${page}`,
          },
        },
      });
    });

    // Ürün sayfaları
    productPages.forEach((page) => {
      urls.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.6,
        alternates: {
          languages: {
            tr: `${BASE_URL}/tr${page}`,
            en: `${BASE_URL}/en${page}`,
          },
        },
      });
    });
  });

  return urls;
}
