import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { useAppSelector } from '../store/hooks';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import OrderAddons from '../components/cart/OrderAddons';

export default function CartPage() {
  const { items } = useAppSelector((s) => s.cart);
  const navigate = useNavigate();

  return (
    <main className="pt-24 pb-16">
      <div className="container-main">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors mb-6 cursor-pointer bg-transparent border-none p-0"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <span className="text-label-uppercase text-secondary tracking-widest">Your Selection</span>
        <h1 className="text-4xl md:text-5xl font-black text-primary mt-2 mb-10 tracking-tight">Shopping Cart.</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-primary mb-3">Your cart is empty</h2>
            <p className="text-on-surface-variant mb-6">Explore our collection of digital artifacts.</p>
            <Link to="/shop" className="btn-primary btn-primary-hover no-underline">Browse Shop</Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
              <OrderAddons />
            </div>
            <div className="lg:w-[380px] space-y-5">
              <CartSummary />
              <div className="bg-surface-low rounded-[20px] p-6">
                <h4 className="text-base font-bold text-primary mb-2">Need Assistance?</h4>
                <p className="text-sm text-on-surface-variant mb-3">Our digital concierges are available 24/7 for technical support.</p>
                <button className="flex items-center gap-2 text-sm font-medium text-secondary hover:underline">
                  <MessageCircle size={16} /> Chat with us
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
