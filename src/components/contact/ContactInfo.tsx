import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Contact Card */}
      <div className="gradient-metal rounded-[28px] p-8 text-white">
        <div className="mb-6">
          <span className="text-label-uppercase text-tertiary tracking-widest">Voice Comms</span>
          <p className="text-2xl font-bold mt-1 flex items-center gap-2">
            <Phone size={18} /> +1 (800) VOLT-999
          </p>
        </div>
        <div className="mb-6">
          <span className="text-label-uppercase text-tertiary tracking-widest">Direct Feed</span>
          <p className="text-xl font-bold mt-1 flex items-center gap-2">
            <Mail size={18} /> concierge@voltique.io
          </p>
        </div>
        <div>
          <span className="text-label-uppercase text-tertiary tracking-widest">Main Hub</span>
          <p className="text-sm text-white/80 mt-1 flex items-start gap-2">
            <MapPin size={16} className="shrink-0 mt-0.5" />
            Suite 404, Tech Plaza<br/>San Francisco, CA 94103
          </p>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="relative rounded-[28px] overflow-hidden aspect-[16/9] bg-surface-low">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=700&h=400&fit=crop"
          alt="Map view"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute bottom-5 left-5 flex items-center gap-2 glass px-4 py-2 rounded-full">
          <MapPin size={14} className="text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Global Hub 01</span>
        </div>
      </div>
    </div>
  );
}
