'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SmoothScrollNavProps {
  locale: string;
}

const navItems = [
  { id: 'home', label: 'Ana Sayfa' },
  { id: 'products', label: 'Ürünler' },
  { id: 'collections', label: 'Koleksiyonlar' },
  { id: 'about', label: 'Hakkımızda' },
  { id: 'contact', label: 'İletişim' },
];

export default function SmoothScrollNav({ locale }: SmoothScrollNavProps) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        if (section.element) {
          const { offsetTop, offsetHeight } = section.element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Header height
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="hidden lg:flex items-center gap-8">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={`relative font-medium transition-colors ${
            activeSection === item.id
              ? 'text-[#D4AF37]'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {item.label}
          {activeSection === item.id && (
            <motion.div
              layoutId="activeSection"
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D4AF37]"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
