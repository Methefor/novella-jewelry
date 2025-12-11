'use client';

import { useState } from 'react';
import { WhatsAppFloatButton } from './index';

interface WhatsAppWidgetProps {
  showFloatButton?: boolean;
  customMessage?: string;
  position?: 'bottom-right' | 'bottom-left';
  autoShow?: boolean;
  showDelay?: number;
}

export default function WhatsAppWidget({
  showFloatButton = true,
  customMessage,
  position = 'bottom-right',
  autoShow = true,
  showDelay = 2000,
}: WhatsAppWidgetProps) {
  const [isEnabled, setIsEnabled] = useState(true);

  // WhatsApp widget ana konteynerı
  if (!isEnabled) return null;

  return (
    <div className="whatsapp-widget">
      {/* Floating WhatsApp Button */}
      {showFloatButton && (
        <WhatsAppFloatButton
          position={position}
          customMessage={customMessage}
          onClick={() => {
            // İsteğe bağlı click tracking
            console.log('WhatsApp widget clicked');
          }}
        />
      )}
    </div>
  );
}

// Tüm sayfalarda kullanılacak global WhatsApp widget
export function GlobalWhatsAppWidget() {
  return (
    <WhatsAppWidget
      showFloatButton={true}
      position="bottom-right"
      autoShow={true}
    />
  );
}
