// src/assets/components/Blogs/CreateBlogModal.jsx
import React, { useState } from 'react';
import { X, Sparkles, Send, Image as ImageIcon, Tag, AlignLeft, BookOpen, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSession } from '../../../lib/api/auth';

const CreateBlogModal = ({ isOpen, onClose, onSubmitBlog }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Quantum Physics & Cosmology');
  const [sublocation, setSublocation] = useState('Heliosphere Orbit');
  const [description, setDescription] = useState('');
  const [fullArticle, setFullArticle] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('Quantum, Spacetime, Theory');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !fullArticle.trim()) return;

    const { user } = getSession();

    const newBlogDraft = {
      id: `submission-${Date.now()}`,
      title: title.trim(),
      category,
      sublocation: sublocation.trim() || 'Deep Space Observatory',
      location: 'SolarScope Research Network',
      coords: 'Submitted for Peer Review',
      description: description.trim(),
      fullArticle: fullArticle.trim(),
      image: image.trim() || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=90&w=1920&auto=format&fit=crop',
      author: user?.name || 'SolarScope Author',
      authorRole: 'Space Contributor',
      readTime: `${Math.max(3, Math.ceil(fullArticle.split(' ').length / 150))} min read`,
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'pending', // 'pending' | 'approved' | 'rejected'
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      likes: 0
    };

    onSubmitBlog(newBlogDraft);

    // Reset Form
    setTitle('');
    setDescription('');
    setFullArticle('');
    setImage('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 25 }}
          className="relative w-full max-w-2xl bg-slate-950/95 border border-cyan-500/40 rounded-3xl p-6 shadow-[0_25px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl text-white z-10 my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white leading-tight">Write Space Research Blog</h3>
                <p className="text-xs text-cyan-200/70">Submits to Admin for peer review & publishing approval</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/20">
            
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-cyan-200 mb-1.5 flex items-center gap-1.5">
                <BookOpen size={13} className="text-cyan-400" />
                Blog Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Quantum Gravity Anomalies in Black Hole Singularities"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-white/40 outline-none focus:border-cyan-400"
              />
            </div>

            {/* Category & Tags Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-cyan-200 mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-cyan-400"
                >
                  <option value="Quantum Physics & Cosmology">Quantum Physics & Cosmology</option>
                  <option value="Solar Science & Heliophysics">Solar Science & Heliophysics</option>
                  <option value="Deep Space & Exoplanets">Deep Space & Exoplanets</option>
                  <option value="Theoretical Astrophysics">Theoretical Astrophysics</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-cyan-200 mb-1.5 flex items-center gap-1.5">
                  <Tag size={13} className="text-cyan-400" />
                  Tags (Comma Separated)
                </label>
                <input
                  type="text"
                  placeholder="Quantum, Gravity, Relativity"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Sublocation / Field Station */}
            <div>
              <label className="block text-xs font-bold text-cyan-200 mb-1.5">Observatory / Research Center</label>
              <input
                type="text"
                placeholder="e.g. CERN / JWST Deep Field Spectrometer"
                value={sublocation}
                onChange={(e) => setSublocation(e.target.value)}
                className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/40 outline-none focus:border-cyan-400"
              />
            </div>

            {/* Abstract / Summary */}
            <div>
              <label className="block text-xs font-bold text-cyan-200 mb-1.5 flex items-center gap-1.5">
                <AlignLeft size={13} className="text-cyan-400" />
                Short Abstract / Summary *
              </label>
              <textarea
                required
                rows={2}
                placeholder="A brief 2-3 sentence synopsis of your scientific theory or observation..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-black/50 border border-white/15 rounded-xl p-3 text-xs text-white placeholder-white/40 outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            {/* Full Article Content */}
            <div>
              <label className="block text-xs font-bold text-cyan-200 mb-1.5">Full Research Article Content *</label>
              <textarea
                required
                rows={5}
                placeholder="Write your complete blog article here... Use '### Section Title' for headings."
                value={fullArticle}
                onChange={(e) => setFullArticle(e.target.value)}
                className="w-full bg-black/50 border border-white/15 rounded-xl p-3 text-xs text-white placeholder-white/40 outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            {/* Cover Image URL */}
            <div>
              <label className="block text-xs font-bold text-cyan-200 mb-1.5 flex items-center gap-1.5">
                <ImageIcon size={13} className="text-cyan-400" />
                Cover Image URL (Optional)
              </label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/40 outline-none focus:border-cyan-400"
              />
            </div>

            {/* Admin Approval Notice Banner */}
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
              <AlertCircle size={16} className="text-amber-400 shrink-0" />
              <span>After submission, your blog will be reviewed by the Admin team before appearing on the public blog feed.</span>
            </div>

            {/* Submit Button */}
            <div className="pt-3 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-white/20 text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-95"
              >
                <Send size={14} />
                <span>Submit for Admin Approval</span>
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateBlogModal;
