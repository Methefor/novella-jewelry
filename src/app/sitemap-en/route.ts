// src/app/sitemap-en/route.ts
// NOVELLA - English Sitemap

import { products } from '@/data/products';
import { CATEGORIES } from '@/types/product';

const BASE_URL = 'https://novella.com.tr';

export async function GET() {
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/faq', priority: '0.7', changefreq: 'monthly' },
    { url: '/shipping', priority: '0.7', changefreq: 'monthly' },
    { url: '/collections', priority: '0.9', changefreq: 'weekly' },
  ];

  // Category pages
  const categoryPages = CATEGORIES.map((cat) => ({
    url: `/collections/${cat.slug}`,
    priority: '0.8',
    changefreq: 'weekly',
  }));

  // Product pages
  const productPages = products.map((product) => ({
    url: `/products/${product.slug}`,
    priority: '0.7',
    changefreq: 'weekly',
  }));

  const allPages = [...staticPages, ...categoryPages, ...productPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allPages
  .map(
    (page) => `  <url>
    <loc>${BASE_URL}/en${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="tr" href="${BASE_URL}/tr${page.url}" />
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/en${page.url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/tr${page.url}" />
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
