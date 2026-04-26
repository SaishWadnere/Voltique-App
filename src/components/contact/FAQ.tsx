import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { faqItems } from '../../data/products';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-surface">
      <div className="container-main max-w-3xl">
        <h2 className="text-3xl font-black text-center text-primary mb-3">Common Protocols</h2>
        <p className="text-center text-on-surface-variant text-sm mb-12">
          Frequently asked questions regarding our engineering standards.
        </p>
        <div className="space-y-4">
          {faqItems.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
              >
                <h4 className="text-sm font-bold text-primary pr-4">{faq.question}</h4>
                <div className="shrink-0 w-8 h-8 rounded-full bg-surface-low flex items-center justify-center">
                  {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 animate-fade-in">
                  <p className="text-sm text-on-surface-variant leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
