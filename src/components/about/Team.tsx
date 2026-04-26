import { teamMembers } from '../../data/products';

export default function Team() {
  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-primary">The Architects</h2>
            <p className="text-on-surface-variant mt-2">The minds pushing the boundaries of what's possible.</p>
          </div>
          <span className="text-sm font-medium text-secondary cursor-pointer hover:underline hidden sm:block">
            Join the Collective
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, i) => (
            <div
              key={member.name}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-44 h-44 mx-auto rounded-full overflow-hidden mb-4 bg-surface-low">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <h4 className="text-base font-bold text-primary">{member.name}</h4>
              <p className="text-label-uppercase text-secondary mt-1">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
