import { Link } from 'react-router-dom';
import ScrollReveal from '../ui/ScrollReveal';

export default function PromoBanner() {
  return (
    <section className="py-16">
      <div className="container-main">
        <ScrollReveal animation="fade-up">
          <div className="relative rounded-[32px] overflow-hidden gradient-metal py-20 px-8 md:px-16">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-purple-900/30 opacity-60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(139,92,246,0.15),transparent_60%)]" />

            <div className="relative z-10 max-w-lg">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-2">
                Play Beyond.
              </h2>
              <h2 className="text-4xl md:text-5xl font-black leading-[1.1] mb-6">
                <span className="text-tertiary">50% OFF</span>
                <span className="text-white"> Gaming.</span>
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-sm">
                Limited time offer on all Nova-series controllers and audio gear.
                Level up your performance today.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center px-8 py-3.5 bg-tertiary text-on-tertiary rounded-full font-semibold text-sm hover:bg-tertiary-dark transition-all duration-300 no-underline hover:scale-105"
              >
                Claim Offer
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
