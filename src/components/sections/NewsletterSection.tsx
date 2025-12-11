'use client';

import { useTranslations } from '@/lib/i18n-client';
import { motion } from 'framer-motion';
import { Check, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

import { Button, Container, Section } from '@/components/ui';

export function NewsletterSection() {
  const t = useTranslations('newsletter');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <Section className="bg-muted/50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-14 h-14 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <Sparkles className="w-7 h-7 text-primary" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            {t('title')}
          </h2>

          <p className="text-muted-foreground mb-8">{t('description')}</p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('placeholder')}
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitted}
              className="group"
            >
              {isSubmitted ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  {t('success')}
                </>
              ) : (
                <>
                  {t('button')}
                  <Send className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground">{t('privacy')}</p>
        </motion.div>
      </Container>
    </Section>
  );
}
