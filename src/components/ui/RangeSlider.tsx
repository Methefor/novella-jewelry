'use client';

// src/components/ui/RangeSlider.tsx
// NOVELLA - Range Slider Bileşeni

import { cn } from '@/lib/utils';

interface RangeSliderProps {
  min: number;
  max: number;
  value: number;
  onChange?: (value: number) => void;
  step?: number;
  className?: string;
}

export function RangeSlider({
  min,
  max,
  value,
  onChange,
  step = 1,
  className,
}: RangeSliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange?.(newValue);
  };

  return (
    <div className={cn('w-full', className)}>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        step={step}
        className={cn(
          'w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700',
          // Thumb styling
          '[&::-webkit-slider-thumb]:appearance-none',
          '[&::-webkit-slider-thumb]:h-5',
          '[&::-webkit-slider-thumb]:w-5',
          '[&::-webkit-slider-thumb]:rounded-full',
          '[&::-webkit-slider-thumb]:bg-primary',
          '[&::-webkit-slider-thumb]:border-2',
          '[&::-webkit-slider-thumb]:border-primary',
          '[&::-webkit-slider-thumb]:shadow-md',
          '[&::-webkit-slider-thumb]:transition-transform',
          '[&::-webkit-slider-thumb]:duration-150',
          '[&::-webkit-slider-thumb]:hover:scale-110',
          '[&::-webkit-slider-thumb]:active:scale-95',
          'dark:[&::-webkit-slider-thumb]:bg-primary',
          'dark:[&::-webkit-slider-thumb]:border-primary',
          // Firefox
          '[&::-moz-range-thumb]:appearance-none',
          '[&::-moz-range-thumb]:h-5',
          '[&::-moz-range-thumb]:w-5',
          '[&::-moz-range-thumb]:rounded-full',
          '[&::-moz-range-thumb]:bg-primary',
          '[&::-moz-range-thumb]:border-2',
          '[&::-moz-range-thumb]:border-primary',
          '[&::-moz-range-thumb]:shadow-md',
          'dark:[&::-moz-range-thumb]:bg-primary',
          'dark:[&::-moz-range-thumb]:border-primary'
        )}
      />
    </div>
  );
}

export default RangeSlider;
