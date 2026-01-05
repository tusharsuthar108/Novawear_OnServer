import React, { useState, useRef } from 'react';
import { X, Save, Upload, Check, AlertCircle, ChevronDown, Layers } from 'lucide-react';

const SubCategoryAdd = ({ isOpen, onClose, onSave, masterCategories = [], categories = [] }) => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    masterCategoryId: '',
    categoryId: '',
    status: 'Active',
    description: '',
    image: null,
    imagePreview: ''
  });

  if (!isOpen) return null;

  // Filter categories based on selected Master Category
  const filteredCategories = categories.filter(
    (cat) => cat.masterId === parseInt(formData.masterCategoryId)
  );

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
    if (!formData.name || !formData.masterCategoryId || !formData.categoryId) {
      alert("Please complete all required selections");
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
        {/* Fixed Header */}
        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Add Sub-Category</h2>
              <p className="text-slate-500 text-xs mt-0.5">Define level-3 classification</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          <form id="subCategoryForm" onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1. Sub-Category Name */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                Sub-Category Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-medium"
                placeholder="e.g. Wireless Headphones"
              />
            </div>

            {/* 2. Select Master Category */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                Step 1: Select Master Category
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.masterCategoryId}
                  onChange={(e) => setFormData({...formData, masterCategoryId: e.target.value, categoryId: ''})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-medium appearance-none cursor-pointer"
                >
                  <option value="">Choose Master Category</option>
                  {masterCategories.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
            </div>

            {/* 3. Select Category (Dependent on Master) */}
            <div className={`space-y-2 transition-all duration-300 ${!formData.masterCategoryId ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                Step 2: Select Category
              </label>
              <div className="relative">
                <select
                  required
                  disabled={!formData.masterCategoryId}
                  value={formData.categoryId}
                  onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-medium appearance-none cursor-pointer"
                >
                  <option value="">{formData.masterCategoryId ? "Choose Category" : "Select Master first"}</option>
                  {filteredCategories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
            </div>

            {/* 4. Status Toggle */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
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

            {/* 5. Image Upload */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                Display Image
              </label>
              <div 
                onClick={() => fileInputRef.current.click()}
                className="group cursor-pointer border-2 border-dashed border-slate-200 rounded-3xl p-4 bg-slate-50 hover:bg-slate-100 transition-all flex flex-col items-center justify-center min-h-[140px]"
              >
                {formData.imagePreview ? (
                  <div className="relative w-full h-32">
                    <img src={formData.imagePreview} alt="Preview" className="w-full h-full object-contain rounded-xl" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl transition-opacity font-bold text-white text-xs">Change</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto text-slate-400 group-hover:text-indigo-500 mb-2" size={24} />
                    <p className="text-xs font-bold text-slate-500">Click to upload icon</p>
                  </div>
                )}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
              </div>
            </div>

            {/* 6. Description */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-medium resize-none"
                placeholder="Details about this sub-category..."
              />
            </div>
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex gap-4 shrink-0">
          <button onClick={onClose} className="flex-1 px-6 py-3.5 text-slate-500 font-bold text-sm hover:bg-slate-100 rounded-2xl transition-all border border-slate-200">
            Cancel
          </button>
          <button
            type="submit"
            form="subCategoryForm"
            className="flex-[2] flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-bold text-sm shadow-xl shadow-indigo-100"
          >
            <Save size={18} />
            Save Sub-Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryAdd;