'use client';

// src/components/ui/WhatsAppButton.tsx
// NOVELLA - WhatsApp Floating Button

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
}

export function WhatsAppButton({ 
  phoneNumber, 
  message = '',
  className 
}: WhatsAppButtonProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [hasSeenTooltip, setHasSeenTooltip] = useState(false);

  // İlk 3 saniye sonra tooltip göster
  useState(() => {
    const timer = setTimeout(() => {
      if (!hasSeenTooltip) {
        setIsTooltipVisible(true);
        setTimeout(() => {
          setIsTooltipVisible(false);
          setHasSeenTooltip(true);
        }, 5000);
      }
    }, 3000);

    return () => clearTimeout(timer);
  });

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}${message ? `?text=${encodedMessage}` : ''}`;
    window.open(whatsappUrl, '_blank');
  };

  const dismissTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTooltipVisible(false);
    setHasSeenTooltip(true);
  };

  return (
    <div className={cn('fixed bottom-4 left-4 z-50', className)}>
      {/* Tooltip */}
      <AnimatePresence>
        {isTooltipVisible && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            className="absolute bottom-full left-0 mb-3 w-64"
          >
            <div className="relative bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-4">
              {/* Arrow */}
              <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white dark:bg-neutral-800 border-r border-b border-neutral-200 dark:border-neutral-700 rotate-45" />
              
              {/* Close button */}
              <button
                onClick={dismissTooltip}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <X className="w-3 h-3 text-neutral-400" />
              </button>

              {/* Content */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-800 dark:text-neutral-100 text-sm">
                    Yardıma mı ihtiyacınız var?
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    WhatsApp üzerinden bize ulaşın, hemen yardımcı olalım!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className={cn(
          'w-14 h-14 rounded-full',
          'bg-green-500 hover:bg-green-600',
          'text-white',
          'shadow-lg shadow-green-500/30',
          'hover:shadow-xl hover:shadow-green-500/40',
          'flex items-center justify-center',
          'transition-all duration-300',
          'relative'
        )}
        aria-label="WhatsApp ile iletişime geç"
      >
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
        
        {/* WhatsApp Icon */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 relative z-10"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.button>
    </div>
  );
}

export default WhatsAppButton;
