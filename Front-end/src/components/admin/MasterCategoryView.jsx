import React from 'react';
import { X, Folder, Link as LinkIcon, Calendar, CheckCircle, AlertCircle, Info } from 'lucide-react';

const MasterCategoryView = ({ isOpen, onClose, category }) => {
  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between shrink-0 bg-white">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Category Details</h2>
            <p className="text-slate-500 text-xs mt-0.5">Full information for ID #{category.master_category_id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 text-slate-400 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* Hero Image Section */}
          <div className="relative group">
            <div className="aspect-video w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
              <img 
                src={category.image_url || "https://via.placeholder.com/400x225?text=No+Image"} 
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${
              category.is_active ? 'bg-emerald-500/90 text-white' : 'bg-slate-500/90 text-white'
            }`}>
              {category.is_active ? 'Active' : 'Inactive'}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] block mb-2">Category Name</label>
              <h3 className="text-2xl font-bold text-slate-900">{category.name}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Folder size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Slug</span>
                </div>
                <p className="text-sm font-semibold text-slate-700">{category.slug}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <LinkIcon size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Icon URL</span>
                </div>
                <p className="text-sm font-semibold text-slate-700 truncate">{category.icon_url || 'N/A'}</p>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] block mb-2">Description</label>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  "{category.description || 'No description provided for this category.'}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all font-bold text-sm"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterCategoryView;