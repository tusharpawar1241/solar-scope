import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: 'About', path: '/about' },
        { name: 'Login', path: '/login' }
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="px-6 w-full text-white">
            <div className="p-5 flex items-center justify-between border-b-2 border-slate-800 relative">
                <Link to="/" className="font-mono font-bold text-4xl hover:opacity-95 transition-opacity">
                    SolarScope
                </Link>
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-white focus:outline-none">{isOpen ? <X /> : <Menu />}</button>
                <nav className="hidden md:flex items-center gap-8 px-4">
                    {navItems.map((item) =>
                    (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`relative py-2 text-lg font-semibold transition-colors duration-200     
                            ${isActive(item.path) ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
                            {item.name}
                            {isActive(item.path) && (
                                <motion.div layoutId="active-underline"
                                    className="absolute bottom-[-22px] left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                            )}
                        </Link>
                    ))}
                </nav>
            </div>
            {isOpen && (
                <div className="md:hidden flex flex-col items-center bg-slate-900/90 py-4 gap-4 border-b border-slate-800">
                    {navItems.map((item) => (
                        <Link key={item.name} to={item.path} onClick={() => {
                            setIsOpen(false);
                        }}
                            className={`w-full text-center py-2 text-lg font-semibold ${isActive(item.path) ? 'text-cyan-400' : 'text-slate-400'}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>)}
        </div>
    )
}

export default Navbar