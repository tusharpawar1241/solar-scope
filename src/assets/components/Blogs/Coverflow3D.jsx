// src/assets/components/Blogs/Coverflow3D.jsx
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Maximize2, 
  MoreHorizontal, 
  Heart
} from 'lucide-react';

const Coverflow3D = ({ 
  posts, 
  activeIndex, 
  setActiveIndex, 
  onExpandCard,
  onNext,
  onPrev
}) => {
  const lastScrollTime = useRef(0);
  const touchStartX = useRef(0);

  const handleCardClick = (index) => {
    if (index === activeIndex) {
      onExpandCard(posts[index]);
    } else {
      setActiveIndex(index);
    }
  };

  // Continuous reel wheel scrolling (trackpad / mouse wheel)
  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 250) return;

    if (Math.abs(e.deltaY) > 12 || Math.abs(e.deltaX) > 12) {
      lastScrollTime.current = now;
      if (e.deltaY > 0 || e.deltaX > 0) {
        onNext();
      } else {
        onPrev();
      }
    }
  };

  // Touch Swipe gestures for mobile/tablets
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diffX) > 35) {
      if (diffX > 0) {
        onNext();
      } else {
        onPrev();
      }
    }
  };

  return (
    <div 
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full flex-1 flex items-center justify-center overflow-hidden py-1 select-none"
    >
      
      {/* Perspective Container */}
      <div 
        className="relative w-full max-w-6xl h-85 sm:h-92.5 md:h-100 flex items-center justify-center"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >

        {/* 3D Stack of Compact Reel Cards */}
        {posts.map((post, index) => {
          const offset = index - activeIndex;
          const isActive = index === activeIndex;

          // Calculate 3D Transforms relative to center active card
          let rotateY = 0;
          let translateX = 0;
          let translateZ = 0;
          let scale = 1;
          let opacity = 1;
          let zIndex = 30 - Math.abs(offset);

          if (offset === 0) {
            rotateY = 0;
            translateX = 0;
            translateZ = 45;
            scale = 1.03;
            opacity = 1;
            zIndex = 50;
          } else if (offset < 0) {
            // Left side cards angled towards right
            rotateY = Math.min(34 + Math.abs(offset) * 4, 44);
            translateX = -180 * Math.abs(offset) - 20;
            translateZ = -110 * Math.abs(offset);
            scale = Math.max(0.88 - Math.abs(offset) * 0.07, 0.65);
            opacity = Math.max(0.92 - Math.abs(offset) * 0.18, 0.3);
          } else {
            // Right side cards angled towards left
            rotateY = -Math.min(34 + Math.abs(offset) * 4, 44);
            translateX = 180 * Math.abs(offset) + 20;
            translateZ = -110 * Math.abs(offset);
            scale = Math.max(0.88 - Math.abs(offset) * 0.07, 0.65);
            opacity = Math.max(0.92 - Math.abs(offset) * 0.18, 0.3);
          }

          // Hide cards outside visible radius (+-3)
          if (Math.abs(offset) > 3) return null;

          return (
            <motion.div
              key={post.id}
              onClick={() => handleCardClick(index)}
              initial={false}
              animate={{
                rotateY,
                x: translateX,
                z: translateZ,
                scale,
                opacity
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 24,
                mass: 0.8
              }}
              style={{
                zIndex,
                transformStyle: 'preserve-3d',
                position: 'absolute'
              }}
              className={`w-53.75 sm:w-62.5 md:w-70 h-82.5 sm:h-91.25 md:h-98.75 rounded-4xl cursor-pointer overflow-hidden border backdrop-blur-xl ${
                isActive 
                  ? 'border-white/40 shadow-2xl bg-slate-900/70 ring-1 ring-white/20' 
                  : 'border-white/20 shadow-xl bg-slate-900/50 hover:border-white/35'
              }`}
            >
              
              {/* Background Image Layer - High Brightness & Sharp Contrast */}
              <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-950">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    isActive ? 'scale-105 brightness-110 contrast-105' : 'scale-100 brightness-95 hover:brightness-105 hover:scale-105'
                  }`}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=90&w=1920&auto=format&fit=crop';
                  }}
                />
                
                {/* Crisp Gradient Overlay */}
                <div className="absolute bottom-0 inset-x-0 h-3/5 bg-linear-to-t from-slate-950 via-slate-950/70 to-transparent pointer-events-none" />
                <div className="absolute top-0 inset-x-0 h-1/4 bg-linear-to-b from-black/40 to-transparent pointer-events-none" />
              </div>

              {/* CARD CONTENT LAYER */}
              <div className="relative z-10 w-full h-full p-4 sm:p-5 flex flex-col justify-between text-white">

                {/* Top Action Bar (Active Card Only) */}
                {isActive ? (
                  <div className="flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onExpandCard(post);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 hover:bg-cyan-500/40 border border-white/40 text-[11px] font-bold backdrop-blur-md transition-all active:scale-95 shadow-lg text-white"
                    >
                      <Maximize2 size={12} className="text-cyan-300" />
                      <span>Expand</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="p-1.5 rounded-full bg-black/40 hover:bg-white/30 border border-white/30 backdrop-blur-md transition-all text-white"
                    >
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="h-5" />
                )}

                {/* Bottom Card Content */}
                {isActive ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    {/* Title & Item Counter */}
                    <div className="flex items-baseline justify-between gap-1.5">
                      <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-tight">
                        {post.title}
                      </h2>
                      <span className="text-[10px] font-bold text-cyan-300 bg-black/60 px-2 py-0.5 rounded-full border border-cyan-400/40 shrink-0 shadow-md">
                        {index + 1} / {posts.length}
                      </span>
                    </div>

                    {/* Summary Description */}
                    <p className="text-[11px] text-slate-100 line-clamp-2 leading-relaxed font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                      {post.description}
                    </p>

                    {/* Author & Likes Footer */}
                    <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs text-white">
                      {/* Left: Author Avatar + Name */}
                      <div className="flex items-center gap-2 truncate max-w-[65%]">
                        <div className="w-6 h-6 rounded-full bg-linear-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center text-[10px] font-extrabold text-slate-950 shadow-md shrink-0">
                          {post.author?.[0] || 'A'}
                        </div>
                        <span className="text-xs font-semibold text-white/95 truncate">
                          {post.author}
                        </span>
                      </div>

                      {/* Right: Heart + Likes Count */}
                      <div className="flex items-center gap-1.5 text-cyan-200 font-semibold text-[11px] shrink-0 bg-black/50 px-2.5 py-0.5 rounded-full border border-white/20 shadow-md">
                        <Heart size={12} className="fill-red-400 text-red-400 shrink-0" />
                        <span>{post.likes >= 1000 ? `${(post.likes / 1000).toFixed(1)}k` : post.likes}</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* Side Card Compact Title & Location */
                  <div className="space-y-0.5 pb-1">
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-[11px] text-cyan-200/90 font-medium truncate">
                      {post.sublocation}
                    </p>
                  </div>
                )}

              </div>

            </motion.div>
          );
        })}

      </div>

    </div>
  );
};

export default Coverflow3D;
