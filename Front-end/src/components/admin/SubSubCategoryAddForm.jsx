import React, { useState } from 'react';
import { X, Save, Upload } from 'lucide-react';

const SubSubCategoryAddForm = ({ isOpen, onClose, onSave, categoryHierarchy }) => {
  const [formData, setFormData] = useState({
    name: '',
    masterCategory: '',
    category: '',
    subCategory: '',
    description: '',
    status: 'Active',
    image: null // Changed from string to null to store File object
  });

  const [preview, setPreview] = useState(null); // State for local image preview

  const masterCategories = Object.keys(categoryHierarchy);

  // Handle local file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });

      // Generate preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.masterCategory || !formData.category || !formData.subCategory) {
      alert('Please select master category, category, and sub category');
      return;
    }
    onSave(formData);
    // Reset form states
    setFormData({ name: '', masterCategory: '', category: '', subCategory: '', description: '', status: 'Active', image: null });
    setPreview(null);
    onClose();
  };

  const handleMasterCategoryChange = (masterCategory) => {
    setFormData({
      ...formData,
      masterCategory,
      category: '',
      subCategory: ''
    });
  };

  const handleCategoryChange = (category) => {
    setFormData({
      ...formData,
      category,
      subCategory: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-slate-800">Add New Sub Sub Category</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Sub Sub Category Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter sub sub category name"
            />
          </div>

          {/* Hierarchy Selectors */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Master Category *</label>
              <select
                required
                value={formData.masterCategory}
                onChange={(e) => handleMasterCategoryChange(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Master Category</option>
                {masterCategories.map(master => (
                  <option key={master} value={master}>{master}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={!formData.masterCategory}
              >
                <option value="">Select Category</option>
                {formData.masterCategory && Object.keys(categoryHierarchy[formData.masterCategory] || {}).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Sub Category *</label>
              <select
                required
                value={formData.subCategory}
                onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={!formData.category}
              >
                <option value="">Select Sub Category</option>
                {formData.category && categoryHierarchy[formData.masterCategory]?.[formData.category]?.map(subCategory => (
                  <option key={subCategory} value={subCategory}>{subCategory}</option>
                ))}
              </select>
            </div>
          </div>

          {/* IMAGE UPLOAD SECTION */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Sub Sub Category Image
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors group">
                <Upload size={18} className="text-slate-400 group-hover:text-indigo-500" />
                <span className="text-sm text-slate-500 truncate max-w-[150px]">
                  {formData.image ? formData.image.name : 'Upload from Computer'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {preview && (
                <div className="w-14 h-14 rounded-xl border border-slate-200 overflow-hidden shrink-0 shadow-sm">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={2}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Brief description..."
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg font-medium"
            >
              <Save size={18} />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubSubCategoryAddForm;