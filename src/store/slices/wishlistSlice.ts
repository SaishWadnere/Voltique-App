import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loadFromStorage } from '../localStorage';

interface WishlistState {
  items: string[];
}

const initialState: WishlistState = {
  items: loadFromStorage<string[]>('voltique_wishlist', []),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<string>) {
      const idx = state.items.indexOf(action.payload);
      if (idx >= 0) {
        state.items.splice(idx, 1);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
