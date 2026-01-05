import React, { useState, useRef } from 'react';
import { X, Save, Upload, Check, AlertCircle } from 'lucide-react';

const MasterCategoryAdd = ({ isOpen, onClose, onSave }) => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    status: 'Active',
    description: '',
    image: null,
    imagePreview: ''
  });

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
        {/* Fixed Header */}
        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between shrink-0 bg-white">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Add Master Category</h2>
            <p className="text-slate-500 text-xs mt-0.5">Create a new top-level category</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-full transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <form id="masterCategoryForm" onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {/* 1. Category Name */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">
                Master Category Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-medium"
                placeholder="e.g. Electronics"
              />
            </div>

            {/* 2. Status Toggle */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">
                Status
              </label>
              <div className="flex p-1 bg-slate-100 rounded-2xl w-full">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, status: 'Active'})}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    formData.status === 'Active' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'
                  }`}
                >
                  <Check size={16} /> Active
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, status: 'Inactive'})}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    formData.status === 'Inactive' ? 'bg-white shadow-sm text-slate-500' : 'text-slate-400'
                  }`}
                >
                  <AlertCircle size={16} /> Inactive
                </button>
              </div>
            </div>

            {/* 3. Image Upload */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">
                Category Image
              </label>
              <div 
                onClick={() => fileInputRef.current.click()}
                className="group cursor-pointer border-2 border-dashed border-slate-200 rounded-3xl p-4 bg-slate-50 hover:bg-slate-100 hover:border-indigo-300 transition-all flex flex-col items-center justify-center min-h-[160px]"
              >
                {formData.imagePreview ? (
                  <div className="relative w-full h-40">
                    <img src={formData.imagePreview} alt="Preview" className="w-full h-full object-contain rounded-xl" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl transition-opacity">
                      <span className="text-white text-xs font-bold bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">Change Image</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-colors border border-slate-100">
                      <Upload size={20} />
                    </div>
                    <p className="text-xs font-bold text-slate-500 mt-3 group-hover:text-slate-700">Click to upload image</p>
                    <p className="text-[10px] text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* 4. Description */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">
                Description
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-medium resize-none"
                placeholder="Briefly describe this category..."
              />
            </div>
          </form>
        </div>

        {/* Fixed Footer Actions */}
        <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex gap-4 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3.5 text-slate-500 font-bold text-sm hover:bg-slate-100 rounded-2xl transition-all border border-slate-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="masterCategoryForm"
            className="flex-[2] flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-bold text-sm shadow-xl shadow-indigo-100"
          >
            <Save size={18} />
            Save Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterCategoryAdd;