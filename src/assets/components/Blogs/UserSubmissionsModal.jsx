// src/assets/components/Blogs/UserSubmissionsModal.jsx
import React from 'react';
import { X, Clock, CheckCircle, XCircle, Trash2, Eye, Plus, FileText, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserSubmissionsModal = ({ isOpen, onClose, submissions = [], onDeleteSubmission, onOpenCreate, onPreviewDraft }) => {
  if (!isOpen) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <CheckCircle size={13} className="text-emerald-400" />
            <span>Approved & Live</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40">
            <XCircle size={13} className="text-red-400" />
            <span>Cancelled</span>
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
            <Clock size={13} className="text-amber-400 animate-pulse" />
            <span>Pending Approval</span>
          </span>
        );
    }
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
          className="relative w-full max-w-4xl bg-slate-950/95 border border-cyan-500/35 rounded-3xl p-6 shadow-[0_25px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl text-white z-10 my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                <FileText size={22} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white leading-tight">My Blog Submissions & Status</h3>
                <p className="text-xs text-cyan-200/70">Track approval status of blogs submitted for Admin review</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenCreate();
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-95"
              >
                <Plus size={14} />
                <span>New Blog</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors ml-2"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/20">
            {submissions.length > 0 ? (
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40">
                <table className="w-full text-left text-xs text-white/80">
                  <thead className="bg-white/5 border-b border-white/10 text-cyan-200 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3.5 px-4">Blog Article</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Submitted Date</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 font-medium">
                    {submissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                        
                        {/* Title */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={sub.image} 
                              alt={sub.title} 
                              className="w-10 h-10 rounded-xl object-cover border border-white/15 shrink-0"
                            />
                            <div>
                              <h4 className="font-bold text-white text-xs line-clamp-1">{sub.title}</h4>
                              <p className="text-[10px] text-white/50 line-clamp-1">{sub.sublocation}</p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4 text-cyan-100 font-semibold whitespace-nowrap">
                          {sub.category}
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-4 text-white/60 whitespace-nowrap">
                          {sub.submittedAt || 'Today'}
                        </td>

                        {/* Status Badge */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {getStatusBadge(sub.status)}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onPreviewDraft(sub)}
                              title="Preview Draft"
                              className="p-1.5 rounded-lg bg-white/10 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors"
                            >
                              <Eye size={15} />
                            </button>

                            <button
                              onClick={() => onDeleteSubmission(sub.id)}
                              title="Delete Submission"
                              className="p-1.5 rounded-lg bg-white/10 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 px-6 rounded-2xl border border-white/10 bg-white/5 space-y-3">
                <ShieldAlert size={40} className="mx-auto text-cyan-400/60" />
                <h4 className="text-base font-bold text-white">No Submitted Blogs Yet</h4>
                <p className="text-xs text-white/60 max-w-sm mx-auto">
                  You haven't submitted any research blogs for Admin review. Click below to draft your first space article!
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenCreate();
                  }}
                  className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                >
                  <Plus size={15} />
                  <span>Write Your First Blog</span>
                </button>
              </div>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UserSubmissionsModal;
