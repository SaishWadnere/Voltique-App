import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import type { Product } from '../../types';

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((s) => s.wishlist.items);
  const isWished = wishlist.includes(product.id);

  return (
    <div
      className="group bg-white rounded-[24px] overflow-hidden shadow-card hover:shadow-hover transition-all duration-500 animate-fade-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Image */}
      <Link
        to={`/product/${product.id}`}
        className="block relative aspect-square overflow-hidden bg-surface-low"
      >
        {product.badge && (
          <span className={`absolute top-4 left-4 z-10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
            product.badge === 'NEW RELEASE' ? 'bg-primary text-on-primary' :
            product.badge === 'POPULAR' ? 'bg-tertiary text-on-tertiary' :
            product.badge === 'NEW' ? 'bg-tertiary text-on-tertiary' :
            product.badge === 'BESTSELLER' ? 'bg-primary text-on-primary' :
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
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(toggleWishlist(product.id));
          }}
          className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            isWished
              ? 'bg-secondary text-white'
              : 'bg-white/80 backdrop-blur-md text-on-surface-variant hover:bg-white hover:text-secondary'
          }`}
        >
          <Heart size={16} fill={isWished ? 'currentColor' : 'none'} />
        </button>
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <Link
            to={`/product/${product.id}`}
            className="text-sm font-bold text-primary no-underline hover:text-secondary transition-colors line-clamp-2 leading-tight"
          >
            {product.name}
          </Link>
          <span className="text-sm font-bold text-primary whitespace-nowrap">${product.price.toLocaleString()}</span>
        </div>
        <p className="text-xs text-on-surface-variant leading-relaxed mb-3 line-clamp-1">
          {product.shortDescription}
        </p>

        {/* Extras */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill={i < Math.floor(product.rating) ? '#1a1a1a' : '#ddd'}
              >
                <path d="M6 0.5L7.76 4.06L11.7 4.64L8.85 7.43L9.53 11.35L6 9.5L2.47 11.35L3.15 7.43L0.3 4.64L4.24 4.06L6 0.5Z"/>
              </svg>
            ))}
            <span className="text-[10px] text-on-surface-variant ml-1">({product.reviewCount})</span>
          </div>
        )}

        {product.stock === 'in_stock' && (
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-secondary" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-secondary">In Stock</span>
          </div>
        )}
        {product.stock === 'low_stock' && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-red-500">
            Only {product.stockCount} left
          </span>
        )}
      </div>
    </div>
  );
}
