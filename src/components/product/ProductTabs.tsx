import { useState } from 'react';
import type { Product } from '../../types';

interface Props {
  product: Product;
}

type Tab = 'description' | 'specifications' | 'reviews';

export default function ProductTabs({ product }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('description');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: `Reviews (${product.reviewCount})` },
  ];

  return (
    <div className="mt-16">
      {/* Tab Headers */}
      <div className="flex gap-8 border-b border-outline-variant/15 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-label-uppercase transition-all ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {activeTab === 'description' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-black text-primary mb-4">Engineered Kinetic Sound.</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                {product.description}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-tertiary mt-1">◆</span>
                  <span className="text-sm text-on-surface-variant">Bespoke 40mm Beryllium-coated drivers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-tertiary mt-1">◆</span>
                  <span className="text-sm text-on-surface-variant">Active ANC with 48dB noise reduction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-tertiary mt-1">◆</span>
                  <span className="text-sm text-on-surface-variant">60-hour playback with rapid charging</span>
                </li>
              </ul>
            </div>
            <div className="rounded-[28px] overflow-hidden bg-gradient-to-br from-[#0a1628] to-[#1a2d4a] relative">
              <img
                src={product.image}
                alt="Internal components"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute bottom-5 left-5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
                  Internal Component Blueprint 001
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'specifications' && product.specs && (
          <div className="max-w-xl">
            <div className="space-y-0">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-4 border-b border-outline-variant/10">
                  <span className="text-sm font-medium text-on-surface">{key}</span>
                  <span className="text-sm text-on-surface-variant">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="max-w-xl space-y-6">
            {[
              { author: 'A. Chen', rating: 5, text: 'Absolutely stunning audio quality. The build is phenomenal.', date: 'Nov 2023' },
              { author: 'M. Rivers', rating: 4, text: 'Great headphones for the price. ANC could be slightly better.', date: 'Oct 2023' },
              { author: 'K. Nordström', rating: 5, text: 'This is engineering art. Every detail is considered.', date: 'Sep 2023' },
            ].map((review, i) => (
              <div key={i} className="p-6 bg-surface-low rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center text-sm font-bold">
                      {review.author[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary">{review.author}</p>
                      <p className="text-[10px] text-on-surface-variant">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <svg key={j} width="12" height="12" viewBox="0 0 12 12" fill={j < review.rating ? '#1a1a1a' : '#ddd'}>
                        <path d="M6 0.5L7.76 4.06L11.7 4.64L8.85 7.43L9.53 11.35L6 9.5L2.47 11.35L3.15 7.43L0.3 4.64L4.24 4.06L6 0.5Z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
