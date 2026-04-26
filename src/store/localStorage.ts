import type { Middleware } from '@reduxjs/toolkit';

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState() as { 
    cart: { items: unknown }; 
    wishlist: { items: unknown };
    user: { orders: unknown; addresses: unknown };
  };

  try {
    localStorage.setItem('voltique_cart', JSON.stringify(state.cart.items));
  } catch {}

  try {
    localStorage.setItem('voltique_wishlist', JSON.stringify(state.wishlist.items));
  } catch {}

  try {
    localStorage.setItem('voltique_orders', JSON.stringify(state.user.orders));
  } catch {}

  try {
    localStorage.setItem('voltique_addresses', JSON.stringify(state.user.addresses));
  } catch {}

  return result;
};

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored) as T;
  } catch {}
  return fallback;
}
