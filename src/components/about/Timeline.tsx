import { timelineEvents } from '../../data/products';

export default function Timeline() {
  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <h2 className="text-3xl md:text-4xl font-black text-center text-primary mb-16">
          The Kinetic Evolution
        </h2>
        <div className="relative max-w-3xl mx-auto">
         
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-outline-variant/20 hidden md:block" />

          {timelineEvents.map((event, i) => (
            <div
              key={event.year}
              className={`flex flex-col md:flex-row items-center gap-8 mb-20 animate-fade-up ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <span className="text-2xl font-black text-tertiary">{event.year}</span>
                <h3 className="text-xl font-bold text-primary mt-1 mb-2">{event.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{event.description}</p>
              </div>
              <div className="w-4 h-4 rounded-full bg-primary border-4 border-white shadow-md z-10 shrink-0 hidden md:block" />
              <div className="flex-1">
                <div className="rounded-[20px] overflow-hidden aspect-[4/3]">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
