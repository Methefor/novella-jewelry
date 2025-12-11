// src/lib/constants.ts
// NOVELLA - Site Sabitleri

export const SITE_CONFIG = {
  name: 'NOVELLA',
  tagline: 'Her Parça Bir Hikaye',
  description: 'Tekirdağ merkezli butik takı markası',
  url: 'https://novella.com.tr',
  email: 'info@novella.com.tr',
  phone: '+90 545 112 50 59',
  address: 'Tekirdağ, Türkiye',
} as const;

export const NAVIGATION_LINKS = [
  { key: 'home', href: '/' },
  { key: 'collections', href: '/collections', hasDropdown: true },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const;

// Takı kategorileri
export const JEWELRY_LINKS = [
  { key: 'necklaces', href: '/collections/necklaces', icon: '💎' },
  { key: 'bracelets', href: '/collections/bracelets', icon: '✨' },
  { key: 'earrings', href: '/collections/earrings', icon: '💫' },
  { key: 'rings', href: '/collections/rings', icon: '💍' },
] as const;

// Özel koleksiyonlar
export const SPECIAL_LINKS = [
  { key: 'steel-collection', href: '/collections/steel-collection', icon: '⚙️', highlight: true },
] as const;

// Aksesuar kategorileri
export const ACCESSORY_LINKS = [
  { key: 'bags', href: '/collections/bags', icon: '👜' },
  { key: 'hair-accessories', href: '/collections/hair-accessories', icon: '🎀' },
] as const;

// Tüm kategori linkleri (eski CATEGORY_LINKS yerine)
export const CATEGORY_LINKS = [
  ...JEWELRY_LINKS,
  ...SPECIAL_LINKS,
  ...ACCESSORY_LINKS,
] as const;

// Header dropdown için gruplandırılmış kategoriler
export const DROPDOWN_GROUPS = {
  jewelry: {
    key: 'jewelry',
    label: { tr: 'Takılar', en: 'Jewelry' },
    links: JEWELRY_LINKS,
  },
  special: {
    key: 'special',
    label: { tr: 'Özel Koleksiyon', en: 'Special Collection' },
    links: SPECIAL_LINKS,
  },
  accessories: {
    key: 'accessories',
    label: { tr: 'Aksesuarlar', en: 'Accessories' },
    links: ACCESSORY_LINKS,
  },
} as const;

export const SOCIAL_LINKS = {
  instagram: {
    url: 'https://instagram.com/jewelry.novella',
    handle: '@jewelry.novella',
  },
  tiktok: {
    url: 'https://tiktok.com/@novella.tr',
    handle: '@novella.tr',
  },
  shopier: {
    url: 'https://novella.shopier.com',
    handle: 'novella.shopier.com',
  },
  whatsapp: {
    url: 'https://wa.me/905451125059',
    handle: '+90 545 112 50 59',
  },
} as const;

export const FOOTER_LINKS = {
  quickLinks: [
    { key: 'about', href: '/about' },
    { key: 'contact', href: '/contact' },
    { key: 'faq', href: '/faq' },
    { key: 'shipping', href: '/shipping' },
  ],
  legal: [
    { key: 'privacy', href: '/privacy' },
    { key: 'terms', href: '/terms' },
    { key: 'returns', href: '/returns' },
  ],
} as const;
