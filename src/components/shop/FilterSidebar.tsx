import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { toggleCategory, setPriceRange, toggleInStockOnly, toggleBrand, setMaterialTone } from '../../store/slices/productsSlice';
import { materialTones, brands } from '../../data/products';

const categoryFilters = [
  { id: 'audio', label: 'Audio Artifacts' },
  { id: 'visual', label: 'Visual Engines' },
  { id: 'computing', label: 'Neural Inputs' },
  { id: 'wearables', label: 'Power Cores' },
];

export default function FilterSidebar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.products.filters);

  return (
    <aside className="w-full lg:w-64 shrink-0">
      {/* Price Range */}
      <div className="mb-8">
        <h4 className="text-label-uppercase text-on-surface mb-4">Price Range</h4>
        <input
          type="range"
          min={0}
          max={2500}
          value={filters.priceRange[1]}
          onChange={(e) => dispatch(setPriceRange([0, Number(e.target.value)]))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-on-surface-variant mt-2">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}+</span>
        </div>
      </div>

      {/* Category */}
      <div className="mb-8">
        <h4 className="text-label-uppercase text-on-surface mb-4">Category</h4>
        <div className="space-y-3">
          {categoryFilters.map((cat) => (
            <label 
              key={cat.id} 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={(e) => {
                e.preventDefault();
                dispatch(toggleCategory(cat.id));
              }}
            >
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                  filters.categories.includes(cat.id)
                    ? 'bg-secondary border-secondary'
                    : 'border-outline-variant group-hover:border-secondary/50'
                }`}
              >
                {filters.categories.includes(cat.id) && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                {cat.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className="mb-8">
        <h4 className="text-label-uppercase text-on-surface mb-4">Brand</h4>
        <div className="space-y-3">
          {brands.map((brand) => (
            <label 
              key={brand} 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={(e) => {
                e.preventDefault();
                dispatch(toggleBrand(brand));
              }}
            >
              <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                filters.brands.includes(brand)
                  ? 'border-secondary bg-secondary'
                  : 'border-outline-variant group-hover:border-secondary/50'
              }`}>
                {filters.brands.includes(brand) && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Material Tone */}
      <div className="mb-8">
        <h4 className="text-label-uppercase text-on-surface mb-4">Material Tone</h4>
        <div className="flex gap-3">
          {materialTones.map((tone) => (
            <button
              key={tone.name}
              onClick={() => dispatch(setMaterialTone(tone.name))}
              className={`w-10 h-10 rounded-full border-3 transition-transform ring-2 shadow-md ${
                filters.materialTone === tone.name
                  ? 'border-white ring-primary scale-110'
                  : 'border-white ring-transparent hover:scale-110 hover:ring-secondary/30'
              }`}
              style={{ backgroundColor: tone.hex }}
              title={tone.name}
            />
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="mb-8">
        <h4 className="text-label-uppercase text-on-surface mb-4">Availability</h4>
        <label className="flex items-center justify-between cursor-pointer bg-surface-low rounded-2xl px-4 py-3">
          <span className="text-sm text-on-surface-variant">In Stock Only</span>
          <button
            onClick={() => dispatch(toggleInStockOnly())}
            className={`w-11 h-6 rounded-full transition-colors relative ${
              filters.inStockOnly ? 'bg-secondary' : 'bg-outline-variant'
            }`}
          >
            <div
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                filters.inStockOnly ? 'translate-x-5.5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </label>
      </div>
    </aside>
  );
}
