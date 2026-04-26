import { Link } from 'react-router-dom';

export default function AboutHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-white">
      <div className="container-main w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <span className="inline-block px-4 py-1.5 bg-tertiary text-on-tertiary text-label-uppercase rounded-full mb-6">
              Est. 2018
            </span>
            <h1 className="text-5xl md:text-6xl font-black leading-[0.95] tracking-[-0.04em] text-primary mb-2">
              Built for the
            </h1>
            <h1 className="text-5xl md:text-6xl font-black leading-[0.95] tracking-[-0.04em] mb-6">
              <span className="italic text-primary">Future</span><span className="text-primary">.</span>
            </h1>
            <p className="text-on-surface-variant text-base leading-relaxed max-w-md mb-8">
              We don't just engineer electronics; we craft digital artifacts.
              Voltique exists at the intersection of surgical precision and kinetic art.
            </p>
            <div className="flex gap-4">
              <Link to="/shop" className="btn-primary btn-primary-hover no-underline">
                Explore Innovation
              </Link>
              <button className="btn-secondary">
                Our Story
              </button>
            </div>
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="rounded-[32px] overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop"
                alt="Voltique Lab"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-6 right-8 bg-secondary text-white px-6 py-4 rounded-2xl shadow-lg">
              <p className="text-sm font-black uppercase tracking-wider leading-tight">
                Apex<br/>Design<br/>Unit
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
