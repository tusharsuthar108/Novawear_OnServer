import React, { useState, useEffect } from 'react';
import { X, Check, ChevronDown, Upload } from 'lucide-react';
import masterCategoriesApi from '../../services/masterCategoriesApi';
import categoriesApi from '../../services/categoriesApi';
import { fetchSubCategories } from '../../api/subCategory.api';
import productTypeApi from '../../services/productTypeService';

const ProductTypeAdd = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({ 
    masterId: '', 
    categoryId: '', 
    subCategoryId: '', 
    name: '', 
    description: '', 
    status: 'Active', 
    imageFile: null,
    imagePreview: null 
  });

  const [masterCategories, setMasterCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [masterRes, categoryRes, subCategoryRes] = await Promise.all([
          masterCategoriesApi.getAll(),
          categoriesApi.getAll(),
          fetchSubCategories()
        ]);
        
        setMasterCategories(masterRes.data.data || []);
        setCategories(categoryRes.data.data || []);
        setSubCategories(subCategoryRes.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  // Logic: When Master Category changes, filter Categories
  useEffect(() => {
    if (formData.masterId) {
      const filtered = categories.filter(c => c.master_category_id === parseInt(formData.masterId));
      setFilteredCategories(filtered);
      // Reset dependent fields
      setFormData(prev => ({ ...prev, categoryId: '', subCategoryId: '' }));
    } else {
      setFilteredCategories([]);
    }
  }, [formData.masterId, categories]);

  // Logic: When Parent Category changes, filter Sub-Categories
  useEffect(() => {
    if (formData.categoryId) {
      const filtered = subCategories.filter(s => s.category_id === parseInt(formData.categoryId));
      setFilteredSubCategories(filtered);
      // Reset dependent field
      setFormData(prev => ({ ...prev, subCategoryId: '' }));
    } else {
      setFilteredSubCategories([]);
    }
  }, [formData.categoryId, subCategories]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('sub_category_id', formData.subCategoryId);
      formDataToSend.append('type_name', formData.name);
      formDataToSend.append('slug', formData.name.toLowerCase().replace(/\s+/g, '-'));
      formDataToSend.append('is_active', formData.status === 'Active');
      
      if (formData.imageFile) {
        formDataToSend.append('image', formData.imageFile);
      }

      console.log('Submitting product type:', {
        sub_category_id: formData.subCategoryId,
        type_name: formData.name,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        is_active: formData.status === 'Active',
        hasImage: !!formData.imageFile
      });

      const response = await productTypeApi.create(formDataToSend);
      
      console.log('API Response:', response.data);
      
      if (response.data.success) {
        onSave(response.data.data);
        // Reset form after save
        setFormData({ 
          masterId: '', 
          categoryId: '', 
          subCategoryId: '', 
          name: '', 
          description: '', 
          status: 'Active', 
          imageFile: null,
          imagePreview: null 
        });
      } else {
        throw new Error(response.data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error creating product type:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Unknown error occurred';
      alert(`Error creating product type: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Add Product Type</h2>
            <p className="text-sm text-slate-500 mt-1">Define the final specific level of your product hierarchy</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Step 1: Master Category */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Master Category</label>
              <div className="relative">
                <select 
                  required
                  value={formData.masterId}
                  onChange={(e) => setFormData({...formData, masterId: e.target.value})}
                  className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                >
                  <option value="">Select Master</option>
                  {masterCategories.map(m => <option key={m.master_category_id} value={m.master_category_id}>{m.name}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Step 2: Parent Category */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Parent Category</label>
              <div className="relative">
                <select 
                  required
                  disabled={!formData.masterId}
                  value={formData.categoryId}
                  onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                  className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-50 disabled:bg-slate-100"
                >
                  <option value="">Select Category</option>
                  {filteredCategories.map(c => <option key={c.category_id} value={c.category_id}>{c.name}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Step 3: Sub-Category */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Sub-Category</label>
              <div className="relative">
                <select 
                  required
                  disabled={!formData.categoryId}
                  value={formData.subCategoryId}
                  onChange={(e) => setFormData({...formData, subCategoryId: e.target.value})}
                  className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-50 disabled:bg-slate-100"
                >
                  <option value="">Select Sub-Category</option>
                  {filteredSubCategories.map(s => <option key={s.sub_category_id} value={s.sub_category_id}>{s.name}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Product Type Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Product Type Name</label>
              <input 
                required
                type="text" 
                placeholder="e.g. 5G Smartphones"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-slate-700">Description</label>
              <textarea 
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                placeholder="Briefly describe what this product type includes..."
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-slate-700">Type Thumbnail</label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                  {formData.imagePreview ? (
                    <img src={formData.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Upload className="text-slate-300" size={24} />
                  )}
                </div>
                <div className="flex-1">
                  <input type="file" onChange={handleImageChange} className="hidden" id="type-upload" accept="image/*" />
                  <label htmlFor="type-upload" className="inline-block px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors">
                    Choose Image
                  </label>
                  <p className="text-[11px] text-slate-400 mt-1">Recommended: 1:1 Aspect Ratio (PNG/JPG)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check size={18} />
              {loading ? 'Saving...' : 'Save Product Type'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductTypeAdd;