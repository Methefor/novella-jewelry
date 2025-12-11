// src/data/reviews.ts
// NOVELLA - Örnek Yorum Verileri

import type { Review, ReviewStats } from '@/types/review';

// Örnek yorumlar
export const MOCK_REVIEWS: Review[] = [
  // Altın Kaplama Minimal Kolye (product-1)
  {
    id: 'review-1',
    productId: 'product-1',
    author: {
      name: 'Ayşe Y.',
      isVerifiedPurchase: true,
    },
    rating: 5,
    title: 'Harika bir kolye!',
    content: 'Çok şık ve kaliteli bir ürün. Günlük kullanım için ideal. Kargo da çok hızlı geldi, 2 günde elimdeydi. Kesinlikle tavsiye ederim!',
    likes: 24,
    createdAt: '2025-01-15T10:30:00Z',
    reply: {
      content: 'Güzel yorumunuz için teşekkür ederiz! Beğenmenize çok sevindik 💫',
      createdAt: '2025-01-15T14:00:00Z',
    },
  },
  {
    id: 'review-2',
    productId: 'product-1',
    author: {
      name: 'Zeynep K.',
      isVerifiedPurchase: true,
    },
    rating: 4,
    title: 'Güzel ürün, beklediğim gibi',
    content: 'Ürün fotoğraftaki gibi geldi. Kalitesi gayet iyi. Tek eksi yanı zinciri biraz ince buldum ama yine de çok zarif duruyor.',
    likes: 12,
    createdAt: '2025-01-10T15:45:00Z',
  },
  {
    id: 'review-3',
    productId: 'product-1',
    author: {
      name: 'Merve A.',
      isVerifiedPurchase: true,
    },
    rating: 5,
    title: 'Hediye olarak aldım, bayıldı!',
    content: 'Arkadaşıma doğum günü hediyesi olarak aldım. Paketi bile çok şıktı. Arkadaşım bayıldı, ben de kendime bir tane alacağım şimdi 😊',
    likes: 18,
    createdAt: '2025-01-05T09:20:00Z',
  },
  
  // Rose Gold Zincir Bilezik (product-2)
  {
    id: 'review-4',
    productId: 'product-2',
    author: {
      name: 'Elif S.',
      isVerifiedPurchase: true,
    },
    rating: 5,
    title: 'Tam aradığım gibi!',
    content: 'Rose gold rengi muhteşem. Cildimle çok uyumlu. Her gün takıyorum, su değince bile bir şey olmuyor. Kalitesine göre fiyatı çok uygun.',
    likes: 31,
    createdAt: '2025-01-18T11:00:00Z',
  },
  {
    id: 'review-5',
    productId: 'product-2',
    author: {
      name: 'Deniz M.',
      isVerifiedPurchase: false,
    },
    rating: 3,
    title: 'İdare eder',
    content: 'Fena değil ama beklendiğim kadar parlak gelmedi. Belki ışıktan dolayı fotoğraflar yanıltmış olabilir.',
    likes: 3,
    createdAt: '2025-01-08T16:30:00Z',
  },
  
  // Çelik Halka Küpe (product-3)
  {
    id: 'review-6',
    productId: 'product-3',
    author: {
      name: 'Selin T.',
      isVerifiedPurchase: true,
    },
    rating: 5,
    title: 'Alerji yapmıyor!',
    content: 'Metal alerjim var ve bu küpeler hiç sorun çıkarmadı. Çelik olması büyük avantaj. Üstelik çok hafif, kulak delmiyor.',
    likes: 42,
    createdAt: '2025-01-20T08:15:00Z',
    reply: {
      content: 'Sağlığınız bizim için önemli! Çelik koleksiyonumuz tam da bu yüzden var 💜',
      createdAt: '2025-01-20T10:00:00Z',
    },
  },
  
  // Vintage Taşlı Yüzük (product-4)
  {
    id: 'review-7',
    productId: 'product-4',
    author: {
      name: 'Gamze Ö.',
      isVerifiedPurchase: true,
    },
    rating: 4,
    title: 'Vintage sevenler için',
    content: 'Vintage tarzı sevenler için harika bir yüzük. Taşı çok parlak. Ayarlanabilir olması da büyük artı.',
    likes: 15,
    createdAt: '2025-01-12T14:20:00Z',
  },
  
  // Mineli Kelebek Kolye (product-5)
  {
    id: 'review-8',
    productId: 'product-5',
    author: {
      name: 'Pınar B.',
      isVerifiedPurchase: true,
    },
    rating: 5,
    title: 'Kızım çok sevdi!',
    content: '12 yaşındaki kızım için aldım. Kelebek tasarımına bayıldı. Renkleri canlı ve çok sevimli. Anne-kız aynısından aldık sonra 😄',
    likes: 28,
    createdAt: '2025-01-22T12:00:00Z',
  },
  {
    id: 'review-9',
    productId: 'product-5',
    author: {
      name: 'Ceren D.',
      isVerifiedPurchase: true,
    },
    rating: 5,
    title: 'Çok tatlı bir kolye',
    content: 'Fotoğraftaki gibi, hatta daha güzel geldi. Mine işçiliği çok kaliteli. Herkes nereden aldığımı soruyor.',
    likes: 19,
    createdAt: '2025-01-19T17:45:00Z',
  },
  
  // Geometrik Üçgen Küpe (product-6)
  {
    id: 'review-10',
    productId: 'product-6',
    author: {
      name: 'İrem K.',
      isVerifiedPurchase: true,
    },
    rating: 4,
    title: 'Modern ve şık',
    content: 'Minimalist tarza çok yakışıyor. Ofiste bile takabiliyorum. Sadece biraz büyük buldum, daha küçük versiyonu olsa keşke.',
    likes: 8,
    createdAt: '2025-01-14T10:00:00Z',
  },
  
  // Çok Katmanlı Zincir Kolye (product-7)
  {
    id: 'review-11',
    productId: 'product-7',
    author: {
      name: 'Burcu A.',
      isVerifiedPurchase: true,
    },
    rating: 5,
    title: '3 kolye 1 arada!',
    content: 'Tek başına bile çok şık duruyor. Katmanlar birbirine dolaşmıyor, bu çok önemli. Fiyatına göre inanılmaz kaliteli.',
    likes: 35,
    createdAt: '2025-01-25T09:30:00Z',
    reply: {
      content: 'Değerli yorumunuz için teşekkürler! Katmanlı kolyelerimiz en çok beğenilen ürünlerimiz arasında ✨',
      createdAt: '2025-01-25T11:15:00Z',
    },
  },
  {
    id: 'review-12',
    productId: 'product-7',
    author: {
      name: 'Aslı Y.',
      isVerifiedPurchase: true,
    },
    rating: 5,
    title: 'Her kombine uyuyor',
    content: 'Hem günlük hem de özel günlerde takılabilecek bir kolye. Çok mutluyum aldığıma. Başka renkleri de olsa süper olur.',
    likes: 22,
    createdAt: '2025-01-23T15:00:00Z',
  },
  
  // İnci Detaylı Bilezik (product-8)
  {
    id: 'review-13',
    productId: 'product-8',
    author: {
      name: 'Nazlı E.',
      isVerifiedPurchase: true,
    },
    rating: 5,
    title: 'Zarif ve şık',
    content: 'İnci detayları çok zarif duruyor. Düğün için aldım, herkesten övgü aldım. Fiyatı da çok uygundu.',
    likes: 27,
    createdAt: '2025-01-28T11:20:00Z',
  },
  
  // Ay Yıldız Charm Kolye (product-9)
  {
    id: 'review-14',
    productId: 'product-9',
    author: {
      name: 'Melis C.',
      isVerifiedPurchase: true,
    },
    rating: 5,
    title: 'Anlamlı bir hediye',
    content: 'Yurtdışında yaşayan arkadaşıma gönderdim. Ay yıldız motifi çok anlamlı oldu onun için. Kalitesi de çok iyi.',
    likes: 33,
    createdAt: '2025-01-30T14:00:00Z',
  },
  {
    id: 'review-15',
    productId: 'product-9',
    author: {
      name: 'Tuğçe H.',
      isVerifiedPurchase: true,
    },
    rating: 4,
    title: 'Güzel ama ince',
    content: 'Tasarımı çok güzel, ay yıldız detayı harika. Ama zincir biraz ince geldi, dikkatli kullanmak lazım.',
    likes: 9,
    createdAt: '2025-01-27T16:45:00Z',
  },
  
  // Paslanmaz Çelik Set (product-10)
  {
    id: 'review-16',
    productId: 'product-10',
    author: {
      name: 'Esra Ş.',
      isVerifiedPurchase: true,
    },
    rating: 5,
    title: 'Set olarak almak avantajlı',
    content: 'Tek tek almak yerine set aldım, hem uyumlu oldu hem de daha uygun fiyata geldi. Çelik olması da kalitesini artırıyor.',
    likes: 41,
    createdAt: '2025-02-01T10:30:00Z',
    reply: {
      content: 'Set alımlarında %15 avantaj sağlıyorsunuz! Akıllı tercih 🎁',
      createdAt: '2025-02-01T12:00:00Z',
    },
  },
];

// Ürün bazlı istatistikleri hesapla
export function calculateReviewStats(productId: string): ReviewStats {
  const productReviews = MOCK_REVIEWS.filter(r => r.productId === productId);
  
  if (productReviews.length === 0) {
    return {
      productId,
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      recommendationRate: 0,
    };
  }

  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let totalRating = 0;

  productReviews.forEach(review => {
    distribution[review.rating as keyof typeof distribution]++;
    totalRating += review.rating;
  });

  const averageRating = totalRating / productReviews.length;
  const positiveReviews = productReviews.filter(r => r.rating >= 4).length;
  const recommendationRate = (positiveReviews / productReviews.length) * 100;

  return {
    productId,
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews: productReviews.length,
    ratingDistribution: distribution,
    recommendationRate: Math.round(recommendationRate),
  };
}

// Ürüne göre yorumları getir
export function getReviewsByProductId(productId: string): Review[] {
  return MOCK_REVIEWS.filter(r => r.productId === productId);
}

// Tüm ürünlerin ortalama puanlarını getir
export function getAllProductRatings(): Record<string, { average: number; count: number }> {
  const ratings: Record<string, { total: number; count: number }> = {};

  MOCK_REVIEWS.forEach(review => {
    if (!ratings[review.productId]) {
      ratings[review.productId] = { total: 0, count: 0 };
    }
    ratings[review.productId].total += review.rating;
    ratings[review.productId].count++;
  });

  const result: Record<string, { average: number; count: number }> = {};
  
  Object.entries(ratings).forEach(([productId, data]) => {
    result[productId] = {
      average: Math.round((data.total / data.count) * 10) / 10,
      count: data.count,
    };
  });

  return result;
}
