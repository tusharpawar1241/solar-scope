// src/assets/components/Blogs/SideDockPill.jsx
import React, { useState } from 'react';
import { Paperclip, Heart, User, Sparkles } from 'lucide-react';

const SideDockPill = ({ activePostTitle, onLike, isLiked }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3">
      <div className="backdrop-blur-2xl bg-white/10 dark:bg-slate-900/60 border border-white/25 rounded-2xl p-2 flex flex-col gap-3 shadow-[0_16px_40px_rgba(0,0,0,0.4)] text-white/80 transition-all hover:bg-white/15">
        
        {/* Attachment / Pin Icon */}
        <button
          onClick={handleCopyLink}
          title={copied ? "Link Copied!" : `Copy anchor for ${activePostTitle}`}
          className="relative p-2.5 rounded-xl hover:bg-white/20 hover:text-white transition-all active:scale-90 group"
        >
          <Paperclip size={19} />
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-white/10">
            {copied ? "Copied!" : "Pin & Copy"}
          </span>
        </button>

        <div className="h-[1px] w-6 bg-white/15 mx-auto" />

        {/* Favorite / Heart Icon */}
        <button
          onClick={onLike}
          title="Save to Favorites"
          className={`relative p-2.5 rounded-xl hover:bg-white/20 transition-all active:scale-90 group ${
            isLiked ? 'text-red-400 fill-red-400/30' : 'hover:text-red-400'
          }`}
        >
          <Heart size={19} className={isLiked ? "fill-red-400" : ""} />
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-white/10">
            {isLiked ? "Liked" : "Favorite"}
          </span>
        </button>

        <div className="h-[1px] w-6 bg-white/15 mx-auto" />

        {/* Profile / Author Icon */}
        <button
          title="Author Profile & Collections"
          className="relative p-2.5 rounded-xl hover:bg-white/20 hover:text-cyan-400 transition-all active:scale-90 group"
        >
          <User size={19} />
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-white/10">
            Author Profile
          </span>
        </button>

      </div>
    </div>
  );
};

export default SideDockPill;
