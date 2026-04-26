import { useState, useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';
import { MapPin } from 'lucide-react';

export default function ShippingForm() {
  const addresses = useAppSelector((s) => s.user.addresses);
  const isAuthenticated = useAppSelector((s) => s.user.isAuthenticated);
  const [formData, setFormData] = useState({
    name: '', phone: '', country: 'United States', address: '', city: '', zip: ''
  });

  // Automatically select the default address if available
  useEffect(() => {
    if (isAuthenticated && addresses.length > 0) {
      const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
      setFormData({
        name: defaultAddr.fullName,
        phone: defaultAddr.phone,
        country: defaultAddr.country,
        address: defaultAddr.streetAddress,
        city: defaultAddr.city,
        zip: defaultAddr.zipCode
      });
    }
  }, [isAuthenticated, addresses]);

  const update = (field: string, value: string) => setFormData({ ...formData, [field]: value });

  const handleSelectAddress = (addr: typeof addresses[0]) => {
    setFormData({
      name: addr.fullName,
      phone: addr.phone,
      country: addr.country,
      address: addr.streetAddress,
      city: addr.city,
      zip: addr.zipCode
    });
  };

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-sm font-bold">01</div>
        <h2 className="text-xl font-bold text-primary">Shipping Information</h2>
      </div>

      {isAuthenticated && addresses.length > 0 && (
        <div className="mb-8">
          <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-4">Saved Addresses</label>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x no-scrollbar">
            {addresses.map((addr) => {
              const isSelected = formData.address === addr.streetAddress && formData.name === addr.fullName;
              return (
                <div 
                  key={addr.id}
                  onClick={() => handleSelectAddress(addr)}
                  className={`shrink-0 w-64 p-4 rounded-2xl border-2 cursor-pointer transition-all snap-start ${
                    isSelected ? 'border-primary bg-primary/5' : 'border-outline-variant/30 hover:border-primary/50 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={16} className={isSelected ? 'text-primary' : 'text-on-surface-variant'} />
                    <h4 className="font-bold text-sm text-primary">{addr.fullName}</h4>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {addr.streetAddress}<br />
                    {addr.city}, {addr.zipCode}<br />
                    {addr.country}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Or enter manually</span>
            <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-2">Full Name</label>
          <input
            value={formData.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="ALEXANDER VANCE"
            className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm outline-none focus:border-secondary transition-colors text-on-surface placeholder:text-on-surface-variant/30 uppercase tracking-wider"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-2">Phone Number</label>
            <input
              value={formData.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm outline-none focus:border-secondary transition-colors text-on-surface placeholder:text-on-surface-variant/30"
            />
          </div>
          <div>
            <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-2">Country</label>
            <select
              value={formData.country}
              onChange={(e) => update('country', e.target.value)}
              className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm outline-none focus:border-secondary transition-colors text-on-surface appearance-none cursor-pointer"
            >
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
              <option>Germany</option>
              <option>Japan</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-2">Street Address</label>
          <input
            value={formData.address}
            onChange={(e) => update('address', e.target.value)}
            placeholder="21 KINETIC GARDEN DRIVE, STE 402"
            className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm outline-none focus:border-secondary transition-colors text-on-surface placeholder:text-on-surface-variant/30 uppercase tracking-wider"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-2">City</label>
            <input
              value={formData.city}
              onChange={(e) => update('city', e.target.value)}
              placeholder="NEW YORK"
              className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm outline-none focus:border-secondary transition-colors text-on-surface placeholder:text-on-surface-variant/30 uppercase tracking-wider"
            />
          </div>
          <div>
            <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-2">Pincode / Zip</label>
            <input
              value={formData.zip}
              onChange={(e) => update('zip', e.target.value)}
              placeholder="10001"
              className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm outline-none focus:border-secondary transition-colors text-on-surface placeholder:text-on-surface-variant/30"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
