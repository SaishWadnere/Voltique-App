import { ArrowRight, Zap } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../store/slices/cartSlice';
import { addOrder } from '../../store/slices/userSlice';
import { addToast } from '../../store/slices/uiSlice';

export default function OrderSummary() {
  const { items } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const tax = subtotal * 0.09;
  const total = subtotal + tax;

  return (
    <div className="sticky top-28 space-y-6">
      <div className="bg-surface-low rounded-[28px] p-8">
        <h3 className="text-xl font-bold text-primary mb-6">Order Summary</h3>
        {items.length === 0 ? (
          <p className="text-sm text-on-surface-variant">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-5 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-high shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary">{item.product.name}</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">{item.product.categoryLabel}</p>
                    <p className="text-sm font-bold text-primary mt-1">${item.product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-outline-variant/10 pt-4 space-y-3">
              <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Shipping</span><span className="font-bold">FREE</span></div>
              <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Tax</span><span>${tax.toFixed(2)}</span></div>
            </div>
            <div className="border-t border-outline-variant/10 pt-4 mt-4 flex justify-between items-baseline">
              <span className="font-bold">TOTAL</span>
              <span className="text-2xl font-black">${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => {
                const newOrder = {
                  id: Math.random().toString(36).substring(2, 9),
                  orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
                  productName: items.length === 1 ? items[0].product.name : `${items[0].product.name} +${items.length - 1} more`,
                  orderDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                  status: 'processing' as const
                };
                dispatch(addOrder(newOrder));
                dispatch(clearCart());
                dispatch(addToast({ message: 'Order placed successfully! Secure transmission initiated.', type: 'success' }));
                navigate('/account');
              }}
              className="w-full flex items-center justify-center gap-3 mt-6 py-4 bg-primary text-on-primary rounded-full text-sm font-bold uppercase tracking-wider hover:scale-[1.02] transition-all cursor-pointer"
            >
              Place Order <ArrowRight size={16} />
            </button>
            <p className="text-center text-[10px] text-on-surface-variant uppercase tracking-widest mt-3">Secure Encrypted Checkout</p>
          </>
        )}
      </div>
      <div className="bg-tertiary rounded-[20px] p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-on-tertiary/10 flex items-center justify-center shrink-0"><Zap size={18} /></div>
        <div>
          <h4 className="text-sm font-bold text-on-tertiary">Voltique Prime Member</h4>
          <p className="text-xs text-on-tertiary/70">You're saving $45.00 on this order</p>
        </div>
      </div>
    </div>
  );
}
