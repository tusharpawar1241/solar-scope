// src/assets/components/blog/BlogPage.jsx
//
// Top-level container for the entire blog feature.
// Responsibilities:
//   1. Fetch all posts on mount and after any create/edit/delete
//   2. Own the modal open/close state and which post is being edited
//   3. Handle delete — call the API, then refresh the list
//   4. Pass the right props down to BlogCard and BlogModal

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PlusCircle, Loader2, AlertCircle, Rss, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getBlogs, deleteBlog } from '../../../lib/api/blogs';
import { getSession } from '../../../lib/api/auth';

const isDemoMode = () => localStorage.getItem('solar_token') === 'demo-mode';
import BlogCard from './BlogCard';
import BlogModal from './BlogModal';

const BlogPage = () => {
  const navigate = useNavigate();
  const { user: currentUser } = getSession(); // null if not logged in
  // ── Posts state ───────────────────────────────────────────────
  const [posts, setPosts]     = useState([]);       // the list of blog posts
  const [loading, setLoading] = useState(true);     // true while the initial fetch is running
  const [error, setError]     = useState('');       // holds any fetch-level error message

  // ── Modal state ───────────────────────────────────────────────
  const [modalOpen, setModalOpen]       = useState(false);        // is the modal visible?
  const [modalMode, setModalMode]       = useState('create');     // 'create' or 'edit'
  const [editingPost, setEditingPost]   = useState(null);         // the post being edited (null when creating)

  // ── Fetch posts ───────────────────────────────────────────────
  // useCallback so we can call fetchPosts() anywhere (on mount, after create/edit/delete)
  // without re-creating the function reference every render.
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getBlogs();
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch once when the component first mounts
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // ── Open modal for creating a new post ────────────────────────
  const handleOpenCreate = () => {
    setEditingPost(null);       // no pre-existing post
    setModalMode('create');
    setModalOpen(true);
  };

  // ── Open modal for editing an existing post ───────────────────
  const handleOpenEdit = (post) => {
    setEditingPost(post);       // pass the post so BlogForm can pre-fill
    setModalMode('edit');
    setModalOpen(true);
  };

  // ── Close modal ───────────────────────────────────────────────
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingPost(null);
  };

  // ── Delete a post ─────────────────────────────────────────────
  // BlogCard calls this with the post's _id after the user confirms.
  const handleDelete = async (postId) => {
    try {
      await deleteBlog(postId);
      // Optimistically remove from local state — no need to refetch the whole list
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      alert(err.message); // surface permission / not-found errors
    }
  };

  // ── After a successful create or edit ─────────────────────────
  // BlogModal calls this once the API responds successfully.
  // We simply refetch to get the updated list (simple and always correct).
  const handleSuccess = () => {
    fetchPosts();
  };

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">

      {/* ── Demo mode banner ─────────────────────────────────── */}
      {isDemoMode() && (
        <div className="mb-6 flex items-center gap-3 bg-amber-400/10 border border-amber-400/30
                        rounded-xl px-4 py-3 text-amber-300 text-sm">
          <span className="text-base">🚀</span>
          <span>
            <strong>Demo Mode</strong> — you&apos;re browsing without an account.
            Data is temporary and resets on refresh.
          </span>
        </div>
      )}

      {/* ── Page header ──────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Rss size={28} className="text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">SolarScope Blog</h1>
            <p className="text-slate-500 text-sm mt-0.5">Community posts &amp; solar insights</p>
          </div>
        </div>

        {/* ── New Post button (logged in) or Sign In prompt ── */}
        {currentUser ? (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-4 py-2 rounded-xl
                       bg-cyan-500 hover:bg-cyan-400 text-slate-950
                       font-semibold text-sm transition-colors duration-200
                       shadow-lg shadow-cyan-500/20"
          >
            <PlusCircle size={17} />
            New Post
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl
                       border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10
                       font-semibold text-sm transition-colors duration-200"
          >
            <LogIn size={17} />
            Sign in to post
          </motion.button>
        )}
      </div>

      {/* ── Loading state ────────────────────────────────────── */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-500">
          <Loader2 size={32} className="animate-spin text-cyan-500" />
          <span className="text-sm">Loading posts...</span>
        </div>
      )}

      {/* ── Error state ──────────────────────────────────────── */}
      {!loading && error && (
        <div className="flex items-center gap-3 bg-red-400/10 border border-red-400/30
                        rounded-xl px-5 py-4 text-red-400">
          <AlertCircle size={20} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* ── Empty state ──────────────────────────────────────── */}
      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-24">
          <p className="text-slate-500 text-lg">No posts yet.</p>
          <p className="text-slate-600 text-sm mt-1">Be the first to write something!</p>
        </div>
      )}

      {/* ── Posts list ───────────────────────────────────────────
          AnimatePresence lets cards animate OUT when deleted */}
      {!loading && !error && posts.length > 0 && (
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {posts.map((post) => (
              <BlogCard
                key={post._id}
                post={post}
                currentUser={currentUser}  // null when not logged in — BlogCard hides buttons
                onEdit={handleOpenEdit}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* ── Modal (mounted once, shown/hidden via isOpen) ───── */}
      <BlogModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
        mode={modalMode}
        editingPost={editingPost}
      />

    </div>
  );
};

export default BlogPage;
