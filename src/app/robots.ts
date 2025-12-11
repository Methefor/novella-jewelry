// src/app/robots.ts
// NOVELLA - SEO Robot Kuralları

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://novella.com.tr';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/private/',
          '/_next/',
          '/static/',
          '/checkout/',
          '/cart/',
          '/account/',
          '/profile/',
          '/orders/',
          '/search?*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/private/',
          '/checkout/',
          '/cart/',
          '/account/',
          '/profile/',
          '/orders/',
        ],
      },
      {
        userAgent: 'bingbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/private/',
          '/checkout/',
          '/cart/',
          '/account/',
          '/profile/',
          '/orders/',
        ],
      },
      {
        userAgent: 'YandexBot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/private/',
          '/checkout/',
          '/cart/',
          '/account/',
          '/profile/',
          '/orders/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
