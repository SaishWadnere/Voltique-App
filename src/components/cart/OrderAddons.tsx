import { Shield, Leaf } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { toggleAddon } from '../../store/slices/cartSlice';

export default function OrderAddons() {
  const dispatch = useAppDispatch();
  const addons = useAppSelector((s) => s.cart.addons);

  const icons: Record<string, typeof Shield> = {
    warranty: Shield,
    eco: Leaf,
  };

  return (
    <div className="mt-10">
      <h3 className="text-label-uppercase text-on-surface tracking-widest mb-5">Order Add-Ons</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addons.map((addon) => {
          const Icon = icons[addon.id] || Shield;
          return (
            <button
              key={addon.id}
              onClick={() => dispatch(toggleAddon(addon.id))}
              className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 text-left ${
                addon.selected
                  ? 'border-secondary bg-secondary/5'
                  : 'border-outline-variant/15 hover:border-outline-variant/30'
              }`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                addon.selected ? 'bg-secondary text-white' : 'bg-surface-low text-on-surface-variant'
              }`}>
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-primary">{addon.name}</h4>
                <p className="text-xs text-on-surface-variant">{addon.description}</p>
              </div>
              <span className="text-sm font-bold text-primary shrink-0">
                {addon.price > 0 ? `+$${addon.price}` : 'Free'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
