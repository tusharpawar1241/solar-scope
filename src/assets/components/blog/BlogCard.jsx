// src/assets/components/blog/BlogCard.jsx
//
// Renders a single blog post as a card.
// Shows Edit and Delete buttons ONLY if the current user is the post's author.
// The parent (BlogPage) passes down the currentUser and the callback handlers.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Trash2, User, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

// ── Helper: format ISO date string → "July 12, 2026" ─────────
const formatDate = (isoString) => {
  return new Date(isoString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// ── Helper: truncate long content for the preview ────────────
const PREVIEW_LENGTH = 160;

// ── Props ─────────────────────────────────────────────────────
// post        : the full post object { _id, title, content, author, createdAt }
// currentUser : { _id, name } — the logged-in user from blogs.js
// onEdit      : function(post) — called when Edit is clicked
// onDelete    : function(postId) — called when Delete is confirmed

const BlogCard = ({ post, currentUser, onEdit, onDelete }) => {
  // Controls whether the full content is expanded or just the preview
  const [expanded, setExpanded] = useState(false);

  // Controls the delete confirmation state (shows Yes/No instead of the trash icon)
  const [confirmDelete, setConfirmDelete] = useState(false);

  // True if this post was written by the currently logged-in user
  const isOwner = post.author._id === currentUser._id;

  // What to show in the card body — truncated preview or full content
  const isLong = post.content.length > PREVIEW_LENGTH;
  const displayContent = expanded || !isLong
    ? post.content
    : post.content.slice(0, PREVIEW_LENGTH) + '...';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className={`
        relative rounded-2xl border p-5 flex flex-col gap-4
        bg-slate-900 transition-colors duration-200
        ${isOwner
          ? 'border-cyan-500/40 shadow-[0_0_20px_-8px_#22d3ee40]'  // owner gets a cyan accent glow
          : 'border-slate-800 hover:border-slate-700'               // others are plain
        }
      `}
    >

      {/* ── Owner badge ──────────────────────────────────────────
          Small pill in the top-right corner — visible only on your own posts */}
      {isOwner && (
        <span className="absolute top-4 right-4 text-xs font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-full">
          Your post
        </span>
      )}

      {/* ── Title ────────────────────────────────────────────── */}
      <h3 className="text-lg font-bold text-white leading-snug pr-20">
        {post.title}
      </h3>

      {/* ── Content preview / expanded ───────────────────────── */}
      <p className="text-slate-400 text-sm leading-relaxed">
        {displayContent}
      </p>

      {/* ── Read more / Show less toggle ─────────────────────── */}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors w-fit"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}

      {/* ── Footer: author + date + actions ─────────────────── */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-800">

        {/* Left side — author name and post date */}
        <div className="flex flex-col gap-0.5">
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <User size={12} className="text-slate-500" />
            {post.author.name}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar size={12} />
            {formatDate(post.createdAt)}
          </span>
        </div>

        {/* Right side — Edit / Delete buttons (owner only) */}
        {isOwner && (
          <div className="flex items-center gap-2">

            {/* ── Delete confirmation flow ──────────────────────
                First click: shows "Delete?" + Yes / No buttons
                Yes: calls onDelete and resets
                No: just resets back to the trash icon */}
            <AnimatePresence mode="wait">
              {confirmDelete ? (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-xs text-slate-400">Delete?</span>
                  <button
                    onClick={() => { onDelete(post._id); setConfirmDelete(false); }}
                    className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                  >
                    No
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="actions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1"
                >
                  {/* Edit button */}
                  <button
                    onClick={() => onEdit(post)}
                    title="Edit post"
                    className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10
                               transition-colors duration-200"
                  >
                    <Pencil size={15} />
                  </button>

                  {/* Delete button — first click triggers confirm flow */}
                  <button
                    onClick={() => setConfirmDelete(true)}
                    title="Delete post"
                    className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10
                               transition-colors duration-200"
                  >
                    <Trash2 size={15} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        )}
      </div>

    </motion.div>
  );
};

export default BlogCard;
