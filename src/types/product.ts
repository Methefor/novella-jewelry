// src/types/product.ts
// NOVELLA - Tüm Type Definitions

// ========================================
// LOCALE TYPES
// ========================================
export type Locale = 'tr' | 'en';

export interface LocaleParams {
  locale: Locale;
}

// ========================================
// NAVIGATION TYPES
// ========================================
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

// ========================================
// COLLECTION TYPES
// ========================================
export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  featured: boolean;
}

// ========================================
// SOCIAL & CONTACT TYPES
// ========================================
export interface SocialLink {
  platform: 'instagram' | 'tiktok' | 'whatsapp' | 'shopier';
  url: string;
  label: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  address?: string;
  city: string;
  country: string;
}

export interface StoreLink {
  platform: 'shopier' | 'tiktok' | 'instagram';
  url: string;
  label: string;
  description: string;
}

// ========================================
// FAQ & TESTIMONIAL TYPES
// ========================================
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location?: string;
  rating: number;
  comment: string;
  productId?: string;
  avatar?: string;
  createdAt: string;
}

// ========================================
// INSTAGRAM FEED TYPES
// ========================================
export interface InstagramPost {
  id: string;
  imageUrl: string;
  permalink: string;
  caption?: string;
  likeCount?: number;
  commentCount?: number;
}

// ========================================
// THEME TYPES
// ========================================
export type Theme = 'light' | 'dark' | 'system';

// ========================================
// ANIMATION TYPES
// ========================================
export interface AnimationConfig {
  initial: object;
  animate: object;
  exit?: object;
  transition?: object;
}

// ========================================
// FORM TYPES
// ========================================
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

// ========================================
// SEO TYPES
// ========================================
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

// ========================================
// PAGE & LAYOUT PROPS
// ========================================
export interface PageProps {
  params: LocaleParams;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export interface LayoutProps {
  children: React.ReactNode;
  params: LocaleParams;
}

// ========================================
// COMPONENT PROPS - COMMON
// ========================================
export interface WithClassName {
  className?: string;
}

export interface WithChildren {
  children: React.ReactNode;
}

// ========================================
// BUTTON PROPS
// ========================================
export interface ButtonProps extends WithClassName {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// ========================================
// CARD & SECTION PROPS
// ========================================
export interface CardProps extends WithClassName, WithChildren {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface SectionProps extends WithClassName, WithChildren {
  id?: string;
  background?: 'default' | 'muted' | 'accent';
}

// ========================================
// HERO SECTION TYPES
// ========================================
export interface HeroContent {
  badge?: string;
  title: string;
  subtitle: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  image?: string;
}

// ========================================
// FEATURE TYPES
// ========================================
export interface Feature {
  icon: string;
  title: string;
  description: string;
}

// ========================================
// BRAND INFO
// ========================================
export interface BrandInfo {
  name: string;
  tagline: string;
  description: string;
  founded: string;
  location: string;
}

// ========================================
// STORE STATE TYPES (ZUSTAND)
// ========================================
export interface UIState {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  toggleMobileMenu: () => void;
  toggleSearch: () => void;
  closeMobileMenu: () => void;
  closeSearch: () => void;
}

// ========================================
// API RESPONSE TYPES
// ========================================
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ========================================
// PAGINATION
// ========================================
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationInfo;
}

// ========================================
// REVIEW TYPES
// ========================================
export interface Review {
  id: string;
  productId: string;
  author: {
    name: string;
    avatar?: string;
    isVerifiedPurchase: boolean;
  };
  rating: number; // 1-5
  title: string;
  content: string;
  images?: string[];
  likes: number;
  createdAt: string;
  updatedAt?: string;
  reply?: {
    content: string;
    createdAt: string;
  };
}

export interface ReviewStats {
  productId: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  recommendationRate: number; // Yüzde olarak
}

export interface ReviewFormData {
  rating: number;
  title: string;
  content: string;
  name: string;
  email: string;
}

export type ReviewSortOption =
  | 'newest'
  | 'oldest'
  | 'highest'
  | 'lowest'
  | 'helpful';

// ========================================
// PRODUCT TYPES
// ========================================

// Ana ürün kategorileri
export type ProductCategory =
  | 'necklaces'
  | 'bracelets'
  | 'earrings'
  | 'rings'
  | 'bags'
  | 'hair-accessories';

// Özel koleksiyonlar (malzeme bazlı)
export type SpecialCollection = 'steel-collection';

// Malzeme tipleri
export type ProductMaterial =
  | 'gold-plated'
  | 'silver-plated'
  | 'stainless-steel'
  | 'mixed-metals'
  | 'leather'
  | 'fabric';

export type ProductStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  material: ProductMaterial;
  images: ProductImage[];
  status: ProductStatus;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isSteelCollection?: boolean; // Çelik koleksiyon için
  tags?: string[];
  createdAt: string;
}

export interface ProductFilter {
  category?: ProductCategory;
  material?: ProductMaterial;
  minPrice?: number;
  maxPrice?: number;
  status?: ProductStatus;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isSteelCollection?: boolean;
}

export type ProductSortOption =
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'
  | 'popular';

export interface CategoryInfo {
  slug: ProductCategory | SpecialCollection;
  name: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
  image: string;
  icon?: string;
  productCount?: number;
  isSpecial?: boolean; // Özel koleksiyon mu?
}

// Takı Kategorileri
export const JEWELRY_CATEGORIES: CategoryInfo[] = [
  {
    slug: 'necklaces',
    name: { tr: 'Kolyeler', en: 'Necklaces' },
    description: {
      tr: 'Zarif ve şık kolye koleksiyonumuz',
      en: 'Our elegant and stylish necklace collection',
    },
    image: '/images/categories/necklaces.jpg',
    icon: '💎',
  },
  {
    slug: 'bracelets',
    name: { tr: 'Bilezikler', en: 'Bracelets' },
    description: {
      tr: 'El bileğinize zarafet katın',
      en: 'Add elegance to your wrist',
    },
    image: '/images/categories/bracelets.jpg',
    icon: '✨',
  },
  {
    slug: 'earrings',
    name: { tr: 'Küpeler', en: 'Earrings' },
    description: {
      tr: 'Yüzünüzü aydınlatan küpeler',
      en: 'Earrings that brighten your face',
    },
    image: '/images/categories/earrings.jpg',
    icon: '💫',
  },
  {
    slug: 'rings',
    name: { tr: 'Yüzükler', en: 'Rings' },
    description: {
      tr: 'Parmaklarınızı süsleyen yüzükler',
      en: 'Rings that adorn your fingers',
    },
    image: '/images/categories/rings.jpg',
    icon: '💍',
  },
];

// Aksesuar Kategorileri
export const ACCESSORY_CATEGORIES: CategoryInfo[] = [
  {
    slug: 'bags',
    name: { tr: 'Çantalar', en: 'Bags' },
    description: {
      tr: 'Şık ve kullanışlı çanta modelleri',
      en: 'Stylish and practical bag models',
    },
    image: '/images/categories/bags.jpg',
    icon: '👜',
  },
  {
    slug: 'hair-accessories',
    name: { tr: 'Saç Aksesuarları', en: 'Hair Accessories' },
    description: {
      tr: 'Saçlarınızı tamamlayan aksesuarlar',
      en: 'Accessories that complete your hair',
    },
    image: '/images/categories/hair-accessories.jpg',
    icon: '🎀',
  },
];

// Özel Koleksiyonlar
export const SPECIAL_COLLECTIONS: CategoryInfo[] = [
  {
    slug: 'steel-collection',
    name: { tr: 'Çelik Koleksiyon', en: 'Steel Collection' },
    description: {
      tr: 'Dayanıklı ve şık paslanmaz çelik takılar',
      en: 'Durable and stylish stainless steel jewelry',
    },
    image: '/images/categories/steel-collection.jpg',
    icon: '⚙️',
    isSpecial: true,
  },
];

// Tüm kategoriler (geriye uyumluluk için)
export const CATEGORIES: CategoryInfo[] = [
  ...JEWELRY_CATEGORIES,
  ...ACCESSORY_CATEGORIES,
];

// Tüm kategoriler + özel koleksiyonlar
export const ALL_CATEGORIES: CategoryInfo[] = [
  ...JEWELRY_CATEGORIES,
  ...SPECIAL_COLLECTIONS,
  ...ACCESSORY_CATEGORIES,
];

// Malzeme bilgileri
export const MATERIALS: Record<ProductMaterial, { tr: string; en: string }> = {
  'gold-plated': { tr: 'Altın Kaplama', en: 'Gold Plated' },
  'silver-plated': { tr: 'Gümüş Kaplama', en: 'Silver Plated' },
  'stainless-steel': { tr: 'Paslanmaz Çelik', en: 'Stainless Steel' },
  'mixed-metals': { tr: 'Karışık Metal', en: 'Mixed Metals' },
  leather: { tr: 'Deri', en: 'Leather' },
  fabric: { tr: 'Kumaş', en: 'Fabric' },
};

// Durum bilgileri
export const STATUS_LABELS: Record<ProductStatus, { tr: string; en: string }> =
  {
    'in-stock': { tr: 'Stokta', en: 'In Stock' },
    'low-stock': { tr: 'Son Birkaç Ürün', en: 'Low Stock' },
    'out-of-stock': { tr: 'Tükendi', en: 'Out of Stock' },
  };

// Sıralama seçenekleri
export const SORT_OPTIONS: {
  value: ProductSortOption;
  label: { tr: string; en: string };
}[] = [
  { value: 'newest', label: { tr: 'En Yeni', en: 'Newest' } },
  { value: 'popular', label: { tr: 'Popüler', en: 'Popular' } },
  {
    value: 'price-asc',
    label: { tr: 'Fiyat: Düşükten Yükseğe', en: 'Price: Low to High' },
  },
  {
    value: 'price-desc',
    label: { tr: 'Fiyat: Yüksekten Düşüğe', en: 'Price: High to Low' },
  },
  { value: 'name-asc', label: { tr: 'A-Z', en: 'A-Z' } },
  { value: 'name-desc', label: { tr: 'Z-A', en: 'Z-A' } },
];

// Helper: Kategori slug'ından bilgi al
export const getCategoryBySlug = (slug: string): CategoryInfo | undefined => {
  return ALL_CATEGORIES.find((cat) => cat.slug === slug);
};

// Helper: Malzeme filtreleme seçenekleri (takılar için)
export const JEWELRY_MATERIALS: ProductMaterial[] = [
  'stainless-steel',
  'gold-plated',
  'silver-plated',
  'mixed-metals',
];

// Helper: Aksesuar malzemeleri
export const ACCESSORY_MATERIALS: ProductMaterial[] = [
  'leather',
  'fabric',
  'mixed-metals',
];
