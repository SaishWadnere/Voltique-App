import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Truck, RotateCcw, Shield } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import { addToast } from '../../store/slices/uiSlice';
import type { Product } from '../../types';

interface Props {
  product: Product;
}

export default function ProductInfo({ product }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    dispatch(addToast({ message: `${product.name} added to cart`, type: 'success' }));
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-4">
        <Link to="/shop" className="hover:text-primary no-underline text-on-surface-variant">Shop</Link>
        <span>›</span>
        <Link to="/shop" className="hover:text-primary no-underline text-on-surface-variant capitalize">{product.category}</Link>
        <span>›</span>
        <span className="text-on-surface uppercase tracking-wider font-medium">{product.name}</span>
      </div>

      {/* Collection label */}
      <span className="text-label-uppercase text-secondary tracking-widest">Artifact Collection</span>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-black text-primary mt-2 mb-3 tracking-tight">
        {product.name.split(' ').slice(0, -1).join(' ')}{' '}
        <span className="text-primary">{product.name.split(' ').slice(-1)}</span>.
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-5">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 12 12" fill={i < Math.floor(product.rating) ? '#0051D5' : '#ddd'}>
              <path d="M6 0.5L7.76 4.06L11.7 4.64L8.85 7.43L9.53 11.35L6 9.5L2.47 11.35L3.15 7.43L0.3 4.64L4.24 4.06L6 0.5Z"/>
            </svg>
          ))}
        </div>
        <span className="text-xs text-on-surface-variant">{product.rating} ({product.reviewCount} Artifact Reviews)</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-3xl font-black text-primary">${product.price.toFixed(2)}</span>
        {product.originalPrice && (
          <span className="text-lg text-on-surface-variant line-through">${product.originalPrice.toFixed(2)}</span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-on-surface-variant leading-relaxed mb-6 max-w-md">
        {product.description?.slice(0, 200) || product.shortDescription || 'Experience the future of electronics with this premium artifact.'}
      </p>

      {/* Color Selector */}
      {product.colors && product.colors.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-label-uppercase text-on-surface-variant">Finish:</span>
            <span className="text-label-uppercase text-on-surface">{selectedColor}</span>
          </div>
          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-9 h-9 rounded-full border-3 transition-all ${
                  selectedColor === color.name
                    ? 'border-primary scale-110 ring-2 ring-primary/20'
                    : 'border-surface-high hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quantity + Add to Cart */}
      <div className="flex gap-3 mb-4">
        <div className="flex items-center gap-0 border border-on-surface/10 rounded-full">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="w-10 text-center text-sm font-medium">{String(quantity).padStart(2, '0')}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 btn-primary btn-primary-hover text-label-uppercase"
        >
          Add to Cart
        </button>
      </div>

      {/* Buy Now */}
      <button 
        onClick={() => {
          handleAddToCart();
          navigate('/checkout');
        }}
        className="w-full btn-blue mb-6 rounded-full"
      >
        Buy Artifact Now
      </button>

      {/* Trust Icons */}
      <div className="flex gap-4">
        {[
          { icon: Truck, label: 'Free Delivery' },
          { icon: RotateCcw, label: '30-Day Return' },
          { icon: Shield, label: '2YR Warranty' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-1.5 flex-1 py-3 rounded-2xl bg-surface-low">
            <Icon size={18} className="text-on-surface" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
