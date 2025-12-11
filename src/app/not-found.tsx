// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="text-center">
        {/* 404 Number */}
        <h1 className="mb-4 text-9xl font-bold text-primary">404</h1>

        {/* Title */}
        <h2 className="mb-2 text-3xl font-bold text-foreground">
          Sayfa Bulunamadı
        </h2>

        {/* Description */}
        <p className="mb-8 text-muted-foreground">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/tr"
            className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Ana Sayfaya Dön
          </Link>

          <Link
            href="/tr/collections"
            className="rounded-lg border border-border bg-card px-6 py-3 font-medium text-foreground transition-colors hover:bg-accent"
          >
            Koleksiyonları Gör
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12">
          <p className="mb-4 text-sm font-semibold text-muted-foreground">
            Popüler Sayfalar:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/tr/collections/necklaces"
              className="text-primary hover:underline"
            >
              Kolyeler
            </Link>
            <Link
              href="/tr/collections/bracelets"
              className="text-primary hover:underline"
            >
              Bilezikler
            </Link>
            <Link
              href="/tr/collections/earrings"
              className="text-primary hover:underline"
            >
              Küpeler
            </Link>
            <Link href="/tr/about" className="text-primary hover:underline">
              Hakkımızda
            </Link>
            <Link href="/tr/contact" className="text-primary hover:underline">
              İletişim
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
