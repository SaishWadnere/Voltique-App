import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ToastMessage } from '../../types';

interface UIState {
  mobileMenuOpen: boolean;
  toasts: ToastMessage[];
  searchQuery: string;
}

const initialState: UIState = {
  mobileMenuOpen: false,
  toasts: [],
  searchQuery: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu(state) {
      state.mobileMenuOpen = false;
    },
    addToast(state, action: PayloadAction<Omit<ToastMessage, 'id'>>) {
      state.toasts.push({ ...action.payload, id: Date.now().toString() });
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { toggleMobileMenu, closeMobileMenu, addToast, removeToast, setSearchQuery } = uiSlice.actions;
export default uiSlice.reducer;
