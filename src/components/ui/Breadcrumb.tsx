'use client';

// src/components/ui/Breadcrumb.tsx
// NOVELLA - Breadcrumb Bileşeni

import { useLocale, useTranslations } from '@/lib/i18n-client';
import { cn } from '@/lib/utils';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const locale = useLocale();
  const t = useTranslations('breadcrumb');

  return (
    <nav aria-label="Breadcrumb" className={cn('mb-6', className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {/* Ana Sayfa */}
        <li>
          <Link
            href={`/${locale}`}
            className="flex items-center gap-1 text-neutral-500 transition-colors hover:text-gold dark:text-neutral-400 dark:hover:text-gold-dark"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only md:not-sr-only">{t('home')}</span>
          </Link>
        </li>

        {/* Separator ve Diğer İtemler */}
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight className="h-4 w-4 text-neutral-400 dark:text-neutral-500" />
            {item.href ? (
              <Link
                href={item.href}
                className="text-neutral-500 transition-colors hover:text-gold dark:text-neutral-400 dark:hover:text-gold-dark"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-neutral-800 dark:text-neutral-100">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
