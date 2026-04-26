import { Truck, Shield, Lock } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const badges = [
  {
    icon: Truck,
    title: 'Express Delivery',
    description: 'Same-day shipping for all artifacts ordered before 2PM. Global trackable transit.',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
  {
    icon: Shield,
    title: '2-Year Warranty',
    description: 'Comprehensive technical support and artifact replacement guarantee.',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
  {
    icon: Lock,
    title: 'Encryption Security',
    description: 'End-to-end encrypted checkout and secure biometric payment methods.',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
];

export default function TrustBadges() {
  return (
    <section className="py-16 bg-surface">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {badges.map((badge, i) => (
            <ScrollReveal key={badge.title} delay={i * 100} className="h-full">
              <div
                className="bg-white h-full rounded-[24px] p-8 hover:shadow-hover transition-all duration-500"
              >
              <div className={`w-12 h-12 ${badge.bg} rounded-2xl flex items-center justify-center mb-5`}>
                <badge.icon size={22} className={badge.color} />
              </div>
              <h3 className="text-base font-bold text-primary mb-2">{badge.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{badge.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
