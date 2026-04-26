import { Link } from 'react-router-dom';
import { products } from '../../data/products';

const relatedIds = ['voltique-slate-v3', 'echo-chrono', 'void-book-16', 'ion-phone-ultra'];

export default function RelatedProducts() {
  const related = products.filter((p) => relatedIds.includes(p.id));

  return (
    <section className="mt-20 mb-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-label-uppercase text-secondary tracking-widest">Curated Selection</span>
          <h2 className="text-3xl font-black text-primary mt-1">The Extended Gallery.</h2>
        </div>
        <Link
          to="/shop"
          className="text-label-uppercase text-on-surface no-underline hover:text-secondary transition-colors border-b border-on-surface pb-0.5"
        >
          View All Artifacts
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {related.map((product, i) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group no-underline animate-fade-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="rounded-[24px] overflow-hidden bg-surface-low aspect-square mb-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">
              {product.categoryLabel}
            </span>
            <h4 className="text-sm font-bold text-primary mt-0.5">{product.name}</h4>
            <span className="text-sm font-bold text-secondary">${product.price.toLocaleString()}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
