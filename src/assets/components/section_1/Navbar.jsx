import React, {useState} from 'react'
import { X, Menu } from 'lucide-react';
import {motion} from 'framer-motion';

const Navbar = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const [isOpen, setIsOpen] = useState(false);


    const navItems = [
        {name: 'Home', link: '#'},
        {name: 'Blog', link: '#'},
        {name: 'About', link: '#'},
        {name: 'Login', link: '#'}
    ];


    return (
        <div className="px-6 py-2 w-full text-white"> 
            <div className="p-5 flex items-center justify-between border-b-2 border-slate-800 relative">
                <h1 className="font-mono font-bold text-4xl">SolarScope</h1>
                <button onClick={() => setIsOpen(!isOpen)} className = "md:hidden p-2 text-white focus:outline-none">{isOpen ? <X /> : <Menu />}</button>
                <nav className= "hidden md:flex items-center gap-8 px-4">
                    {navItems.map((item) => 
                    (
                        <button 
                            key ={item.name}
                            onClick = {() => setActiveTab(item.name)}
                            className = {`relative py-2 text-lg font-semibold transition-colors duration-200     
                            ${activeTab === item.name ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
                            {item.name}
                            {activeTab === item.name && (
                                <motion.div layoutId = "active-underline"
                                className = "absolute bottom-[-22px] left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                                transition = {{type: 'spring', stiffness: 380, damping: 30}} />
                            )}
                        </button>
                    ))} 
                </nav>
            </div>
            {isOpen && (
                <div className = "md:hidden flex flex-col items-center bg-slate-900/90 py-4 gap-4 border-b border-slate-800">
                    {navItems.map((item) => (
                        <button key = {item.name} onClick= {() => {
                            setActiveTab(item.name);
                            setIsOpen(false);
                        }}
                        className = {`w-full text-center py-2 text-lg font-semibold ${activeTab ===item.name ? 'text-cyan-400' : 'text-slate-400'}`}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>)}
        </div>
    )
}
export default Navbar