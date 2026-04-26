import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Lazy Load Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const AddressesPage = lazy(() => import('./pages/AddressesPage'));
import { useAppSelector, useAppDispatch } from './store/hooks';
import { removeToast } from './store/slices/uiSlice';
import { setUser } from './store/slices/userSlice';
import { onAuthChange } from './lib/auth';

// Listens to Firebase auth state and syncs to Redux
function AuthListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ToastContainer() {
  const toasts = useAppSelector((s) => s.ui.toasts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    toasts.forEach((toast) => {
      setTimeout(() => dispatch(removeToast(toast.id)), 3000);
    });
  }, [toasts, dispatch]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-6 py-3 rounded-2xl text-sm font-medium shadow-lg animate-slide-right ${
            toast.type === 'success' ? 'bg-primary text-on-primary' :
            toast.type === 'error' ? 'bg-red-600 text-white' :
            'bg-secondary text-white'
          }`}
        >
          {toast.type === 'success' && '✓ '}{toast.message}
        </div>
      ))}
    </div>
  );
}

function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-surface">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/addresses" element={<AddressesPage />} />
        </Routes>
      </Suspense>
      {!isLoginPage && <Footer />}
      <ToastContainer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthListener />
      <ScrollToTop />
      <AppLayout />
    </BrowserRouter>
  );
}
