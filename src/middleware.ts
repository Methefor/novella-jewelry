import { NextRequest, NextResponse } from 'next/server';

const locales = ['tr', 'en'];
const defaultLocale = 'tr';

// Simple in-memory rate limiter (production'da Redis kullanılmalı)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60000; // 1 dakika
  const maxRequests = 100; // Dakikada maksimum 100 istek

  const current = rateLimit.get(ip);

  if (!current || now > current.resetTime) {
    rateLimit.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count++;
  return true;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Security: Get client IP for rate limiting
  const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? '127.0.0.1';

  // Rate limiting check
  if (!checkRateLimit(ip)) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': '60',
        'Content-Type': 'text/plain',
      },
    });
  }

  // Security Headers (ek olarak next.config.mjs'de de var)
  const response = NextResponse.next();

  // Bot Protection: Basic bot detection
  const userAgent = request.headers.get('user-agent') || '';
  const suspiciousBots = ['bot', 'crawler', 'spider', 'scraper'];
  const isSuspicious = suspiciousBots.some((bot) =>
    userAgent.toLowerCase().includes(bot)
  );

  if (isSuspicious && pathname.startsWith('/api/')) {
    // API endpoint'lerine şüpheli bot erişimini engelle
    console.warn(`Suspicious bot blocked: ${userAgent} from ${ip}`);
    return new NextResponse('Forbidden', { status: 403 });
  }

  // Locale handling
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // Check if user has a preferred locale in cookie
    const preferredLocale = request.cookies.get('NEXT_LOCALE')?.value;
    const locale =
      preferredLocale && locales.includes(preferredLocale)
        ? preferredLocale
        : defaultLocale;

    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  // Set security headers on response
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

export const config = {
  matcher: [
    // Match all pages except static files
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.json|images|icons|fonts).*)',
  ],
};
