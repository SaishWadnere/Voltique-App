import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import { addToast } from '../../store/slices/uiSlice';
import { products } from '../../data/products';
import { Link } from 'react-router-dom';
import ScrollReveal from '../ui/ScrollReveal';

const trendingIds = ['p1', 'p5', 'p9'];

export default function TrendingNow() {
  const dispatch = useAppDispatch();
  const trendingProducts = products.filter((p) => trendingIds.includes(p.id));

  const handleAddToCart = (product: typeof trendingProducts[0]) => {
    dispatch(addToCart(product));
    dispatch(addToast({ message: `${product.name} added to cart`, type: 'success' }));
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Trending Now</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingProducts.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 150} className="h-full">
              <div
                className="group h-full flex flex-col bg-surface-lowest rounded-[28px] overflow-hidden shadow-card hover:shadow-hover transition-all duration-500"
              >
              <Link to={`/product/${product.id}`} className="block relative aspect-[4/3] overflow-hidden bg-surface-low">
                {product.badge && (
                  <span className={`absolute top-4 left-4 z-10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                    product.badge === 'BESTSELLER' ? 'bg-primary text-on-primary' :
                    product.badge === 'NEW' ? 'bg-tertiary text-on-tertiary' :
                    'bg-secondary text-on-secondary'
                  }`}>
                    {product.badge}
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </Link>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <Link to={`/product/${product.id}`} className="text-lg font-bold text-primary no-underline hover:text-secondary transition-colors">
                    {product.name}
                  </Link>
                  <span className="text-lg font-bold text-primary">${product.price}</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-5 line-clamp-2">
                  {product.shortDescription}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full py-3 px-6 bg-white border border-on-surface/10 rounded-full text-sm font-medium text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
