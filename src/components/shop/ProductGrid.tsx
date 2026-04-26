import ProductCard from './ProductCard';
import type { Product } from '../../types';

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 flex-1">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
      {products.length === 0 && (
        <div className="col-span-full text-center py-20">
          <p className="text-on-surface-variant text-lg">No artifacts match your criteria.</p>
          <p className="text-on-surface-variant text-sm mt-2">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
