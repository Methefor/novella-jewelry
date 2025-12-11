'use client';

import { Container } from '@/components/ui';
import { motion, useAnimation } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Gold Necklace',
    price: 299,
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    category: 'necklaces',
  },
  {
    id: 2,
    name: 'Silver Bracelet',
    price: 249,
    image:
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop',
    category: 'bracelets',
  },
  {
    id: 3,
    name: 'Diamond Earrings',
    price: 399,
    image:
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    category: 'earrings',
  },
  {
    id: 4,
    name: 'Rose Gold Ring',
    price: 179,
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop',
    category: 'rings',
  },
  {
    id: 5,
    name: 'Pearl Necklace',
    price: 349,
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop',
    category: 'necklaces',
  },
  {
    id: 6,
    name: 'Crystal Bracelet',
    price: 199,
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&h=500&fit=crop',
    category: 'bracelets',
  },
  {
    id: 7,
    name: 'Stud Earrings',
    price: 149,
    image:
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500&h=500&fit=crop',
    category: 'earrings',
  },
  {
    id: 8,
    name: 'Vintage Ring',
    price: 279,
    image:
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500&h=500&fit=crop',
    category: 'rings',
  },
];

interface AutoScrollCarouselProps {
  title: string;
  locale: string;
}

export function AutoScrollCarousel({ title, locale }: AutoScrollCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();
  const products = [...mockProducts, ...mockProducts];

  useEffect(() => {
    const animate = async () => {
      if (!isPaused) {
        await controls.start({
          x: '-50%',
          transition: {
            duration: 30,
            ease: 'linear',
            repeat: Infinity,
          },
        });
      }
    };
    animate();
  }, [controls, isPaused]);

  return (
    <Container className="overflow-hidden">
      <div className="mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          {title}
        </h2>
      </div>

      <div className="relative -mx-4">
        <motion.div
          className="flex gap-4 md:gap-6"
          animate={controls}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {products.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="flex-none w-[240px] md:w-[280px] group"
            >
              <Link href={`/${locale}/products/${product.id}`}>
                <div className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-muted mb-3 md:mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute top-3 md:top-4 right-3 md:right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                      <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-base md:text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xl md:text-2xl font-bold text-primary">
                    {product.price} TL
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </Container>
  );
}
