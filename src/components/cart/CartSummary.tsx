import { ArrowRight, CreditCard, Smartphone, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setPromoCode, applyPromo } from '../../store/slices/cartSlice';

export default function CartSummary() {
  const dispatch = useAppDispatch();
  const { items, addons, promoCode, promoApplied } = useAppSelector((s) => s.cart);

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const addonsTotal = addons.filter((a) => a.selected).reduce((sum, a) => sum + a.price, 0);
  const tax = (subtotal + addonsTotal) * 0.082;
  const total = subtotal + addonsTotal + tax;

  return (
    <div className="bg-primary text-on-primary rounded-[28px] p-8 sticky top-28">
      <h3 className="text-2xl font-black uppercase tracking-wide mb-8">Summary</h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-white/70">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/70">Estimated Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/70">Delivery</span>
          <span className="font-medium text-tertiary">Complimentary</span>
        </div>
      </div>

      <div className="border-t border-white/10 pt-5 mb-6">
        <div className="flex justify-between items-baseline">
          <span className="text-label-uppercase tracking-widest text-white/70">Total</span>
          <span className="text-3xl font-black">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Promo Code */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => dispatch(setPromoCode(e.target.value))}
          placeholder="Promo Code"
          className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors"
        />
        <button
          onClick={() => dispatch(applyPromo())}
          className="text-label-uppercase text-tertiary font-bold px-4 hover:text-white transition-colors"
        >
          Apply
        </button>
      </div>
      {promoApplied && (
        <p className="text-tertiary text-xs font-medium mb-4">✓ Promo code applied!</p>
      )}

      {/* CTA */}
      <Link
        to="/checkout"
        className="flex items-center justify-center gap-3 w-full py-4 bg-secondary hover:bg-secondary-hover text-white rounded-full text-base font-bold transition-all duration-300 no-underline hover:scale-[1.02]"
      >
        Proceed to Checkout <ArrowRight size={18} />
      </Link>

      <p className="text-center text-[10px] text-white/40 uppercase tracking-widest mt-4">
        Secured by Voltique Protocol
      </p>

      <div className="flex justify-center gap-3 mt-3">
        <CreditCard size={16} className="text-white/30" />
        <Smartphone size={16} className="text-white/30" />
        <ShieldCheck size={16} className="text-white/30" />
      </div>
    </div>
  );
}
