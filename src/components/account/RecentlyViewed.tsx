import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '../../data/products';

const recentIds = ['voltique-wave-gen2', 'echo-chrono', 'optic-z-prime', 'void-h1'];

export default function RecentlyViewed() {
  const recent = products.filter((p) => recentIds.includes(p.id));

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-bold text-primary">Recently Viewed</h3>
        <ArrowRight size={20} className="text-on-surface-variant cursor-pointer hover:text-primary transition-colors" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {recent.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="group no-underline">
            <div className="rounded-[20px] overflow-hidden bg-surface-low aspect-square mb-3">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">{product.categoryLabel}</span>
            <h4 className="text-sm font-bold text-primary mt-0.5">{product.name}</h4>
            <span className="text-sm font-bold text-primary">${product.price.toFixed(2)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
