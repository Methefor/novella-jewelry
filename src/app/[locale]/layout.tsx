import '@/app/globals.css';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import WhatsAppFloatButton from '@/components/whatsapp/WhatsAppFloatButton';
import { defaultLocale, locales, type Locale } from '@/lib/i18n'; // i18n.ts'den import
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'NOVELLA - Her Parça Bir Hikaye',
  description: 'NOVELLA butik takı koleksiyonu. Her parça bir hikaye anlatır.',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  // Eğer locale geçerli değilse, default kullan
  if (!locales.includes(locale)) {
    locale = defaultLocale;
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          cormorant.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppFloatButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
