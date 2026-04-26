import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product, ShopFilters } from '../../types';
import { products as allProducts } from '../../data/products';

interface ProductsState {
  allProducts: Product[];
  filteredProducts: Product[];
  filters: ShopFilters;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: ProductsState = {
  allProducts: allProducts,
  filteredProducts: allProducts,
  filters: {
    priceRange: [0, 2500],
    categories: [],
    brands: [],
    materialTone: null,
    inStockOnly: false,
    sortBy: 'popularity',
  },
  currentPage: 1,
  itemsPerPage: 24,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<ShopFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
      applyFilters(state);
    },
    toggleCategory(state, action: PayloadAction<string>) {
      const cat = action.payload;
      const idx = state.filters.categories.indexOf(cat);
      if (idx >= 0) {
        state.filters.categories.splice(idx, 1);
      } else {
        state.filters.categories.push(cat);
      }
      state.currentPage = 1;
      applyFilters(state);
    },
    setPriceRange(state, action: PayloadAction<[number, number]>) {
      state.filters.priceRange = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setSortBy(state, action: PayloadAction<ShopFilters['sortBy']>) {
      state.filters.sortBy = action.payload;
      applyFilters(state);
    },
    toggleInStockOnly(state) {
      state.filters.inStockOnly = !state.filters.inStockOnly;
      state.currentPage = 1;
      applyFilters(state);
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    toggleBrand(state, action: PayloadAction<string>) {
      const brand = action.payload;
      const idx = state.filters.brands.indexOf(brand);
      if (idx >= 0) {
        state.filters.brands.splice(idx, 1);
      } else {
        state.filters.brands.push(brand);
      }
      state.currentPage = 1;
      applyFilters(state);
    },
    setMaterialTone(state, action: PayloadAction<string | null>) {
      state.filters.materialTone = state.filters.materialTone === action.payload ? null : action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
  },
});

function applyFilters(state: ProductsState) {
  let filtered = [...state.allProducts];

  // Price
  filtered = filtered.filter(
    (p) => p.price >= state.filters.priceRange[0] && p.price <= state.filters.priceRange[1]
  );

  // Category
  if (state.filters.categories.length > 0) {
    filtered = filtered.filter((p) => state.filters.categories.includes(p.category));
  }

  // Stock
  if (state.filters.inStockOnly) {
    filtered = filtered.filter((p) => p.stock === 'in_stock');
  }

  // Brand
  if (state.filters.brands.length > 0) {
    filtered = filtered.filter((p) => 
      p.brand && state.filters.brands.includes(p.brand)
    );
  }

  // Material Tone
  if (state.filters.materialTone) {
    filtered = filtered.filter((p) => 
      p.materialTone === state.filters.materialTone
    );
  }

  // Sort
  switch (state.filters.sortBy) {
    case 'price_low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price_high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      filtered.reverse();
      break;
    default:
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  state.filteredProducts = filtered;
}

export const { setFilters, toggleCategory, setPriceRange, setSortBy, toggleInStockOnly, setPage, toggleBrand, setMaterialTone } =
  productsSlice.actions;
export default productsSlice.reducer;
