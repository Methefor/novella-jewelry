# 🚀 NOVELLA WEB SİTESİ KURULUM REHBERİ
## Adım Adım Kurulum ve Çalıştırma

---

## 📋 GEREKSINIMLER

Bilgisayarınızda şunlar kurulu olmalı:

- ✅ **Node.js** v18.17 veya üzeri
- ✅ **npm** v9 veya üzeri (Node.js ile beraber gelir)
- ✅ **Git** (opsiyonel)

### Node.js Kurulumu
1. [nodejs.org](https://nodejs.org/) adresinden LTS versiyonunu indirin
2. İndirdiğiniz dosyayı çalıştırın
3. Kurulum tamamlandıktan sonra terminal'de kontrol edin:
```bash
node --version   # v18.17.0 veya üzeri
npm --version    # v9.0.0 veya üzeri
```

---

## 🎯 HIZLI KURULUM (5 DAKİKA)

### Adım 1: Dosyayı Aç
```bash
# ZIP'i masaüstüne indir
# Sağ tık → Extract All → novella-clean klasörü oluşur
```

### Adım 2: Terminal'i Aç
**Windows:**
- Klasörde Shift + Sağ Tık → "Open PowerShell window here"

**Mac/Linux:**
- Klasörde sağ tık → "Open Terminal"

**Veya:**
```bash
cd Desktop/novella-clean
```

### Adım 3: Dependencies Yükle
```bash
npm install
```
⏱️ İlk kurulumda 2-3 dakika sürer, bekleyin.

### Adım 4: Development Server Başlat
```bash
npm run dev
```

### Adım 5: Browser'da Aç
```
http://localhost:3000
```

🎉 **Web sitesi çalışıyor!**

---

## 📝 DETAYLI KURULUM

### 1. Proje Klasörünü Hazırla

```bash
# Masaüstünde novella-clean klasörünü aç
cd Desktop/novella-clean

# İçeriği kontrol et
dir   # Windows
ls    # Mac/Linux
```

Görmeli:
```
src/
public/
package.json
README.md
...
```

### 2. Environment Variables (Opsiyonel)

`.env.local` dosyası oluştur (veya `.env.example`'ı kopyala):

```bash
# .env.example'ı .env.local olarak kopyala
cp .env.example .env.local   # Mac/Linux
copy .env.example .env.local # Windows
```

`.env.local` içeriği:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=+905451125059
NEXT_PUBLIC_CONTACT_EMAIL=info@novella.com.tr
```

### 3. Dependencies Kurulumu

```bash
npm install
```

**Beklenen Çıktı:**
```
added 347 packages in 45s
```

**Hata alırsan:**
```bash
# Cache temizle ve tekrar dene
npm cache clean --force
npm install
```

### 4. Development Server

```bash
npm run dev
```

**Beklenen Çıktı:**
```
▲ Next.js 14.2.19
- Local:        http://localhost:3000
- Network:      http://192.168.1.x:3000

✓ Ready in 2.5s
```

### 5. Browser Test

1. Chrome/Firefox/Edge aç
2. `http://localhost:3000` gir
3. Ana sayfa yüklenmeli

**Görmelisin:**
- ✅ Hero section
- ✅ 3D Product Showcase
- ✅ Categories
- ✅ About section
- ✅ Contact form

---

## 🎨 GÖRSEL ASSET'LERİ EKLEME

### Logo Dosyaları

**Lokasyon:** `/public/images/brand/`

**Gerekli:**
```
logo-dark.png   (400x100px)
logo-light.png  (400x100px)
```

**Nasıl ekle:**
1. Logo dosyalarını hazırla
2. `/public/images/brand/` klasörüne kopyala
3. Refresh yap

### Ürün Görselleri

**Lokasyon:** `/public/images/products/showcase/`

**Gerekli (minimum):**
```
necklace-1.jpg  (1000x1000px)
bracelet-1.jpg  (1000x1000px)
earring-1.jpg   (1000x1000px)
ring-1.jpg      (1000x1000px)
```

**Nasıl ekle:**
1. Ürün fotoğraflarını çek (beyaz arkaplan)
2. 1000x1000px boyutunda resize et
3. TinyPNG ile optimize et
4. `/public/images/products/showcase/` klasörüne kopyala

**Sonra:**
`src/components/sections/ProductShowcase3D.tsx` dosyasını düzenle:
```tsx
const showcaseProducts = [
  {
    id: 1,
    name: 'Altın Kaplama Kolye',
    image: '/images/products/showcase/necklace-1.jpg', // ← Güncelle
    price: 299,
  },
  // ...
];
```

---

## 🔧 ÖZELLEŞTİRME

### Brand Colors

`tailwind.config.ts`:
```ts
colors: {
  primary: '#D4AF37',     // Gold - Değiştir
  'rose-gold': '#B76E79', // Rose Gold - Değiştir
}
```

### Site Bilgileri

`src/lib/constants.ts`:
```ts
export const SITE_NAME = 'NOVELLA';
export const SITE_DESCRIPTION = 'Butik Takı Mağazası';
export const CONTACT_EMAIL = 'info@novella.com.tr';
export const WHATSAPP_NUMBER = '+905451125059';
```

### İçerik Güncellemeleri

**Hakkımızda:**
`src/components/sections/AboutSection.tsx`

**İletişim:**
`src/components/sections/ContactSection.tsx`

**Hero Banner:**
`src/components/sections/HeroSection.tsx`

---

## 📦 PRODUCTION BUILD

### Build Oluştur

```bash
# Production build
npm run build
```

**Başarılı build:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (10/10)
✓ Finalizing page optimization

Route (app)                     Size
...
○ /                            142 kB
```

### Production Server Çalıştır

```bash
npm start
```

Browser'da aç:
```
http://localhost:3000
```

---

## 🚀 DEPLOYMENT (Vercel)

### 1. Vercel'e Kaydol
[vercel.com](https://vercel.com/) → Sign Up (GitHub ile)

### 2. Proje Yükle

**Option A: Web Interface**
1. Vercel dashboard → New Project
2. "Import Git Repository"
3. GitHub'a push et, seç
4. Deploy

**Option B: CLI**
```bash
# Vercel CLI kur
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

### 3. Environment Variables

Vercel dashboard'da:
- Settings → Environment Variables
- `.env.local` değerlerini ekle
- Save

### 4. Custom Domain (Opsiyonel)

- Settings → Domains
- Add Domain: `novella.com.tr`
- DNS ayarlarını güncelle

---

## ❓ SORUN GİDERME

### Problem 1: npm install hata veriyor

**Çözüm:**
```bash
# Node.js güncel mi kontrol et
node --version  # v18+ olmalı

# Cache temizle
npm cache clean --force

# Tekrar dene
npm install
```

### Problem 2: Port 3000 kullanımda

**Çözüm:**
```bash
# Başka port kullan
npm run dev -- -p 3001

# Veya port'u öldür
npx kill-port 3000
```

### Problem 3: Sayfa yüklenmiyor

**Kontrol Et:**
1. Terminal'de hata var mı?
2. Browser console (F12) → Errors?
3. `http://localhost:3000` doğru URL mi?

**Çözüm:**
```bash
# Server'ı durdur (Ctrl+C)
# Yeniden başlat
npm run dev
```

### Problem 4: Görseller görünmüyor

**Kontrol Et:**
1. Dosyalar `/public/images/` altında mı?
2. Dosya adları doğru mu?
3. Dosya boyutları < 2MB mı?

**Çözüm:**
```bash
# Public klasörünü kontrol et
dir public\images    # Windows
ls public/images     # Mac/Linux
```

### Problem 5: Build hatası

**Çözüm:**
```bash
# Cache temizle
rm -rf .next    # Mac/Linux
rmdir /s .next  # Windows

# Tekrar build
npm run build
```

---

## 📊 PERFORMANS OPTİMİZASYONU

### 1. Görselleri Optimize Et
- TinyPNG kullan: https://tinypng.com
- Hedef: < 200KB per image
- Format: JPG (photos), PNG (logos)

### 2. Build Analyze
```bash
# Bundle size analizi
npm run build
# .next/analyze/client.html aç
```

### 3. Lighthouse Test
1. Chrome DevTools aç (F12)
2. Lighthouse tab
3. Generate Report
4. Hedef: 90+ tüm kategorilerde

---

## ✅ KURULUM CHECKLİST

İlk kurulum sonrası kontrol et:

- [ ] `npm install` başarılı
- [ ] `npm run dev` çalışıyor
- [ ] http://localhost:3000 açılıyor
- [ ] Ana sayfa yükleniyor
- [ ] 3D showcase çalışıyor
- [ ] Navigasyon çalışıyor
- [ ] Mobile responsive
- [ ] Dark/Light mode toggle
- [ ] Search çalışıyor
- [ ] Cart/Favorites çalışıyor

---

## 📞 DESTEK

Sorularınız için:
- 📧 Email: info@novella.com.tr
- 📱 WhatsApp: 0545 112 50 59

---

## 🎉 TEBRIKLER!

NOVELLA web sitesi artık çalışıyor! 

**Sonraki adımlar:**
1. ✅ Görsel asset'leri ekle
2. ✅ İçerikleri güncelle
3. ✅ Ürün katalogunu doldur
4. ✅ Production build yap
5. ✅ Deploy et

**İyi çalışmalar!** 🚀✨
