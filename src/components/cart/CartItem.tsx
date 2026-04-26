import { Minus, Plus, Trash2 } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice';
import type { CartItem as CartItemType } from '../../types';
import { Link } from 'react-router-dom';

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col sm:flex-row gap-6 py-8 border-b border-outline-variant/10">
      {/* Image */}
      <Link to={`/product/${item.product.id}`} className="w-36 h-36 rounded-2xl overflow-hidden bg-surface-low shrink-0">
        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
      </Link>

      {/* Details */}
      <div className="flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1">
          <span className="text-label-uppercase text-on-surface-variant tracking-widest">
            {item.product.categoryLabel}
          </span>
          <h3 className="text-lg font-bold text-primary mt-1">{item.product.name}</h3>
          <p className="text-sm text-on-surface-variant mt-1 line-clamp-1">{item.product.shortDescription}</p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center border border-on-surface/10 rounded-full">
              <button
                onClick={() => dispatch(updateQuantity({ id: item.product.id, quantity: Math.max(1, item.quantity - 1) }))}
                className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
              <button
                onClick={() => dispatch(updateQuantity({ id: item.product.id, quantity: item.quantity + 1 }))}
                className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Price + Remove */}
        <div className="flex sm:flex-col items-center sm:items-end gap-4">
          <span className="text-xl font-bold text-primary">${(item.product.price * item.quantity).toFixed(2)}</span>
          <button
            onClick={() => dispatch(removeFromCart(item.product.id))}
            className="flex items-center gap-1.5 text-red-500 text-xs font-semibold uppercase tracking-wider hover:text-red-600 transition-colors"
          >
            <Trash2 size={14} /> Remove
          </button>
        </div>
      </div>
    </div>
  );
}
