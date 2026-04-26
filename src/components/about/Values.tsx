import { Sparkles, Zap, Recycle, Palette } from 'lucide-react';

const values = [
  {
    icon: Sparkles,
    title: 'Surgical Integrity',
    description: 'Every device undergoes 1,200 points of automated inspection before it earns the Voltique seal.',
    color: 'bg-white',
    textColor: 'text-primary',
  },
  {
    icon: Zap,
    title: 'Hyper-Efficiency',
    description: 'Our custom silicon architectures deliver 60% more performance-per-watt than industry standards.',
    color: 'bg-primary',
    textColor: 'text-on-primary',
  },
  {
    icon: Recycle,
    title: 'Circular Lifecycle',
    description: 'Designed for disassembly. When you\'re finished with a device, we reclaim 94% of its materials.',
    color: 'bg-secondary',
    textColor: 'text-on-secondary',
  },
  {
    icon: Palette,
    title: 'Aesthetics as Utility',
    description: 'Beauty is not an afterthought. It is the primary interface through which you interact with the future.',
    color: 'bg-surface-low',
    textColor: 'text-primary',
  },
];

export default function Values() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {values.map((val, i) => (
            <div
              key={val.title}
              className={`${val.color} ${val.textColor} rounded-[28px] p-8 md:p-10 animate-fade-up`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-5 ${
                val.color === 'bg-primary' || val.color === 'bg-secondary'
                  ? 'bg-white/15'
                  : 'bg-surface-low'
              }`}>
                <val.icon size={20} />
              </div>
              <h3 className="text-xl font-bold mb-2">{val.title}</h3>
              <p className={`text-sm leading-relaxed ${
                val.color === 'bg-primary' || val.color === 'bg-secondary'
                  ? 'opacity-80'
                  : 'text-on-surface-variant'
              }`}>
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
