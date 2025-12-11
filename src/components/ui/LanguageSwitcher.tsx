'use client';

import { localeFlags, localeNames, locales } from '@/lib/i18n';
import { useLocale } from '@/lib/i18n-client';
import { cn } from '@/lib/utils';
import { Locale } from '@/types/product';
import { Globe } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

interface LanguageSwitcherProps {
  className?: string;
  showLabel?: boolean;
}

export function LanguageSwitcher({
  className,
  showLabel = false,
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (newLocale: Locale) => {
    // Remove current locale from pathname
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');

    startTransition(() => {
      router.replace(newPath);
      setIsOpen(false);
    });
  };

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={cn(
          'flex items-center gap-2 p-2 rounded-lg transition-colors',
          'hover:bg-muted text-foreground',
          isPending && 'opacity-50 cursor-not-allowed'
        )}
        aria-label="Change language"
      >
        <Globe className="w-5 h-5" />
        {showLabel && (
          <span className="text-sm font-medium">
            {localeFlags[locale]} {localeNames[locale]}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-40 rounded-lg border border-border bg-card shadow-lg z-50 overflow-hidden">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocaleChange(loc)}
                className={cn(
                  'flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors',
                  locale === loc
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted'
                )}
              >
                <span className="text-lg">{localeFlags[loc]}</span>
                <span>{localeNames[loc]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Basit toggle versiyonu (2 dil için)
export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const newLocale = locale === 'tr' ? 'en' : 'tr';
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');

    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors',
        'hover:bg-muted text-foreground text-sm font-medium',
        'border border-border',
        isPending && 'opacity-50 cursor-not-allowed',
        className
      )}
      aria-label={`Switch to ${locale === 'tr' ? 'English' : 'Türkçe'}`}
    >
      <span className="text-base">{localeFlags[locale]}</span>
      <span className="uppercase">{locale}</span>
    </button>
  );
}
