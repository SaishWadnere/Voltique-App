import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { toggleMobileMenu, closeMobileMenu } from '../../store/slices/uiSlice';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'New Arrivals', path: '/shop?sort=newest' },
  { name: 'Deals', path: '/shop?sort=price_low' },
  { name: 'About', path: '/about' },
];

export default function Navbar() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((s) => s.cart.items);
  const wishlistItems = useAppSelector((s) => s.wishlist.items);
  const mobileMenuOpen = useAppSelector((s) => s.ui.mobileMenuOpen);
  const user = useAppSelector((s) => s.user.user);
  const allProducts = useAppSelector((s) => s.products.allProducts);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : allProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const isShopPage = location.pathname === '/shop';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    dispatch(closeMobileMenu());
  }, [location, dispatch]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/40 backdrop-blur-xl backdrop-saturate-150 shadow-ambient py-3'
          : 'bg-white/0 py-5'
      }`}
    >
      <div className="container-main flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-black tracking-tight text-primary no-underline select-none">
          VOLTIQUE
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium no-underline transition-colors duration-200 ${
                location.pathname === link.path
                  ? 'text-primary border-b-2 border-primary pb-0.5'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Search - desktop only on shop page */}
          {isShopPage && (
            <div className="relative hidden lg:block" ref={searchContainerRef}>
              <div className="flex items-center gap-2 bg-surface-low rounded-full px-4 py-2.5">
                <Search size={16} className="text-on-surface-variant" />
                <input
                  type="text"
                  placeholder="Search Artifacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="bg-transparent border-none outline-none text-sm w-40 text-on-surface placeholder:text-on-surface-variant/50"
                />
              </div>

              {/* Autocomplete Dropdown */}
              {isSearchFocused && searchQuery.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-lg border border-outline-variant/20 overflow-hidden z-50 animate-fade-in">
                  {searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          onClick={() => {
                            setSearchQuery('');
                            setIsSearchFocused(false);
                          }}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-surface-low transition-colors no-underline"
                        >
                          <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-primary truncate">{product.name}</p>
                            <p className="text-xs text-on-surface-variant">${product.price}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-on-surface-variant">
                      No artifacts found.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Search toggle for mobile */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className={`lg:hidden p-2 rounded-full transition-colors ${isShopPage ? 'block' : 'hidden'} hover:bg-surface-low`}
          >
            <Search size={20} />
          </button>

          <Link to="/wishlist" className="p-2 rounded-full hover:bg-surface-low transition-colors relative">
            <Heart size={20} className="text-on-surface" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="p-2 rounded-full hover:bg-surface-low transition-colors relative">
            <ShoppingCart size={20} className="text-on-surface" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to={user ? "/account" : "/login"} className="p-1.5 rounded-full hover:bg-surface-low transition-colors">
            {user ? (
              <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
            ) : (
              <User size={20} className="text-on-surface" />
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => dispatch(toggleMobileMenu())}
            className="md:hidden p-2 rounded-full hover:bg-surface-low transition-colors"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && isShopPage && (
        <div className="md:hidden px-6 pb-3 animate-fade-in relative" ref={mobileSearchRef}>
          <div className="flex items-center gap-2 bg-surface-low rounded-full px-4 py-2.5">
            <Search size={16} className="text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search Artifacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm flex-1 text-on-surface"
              autoFocus
            />
          </div>

          {/* Mobile Autocomplete Dropdown */}
          {searchQuery.length > 0 && (
            <div className="absolute top-full left-6 right-6 mt-2 bg-white rounded-2xl shadow-lg border border-outline-variant/20 overflow-hidden z-50">
              {searchResults.length > 0 ? (
                <div className="py-2">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={() => {
                        setSearchQuery('');
                        setSearchOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-surface-low transition-colors no-underline"
                    >
                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-primary truncate">{product.name}</p>
                        <p className="text-xs text-on-surface-variant">${product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-on-surface-variant">
                  No artifacts found.
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-outline-variant/15 animate-fade-in">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`py-3 px-4 rounded-2xl text-sm font-medium no-underline transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface hover:bg-surface-low'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
