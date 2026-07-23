// src/assets/components/Admin/AdminRoute.jsx
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getSession, saveSession } from '../../../lib/api/auth';
import { Lock, ShieldAlert, Key } from 'lucide-react';

const AdminRoute = ({ children }) => {
  const { user, token } = getSession();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(() => {
    // Check if user is logged in as admin or previously unlocked session
    const isUserAdmin = user?.role === 'admin' || user?.email?.includes('admin');
    const isSessionUnlocked = sessionStorage.getItem('solar_admin_unlocked') === 'true';
    return isUserAdmin || isSessionUnlocked;
  });

  // Admin access check
  if (!token && !isUnlocked) {
    return <Navigate to="/login" replace />;
  }

  const handleUnlockAdmin = (e) => {
    e.preventDefault();
    // Default Secret Passcode for Admin Access: 'admin123'
    if (passcode === 'admin123' || passcode === 'solarscope') {
      sessionStorage.setItem('solar_admin_unlocked', 'true');
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Invalid Admin Security Passcode.');
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-[85vh] w-full bg-[#02040a] flex items-center justify-center p-4 text-white">
        <div className="w-full max-w-md bg-slate-950/90 border border-cyan-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center shadow-lg">
            <Lock size={28} />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-white">Restricted Admin Area</h2>
            <p className="text-xs text-white/60 mt-1">Please enter the Admin Passcode or sign in with an Admin account.</p>
          </div>

          <form onSubmit={handleUnlockAdmin} className="space-y-3 pt-2">
            <div className="relative">
              <Key size={16} className="absolute left-3.5 top-3 text-cyan-400" />
              <input
                type="password"
                placeholder="Enter Admin Security Passcode..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 outline-none focus:border-cyan-400"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-xl">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-all shadow-[0_0_20px_rgba(34,211,238,0.35)]"
            >
              Unlock Admin Portal
            </button>
          </form>

          <p className="text-[11px] text-white/40 pt-2">
            Default Dev Passcode: <code className="text-cyan-300 font-mono">admin123</code>
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
