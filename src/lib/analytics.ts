// src/lib/analytics.ts
// Analytics tracking utilities for Google Analytics, Meta Pixel, etc.

type EventParams = {
  [key: string]: any;
};

/**
 * Google Analytics 4 Event Tracking
 */
export const trackEvent = (
  eventName: string,
  eventParams?: EventParams
): void => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  } else {
    console.log('Analytics Event:', eventName, eventParams);
  }
};

/**
 * Meta (Facebook) Pixel Tracking
 */
export const trackPixelEvent = (
  eventName: string,
  eventParams?: EventParams
): void => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, eventParams);
  } else {
    console.log('Pixel Event:', eventName, eventParams);
  }
};

/**
 * E-commerce Events
 */
export const analytics = {
  // View item
  viewProduct: (productId: string, productName: string, price: number) => {
    trackEvent('view_item', {
      currency: 'TRY',
      value: price,
      items: [
        {
          item_id: productId,
          item_name: productName,
          price: price,
        },
      ],
    });

    trackPixelEvent('ViewContent', {
      content_name: productName,
      content_ids: [productId],
      content_type: 'product',
      value: price,
      currency: 'TRY',
    });
  },

  // Add to cart
  addToCart: (
    productId: string,
    productName: string,
    price: number,
    quantity: number = 1
  ) => {
    trackEvent('add_to_cart', {
      currency: 'TRY',
      value: price * quantity,
      items: [
        {
          item_id: productId,
          item_name: productName,
          price: price,
          quantity: quantity,
        },
      ],
    });

    trackPixelEvent('AddToCart', {
      content_name: productName,
      content_ids: [productId],
      content_type: 'product',
      value: price * quantity,
      currency: 'TRY',
    });
  },

  // Remove from cart
  removeFromCart: (
    productId: string,
    productName: string,
    price: number,
    quantity: number = 1
  ) => {
    trackEvent('remove_from_cart', {
      currency: 'TRY',
      value: price * quantity,
      items: [
        {
          item_id: productId,
          item_name: productName,
          price: price,
          quantity: quantity,
        },
      ],
    });
  },

  // View cart
  viewCart: (cartTotal: number, itemCount: number) => {
    trackEvent('view_cart', {
      currency: 'TRY',
      value: cartTotal,
      items_count: itemCount,
    });
  },

  // Begin checkout (WhatsApp button clicked)
  beginCheckout: (cartTotal: number, items: any[]) => {
    trackEvent('begin_checkout', {
      currency: 'TRY',
      value: cartTotal,
      items: items,
      method: 'whatsapp',
    });

    trackPixelEvent('InitiateCheckout', {
      value: cartTotal,
      currency: 'TRY',
      content_type: 'product',
      contents: items,
    });
  },

  // Purchase (simulated for tracking when WhatsApp order is placed)
  purchase: (
    orderId: string,
    orderTotal: number,
    shipping: number,
    items: any[]
  ) => {
    trackEvent('purchase', {
      transaction_id: orderId,
      value: orderTotal,
      currency: 'TRY',
      shipping: shipping,
      items: items,
    });

    trackPixelEvent('Purchase', {
      value: orderTotal,
      currency: 'TRY',
      content_type: 'product',
      contents: items,
    });
  },

  // Search
  search: (searchTerm: string, resultCount?: number) => {
    trackEvent('search', {
      search_term: searchTerm,
      results_count: resultCount,
    });

    trackPixelEvent('Search', {
      search_string: searchTerm,
    });
  },

  // View category
  viewCategory: (category: string) => {
    trackEvent('view_item_list', {
      item_list_name: category,
    });
  },

  // Share product
  share: (productId: string, method: string) => {
    trackEvent('share', {
      content_type: 'product',
      item_id: productId,
      method: method,
    });
  },

  // WhatsApp interactions
  whatsappClick: (type: 'product' | 'cart' | 'floating', value?: number) => {
    trackEvent('whatsapp_click', {
      event_category: 'engagement',
      event_label: type,
      value: value || 0,
    });

    trackPixelEvent('Contact', {
      content_name: type,
      value: value || 0,
      currency: 'TRY',
    });
  },

  // Newsletter signup
  newsletterSignup: (email: string) => {
    trackEvent('sign_up', {
      method: 'newsletter',
    });

    trackPixelEvent('Lead', {
      content_name: 'newsletter_signup',
    });
  },

  // Add to favorites
  addToFavorites: (productId: string, productName: string) => {
    trackEvent('add_to_wishlist', {
      items: [
        {
          item_id: productId,
          item_name: productName,
        },
      ],
    });
  },

  // Apply coupon
  applyCoupon: (couponCode: string, discount: number) => {
    trackEvent('coupon_applied', {
      coupon_code: couponCode,
      discount: discount,
      currency: 'TRY',
    });
  },

  // Page view (automatic with Next.js)
  pageView: (url: string, title: string) => {
    trackEvent('page_view', {
      page_path: url,
      page_title: title,
    });

    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }
  },

  // User engagement time
  engagement: (engagementTimeMsec: number) => {
    trackEvent('user_engagement', {
      engagement_time_msec: engagementTimeMsec,
    });
  },
};

/**
 * Custom event tracking
 */
export const trackCustomEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
): void => {
  trackEvent(action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

/**
 * Error tracking
 */
export const trackError = (error: Error, context?: string): void => {
  trackEvent('exception', {
    description: error.message,
    fatal: false,
    context: context,
  });

  console.error('Tracked Error:', error, context);
};

/**
 * Performance tracking
 */
export const trackPerformance = (metric: string, value: number): void => {
  trackEvent('performance', {
    metric_name: metric,
    value: value,
  });
};
