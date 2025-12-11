// src/app/error.tsx
'use client';

import { useEffect } from 'react';
import { trackError } from '@/lib/analytics';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to analytics
    trackError(error, 'global_error_boundary');
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="text-center">
        {/* Error Icon */}
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error Title */}
        <h1 className="mb-2 text-3xl font-bold text-foreground">
          Bir Şeyler Yanlış Gitti
        </h1>

        {/* Error Message */}
        <p className="mb-8 text-muted-foreground">
          Üzgünüz, bir hata oluştu. Lütfen sayfayı yenilemeyi deneyin.
        </p>

        {/* Error Details (development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mx-auto mb-8 max-w-2xl rounded-lg bg-red-50 p-4 text-left dark:bg-red-900/10">
            <p className="mb-2 text-sm font-semibold text-red-800 dark:text-red-400">
              Hata Detayları:
            </p>
            <pre className="overflow-auto text-xs text-red-700 dark:text-red-300">
              {error.message}
            </pre>
            {error.digest && (
              <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Tekrar Dene
          </button>

          <a
            href="/"
            className="rounded-lg border border-border bg-card px-6 py-3 font-medium text-foreground transition-colors hover:bg-accent"
          >
            Ana Sayfaya Dön
          </a>
        </div>

        {/* Contact Support */}
        <div className="mt-8">
          <p className="text-sm text-muted-foreground">
            Sorun devam ediyorsa,{' '}
            <a
              href="/tr/contact"
              className="text-primary hover:underline"
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
