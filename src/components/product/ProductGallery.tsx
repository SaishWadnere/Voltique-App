import { useState } from 'react';
import type { Product } from '../../types';

interface Props {
  product: Product;
}

export default function ProductGallery({ product }: Props) {
  const images = product.images || [product.image];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative rounded-[28px] overflow-hidden bg-surface-low aspect-square">
        {product.badge && (
          <span className={`absolute top-5 left-5 z-10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${
            product.badge === 'LIMITED EDITION' ? 'bg-secondary text-on-secondary' :
            product.badge === 'NEW RELEASE' ? 'bg-primary text-on-primary' :
            'bg-tertiary text-on-tertiary'
          }`}>
            {product.badge}
          </span>
        )}
        <img
          src={images[activeIndex]}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.slice(0, 4).map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                activeIndex === i ? 'border-primary' : 'border-transparent hover:border-outline-variant/30'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
          {images.length > 4 && (
            <div className="w-20 h-20 rounded-2xl bg-on-surface flex items-center justify-center text-white text-sm font-bold">
              +{images.length - 4}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
