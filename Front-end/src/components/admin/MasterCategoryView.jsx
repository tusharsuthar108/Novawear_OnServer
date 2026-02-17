import React from 'react';
import { X, Calendar, Tag, Image, ToggleLeft, ToggleRight } from 'lucide-react';
import { PLACEHOLDER_IMAGE } from '../../utils/constants';

const MasterCategoryView = ({ isOpen, onClose, category }) => {
  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Category Details</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-6">
            <img 
              src={category.image_url ? `http://localhost:3000${category.image_url}` : PLACEHOLDER_IMAGE} 
              alt={category.name}
              className="w-24 h-24 rounded-xl object-cover border border-slate-200"
              onError={(e) => e.target.src = PLACEHOLDER_IMAGE}
            />
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{category.name}</h3>
              <p className="text-slate-500 text-sm mt-1">ID: #{category.master_category_id}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <Tag className="text-slate-400" size={20} />
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Slug</p>
                  <p className="font-semibold text-slate-900">{category.slug}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <Calendar className="text-slate-400" size={20} />
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Created</p>
                  <p className="font-semibold text-slate-900">
                    {new Date(category.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                {category.is_active ? (
                  <ToggleRight className="text-emerald-500" size={20} />
                ) : (
                  <ToggleLeft className="text-slate-400" size={20} />
                )}
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Status</p>
                  <p className={`font-semibold ${category.is_active ? 'text-emerald-600' : 'text-slate-500'}`}>
                    {category.is_active ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <Image className="text-slate-400" size={20} />
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Image</p>
                  <p className="font-semibold text-slate-900">
                    {category.image_url ? 'Available' : 'No Image'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-slate-200">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterCategoryView;