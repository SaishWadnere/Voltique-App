import { Package, Heart, MapPin, Settings, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logoutUser } from '../../store/slices/userSlice';
import { addToast } from '../../store/slices/uiSlice';

const menuItems = [
  { icon: Package, label: 'My Orders', path: '/account' },
  { icon: Heart, label: 'Wishlist', path: '/wishlist' },
  { icon: MapPin, label: 'Saved Addresses', path: '/addresses' },
  { icon: Settings, label: 'Account Settings' },
];

export default function ProfileSidebar() {
  const user = useAppSelector((s) => s.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (item.path) {
      navigate(item.path);
    } else {
      dispatch(addToast({ message: `${item.label} feature coming soon!`, type: 'info' }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[24px] p-6">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-lg font-bold text-primary">{user.name}</h3>
        <p className="text-sm text-on-surface-variant">{user.email}</p>
        <p className="text-xs text-secondary font-medium mt-1">{user.membershipTier}</p>
      </div>
      <div className="bg-white rounded-[24px] p-2">
        {menuItems.map((item) => {
          const isActive = item.path === location.pathname;
          return (
            <button
              key={item.label}
              onClick={() => handleMenuClick(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                isActive ? 'bg-surface-low text-primary' : 'text-on-surface-variant hover:bg-surface-low/50'
              }`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          );
        })}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all mt-1"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </div>
  );
}
