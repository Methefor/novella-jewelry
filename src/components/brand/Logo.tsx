'use client';

import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className }: LogoProps) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <span
      className={cn(
        'font-serif font-bold tracking-wider text-foreground',
        sizes[size],
        className
      )}
    >
      N<span className="text-primary">O</span>
      VELLA
    </span>
  );
}
