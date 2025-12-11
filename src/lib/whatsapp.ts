import { WHATSAPP_CONFIG, WHATSAPP_URLS } from '@/constants';
import type { CartItem as StoreCartItem } from '@/store/cart';
import type { Product } from '@/types/product';

// Types - Mevcut Product ve StoreCartItem tiplerini kullan
export interface CartData {
  items: StoreCartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

// WhatsApp URL oluşturma fonksiyonları
export const generateWhatsAppUrl = (
  phone: string = WHATSAPP_CONFIG.PHONE_NUMBER,
  message?: string
): string => {
  return WHATSAPP_URLS.chatApi(phone, message);
};

// Varsayılan mesaj ile WhatsApp'ı aç
export const openWhatsApp = (message?: string): void => {
  const url = generateWhatsAppUrl(
    WHATSAPP_CONFIG.PHONE_NUMBER,
    message || WHATSAPP_CONFIG.DEFAULT_MESSAGE
  );
  window.open(url, '_blank');
};

// Ürün mesajı şablonunu doldur - Product tipini kullan
export const generateProductMessage = (
  product: Product,
  locale: string = 'tr'
): string => {
  const baseUrl = 'https://novella.com.tr';
  const productUrl = `${baseUrl}/${locale}/products/${product.slug}`;

  // Kategori ismini Türkçe olarak al
  const categoryMap: Record<string, string> = {
    necklaces: 'Kolyeler',
    bracelets: 'Bilezikler',
    earrings: 'Küpeler',
    rings: 'Yüzükler',
    bags: 'Çantalar',
    'hair-accessories': 'Saç Aksesuarları',
  };

  const categoryName = categoryMap[product.category] || product.category;

  return WHATSAPP_CONFIG.PRODUCT_MESSAGE_TEMPLATE.replace(
    '{productName}',
    product.name[locale as keyof typeof product.name] || product.name.tr
  )
    .replace('{price}', product.price.toString())
    .replace('{category}', categoryName)
    .replace(
      '{description}',
      (
        product.description[locale as keyof typeof product.description] ||
        product.description.tr
      ).substring(0, 100) + '...'
    )
    .replace('{productUrl}', productUrl);
};

// Sepet mesajı şablonunu doldur
export const generateCartMessage = (
  cart: CartData,
  locale: string = 'tr'
): string => {
  const cartItemsText = cart.items
    .map((item) => {
      const productName =
        item.product.name[locale as keyof typeof item.product.name] ||
        item.product.name.tr;
      return `• ${productName} (x${item.quantity}) - ${(
        item.product.price * item.quantity
      ).toFixed(2)} ₺`;
    })
    .join('\n');

  return WHATSAPP_CONFIG.CART_MESSAGE_TEMPLATE.replace(
    '{cartItems}',
    cartItemsText
  )
    .replace('{total}', cart.subtotal.toFixed(2))
    .replace('{shipping}', cart.shipping.toFixed(2))
    .replace('{grandTotal}', cart.total.toFixed(2));
};

// Ürün sayfası için WhatsApp mesajı gönder - Product tipini kullan
export const sendProductInquiry = (
  product: Product,
  locale: string = 'tr'
): void => {
  const message = generateProductMessage(product, locale);
  openWhatsApp(message);
};

// Sepet sayfası için WhatsApp mesajı gönder
export const sendCartInquiry = (
  cart: CartData,
  locale: string = 'tr'
): void => {
  const message = generateCartMessage(cart, locale);
  openWhatsApp(message);
};

// Telefon numarası formatı kontrolü
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Telefon numarasını temizle
export const formatPhoneNumber = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

// WhatsApp Web'in mobil versiyonunu kontrol et
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Mobil cihaz için WhatsApp URL'i
export const getMobileWhatsAppUrl = (
  phone: string,
  message?: string
): string => {
  const baseUrl = 'whatsapp://send';
  const params = new URLSearchParams();

  params.append('phone', formatPhoneNumber(phone));
  if (message) {
    params.append('text', message);
  }

  return `${baseUrl}?${params.toString()}`;
};

// Masaüstü/mobil cihaz için uygun WhatsApp URL'i oluştur
export const getOptimalWhatsAppUrl = (
  phone: string,
  message?: string
): string => {
  if (isMobileDevice()) {
    return getMobileWhatsAppUrl(phone, message);
  }
  return generateWhatsAppUrl(phone, message);
};

// WhatsApp butonu click handler
export const handleWhatsAppClick = (phone?: string, message?: string): void => {
  const whatsappPhone = phone || WHATSAPP_CONFIG.PHONE_NUMBER;
  const whatsappMessage = message || WHATSAPP_CONFIG.DEFAULT_MESSAGE;

  if (!isValidPhoneNumber(whatsappPhone)) {
    console.error('Geçersiz telefon numarası:', whatsappPhone);
    return;
  }

  const url = getOptimalWhatsAppUrl(whatsappPhone, whatsappMessage);
  window.open(url, '_blank');
};

// Kopyalanan ürün bilgilerinden WhatsApp mesajı oluştur
export const createProductFromClipboard = (): Product | null => {
  try {
    // Bu fonksiyon gelecekte kopyalanan ürün verilerinden
    // otomatik olarak ürün objesi oluşturmak için kullanılabilir
    return null;
  } catch (error) {
    console.error('Kopyalanan veri işlenemedi:', error);
    return null;
  }
};

// WhatsApp Analytics için event tracking
export const trackWhatsAppClick = (
  type: 'default' | 'product' | 'cart',
  data?: any
): void => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
      event_label: type,
      value: data?.price || 0,
    });
  }

  // Gelecekte diğer analytics servisleri de buraya eklenebilir
  console.log('WhatsApp Click Tracked:', { type, data });
};

// CartData oluşturma helper fonksiyonu
export const createCartData = (
  storeCartItems: StoreCartItem[],
  shippingCost: number = 0
): CartData => {
  const subtotal = storeCartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const total = subtotal + shippingCost;

  return {
    items: storeCartItems,
    subtotal,
    shipping: shippingCost,
    total,
  };
};
