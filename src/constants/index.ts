// WhatsApp sabitleri
export const WHATSAPP_CONFIG = {
  PHONE_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+905451125059',
  DEFAULT_MESSAGE: "Merhaba! NOVELLA'dan bilgi almak istiyorum.",
  BUSINESS_NAME: process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NAME || 'NOVELLA Takı',
  PRODUCT_MESSAGE_TEMPLATE: `Merhaba! NOVELLA'dan *{productName}* ürünü ile ilgileniyorum.

Ürün Bilgileri:
• Fiyat: {price} ₺
• Kategori: {category}
• Açıklama: {description}
• Link: {productUrl}

Stok durumu ve detaylı bilgi alabilir miyim?`,
  CART_MESSAGE_TEMPLATE: `Merhaba! NOVELLA'dan aşağıdaki ürünleri satın almak istiyorum:

{cartItems}

Toplam: {total} ₺
Kargo: {shipping} ₺
Genel Toplam: {grandTotal} ₺

Siparişimi onaylayabilir misiniz?`,
} as const;

// WhatsApp Web URL sabitleri
export const WHATSAPP_URLS = {
  WEB_BASE: 'https://web.whatsapp.com',
  API_BASE: 'https://api.whatsapp.com',

  // Mesaj gönderme URL'i
  sendMessage: (phone: string, message: string) =>
    `https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent(
      message
    )}`,

  // WhatsApp Business sayfası
  businessPage: (phone: string) => `https://wa.me/${phone.replace('+', '')}`,

  // WhatsApp Chat API
  chatApi: (phone: string, message?: string) => {
    const base = `https://wa.me/${phone.replace('+', '')}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  },
} as const;

// WhatsApp UI Konfigürasyonu
export const WHATSAPP_UI_CONFIG = {
  BUTTON_STYLES: {
    DEFAULT: 'bg-green-500 hover:bg-green-600 text-white',
    PRODUCT:
      'bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg',
    CART: 'bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium',
  },

  FLOATING_BUTTON: {
    POSITION: 'fixed bottom-6 right-6 z-50',
    SIZE: 'w-14 h-14',
    ANIMATION: 'animate-bounce',
  },

  ICONS: {
    WHATSAPP:
      'M 2.367 19.233 c -0.644 0 -1.179 -0.217 -1.608 -0.604 L 0.195 17.063 l 1.567 -0.515 c 0.429 -0.387 0.964 -0.604 1.608 -0.604 h 0.009 c 0.643 0 1.178 0.217 1.607 0.604 l 0.555 0.504 l -0.555 0.504 c -0.429 0.387 -0.964 0.604 -1.607 0.604 z M 2.376 18.171 c 0.096 0 0.187 -0.037 0.251 -0.1 l 0.555 -0.504 l 0.555 0.504 c 0.064 0.063 0.155 0.1 0.251 0.1 c 0.096 0 0.187 -0.037 0.251 -0.1 l 0.555 -0.504 l 0.555 0.504 c 0.064 0.063 0.155 0.1 0.251 0.1 c 0.096 0 0.187 -0.037 0.251 -0.1 l 0.555 -0.504 l 0.555 0.504 c 0.064 0.063 0.155 0.1 0.251 0.1 c 0.096 0 0.187 -0.037 0.251 -0.1 l 0.555 -0.504 l 0.555 0.504 c 0.064 0.063 0.155 0.1 0.251 0.1 s 0.187 -0.037 0.251 -0.1 l 0.555 -0.504 l 0.555 0.504 c 0.064 0.063 0.155 0.1 0.251 0.1 s 0.187 -0.037 0.251 -0.1 l 0.555 -0.504 l 0.555 0.504 c 0.064 0.063 0.155 0.1 0.251 0.1 s 0.187 -0.037 0.251 -0.1 l 0.555 -0.504 l 0.555 0.504 c 0.064 0.063 0.155 0.1 0.251 0.1 s 0.187 -0.037 0.251 -0.1 l 0.555 -0.504 l 0.555 0.504 c 0.064 0.063 0.155 0.1 0.251 0.1 z M 2.367 19.233 c -0.643 0 -1.179 -0.217 -1.608 -0.604 L 0.195 17.063 l 1.567 -0.515 c 0.429 -0.387 0.964 -0.604 1.608 -0.604 h 0.009 c 0.643 0 1.178 0.217 1.607 0.604 l 0.555 0.504 l -0.555 0.504 c -0.429 0.387 -0.964 0.604 -1.607 0.604 z',
  },
} as const;

// Site Configuration
export const SITE_CONFIG = {
  NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'NOVELLA',
  URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  DESCRIPTION:
    'Tekirdağ merkezli butik takı markası. Her parça bir hikaye. Trend ve kaliteli takılar uygun fiyatlarla.',
  KEYWORDS:
    'takı, kolye, bilezik, küpe, yüzük, butik takı, tekirdağ takı, online takı, uygun fiyat takı, altın kaplama',
  LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'tr',
  SUPPORTED_LOCALES: ['tr', 'en'],
} as const;

// Commerce Configuration
export const COMMERCE_CONFIG = {
  CURRENCY: process.env.NEXT_PUBLIC_CURRENCY || 'TRY',
  CURRENCY_SYMBOL: process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₺',
  FREE_SHIPPING_THRESHOLD:
    Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD) || 200,
  SHIPPING_COST: Number(process.env.NEXT_PUBLIC_SHIPPING_COST) || 29.99,
  LOW_STOCK_THRESHOLD:
    Number(process.env.NEXT_PUBLIC_LOW_STOCK_THRESHOLD) || 5,
  OUT_OF_STOCK_THRESHOLD:
    Number(process.env.NEXT_PUBLIC_OUT_OF_STOCK_THRESHOLD) || 0,
} as const;

// Feature Flags
export const FEATURES = {
  NEWSLETTER: process.env.NEXT_PUBLIC_ENABLE_NEWSLETTER === 'true',
  REVIEWS: process.env.NEXT_PUBLIC_ENABLE_REVIEWS !== 'false', // Default true
  COUPONS: process.env.NEXT_PUBLIC_ENABLE_COUPONS !== 'false', // Default true
  FAVORITES: process.env.NEXT_PUBLIC_ENABLE_FAVORITES !== 'false', // Default true
  RECENTLY_VIEWED:
    process.env.NEXT_PUBLIC_ENABLE_RECENTLY_VIEWED !== 'false', // Default true
  DARK_MODE: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE !== 'false', // Default true
} as const;

// Social Media
export const SOCIAL_MEDIA = {
  INSTAGRAM: '@jewelry.novella',
  TIKTOK: '@novella.tr',
  FACEBOOK: '',
  TWITTER: '',
} as const;

// Contact Information
export const CONTACT_INFO = {
  EMAIL: 'info@novella.com.tr',
  PHONE: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+905451125059',
  ADDRESS: 'Tekirdağ, Türkiye',
} as const;
