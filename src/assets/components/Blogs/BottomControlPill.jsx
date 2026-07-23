// src/assets/components/Blogs/BottomControlPill.jsx
import React from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

const BottomControlPill = ({
  currentIndex,
  totalItems,
  activePost,
  collectionTitle = "SolarScope",
  collectionSubtitle = "Solar & Planetary Wonders",
  onPrev,
  onNext,
  onLike,
  isLiked
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center z-30 select-none pb-2 pt-1">
      {/* Floating Bottom Glass Capsule */}
      <div className="backdrop-blur-2xl bg-white/10 dark:bg-slate-900/70 border border-white/25 rounded-full px-3.5 py-1.5 flex items-center gap-3 shadow-[0_16px_40px_rgba(0,0,0,0.6)] transition-all hover:bg-white/15 hover:border-white/35">
        
        {/* Left Arrow */}
        <button
          onClick={onPrev}
          title="Previous (Reel Scroll)"
          className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-all active:scale-90"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Middle Badge: Circle Image + Details */}
        <div className="flex items-center gap-2.5 px-1">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-cyan-400/40 shadow-md bg-slate-800 shrink-0">
            <img 
              src={activePost?.thumbnail || activePost?.image} 
              alt={activePost?.title || "Thumbnail"} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=400&auto=format&fit=crop';
              }}
            />
          </div>

          <div className="flex flex-col text-left">
            <h4 className="text-white text-xs sm:text-sm font-bold leading-tight tracking-wide flex items-center gap-1.5">
              <span>{activePost?.title || collectionTitle}</span>
              <span className="text-[10px] font-semibold text-cyan-300 bg-cyan-500/20 px-1.5 py-0.5 rounded-full border border-cyan-400/30">
                {currentIndex + 1}/{totalItems}
              </span>
            </h4>
            <p className="text-white/60 text-[11px] font-medium leading-tight truncate max-w-[180px] sm:max-w-[240px]">
              {activePost?.sublocation || collectionSubtitle}
            </p>
          </div>

          <button
            onClick={onLike}
            className={`p-1 ml-1 rounded-full hover:bg-white/20 transition-colors ${
              isLiked ? 'text-red-400' : 'text-white/60 hover:text-white'
            }`}
          >
            <Heart size={15} className={isLiked ? "fill-red-400 text-red-400" : ""} />
          </button>
        </div>

        {/* Right Arrow */}
        <button
          onClick={onNext}
          title="Next (Reel Scroll)"
          className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-all active:scale-90"
        >
          <ChevronRight size={18} />
        </button>

      </div>
    </div>
  );
};

export default BottomControlPill;
