// src/data/products.ts
// NOVELLA - Mock Ürün Verileri

import type {
  Product,
  ProductCategory,
  ProductMaterial,
} from '@/types/product';

export const products: Product[] = [
  // ==================== KOLYELER ====================
  {
    id: 'necklace-001',
    slug: 'altin-kaplama-zincir-kolye',
    name: {
      tr: 'Altın Kaplama Zincir Kolye',
      en: 'Gold Plated Chain Necklace',
    },
    description: {
      tr: 'Zarif altın kaplama zincir kolye. Günlük kullanım için ideal, her kombine uyum sağlar.',
      en: 'Elegant gold plated chain necklace. Perfect for daily use, matches every outfit.',
    },
    price: 149,
    category: 'necklaces',
    material: 'gold-plated',
    images: [
      {
        src: '/images/products/necklace-001-1.jpg',
        alt: 'Altın Kaplama Zincir Kolye',
      },
      {
        src: '/images/products/necklace-001-2.jpg',
        alt: 'Altın Kaplama Zincir Kolye Detay',
      },
    ],
    status: 'in-stock',
    isNew: true,
    isFeatured: true,
    tags: ['zincir', 'günlük', 'minimal'],
    createdAt: '2025-01-15',
  },
  {
    id: 'necklace-002',
    slug: 'inci-detayli-kolye',
    name: {
      tr: 'İnci Detaylı Kolye',
      en: 'Pearl Detail Necklace',
    },
    description: {
      tr: 'Şık inci detaylı kolye. Özel günler için mükemmel bir seçim.',
      en: 'Stylish pearl detail necklace. Perfect choice for special occasions.',
    },
    price: 199,
    originalPrice: 249,
    category: 'necklaces',
    material: 'gold-plated',
    images: [
      { src: '/images/products/necklace-002-1.jpg', alt: 'İnci Detaylı Kolye' },
      {
        src: '/images/products/necklace-002-2.jpg',
        alt: 'İnci Detaylı Kolye Detay',
      },
    ],
    status: 'in-stock',
    isBestseller: true,
    tags: ['inci', 'özel gün', 'şık'],
    createdAt: '2025-01-10',
  },
  {
    id: 'necklace-003',
    slug: 'katmanli-ay-kolye',
    name: {
      tr: 'Katmanlı Ay Kolye',
      en: 'Layered Moon Necklace',
    },
    description: {
      tr: 'Trend katmanlı tasarım, ay ve yıldız detayları. Bohem tarzı sevenler için.',
      en: 'Trendy layered design with moon and star details. For bohemian style lovers.',
    },
    price: 179,
    category: 'necklaces',
    material: 'silver-plated',
    images: [
      { src: '/images/products/necklace-003-1.jpg', alt: 'Katmanlı Ay Kolye' },
      {
        src: '/images/products/necklace-003-2.jpg',
        alt: 'Katmanlı Ay Kolye Detay',
      },
    ],
    status: 'in-stock',
    isNew: true,
    tags: ['katmanlı', 'ay', 'bohem'],
    createdAt: '2025-01-20',
  },
  {
    id: 'necklace-004',
    slug: 'kalp-pendant-kolye',
    name: {
      tr: 'Kalp Pendant Kolye',
      en: 'Heart Pendant Necklace',
    },
    description: {
      tr: 'Romantik kalp pendant kolye. Sevdiklerinize hediye için ideal.',
      en: 'Romantic heart pendant necklace. Ideal gift for your loved ones.',
    },
    price: 129,
    category: 'necklaces',
    material: 'gold-plated',
    images: [
      { src: '/images/products/necklace-004-1.jpg', alt: 'Kalp Pendant Kolye' },
    ],
    status: 'low-stock',
    tags: ['kalp', 'hediye', 'romantik'],
    createdAt: '2025-01-05',
  },
  {
    id: 'necklace-005',
    slug: 'minimalist-bar-kolye',
    name: {
      tr: 'Minimalist Bar Kolye',
      en: 'Minimalist Bar Necklace',
    },
    description: {
      tr: 'Sade ve şık bar kolye. Minimalist tarz sevenler için tasarlandı.',
      en: 'Simple and elegant bar necklace. Designed for minimalist style lovers.',
    },
    price: 99,
    category: 'necklaces',
    material: 'stainless-steel',
    images: [
      {
        src: '/images/products/necklace-005-1.jpg',
        alt: 'Minimalist Bar Kolye',
      },
    ],
    status: 'in-stock',
    isSteelCollection: true,
    tags: ['minimal', 'bar', 'günlük'],
    createdAt: '2025-01-12',
  },

  // ==================== BİLEZİKLER ====================
  {
    id: 'bracelet-001',
    slug: 'altin-zincir-bilezik',
    name: {
      tr: 'Altın Zincir Bilezik',
      en: 'Gold Chain Bracelet',
    },
    description: {
      tr: 'Klasik altın kaplama zincir bilezik. Zamansız bir parça.',
      en: 'Classic gold plated chain bracelet. A timeless piece.',
    },
    price: 119,
    category: 'bracelets',
    material: 'gold-plated',
    images: [
      {
        src: '/images/products/bracelet-001-1.jpg',
        alt: 'Altın Zincir Bilezik',
      },
      {
        src: '/images/products/bracelet-001-2.jpg',
        alt: 'Altın Zincir Bilezik Detay',
      },
    ],
    status: 'in-stock',
    isFeatured: true,
    isBestseller: true,
    tags: ['zincir', 'klasik', 'günlük'],
    createdAt: '2025-01-18',
  },
  {
    id: 'bracelet-002',
    slug: 'charm-bilezik-seti',
    name: {
      tr: 'Charm Bilezik Seti',
      en: 'Charm Bracelet Set',
    },
    description: {
      tr: '3 parça charm bilezik seti. Tek tek veya birlikte kullanılabilir.',
      en: '3 piece charm bracelet set. Can be worn individually or together.',
    },
    price: 189,
    originalPrice: 229,
    category: 'bracelets',
    material: 'mixed-metals',
    images: [
      { src: '/images/products/bracelet-002-1.jpg', alt: 'Charm Bilezik Seti' },
    ],
    status: 'in-stock',
    isNew: true,
    tags: ['charm', 'set', 'hediye'],
    createdAt: '2025-01-22',
  },
  {
    id: 'bracelet-003',
    slug: 'ince-kelepce-bilezik',
    name: {
      tr: 'İnce Kelepçe Bilezik',
      en: 'Thin Cuff Bracelet',
    },
    description: {
      tr: 'Zarif ince kelepçe bilezik. Ayarlanabilir boyut.',
      en: 'Elegant thin cuff bracelet. Adjustable size.',
    },
    price: 139,
    category: 'bracelets',
    material: 'gold-plated',
    images: [
      {
        src: '/images/products/bracelet-003-1.jpg',
        alt: 'İnce Kelepçe Bilezik',
      },
    ],
    status: 'in-stock',
    tags: ['kelepçe', 'ayarlanabilir', 'zarif'],
    createdAt: '2025-01-08',
  },
  {
    id: 'bracelet-004',
    slug: 'tasli-tennis-bilezik',
    name: {
      tr: 'Taşlı Tennis Bilezik',
      en: 'Crystal Tennis Bracelet',
    },
    description: {
      tr: 'Parlak taşlı tennis bilezik. Özel geceler için şıklık.',
      en: 'Sparkling crystal tennis bracelet. Elegance for special nights.',
    },
    price: 249,
    category: 'bracelets',
    material: 'silver-plated',
    images: [
      {
        src: '/images/products/bracelet-004-1.jpg',
        alt: 'Taşlı Tennis Bilezik',
      },
    ],
    status: 'low-stock',
    isFeatured: true,
    tags: ['taşlı', 'tennis', 'özel gün'],
    createdAt: '2025-01-14',
  },
  {
    id: 'bracelet-005',
    slug: 'deri-kordonlu-bilezik',
    name: {
      tr: 'Deri Kordonlu Bilezik',
      en: 'Leather Cord Bracelet',
    },
    description: {
      tr: 'Doğal deri kordon ve metal detaylı bilezik. Unisex tasarım.',
      en: 'Natural leather cord bracelet with metal details. Unisex design.',
    },
    price: 89,
    category: 'bracelets',
    material: 'stainless-steel',
    images: [
      {
        src: '/images/products/bracelet-005-1.jpg',
        alt: 'Deri Kordonlu Bilezik',
      },
    ],
    status: 'in-stock',
    isSteelCollection: true,
    tags: ['deri', 'unisex', 'casual'],
    createdAt: '2025-01-11',
  },

  // ==================== KÜPELER ====================
  {
    id: 'earring-001',
    slug: 'minimal-halka-kupe',
    name: {
      tr: 'Minimal Halka Küpe',
      en: 'Minimal Hoop Earrings',
    },
    description: {
      tr: 'Klasik minimal halka küpe. Her tarza uyum sağlar.',
      en: 'Classic minimal hoop earrings. Matches every style.',
    },
    price: 79,
    category: 'earrings',
    material: 'gold-plated',
    images: [
      { src: '/images/products/earring-001-1.jpg', alt: 'Minimal Halka Küpe' },
      {
        src: '/images/products/earring-001-2.jpg',
        alt: 'Minimal Halka Küpe Detay',
      },
    ],
    status: 'in-stock',
    isBestseller: true,
    tags: ['halka', 'minimal', 'günlük'],
    createdAt: '2025-01-19',
  },
  {
    id: 'earring-002',
    slug: 'inci-drop-kupe',
    name: {
      tr: 'İnci Drop Küpe',
      en: 'Pearl Drop Earrings',
    },
    description: {
      tr: 'Zarif inci drop küpe. Düğün ve özel günler için ideal.',
      en: 'Elegant pearl drop earrings. Ideal for weddings and special occasions.',
    },
    price: 159,
    category: 'earrings',
    material: 'gold-plated',
    images: [
      { src: '/images/products/earring-002-1.jpg', alt: 'İnci Drop Küpe' },
    ],
    status: 'in-stock',
    isNew: true,
    isFeatured: true,
    tags: ['inci', 'drop', 'düğün'],
    createdAt: '2025-01-21',
  },
  {
    id: 'earring-003',
    slug: 'geometrik-kupe-seti',
    name: {
      tr: 'Geometrik Küpe Seti',
      en: 'Geometric Earring Set',
    },
    description: {
      tr: '3 çift geometrik küpe seti. Farklı şekiller, aynı şıklık.',
      en: '3 pairs geometric earring set. Different shapes, same elegance.',
    },
    price: 129,
    originalPrice: 159,
    category: 'earrings',
    material: 'mixed-metals',
    images: [
      { src: '/images/products/earring-003-1.jpg', alt: 'Geometrik Küpe Seti' },
    ],
    status: 'in-stock',
    tags: ['geometrik', 'set', 'modern'],
    createdAt: '2025-01-16',
  },
  {
    id: 'earring-004',
    slug: 'uzun-zincir-kupe',
    name: {
      tr: 'Uzun Zincir Küpe',
      en: 'Long Chain Earrings',
    },
    description: {
      tr: 'Dikkat çekici uzun zincir küpe. Gece dışarı çıkışları için perfect.',
      en: 'Eye-catching long chain earrings. Perfect for night outs.',
    },
    price: 109,
    category: 'earrings',
    material: 'silver-plated',
    images: [
      { src: '/images/products/earring-004-1.jpg', alt: 'Uzun Zincir Küpe' },
    ],
    status: 'in-stock',
    tags: ['uzun', 'zincir', 'gece'],
    createdAt: '2025-01-13',
  },
  {
    id: 'earring-005',
    slug: 'stud-kupe-seti',
    name: {
      tr: 'Stud Küpe Seti',
      en: 'Stud Earring Set',
    },
    description: {
      tr: '5 çift minimal stud küpe seti. Haftanın her günü için.',
      en: '5 pairs minimal stud earring set. For every day of the week.',
    },
    price: 149,
    category: 'earrings',
    material: 'stainless-steel',
    images: [
      { src: '/images/products/earring-005-1.jpg', alt: 'Stud Küpe Seti' },
    ],
    status: 'in-stock',
    isNew: true,
    isSteelCollection: true,
    tags: ['stud', 'set', 'günlük'],
    createdAt: '2025-01-23',
  },
  {
    id: 'earring-006',
    slug: 'yaprak-kupe',
    name: {
      tr: 'Yaprak Küpe',
      en: 'Leaf Earrings',
    },
    description: {
      tr: 'Doğadan ilham alan yaprak tasarımlı küpe.',
      en: 'Nature-inspired leaf design earrings.',
    },
    price: 99,
    category: 'earrings',
    material: 'gold-plated',
    images: [{ src: '/images/products/earring-006-1.jpg', alt: 'Yaprak Küpe' }],
    status: 'out-of-stock',
    tags: ['yaprak', 'doğa', 'bohem'],
    createdAt: '2025-01-07',
  },

  // ==================== YÜZÜKLER ====================
  {
    id: 'ring-001',
    slug: 'ince-altin-yuzuk',
    name: {
      tr: 'İnce Altın Yüzük',
      en: 'Thin Gold Ring',
    },
    description: {
      tr: 'Zarif ince altın kaplama yüzük. Stackable tasarım.',
      en: 'Elegant thin gold plated ring. Stackable design.',
    },
    price: 69,
    category: 'rings',
    material: 'gold-plated',
    images: [
      { src: '/images/products/ring-001-1.jpg', alt: 'İnce Altın Yüzük' },
      { src: '/images/products/ring-001-2.jpg', alt: 'İnce Altın Yüzük Detay' },
    ],
    status: 'in-stock',
    isBestseller: true,
    tags: ['ince', 'stackable', 'günlük'],
    createdAt: '2025-01-17',
  },
  {
    id: 'ring-002',
    slug: 'tasli-statement-yuzuk',
    name: {
      tr: 'Taşlı Statement Yüzük',
      en: 'Crystal Statement Ring',
    },
    description: {
      tr: 'Göz alıcı taşlı statement yüzük. Dikkat çekmek isteyenler için.',
      en: 'Eye-catching crystal statement ring. For those who want to stand out.',
    },
    price: 179,
    category: 'rings',
    material: 'silver-plated',
    images: [
      { src: '/images/products/ring-002-1.jpg', alt: 'Taşlı Statement Yüzük' },
    ],
    status: 'in-stock',
    isFeatured: true,
    tags: ['taşlı', 'statement', 'özel gün'],
    createdAt: '2025-01-09',
  },
  {
    id: 'ring-003',
    slug: 'stackable-yuzuk-seti',
    name: {
      tr: 'Stackable Yüzük Seti',
      en: 'Stackable Ring Set',
    },
    description: {
      tr: '5 parça stackable yüzük seti. Kendi kombinini yarat.',
      en: '5 piece stackable ring set. Create your own combination.',
    },
    price: 199,
    originalPrice: 249,
    category: 'rings',
    material: 'mixed-metals',
    images: [
      { src: '/images/products/ring-003-1.jpg', alt: 'Stackable Yüzük Seti' },
    ],
    status: 'in-stock',
    isNew: true,
    isFeatured: true,
    tags: ['stackable', 'set', 'hediye'],
    createdAt: '2025-01-24',
  },
  {
    id: 'ring-004',
    slug: 'vintage-oyma-yuzuk',
    name: {
      tr: 'Vintage Oyma Yüzük',
      en: 'Vintage Carved Ring',
    },
    description: {
      tr: 'Vintage tarzı oyma detaylı yüzük. Retro sevenler için.',
      en: 'Vintage style carved detail ring. For retro lovers.',
    },
    price: 119,
    category: 'rings',
    material: 'gold-plated',
    images: [
      { src: '/images/products/ring-004-1.jpg', alt: 'Vintage Oyma Yüzük' },
    ],
    status: 'low-stock',
    tags: ['vintage', 'oyma', 'retro'],
    createdAt: '2025-01-06',
  },
  {
    id: 'ring-005',
    slug: 'ayarlanabilir-yilan-yuzuk',
    name: {
      tr: 'Ayarlanabilir Yılan Yüzük',
      en: 'Adjustable Snake Ring',
    },
    description: {
      tr: 'Şık yılan tasarımlı ayarlanabilir yüzük. Trend bir parça.',
      en: 'Stylish snake design adjustable ring. A trendy piece.',
    },
    price: 89,
    category: 'rings',
    material: 'stainless-steel',
    images: [
      {
        src: '/images/products/ring-005-1.jpg',
        alt: 'Ayarlanabilir Yılan Yüzük',
      },
    ],
    status: 'in-stock',
    isNew: true,
    isSteelCollection: true,
    tags: ['yılan', 'ayarlanabilir', 'trend'],
    createdAt: '2025-01-25',
  },
];

// Helper fonksiyonlar
export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter((p) => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((p) => p.isFeatured);
};

export const getNewProducts = (): Product[] => {
  return products.filter((p) => p.isNew);
};

export const getBestsellerProducts = (): Product[] => {
  return products.filter((p) => p.isBestseller);
};

export const getRelatedProducts = (
  product: Product,
  limit: number = 4
): Product[] => {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};

export const filterProducts = (
  productList: Product[],
  filters: {
    category?: ProductCategory;
    material?: ProductMaterial;
    minPrice?: number;
    maxPrice?: number;
    isNew?: boolean;
    isFeatured?: boolean;
    isBestseller?: boolean;
  }
): Product[] => {
  return productList.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.material && product.material !== filters.material) return false;
    if (filters.minPrice && product.price < filters.minPrice) return false;
    if (filters.maxPrice && product.price > filters.maxPrice) return false;
    if (filters.isNew !== undefined && product.isNew !== filters.isNew)
      return false;
    if (
      filters.isFeatured !== undefined &&
      product.isFeatured !== filters.isFeatured
    )
      return false;
    if (
      filters.isBestseller !== undefined &&
      product.isBestseller !== filters.isBestseller
    )
      return false;
    return true;
  });
};

export const sortProducts = (
  productList: Product[],
  sortBy:
    | 'newest'
    | 'price-asc'
    | 'price-desc'
    | 'name-asc'
    | 'name-desc'
    | 'popular'
): Product[] => {
  const sorted = [...productList];

  switch (sortBy) {
    case 'newest':
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return sorted.sort((a, b) => a.name.tr.localeCompare(b.name.tr, 'tr'));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.tr.localeCompare(a.name.tr, 'tr'));
    case 'popular':
      return sorted.sort((a, b) => {
        if (a.isBestseller && !b.isBestseller) return -1;
        if (!a.isBestseller && b.isBestseller) return 1;
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
    default:
      return sorted;
  }
};
