import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { googleLogin, emailLogin, emailRegister, clearError } from '../../store/slices/userSlice';

export default function AuthForm() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((s) => s.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let result;
    if (mode === 'login') {
      result = await dispatch(emailLogin({ email, password }));
    } else {
      result = await dispatch(emailRegister({ name, email, password }));
    }
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/account');
    }
  };

  const handleGoogleLogin = async () => {
    const result = await dispatch(googleLogin());
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/account');
    }
  };

  const switchMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
    dispatch(clearError());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-surface via-white to-surface-low relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-tertiary/5 rounded-full blur-3xl" />

      <div className="relative z-10 text-center mb-8">
        <h1 className="text-3xl font-black tracking-tight text-primary">VOLTIQUE</h1>
        <p className="text-label-uppercase text-on-surface-variant tracking-[0.2em] mt-1">Digital Artifacts Engineered.</p>
      </div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-[28px] p-8 shadow-ambient">
        {/* Tabs */}
        <div className="flex border-b border-outline-variant/15 mb-8">
          <button
            onClick={() => switchMode('login')}
            className={`flex-1 pb-4 text-base font-medium transition-all ${
              mode === 'login' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant'
            }`}
          >Login</button>
          <button
            onClick={() => switchMode('register')}
            className={`flex-1 pb-4 text-base font-medium transition-all ${
              mode === 'register' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant'
            }`}
          >Register</button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-600 animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'register' && (
            <div>
              <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-2">Full Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required
                className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm outline-none focus:border-secondary transition-colors" />
            </div>
          )}
          <div>
            <label className="text-label-uppercase text-on-surface-variant tracking-widest block mb-2">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@artifact.com" required
              className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm outline-none focus:border-secondary transition-colors" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-label-uppercase text-on-surface-variant tracking-widest">Password</label>
              {mode === 'login' && <span className="text-label-uppercase text-secondary cursor-pointer">Forgot?</span>}
            </div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6}
              className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-sm outline-none focus:border-secondary transition-colors" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-on-primary rounded-2xl text-base font-semibold hover:bg-primary-container transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                Processing...
              </span>
            ) : mode === 'login' ? 'Continue to Gallery' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-outline-variant/15" />
          <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">Or connect via</span>
          <div className="flex-1 h-px bg-outline-variant/15" />
        </div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border border-outline-variant/15 text-sm font-medium hover:bg-surface-low transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>

        {/* Apple placeholder */}
        <button
          disabled
          className="w-full flex items-center justify-center gap-3 py-3.5 mt-3 rounded-2xl border border-outline-variant/15 text-sm font-medium opacity-40 cursor-not-allowed"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
          Apple (coming soon)
        </button>
      </div>

      <p className="relative z-10 mt-6 text-sm text-on-surface-variant">
        {mode === 'login' ? "New to the collection? " : "Already have access? "}
        <button onClick={() => switchMode(mode === 'login' ? 'register' : 'login')} className="font-bold text-primary underline">
          {mode === 'login' ? 'Request access' : 'Login'}
        </button>.
      </p>
    </div>
  );
}
