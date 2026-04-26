import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartAddon, Product } from '../../types';
import { loadFromStorage } from '../localStorage';

interface CartState {
  items: CartItem[];
  addons: CartAddon[];
  promoCode: string;
  promoApplied: boolean;
}

const initialState: CartState = {
  items: loadFromStorage<CartItem[]>('voltique_cart', []),
  addons: [
    { id: 'warranty', name: 'Extended Warranty', description: '2 years full protection', price: 49, selected: false },
    { id: 'eco', name: 'Eco-Packaging', description: 'Biodegradable materials', price: 0, selected: false },
  ],
  promoCode: '',
  promoApplied: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find((i) => i.product.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find((i) => i.product.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
    },
    toggleAddon(state, action: PayloadAction<string>) {
      const addon = state.addons.find((a) => a.id === action.payload);
      if (addon) addon.selected = !addon.selected;
    },
    setPromoCode(state, action: PayloadAction<string>) {
      state.promoCode = action.payload;
    },
    applyPromo(state) {
      state.promoApplied = state.promoCode.toUpperCase() === 'VOLTIQUE20';
    },
    clearCart(state) {
      state.items = [];
      state.promoApplied = false;
      state.promoCode = '';
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, toggleAddon, setPromoCode, applyPromo, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
