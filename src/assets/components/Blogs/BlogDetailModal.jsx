// src/assets/components/Blogs/BlogDetailModal.jsx
import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Navigation, 
  Heart, 
  Bookmark,
  UserPlus,
  UserCheck,
  MessageSquare,
  Send,
  ThumbsUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSession } from '../../../lib/api/auth';

const BlogDetailModal = ({ post, isOpen, onClose, isLiked, onLike }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  // Stateful comment list for the current post
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Dr. Sarah Connor',
      role: 'Astrophysicist',
      time: '2 hours ago',
      text: 'Remarkable research! The quantum implications of these observations completely reframe our models.',
      likes: 14,
      isLiked: false
    },
    {
      id: 2,
      author: 'Prof. Alexei Petrov',
      role: 'Quantum Theorist',
      time: '5 hours ago',
      text: 'Have you correlated this dataset with the latest JWST NIRSpec spectroscopy readings?',
      likes: 9,
      isLiked: false
    },
    {
      id: 3,
      author: 'Elena Vance',
      role: 'Space Researcher',
      time: '1 day ago',
      text: 'The clarity of this dataset is incredible. Looking forward to the peer-reviewed release!',
      likes: 22,
      isLiked: false
    }
  ]);

  const [newCommentText, setNewCommentText] = useState('');

  if (!isOpen || !post) return null;

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    // Fetch user from auth session
    const { user } = getSession();

    const newComment = {
      id: Date.now(),
      author: user?.name || 'Explorer',
      role: user?.name ? 'Verified Member' : 'Space Researcher',
      time: 'Just now',
      text: newCommentText.trim(),
      likes: 0,
      isLiked: false
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  const handleToggleCommentLike = (commentId) => {
    setComments(comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          likes: c.isLiked ? c.likes - 1 : c.likes + 1,
          isLiked: !c.isLiked
        };
      }
      return c;
    }));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Spatial Reader Card Modal Container - Expands smoothly when comments open */}
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", damping: 26, stiffness: 280 }}
          className={`relative w-full ${
            isCommentsOpen ? 'max-w-6xl' : 'max-w-3xl'
          } max-h-[90vh] bg-slate-950/95 border border-cyan-500/35 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl flex flex-col md:flex-row z-10 text-white transition-all duration-500`}
        >

          {/* LEFT PANEL: MAIN BLOG ARTICLE READER */}
          <div className={`flex-1 flex flex-col min-w-0 overflow-y-auto ${isCommentsOpen ? 'md:w-1/2 border-b md:border-b-0 md:border-r border-white/10' : 'w-full'}`}>
            
            {/* Modal Header Bar */}
            <div className="relative h-60 sm:h-72 w-full shrink-0">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=90&w=1920&auto=format&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30" />

              {/* Top controls inside image */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-cyan-500/30 text-xs font-medium">
                  <MapPin size={13} className="text-cyan-400" />
                  <span>{post.sublocation}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onLike}
                    className={`p-2 rounded-full backdrop-blur-md border border-white/20 transition-all ${
                      isLiked ? 'bg-red-500/30 text-red-400 border-red-500/50' : 'bg-black/60 hover:bg-black/80 text-white'
                    }`}
                  >
                    <Heart size={16} className={isLiked ? "fill-red-400 text-red-400" : ""} />
                  </button>

                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-2 rounded-full backdrop-blur-md border border-white/20 transition-all ${
                      isBookmarked ? 'bg-cyan-500/30 text-cyan-400 border-cyan-500/50' : 'bg-black/60 hover:bg-black/80 text-white'
                    }`}
                  >
                    <Bookmark size={16} className={isBookmarked ? "fill-cyan-400 text-cyan-400" : ""} />
                  </button>

                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-black/60 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Header Content overlay */}
              <div className="absolute bottom-4 left-5 right-5">
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/20 border border-cyan-500/40 px-2.5 py-0.5 rounded-full mb-2">
                  {post.tags?.[0] || 'Space Science'}
                </span>
                <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white mb-1.5 leading-tight drop-shadow-md">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-xs text-white/80 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-cyan-400" />
                    {post.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Navigation size={11} className="text-amber-400" />
                    {post.coords}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body - Scrollable Reader */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-white/20">
              
              {/* Meta bar: Author & Follow Button */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center font-extrabold text-white shadow-md text-sm">
                    {post.author?.[0] || 'A'}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">{post.author}</h4>
                    <p className="text-[11px] text-white/60">{post.authorRole} • {post.readTime}</p>
                  </div>
                </div>

                {/* Follow Author Button */}
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all ${
                    isFollowing 
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' 
                      : 'bg-cyan-400 hover:bg-cyan-300 border-cyan-300 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                  }`}
                >
                  {isFollowing ? <UserCheck size={13} /> : <UserPlus size={13} />}
                  <span>{isFollowing ? "Following" : "+ Follow"}</span>
                </button>
              </div>

              {/* Main Text Content */}
              <div className="prose prose-invert max-w-none text-white/85 text-xs sm:text-sm leading-relaxed space-y-3">
                <p className="text-base font-light text-cyan-100 leading-relaxed border-l-2 border-cyan-400 pl-3 py-1">
                  {post.description}
                </p>
                
                {post.fullArticle.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={idx} className="text-lg font-bold text-white pt-3 border-b border-white/10 pb-1.5">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  return <p key={idx}>{paragraph}</p>;
                })}
              </div>

              {/* Tags & Comment Trigger Button */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-white/60 font-medium mr-1">Tags:</span>
                  {post.tags?.map((tag, i) => (
                    <span 
                      key={i} 
                      className="text-[11px] bg-white/10 hover:bg-white/20 border border-white/15 px-2.5 py-0.5 rounded-full text-white/80 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* RED MARKER COMMENT BUTTON */}
                <button
                  onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold transition-all shadow-md active:scale-95 ${
                    isCommentsOpen 
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]' 
                      : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border-cyan-400/50 hover:border-cyan-400'
                  }`}
                >
                  <MessageSquare size={15} className={isCommentsOpen ? "text-slate-950" : "text-cyan-400"} />
                  <span>{isCommentsOpen ? "Hide Discussion" : `Comments (${comments.length})`}</span>
                </button>
              </div>

            </div>

          </div>

          {/* RIGHT PANEL: EQUAL-SIZE SIDE-BY-SIDE COMMENTS SECTION */}
          <AnimatePresence>
            {isCommentsOpen && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full md:w-1/2 flex flex-col h-auto md:h-full bg-slate-950/80 p-5 space-y-4 shrink-0 border-t md:border-t-0 md:border-l border-cyan-500/20"
              >
                {/* Comments Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={18} className="text-cyan-400" />
                    <h3 className="font-bold text-base text-white">
                      Discussion & Research Notes
                    </h3>
                    <span className="text-xs font-bold text-cyan-300 bg-cyan-500/20 border border-cyan-500/40 px-2 py-0.5 rounded-full">
                      {comments.length}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsCommentsOpen(false)}
                    title="Close Comments"
                    className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Comment Input Form (Automatically uses logged in user session) */}
                <form onSubmit={handleAddComment} className="space-y-2 bg-white/5 border border-white/10 rounded-2xl p-3">
                  <div className="relative">
                    <textarea
                      rows={2}
                      placeholder="Add a scientific comment or theory observation..."
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-white/40 outline-none focus:border-cyan-400 resize-none pr-10"
                    />
                    <button
                      type="submit"
                      disabled={!newCommentText.trim()}
                      className="absolute right-2.5 bottom-3.5 p-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 disabled:opacity-40 disabled:hover:bg-cyan-400 transition-all shadow-md"
                    >
                      <Send size={13} />
                    </button>
                  </div>
                </form>

                {/* Scrollable Comments List */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-white/20">
                  {comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center font-bold text-cyan-300 text-xs shrink-0">
                            {comment.author[0]}
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-white leading-tight">
                              {comment.author}
                            </h5>
                            <span className="text-[10px] text-white/50">
                              {comment.role} • {comment.time}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleToggleCommentLike(comment.id)}
                          className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border transition-colors ${
                            comment.isLiked 
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' 
                              : 'bg-black/40 border-white/10 text-white/60 hover:text-white'
                          }`}
                        >
                          <ThumbsUp size={11} className={comment.isLiked ? "fill-cyan-400 text-cyan-400" : ""} />
                          <span>{comment.likes}</span>
                        </button>
                      </div>

                      <p className="text-xs text-white/85 leading-relaxed font-normal">
                        {comment.text}
                      </p>
                    </motion.div>
                  ))}
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BlogDetailModal;
