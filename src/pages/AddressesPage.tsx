import { useState } from 'react';
import { MapPin, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { addAddress, removeAddress, setDefaultAddress } from '../store/slices/userSlice';
import { addToast } from '../store/slices/uiSlice';
import ProfileSidebar from '../components/account/ProfileSidebar';
import type { Address } from '../types';

export default function AddressesPage() {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((s) => s.user.addresses);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', phone: '', streetAddress: '', city: '', zipCode: '', country: 'United States'
  });

  const update = (field: string, value: string) => setFormData({ ...formData, [field]: value });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.streetAddress || !formData.city || !formData.zipCode) {
      dispatch(addToast({ message: 'Please fill out all required fields', type: 'error' }));
      return;
    }

    const newAddress: Address = {
      ...formData,
      id: Math.random().toString(36).substring(2, 9),
      isDefault: addresses.length === 0,
    };

    dispatch(addAddress(newAddress));
    dispatch(addToast({ message: 'Address saved successfully', type: 'success' }));
    setShowForm(false);
    setFormData({ fullName: '', phone: '', streetAddress: '', city: '', zipCode: '', country: 'United States' });
  };

  return (
    <main className="pt-24 pb-16">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 shrink-0">
            <ProfileSidebar />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-primary">Saved Addresses</h2>
              {!showForm && (
                <button 
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-full text-sm font-bold hover:scale-105 transition-all"
                >
                  <Plus size={16} /> Add New
                </button>
              )}
            </div>

            {showForm ? (
              <div className="bg-white rounded-[24px] p-8 shadow-card mb-8">
                <h3 className="text-xl font-bold text-primary mb-6">Add New Address</h3>
                <form onSubmit={handleSave} className="space-y-6">
                  <div>
                    <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-2">Full Name</label>
                    <input
                      value={formData.fullName}
                      onChange={(e) => update('fullName', e.target.value)}
                      className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm outline-none focus:border-secondary transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-2">Phone</label>
                      <input
                        value={formData.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm outline-none focus:border-secondary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-2">Country</label>
                      <select
                        value={formData.country}
                        onChange={(e) => update('country', e.target.value)}
                        className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm outline-none focus:border-secondary transition-colors"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-2">Street Address</label>
                    <input
                      value={formData.streetAddress}
                      onChange={(e) => update('streetAddress', e.target.value)}
                      className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm outline-none focus:border-secondary transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-2">City</label>
                      <input
                        value={formData.city}
                        onChange={(e) => update('city', e.target.value)}
                        className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm outline-none focus:border-secondary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-2">Zip Code</label>
                      <input
                        value={formData.zipCode}
                        onChange={(e) => update('zipCode', e.target.value)}
                        className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm outline-none focus:border-secondary transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-4 pt-4">
                    <button 
                      type="button" 
                      onClick={() => setShowForm(false)}
                      className="px-6 py-2 rounded-full text-sm font-bold text-on-surface-variant hover:bg-surface-low transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-2 bg-primary text-on-primary rounded-full text-sm font-bold hover:scale-105 transition-all"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            ) : null}

            {addresses.length === 0 && !showForm ? (
              <div className="text-center py-20 bg-white rounded-[24px]">
                <div className="w-16 h-16 rounded-full bg-surface-low flex items-center justify-center mx-auto mb-4">
                  <MapPin size={24} className="text-on-surface-variant" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">No Saved Addresses</h3>
                <p className="text-sm text-on-surface-variant mb-6">Add an address for a faster checkout experience.</p>
                <button 
                  onClick={() => setShowForm(true)}
                  className="px-6 py-2 border border-primary text-primary rounded-full text-sm font-bold hover:bg-primary hover:text-on-primary transition-all"
                >
                  Add Your First Address
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((address) => (
                  <div key={address.id} className={`bg-white rounded-[24px] p-6 border-2 transition-colors ${address.isDefault ? 'border-primary shadow-card' : 'border-transparent hover:border-surface-high'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={18} className={address.isDefault ? 'text-primary' : 'text-on-surface-variant'} />
                        <h4 className="font-bold text-primary">{address.fullName}</h4>
                      </div>
                      {address.isDefault && (
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-primary text-on-primary rounded-full">Default</span>
                      )}
                    </div>
                    <div className="text-sm text-on-surface-variant space-y-1 mb-6">
                      <p>{address.streetAddress}</p>
                      <p>{address.city}, {address.zipCode}</p>
                      <p>{address.country}</p>
                      <p className="pt-2">{address.phone}</p>
                    </div>
                    <div className="flex gap-3">
                      {!address.isDefault && (
                        <button 
                          onClick={() => dispatch(setDefaultAddress(address.id))}
                          className="flex-1 flex items-center justify-center gap-2 py-2 border border-outline-variant/30 rounded-full text-xs font-bold hover:border-primary hover:text-primary transition-colors"
                        >
                          <CheckCircle2 size={14} /> Set Default
                        </button>
                      )}
                      <button 
                        onClick={() => dispatch(removeAddress(address.id))}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-red-50 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
