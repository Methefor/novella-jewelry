'use client';

// src/app/[locale]/collections/page.tsx
// NOVELLA - Tüm Koleksiyonlar Sayfası

import { useTranslations } from '@/lib/i18n-client';

export default function CollectionsPage() {
  const t = useTranslations('collections');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <p className="text-gray-600 mb-8">{t('subtitle')}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Koleksiyon kartları buraya */}
      </div>
    </div>
  );
}
