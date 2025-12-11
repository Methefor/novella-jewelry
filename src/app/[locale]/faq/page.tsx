'use client';

// src/app/[locale]/faq/page.tsx
// NOVELLA - Sıkça Sorulan Sorular Sayfası

import { useLocale, useTranslations } from '@/lib/i18n-client';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  CreditCard,
  Gem,
  HelpCircle,
  RotateCcw,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { cn } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// FAQ kategorileri ve soruları
const faqCategories = [
  {
    key: 'ordering',
    icon: ShoppingBag,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    questions: ['howToOrder'],
  },
  {
    key: 'shipping',
    icon: Truck,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    questions: ['shippingTime', 'shippingCost', 'tracking'],
  },
  {
    key: 'payment',
    icon: CreditCard,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    questions: ['paymentMethods'],
  },
  {
    key: 'returns',
    icon: RotateCcw,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    questions: ['returnPolicy', 'returnProcess'],
  },
  {
    key: 'products',
    icon: Gem,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
    questions: ['productQuality', 'allergies', 'giftPackaging'],
  },
];

// Accordion Item Component
function AccordionItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={onClick}
        className="w-full py-5 flex items-center justify-between text-left hover:text-primary transition-colors"
      >
        <span className="font-medium pr-8">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted-foreground leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const t = useTranslations('faq');
  const locale = useLocale();

  const breadcrumbItems = [{ label: t('title') }];

  const [openItems, setOpenItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItems((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  // Tüm sorular düz liste olarak
  const allQuestions = faqCategories.flatMap((category) =>
    category.questions.map((q) => ({
      key: q,
      categoryKey: category.key,
      categoryIcon: category.icon,
      categoryColor: category.color,
      categoryBgColor: category.bgColor,
    }))
  );

  // Filtrelenmiş sorular
  const filteredQuestions = activeCategory
    ? allQuestions.filter((q) => q.categoryKey === activeCategory)
    : allQuestions;

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-muted/50 to-background pt-8 pb-16">
        <Container>
          <Breadcrumb items={breadcrumbItems} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-muted-foreground">{t('description')}</p>
          </motion.div>
        </Container>
      </Section>

      {/* Categories Filter */}
      <Section className="py-8 border-b">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                activeCategory === null
                  ? 'bg-primary text-white'
                  : 'bg-muted hover:bg-muted/80 text-foreground'
              )}
            >
              {locale === 'tr' ? 'Tümü' : 'All'}
            </button>
            {faqCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2',
                    activeCategory === category.key
                      ? 'bg-primary text-white'
                      : 'bg-muted hover:bg-muted/80 text-foreground'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {t(`categories.${category.key}`)}
                </button>
              );
            })}
          </motion.div>
        </Container>
      </Section>

      {/* FAQ List */}
      <Section className="py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div className="card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory || 'all'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {filteredQuestions.map((q, index) => {
                    const Icon = q.categoryIcon;
                    return (
                      <div key={q.key}>
                        {/* Category indicator for mixed view */}
                        {!activeCategory &&
                          index > 0 &&
                          filteredQuestions[index - 1].categoryKey !==
                            q.categoryKey && (
                            <div className="flex items-center gap-2 pt-6 pb-2">
                              <div
                                className={cn(
                                  'w-6 h-6 rounded flex items-center justify-center',
                                  q.categoryBgColor
                                )}
                              >
                                <Icon
                                  className={cn('w-3.5 h-3.5', q.categoryColor)}
                                />
                              </div>
                              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                {t(`categories.${q.categoryKey}`)}
                              </span>
                            </div>
                          )}
                        {!activeCategory && index === 0 && (
                          <div className="flex items-center gap-2 pb-2">
                            <div
                              className={cn(
                                'w-6 h-6 rounded flex items-center justify-center',
                                q.categoryBgColor
                              )}
                            >
                              <Icon
                                className={cn('w-3.5 h-3.5', q.categoryColor)}
                              />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              {t(`categories.${q.categoryKey}`)}
                            </span>
                          </div>
                        )}
                        <AccordionItem
                          question={t(`questions.${q.key}.question`)}
                          answer={t(`questions.${q.key}.answer`)}
                          isOpen={openItems.includes(q.key)}
                          onClick={() => toggleItem(q.key)}
                        />
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-muted-foreground mb-8">{t('cta.description')}</p>
            <Link href={`/${locale}/contact`}>
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                {t('cta.button')}
              </Button>
            </Link>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
