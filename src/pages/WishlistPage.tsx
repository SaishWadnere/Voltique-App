import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toggleWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToast } from '../store/slices/uiSlice';

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const wishlistIds = useAppSelector((s) => s.wishlist.items);
  const allProducts = useAppSelector((s) => s.products.allProducts);
  const wishlistProducts = allProducts.filter((p) => wishlistIds.includes(p.id));

  const handleAddToCart = (product: typeof wishlistProducts[0]) => {
    dispatch(addToCart(product));
    dispatch(addToast({ message: `${product.name} added to cart`, type: 'success' }));
  };

  return (
    <main className="pt-24 pb-16">
      <div className="container-main">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors mb-6 cursor-pointer bg-transparent border-none p-0"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <span className="text-label-uppercase text-secondary tracking-widest">Your Collection</span>
        <h1 className="text-4xl md:text-5xl font-black text-primary mt-2 mb-10 tracking-tight">Wishlist.</h1>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-surface-low flex items-center justify-center mx-auto mb-6">
              <Heart size={32} className="text-on-surface-variant" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-3">Your wishlist is empty</h2>
            <p className="text-on-surface-variant mb-6">Save artifacts you love and come back to them later.</p>
            <Link to="/shop" className="btn-primary btn-primary-hover no-underline">Browse Shop</Link>
          </div>
        ) : (
          <>
            <p className="text-on-surface-variant mb-8">
              You have <strong className="text-primary">{wishlistProducts.length}</strong> artifact{wishlistProducts.length !== 1 ? 's' : ''} saved.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistProducts.map((product, i) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-[24px] overflow-hidden shadow-card hover:shadow-hover transition-all duration-500 animate-fade-up"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-surface-low">
                    {product.badge && (
                      <span className={`absolute top-4 left-4 z-10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                        product.badge === 'NEW RELEASE' ? 'bg-primary text-on-primary' :
                        product.badge === 'POPULAR' ? 'bg-tertiary text-on-tertiary' :
                        'bg-secondary text-on-secondary'
                      }`}>
                        {product.badge}
                      </span>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(toggleWishlist(product.id));
                      }}
                      className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-secondary text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <Heart size={16} fill="currentColor" />
                    </button>
                  </Link>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <Link to={`/product/${product.id}`} className="text-sm font-bold text-primary no-underline hover:text-secondary transition-colors line-clamp-2">
                        {product.name}
                      </Link>
                      <span className="text-sm font-bold text-primary whitespace-nowrap">${product.price.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed mb-4 line-clamp-1">
                      {product.shortDescription}
                    </p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-on-surface/10 rounded-full text-sm font-medium text-primary hover:bg-primary hover:text-on-primary transition-all duration-300"
                    >
                      <ShoppingCart size={14} /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
