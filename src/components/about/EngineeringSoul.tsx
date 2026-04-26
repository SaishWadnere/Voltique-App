export default function EngineeringSoul() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-[28px] overflow-hidden aspect-[4/3] animate-fade-up">
            <img
              src="https://images.unsplash.com/photo-1592659762303-90081d34b277?q=80&w=1073&auto=format&fit=crop"
              alt="Circuit board close-up"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <h2 className="text-label-uppercase text-on-surface-variant tracking-widest mb-2">The Engineering Soul</h2>
            <h3 className="text-3xl font-black text-primary mb-6">THE ENGINEERING SOUL</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
              Voltique was founded on a singular obsession: the refusal to compromise. We saw a world of disposable gadgets and decided to build artifacts that endure.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-8">
              Our mission is to bridge the gap between human intuition and machine capability. Every curve of a Voltique chassis is calculated, every haptic response is tuned, and every internal component is a masterpiece of vertical integration.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="text-4xl font-black text-primary">98%</span>
                <p className="text-label-uppercase text-secondary mt-1 tracking-widest">Recyclable Alloys</p>
              </div>
              <div>
                <span className="text-4xl font-black text-primary">0.02ms</span>
                <p className="text-label-uppercase text-secondary mt-1 tracking-widest">Peak Latency</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
