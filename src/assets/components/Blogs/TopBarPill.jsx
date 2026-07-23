// src/assets/components/Blogs/TopBarPill.jsx
import React, { useState } from 'react';
import { 
  Grid, 
  ChevronLeft, 
  ChevronRight, 
  Lock, 
  Mic, 
  Plus, 
  Share2, 
  Copy
} from 'lucide-react';

const TopBarPill = ({ 
  currentCollectionTitle = "SolarScope Explorer",
  searchQuery = "",
  setSearchQuery,
  onPrevCard,
  onNextCard,
  onCategorySelect
}) => {
  const [fontSize, setFontSize] = useState(100);

  const toggleFontSize = () => {
    setFontSize(prev => (prev >= 120 ? 90 : prev + 10));
  };

  return (
    <div className="w-full flex justify-center px-4 py-3 z-30 select-none">
      <div className="w-full max-w-4xl backdrop-blur-2xl bg-white/10 dark:bg-slate-900/60 border border-white/25 rounded-full px-3 sm:px-5 py-2.5 flex items-center justify-between shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all hover:bg-white/15 dark:hover:bg-slate-900/70">
        
        {/* Left Section: App Launcher & Nav Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button 
            title="Collection Switcher"
            onClick={onCategorySelect}
            className="p-2 rounded-full hover:bg-white/20 text-white/90 hover:text-white transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Grid size={18} />
          </button>
          
          <button 
            onClick={onPrevCard}
            title="Previous Space Post"
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-all active:scale-95"
          >
            <ChevronLeft size={18} />
          </button>
          
          <button 
            onClick={onNextCard}
            title="Next Space Post"
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-all active:scale-95"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Center Section: Spatial URL / Search Capsule */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4 flex items-center bg-black/35 border border-cyan-500/30 rounded-full px-3.5 py-1.5 gap-2 text-xs sm:text-sm shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all hover:border-cyan-400/50">
          <button 
            onClick={toggleFontSize} 
            title={`Font size ${fontSize}%`}
            className="text-cyan-300 hover:text-white font-serif font-bold text-xs flex items-center px-1"
          >
            a<span className="text-sm font-sans">A</span>
          </button>
          
          <div className="h-3.5 w-[1px] bg-white/20" />
          
          <Lock size={13} className="text-cyan-400 shrink-0" />
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={currentCollectionTitle}
            className="w-full bg-transparent border-none outline-none text-cyan-100 placeholder-cyan-200/70 text-center font-medium tracking-wide text-xs sm:text-sm"
          />

          <button 
            title="Voice Command"
            className="p-1 rounded-full text-cyan-400/70 hover:text-cyan-300 transition-colors"
          >
            <Mic size={14} />
          </button>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button 
            title="Select Space Category"
            onClick={onCategorySelect}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-all active:scale-95"
          >
            <Plus size={18} />
          </button>

          <button 
            title="Share Space Observation"
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              alert('Copied SolarScope article link to clipboard!');
            }}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-all active:scale-95"
          >
            <Share2 size={17} />
          </button>

          <button 
            title="Overview"
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-all active:scale-95"
          >
            <Copy size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default TopBarPill;
