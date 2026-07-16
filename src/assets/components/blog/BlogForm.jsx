// src/assets/components/blog/BlogForm.jsx
//
// A controlled form that handles both CREATE and EDIT modes.
// Mode is determined by the `mode` prop passed from BlogModal.
// On submit it calls the appropriate API function and notifies the parent.

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const BlogForm = ({ mode = 'create', initialData = null, onSubmit, onCancel }) => {
  // ── Local form state ─────────────────────────────────────────
  // Two fields: title and content. Both start empty (create mode)
  // or pre-filled with the existing post's values (edit mode).
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Tracks whether the API call is in-flight so we can show a spinner
  const [loading, setLoading] = useState(false);

  // Holds any validation or API error message to show below the form
  const [error, setError] = useState('');

  // ── Pre-fill form when editing ───────────────────────────────
  // useEffect runs once when the component mounts.
  // If we're in 'edit' mode, initialData contains the existing post,
  // so we populate the inputs with its current title and content.
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    }
  }, [mode, initialData]);

  // ── Submit handler ───────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent browser page reload on form submit
    setError('');

    // Client-side validation before even calling the API
    if (!title.trim() || !content.trim()) {
      setError('Both title and content are required.');
      return;
    }

    setLoading(true);
    try {
      // onSubmit is provided by BlogModal — it calls either createBlog or updateBlog
      await onSubmit({ title, content });
    } catch (err) {
      // If the API call throws (e.g. ownership error), show the message
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* ── Title Input ─────────────────────────────────────── */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="blog-title" className="text-sm font-semibold text-slate-300 tracking-wide">
          Title
        </label>
        <input
          id="blog-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title..."
          maxLength={150}
          disabled={loading}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5
                     text-white placeholder-slate-500 text-sm
                     focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50
                     disabled:opacity-50 transition-colors duration-200"
        />
        {/* Character counter — helpful for the 150 char max */}
        <span className="text-xs text-slate-500 text-right">{title.length}/150</span>
      </div>

      {/* ── Content Textarea ────────────────────────────────── */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="blog-content" className="text-sm font-semibold text-slate-300 tracking-wide">
          Content
        </label>
        <textarea
          id="blog-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post content here..."
          rows={6}
          disabled={loading}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5
                     text-white placeholder-slate-500 text-sm resize-none
                     focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50
                     disabled:opacity-50 transition-colors duration-200"
        />
      </div>

      {/* ── Error Message ────────────────────────────────────── */}
      {error && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      {/* ── Action Buttons ───────────────────────────────────── */}
      <div className="flex justify-end gap-3 pt-1">
        {/* Cancel — calls onCancel from BlogModal, which closes the modal */}
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-5 py-2 rounded-lg text-sm font-semibold text-slate-400
                     border border-slate-700 hover:border-slate-500 hover:text-white
                     transition-colors duration-200 disabled:opacity-50"
        >
          Cancel
        </button>

        {/* Submit — shows a spinner while the API call is in-flight */}
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 rounded-lg text-sm font-semibold
                     bg-cyan-500 hover:bg-cyan-400 text-slate-950
                     flex items-center gap-2 transition-colors duration-200
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          {loading
            ? mode === 'create' ? 'Publishing...' : 'Saving...'
            : mode === 'create' ? 'Publish Post' : 'Save Changes'
          }
        </button>
      </div>

    </form>
  );
};

export default BlogForm;
