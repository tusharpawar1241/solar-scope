// src/assets/components/Blogs/SpatialBlogPage.jsx
import React, { useState, useEffect } from 'react';
import { BLOG_COLLECTIONS } from './blogData';
import TopBarPill from './TopBarPill';
import SideDockPill from './SideDockPill';
import BottomControlPill from './BottomControlPill';
import Coverflow3D from './Coverflow3D';
import BlogDetailModal from './BlogDetailModal';
import CreateBlogModal from './CreateBlogModal';
import UserSubmissionsModal from './UserSubmissionsModal';
import { Compass, Orbit, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_SUBMISSIONS = [
  {
    id: 'sub-001',
    title: 'Quantum Gravitational Anomalies Near Event Horizons',
    category: 'Quantum Physics & Cosmology',
    sublocation: 'EHT Computer Observatory',
    location: 'SolarScope Research',
    coords: 'Theoretical Computation',
    description: 'Analyzing metric fluctuations and quantum foam behavior around rotating Kerr black holes.',
    fullArticle: 'Quantum gravity suggests that spacetime loses smooth continuity at Planck scales...',
    image: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=90&w=1920&auto=format&fit=crop',
    author: 'Dr. Astra Lin',
    submittedAt: 'July 21, 2026',
    status: 'pending',
    tags: ['Quantum', 'Gravity', 'Black Hole']
  },
  {
    id: 'sub-002',
    title: 'Solar Flare Spectrogram Analysis (SDO Campaign)',
    category: 'Solar Science & Heliophysics',
    sublocation: 'SDO Helioseismology Lab',
    location: 'SolarScope Research',
    coords: 'L1 Lagrange Point',
    description: 'Ultraviolet magnetic reconnection observations captured during solar maximum flares.',
    fullArticle: 'Solar energetic particle streams accelerate rapidly under magnetic reconnection...',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=90&w=1920&auto=format&fit=crop',
    author: 'Dr. Astra Lin',
    submittedAt: 'July 18, 2026',
    status: 'approved',
    tags: ['Sun', 'SDO', 'Solar Flare']
  }
];

const SpatialBlogPage = () => {
  const [selectedCollectionId, setSelectedCollectionId] = useState('space-quantum-frontier');
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryPickerOpen, setIsCategoryPickerOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});

  // Modals for Create Blog and Status Tracking
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Submissions State with LocalStorage persistence
  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('solar_user_submissions');
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  useEffect(() => {
    localStorage.setItem('solar_user_submissions', JSON.stringify(submissions));
  }, [submissions]);

  const currentCollection = BLOG_COLLECTIONS.find(c => c.id === selectedCollectionId) || BLOG_COLLECTIONS[0];
  
  // Filter posts based on search query
  const posts = currentCollection.posts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalItems = posts.length > 0 ? posts.length : 1;
  const safeActiveIndex = Math.min(activeIndex, totalItems - 1);
  const activePost = posts[safeActiveIndex] || posts[0];

  // Navigation
  const handleNext = () => {
    if (posts.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % posts.length);
  };

  const handlePrev = () => {
    if (posts.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen || isCategoryPickerOpen || isCreateModalOpen || isStatusModalOpen) return;
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [posts.length, isModalOpen, isCategoryPickerOpen, isCreateModalOpen, isStatusModalOpen]);

  const handleExpandCard = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const toggleLike = (postId) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Submit new blog draft
  const handleSubmitBlog = (newBlogDraft) => {
    setSubmissions([newBlogDraft, ...submissions]);
    showToast('🚀 Blog submitted! Pending Admin Approval.');
  };

  // Delete submission
  const handleDeleteSubmission = (id) => {
    setSubmissions(submissions.filter(s => s.id !== id));
    showToast('Deleted submission.');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const pendingCount = submissions.filter(s => s.status === 'pending').length;

  return (
    <div className="relative h-[calc(100vh-80px)] w-full bg-[#020307] text-white flex flex-col justify-between overflow-hidden select-none font-sans">
      
      {/* VIBRANT DEEP SPACE & COSMIC ATMOSPHERE BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 filter blur-2xl scale-110 transition-all duration-1000 brightness-110"
          style={{ 
            backgroundImage: `url(${activePost?.image || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=90&w=1920&auto=format&fit=crop'})`
          }}
        />

        <div className="absolute inset-0 bg-radial from-slate-950/10 via-[#03050c]/85 to-[#010204]" />

        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] rounded-full bg-cyan-600/20 blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full bg-indigo-600/20 blur-[140px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-cyan-400/10 blur-[160px]" />
      </div>

      {/* TOP FLOATING VISIONOS BROWSER BAR */}
      <TopBarPill
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onPrevCard={handlePrev}
        onNextCard={handleNext}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenStatusModal={() => setIsStatusModalOpen(true)}
        pendingCount={pendingCount}
      />

      {/* LEFT VERTICAL FLOATING DOCK */}
      <SideDockPill
        activePostTitle={activePost?.title}
        onLike={() => activePost && toggleLike(activePost.id)}
        isLiked={activePost ? !!likedPosts[activePost.id] : false}
      />

      {/* CENTER 3D COVERFLOW SPACE REEL CANVAS */}
      <main className="relative z-10 w-full flex-1 flex flex-col items-center justify-center overflow-hidden">
        {posts.length > 0 ? (
          <Coverflow3D
            posts={posts}
            activeIndex={safeActiveIndex}
            setActiveIndex={setActiveIndex}
            onExpandCard={handleExpandCard}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        ) : (
          <div className="text-center py-12 px-8 backdrop-blur-2xl bg-white/5 border border-cyan-500/30 rounded-3xl max-w-md shadow-2xl">
            <Compass size={44} className="mx-auto text-cyan-400 mb-3 animate-spin" />
            <h3 className="text-lg font-bold text-white">No space targets found for "{searchQuery}"</h3>
            <p className="text-xs text-white/60 mt-1.5">Try searching for "Quantum", "Entanglement", "JWST", "Black Hole", or clear your filter.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-5 py-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold transition-all text-xs shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            >
              Reset Space Filter
            </button>
          </div>
        )}
      </main>

      {/* BOTTOM FLOATING CONTROL PILL (REEL CONTINUATION) */}
      <BottomControlPill
        currentIndex={safeActiveIndex}
        totalItems={posts.length}
        activePost={activePost}
        collectionTitle="SolarScope"
        collectionSubtitle={currentCollection.title}
        onPrev={handlePrev}
        onNext={handleNext}
        onLike={() => activePost && toggleLike(activePost.id)}
        isLiked={activePost ? !!likedPosts[activePost.id] : false}
      />

      {/* FULL ARTICLE SPATIAL READER EXPANSION MODAL */}
      <BlogDetailModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLiked={selectedPost ? !!likedPosts[selectedPost.id] : false}
        onLike={() => selectedPost && toggleLike(selectedPost.id)}
      />

      {/* WRITE NEW BLOG MODAL */}
      <CreateBlogModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmitBlog={handleSubmitBlog}
      />

      {/* USER SUBMISSIONS & APPROVAL STATUS DASHBOARD MODAL */}
      <UserSubmissionsModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        submissions={submissions}
        onDeleteSubmission={handleDeleteSubmission}
        onOpenCreate={() => setIsCreateModalOpen(true)}
        onPreviewDraft={(draft) => {
          setIsStatusModalOpen(false);
          setSelectedPost(draft);
          setIsModalOpen(true);
        }}
      />

      {/* NOTIFICATION TOAST BANNER */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 bg-cyan-500 text-slate-950 px-5 py-2.5 rounded-full font-bold text-xs shadow-[0_0_25px_rgba(34,211,238,0.6)] flex items-center gap-2"
          >
            <Sparkles size={16} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CATEGORY COLLECTION SELECTOR MODAL */}
      <AnimatePresence>
        {isCategoryPickerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCategoryPickerOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-md bg-slate-950/90 border border-cyan-500/30 rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl text-white"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Orbit className="text-cyan-400" size={22} />
                  <h3 className="text-lg font-bold text-cyan-100">SolarScope Observatories</h3>
                </div>
                <button 
                  onClick={() => setIsCategoryPickerOpen(false)}
                  className="text-white/60 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                {BLOG_COLLECTIONS.map((col) => {
                  const isSelected = col.id === selectedCollectionId;
                  return (
                    <button
                      key={col.id}
                      onClick={() => {
                        setSelectedCollectionId(col.id);
                        setActiveIndex(0);
                        setIsCategoryPickerOpen(false);
                      }}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_25px_rgba(34,211,238,0.25)]' 
                          : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/80'
                      }`}
                    >
                      <div>
                        <h4 className="font-bold text-base text-cyan-50">{col.title}</h4>
                        <p className="text-xs text-cyan-200/60 mt-0.5">{col.subtitle}</p>
                      </div>
                      {isSelected && <Check size={18} className="text-cyan-400" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default SpatialBlogPage;
