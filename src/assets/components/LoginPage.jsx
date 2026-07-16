// src/assets/components/LoginPage.jsx
// Handles both Login and Register in one component.
// On success: saves token + user to localStorage, redirects to home.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { login, register, saveSession } from '../../lib/api/auth';

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

  const isRegister = mode === 'register';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;

      if (isRegister) {
        if (!name.trim()) { setError('Name is required'); setLoading(false); return; }
        result = await register({ name: name.trim(), email, password });
      } else {
        result = await login({ email, password });
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#0b3940] via-[#041d22] to-black">

      {/* Background Glow */}
      <div className="absolute h-[380px] w-[850px] rounded-full bg-cyan-400/20 blur-[120px] animate-pulse" />

      {/* Card */}
      <div className="relative z-10 w-[380px] rounded-[35px] border border-white/30 bg-white/10 p-10 text-white shadow-2xl backdrop-blur-xl">

        {/* Logo */}
        <h1 className="mb-3 text-center text-4xl font-bold tracking-[6px] drop-shadow-lg">
          SOLARSCOPE
        </h1>

        {/* Heading */}
        <h2 className="mb-6 text-center text-3xl font-light">
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name field — register only */}
          {isRegister && (
            <div>
              <label className="mb-2 block text-sm text-gray-300">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                disabled={loading}
                className="w-full rounded-2xl border border-white/40 bg-white/5 px-5 py-3 text-white
                           placeholder-gray-400 outline-none transition duration-300
                           focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50
                           disabled:opacity-50"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              disabled={loading}
              className="w-full rounded-2xl border border-white/40 bg-white/5 px-5 py-3 text-white
                         placeholder-gray-400 outline-none transition duration-300
                         focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50
                         disabled:opacity-50"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              disabled={loading}
              className="w-full rounded-2xl border border-white/40 bg-white/5 px-5 py-3 text-white
                         placeholder-gray-400 outline-none transition duration-300
                         focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50
                         disabled:opacity-50"
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="rounded-xl bg-red-500/20 border border-red-400/30 px-4 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl
                       bg-gradient-to-r from-cyan-400 to-sky-500 py-3 text-xl font-bold
                       transition duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.7)]
                       disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading
              ? isRegister ? 'Creating account...' : 'Signing in...'
              : isRegister ? 'Create Account' : 'Login'
            }
          </button>
        </form>

        {/* Toggle between login / register */}
        <p className="mt-6 text-center text-sm text-gray-300">
          {isRegister ? 'Already have an account?' : 'New to SolarScope?'}
          <span
            onClick={switchMode}
            className="ml-2 cursor-pointer font-semibold text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            {isRegister ? 'Sign In' : 'Sign Up'}
          </span>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;