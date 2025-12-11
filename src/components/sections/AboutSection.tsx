'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles, Award, Users } from 'lucide-react';
import { Container } from '@/components/ui';

interface AboutSectionProps {
  locale: string;
}

const features = [
  {
    icon: Heart,
    title: 'Kaliteli Malzeme',
    description: 'Gold plated ve sterling silver malzemelerle üretilmiş kaliteli ürünler',
  },
  {
    icon: Sparkles,
    title: 'Özgün Tasarım',
    description: 'Trend takibi yapan, özgün ve modern tasarımlar',
  },
  {
    icon: Award,
    title: 'Otantik Ürünler',
    description: 'Her ürün orijinallik garantisi ile gönderilir',
  },
  {
    icon: Users,
    title: 'Müşteri Odaklı',
    description: 'Müşteri memnuniyeti bizim için her şeyden önemli',
  },
];

export function AboutSection({ locale }: AboutSectionProps) {
  return (
    <Container>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-full">
            <Heart className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-medium text-[#D4AF37]">
              Hakkımızda
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold">
            Her Parça Bir Hikaye
          </h2>

          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              <span className="font-semibold text-[#D4AF37]">NOVELLA</span>, İtalyanca &quot;yeni hikaye&quot; anlamına gelir. 
              Her takı parçamız, sizin hikayenizin bir bölümü olmak için özenle tasarlandı.
            </p>
            <p>
              Tekirdağ&apos;dan yola çıkarak, butik ve özgün takı tasarımlarımızla 
              kadınların özel anlarına değer katmayı hedefliyoruz. Kaliteden 
              ödün vermeden, herkesin ulaşabileceği fiyatlarla lüks hissiyatı 
              yaşatıyoruz.
            </p>
            <p>
              Gold plated, rose gold ve sterling silver koleksiyonlarımızla, 
              her stile ve her anıza uygun parçalar sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
            <div>
              <div className="text-3xl font-bold text-[#D4AF37]">200+</div>
              <div className="text-sm text-muted-foreground">Ürün Çeşidi</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#D4AF37]">1000+</div>
              <div className="text-sm text-muted-foreground">Mutlu Müşteri</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#D4AF37]">4.9/5</div>
              <div className="text-sm text-muted-foreground">Müşteri Puanı</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-card rounded-2xl border border-border/50 hover:border-[#D4AF37]/50 transition-all hover:shadow-lg group"
              >
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
                  <Icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-20 p-8 md:p-12 bg-gradient-to-br from-[#D4AF37]/10 to-[#B76E79]/10 rounded-3xl border border-[#D4AF37]/20"
      >
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold">
            Değerlerimiz
          </h3>
          <p className="text-lg text-muted-foreground">
            NOVELLA olarak, her müşterimizin özel olduğuna inanıyoruz. 
            Kaliteli ürünler, uygun fiyatlar ve mükemmel müşteri hizmeti 
            sunarak, sizin hikayenizin bir parçası olmaktan gurur duyuyoruz.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {['Kalite', 'Özgünlük', 'Güven', 'Şeffaflık', 'Müşteri Memnuniyeti'].map((value) => (
              <span
                key={value}
                className="px-4 py-2 bg-card rounded-full text-sm font-medium border border-border/50"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Container>
  );
}
