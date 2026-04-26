import { useParams } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductTabs from '../components/product/ProductTabs';
import RelatedProducts from '../components/product/RelatedProducts';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((s) => s.products.allProducts.find((p) => p.id === id));

  if (!product) {
    return (
      <main className="pt-28 pb-20">
        <div className="container-main text-center">
          <h1 className="text-3xl font-black text-primary mb-4">Artifact Not Found</h1>
          <p className="text-on-surface-variant">This digital artifact could not be located in our gallery.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>
        <ProductTabs product={product} />
        <RelatedProducts />
      </div>
    </main>
  );
}
