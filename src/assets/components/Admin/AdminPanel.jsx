// src/assets/components/Admin/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  Trash2, 
  ArrowLeft,
  History,
  ShieldAlert,
  Inbox
} from 'lucide-react';
import { Link } from 'react-router-dom';
import BlogDetailModal from '../Blogs/BlogDetailModal';

const AdminPanel = ({ customSubmissions, onApproveSubmission, onRejectSubmission, onDeleteSubmission }) => {
  const [activeTab, setActiveTab] = useState('new'); // 'new' | 'history'
  const [previewPost, setPreviewPost] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Read submissions from props or localStorage
  const [submissionsList, setSubmissionsList] = useState(customSubmissions || []);

  useEffect(() => {
    if (customSubmissions) {
      setSubmissionsList(customSubmissions);
    } else {
      const saved = localStorage.getItem('solar_user_submissions');
      if (saved) setSubmissionsList(JSON.parse(saved));
    }
  }, [customSubmissions]);

  const pendingSubmissions = submissionsList.filter(s => s.status === 'pending');
  const historySubmissions = submissionsList.filter(s => s.status === 'approved' || s.status === 'rejected');

  const displayedSubmissions = activeTab === 'new' ? pendingSubmissions : historySubmissions;

  const handleApprove = (id) => {
    if (onApproveSubmission) {
      onApproveSubmission(id);
    } else {
      const updated = submissionsList.map(s => s.id === id ? { ...s, status: 'approved' } : s);
      setSubmissionsList(updated);
      localStorage.setItem('solar_user_submissions', JSON.stringify(updated));
    }
  };

  const handleReject = (id) => {
    if (onRejectSubmission) {
      onRejectSubmission(id);
    } else {
      const updated = submissionsList.map(s => s.id === id ? { ...s, status: 'rejected' } : s);
      setSubmissionsList(updated);
      localStorage.setItem('solar_user_submissions', JSON.stringify(updated));
    }
  };

  const handleDelete = (id) => {
    if (onDeleteSubmission) {
      onDeleteSubmission(id);
    } else {
      const updated = submissionsList.filter(s => s.id !== id);
      setSubmissionsList(updated);
      localStorage.setItem('solar_user_submissions', JSON.stringify(updated));
    }
  };

  const handlePreview = (post) => {
    setPreviewPost(post);
    setIsPreviewOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#02040a] text-white p-4 sm:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Simple Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin Approvals</h1>
            <p className="text-xs text-white/60 mt-0.5">Review pending blog submissions or view approval history</p>
          </div>

          <Link
            to="/blog"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition-all"
          >
            <ArrowLeft size={14} />
            <span>Back to Blog</span>
          </Link>
        </div>

        {/* 2 Simple Tabs: New Approvals & History */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('new')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'new'
                ? 'bg-slate-100 text-slate-950 font-extrabold shadow-md'
                : 'bg-slate-900/60 hover:bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            <Inbox size={15} />
            <span>New Approvals</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              activeTab === 'new' ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-slate-300'
            }`}>
              {pendingSubmissions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'history'
                ? 'bg-slate-100 text-slate-950 font-extrabold shadow-md'
                : 'bg-slate-900/60 hover:bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            <History size={15} />
            <span>Approval History</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              activeTab === 'history' ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-slate-300'
            }`}>
              {historySubmissions.length}
            </span>
          </button>
        </div>

        {/* Minimal Submissions List / Table */}
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 overflow-hidden shadow-2xl">
          {displayedSubmissions.length > 0 ? (
            <div className="divide-y divide-white/10">
              {displayedSubmissions.map((sub) => (
                <div 
                  key={sub.id} 
                  className="p-5 flex flex-wrap items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                >
                  {/* Article Info */}
                  <div className="flex items-center gap-4 min-w-0 max-w-lg">
                    <img 
                      src={sub.image} 
                      alt={sub.title} 
                      className="w-14 h-14 rounded-2xl object-cover border border-white/15 shrink-0"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=90&w=1920&auto=format&fit=crop';
                      }}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider bg-cyan-500/20 px-2 py-0.5 rounded-full">
                          {sub.category}
                        </span>
                        <span className="text-[11px] text-white/50">
                          By <strong className="text-white">{sub.author}</strong> • {sub.submittedAt || 'Today'}
                        </span>
                      </div>

                      <h3 className="font-bold text-white text-sm truncate">{sub.title}</h3>
                      <p className="text-xs text-white/60 line-clamp-1 mt-0.5">{sub.description}</p>
                    </div>
                  </div>

                  {/* Actions & Status */}
                  <div className="flex items-center gap-3 shrink-0">
                    
                    {/* Status Badge in History tab */}
                    {activeTab === 'history' && (
                      sub.status === 'approved' ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          <CheckCircle size={13} className="text-emerald-400" />
                          <span>Approved</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                          <XCircle size={13} className="text-red-400" />
                          <span>Rejected</span>
                        </span>
                      )
                    )}

                    {/* Inspect Button */}
                    <button
                      onClick={() => handlePreview(sub)}
                      title="Inspect Article Content"
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
                    >
                      <Eye size={14} />
                      <span>Inspect</span>
                    </button>

                    {/* Action buttons for pending approvals */}
                    {sub.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(sub.id)}
                          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-95"
                        >
                          <CheckCircle size={14} />
                          <span>Approve</span>
                        </button>

                        <button
                          onClick={() => handleReject(sub.id)}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-semibold transition-colors"
                        >
                          <XCircle size={14} />
                          <span>Reject</span>
                        </button>
                      </>
                    )}

                    {/* Delete Icon */}
                    <button
                      onClick={() => handleDelete(sub.id)}
                      title="Delete Record"
                      className="p-2 rounded-xl hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 space-y-2">
              <ShieldAlert size={36} className="mx-auto text-white/30" />
              <h3 className="text-base font-bold text-white">
                {activeTab === 'new' ? 'No new pending approvals' : 'No approval history yet'}
              </h3>
              <p className="text-xs text-white/50 max-w-sm mx-auto">
                {activeTab === 'new' 
                  ? 'All user submitted blogs have been reviewed!' 
                  : 'Past approved or rejected decisions will show up here.'}
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Draft Preview Modal */}
      <BlogDetailModal
        post={previewPost}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
};

export default AdminPanel;
