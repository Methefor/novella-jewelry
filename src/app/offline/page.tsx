// src/app/offline/page.tsx
'use client';

import { useOnlineStatus } from '@/lib/hooks/useMobile';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OfflinePage() {
  const isOnline = useOnlineStatus();
  const router = useRouter();

  useEffect(() => {
    if (isOnline) {
      // Kullanıcı tekrar online olduğunda ana sayfaya yönlendir
      router.push('/tr');
    }
  }, [isOnline, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="text-center">
        {/* Offline Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
          <svg
            className="h-10 w-10 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="mb-2 text-3xl font-bold text-foreground">
          İnternet Bağlantısı Yok
        </h1>

        {/* Description */}
        <p className="mb-8 text-muted-foreground">
          Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.
        </p>

        {/* Status Indicator */}
        <div className="mx-auto mb-8 flex items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2 dark:bg-red-900/10">
          <div className="h-2 w-2 rounded-full bg-red-600 dark:bg-red-400"></div>
          <span className="text-sm font-medium text-red-800 dark:text-red-400">
            Offline
          </span>
        </div>

        {/* Helpful Tips */}
        <div className="mx-auto max-w-md text-left">
          <p className="mb-4 text-sm font-semibold text-muted-foreground">
            Yapabilecekleriniz:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Wi-Fi veya mobil veri bağlantınızı kontrol edin</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Uçak modunun kapalı olduğundan emin olun</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">•</span>
              <span>Sayfayı yenilemeyi deneyin</span>
            </li>
          </ul>
        </div>

        {/* Retry Button */}
        <button
          onClick={() => window.location.reload()}
          className="mt-8 rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Tekrar Dene
        </button>

        {/* Contact Support */}
        <div className="mt-8">
          <p className="text-sm text-muted-foreground">
            Sorun devam ediyorsa, WhatsApp üzerinden{' '}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace('+', '')}`}
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              bizimle iletişime geçin
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
