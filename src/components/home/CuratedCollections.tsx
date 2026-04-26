import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '../../data/products';
import ScrollReveal from '../ui/ScrollReveal';

export default function CuratedCollections() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-main">
        <div className="flex items-end justify-between mb-10">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-primary">Curated Collections</h2>
            <p className="text-on-surface-variant mt-2">Precision engineering for every digital niche.</p>
          </ScrollReveal>
          <Link
            to="/shop"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-secondary hover:text-secondary-hover transition-colors no-underline"
          >
            View All Categories <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.id} delay={i * 100} className="h-full">
              <Link
                to={`/shop?category=${cat.id}`}
                className="group block relative rounded-[28px] overflow-hidden aspect-[3/4] no-underline h-full"
              >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-xl font-bold">{cat.name}</h3>
                <p className="text-white/70 text-sm mt-0.5">{cat.subtitle}</p>
              </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
