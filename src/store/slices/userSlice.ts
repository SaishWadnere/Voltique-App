import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, Order, Address } from '../../types';
import { signInWithGoogle, signInWithEmail, registerWithEmail, logOut } from '../../lib/auth';
import { loadFromStorage } from '../localStorage';

interface UserState {
  isAuthenticated: boolean;
  user: User | null;
  orders: Order[];
  addresses: Address[];
  loading: boolean;
  error: string | null;
}

// Load persisted user from localStorage
function loadUser(): { user: User | null; isAuthenticated: boolean } {
  try {
    const stored = localStorage.getItem('voltique_user');
    if (stored) {
      const user = JSON.parse(stored) as User;
      return { user, isAuthenticated: true };
    }
  } catch { /* ignore */ }
  return { user: null, isAuthenticated: false };
}

const persisted = loadUser();

const initialState: UserState = {
  isAuthenticated: persisted.isAuthenticated,
  user: persisted.user,
  orders: loadFromStorage<Order[]>('voltique_orders', []),
  addresses: loadFromStorage<Address[]>('voltique_addresses', []),
  loading: false,
  error: null,
};

// Async thunks for Firebase auth
export const googleLogin = createAsyncThunk('user/googleLogin', async (_, { rejectWithValue }) => {
  try {
    const user = await signInWithGoogle();
    localStorage.setItem('voltique_user', JSON.stringify(user));
    return user;
  } catch (err: unknown) {
    const error = err as Error;
    return rejectWithValue(error.message || 'Google sign-in failed');
  }
});

export const emailLogin = createAsyncThunk(
  'user/emailLogin',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const user = await signInWithEmail(email, password);
      localStorage.setItem('voltique_user', JSON.stringify(user));
      return user;
    } catch (err: unknown) {
      const error = err as Error;
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const emailRegister = createAsyncThunk(
  'user/emailRegister',
  async ({ name, email, password }: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const user = await registerWithEmail(name, email, password);
      localStorage.setItem('voltique_user', JSON.stringify(user));
      return user;
    } catch (err: unknown) {
      const error = err as Error;
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logOut();
  localStorage.removeItem('voltique_user');
  localStorage.removeItem('voltique_orders');
  localStorage.removeItem('voltique_addresses');
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      localStorage.setItem('voltique_user', JSON.stringify(action.payload));
    },
    clearError(state) {
      state.error = null;
    },
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.unshift(action.payload);
      if (state.user) {
        state.user.artifactsCollected = (state.user.artifactsCollected || 0) + 1;
        localStorage.setItem('voltique_user', JSON.stringify(state.user));
      }
    },
    addAddress(state, action: PayloadAction<Address>) {
      if (action.payload.isDefault) {
        state.addresses.forEach((a) => (a.isDefault = false));
      }
      if (state.addresses.length === 0) {
        action.payload.isDefault = true;
      }
      state.addresses.push(action.payload);
    },
    removeAddress(state, action: PayloadAction<string>) {
      state.addresses = state.addresses.filter((a) => a.id !== action.payload);
      if (state.addresses.length > 0 && !state.addresses.some((a) => a.isDefault)) {
        state.addresses[0].isDefault = true;
      }
    },
    setDefaultAddress(state, action: PayloadAction<string>) {
      state.addresses.forEach((a) => {
        a.isDefault = a.id === action.payload;
      });
    },
  },
  extraReducers: (builder) => {
    // Google login
    builder.addCase(googleLogin.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(googleLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(googleLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Email login
    builder.addCase(emailLogin.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(emailLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(emailLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Email register
    builder.addCase(emailRegister.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(emailRegister.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(emailRegister.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    });
  },
});

export const { setUser, clearError, addOrder, addAddress, removeAddress, setDefaultAddress } = userSlice.actions;
export default userSlice.reducer;
