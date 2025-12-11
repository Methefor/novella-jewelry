// src/store/reviews.ts
// NOVELLA - Yorum Sistemi Store

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Review, ReviewFormData, ReviewSortOption } from '@/types/review';
import { MOCK_REVIEWS } from '@/data/reviews';

interface ReviewsState {
  // Kullanıcının beğendiği yorumlar
  likedReviews: string[];
  
  // Filtreleme ve sıralama
  sortOption: ReviewSortOption;
  filterRating: number | null; // null = tümü
  
  // Actions
  likeReview: (reviewId: string) => void;
  unlikeReview: (reviewId: string) => void;
  toggleLike: (reviewId: string) => void;
  isLiked: (reviewId: string) => boolean;
  
  setSortOption: (option: ReviewSortOption) => void;
  setFilterRating: (rating: number | null) => void;
  
  // Sıralama ve filtreleme
  getSortedReviews: (reviews: Review[]) => Review[];
  getFilteredReviews: (reviews: Review[]) => Review[];
}

export const useReviewsStore = create<ReviewsState>()(
  persist(
    (set, get) => ({
      likedReviews: [],
      sortOption: 'newest',
      filterRating: null,

      likeReview: (reviewId: string) => {
        const { likedReviews } = get();
        if (!likedReviews.includes(reviewId)) {
          set({ likedReviews: [...likedReviews, reviewId] });
        }
      },

      unlikeReview: (reviewId: string) => {
        set({
          likedReviews: get().likedReviews.filter(id => id !== reviewId),
        });
      },

      toggleLike: (reviewId: string) => {
        const { likedReviews, likeReview, unlikeReview } = get();
        if (likedReviews.includes(reviewId)) {
          unlikeReview(reviewId);
        } else {
          likeReview(reviewId);
        }
      },

      isLiked: (reviewId: string) => {
        return get().likedReviews.includes(reviewId);
      },

      setSortOption: (option: ReviewSortOption) => {
        set({ sortOption: option });
      },

      setFilterRating: (rating: number | null) => {
        set({ filterRating: rating });
      },

      getSortedReviews: (reviews: Review[]) => {
        const { sortOption } = get();
        const sorted = [...reviews];

        switch (sortOption) {
          case 'newest':
            return sorted.sort((a, b) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          case 'oldest':
            return sorted.sort((a, b) => 
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          case 'highest':
            return sorted.sort((a, b) => b.rating - a.rating);
          case 'lowest':
            return sorted.sort((a, b) => a.rating - b.rating);
          case 'helpful':
            return sorted.sort((a, b) => b.likes - a.likes);
          default:
            return sorted;
        }
      },

      getFilteredReviews: (reviews: Review[]) => {
        const { filterRating } = get();
        if (filterRating === null) return reviews;
        return reviews.filter(r => r.rating === filterRating);
      },
    }),
    {
      name: 'novella-reviews',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        likedReviews: state.likedReviews,
      }),
    }
  )
);
