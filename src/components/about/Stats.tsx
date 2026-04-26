const stats = [
  { value: '127', label: 'Patents Filed' },
  { value: '14', label: 'Red Dot Awards' },
  { value: '2M+', label: 'Global Users' },
  { value: '0', label: 'Compromises' },
];

export default function Stats() {
  return (
    <section className="py-16 gradient-metal">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="text-4xl md:text-5xl font-black text-white">{stat.value}</span>
              <p className="text-label-uppercase text-white/60 mt-2 tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
