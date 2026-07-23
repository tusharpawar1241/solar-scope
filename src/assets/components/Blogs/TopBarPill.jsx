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
      <div className="w-full max-w-4xl backdrop-blur-2xl bg-slate-900/60 border border-slate-800 rounded-full px-3 sm:px-5 py-2 flex items-center justify-between shadow-xl transition-all hover:bg-slate-900/80 hover:border-slate-700">
        
        {/* Left Section: Blog Submissions Status + Nav Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Status Button */}
          <button 
            onClick={onOpenStatusModal}
            title="My Blog Submissions & Status"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all text-xs font-semibold active:scale-95"
          >
            <Clock size={14} className="text-cyan-400" />
            <span className="hidden sm:inline">Status</span>
            {pendingCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </button>

          <div className="h-4 w-[1px] bg-slate-800" />

          {/* Nav Arrows */}
          <button 
            onClick={onPrevCard}
            title="Previous Space Post"
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all active:scale-95"
          >
            <ChevronLeft size={18} />
          </button>
          
          <button 
            onClick={onNextCard}
            title="Next Space Post"
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all active:scale-95"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Center Section: Simple Clean Search Bar */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4 flex items-center bg-slate-950/60 border border-slate-800 rounded-full px-3.5 py-1.5 gap-2 text-xs sm:text-sm transition-all focus-within:border-cyan-500/40">
          <Search size={15} className="text-slate-400 shrink-0" />
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent border-none outline-none text-slate-200 placeholder-slate-500 text-left font-medium tracking-wide text-xs sm:text-sm"
          />

          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              title="Clear search"
              className="p-0.5 rounded-full text-slate-500 hover:text-slate-200 transition-colors"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Right Section: Add (+) Button to Write Blog */}
        <div className="flex items-center">
          <button 
            onClick={onOpenCreateModal}
            title="Write New Space Blog"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-100 hover:bg-white text-slate-950 font-bold uppercase tracking-wider text-[11px] transition-all duration-200 active:scale-95 shadow-md"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">Write Blog</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default TopBarPill;
