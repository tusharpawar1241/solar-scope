// src/assets/components/Login/LoginPage.jsx
// Refined space-themed Login and Register portal.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Orbit } from 'lucide-react';
import { login, register, saveSession } from '../../../lib/api/auth';

const starField = Array.from({ length: 110 }, (_, index) => ({
  id: index,
  left: `${(index * 7) % 100}%`,
  top: `${(index * 13) % 100}%`,
  size: `${(index % 4) + 1}px`,
  delay: `${(index % 10) * 0.35}s`,
  opacity: (index % 4) === 0 ? 0.45 : 0.8,
}));

function LoginPage() {
  const navigate = useNavigate();

  // Toggle between 'login' and 'register' modes
  const [mode, setMode] = useState('login');

  // Controlled form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isRegister = mode === 'register';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    try {
      // Default Admin Credentials Check: admin@admin / admin123
      if (cleanEmail === 'admin@admin' || cleanEmail === 'admin@solarscope.com' || cleanEmail === 'admin') {
        if (password === 'admin123' || password === 'admin') {
          const adminUser = {
            _id: 'admin-001',
            name: 'SolarScope Admin',
            email: 'admin@admin',
            role: 'admin'
          };
          sessionStorage.setItem('solar_admin_unlocked', 'true');
          saveSession('admin-token-secret', adminUser);
          setSuccess('Logged in as Administrator!');
          setTimeout(() => navigate('/admin'), 400);
          return;
        } else {
          setError('Invalid Admin Password. Default is admin123');
          setLoading(false);
          return;
        }
      }

      let result;
      if (isRegister) {
        if (!name.trim()) { setError('Name is required'); setLoading(false); return; }
        result = await register({ name: name.trim(), email: cleanEmail, password });
        setSuccess('Account created successfully. Please sign in.');
        setLoading(false);
        setMode('login');
        return;
      } else {
        result = await login({ email: cleanEmail, password });
      }

      saveSession(result.token, result.user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(isRegister ? 'login' : 'register');
    setError('');
    setName(''); setEmail(''); setPassword('');
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-[#02040A] text-white flex items-center justify-center p-4 select-none font-sans">
      
      {/* VIBRANT COSMIC BACKDROP */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_35%),radial-gradient(circle_at_20%_20%,rgba(0,163,255,0.18),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.12),transparent_30%),linear-gradient(135deg,#01030a_0%,#02040a_45%,#030812_100%)]" />
        <div className="absolute inset-0">
          {starField.map((star) => (
            <span
              key={star.id}
              className="star-twinkle absolute rounded-full bg-white"
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                animationDelay: star.delay,
                opacity: star.opacity,
                boxShadow: '0 0 10px rgba(255,255,255,0.7)',
              }}
            />
          ))}
        </div>
        {/* Glow Spheres */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-cyan-500/10 blur-[130px]" />
      </div>

      {/* REFINED GLASSMORPHIC LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md bg-slate-950/80 border border-cyan-500/30 rounded-3xl p-7 sm:p-9 shadow-[0_20px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl text-center">
        
        {/* Brand Icon Header */}
        <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.25)]">
          <Orbit size={26} className="animate-spin-slow" />
        </div>

        <h2 className="text-2xl font-black text-white tracking-tight">
          {isRegister ? 'Join SolarScope' : 'Welcome Back'}
        </h2>
        <p className="text-xs text-cyan-200/70 mt-1 mb-6">
          {isRegister ? 'Create an account to contribute space research' : 'Sign in to access your SolarScope portal'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-cyan-200 mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. Astra Lin"
                disabled={loading}
                className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-white/35 outline-none transition-all focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] disabled:opacity-50"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-cyan-200 mb-1.5">Email Address</label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              disabled={loading}
              className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-white/35 outline-none transition-all focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-cyan-200 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              disabled={loading}
              className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-white/35 outline-none transition-all focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] disabled:opacity-50"
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/15 p-2.5 text-xs text-red-300 font-medium text-center">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/15 p-2.5 text-xs text-emerald-300 font-medium text-center">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 py-3 text-xs sm:text-sm font-bold tracking-wide text-white transition-all duration-200 shadow-[0_0_20px_rgba(34,211,238,0.35)] active:scale-98 disabled:opacity-60"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            <span>{loading ? (isRegister ? 'Creating Account...' : 'Signing In...') : (isRegister ? 'Create Account' : 'Sign In')}</span>
          </button>
        </form>

        {/* Toggle Mode Footer */}
        <p className="mt-6 text-center text-xs text-white/60">
          {isRegister ? 'Already have an account?' : 'Don\'t have an account yet?'}
          <button
            type="button"
            onClick={switchMode}
            className="ml-1.5 font-bold text-cyan-300 hover:text-cyan-200 underline underline-offset-4 transition-colors"
          >
            {isRegister ? 'Sign In' : 'Sign Up'}
          </button>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;
