// SERVER-SAFE - "use client" YOK!
export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'tr';

export const localeFlags = {
  tr: '🇹🇷',
  en: '🇺🇸',
} as const;

export const localeNames = {
  tr: 'Türkçe',
  en: 'English',
} as const;

// NAMESPACE'li çeviri yapısı
const translations = {
  tr: {
    nav: {
      home: 'Ana Sayfa',
      collections: 'Koleksiyonlar',
      about: 'Hakkımızda',
      contact: 'İletişim',
      search: 'Ara',
      cart: 'Sepet',
      checkout: 'Ödeme',
      profile: 'Profil',
      favorites: 'Favoriler',
    },
    categories: {
      jewelry: 'Takılar',
      accessories: 'Aksesuarlar',
      necklaces: 'Kolyeler',
      bracelets: 'Bilezikler',
      earrings: 'Küpe',
      rings: 'Yüzük',
      hairAccessories: 'Saç Aksesuarları',
      bags: 'Çantalar',
      bagsDescription: 'Şık ve kullanışlı çanta modelleri çok yakında!',
      hairAccessoriesDescription:
        'Saçlarınızı tamamlayan şık aksesuarlar çok yakında!',
      steelCollection: 'Çelik Koleksiyon',
      'steel-collection': 'Çelik Koleksiyonu',
      'hair-accessories': 'Saç Aksesuarları',
      all: 'Tümü',
    },
    hero: {
      title: 'Her Parça',
      titleHighlight: 'Bir Hikaye',
      badge: 'Yeni Koleksiyon',
      description: 'Özel tasarım takılar ile hikayenizi anlatın',
      cta: {
        primary: 'Koleksiyonu Keşfet',
        secondary: 'Hakkımızda',
      },
    },
    productCarousel: {
      featured: {
        title: 'Öne Çıkan Ürünler',
        subtitle: 'En çok beğenilen tasarımlarımız',
      },
      new: {
        title: 'Yeni Gelenler',
        subtitle: 'Yeni koleksiyonumuzu keşfedin',
      },
      bestseller: {
        title: 'En Çok Satanlar',
        subtitle: 'Müşterilerimizin favorileri',
      },
      viewAll: 'Tümünü Gör',
    },
    products: {
      title: 'Tüm Ürünler',
      subtitle: 'Koleksiyonumuzdaki tüm ürünleri keşfedin',
      badges: {
        new: 'Yeni',
        bestseller: 'Çok Satan',
      },
      filters: {
        category: 'Kategori',
        material: 'Malzeme',
        price: 'Fiyat',
        priceRange: 'Fiyat Aralığı',
        title: 'Filtreler',
        reset: 'Sıfırla',
      },
      clearFilters: 'Filtreleri Temizle',
      showingResults: '{{count}} ürün gösteriliyor',
      noProductsFound: 'Ürün bulunamadı',
      sort: {
        title: 'Sırala',
      },
      detail: {
        description: 'Açıklama',
        material: 'Malzeme',
        relatedProducts: 'Benzer Ürünler',
      },
    },
    common: {
      viewAll: 'Tümünü Gör',
    },
    features: {
      title: 'Neden NOVELLA?',
      subtitle: 'Kalite ve şıklık bir arada',
      items: {
        quality: {
          title: 'Kaliteli Malzeme',
          description: 'Dayanıklı ve hipoalerjenik malzemeler',
        },
        price: {
          title: 'Uygun Fiyat',
          description: 'Her bütçeye uygun tasarımlar',
        },
        shipping: {
          title: 'Hızlı Kargo',
          description: 'Türkiye genemi ücretsiz kargo',
        },
        support: {
          title: '7/24 Destek',
          description: 'WhatsApp üzerinden canlı destek',
        },
      },
    },
    cta: {
      title: 'Hikayenizi Tamamlayın',
      description: 'Size özel tasarlanan takılarla stilinizi tamamlayın',
      button: 'Hemen Alışverişe Başla',
      trust: {
        shipping: 'Ücretsiz Kargo',
        returns: 'Kolay İade',
        support: '7/24 Destek',
        secure: 'Güvenli Alışveriş',
        fast: 'Hızlı Kargo',
        return: 'Kolay İade',
      },
    },
    newsletter: {
      badge: 'Yeniliklerden Haberdar Olun',
      title: 'Yeniliklerden Haberdar Olun',
      description: 'Yeni ürünler ve kampanyalardan ilk siz haberdar olun',
      placeholder: 'E-posta adresiniz',
      button: 'Abone Ol',
      buttonSubmitting: 'Gönderiliyor...',
      privacy: 'Gizlilik politikasını okudum ve kabul ediyorum',
      success: 'Başarıyla abone oldunuz!',
      error: 'Bir hata oluştu. Lütfen tekrar deneyin.',
    },
    about: {
      title: 'Hakkımızda',
      subtitle: 'Her Parça Bir Hikaye',
      sections: {
        story: {
          title: 'Hikayemiz',
          content:
            "NOVELLA olarak, her bir takının arkasında bir hikaye olduğuna inanıyoruz. 2024 yılında Tekirdağ'da kurulan markamız, modern tasarım anlayışı ile geleneksel el işçiliğini birleştirerek, sizin için özel parçalar yaratıyor.",
        },
        mission: {
          title: 'Misyonumuz',
          content:
            'Kaliteli, uygun fiyatlı ve özgün tasarımlı takılar ile herkesin kendini ifade edebileceği, özel hissedebileceği parçalar sunmak. Her müşterimize özel bir deneyim yaşatmak ve takılarımızın her birinin bir hikaye anlatmasını sağlamak.',
        },
        values: {
          title: 'Değerlerimiz',
          items: [
            {
              title: 'Kalite',
              description: 'Hipoalerjenik ve dayanıklı malzemeler kullanıyoruz',
            },
            {
              title: 'Özgünlük',
              description: 'Her tasarımımız benzersiz ve özenle hazırlanıyor',
            },
            {
              title: 'Müşteri Memnuniyeti',
              description: '7/24 destek ile her zaman yanınızdayız',
            },
          ],
        },
      },
    },
    contact: {
      title: 'İletişim',
      subtitle: 'Bizimle iletişime geçin',
      form: {
        name: 'Adınız Soyadınız',
        namePlaceholder: 'Adınızı ve soyadınızı giriniz',
        email: 'E-posta',
        emailPlaceholder: 'E-posta adresinizi giriniz',
        subject: 'Konu',
        subjectPlaceholder: 'Mesaj konusunu giriniz',
        message: 'Mesajınız',
        messagePlaceholder: 'Mesajınızı buraya yazınız',
        submit: 'Gönder',
      },
      info: {
        title: 'İletişim Bilgilerimiz',
        whatsapp: {
          title: 'WhatsApp',
          description: '7/24 WhatsApp desteği',
        },
        instagram: {
          title: 'Instagram',
          description: '@novellataki',
        },
        email: {
          title: 'E-posta',
          description: 'info@novellataki.com',
        },
        hours: {
          title: 'Çalışma Saatleri',
          description: 'Pazartesi - Cumartesi: 09:00 - 18:00',
          note: 'Pazar: Kapalı',
        },
        location: {
          title: 'Konum',
          description: 'Türkiye',
          note: 'Online satış',
        },
      },
      social: {
        title: 'Sosyal Medya',
        description: 'Bizi takip edin',
      },
    },
    footer: {
      tagline: 'Her Parça Bir Hikaye',
      description: 'NOVELLA ile her parça bir hikaye anlatır',
      followUs: 'Bizi Takip Edin',
      quickLinks: 'Hızlı Bağlantılar',
      categoriesTitle: 'Kategoriler',
      contact: 'İletişim',
      links: {
        about: 'Hakkımızda',
        contact: 'İletişim',
        faq: 'SSS',
        shipping: 'Kargo & Teslimat',
        privacy: 'Gizlilik Politikası',
        terms: 'Kullanım Şartları',
        returns: 'İade Politikası',
      },
      categories: {
        necklaces: 'Kolyeler',
        bracelets: 'Bileklikler',
        earrings: 'Küpeler',
        rings: 'Yüzükler',
        'steel-collection': 'Çelik Koleksiyonu',
        bags: 'Çantalar',
        'hair-accessories': 'Saç Aksesuarları',
      },
    },
    materials: {
      'gold-plated': 'Altın Kaplama',
      'rose-gold': 'Rose Altın',
      silver: 'Gümüş',
      'stainless-steel': 'Paslanmaz Çelik',
      'mixed-metals': 'Karışık Metal',
      pearl: 'İnci',
      crystal: 'Kristal',
    },
    breadcrumb: {
      home: 'Ana Sayfa',
      collections: 'Koleksiyonlar',
      products: 'Ürünler',
      about: 'Hakkımızda',
      contact: 'İletişim',
      cart: 'Sepet',
      checkout: 'Ödeme',
      faq: 'SSS',
      shipping: 'Kargo & Teslimat',
    },
  },
  en: {
    nav: {
      home: 'Home',
      collections: 'Collections',
      about: 'About',
      contact: 'Contact',
      search: 'Search',
      cart: 'Cart',
      checkout: 'Checkout',
      profile: 'Profile',
      favorites: 'Favorites',
    },
    categories: {
      jewelry: 'Jewelry',
      accessories: 'Accessories',
      necklaces: 'Necklaces',
      bracelets: 'Bracelets',
      earrings: 'Earrings',
      rings: 'Rings',
      hairAccessories: 'Hair Accessories',
      bags: 'Bags',
      bagsDescription: 'Stylish and practical bag models coming soon!',
      hairAccessoriesDescription:
        'Stylish accessories to complete your hair coming soon!',
      steelCollection: 'Steel Collection',
      'steel-collection': 'Steel Collection',
      'hair-accessories': 'Hair Accessories',
      all: 'All',
    },
    hero: {
      title: 'Every Piece',
      titleHighlight: 'A Story',
      badge: 'New Collection',
      description: 'Tell your story with specially designed jewelry',
      cta: {
        primary: 'Explore Collection',
        secondary: 'About Us',
      },
    },
    productCarousel: {
      featured: {
        title: 'Featured Products',
        subtitle: 'Our most loved designs',
      },
      new: {
        title: 'New Arrivals',
        subtitle: 'Discover our new collection',
      },
      bestseller: {
        title: 'Best Sellers',
        subtitle: 'Customer favorites',
      },
      viewAll: 'View All',
    },
    products: {
      title: 'All Products',
      subtitle: 'Discover all products in our collection',
      badges: {
        new: 'New',
        bestseller: 'Best Seller',
      },
      filters: {
        category: 'Category',
        material: 'Material',
        price: 'Price',
        priceRange: 'Price Range',
        title: 'Filters',
        reset: 'Reset',
      },
      clearFilters: 'Clear Filters',
      showingResults: 'Showing {{count}} products',
      noProductsFound: 'No products found',
      sort: {
        title: 'Sort',
      },
      detail: {
        description: 'Description',
        material: 'Material',
        relatedProducts: 'Related Products',
      },
    },
    common: {
      viewAll: 'View All',
    },
    features: {
      title: 'Why NOVELLA?',
      subtitle: 'Quality and elegance together',
      items: {
        quality: {
          title: 'Quality Materials',
          description: 'Durable and hypoallergenic materials',
        },
        price: {
          title: 'Affordable Prices',
          description: 'Designs for every budget',
        },
        shipping: {
          title: 'Fast Shipping',
          description: 'Free shipping throughout Turkey',
        },
        support: {
          title: '24/7 Support',
          description: 'Live support via WhatsApp',
        },
      },
    },
    cta: {
      title: 'Complete Your Story',
      description:
        'Complete your style with jewelry designed specially for you',
      button: 'Start Shopping Now',
      trust: {
        shipping: 'Free Shipping',
        returns: 'Easy Returns',
        support: '24/7 Support',
        secure: 'Secure Shopping',
        fast: 'Fast Delivery',
        return: 'Easy Returns',
      },
    },
    newsletter: {
      badge: 'Stay Updated',
      title: 'Stay Updated',
      description: 'Be the first to know about new products and campaigns',
      placeholder: 'Your email address',
      button: 'Subscribe',
      buttonSubmitting: 'Submitting...',
      privacy: 'I have read and accept the privacy policy',
      success: 'Successfully subscribed!',
      error: 'An error occurred. Please try again.',
    },
    about: {
      title: 'About Us',
      subtitle: 'Every Piece A Story',
      sections: {
        story: {
          title: 'Our Story',
          content:
            'At NOVELLA, we believe that every piece of jewelry has a story behind it. Founded in Tekirdağ in 2024, our brand combines modern design with traditional craftsmanship to create special pieces for you.',
        },
        mission: {
          title: 'Our Mission',
          content:
            'To offer quality, affordable and originally designed jewelry that allows everyone to express themselves and feel special. To provide each customer with a unique experience and ensure that each of our jewelry tells a story.',
        },
        values: {
          title: 'Our Values',
          items: [
            {
              title: 'Quality',
              description: 'We use hypoallergenic and durable materials',
            },
            {
              title: 'Originality',
              description:
                'Each of our designs is unique and carefully prepared',
            },
            {
              title: 'Customer Satisfaction',
              description: 'We are always with you with 24/7 support',
            },
          ],
        },
      },
    },
    contact: {
      title: 'Contact',
      subtitle: 'Get in touch with us',
      form: {
        name: 'Your Name',
        namePlaceholder: 'Enter your name',
        email: 'Email',
        emailPlaceholder: 'Enter your email address',
        subject: 'Subject',
        subjectPlaceholder: 'Enter message subject',
        message: 'Your Message',
        messagePlaceholder: 'Write your message here',
        submit: 'Send',
      },
      info: {
        title: 'Contact Information',
        whatsapp: {
          title: 'WhatsApp',
          description: '24/7 WhatsApp support',
        },
        instagram: {
          title: 'Instagram',
          description: '@novellataki',
        },
        email: {
          title: 'Email',
          description: 'info@novellataki.com',
        },
        hours: {
          title: 'Working Hours',
          description: 'Monday - Saturday: 09:00 - 18:00',
          note: 'Sunday: Closed',
        },
        location: {
          title: 'Location',
          description: 'Turkey',
          note: 'Online sales',
        },
      },
      social: {
        title: 'Social Media',
        description: 'Follow us',
      },
    },
    footer: {
      tagline: 'Every Piece A Story',
      description: 'With NOVELLA, every piece tells a story',
      followUs: 'Follow Us',
      quickLinks: 'Quick Links',
      categoriesTitle: 'Categories',
      contact: 'Contact',
      links: {
        about: 'About',
        contact: 'Contact',
        faq: 'FAQ',
        shipping: 'Shipping & Delivery',
        privacy: 'Privacy Policy',
        terms: 'Terms of Use',
        returns: 'Return Policy',
      },
      categories: {
        necklaces: 'Necklaces',
        bracelets: 'Bracelets',
        earrings: 'Earrings',
        rings: 'Rings',
        'steel-collection': 'Steel Collection',
        bags: 'Bags',
        'hair-accessories': 'Hair Accessories',
      },
    },
    materials: {
      'gold-plated': 'Gold Plated',
      'rose-gold': 'Rose Gold',
      silver: 'Silver',
      'stainless-steel': 'Stainless Steel',
      'mixed-metals': 'Mixed Metals',
      pearl: 'Pearl',
      crystal: 'Crystal',
    },
    breadcrumb: {
      home: 'Home',
      collections: 'Collections',
      products: 'Products',
      about: 'About',
      contact: 'Contact',
      cart: 'Cart',
      checkout: 'Checkout',
      faq: 'FAQ',
      shipping: 'Shipping & Delivery',
    },
  },
} as const;

// Type-safe translation function
type TranslationPath<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}` | `${K}.${TranslationPath<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;

type TranslationKeys = TranslationPath<(typeof translations)['tr']>;

export function getTranslation(
  locale: Locale,
  key: string,
  params?: Record<string, string | number>
): string {
  const keys = key.split('.');
  let value: any = translations[locale];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      console.warn(
        `[i18n] Translation key not found: "${key}" for locale "${locale}"`
      );
      return key;
    }
  }

  if (typeof value !== 'string') {
    console.warn(
      `[i18n] Translation value is not a string: "${key}" for locale "${locale}"`
    );
    return key;
  }

  // Replace parameters
  if (params) {
    return value.replace(/\{\{(\w+)\}\}/g, (_, param) => {
      return params[param]?.toString() || `{{${param}}}`;
    });
  }

  return value;
}

// Type-safe helper for nested translations
export function getNestedTranslation(
  locale: Locale,
  namespace: string,
  key: string
): string {
  return getTranslation(locale, `${namespace}.${key}`);
}

// Export 't' as an alias for getTranslation (for backwards compatibility)
export const t = getTranslation;
