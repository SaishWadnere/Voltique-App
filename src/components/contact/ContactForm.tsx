import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-white rounded-[28px] p-8 md:p-10">
      <h2 className="text-2xl font-bold text-primary mb-8">Send a Transmission</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Nikola Tesla"
              className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm outline-none focus:border-secondary transition-colors text-on-surface placeholder:text-on-surface-variant/40"
            />
          </div>
          <div>
            <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-2">Email Protocol</label>
            <input
              type="email"
              placeholder="nikola@voltique.com"
              className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm outline-none focus:border-secondary transition-colors text-on-surface placeholder:text-on-surface-variant/40"
            />
          </div>
        </div>
        <div>
          <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-2">Subject</label>
          <input
            type="text"
            placeholder="Technical Inquiry"
            className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm outline-none focus:border-secondary transition-colors text-on-surface placeholder:text-on-surface-variant/40"
          />
        </div>
        <div>
          <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-2">Message</label>
          <textarea
            rows={5}
            placeholder="How can we assist with your Voltique experience?"
            className="w-full bg-transparent border border-outline-variant/20 rounded-2xl py-3 px-4 text-sm outline-none focus:border-secondary transition-colors text-on-surface placeholder:text-on-surface-variant/40 resize-none"
          />
        </div>
        <button
          type="submit"
          className="btn-primary btn-primary-hover gap-2"
        >
          {submitted ? '✓ Transmitted' : 'Execute Transmission'} <Send size={14} />
        </button>
      </form>
    </div>
  );
}
