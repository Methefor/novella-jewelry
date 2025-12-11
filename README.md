# 💎 NOVELLA E-COMMERCE WEBSITE v2.0
## Butik Takı Mağazası - Single Page Layout

**Her Parça Bir Hikaye** ✨

Modern, responsive, tek sayfalık e-ticaret web sitesi. **Otomatik kayan** 3D showcase, **infinite scroll** carousel'ler, ve **smooth scroll** navigation.

---

## 🎉 YENİLİKLER (v2.0)

### ✅ Smooth Scroll Navigation
- Hakkımızda ve İletişim artık **ayrı sayfa değil**
- Header'dan tıklayınca **smooth scroll** ile section'a iner

### ✅ Otomatik Kayan Animasyonlar
- **3D Showcase** → Her 3 saniyede otomatik değişiyor
- **Yeni Gelenler** → Infinite scroll carousel
- **Çok Satanlar** → Infinite scroll carousel
- Mouse hover'da animasyonlar duruyor

### ✅ Güncellenmiş Görseller
- 7 kategori için kaliteli görseller
- 8+ ürün carousel görseli
- 5 showcase product görseli
- Tümü Unsplash'ten (geçici)

---

## 🚀 HIZLI BAŞLANGIÇ

### 1. Kurulum
```bash
# Dependencies yükle
npm install

# Development server başlat
npm run dev
```

### 2. Browser'da Aç
```
http://localhost:3000
```

İşte bu kadar! 🎉

---

## 📦 PROJE YAPISI

```
novella-clean/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── page.tsx          # ⭐ Ana sayfa (Single Page)
│   │   │   ├── layout.tsx        # Layout wrapper
│   │   │   ├── cart/             # Sepet sayfası
│   │   │   ├── checkout/         # Ödeme sayfası
│   │   │   ├── collections/      # Katalog sayfaları
│   │   │   ├── products/         # Ürün detay
│   │   │   └── ...
│   ├── components/
│   │   ├── sections/
│   │   │   ├── ProductShowcase3D.tsx  # 🎭 3D Vitrin
│   │   │   ├── AboutSection.tsx       # 📖 Hakkımızda
│   │   │   ├── ContactSection.tsx     # 📞 İletişim
│   │   │   ├── HeroSection.tsx        # Hero banner
│   │   │   ├── CategoriesSection.tsx  # Kategoriler
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.tsx        # Navigation
│   │   │   └── Footer.tsx        # Footer
│   │   ├── ui/                   # UI components
│   │   └── ...
│   ├── lib/                      # Utilities
│   ├── store/                    # State management (Zustand)
│   ├── types/                    # TypeScript types
│   └── data/                     # Mock data
├── public/
│   └── images/                   # Görseller
├── package.json
└── README.md
```

---

## ✨ ÖZELLİKLER

### 🎨 Design
- ✅ Modern, minimalist tasarım
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Dark/Light mode support
- ✅ NOVELLA brand colors (Gold #D4AF37, Rose Gold #B76E79)
- ✅ Smooth animations (Framer Motion)

### 🛍️ E-Commerce
- ✅ 3D Product Showcase (dönen vitrin)
- ✅ Product carousel
- ✅ Shopping cart
- ✅ Favorites/Wishlist
- ✅ Product search
- ✅ Category filters
- ✅ WhatsApp integration

### 🌍 İnternationalization
- ✅ Turkish / English support
- ✅ next-intl integration
- ✅ Dynamic locale routing

### 📱 Single Page Features
- ✅ Smooth scroll navigation
- ✅ Section-based layout
- ✅ Inline About & Contact
- ✅ No page reloads
- ✅ Fast user experience

### 🎯 SEO & Performance
- ✅ Next.js 14 App Router
- ✅ Server-side rendering
- ✅ Image optimization
- ✅ Dynamic metadata
- ✅ Sitemap generation

---

## 🛠️ TEKNOLOJILER

### Core
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS v3** - Styling
- **Framer Motion** - Animations

### State & Data
- **Zustand** - State management
- **next-intl** - Internationalization
- **next-themes** - Theme switching

### UI & Icons
- **Lucide React** - Icons
- **React Hook Form** - Form handling
- **Radix UI** - Accessible components

---

## 📋 AVAILABLE SCRIPTS

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type check
npm run type-check

# Lint
npm run lint
```

---

## 🎯 SECTION'LAR (Ana Sayfa)

Ana sayfa tek sayfa yapısında, aşağıdaki section'lardan oluşur:

1. **Hero Section** (`#home`)
   - Ana banner
   - CTA buttons
   - Brand intro

2. **Featured Products** (`#featured`)
   - Öne çıkan ürünler carousel

3. **3D Product Showcase** (`#showcase`)
   - Dönen vitrin
   - Interactive product cards
   - Auto-rotation

4. **Categories** (`#collections`)
   - Ürün kategorileri
   - Visual cards

5. **New Arrivals** (`#new-arrivals`)
   - Yeni ürünler

6. **Features** (`#features`)
   - Mağaza özellikleri
   - USP'ler

7. **Bestsellers** (`#bestsellers`)
   - Çok satanlar

8. **About** (`#about`)
   - Marka hikayesi
   - Değerler
   - İstatistikler

9. **Contact** (`#contact`)
   - İletişim bilgileri
   - Contact form
   - Sosyal medya

10. **Newsletter** (`#newsletter`)
    - Email subscription

---

## 🎨 GÖRSEL ASSET'LER

### Gerekli Görseller

**Logo:**
- `/public/images/brand/logo-dark.png` (400x100px)
- `/public/images/brand/logo-light.png` (400x100px)

**Products:**
- `/public/images/products/showcase/*.jpg` (1000x1000px)
- `/public/images/categories/*.jpg` (800x600px)

**Hero:**
- `/public/images/hero/banner-1.jpg` (1920x1080px)

**Icons:**
- `/public/icons/icon-*.png` (PWA icons)

Detaylı görsel rehberi için `docs/VISUAL_ASSETS_GUIDE.md`'ye bakın.

---

## 🔧 CONFIGURATION

### Environment Variables
`.env.local` oluştur:
```env
# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Default locale
NEXT_PUBLIC_DEFAULT_LOCALE=tr

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=+905451125059

# Contact
NEXT_PUBLIC_CONTACT_EMAIL=info@novella.com.tr
```

### Brand Colors
Tailwind config'de tanımlı:
```js
colors: {
  primary: '#D4AF37',     // Gold
  'rose-gold': '#B76E79', // Rose Gold
  cream: '#FDFBF7',       // Cream
  // ...
}
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

---

## 🚀 DEPLOYMENT

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Build
```bash
# Build
npm run build

# Start
npm start
```

---

## 📝 TODO / ROADMAP

### Hemen Yapılacaklar
- [ ] Gerçek ürün görselleri ekle
- [ ] Logo dosyalarını yükle
- [ ] Contact form backend integration
- [ ] WhatsApp catalog setup

### Gelecek Özellikler
- [ ] User authentication
- [ ] Order management
- [ ] Payment integration
- [ ] Admin panel
- [ ] Analytics dashboard
- [ ] Email notifications

---

## 🐛 TROUBLESHOOTING

### Port zaten kullanımda
```bash
# Port'u temizle
npx kill-port 3000
npm run dev
```

### Build hatası
```bash
# Cache temizle
rm -rf .next
npm run build
```

### TypeScript hatası
```bash
# Dependencies tekrar yükle
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 DOKÜMANTASYON

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

## 📞 İLETİŞİM

**NOVELLA - Butik Takı Mağazası**

- 📧 Email: info@novella.com.tr
- 📱 WhatsApp: 0545 112 50 59
- 📍 Lokasyon: Tekirdağ, Türkiye
- 📸 Instagram: [@jewelry.novella](https://instagram.com/jewelry.novella)
- 🎵 TikTok: [@novella.tr](https://tiktok.com/@novella.tr)

---

## 📄 LİSANS

Private - NOVELLA © 2025

---

## 🙏 TEŞEKKÜRLER

Bu proje modern web teknolojileri kullanılarak geliştirilmiştir.

**Made with ❤️ for NOVELLA**

*Her Parça Bir Hikaye* ✨
