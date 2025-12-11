/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance Optimizations
  reactStrictMode: true,
  swcMinify: true,
  compress: true,

  // Image Optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.shopier.com',
      },
      {
        protocol: 'https',
        hostname: '**.instagram.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
    ],
  },

  // ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },

  // TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },

  // Experimental Features
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // SEO & Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security Headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value:
              'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com *.google-analytics.com *.facebook.net",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "img-src 'self' data: blob: https: *.shopier.com *.instagram.com *.cdninstagram.com",
              "font-src 'self' data: fonts.gstatic.com",
              "connect-src 'self' *.google-analytics.com *.analytics.google.com *.facebook.com *.facebook.net wa.me api.whatsapp.com",
              "frame-src 'self' *.facebook.com *.facebook.net",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
      {
        // Cache static assets
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache fonts
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache icons
        source: '/icons/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.novella.com.tr',
          },
        ],
        destination: 'https://novella.com.tr/:path*',
        permanent: true,
      },
      // Redirect old URLs if needed
      {
        source: '/urunler/:slug',
        destination: '/tr/products/:slug',
        permanent: true,
      },
      {
        source: '/products/:slug',
        destination: '/tr/products/:slug',
        permanent: false,
      },
    ];
  },

  // Rewrites (if needed for API proxying)
  async rewrites() {
    return [
      // Example: Proxy Instagram API calls
      // {
      //   source: '/api/instagram/:path*',
      //   destination: 'https://graph.instagram.com/:path*',
      // },
    ];
  },
};

export default nextConfig;
