import React, { useState, useRef, useEffect } from 'react';
import { X, Save, Upload, Check, AlertCircle, ChevronDown, Layers } from 'lucide-react';

const SubCategoryEdit = ({ isOpen, onClose, onSave, categories = [], masterCategories = [], subCategory = null }) => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    master_category_id: '',
    category_id: '',
    is_active: true,
    description: '',
    imageFile: null,
    imagePreview: ''
  });
  const [originalImageUrl, setOriginalImageUrl] = useState('');

  // Initialize form data when subCategory changes
  useEffect(() => {
    if (subCategory && categories.length > 0 && masterCategories.length > 0) {
      // Find master category ID by name
      const masterCategory = masterCategories.find(mc => mc.name === subCategory.master_category_name);
      const masterCategoryId = masterCategory ? masterCategory.master_category_id.toString() : '';
      
      // Find category ID by name and master category
      const category = categories.find(c => c.name === subCategory.category_name && c.master_category_id === parseInt(masterCategoryId));
      const categoryId = category ? category.category_id.toString() : '';
      
      const imageUrl = subCategory.image_url ? `http://localhost:3000${subCategory.image_url}` : '';
      
      setFormData({
        name: subCategory.name || '',
        master_category_id: masterCategoryId,
        category_id: categoryId,
        is_active: subCategory.is_active !== undefined ? subCategory.is_active : true,
        description: subCategory.description || '',
        imageFile: null,
        imagePreview: imageUrl
      });
      setOriginalImageUrl(imageUrl);
    }
  }, [subCategory, categories, masterCategories]);

  // Filter categories based on selected master category
  const filteredCategories = formData.master_category_id 
    ? categories.filter(cat => cat.master_category_id === parseInt(formData.master_category_id))
    : [];

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imageFile: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category_id) {
      alert("Please complete all required fields");
      return;
    }
    
    const submitData = {
      ...formData,
      slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
      sub_category_id: subCategory?.sub_category_id,
      updateImage: !!formData.imageFile // true if new image, false if keep existing
    };
    
    onSave(submitData);
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
              <h2 className="text-xl font-bold text-slate-900">Edit Sub-Category</h2>
              <p className="text-slate-500 text-xs mt-0.5">Modify level-3 classification</p>
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
                Select Master Category *
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.master_category_id}
                  onChange={(e) => setFormData({...formData, master_category_id: e.target.value, category_id: ''})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-medium appearance-none cursor-pointer"
                >
                  <option value="">Choose Master Category</option>
                  {masterCategories.map((master) => (
                    <option key={master.master_category_id} value={master.master_category_id}>
                      {master.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
            </div>

            {/* 3. Select Category */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                Select Category *
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.category_id}
                  onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                  disabled={!formData.master_category_id}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-medium appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Choose Category</option>
                  {filteredCategories.map((c) => (
                    <option key={c.category_id} value={c.category_id}>
                      {c.name}
                    </option>
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
                  onClick={() => setFormData({...formData, is_active: true})}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    formData.is_active ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'
                  }`}
                >
                  <Check size={16} /> Active
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, is_active: false})}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    !formData.is_active ? 'bg-white shadow-sm text-slate-500' : 'text-slate-400'
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
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-medium resize-none"
                rows="3"
                placeholder="Optional description..."
              />
            </div>

          </form>
        </div>

        {/* Fixed Footer */}
        <div className="px-8 py-6 border-t border-slate-50 bg-white shrink-0">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="subCategoryForm"
              className="flex-1 px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <Save size={18} />
              Update Sub-Category
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SubCategoryEdit;