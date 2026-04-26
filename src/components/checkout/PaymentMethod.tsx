import { useState } from 'react';
import { CreditCard, Smartphone, Lock } from 'lucide-react';

const methods = [
  { id: 'card', label: 'Card', icon: CreditCard },
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'paypal', label: 'PayPal', icon: CreditCard },
  { id: 'cod', label: 'COD', icon: CreditCard },
];

export default function PaymentMethod() {
  const [selected, setSelected] = useState('card');

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-sm font-bold">02</div>
        <h2 className="text-xl font-bold text-primary">Payment Method</h2>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-8">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelected(method.id)}
            className={`flex flex-col items-center gap-2 py-5 rounded-2xl border-2 transition-all cursor-pointer ${
              selected === method.id
                ? 'border-primary bg-white shadow-card'
                : 'border-outline-variant/15 hover:border-outline-variant/30'
            }`}
          >
            <method.icon size={20} className={selected === method.id ? 'text-primary' : 'text-on-surface-variant'} />
            <span className="text-[10px] font-semibold uppercase tracking-wider">{method.label}</span>
          </button>
        ))}
      </div>

      {selected === 'card' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-2">Card Number</label>
            <div className="relative">
              <input
                placeholder="0000 0000 0000 0000"
                className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm outline-none focus:border-secondary transition-colors text-on-surface placeholder:text-on-surface-variant/30 tracking-wider"
              />
              <Lock size={16} className="absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant/40" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-2">Expiry</label>
              <input
                placeholder="MM / YY"
                className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm outline-none focus:border-secondary transition-colors text-on-surface placeholder:text-on-surface-variant/30"
              />
            </div>
            <div>
              <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-2">CVV</label>
              <input
                type="password"
                placeholder="•••"
                className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm outline-none focus:border-secondary transition-colors text-on-surface placeholder:text-on-surface-variant/30"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
