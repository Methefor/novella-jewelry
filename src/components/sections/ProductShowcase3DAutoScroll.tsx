'use client';

import { Container } from '@/components/ui';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ProductShowcase3DProps {
  locale: string;
}

const showcaseProducts = [
  {
    id: 1,
    name: 'Altın Kaplama Kolye',
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop',
    price: 299,
  },
  {
    id: 2,
    name: 'Gümüş Bilezik',
    image:
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop',
    price: 249,
  },
  {
    id: 3,
    name: 'Elmas Küpe',
    image:
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop',
    price: 199,
  },
  {
    id: 4,
    name: 'Rose Gold Yüzük',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop',
    price: 349,
  },
  {
    id: 5,
    name: 'İnci Kolye',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop',
    price: 399,
  },
];

export function ProductShowcase3D({ locale }: ProductShowcase3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseProducts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <Container>
      <div className="text-center mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Özel Koleksiyon
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
        >
          Öne Çıkan Ürünler
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4"
        >
          En beğenilen koleksiyonlarımızdan özenle seçilmiş parçalar
        </motion.p>
      </div>

      <div
        className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden px-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
          {/* Main Product */}
          <motion.div
            key={`main-${currentIndex}`}
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -100 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative z-20 w-full max-w-[340px] md:max-w-[400px]"
          >
            <div className="relative group">
              <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-r from-[#D4AF37]/20 via-[#B76E79]/20 to-[#D4AF37]/20 rounded-full blur-2xl md:blur-3xl opacity-50 group-hover:opacity-75 transition-opacity" />

              <div className="relative w-full h-[420px] md:h-[500px] bg-card rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-border/50">
                <div className="relative h-[280px] md:h-[350px] overflow-hidden">
                  <img
                    src={showcaseProducts[currentIndex].image}
                    alt={showcaseProducts[currentIndex].name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                </div>

                <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold line-clamp-2">
                    {showcaseProducts[currentIndex].name}
                  </h3>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-2xl md:text-3xl font-bold text-[#D4AF37]">
                      {showcaseProducts[currentIndex].price} TL
                    </span>
                    <Link
                      href={`/${locale}/products/${showcaseProducts[currentIndex].id}`}
                      className="px-4 md:px-6 py-2 bg-[#D4AF37] text-white rounded-full text-sm md:text-base font-medium hover:bg-[#B76E79] transition-colors whitespace-nowrap"
                    >
                      İncele
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Side Products Preview - Hidden on mobile */}
          {[-1, 1].map((offset) => {
            const index =
              (currentIndex + offset + showcaseProducts.length) %
              showcaseProducts.length;
            const isLeft = offset < 0;

            return (
              <motion.div
                key={`side-${index}-${offset}`}
                className={`hidden md:block absolute ${
                  isLeft ? 'left-0' : 'right-0'
                } z-10 cursor-pointer`}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                animate={{ opacity: 0.4, x: 0 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                onClick={() => setCurrentIndex(index)}
              >
                <div className="w-[220px] lg:w-[280px] h-[300px] lg:h-[380px] bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-border/30">
                  <div className="relative h-[180px] lg:h-[240px]">
                    <img
                      src={showcaseProducts[index].image}
                      alt={showcaseProducts[index].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 lg:p-4">
                    <h4 className="text-base lg:text-lg font-semibold mb-2 truncate">
                      {showcaseProducts[index].name}
                    </h4>
                    <p className="text-[#D4AF37] font-bold text-lg lg:text-xl">
                      {showcaseProducts[index].price} TL
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {showcaseProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-[#D4AF37] w-8'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2'
              }`}
              aria-label={`Ürün ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-12 md:mt-16">
        <Link
          href={`/${locale}/collections`}
          className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#D4AF37] text-white rounded-full text-sm md:text-base font-semibold hover:bg-[#B76E79] transition-colors"
        >
          Tüm Koleksiyonu Gör
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </Container>
  );
}
