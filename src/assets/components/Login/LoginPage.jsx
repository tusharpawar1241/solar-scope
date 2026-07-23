// src/assets/components/Login/LoginPage.jsx
// Handles both Login and Register in one component.
// On success: saves token + user to localStorage, redirects to home or admin portal.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
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
  const navigate  = useNavigate();

  // Toggle between 'login' and 'register' modes
  const [mode, setMode] = useState('login');

  // Controlled form fields
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
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

      // Persist JWT + user info so BlogPage and Navbar can access them
      saveSession(result.token, result.user);

      // Redirect to home
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
    <div className="relative min-h-screen w-screen overflow-hidden bg-[#02040A] text-white login-theme">
      {/* 3D Cosmic Planet & Nebula Backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_20%_20%,rgba(0,163,255,0.16),transparent_24%),radial-gradient(circle_at_80%_12%,rgba(34,211,238,0.1),transparent_20%),linear-gradient(135deg,#01030a_0%,#02040a_45%,#030812_100%)] nebula-shift" />
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_55%)]" />
        <div className="absolute bottom-[-16%] left-1/2 h-168 w-[110vw] -translate-x-1/2 rounded-[50%] border border-cyan-400/15 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.26),rgba(6,12,35,0.06)_45%,transparent_72%)] shadow-[0_0_220px_rgba(34,211,238,0.14)]" />
        <div className="absolute bottom-[-8%] left-1/2 h-136 w-[120vw] -translate-x-1/2">
          <div className="planet-3d" aria-hidden>
            <svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg" className="planet-large" preserveAspectRatio="xMidYMid meet">
              <defs>
                <radialGradient id="earthGlow" cx="30%" cy="30%">
                  <stop offset="0%" stopColor="#f5fbff" stopOpacity="0.95" />
                  <stop offset="35%" stopColor="#73d8ff" stopOpacity="0.82" />
                  <stop offset="70%" stopColor="#1b6fb4" stopOpacity="0.62" />
                  <stop offset="100%" stopColor="#02101f" stopOpacity="0.18" />
                </radialGradient>
                <linearGradient id="atmosphereGlow" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
                  <stop offset="100%" stopColor="rgba(34,211,238,0.35)" />
                </linearGradient>
                <filter id="earthBlur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="8" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <g filter="url(#earthBlur)">
                <circle cx="210" cy="200" r="125" fill="url(#earthGlow)" />
              </g>
              <g className="planet-rings" transform="translate(0,0)">
                <ellipse cx="210" cy="240" rx="196" ry="44" fill="none" stroke="rgba(125,211,252,0.22)" strokeWidth="8" strokeLinecap="round" />
                <ellipse cx="210" cy="240" rx="158" ry="32" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="2" strokeLinecap="round" />
              </g>
              <g className="planet-atmosphere">
                <ellipse cx="210" cy="210" rx="150" ry="138" fill="none" stroke="url(#atmosphereGlow)" strokeWidth="18" strokeOpacity="0.34" />
                <ellipse cx="210" cy="210" rx="180" ry="166" fill="none" stroke="rgba(34,211,238,0.16)" strokeWidth="10" strokeOpacity="0.26" />
              </g>
              <g opacity="0.8">
                <path d="M138 176c24-44 74-38 98-6 18 24 14 54-6 70-26 23-68 16-90-23-10-17-10-31-2-41Z" fill="rgba(255,255,255,0.34)" />
                <path d="M250 147c16 2 34 12 44 27 14 19 13 43-1 61-16 20-45 29-68 19-14-6-25-18-29-36-5-24 8-53 29-64 9-5 16-7 25-7Z" fill="rgba(173, 232, 255,0.24)" />
              </g>
            </svg>
          </div>
          <div className="particle-field absolute inset-x-0 bottom-40 flex justify-center">
            <div className="relative h-36 w-[70%] max-w-184">
              <span className="particle-float absolute left-[10%] top-[22%] h-2 w-2 rounded-full bg-cyan-300/80" />
              <span className="particle-float absolute left-[22%] top-[43%] h-1.5 w-1.5 rounded-full bg-sky-200/70" style={{ animationDelay: '1.5s' }} />
              <span className="particle-float absolute left-[35%] top-[18%] h-2.5 w-2.5 rounded-full bg-white/70" style={{ animationDelay: '2.2s' }} />
              <span className="particle-float absolute left-[56%] top-[28%] h-1.5 w-1.5 rounded-full bg-cyan-100/80" style={{ animationDelay: '0.8s' }} />
              <span className="particle-float absolute left-[72%] top-[40%] h-2 w-2 rounded-full bg-sky-300/70" style={{ animationDelay: '2.8s' }} />
              <span className="particle-float absolute left-[80%] top-[14%] h-1.5 w-1.5 rounded-full bg-white/60" style={{ animationDelay: '1.1s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Login Form Container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center lg:gap-10">
            <div className="w-full max-w-105 rounded-4xl border border-white/10 bg-white/6 px-6 py-8 text-white shadow-[0_0_80px_rgba(2,8,23,0.35)] backdrop-blur-2xl sm:px-8 sm:py-9">
              <h2 className="mb-6 text-center text-2xl font-light tracking-[0.04em] text-slate-100 sm:text-3xl">
                {isRegister ? 'Create Account' : 'Welcome Back'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isRegister && (
                  <div>
                    <label className="mb-2 block text-sm text-slate-300 text-left">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      disabled={loading}
                      className="w-full rounded-full border border-white/20 bg-slate-950/40 px-5 py-3 text-white placeholder-slate-400 outline-none transition duration-300 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20 disabled:opacity-50"
                    />
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm text-slate-300 text-left">Email address</label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    disabled={loading}
                    className="w-full rounded-full border border-white/20 bg-slate-950/40 px-5 py-3 text-white placeholder-slate-400 outline-none transition duration-300 focus:border-sky-300 focus:ring-2 focus:ring-sky-300/20 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300 text-left">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    disabled={loading}
                    className="w-full rounded-full border border-white/20 bg-slate-950/40 px-5 py-3 text-white placeholder-slate-400 outline-none transition duration-300 focus:border-sky-300 focus:ring-2 focus:ring-sky-300/20 disabled:opacity-50"
                  />
                </div>

                {error && (
                  <p className="rounded-2xl border border-red-400/30 bg-red-500/20 px-4 py-2 text-sm text-red-300">
                    {error}
                  </p>
                )}
                {success && (
                  <p className="rounded-2xl border border-emerald-400/20 bg-emerald-500/12 px-4 py-2 text-sm text-emerald-200">
                    {success}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-cyan-500 to-sky-600 py-3 text-base font-semibold tracking-[0.08em] text-white transition duration-300 hover:scale-[1.01] hover:shadow-[0_0_28px_rgba(34,211,238,0.35)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:text-lg mt-2"
                >
                  {loading && <Loader2 size={18} className="animate-spin" />}
                  {loading
                    ? isRegister ? 'Creating account...' : 'Signing in...'
                    : isRegister ? 'Create Account' : 'Login'
                  }
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-300 sm:text-base">
                {isRegister ? 'Already have an account?' : 'New to SolarScope?'}
                <span
                  onClick={switchMode}
                  className="ml-2 cursor-pointer font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
                >
                  {isRegister ? 'Sign In' : 'Sign Up'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
