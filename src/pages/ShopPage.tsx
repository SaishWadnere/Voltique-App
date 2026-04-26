import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setSortBy } from '../store/slices/productsSlice';
import ShopHero from '../components/shop/ShopHero';
import FilterSidebar from '../components/shop/FilterSidebar';
import ProductGrid from '../components/shop/ProductGrid';
import Pagination from '../components/shop/Pagination';

const validSorts = ['popularity', 'price_low', 'price_high', 'newest', 'rating'] as const;

export default function ShopPage() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { filteredProducts, currentPage, itemsPerPage, filters } = useAppSelector((s) => s.products);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Read ?sort= from URL on mount / navigation
  useEffect(() => {
    const sortParam = searchParams.get('sort');
    if (sortParam && validSorts.includes(sortParam as typeof filters.sortBy)) {
      dispatch(setSortBy(sortParam as typeof filters.sortBy));
    }
  }, [searchParams, dispatch]);

  return (
    <main className="pt-24 pb-16">
      <div className="container-main">
        <ShopHero />
        <div className="flex items-center justify-between mb-8">
          <div className="bg-surface-low rounded-full px-5 py-2.5 text-sm text-on-surface-variant">
            Displaying <strong className="text-primary">{paginatedProducts.length}</strong> of{' '}
            <strong className="text-primary">{filteredProducts.length}</strong> results
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-on-surface-variant">Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value as typeof filters.sortBy))}
              className="bg-transparent text-sm font-medium text-primary outline-none cursor-pointer"
            >
              <option value="popularity">Popularity</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
        <div className="flex gap-10">
          <FilterSidebar />
          <div className="flex-1">
            <ProductGrid products={paginatedProducts} />
            <Pagination />
          </div>
        </div>
      </div>
    </main>
  );
}
