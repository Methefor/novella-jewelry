# ⚡ NOVELLA v2.0 - HIZLI BAŞLANGIÇ

## 🎉 YENİLİKLER

Bu versiyon **tam istediğin gibi**:

✅ **Hakkımızda/İletişim** → Smooth scroll (ayrı sayfa DEĞİL)  
✅ **3D Showcase** → Otomatik yana kayıyor  
✅ **Yeni Gelenler** → Otomatik kayan carousel  
✅ **Koleksiyonlar** → 7 kategori için görseller  
✅ **Mock Görseller** → Unsplash'ten kaliteli takı görselleri  

---

## 🚀 3 ADIMDA ÇALIŞTIR

### 1️⃣ Extract
```bash
tar -xzf novella-website-v2.tar.gz
cd novella-final
```

### 2️⃣ Install
```bash
npm install
```
⏱️ 2-3 dakika sürer

### 3️⃣ Run
```bash
npm run dev
```

### 4️⃣ Open
```
http://localhost:3000
```

🎉 **İşte bu kadar!**

---

## 🎯 NELERİ TEST ET

### ✅ Navigation (Header)
1. **Ana Sayfa** → Tıkla → En üste scroll
2. **Koleksiyonlar** → Dropdown aç → Alt kategoriler
3. **Hakkımızda** → Tıkla → Aşağı smooth scroll (#about)
4. **İletişim** → Tıkla → Aşağı smooth scroll (#contact)

### ✅ Otomatik Animasyonlar
1. **3D Showcase** → 3 saniyede bir otomatik kayıyor
2. **Yeni Koleksiyon** → Sonsuz döngü, yana kayıyor
3. **Yeni Gelenler** → Sonsuz döngü, yana kayıyor
4. **Çok Satanlar** → Sonsuz döngü, yana kayıyor

### ✅ Hover Effects
- Mouse carousel'e gelince → Animasyon duruyor
- Mouse çıkınca → Animasyon devam ediyor

### ✅ Koleksiyonlar
7 kategori görselli:
- Kolyeler
- Bilezikler
- Küpeler
- Yüzükler
- Çantalar
- Saç Aksesuarları
- Çelik Koleksiyon

---

## 📸 GERÇEK GÖRSELLERİ NASIL EKLERİM?

### 1. Ürün Görselleri
**Lokasyon:** `/public/images/products/showcase/`

**Dosyalar:**
```
necklace-1.jpg    (1000x1000px)
bracelet-1.jpg    (1000x1000px)
earring-1.jpg     (1000x1000px)
ring-1.jpg        (1000x1000px)
```

**Sonra:**
`src/components/sections/ProductShowcase3DAutoScroll.tsx` aç:
```tsx
const showcaseProducts = [
  {
    id: 1,
    name: 'Gerçek Ürün Adı',
    image: '/images/products/showcase/necklace-1.jpg', // ← Güncelle
    price: 299,
  },
  // ...
];
```

### 2. Carousel Görselleri
`src/components/sections/AutoScrollCarousel.tsx` aç:
```tsx
const mockProducts = [
  { 
    id: 1, 
    name: 'Gerçek Ürün', 
    price: 299, 
    image: '/images/products/product-1.jpg', // ← Güncelle
    category: 'necklaces' 
  },
  // ...
];
```

### 3. Kategori Görselleri
`src/components/sections/CategoriesSection.tsx` aç:
```tsx
const categoryImages: Record<string, string> = {
  necklaces: '/images/categories/necklaces.jpg', // ← Güncelle
  bracelets: '/images/categories/bracelets.jpg',
  // ...
};
```

---

## 🎨 RENK VE MARKA DEĞİŞİKLİKLERİ

### Brand Colors
`tailwind.config.ts`:
```ts
colors: {
  primary: '#D4AF37',     // Gold
  'rose-gold': '#B76E79', // Rose Gold
  // İstersen değiştir
}
```

### Logo
**Lokasyon:** `/public/images/brand/`
```
logo-dark.png    (400x100px)
logo-light.png   (400x100px)
```

---

## ⚙️ ANIMATION AYARLARI

### 3D Showcase Hızı
`src/components/sections/ProductShowcase3DAutoScroll.tsx`:
```tsx
const interval = setInterval(() => {
  setCurrentIndex((prev) => (prev + 1) % showcaseProducts.length);
}, 3000); // ← 3000 = 3 saniye, değiştir
```

### Carousel Hızı
`src/components/sections/AutoScrollCarousel.tsx`:
```tsx
await controls.start({
  x: '-50%',
  transition: {
    duration: 30, // ← 30 saniye, değiştir
    ease: 'linear',
    repeat: Infinity,
  },
});
```

---

## 🐛 SORUN GİDERME

### Port kullanımda
```bash
npx kill-port 3000
npm run dev
```

### Görseller yüklenmiyor
1. `/public/images/` klasörünü kontrol et
2. Dosya adları doğru mu?
3. Browser console (F12) → Network tab

### Animasyonlar çalışmıyor
1. Browser'ı yenile (Ctrl+R)
2. Cache temizle (Ctrl+Shift+R)
3. Başka browser dene

---

## 📦 PRODUCTION BUILD

```bash
# Build
npm run build

# Test
npm start

# Deploy to Vercel
vercel
```

---

## ✅ ÖZELLİKLER (v2.0)

### Navigation
- ✅ Smooth scroll to sections
- ✅ Active section indicator
- ✅ Dropdown menu
- ✅ Mobile responsive

### Animations
- ✅ 3D auto-rotating showcase
- ✅ Infinite scroll carousels
- ✅ Hover pause
- ✅ GPU-accelerated

### Content
- ✅ 7 category images
- ✅ 8+ product carousels
- ✅ 5 showcase products
- ✅ Mock images (Unsplash)

### UX
- ✅ Single page layout
- ✅ Fast load times
- ✅ Mobile friendly
- ✅ Dark/Light mode

---

## 🎯 SONRAKI ADIMLAR

1. ✅ Test et → `npm run dev`
2. ✅ Gerçek görselleri ekle
3. ✅ İçerikleri güncelle
4. ✅ Production build → `npm run build`
5. ✅ Deploy → Vercel

---

## 📞 DESTEK

Sorun olursa:
- 📧 info@novella.com.tr
- 📱 0545 112 50 59

---

**Versiyon:** 2.0  
**Tarih:** 10 Aralık 2025  
**Durum:** ✅ Production Ready

**TAM İSTEDİĞİN GİBİ!** 🎉✨
