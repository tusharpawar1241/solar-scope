// src/assets/components/Blogs/TopBarPill.jsx
import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Plus,
  Clock,
  X
} from 'lucide-react';

const TopBarPill = ({ 
  searchQuery = "",
  setSearchQuery,
  onPrevCard,
  onNextCard,
  onOpenCreateModal,
  onOpenStatusModal,
  pendingCount = 0
}) => {
  return (
    <div className="w-full flex justify-center px-4 py-3 z-30 select-none">
      <div className="w-full max-w-4xl backdrop-blur-2xl bg-white/10 dark:bg-slate-900/60 border border-white/25 rounded-full px-3 sm:px-5 py-2 flex items-center justify-between shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all hover:bg-white/15 dark:hover:bg-slate-900/70">
        
        {/* Left Section: Blog Submissions Status + Nav Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Status Section Button (Before < >) */}
          <button 
            onClick={onOpenStatusModal}
            title="My Blog Submissions & Status"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 hover:text-white transition-all text-xs font-bold active:scale-95 shadow-[0_0_12px_rgba(34,211,238,0.15)]"
          >
            <Clock size={14} className="text-cyan-400" />
            <span className="hidden sm:inline">Status</span>
            {pendingCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black flex items-center justify-center animate-pulse">
                {pendingCount}
              </span>
            )}
          </button>

          <div className="h-4 w-[1px] bg-white/20" />

          {/* Nav Arrows */}
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

        {/* Center Section: Simple Clean Search Bar */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4 flex items-center bg-black/40 border border-cyan-500/30 rounded-full px-3.5 py-1.5 gap-2 text-xs sm:text-sm shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all focus-within:border-cyan-400 focus-within:shadow-[0_0_20px_rgba(34,211,238,0.25)]">
          <Search size={15} className="text-cyan-400 shrink-0" />
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent border-none outline-none text-cyan-100 placeholder-white/50 text-left font-medium tracking-wide text-xs sm:text-sm"
          />

          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              title="Clear search"
              className="p-0.5 rounded-full text-white/60 hover:text-white transition-colors"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Right Section: Add (+) Button to Write Blog */}
        <div className="flex items-center">
          <button 
            onClick={onOpenCreateModal}
            title="Write New Space Blog (Submit to Admin)"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(34,211,238,0.35)] active:scale-95"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Write Blog</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default TopBarPill;
