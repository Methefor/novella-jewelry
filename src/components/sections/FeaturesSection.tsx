'use client';

import { useTranslations } from '@/lib/i18n-client';
import { motion } from 'framer-motion';
import { BadgeDollarSign, Gem, Headphones, Truck } from 'lucide-react';

import { Container, Section } from '@/components/ui';

const features = [
  { key: 'quality', icon: Gem, color: 'from-blue-500 to-cyan-500' },
  {
    key: 'price',
    icon: BadgeDollarSign,
    color: 'from-amber-500 to-yellow-500',
  },
  { key: 'shipping', icon: Truck, color: 'from-green-500 to-emerald-500' },
  { key: 'support', icon: Headphones, color: 'from-purple-500 to-pink-500' },
];

export function FeaturesSection() {
  const t = useTranslations('features');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Section>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            {t('title')}
          </h2>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.key}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative p-6 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300"
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="relative">
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4 shadow-lg`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t(`items.${feature.key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`items.${feature.key}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
