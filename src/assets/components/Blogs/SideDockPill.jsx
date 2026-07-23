// src/assets/components/Blogs/SideDockPill.jsx
import React, { useState } from 'react';
import { Paperclip, Heart, User } from 'lucide-react';

const SideDockPill = ({ activePostTitle, onLike, isLiked }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3">
      <div className="backdrop-blur-2xl bg-slate-900/60 border border-slate-800 rounded-2xl p-2 flex flex-col gap-3 shadow-xl text-slate-300 transition-all hover:border-slate-700">
        
        {/* Attachment / Pin Icon */}
        <button
          onClick={handleCopyLink}
          title={copied ? "Link Copied!" : `Copy anchor for ${activePostTitle}`}
          className="relative p-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition-all active:scale-90 group"
        >
          <Paperclip size={18} />
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-lg border border-slate-800 backdrop-blur-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
            {copied ? "Copied!" : "Pin & Copy"}
          </span>
        </button>

        <div className="h-px w-6 bg-slate-800 mx-auto" />

        {/* Favorite / Heart Icon */}
        <button
          onClick={onLike}
          title="Save to Favorites"
          className={`relative p-2.5 rounded-xl hover:bg-slate-800 transition-all active:scale-90 group ${
            isLiked ? 'text-red-400' : 'hover:text-red-400'
          }`}
        >
          <Heart size={18} className={isLiked ? "fill-red-400 text-red-400" : ""} />
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-lg border border-slate-800 backdrop-blur-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
            {isLiked ? "Liked" : "Favorite"}
          </span>
        </button>

        <div className="h-px w-6 bg-slate-800 mx-auto" />

        {/* Profile / Author Icon */}
        <button
          title="Author Profile & Collections"
          className="relative p-2.5 rounded-xl hover:bg-slate-800 hover:text-cyan-400 transition-all active:scale-90 group"
        >
          <User size={18} />
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-lg border border-slate-800 backdrop-blur-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
            Author Profile
          </span>
        </button>

      </div>
    </div>
  );
};

export default SideDockPill;
