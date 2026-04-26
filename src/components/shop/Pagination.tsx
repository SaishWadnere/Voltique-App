import { ArrowRight } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setPage } from '../../store/slices/productsSlice';

export default function Pagination() {
  const dispatch = useAppDispatch();
  const { filteredProducts, currentPage, itemsPerPage } = useAppSelector((s) => s.products);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];
  for (let i = 1; i <= Math.min(3, totalPages); i++) pages.push(i);
  if (totalPages > 4) pages.push('...');
  if (totalPages > 3) pages.push(totalPages);

  return (
    <div className="flex items-center justify-between mt-12">
      <div className="flex items-center gap-2">
        {pages.map((page, idx) =>
          typeof page === 'number' ? (
            <button
              key={idx}
              onClick={() => dispatch(setPage(page))}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                currentPage === page
                  ? 'bg-primary text-on-primary'
                  : 'text-on-surface-variant hover:bg-surface-low'
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={idx} className="text-on-surface-variant px-1">…</span>
          )
        )}
      </div>
      {currentPage < totalPages && (
        <button
          onClick={() => dispatch(setPage(currentPage + 1))}
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-on-surface/10 text-sm font-medium text-primary hover:bg-primary hover:text-on-primary transition-all duration-300"
        >
          Next Page <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
