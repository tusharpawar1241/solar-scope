// src/assets/components/blog/BlogModal.jsx
//
// A full-screen overlay (modal) that wraps BlogForm.
// It is responsible for:
//   1. Showing/hiding itself based on the `isOpen` prop
//   2. Calling the correct API function (create or edit) on submit
//   3. Telling the parent (BlogPage) to refresh posts after a change

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import BlogForm from './BlogForm';
import { createBlog, updateBlog } from '../../../lib/api/blogs';

// ── Props ──────────────────────────────────────────────────────
// isOpen      : boolean — whether the modal is visible
// onClose     : function — called when user clicks Cancel or the X button
// onSuccess   : function — called after a successful create/edit so BlogPage refreshes
// mode        : 'create' | 'edit'
// editingPost : the post object when mode === 'edit', null when creating

const BlogModal = ({ isOpen, onClose, onSuccess, mode = 'create', editingPost = null }) => {

  // ── Submit handler ───────────────────────────────────────────
  // This is passed down to BlogForm as its `onSubmit` prop.
  // BlogForm calls it with { title, content } when the user clicks submit.
  const handleSubmit = async ({ title, content }) => {
    if (mode === 'create') {
      await createBlog({ title, content });
    } else {
      // editingPost._id tells updateBlog which post to patch
      await updateBlog(editingPost._id, { title, content });
    }
    // Tell BlogPage the operation succeeded so it can refetch the posts list
    onSuccess();
    // Close the modal
    onClose();
  };

  return (
    // AnimatePresence allows exit animations when isOpen goes false
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ──────────────────────────────────────
              A semi-transparent dark overlay behind the modal card.
              Clicking it closes the modal (same as Cancel). */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* ── Modal Card ────────────────────────────────────
              The white (dark) card that slides up into view.
              z-50 puts it above the backdrop (z-40). */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            // Stop clicks inside the card from reaching the backdrop
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-black/50 p-6">

              {/* ── Modal Header ────────────────────────────── */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {mode === 'create' ? ' New Post' : ' Edit Post'}
                </h2>
                {/* X close button — top right corner */}
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-white transition-colors duration-200 p-1 rounded-lg hover:bg-slate-800"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* ── BlogForm lives here ──────────────────────
                  We pass:
                  - mode so BlogForm knows create vs edit
                  - initialData so BlogForm can pre-fill inputs when editing
                  - onSubmit to hand control back up to BlogModal
                  - onCancel to close without saving */}
              <BlogForm
                mode={mode}
                initialData={editingPost}
                onSubmit={handleSubmit}
                onCancel={onClose}
              />

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BlogModal;
