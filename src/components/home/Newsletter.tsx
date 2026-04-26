import { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-white">
      <ScrollReveal>
        <div className="container-main text-center">
          <h2 className="text-3xl font-bold text-primary mb-3">Join The Circuit</h2>
          <p className="text-on-surface-variant text-sm mb-8">
            Get early access to drops and exclusive digital engineering insights.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-3.5 bg-surface-low rounded-full text-sm outline-none border-none focus:ring-2 focus:ring-secondary/30 transition-all"
              required
            />
            <button
              type="submit"
              className="btn-primary btn-primary-hover whitespace-nowrap"
            >
              {submitted ? '✓ Subscribed' : 'Subscribe'}
            </button>
          </form>
        </div>
      </ScrollReveal>
    </section>
  );
}
