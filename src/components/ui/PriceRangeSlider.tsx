'use client';

// src/components/ui/PriceRangeSlider.tsx
// NOVELLA - Fiyat Aralığı Slider Bileşeni

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatPrice?: (value: number) => string;
  label?: string;
  presets?: { label: string; range: [number, number] }[];
  className?: string;
}

export function PriceRangeSlider({
  min,
  max,
  step = 10,
  value,
  onChange,
  formatPrice = (v) => `${v} ₺`,
  label,
  presets,
  className,
}: PriceRangeSliderProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Sync with external value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Calculate percentage position
  const getPercent = useCallback(
    (val: number) => Math.round(((val - min) / (max - min)) * 100),
    [min, max]
  );

  // Handle min thumb change
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), localValue[1] - step);
    const clampedMin = Math.max(min, newMin);
    setLocalValue([clampedMin, localValue[1]]);
  };

  // Handle max thumb change
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), localValue[0] + step);
    const clampedMax = Math.min(max, newMax);
    setLocalValue([localValue[0], clampedMax]);
  };

  // Commit changes on drag end
  const handleDragEnd = () => {
    setIsDragging(null);
    if (localValue[0] !== value[0] || localValue[1] !== value[1]) {
      onChange(localValue);
    }
  };

  // Handle preset click
  const handlePresetClick = (range: [number, number]) => {
    const clampedRange: [number, number] = [
      Math.max(min, range[0]),
      Math.min(max, range[1]),
    ];
    setLocalValue(clampedRange);
    onChange(clampedRange);
  };

  // Check if a preset is active
  const isPresetActive = (range: [number, number]) => {
    return localValue[0] === range[0] && localValue[1] === range[1];
  };

  const minPercent = getPercent(localValue[0]);
  const maxPercent = getPercent(localValue[1]);

  return (
    <div className={cn('w-full', className)}>
      {/* Label and Current Value */}
      {label && (
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {label}
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={`${localValue[0]}-${localValue[1]}`}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15 }}
              className="text-sm font-semibold text-gold dark:text-gold-dark"
            >
              {formatPrice(localValue[0])} - {formatPrice(localValue[1])}
            </motion.span>
          </AnimatePresence>
        </div>
      )}

      {/* Slider Container */}
      <div ref={sliderRef} className="relative h-8 flex items-center px-2">
        {/* Track Background */}
        <div className="absolute left-2 right-2 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700" />

        {/* Active Track */}
        <motion.div
          className="absolute h-1.5 rounded-full bg-gradient-to-r from-gold to-rose-gold dark:from-gold-dark dark:to-rose-gold"
          style={{
            left: `calc(${minPercent}% + 8px)`,
            width: `calc(${maxPercent - minPercent}%)`,
          }}
          layout
          transition={{ duration: 0.1 }}
        />

        {/* Min Thumb Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[0]}
          onChange={handleMinChange}
          onMouseDown={() => setIsDragging('min')}
          onMouseUp={handleDragEnd}
          onTouchStart={() => setIsDragging('min')}
          onTouchEnd={handleDragEnd}
          className={cn(
            'price-range-slider absolute left-0 right-0 h-8 w-full cursor-pointer appearance-none bg-transparent',
            '[&::-webkit-slider-thumb]:pointer-events-auto',
            '[&::-webkit-slider-thumb]:relative',
            '[&::-webkit-slider-thumb]:appearance-none',
            '[&::-webkit-slider-thumb]:h-5',
            '[&::-webkit-slider-thumb]:w-5',
            '[&::-webkit-slider-thumb]:rounded-full',
            '[&::-webkit-slider-thumb]:border-2',
            '[&::-webkit-slider-thumb]:border-gold',
            '[&::-webkit-slider-thumb]:bg-white',
            '[&::-webkit-slider-thumb]:shadow-md',
            '[&::-webkit-slider-thumb]:transition-transform',
            '[&::-webkit-slider-thumb]:duration-150',
            '[&::-webkit-slider-thumb]:hover:scale-110',
            '[&::-webkit-slider-thumb]:active:scale-95',
            'dark:[&::-webkit-slider-thumb]:border-gold-dark',
            'dark:[&::-webkit-slider-thumb]:bg-neutral-800',
            // Firefox
            '[&::-moz-range-thumb]:pointer-events-auto',
            '[&::-moz-range-thumb]:appearance-none',
            '[&::-moz-range-thumb]:h-5',
            '[&::-moz-range-thumb]:w-5',
            '[&::-moz-range-thumb]:rounded-full',
            '[&::-moz-range-thumb]:border-2',
            '[&::-moz-range-thumb]:border-gold',
            '[&::-moz-range-thumb]:bg-white',
            '[&::-moz-range-thumb]:shadow-md',
            'dark:[&::-moz-range-thumb]:border-gold-dark',
            'dark:[&::-moz-range-thumb]:bg-neutral-800'
          )}
          style={{
            zIndex: isDragging === 'min' ? 5 : localValue[0] > max - 100 ? 5 : 3,
            pointerEvents: 'none',
          }}
          aria-label="Minimum fiyat"
        />

        {/* Max Thumb Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[1]}
          onChange={handleMaxChange}
          onMouseDown={() => setIsDragging('max')}
          onMouseUp={handleDragEnd}
          onTouchStart={() => setIsDragging('max')}
          onTouchEnd={handleDragEnd}
          className={cn(
            'price-range-slider absolute left-0 right-0 h-8 w-full cursor-pointer appearance-none bg-transparent',
            '[&::-webkit-slider-thumb]:pointer-events-auto',
            '[&::-webkit-slider-thumb]:relative',
            '[&::-webkit-slider-thumb]:appearance-none',
            '[&::-webkit-slider-thumb]:h-5',
            '[&::-webkit-slider-thumb]:w-5',
            '[&::-webkit-slider-thumb]:rounded-full',
            '[&::-webkit-slider-thumb]:border-2',
            '[&::-webkit-slider-thumb]:border-gold',
            '[&::-webkit-slider-thumb]:bg-white',
            '[&::-webkit-slider-thumb]:shadow-md',
            '[&::-webkit-slider-thumb]:transition-transform',
            '[&::-webkit-slider-thumb]:duration-150',
            '[&::-webkit-slider-thumb]:hover:scale-110',
            '[&::-webkit-slider-thumb]:active:scale-95',
            'dark:[&::-webkit-slider-thumb]:border-gold-dark',
            'dark:[&::-webkit-slider-thumb]:bg-neutral-800',
            // Firefox
            '[&::-moz-range-thumb]:pointer-events-auto',
            '[&::-moz-range-thumb]:appearance-none',
            '[&::-moz-range-thumb]:h-5',
            '[&::-moz-range-thumb]:w-5',
            '[&::-moz-range-thumb]:rounded-full',
            '[&::-moz-range-thumb]:border-2',
            '[&::-moz-range-thumb]:border-gold',
            '[&::-moz-range-thumb]:bg-white',
            '[&::-moz-range-thumb]:shadow-md',
            'dark:[&::-moz-range-thumb]:border-gold-dark',
            'dark:[&::-moz-range-thumb]:bg-neutral-800'
          )}
          style={{
            zIndex: isDragging === 'max' ? 5 : 4,
            pointerEvents: 'none',
          }}
          aria-label="Maksimum fiyat"
        />
      </div>

      {/* Min/Max Labels */}
      <div className="mt-1 flex justify-between px-2 text-xs text-neutral-500 dark:text-neutral-400">
        <span>{formatPrice(min)}</span>
        <span>{formatPrice(max)}</span>
      </div>

      {/* Quick Select Presets */}
      {presets && presets.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {presets.map((preset, index) => (
            <button
              key={index}
              onClick={() => handlePresetClick(preset.range)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200',
                isPresetActive(preset.range)
                  ? 'border-gold bg-gold/10 text-gold dark:border-gold-dark dark:bg-gold-dark/10 dark:text-gold-dark'
                  : 'border-neutral-200 text-neutral-600 hover:border-gold/50 hover:text-gold dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-gold-dark/50 dark:hover:text-gold-dark'
              )}
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default PriceRangeSlider;
