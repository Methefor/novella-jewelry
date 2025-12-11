'use client';

// NOVELLA - Smooth Scroll Header for Single Page Layout
import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand';
import { CartButton } from '@/components/cart';
import { FavoritesButton } from '@/components/favorites';
import { SearchButton } from '@/components/search';
import { Container, LanguageSwitcher, ThemeToggle } from '@/components/ui';
import { useLocale } from '@/lib/i18n-client';
import { useAppStore } from '@/store';

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 80; // Header height
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

export function HeaderSmoothScroll() {
  const locale = useLocale();
  const { isScrolled, setIsScrolled, openMobileMenu } = useAppStore();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section
      const sections = ['home', 'collections', 'showcase', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsScrolled]);

  const navItems = [
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'collections', label: 'Koleksiyonlar' },
    { id: 'showcase', label: 'Ürünler' },
    { id: 'about', label: 'Hakkımızda' },
    { id: 'contact', label: 'İletişim' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button onClick={() => scrollToSection('home')} className="transition-transform hover:scale-105">
            <Logo />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors relative py-2 ${
                  activeSection === item.id
                    ? 'text-[#D4AF37]'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <Link
              href={`/${locale}/collections`}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Katalog
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <SearchButton />
            <FavoritesButton />
            <CartButton />
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              onClick={openMobileMenu}
              className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
