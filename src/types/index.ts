// Product type
export interface Product {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  brand?: string;
  materialTone?: string;
  description?: string;
  shortDescription?: string;
  image: string;
  images?: string[];
  rating: number;
  reviewCount: number;
  badge?: 'NEW RELEASE' | 'BESTSELLER' | 'POPULAR' | 'LIMITED EDITION' | 'NEW';
  specs?: Record<string, string>;
  colors?: ProductColor[];
  stock: 'in_stock' | 'low_stock' | 'out_of_stock';
  stockCount?: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

// Cart
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
}

// User
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  membershipTier: string;
  joinedYear: number;
  artifactsCollected: number;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  productName: string;
  orderDate: string;
  status: 'delivered' | 'in_transit' | 'processing';
}

// Filters
export interface ShopFilters {
  priceRange: [number, number];
  categories: string[];
  brands: string[];
  materialTone: string | null;
  inStockOnly: boolean;
  sortBy: 'popularity' | 'price_low' | 'price_high' | 'newest' | 'rating';
}

// UI
export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

// Team member
export interface TeamMember {
  name: string;
  title: string;
  image: string;
}

// Timeline event
export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image: string;
}

// FAQ item
export interface FAQItem {
  question: string;
  answer: string;
}
