'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductShowcase3DProps {
  locale: string;
}

const showcaseProducts = [
  {
    id: 1,
    name: 'Gold Plated Necklace',
    image: '/images/products/placeholder.jpg',
    price: 299,
  },
  {
    id: 2,
    name: 'Rose Gold Bracelet',
    image: '/images/products/placeholder.jpg',
    price: 249,
  },
  {
    id: 3,
    name: 'Sterling Silver Earrings',
    image: '/images/products/placeholder.jpg',
    price: 199,
  },
  {
    id: 4,
    name: 'Diamond Ring',
    image: '/images/products/placeholder.jpg',
    price: 349,
  },
];

export function ProductShowcase3D({ locale }: ProductShowcase3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseProducts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % showcaseProducts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? showcaseProducts.length - 1 : prev - 1
    );
  };

  return (
    <Container>
      <div className="text-center mb-16">
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
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Öne Çıkan Ürünler
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          En beğenilen koleksiyonlarımızdan özenle seçilmiş parçalar
        </motion.p>
      </div>

      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
          <motion.div
            key={`main-${currentIndex}`}
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-20"
          >
            <div className="relative group">
              <div className="absolute -inset-6 bg-gradient-to-r from-[#D4AF37]/20 via-[#B76E79]/20 to-[#D4AF37]/20 rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity" />
              
              <div className="relative w-[400px] h-[500px] bg-card rounded-3xl shadow-2xl overflow-hidden border border-border/50">
                <div className="relative h-[350px] overflow-hidden bg-gradient-to-br from-[#FDFBF7] to-background">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl">💎</div>
                  </div>
                  
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold">
                    {showcaseProducts[currentIndex].name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-[#D4AF37]">
                      {showcaseProducts[currentIndex].price} TL
                    </span>
                    <Link
                      href={`/${locale}/products/${showcaseProducts[currentIndex].id}`}
                      className="px-6 py-2 bg-[#D4AF37] text-white rounded-full font-medium hover:bg-[#B76E79] transition-colors"
                    >
                      İncele
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {[-1, 1].map((offset) => {
            const index = (currentIndex + offset + showcaseProducts.length) % showcaseProducts.length;
            const isLeft = offset < 0;
            
            return (
              <motion.div
                key={`side-${index}-${offset}`}
                className={`absolute ${isLeft ? 'left-0' : 'right-0'} z-10 cursor-pointer`}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                animate={{ opacity: 0.5, x: 0 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                onClick={() => setCurrentIndex(index)}
              >
                <div className="w-[280px] h-[380px] bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-border/30">
                  <div className="relative h-[240px] bg-gradient-to-br from-[#FDFBF7]/50 to-background">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl">💍</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold mb-2 truncate">
                      {showcaseProducts[index].name}
                    </h4>
                    <p className="text-[#D4AF37] font-bold text-xl">
                      {showcaseProducts[index].price} TL
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-2">
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

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="text-center mt-16">
        <Link
          href={`/${locale}/collections`}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-white rounded-full font-semibold hover:bg-[#B76E79] transition-colors"
        >
          Tüm Koleksiyonu Gör
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </Container>
  );
}
