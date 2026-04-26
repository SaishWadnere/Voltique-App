import { useAppSelector } from '../../store/hooks';

export default function WelcomeBanner() {
  const user = useAppSelector((s) => s.user.user);
  if (!user) return null;

  return (
    <div className="bg-gradient-to-r from-[#1a2332] to-[#2a3a4a] rounded-[24px] p-8 text-white relative overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-3xl font-black leading-tight">Welcome back,<br />{user.name.split(' ')[0]}.</h2>
        <p className="text-white/60 text-sm mt-3 max-w-sm">
          Your latest digital artifacts are on their way. Track your shipments or explore new arrivals engineered for your lifestyle.
        </p>
      </div>
    </div>
  );
}
