'use client';

// src/components/product/PriceRangeSlider.tsx
// NOVELLA - Fiyat Aralığı Slider Bileşeni (Ürün Filtreleme İçin)

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

interface PriceRangeSliderProps {
  min?: number;
  max?: number;
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (range: [number, number]) => void;
  onUpdateComplete?: (range: [number, number]) => void; // Debounce sonrası
  step?: number;
  className?: string;
  showValues?: boolean;
  currency?: string;
  formatPrice?: (value: number) => string;
  label?: string;
  presets?: { label: string; range: [number, number] }[];
}

export function PriceRangeSlider({
  min = 50,
  max = 2000,
  value,
  defaultValue = [50, 2000],
  onChange,
  onUpdateComplete,
  step = 10,
  className,
  showValues = true,
  currency = '₺',
  formatPrice = (v) => `${v} ${currency}`,
  label,
  presets,
}: PriceRangeSliderProps) {
  const [localValue, setLocalValue] = useState<[number, number]>(
    value || defaultValue
  );
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Debounce için
  const DEBOUNCE_DELAY = 300;

  // Sync with external value
  useEffect(() => {
    if (value) {
      setLocalValue(value);
    }
  }, [value]);

  // Debounced onUpdateComplete
  const debouncedUpdateComplete = useCallback(
    (range: [number, number]) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        onUpdateComplete?.(range);
      }, DEBOUNCE_DELAY);
    },
    [onUpdateComplete]
  );

  // Calculate percentage position
  const getPercent = useCallback(
    (val: number) => Math.round(((val - min) / (max - min)) * 100),
    [min, max]
  );

  // Handle min thumb change
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), localValue[1] - step);
    const clampedMin = Math.max(min, newMin);
    const newRange: [number, number] = [clampedMin, localValue[1]];
    setLocalValue(newRange);
    onChange?.(newRange);
    debouncedUpdateComplete(newRange);
  };

  // Handle max thumb change
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), localValue[0] + step);
    const clampedMax = Math.min(max, newMax);
    const newRange: [number, number] = [localValue[0], clampedMax];
    setLocalValue(newRange);
    onChange?.(newRange);
    debouncedUpdateComplete(newRange);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(null);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, type: 'min' | 'max') => {
    const increment = step;
    let newValue = type === 'min' ? localValue[0] : localValue[1];

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(min, newValue - increment);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(max, newValue + increment);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }

    e.preventDefault();

    const newRange: [number, number] =
      type === 'min'
        ? [Math.min(newValue, localValue[1] - step), localValue[1]]
        : [localValue[0], Math.max(newValue, localValue[0] + step)];

    setLocalValue(newRange);
    onChange?.(newRange);
    debouncedUpdateComplete(newRange);
  };

  const minPercent = getPercent(localValue[0]);
  const maxPercent = getPercent(localValue[1]);

  return (
    <div className={cn('w-full', className)}>
      {/* Current Value Display */}
      {showValues && (
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {label || 'Fiyat Aralığı'}
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={`${localValue[0]}-${localValue[1]}`}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15 }}
              className="text-sm font-semibold text-[#D4AF37] dark:text-[#D4AF37]"
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
          className="absolute h-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] dark:from-[#D4AF37] dark:to-[#D4AF37]"
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
          onKeyDown={(e) => handleKeyDown(e, 'min')}
          className={cn(
            'price-range-slider absolute left-0 right-0 h-8 w-full cursor-pointer appearance-none bg-transparent',
            '[&::-webkit-slider-thumb]:pointer-events-auto',
            '[&::-webkit-slider-thumb]:relative',
            '[&::-webkit-slider-thumb]:appearance-none',
            '[&::-webkit-slider-thumb]:h-5',
            '[&::-webkit-slider-thumb]:w-5',
            '[&::-webkit-slider-thumb]:rounded-full',
            '[&::-webkit-slider-thumb]:border-2',
            '[&::-webkit-slider-thumb]:border-[#D4AF37]',
            '[&::-webkit-slider-thumb]:bg-white',
            '[&::-webkit-slider-thumb]:shadow-md',
            '[&::-webkit-slider-thumb]:transition-transform',
            '[&::-webkit-slider-thumb]:duration-150',
            '[&::-webkit-slider-thumb]:hover:scale-110',
            '[&::-webkit-slider-thumb]:active:scale-95',
            '[&::-webkit-slider-thumb]:focus:outline-none',
            '[&::-webkit-slider-thumb]:focus:ring-2',
            '[&::-webkit-slider-thumb]:focus:ring-[#D4AF37]/50',
            'dark:[&::-webkit-slider-thumb]:border-[#D4AF37]',
            'dark:[&::-webkit-slider-thumb]:bg-neutral-800',
            // Firefox
            '[&::-moz-range-thumb]:pointer-events-auto',
            '[&::-moz-range-thumb]:appearance-none',
            '[&::-moz-range-thumb]:h-5',
            '[&::-moz-range-thumb]:w-5',
            '[&::-moz-range-thumb]:rounded-full',
            '[&::-moz-range-thumb]:border-2',
            '[&::-moz-range-thumb]:border-[#D4AF37]',
            '[&::-moz-range-thumb]:bg-white',
            '[&::-moz-range-thumb]:shadow-md',
            '[&::-moz-range-thumb]:focus:outline-none',
            'dark:[&::-moz-range-thumb]:border-[#D4AF37]',
            'dark:[&::-moz-range-thumb]:bg-neutral-800'
          )}
          style={{
            zIndex:
              isDragging === 'min' ? 5 : localValue[0] > max - 100 ? 5 : 3,
            pointerEvents: 'none',
          }}
          aria-label="Minimum fiyat"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={localValue[0]}
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
          onKeyDown={(e) => handleKeyDown(e, 'max')}
          className={cn(
            'price-range-slider absolute left-0 right-0 h-8 w-full cursor-pointer appearance-none bg-transparent',
            '[&::-webkit-slider-thumb]:pointer-events-auto',
            '[&::-webkit-slider-thumb]:relative',
            '[&::-webkit-slider-thumb]:appearance-none',
            '[&::-webkit-slider-thumb]:h-5',
            '[&::-webkit-slider-thumb]:w-5',
            '[&::-webkit-slider-thumb]:rounded-full',
            '[&::-webkit-slider-thumb]:border-2',
            '[&::-webkit-slider-thumb]:border-[#D4AF37]',
            '[&::-webkit-slider-thumb]:bg-white',
            '[&::-webkit-slider-thumb]:shadow-md',
            '[&::-webkit-slider-thumb]:transition-transform',
            '[&::-webkit-slider-thumb]:duration-150',
            '[&::-webkit-slider-thumb]:hover:scale-110',
            '[&::-webkit-slider-thumb]:active:scale-95',
            '[&::-webkit-slider-thumb]:focus:outline-none',
            '[&::-webkit-slider-thumb]:focus:ring-2',
            '[&::-webkit-slider-thumb]:focus:ring-[#D4AF37]/50',
            'dark:[&::-webkit-slider-thumb]:border-[#D4AF37]',
            'dark:[&::-webkit-slider-thumb]:bg-neutral-800',
            // Firefox
            '[&::-moz-range-thumb]:pointer-events-auto',
            '[&::-moz-range-thumb]:appearance-none',
            '[&::-moz-range-thumb]:h-5',
            '[&::-moz-range-thumb]:w-5',
            '[&::-moz-range-thumb]:rounded-full',
            '[&::-moz-range-thumb]:border-2',
            '[&::-moz-range-thumb]:border-[#D4AF37]',
            '[&::-moz-range-thumb]:bg-white',
            '[&::-moz-range-thumb]:shadow-md',
            '[&::-moz-range-thumb]:focus:outline-none',
            'dark:[&::-moz-range-thumb]:border-[#D4AF37]',
            'dark:[&::-moz-range-thumb]:bg-neutral-800'
          )}
          style={{
            zIndex: isDragging === 'max' ? 5 : 4,
            pointerEvents: 'none',
          }}
          aria-label="Maksimum fiyat"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={localValue[1]}
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
              onClick={() => {
                const clampedRange: [number, number] = [
                  Math.max(min, preset.range[0]),
                  Math.min(max, preset.range[1]),
                ];
                setLocalValue(clampedRange);
                onChange?.(clampedRange);
                debouncedUpdateComplete(clampedRange);
              }}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200',
                localValue[0] === preset.range[0] &&
                  localValue[1] === preset.range[1]
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] dark:border-[#D4AF37] dark:bg-[#D4AF37]/10 dark:text-[#D4AF37]'
                  : 'border-neutral-200 text-neutral-600 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-[#D4AF37]/50 dark:hover:text-[#D4AF37]'
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
