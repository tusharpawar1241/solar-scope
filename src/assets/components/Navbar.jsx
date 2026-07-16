// src/assets/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { X, Menu, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSession, clearSession } from '../../lib/api/auth';

const Navbar = () => {
  const [isOpen,  setIsOpen]  = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();

  // Read the logged-in user's name to show in the navbar
  const { user } = getSession();

  const navItems = [
    { name: 'Home',  path: '/'     },
    { name: 'Blog',  path: '/blog' },
    { name: 'About', path: '/about'},
  ];

  const isLoggedIn = !!user;

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    clearSession();           // remove token + user from localStorage
    navigate('/login');       // redirect to login page
  };

  return (
    <div className="px-6 w-full text-white">
      <div className="p-5 flex items-center justify-between border-b-2 border-slate-800 relative">

        {/* Logo */}
        <Link to="/" className="font-mono font-bold text-4xl hover:opacity-95 transition-opacity">
          SolarScope
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-white focus:outline-none"
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 px-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`relative py-2 text-lg font-semibold transition-colors duration-200
                ${isActive(item.path) ? 'text-white' : 'text-slate-400 hover:text-white'}`}
            >
              {item.name}
              {isActive(item.path) && (
                <motion.div
                  layoutId="active-underline"
                  className="absolute -bottom-5.5 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}

          {/* User section: show name+logout if logged in, Login link if not */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-700">
              <span className="text-sm text-slate-400">
                Hi, <span className="text-cyan-400 font-semibold">{user?.name}</span>
              </span>
              <button
                onClick={handleLogout}
                title="Logout"
                className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-red-400
                           transition-colors duration-200 py-1 px-2 rounded-lg hover:bg-red-400/10"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`relative py-2 text-lg font-semibold transition-colors duration-200 ml-4 pl-4 border-l border-slate-700
                ${isActive('/login') ? 'text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Login
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-slate-900/90 py-4 gap-4 border-b border-slate-800">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`w-full text-center py-2 text-lg font-semibold
                ${isActive(item.path) ? 'text-cyan-400' : 'text-slate-400'}`}
            >
              {item.name}
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-sm text-red-400 hover:text-red-300 transition-colors py-2"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-lg font-semibold text-slate-400"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;