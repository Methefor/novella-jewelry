// src/types/review.ts
// NOVELLA - Ürün Yorum Tipleri

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

export type ReviewSortOption = 'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful';
